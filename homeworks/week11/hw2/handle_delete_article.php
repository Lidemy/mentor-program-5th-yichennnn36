<?php 
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  $username = $_SESSION['username'];
  // 管理權權限檢查
  if (!($username === 'admin123')) {
    header('Location: index.php');
    die();
  }
  if (!empty($_GET['id'])) {
    $id = escape($_GET['id']);
    $articles_data = get_data_from_articles('id', $id);
  } else {
    header('Location: backstage.php');
  }
  $stmt = $conn->prepare("UPDATE yichen_blog_articles SET is_deleted = 1 WHERE id = ?");
  $stmt->bind_param('i', $id);
  $result = $stmt->execute();
  if (!$result) {
    die($conn->error);
  }
  header('Location: backstage.php');
?>


