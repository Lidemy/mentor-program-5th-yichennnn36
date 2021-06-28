<?php 
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  $username = $_SESSION['username'];
  $id = $_POST['id'];
  $title = $_POST['article__title'];
  $category = $_POST['category'];
  $content = $_POST['content'];

  // 管理權權限檢查
  if (!($username === 'admin123')) {
    header("Location: index.php");
    die();
  }
  // 輸入內容檢查
  if (!$title || $category === 'not-selected'|| !$content) {
    header('Location: update_article.php?errCode=emptyinput&id=' . $id);
    die();
  }
  $stmt = $conn->prepare(
    "UPDATE yichen_blog_articles SET " . 
    "title = ?, category = ?, content = ? WHERE id = ?"
  );
  $stmt->bind_param('sssi', $title, $category, $content, $id);
  $result = $stmt->execute();
  if (!$result) {
    die($conn->error);
  }
  header('Location: backstage.php?msg=updatesuccess');
?>