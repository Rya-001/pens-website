<?php
/**
 * Authentication API
 */
require_once 'config/database.php';
session_start();

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';

switch ($action) {
    case 'login':
        login();
        break;
    case 'logout':
        logout();
        break;
    case 'verify':
        verifySession();
        break;
    case 'user':
        getCurrentUser();
        break;
    default:
        errorResponse('Invalid action', 400);
}

function login()
{
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        errorResponse('Method not allowed', 405);
    }

    $data = getRequestBody();
    $username = sanitize($data['username'] ?? '');
    $password = $data['password'] ?? '';

    if (empty($username) || empty($password)) {
        errorResponse('Username and password are required');
    }

    $user = fetchOne(
        "SELECT * FROM admin_users WHERE (username = :username OR email = :email) AND is_active = 1",
        [':username' => $username, ':email' => $username]
    );

    if (!$user || !password_verify($password, $user['password'])) {
        errorResponse('Invalid credentials', 401);
    }

    // Update last login
    executeQuery("UPDATE admin_users SET last_login = NOW() WHERE id = :id", [':id' => $user['id']]);

    // Log activity
    logActivity('login', 'auth', $user['id'], null, 'User logged in', $user['id'], $user['full_name']);

    // Set session
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['username'] = $user['username'];
    $_SESSION['full_name'] = $user['full_name'];
    $_SESSION['role'] = $user['role'];

    unset($user['password']);
    successResponse($user, 'Login successful');
}

function logout()
{
    if (isset($_SESSION['user_id'])) {
        logActivity('logout', 'auth', $_SESSION['user_id'], null, 'User logged out', $_SESSION['user_id'], $_SESSION['full_name'] ?? 'Unknown');
    }
    session_destroy();
    successResponse([], 'Logged out successfully');
}

function verifySession()
{
    if (isset($_SESSION['user_id'])) {
        $user = fetchOne(
            "SELECT id, username, email, full_name, role, avatar FROM admin_users WHERE id = :id AND is_active = 1",
            [':id' => $_SESSION['user_id']]
        );
        if ($user) {
            successResponse($user, 'Session valid');
        }
    }
    errorResponse('Session invalid', 401);
}

function getCurrentUser()
{
    if (!isset($_SESSION['user_id'])) {
        errorResponse('Not authenticated', 401);
    }

    $user = fetchOne(
        "SELECT id, username, email, full_name, role, avatar, last_login, created_at FROM admin_users WHERE id = :id",
        [':id' => $_SESSION['user_id']]
    );

    if (!$user) {
        errorResponse('User not found', 404);
    }

    successResponse($user);
}
?>