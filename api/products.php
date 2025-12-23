<?php
/**
 * Products API
 * Handles CRUD operations for products
 */

require_once 'config/database.php';

// Get request method
$method = $_SERVER['REQUEST_METHOD'];

// Handle different request methods
switch ($method) {
    case 'GET':
        getProducts();
        break;
    case 'POST':
        createProduct();
        break;
    case 'PUT':
        updateProduct();
        break;
    case 'DELETE':
        deleteProduct();
        break;
    case 'OPTIONS':
        jsonResponse(['status' => 'ok']);
        break;
    default:
        errorResponse('Method not allowed', 405);
}

/**
 * Get all products or single product by ID
 */
function getProducts()
{
    $id = $_GET['id'] ?? null;

    if ($id) {
        // Get single product
        $sql = "SELECT * FROM products WHERE id = :id";
        $product = fetchOne($sql, [':id' => $id]);

        if (!$product) {
            errorResponse('Product not found', 404);
        }

        // Parse JSON fields
        $product['export_countries'] = json_decode($product['export_countries'], true);
        $product['specifications'] = json_decode($product['specifications'], true);

        successResponse($product);
    } else {
        // Get all products with optional filters
        $category = $_GET['category'] ?? null;
        $status = $_GET['status'] ?? null;
        $featured = $_GET['featured'] ?? null;
        $search = $_GET['search'] ?? null;
        $limit = min((int) ($_GET['limit'] ?? 100), 100);
        $offset = (int) ($_GET['offset'] ?? 0);

        $sql = "SELECT * FROM products WHERE 1=1";
        $params = [];

        if ($category) {
            $sql .= " AND category = :category";
            $params[':category'] = $category;
        }

        if ($status) {
            $sql .= " AND status = :status";
            $params[':status'] = $status;
        }

        if ($featured !== null) {
            $sql .= " AND featured = :featured";
            $params[':featured'] = $featured;
        }

        if ($search) {
            $sql .= " AND (name LIKE :search OR description LIKE :search2)";
            $params[':search'] = "%$search%";
            $params[':search2'] = "%$search%";
        }

        $sql .= " ORDER BY created_at DESC LIMIT :limit OFFSET :offset";

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

        $products = $stmt->fetchAll();

        // Parse JSON fields for each product
        foreach ($products as &$product) {
            $product['export_countries'] = json_decode($product['export_countries'], true);
            $product['specifications'] = json_decode($product['specifications'], true);
            // Convert price to float
            $product['price'] = (float) $product['price'];
        }

        successResponse([
            'items' => $products,
            'total' => (int) $totalResult['total'],
            'limit' => $limit,
            'offset' => $offset
        ]);
    }
}

/**
 * Create new product
 */
function createProduct()
{
    $data = getRequestBody();

    // Validate required fields
    $required = ['name', 'category', 'description', 'price'];
    foreach ($required as $field) {
        if (empty($data[$field])) {
            errorResponse("Field '$field' is required");
        }
    }

    // Generate slug
    $slug = generateSlug($data['name']);

    // Check if slug exists
    $existing = fetchOne("SELECT id FROM products WHERE slug = :slug", [':slug' => $slug]);
    if ($existing) {
        $slug .= '-' . time();
    }

    // Prepare data
    $sql = "INSERT INTO products (name, slug, category, description, image, price, unit, export_countries, specifications, status, featured) 
            VALUES (:name, :slug, :category, :description, :image, :price, :unit, :export_countries, :specifications, :status, :featured)";

    $params = [
        ':name' => sanitize($data['name']),
        ':slug' => $slug,
        ':category' => sanitize($data['category']),
        ':description' => sanitize($data['description']),
        ':image' => $data['image'] ?? null,
        ':price' => (float) $data['price'],
        ':unit' => $data['unit'] ?? 'piece',
        ':export_countries' => isset($data['export_countries']) ? json_encode($data['export_countries']) : null,
        ':specifications' => isset($data['specifications']) ? json_encode($data['specifications']) : null,
        ':status' => $data['status'] ?? 'active',
        ':featured' => isset($data['featured']) ? (int) $data['featured'] : 0
    ];

    try {
        executeQuery($sql, $params);
        $productId = getLastInsertId();

        // Log activity
        logActivity('create', 'product', $productId, $data['name'], "Created product: {$data['name']}");

        // Get created product
        $product = fetchOne("SELECT * FROM products WHERE id = :id", [':id' => $productId]);
        $product['export_countries'] = json_decode($product['export_countries'], true);
        $product['price'] = (float) $product['price'];

        successResponse($product, 'Product created successfully');
    } catch (Exception $e) {
        errorResponse('Failed to create product: ' . $e->getMessage(), 500);
    }
}

