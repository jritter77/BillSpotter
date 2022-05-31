<?php

//error_reporting(0);

try {
    // Connect to database 
    $db = new SQLite3('../../data/billSpotter.db');

    // sqlite3 command to be executed
    $stmt = $db->prepare("INSERT INTO users (
            username,
            password_hash
        )
        VALUES (
            :username,
            :password_hash
        )");

    // get parameters from request
    $req = json_decode($_POST['req']);
    


    // fill in parameters
    $stmt->bindValue(':username', $req->username);
    $stmt->bindValue(':password_hash', password_hash($req->password, PASSWORD_DEFAULT));
    





    // Execute the sqlite3 command
    if ($stmt->execute()) {
        echo 'SUCCESS';
    }
    else {
        throw new Exception($db->lastErrorMsg());
    }



    $db->close();
    unset($db);
} catch (Exception $e) {
    echo $e;
}



?>