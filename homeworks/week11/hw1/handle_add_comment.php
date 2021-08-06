<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  $username = $_SESSION['username'];
  $content = $_POST['content'];
  $user_data = get_data_from_users($username);
  $id = $user_data['id'];

  if (!$content) {
    header('Location: index.php?errMsg=empty_content');
    die();
  }
  $stmt = $conn->prepare('INSERT INTO yichen_comments(user_id, username, content) VALUES(?, ?, ?)');
  $stmt->bind_param('iss', $id, $username, $content);
  $result = $stmt->execute();
  if (!$result) {
    die($conn->error);
  }
  header('Location: index.php');
?>
