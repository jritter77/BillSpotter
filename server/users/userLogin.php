<?php

try {
  // Connect to database 
  $db = new SQLite3('../../data/billSpotter.db');

  // get params from request
  $req = json_decode($_POST['req']);


  // sqlite3 command to be executed
  $stmt = $db->prepare("SELECT * FROM users WHERE username = :username");

  // fill in parameters
  $stmt->bindValue(':username', $req->username);


  $result = $stmt->execute();

  if ($result) {
    // extract data into array 
    $myArr = array(); 
    while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
      array_push($myArr, $row);
    }



    if (!count($myArr)) {
        echo 'FAILURE';
    }
    else {
        if (!password_verify($req->password, $myArr[0]['password_hash'])) {
            echo 'FAILURE';
        }
        else {
            session_start();

            $_SESSION['user_id'] = $myArr[0]['user_id'];
            $_SESSION['username'] = $myArr[0]['username'];

            // Send client side session variables
            echo json_encode(['user_id'=>$_SESSION['user_id'], 'username'=>$_SESSION['username']]);
        }
    }

    $db->close();
    unset($db);
  }
  else {
      throw new Exception($db->lastErrorMsg());
  }

  
  
} catch (Exception $e) {
  echo $e;
}



?>