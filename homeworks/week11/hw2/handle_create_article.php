<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  $title = $_POST['article__title'];
  $category = $_POST['category'];
  $content = $_POST['content'];
  
  // 管理權限 檢查
  if (empty($_SESSION['username'])) {
    header('Location: index.php');
    die();
  } else {
    $username = $_SESSION['username'];
  }
  // 輸入內容檢查
  if (!$title || $category === 'not-selected'|| !$content) {
    header('Location: create_article.php?errCode=emptyinput');
    die();
  }
  // 寫入資料庫
  $stmt = $conn->prepare("INSERT INTO yichen_blog_articles(title, content, category) VALUES(?, ?, ?)");
  $stmt->bind_param('sss', $title, $content, $category);
  $result = $stmt->execute();
  if (!$result) {
    die($conn->error);
  }
  header('Location: backstage.php?msg=addsuccess');
?>



