<?php
/**
 * Members API
 * Handles CRUD operations for members and authentication
 */

require_once 'config/database.php';

// Start session for member authentication
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Get request method
$method = $_SERVER['REQUEST_METHOD'];

// Handle different request methods
switch ($method) {
    case 'GET':
        getMembers();
        break;
    case 'POST':
        handlePost();
        break;
    case 'PUT':
        updateMember();
        break;
    case 'DELETE':
        deleteMember();
        break;
    case 'OPTIONS':
        jsonResponse(['status' => 'ok']);
        break;
    default:
        errorResponse('Method not allowed', 405);
}

/**
 * Handle POST requests (login, register, logout)
 */
function handlePost()
{
    $data = getRequestBody();
    $action = $data['action'] ?? $_GET['action'] ?? 'register';

    switch ($action) {
        case 'login':
            loginMember($data);
            break;
        case 'register':
            registerMember($data);
            break;
        case 'logout':
            logoutMember();
            break;
        case 'check':
            checkSession();
            break;
        default:
            registerMember($data);
    }
}

/**
 * Get all members or single member (admin only)
 */
function getMembers()
{
    $id = $_GET['id'] ?? null;

    if ($id) {
        // Get single member
        $sql = "SELECT id, email, full_name, company_name, phone, country, status, is_verified, last_login, created_at FROM members WHERE id = :id";
        $member = fetchOne($sql, [':id' => $id]);

        if (!$member) {
            errorResponse('Member not found', 404);
        }

        successResponse($member);
    } else {
        // Get all members with optional filters
        $status = $_GET['status'] ?? null;
        $search = $_GET['search'] ?? null;
        $limit = min((int) ($_GET['limit'] ?? 100), 100);
        $offset = (int) ($_GET['offset'] ?? 0);

        $sql = "SELECT id, email, full_name, company_name, phone, country, status, is_verified, last_login, created_at FROM members WHERE 1=1";
        $params = [];

        if ($status) {
            $sql .= " AND status = :status";
            $params[':status'] = $status;
        }

        if ($search) {
            $sql .= " AND (full_name LIKE :search OR email LIKE :search2 OR company_name LIKE :search3)";
            $params[':search'] = "%$search%";
            $params[':search2'] = "%$search%";
            $params[':search3'] = "%$search%";
        }

        $sql .= " ORDER BY created_at DESC LIMIT $limit OFFSET $offset";

        $members = fetchAll($sql, $params);

        // Get counts
        $counts = fetchOne("SELECT COUNT(*) as total, SUM(status='active') as active, SUM(status='pending') as pending FROM members");

        successResponse([
            'items' => $members,
            'total' => (int) $counts['total'],
            'active' => (int) $counts['active'],
            'pending' => (int) $counts['pending']
        ]);
    }
}

/**
 * Register new member
 */
function registerMember($data)
{
    // Validate required fields
    $required = ['email', 'password', 'full_name'];
    foreach ($required as $field) {
        if (empty($data[$field])) {
            errorResponse("Field '$field' is required");
        }
    }

    // Validate email format
    if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        errorResponse('Invalid email format');
    }

    // Check if email exists
    $existing = fetchOne("SELECT id FROM members WHERE email = :email", [':email' => $data['email']]);
    if ($existing) {
        errorResponse('Email already registered');
    }

    // Validate password length
    if (strlen($data['password']) < 6) {
        errorResponse('Password must be at least 6 characters');
    }

    // Hash password
    $hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);

    // Generate verification token
    $verificationToken = bin2hex(random_bytes(32));

    $sql = "INSERT INTO members (email, password, full_name, company_name, phone, country, verification_token, status) 
            VALUES (:email, :password, :full_name, :company_name, :phone, :country, :token, 'pending')";

    $params = [
        ':email' => sanitize($data['email']),
        ':password' => $hashedPassword,
        ':full_name' => sanitize($data['full_name']),
        ':company_name' => $data['company_name'] ?? null,
        ':phone' => $data['phone'] ?? null,
        ':country' => $data['country'] ?? null,
        ':token' => $verificationToken
    ];

    try {
        executeQuery($sql, $params);
        $memberId = getLastInsertId();

        // Log activity
        logActivity('create', 'member', $memberId, $data['full_name'], "New member registered: {$data['email']}");

        successResponse([
            'id' => $memberId,
            'email' => $data['email'],
            'full_name' => $data['full_name']
        ], 'Registration successful. Please check your email to verify your account.');
    } catch (Exception $e) {
        errorResponse('Registration failed: ' . $e->getMessage(), 500);
    }
}

/**
 * Login member
 */
