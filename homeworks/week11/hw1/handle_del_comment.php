<?php 
  require_once('conn.php');
  require_once('utils.php');
  session_start();

  $username = $_SESSION['username'];
  $user_data = get_data_from_users($username);
  $id = escape($_GET['id']);

  $comment_data = get_data_from_comments('id', $id);
  if (!$comment_data) {
    die('有地方出錯了！請重新操作');
  }
  if (hasPermission($user_data, 'update', $comment_data)) {
    $stmt = $conn->prepare('UPDATE yichen_comments SET is_deleted = "true" WHERE id = ?');
    $stmt->bind_param('i', $id);
  } else {
    $stmt = $conn->prepare('UPDATE yichen_comments SET is_deleted = "true" WHERE id = ? AND username = ?');
    $stmt->bind_param('is', $id, $username);
  }
  $result = $stmt->execute();
  if (!$result) {
    die($conn->error);
  }
  header('Location: index.php');
?>