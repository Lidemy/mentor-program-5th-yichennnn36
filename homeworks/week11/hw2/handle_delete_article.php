<?php 
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  // 管理權限 檢查
  if (empty($_SESSION['username'])) {
    header('Location: index.php');
    die();
  }
  if (empty($_GET['id'])) {
    header('Location: backstage.php');
    die();
  }
  $id = escape($_GET['id']);
  $username = $_SESSION['username'];
  $articles_data = get_data_from_articles('id', $id);
  if (!$articles_data) {
    die('有地方出錯了！請重新操作');
  }
  $stmt = $conn->prepare("UPDATE yichen_blog_articles SET is_deleted = 1 WHERE id = ?");
  $stmt->bind_param('i', $id);
  $result = $stmt->execute();
  if (!$result) {
    die($conn->error);
  }
  header('Location: backstage.php');
?>


