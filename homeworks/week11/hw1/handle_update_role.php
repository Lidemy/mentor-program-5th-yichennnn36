<?php
  require_once('conn.php');
  require_once('utils.php');
  session_start();

  $username = NULL;
  $role = NULL;
  $comment_data = NULL;
  if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
    $user_data = get_data_from_users($username);
    $comment_data = get_data_from_comments('username', $username);
    if (!hasPermission($user_data, 'manage', $comment_data)) {
      header('Location:index.php');
      die();
    }
  }
  $id = escape($_GET['id']);
  $role = $_POST['role'];
  if ($role === 'SELECTED') {
    header('Location:admin.php?errMsg=empty_role&id=' . $id);
    die();
  }
  $stmt = $conn->prepare('UPDATE yichen_users SET role=? WHERE id=?');
  $stmt->bind_param('si', $role, $id);
  $result = $stmt->execute();
  if (!$result) {
    die($conn->error);
  }
  header('Location:admin.php?successMsg=update_role&id=' . $id);
?>
