<?php 
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  if (empty($_POST['nickname__update'])) {
    header('Location: index.php?errCode=emptynickname');
    die();
  }
  $username = $_SESSION['username'];
  $update_nickname = $_POST['nickname__update'];

  $stmt = $conn->prepare('UPDATE yichen_users SET nickname=? WHERE username=?');
  $stmt->bind_param('ss', $update_nickname, $username);
  $result = $stmt->execute();
  if (!$result) {
    die($conn->error);
  }
  header('Location: index.php');
?>