<?php


session_start();

$req = json_decode($_POST['req']);
$user = $req->user;

if ($user->user_id == $_SESSION['user_id'] && $user->username == $_SESSION['username']) {
    echo true;
}
else {
    echo false;
}

?>