<?php
// Connect to database 
$db = new SQLite3('../../data/billSpotter.db');

// get params from request
$req = json_decode($_GET['req']);
$user = $req->user;

// sqlite3 command to be executed
$stmt = $db->prepare("SELECT * FROM bills WHERE user_id = :user_id");

// fill in parameters
$stmt->bindValue(':user_id', $user->user_id);

// Execute the sqlite3 command
$result = $stmt->execute();

// extract data into array 
$myArr = array(); 
while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
  array_push($myArr, $row);
}

// Return user instance 
echo json_encode($myArr);

$db->close();
unset($db);

?>