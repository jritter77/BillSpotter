<?php

try {
    // Connect to database 
    $db = new SQLite3('../../data/billSpotter.db');

    // sqlite3 command to be executed
    $stmt = $db->prepare("UPDATE bills SET
        bill_date_paid = null,
        bill_amt_paid = null
        where bill_id = :bill_id
    ");

    // get parameters from request
    $req = json_decode($_POST['req']);
    $user = $req->user;
    $bill = $req->bill;


    // fill in parameters
    $stmt->bindValue(':bill_id', $bill->bill_id);


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