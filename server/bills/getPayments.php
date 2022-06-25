<?php

session_start();

try {

  // get params from request
  $req = json_decode($_GET['req']);
  $user = $req->user;


  // Verify user is same as session user
 // if ($user->user_id == $_SESSION['user_id'] && $user->username == $_SESSION['username']) { 
    
    // Connect to database 
    $db = new SQLite3('../../data/billSpotter.db');

    // sqlite3 command to be executed
    $stmt = $db->prepare("SELECT * FROM bills WHERE user_id = :user_id AND bill_date_paid IS NOT NULL");

    // fill in parameters
    $stmt->bindValue(':user_id', $user->user_id);


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