<?php

session_start();

try {

    // get parameters from request
    $req = json_decode($_POST['req']);
    $user = $req->user;
    $bill = $req->bill;

    // Verify user is same as session user
    //if ($user->user_id == $_SESSION['user_id'] && $user->username == $_SESSION['username']) {
        
        // Connect to database 
        $db = new SQLite3('../../data/billSpotter.db');

        // sqlite3 command to be executed
        $stmt = $db->prepare("DELETE from bills
            where bill_id = :bill_id
        ");

        


        // fill in parameters
        $stmt->bindValue(':bill_id', $bill->bill_id);



        // Execute the sqlite3 command
        if ($stmt->execute()) {
            echo 'SUCCESS';
        }
        else {
            throw new Exception($db->lastErrorMsg());
        }
    //}

    



    $db->close();
    unset($db);
} catch (Exception $e) {
    echo $e;
}

?>