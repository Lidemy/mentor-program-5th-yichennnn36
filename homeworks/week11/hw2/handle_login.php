<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  $username = escape($_POST['username']);
  $password = escape($_POST['password']);

  if (!$username || !$password) {
    header('Location: login.php?errMsg=empty_input');
    die();
  }
  $user_data = get_data_from_users($username);
  if (!$user_data) {
    header('Location: login.php?errMsg=wrong_info');
    die();
  }
  $hash_password = escape($user_data['password']);
  // password_verify($password, $hash_password) 用來比對 hash 之後的密碼
  if (!password_verify($password, $hash_password)) {
    header('Location: login.php?errMsg=wrong_info');
    die();
  }
  $_SESSION['username'] = $username;
  header('Location: backstage.php');
?>