function loginMember($data)
{
    if (empty($data['email']) || empty($data['password'])) {
        errorResponse('Email and password are required');
    }

    // Get member by email
    $member = fetchOne("SELECT * FROM members WHERE email = :email", [':email' => $data['email']]);

    if (!$member) {
        errorResponse('Invalid email or password', 401);
    }

    // Verify password
    if (!password_verify($data['password'], $member['password'])) {
        errorResponse('Invalid email or password', 401);
    }

    // Check if account is active
    if ($member['status'] !== 'active') {
        if ($member['status'] === 'pending') {
            errorResponse('Please verify your email before logging in', 403);
        } else {
            errorResponse('Your account has been suspended', 403);
        }
    }

    // Update last login
    executeQuery("UPDATE members SET last_login = NOW() WHERE id = :id", [':id' => $member['id']]);

    // Set session
    $_SESSION['member_id'] = $member['id'];
    $_SESSION['member_email'] = $member['email'];
    $_SESSION['member_name'] = $member['full_name'];

    // Log activity
    logActivity('login', 'member', $member['id'], $member['full_name'], "Member logged in: {$member['email']}");

    // Return member data (without password)
    unset($member['password']);
    unset($member['verification_token']);

    successResponse($member, 'Login successful');
}

/**
 * Logout member
 */
function logoutMember()
{
    if (isset($_SESSION['member_id'])) {
        $memberId = $_SESSION['member_id'];
        $memberEmail = $_SESSION['member_email'] ?? '';

        // Log activity
        logActivity('logout', 'member', $memberId, '', "Member logged out: $memberEmail");
    }

    // Clear session
    session_destroy();

    successResponse(null, 'Logout successful');
}

/**
 * Check current session
 */
function checkSession()
{
    if (isset($_SESSION['member_id'])) {
        $member = fetchOne(
            "SELECT id, email, full_name, company_name, phone, country, status FROM members WHERE id = :id",
            [':id' => $_SESSION['member_id']]
        );

        if ($member && $member['status'] === 'active') {
            successResponse($member, 'Session valid');
        }
    }

    errorResponse('Not authenticated', 401);
}

/**
 * Update member profile
 */
function updateMember()
{
    $data = getRequestBody();

    $id = $data['id'] ?? $_GET['id'] ?? $_SESSION['member_id'] ?? null;
    if (!$id) {
        errorResponse('Member ID is required');
    }

    // Check if member exists
    $existing = fetchOne("SELECT * FROM members WHERE id = :id", [':id' => $id]);
    if (!$existing) {
        errorResponse('Member not found', 404);
    }

    // Build update query
    $updates = [];
    $params = [':id' => $id];

    $allowedFields = ['full_name', 'company_name', 'phone', 'country', 'status'];

    foreach ($allowedFields as $field) {
        if (isset($data[$field])) {
            $updates[] = "$field = :$field";
            $params[":$field"] = sanitize($data[$field]);
        }
    }

    // Handle password change
    if (!empty($data['password'])) {
        if (strlen($data['password']) < 6) {
            errorResponse('Password must be at least 6 characters');
        }
        $updates[] = "password = :password";
        $params[':password'] = password_hash($data['password'], PASSWORD_DEFAULT);
    }

    if (empty($updates)) {
        errorResponse('No fields to update');
    }

    $sql = "UPDATE members SET " . implode(', ', $updates) . ", updated_at = NOW() WHERE id = :id";

    try {
        executeQuery($sql, $params);

        // Log activity
        logActivity('update', 'member', $id, $data['full_name'] ?? $existing['full_name'], "Member profile updated");

        // Get updated member
        $member = fetchOne(
            "SELECT id, email, full_name, company_name, phone, country, status, is_verified, last_login, created_at FROM members WHERE id = :id",
            [':id' => $id]
        );

        successResponse($member, 'Profile updated successfully');
    } catch (Exception $e) {
        errorResponse('Failed to update profile: ' . $e->getMessage(), 500);
    }
}

/**
 * Delete member
 */
function deleteMember()
{
    $id = $_GET['id'] ?? null;

    if (!$id) {
        $data = getRequestBody();
        $id = $data['id'] ?? null;
    }

    if (!$id) {
        errorResponse('Member ID is required');
    }

    // Check if member exists
    $existing = fetchOne("SELECT * FROM members WHERE id = :id", [':id' => $id]);
    if (!$existing) {
        errorResponse('Member not found', 404);
    }

    try {
        executeQuery("DELETE FROM members WHERE id = :id", [':id' => $id]);

        // Log activity
        logActivity('delete', 'member', $id, $existing['full_name'], "Member deleted: {$existing['email']}");

        successResponse(['id' => $id], 'Member deleted successfully');
    } catch (Exception $e) {
        errorResponse('Failed to delete member: ' . $e->getMessage(), 500);
    }
}
?>