<?php
/**
 * Dashboard Stats API
 */
require_once 'config/database.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    getDashboardStats();
} elseif ($method === 'OPTIONS') {
    jsonResponse(['status' => 'ok']);
} else {
    errorResponse('Method not allowed', 405);
}

function getDashboardStats()
{
    $stats = [];

    // Products count
    $products = fetchOne("SELECT COUNT(*) as total FROM products WHERE status = 'active'");
    $stats['products'] = (int) $products['total'];

    // News count
    $news = fetchOne("SELECT COUNT(*) as total FROM news WHERE status = 'published'");
    $stats['news'] = (int) $news['total'];

    // Documents count
    $documents = fetchOne("SELECT COUNT(*) as total FROM documents WHERE status = 'active'");
    $stats['documents'] = (int) $documents['total'];

    // Today's activities
    $activities = fetchOne("SELECT COUNT(*) as total FROM activities WHERE DATE(created_at) = CURDATE()");
    $stats['activitiesToday'] = (int) $activities['total'];

    // Recent activities (last 5)
    $recentActivities = fetchAll("SELECT * FROM activities ORDER BY created_at DESC LIMIT 5");
    $stats['recentActivities'] = $recentActivities;

    // Products by category
    $productsByCategory = fetchAll("SELECT category, COUNT(*) as count FROM products WHERE status = 'active' GROUP BY category");
    $stats['productsByCategory'] = $productsByCategory;

    // News by status
    $newsByStatus = fetchAll("SELECT status, COUNT(*) as count FROM news GROUP BY status");
    $stats['newsByStatus'] = $newsByStatus;

    successResponse($stats);
}
?>