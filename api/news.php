<?php
/**
 * News API
 * Handles CRUD operations for news articles
 */

require_once 'config/database.php';

// Get request method
$method = $_SERVER['REQUEST_METHOD'];

// Handle different request methods
switch ($method) {
    case 'GET':
        getNews();
        break;
    case 'POST':
        createNews();
        break;
    case 'PUT':
        updateNews();
        break;
    case 'DELETE':
        deleteNews();
        break;
    case 'OPTIONS':
        jsonResponse(['status' => 'ok']);
        break;
    default:
        errorResponse('Method not allowed', 405);
}

/**
 * Get all news or single news by ID
 */
function getNews()
{
    $id = $_GET['id'] ?? null;

    if ($id) {
        // Get single news
        $sql = "SELECT * FROM news WHERE id = :id";
        $news = fetchOne($sql, [':id' => $id]);

        if (!$news) {
            errorResponse('News not found', 404);
        }

        // Parse JSON fields
        $news['tags'] = json_decode($news['tags'], true);

        successResponse($news);
    } else {
        // Get all news with optional filters
        $status = $_GET['status'] ?? null;
        $category = $_GET['category'] ?? null;
        $featured = $_GET['featured'] ?? null;
        $search = $_GET['search'] ?? null;
        $limit = min((int) ($_GET['limit'] ?? 100), 100);
        $offset = (int) ($_GET['offset'] ?? 0);

        $sql = "SELECT * FROM news WHERE 1=1";
        $params = [];

        if ($status) {
            $sql .= " AND status = :status";
            $params[':status'] = $status;
        }

        if ($category) {
            $sql .= " AND category = :category";
            $params[':category'] = $category;
        }

        if ($featured !== null) {
            $sql .= " AND featured = :featured";
            $params[':featured'] = $featured;
        }

        if ($search) {
            $sql .= " AND (title LIKE :search OR excerpt LIKE :search2 OR content LIKE :search3)";
            $params[':search'] = "%$search%";
            $params[':search2'] = "%$search%";
            $params[':search3'] = "%$search%";
        }

        $sql .= " ORDER BY publish_date DESC, created_at DESC LIMIT :limit OFFSET :offset";

        // Get total count
        $countSql = str_replace("SELECT *", "SELECT COUNT(*) as total", preg_replace('/LIMIT.*$/', '', $sql));
        $totalResult = fetchOne($countSql, array_filter($params, function ($key) {
            return $key !== ':limit' && $key !== ':offset';
        }, ARRAY_FILTER_USE_KEY));

        // Execute main query
        $conn = getDBConnection();
        $stmt = $conn->prepare($sql);

        foreach ($params as $key => $value) {
            if ($key === ':limit' || $key === ':offset')
                continue;
            $stmt->bindValue($key, $value);
        }
        $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
        $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
        $stmt->execute();

        $newsList = $stmt->fetchAll();

        // Parse JSON fields for each news
        foreach ($newsList as &$news) {
            $news['tags'] = json_decode($news['tags'], true);
        }

        successResponse([
            'items' => $newsList,
            'total' => (int) $totalResult['total'],
            'limit' => $limit,
            'offset' => $offset
        ]);
    }
}

/**
 * Create new news article
 */
