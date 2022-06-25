<?php

session_start();

//error_reporting(0);

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
        $stmt = $db->prepare("INSERT INTO bills (
                user_id,
                bill_name,
                bill_freq,
                bill_type,
                bill_amt_due,
                bill_due_date
            )
            VALUES (
                :user_id,
                :bill_name,
                :bill_freq,
                :bill_type,
                :bill_amt_due,
                :bill_due_date
            )");

        // fill in parameters
        $stmt->bindValue(':user_id', $user->user_id);
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
    //}


    $db->close();
    unset($db);
} catch (Exception $e) {
    echo $e;
}



?>