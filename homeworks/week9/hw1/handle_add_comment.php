<?php
  require_once('conn.php');
  require_once('utils.php');
  session_start();

  $username = $_SESSION['username'];
  $nickname = get_data_from_users($username)['nickname'];
  $content = $_POST['content'];

  if (!$content) {
    header("Location: index.php?errCode=1");
    die();
  }

  $sql = sprintf("INSERT INTO yichen_comments(nickname, content) VALUES('%s', '%s')", $nickname, $content);
  $result = $conn->query($sql);
  if (!$result) {
    die($conn->error);
  }
  header("Location: index.php");
?>
