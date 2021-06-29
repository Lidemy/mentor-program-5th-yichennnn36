<?php 
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  $username = $_SESSION['username'];
  $user_data = get_data_from_users($username);
  $id = escape($_GET['id']);

  $comment_data = get_data_from_comments('id', $id);

  if (hasPermission($user_data, 'update', $comment_data)) {
    $stmt = $conn->prepare('UPDATE yichen_comments SET is_deleted=1 WHERE id=?');
    $stmt->bind_param('i', $id);
  } else {
    $stmt = $conn->prepare('UPDATE yichen_comments SET is_deleted=1 WHERE id=? AND username=?');
    $stmt->bind_param('is', $id, $username);
  }
  $result = $stmt->execute();
  if (!$result) {
    die($conn->error);
  }
  header('Location: index.php');
?>