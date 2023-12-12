<?php

if ($_SERVER['REQUEST_METHOD'] != 'DELETE') {
    header('Allow: DELETE');
    http_response_code(405);
    echo json_encode('Method Not Allowed');
    return;
}

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: DELETE');
header('Access-Control-Allow-Headers: *');

include_once '../db/Database.php';
include_once '../models/Bookmark.php';

$database = new Database();
$dbConnection = $database->connect();

$bookmark = new Bookmark($dbConnection);

$data = json_decode(file_get_contents("php://input"));
if(!$data || !$data->id){
    http_response_code(422);
    echo json_encode(
        array('message' => 'Error: Missing required parameter id in the JSON body.')
    );
    return;
}

$bookmark->setId($data->id);

if ($bookmark->delete()) {
    echo json_encode(
        array('message' => 'A bookmark was deleted.')
    );
} else {
    echo json_encode(
        array('message' => 'Error: a bookmark was not deleted.')
    );
}
