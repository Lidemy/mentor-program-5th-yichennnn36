<?php
  require_once('conn.php');
  require_once('utils.php');
  session_start();

  $username = $_SESSION['username'];
  $content = $_POST['content'];

  if (!$content) {
    header('Location: index.php?errMsg=empty_content');
    die();
  }
  $stmt = $conn->prepare('INSERT INTO yichen_comments(username, content) VALUES(?, ?)');
  $stmt->bind_param('ss', $username, $content);
  $result = $stmt->execute();
  if (!$result) {
    die($conn->error);
  }
  header('Location: index.php');
?>
