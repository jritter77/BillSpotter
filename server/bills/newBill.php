<?php

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

// get parameters from request
$req = json_decode($_POST['req']);
$user = $req->user;
$bill = $req->bill;

echo json_encode($req);



// fill in parameters
$stmt->bindValue(':user_id', $user->user_id);
$stmt->bindValue(':bill_name', $bill->bill_name);
$stmt->bindValue(':bill_freq', $bill->bill_freq);
$stmt->bindValue(':bill_type', $bill->bill_type);
$stmt->bindValue(':bill_amt_due', $bill->bill_amt_due);
$stmt->bindValue(':bill_due_date', $bill->bill_due_date);





// Execute the sqlite3 command
$result = $stmt->execute();

// Return the bill_id of the new bill
echo json_encode($db->lastInsertRowId());


$db->close();
unset($db);

?>