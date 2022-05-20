<?php

try {
    // Connect to database 
    $db = new SQLite3('../../data/billSpotter.db');

    // sqlite3 command to be executed
    $stmt = $db->prepare("UPDATE bills SET
        bill_name = :bill_name,
        bill_freq = :bill_freq,
        bill_type = :bill_type,
        bill_amt_due = :bill_amt_due,
        bill_due_date = :bill_due_date
        where bill_id = :bill_id
    ");

    // get parameters from request
    $req = json_decode($_POST['req']);
    $user = $req->user;
    $bill = $req->bill;


    // fill in parameters
    $stmt->bindValue(':bill_id', $bill->bill_id);
    $stmt->bindValue(':bill_name', $bill->bill_name);
    $stmt->bindValue(':bill_freq', $bill->bill_freq);
    $stmt->bindValue(':bill_type', $bill->bill_type);
    $stmt->bindValue(':bill_amt_due', $bill->bill_amt_due);
    $stmt->bindValue(':bill_due_date', $bill->bill_due_date);





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