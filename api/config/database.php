<?php
/**
 * PT.PENS Database Configuration
 * Database connection settings and helper functions
 */

// Database credentials
define('DB_HOST', 'localhost');
define('DB_NAME', 'pens_db');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_CHARSET', 'utf8mb4');

// Enable error reporting for development
error_reporting(E_ALL);
ini_set('display_errors', 0);

/**
 * Database Connection Class
 */
class Database {
    private static $instance = null;
    private $connection;
    
    private function __construct() {
        try {
            $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
            $options = [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
            ];
            $this->connection = new PDO($dsn, DB_USER, DB_PASS, $options);
        } catch (PDOException $e) {
            throw new Exception("Database connection failed: " . $e->getMessage());
        }
    }
    
    /**
     * Get database instance (Singleton)
     */
    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    /**
     * Get PDO connection
     */
    public function getConnection() {
        return $this->connection;
    }
    
    /**
     * Prevent cloning
     */
    private function __clone() {}
    
    /**
     * Prevent unserialization
     */
    public function __wakeup() {
        throw new Exception("Cannot unserialize singleton");
    }
}

/**
 * Get database connection
 */
function getDBConnection() {
    return Database::getInstance()->getConnection();
}

/**
 * Execute a query with parameters
 */
function executeQuery($sql, $params = []) {
    $conn = getDBConnection();
    $stmt = $conn->prepare($sql);
    $stmt->execute($params);
    return $stmt;
}

/**
 * Fetch all results
 */
function fetchAll($sql, $params = []) {
    return executeQuery($sql, $params)->fetchAll();
}

/**
 * Fetch single result
 */
function fetchOne($sql, $params = []) {
    return executeQuery($sql, $params)->fetch();
}

/**
 * Get last insert ID
 */
function getLastInsertId() {
    return getDBConnection()->lastInsertId();
}

/**
 * JSON response helper
 */
function jsonResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        exit(0);
    }
    
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

/**
 * Error response helper
 */
function errorResponse($message, $statusCode = 400) {
    jsonResponse(['success' => false, 'error' => $message], $statusCode);
}

/**
 * Success response helper
 */
function successResponse($data = [], $message = 'Success') {
    jsonResponse(['success' => true, 'message' => $message, 'data' => $data]);
}

/**
 * Get request body as array
 */
function getRequestBody() {
    $json = file_get_contents('php://input');
    return json_decode($json, true) ?? [];
}

/**
 * Sanitize input
 */
function sanitize($input) {
    if (is_array($input)) {
        return array_map('sanitize', $input);
    }
    return htmlspecialchars(strip_tags(trim($input)), ENT_QUOTES, 'UTF-8');
}

/**
 * Generate slug from string
 */
function generateSlug($string) {
    $slug = strtolower(trim($string));
    $slug = preg_replace('/[^a-z0-9-]/', '-', $slug);
    $slug = preg_replace('/-+/', '-', $slug);
    return trim($slug, '-');
}

/**
 * Log activity
 */
function logActivity($action, $entityType, $entityId = null, $entityName = null, $description = null, $userId = null, $userName = null) {
    $sql = "INSERT INTO activities (user_id, user_name, action, entity_type, entity_id, entity_name, description, ip_address, user_agent) 
            VALUES (:user_id, :user_name, :action, :entity_type, :entity_id, :entity_name, :description, :ip_address, :user_agent)";
    
    executeQuery($sql, [
        ':user_id' => $userId,
        ':user_name' => $userName ?? 'System',
        ':action' => $action,
        ':entity_type' => $entityType,
        ':entity_id' => $entityId,
        ':entity_name' => $entityName,
        ':description' => $description,
        ':ip_address' => $_SERVER['REMOTE_ADDR'] ?? null,
        ':user_agent' => substr($_SERVER['HTTP_USER_AGENT'] ?? '', 0, 500)
    ]);
}
?>
