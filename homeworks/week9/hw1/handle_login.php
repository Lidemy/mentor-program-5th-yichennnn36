<?php
  session_start();
  require_once('conn.php');

  $username = $_POST['username'];
  $password = $_POST['password'];

  if (!$username || !$password) {
    header("Location: login.php?errCode=1");
    die();
  }
  $sql = sprintf("SELECT * FROM yichen_users WHERE username = '%s' AND password = '%s'", $username, $password);
  $result = $conn->query($sql);
  if (!$result) {
    die($conn->error);
  }
  
  if ($result->num_rows) {
    $_SESSION['username'] = $username;
    header("Location: index.php");
  } else {
    header("Location: login.php?errCode=2");
  }

?>



