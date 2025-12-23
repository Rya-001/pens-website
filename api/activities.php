<?php
/**
 * Activities API - Get activity logs
 */
require_once 'config/database.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        getActivities();
        break;
    case 'OPTIONS':
        jsonResponse(['status' => 'ok']);
        break;
    default:
        errorResponse('Method not allowed', 405);
}

function getActivities()
{
    $action = $_GET['action'] ?? null;
    $entityType = $_GET['entity_type'] ?? null;
    $date = $_GET['date'] ?? null;
    $limit = min((int) ($_GET['limit'] ?? 50), 100);
    $offset = (int) ($_GET['offset'] ?? 0);

    $sql = "SELECT * FROM activities WHERE 1=1";
    $params = [];

    if ($action && $action !== 'all') {
        $sql .= " AND action = :action";
        $params[':action'] = $action;
    }

    if ($entityType) {
        $sql .= " AND entity_type = :entity_type";
        $params[':entity_type'] = $entityType;
    }

    if ($date) {
        $sql .= " AND DATE(created_at) = :date";
        $params[':date'] = $date;
    }

    $sql .= " ORDER BY created_at DESC LIMIT $limit OFFSET $offset";

    $activities = fetchAll($sql, $params);
    $total = fetchOne("SELECT COUNT(*) as total FROM activities");

    successResponse([
        'items' => $activities,
        'total' => (int) $total['total'],
        'limit' => $limit,
        'offset' => $offset
    ]);
}
?>