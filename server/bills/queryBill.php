<?php

session_start();

try {

  // get params from request
  $req = json_decode($_POST['req']);
  $user = $req->user;
  $bill = $req->bill;


  // Verify user is same as session user
 // if ($user->user_id == $_SESSION['user_id'] && $user->username == $_SESSION['username']) { 
    
    // Connect to database 
    $db = new SQLite3('../../data/billSpotter.db');

    // sqlite3 command to be executed
    $stmt = $db->prepare("SELECT * FROM bills WHERE 
        user_id = :user_id 
        AND (
            bill_id = :bill_id OR
            bill_name = :bill_name OR
            bill_freq = :bill_freq OR
            bill_amt_due = :bill_amt_due OR
            bill_due_date = :bill_due_date OR
            bill_date_paid = :bill_date_paid OR
            bill_amt_paid = :bill_date_paid
        )");

    // fill in parameters
    $stmt->bindValue(':user_id', $user->user_id);
    $stmt->bindValue(':bill_id', $bill->bill_id);
    $stmt->bindValue(':bill_name', $bill->bill_name);
    $stmt->bindValue(':bill_amt_due', $bill->bill_amt_due);
    $stmt->bindValue(':bill_due_date', $bill->bill_due_date);
    $stmt->bindValue(':bill_date_paid', $bill->bill_date_paid);
    $stmt->bindValue(':bill_amt_paid', $bill->bill_amt_paid);


    $result = $stmt->execute();

    if ($result) {
      // extract data into array 
      $myArr = array(); 
      while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
        array_push($myArr, $row);
      }

      // Return user instance 
      echo json_encode($myArr);

      $db->close();
      unset($db);
    }
    else {
        throw new Exception($db->lastErrorMsg());
    }

  //}

  
  
  
} catch (Exception $e) {
  echo $e;
}



?>