<?php
if ($_SERVER['REQUEST_METHOD'] != 'GET') {
    header('Allow: GET');
    http_response_code(405);
    echo json_encode('Method Not Allowed');
    return;
}

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: *');

include_once '../db/Database.php';
include_once '../models/Bookmark.php';

$database = new Database();
$dbConnection = $database->connect();

$bookmark = new Bookmark($dbConnection);

if (!isset($_GET['id'])) {
    http_response_code(422);
    echo json_encode(
        array('message' => 'Error: Missing required query parameter id.')
    );
    return;
}

$bookmark->setId($_GET['id']);

if ($bookmark->readOne()) {
    $result =  array(
        'id' => $bookmark->getId(),
        'title' => $bookmark->getTitle(),
        'url' => $bookmark->getUrl(),
        'date_added' => $bookmark->getDateAdded()
    );
    echo json_encode($result);
} else {
    echo json_encode(
        array('message' => 'Error: No bookmark was found')
    );
}
