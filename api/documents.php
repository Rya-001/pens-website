<?php
/**
 * Documents API - CRUD operations for documents
 */
require_once 'config/database.php';

define('UPLOAD_DIR', dirname(__DIR__) . '/uploads/documents/');
if (!file_exists(UPLOAD_DIR))
    mkdir(UPLOAD_DIR, 0755, true);

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        getDocuments();
        break;
    case 'POST':
        createDocument();
        break;
    case 'PUT':
        updateDocument();
        break;
    case 'DELETE':
        deleteDocument();
        break;
    case 'OPTIONS':
        jsonResponse(['status' => 'ok']);
        break;
    default:
        errorResponse('Method not allowed', 405);
}

function getDocuments()
{
    $id = $_GET['id'] ?? null;
    if ($id) {
        $doc = fetchOne("SELECT * FROM documents WHERE id = :id", [':id' => $id]);
        if (!$doc)
            errorResponse('Document not found', 404);
        successResponse($doc);
    }

    $category = $_GET['category'] ?? null;
    $limit = min((int) ($_GET['limit'] ?? 100), 100);
    $sql = "SELECT * FROM documents WHERE 1=1";
    $params = [];

    if ($category && $category !== 'all') {
        $sql .= " AND category = :category";
        $params[':category'] = $category;
    }
    $sql .= " ORDER BY created_at DESC LIMIT $limit";

    $docs = fetchAll($sql, $params);
    $counts = fetchAll("SELECT category, COUNT(*) as count FROM documents GROUP BY category");

    successResponse(['items' => $docs, 'total' => count($docs), 'categoryCounts' => $counts]);
}

function createDocument()
{
    if (isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
        $file = $_FILES['file'];
        $name = sanitize($_POST['name'] ?? pathinfo($file['name'], PATHINFO_FILENAME));
        $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
        $newFileName = uniqid() . '_' . preg_replace('/[^a-zA-Z0-9_.-]/', '_', $file['name']);

        if (!move_uploaded_file($file['tmp_name'], UPLOAD_DIR . $newFileName)) {
            errorResponse('Failed to save file', 500);
        }

        $sql = "INSERT INTO documents (name, description, file_path, file_name, file_type, file_size, category) 
                VALUES (:name, :desc, :path, :fname, :type, :size, :cat)";
        executeQuery($sql, [
            ':name' => $name,
            ':desc' => sanitize($_POST['description'] ?? ''),
            ':path' => 'uploads/documents/' . $newFileName,
            ':fname' => $file['name'],
            ':type' => $ext,
            ':size' => $file['size'],
            ':cat' => sanitize($_POST['category'] ?? 'others')
        ]);

        $doc = fetchOne("SELECT * FROM documents WHERE id = :id", [':id' => getLastInsertId()]);
        logActivity('create', 'document', $doc['id'], $name, "Uploaded: $name");
        successResponse($doc, 'Document uploaded');
    }
    errorResponse('No file uploaded');
}

function updateDocument()
{
    $data = getRequestBody();
    $id = $data['id'] ?? $_GET['id'] ?? null;
    if (!$id)
        errorResponse('ID required');

    $existing = fetchOne("SELECT * FROM documents WHERE id = :id", [':id' => $id]);
    if (!$existing)
        errorResponse('Not found', 404);

    $sql = "UPDATE documents SET name = :name, description = :desc, category = :cat, updated_at = NOW() WHERE id = :id";
    executeQuery($sql, [
        ':name' => sanitize($data['name'] ?? $existing['name']),
        ':desc' => sanitize($data['description'] ?? $existing['description']),
        ':cat' => sanitize($data['category'] ?? $existing['category']),
        ':id' => $id
    ]);

    successResponse(fetchOne("SELECT * FROM documents WHERE id = :id", [':id' => $id]), 'Updated');
}

function deleteDocument()
{
    $id = $_GET['id'] ?? (getRequestBody()['id'] ?? null);
    if (!$id)
        errorResponse('ID required');

    $existing = fetchOne("SELECT * FROM documents WHERE id = :id", [':id' => $id]);
    if (!$existing)
        errorResponse('Not found', 404);

    $filePath = dirname(__DIR__) . '/' . $existing['file_path'];
    if (file_exists($filePath))
        unlink($filePath);

    executeQuery("DELETE FROM documents WHERE id = :id", [':id' => $id]);
    logActivity('delete', 'document', $id, $existing['name'], "Deleted: {$existing['name']}");
    successResponse(['id' => $id], 'Deleted');
}
?>