/**
 * Update existing product
 */
function updateProduct()
{
    $data = getRequestBody();

    if (empty($data['id'])) {
        // Check for ID in URL
        $id = $_GET['id'] ?? null;
        if (!$id) {
            errorResponse('Product ID is required');
        }
        $data['id'] = $id;
    }

    // Check if product exists
    $existing = fetchOne("SELECT * FROM products WHERE id = :id", [':id' => $data['id']]);
    if (!$existing) {
        errorResponse('Product not found', 404);
    }

    // Build update query dynamically
    $updates = [];
    $params = [':id' => $data['id']];

    $allowedFields = ['name', 'category', 'description', 'image', 'price', 'unit', 'export_countries', 'specifications', 'status', 'featured'];

    foreach ($allowedFields as $field) {
        if (isset($data[$field])) {
            if ($field === 'export_countries' || $field === 'specifications') {
                $updates[] = "$field = :$field";
                $params[":$field"] = is_array($data[$field]) ? json_encode($data[$field]) : $data[$field];
            } else if ($field === 'name') {
                $updates[] = "name = :name";
                $updates[] = "slug = :slug";
                $params[':name'] = sanitize($data['name']);
                $params[':slug'] = generateSlug($data['name']);
            } else if ($field === 'price') {
                $updates[] = "price = :price";
                $params[':price'] = (float) $data['price'];
            } else if ($field === 'featured') {
                $updates[] = "featured = :featured";
                $params[':featured'] = (int) $data['featured'];
            } else {
                $updates[] = "$field = :$field";
                $params[":$field"] = sanitize($data[$field]);
            }
        }
    }

    if (empty($updates)) {
        errorResponse('No fields to update');
    }

    $sql = "UPDATE products SET " . implode(', ', $updates) . ", updated_at = NOW() WHERE id = :id";

    try {
        executeQuery($sql, $params);

        // Log activity
        logActivity('update', 'product', $data['id'], $data['name'] ?? $existing['name'], "Updated product: " . ($data['name'] ?? $existing['name']));

        // Get updated product
        $product = fetchOne("SELECT * FROM products WHERE id = :id", [':id' => $data['id']]);
        $product['export_countries'] = json_decode($product['export_countries'], true);
        $product['price'] = (float) $product['price'];

        successResponse($product, 'Product updated successfully');
    } catch (Exception $e) {
        errorResponse('Failed to update product: ' . $e->getMessage(), 500);
    }
}

/**
 * Delete product
 */
function deleteProduct()
{
    $id = $_GET['id'] ?? null;

    if (!$id) {
        $data = getRequestBody();
        $id = $data['id'] ?? null;
    }

    if (!$id) {
        errorResponse('Product ID is required');
    }

    // Check if product exists
    $existing = fetchOne("SELECT * FROM products WHERE id = :id", [':id' => $id]);
    if (!$existing) {
        errorResponse('Product not found', 404);
    }

    try {
        executeQuery("DELETE FROM products WHERE id = :id", [':id' => $id]);

        // Log activity
        logActivity('delete', 'product', $id, $existing['name'], "Deleted product: {$existing['name']}");

        successResponse(['id' => $id], 'Product deleted successfully');
    } catch (Exception $e) {
        errorResponse('Failed to delete product: ' . $e->getMessage(), 500);
    }
}
?>