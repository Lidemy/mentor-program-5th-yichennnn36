<?php 
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  if (empty($_POST['content'])) {
    header('Location: update_comment.php?errMsg=empty_content&id=' . escape($_POST['id']));
    die();
  }
  $username = $_SESSION['username'];
  $id = escape($_POST['id']);
  $content = $_POST['content'];
  $user_data = get_data_from_users($username);
  $comment_data = get_data_from_comments('id', $id);
  // admin 可修改刪除所有人的留言
  if (hasPermission($user_data, 'update', $comment_data)) {
    $stmt = $conn->prepare('UPDATE yichen_comments SET content=? WHERE id=?');
    $stmt->bind_param('si', $content, $id);
  } else {
    $stmt = $conn->prepare('UPDATE yichen_comments SET content=? WHERE id=? AND username=?');
    $stmt->bind_param('sis', $content, $id, $username);
  }
  $result = $stmt->execute();
  if (!$result) {
    die($conn->error);
  }
  header('Location: index.php');
?>