function createNews()
{
    $data = getRequestBody();

    // Validate required fields
    $required = ['title', 'excerpt', 'content'];
    foreach ($required as $field) {
        if (empty($data[$field])) {
            errorResponse("Field '$field' is required");
        }
    }

    // Generate slug
    $slug = generateSlug($data['title']);

    // Check if slug exists
    $existing = fetchOne("SELECT id FROM news WHERE slug = :slug", [':slug' => $slug]);
    if ($existing) {
        $slug .= '-' . time();
    }

    // Prepare data
    $sql = "INSERT INTO news (title, slug, excerpt, content, image, category, author, publish_date, status, featured, tags) 
            VALUES (:title, :slug, :excerpt, :content, :image, :category, :author, :publish_date, :status, :featured, :tags)";

    $params = [
        ':title' => sanitize($data['title']),
        ':slug' => $slug,
        ':excerpt' => sanitize($data['excerpt']),
        ':content' => $data['content'], // Keep HTML for rich text
        ':image' => $data['image'] ?? null,
        ':category' => $data['category'] ?? null,
        ':author' => $data['author'] ?? 'Admin',
        ':publish_date' => $data['publish_date'] ?? date('Y-m-d'),
        ':status' => $data['status'] ?? 'draft',
        ':featured' => isset($data['featured']) ? (int) $data['featured'] : 0,
        ':tags' => isset($data['tags']) ? json_encode($data['tags']) : null
    ];

    try {
        executeQuery($sql, $params);
        $newsId = getLastInsertId();

        // Log activity
        logActivity('create', 'news', $newsId, $data['title'], "Created news: {$data['title']}");

        // Get created news
        $news = fetchOne("SELECT * FROM news WHERE id = :id", [':id' => $newsId]);
        $news['tags'] = json_decode($news['tags'], true);

        successResponse($news, 'News created successfully');
    } catch (Exception $e) {
        errorResponse('Failed to create news: ' . $e->getMessage(), 500);
    }
}

/**
 * Update existing news
 */
function updateNews()
{
    $data = getRequestBody();

    if (empty($data['id'])) {
        $id = $_GET['id'] ?? null;
        if (!$id) {
            errorResponse('News ID is required');
        }
        $data['id'] = $id;
    }

    // Check if news exists
    $existing = fetchOne("SELECT * FROM news WHERE id = :id", [':id' => $data['id']]);
    if (!$existing) {
        errorResponse('News not found', 404);
    }

    // Build update query dynamically
    $updates = [];
    $params = [':id' => $data['id']];

    $allowedFields = ['title', 'excerpt', 'content', 'image', 'category', 'author', 'publish_date', 'status', 'featured', 'tags'];

    foreach ($allowedFields as $field) {
        if (isset($data[$field])) {
            if ($field === 'tags') {
                $updates[] = "tags = :tags";
                $params[':tags'] = is_array($data[$field]) ? json_encode($data[$field]) : $data[$field];
            } else if ($field === 'title') {
                $updates[] = "title = :title";
                $updates[] = "slug = :slug";
                $params[':title'] = sanitize($data['title']);
                $params[':slug'] = generateSlug($data['title']);
            } else if ($field === 'featured') {
                $updates[] = "featured = :featured";
                $params[':featured'] = (int) $data['featured'];
            } else if ($field === 'content') {
                $updates[] = "content = :content";
                $params[':content'] = $data['content']; // Keep HTML
            } else {
                $updates[] = "$field = :$field";
                $params[":$field"] = sanitize($data[$field]);
            }
        }
    }

    if (empty($updates)) {
        errorResponse('No fields to update');
    }

    $sql = "UPDATE news SET " . implode(', ', $updates) . ", updated_at = NOW() WHERE id = :id";

    try {
        executeQuery($sql, $params);

        // Log activity
        logActivity('update', 'news', $data['id'], $data['title'] ?? $existing['title'], "Updated news: " . ($data['title'] ?? $existing['title']));

        // Get updated news
        $news = fetchOne("SELECT * FROM news WHERE id = :id", [':id' => $data['id']]);
        $news['tags'] = json_decode($news['tags'], true);

        successResponse($news, 'News updated successfully');
    } catch (Exception $e) {
        errorResponse('Failed to update news: ' . $e->getMessage(), 500);
    }
}

/**
 * Delete news
 */
function deleteNews()
{
    $id = $_GET['id'] ?? null;

    if (!$id) {
        $data = getRequestBody();
        $id = $data['id'] ?? null;
    }

    if (!$id) {
        errorResponse('News ID is required');
    }

    // Check if news exists
    $existing = fetchOne("SELECT * FROM news WHERE id = :id", [':id' => $id]);
    if (!$existing) {
        errorResponse('News not found', 404);
    }

    try {
        executeQuery("DELETE FROM news WHERE id = :id", [':id' => $id]);

        // Log activity
        logActivity('delete', 'news', $id, $existing['title'], "Deleted news: {$existing['title']}");

        successResponse(['id' => $id], 'News deleted successfully');
    } catch (Exception $e) {
        errorResponse('Failed to delete news: ' . $e->getMessage(), 500);
    }
}
?>