<?php 
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  // 管理權限 檢查
  if (empty($_SESSION['username'])) {
    header('Location: index.php');
    die();
  } else {
    $username = $_SESSION['username'];
  }
?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="./style.css">
  <link rel="stylesheet" href="./reset.css">
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=Nunito&display=swap" rel="stylesheet">
  <title>Blog 後台</title>
</head>

<body>
  <input type="checkbox" id="nav__control">
  <header class="site__header">
    <div class="site__icon"><a href="backstage.php">A</a></div>
    <label for="nav__control" class="nav__hamburger">
      <span></span>
    </label>
    <nav class="site__navbar">
      <li><a href="backstage.php">文章列表</a></li>
      <li><a href="#">文章分類</a></li>
      <li><a href="create_article.php" class="active">新增文章</a></li>
      <li><a href="handle_logout.php">登出</a></li>
    </nav>
  </header>
  <main class="backstage__wrapper">
    <div class="backstage__title">新增文章</div>
    <form method="POST" action="handle_create_article.php" class="add__article-block">
      <?php
        if (!empty($_GET['errCode'])) {
          $code = escape($_GET['errCode']);
          echo '<h3 class="error__msg">' . set_msg($get_msg[0], $code) . '</h3>';
        }
      ?>
      <h3 class="add__article-title">發表文章：</h3>
      <input type="text" placeholder="請輸入文章標題" name="article__title">
      <select name="category">
        <option value="not-selected">請選擇文章分類</option>
        <option value="uncategorized">未分類</option>
        <option value="life">生活紀錄</option>
        <option value="note">筆記</option>
        <option value="share">分享</option>
        <option value="art">藝術</option>
      </select>
      <div class="add__article-input">
        <textarea name="content" row="6"></textarea>
      </div>
      <div class="submit__btn">
        <button>送出</button>
      </div>
    </form>
  </main>
</body>
</html>