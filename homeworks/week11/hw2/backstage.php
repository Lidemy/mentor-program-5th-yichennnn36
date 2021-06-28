<?php 
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  $username = $_SESSION['username'];
  // 管理權限 檢查
  if (empty($_SESSION['username'])) {
    header('Location: index.php');
    die();
  }
  $stmt = $conn->prepare("SELECT * FROM yichen_blog_articles WHERE is_deleted is NULL ORDER BY id DESC");
  $stmt->execute();
  $result = $stmt->get_result();
  if (!$result) {
    die($conn->error);
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
  <link href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp" rel="stylesheet">
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
      <li><a href="backstage.php" class="active">文章列表</a></li>
      <li><a href="#">文章分類</a></li>
      <li><a href="create_article.php">新增文章</a></li>
      <li><a href="handle_logout.php">登出</a></li>
    </nav>
  </header>
  <main class="backstage__wrapper">
    <div class="backstage__title">文章列表</div>
    <div class="articles__list">
      <?php
        if (!empty($_GET['msg'])) {
          $msg = escape($_GET['msg']);
          echo '<h3 class="error__msg">' . set_msg($get_msg[1], $msg) . '</h3>';
        }
      ?>
      <?php 
        while ($row = $result->fetch_assoc()) {
      ?>
      <div class="list__block">
        <div class="list__block-title"><?php echo escape($row['title'])?></div>
        <div class="list__block-desc">
          <span><?php echo escape($row['created_at'])?></span>
          <span class="material-icons-outlined md-16">folder</span>
          <span class="articles__category"><?php echo set_category_name(escape($row['category'])); ?></span>
          <a href="update_article.php?id=<?php echo escape($row['id']); ?>">編輯</a>
          <a href="handle_delete_article.php?id=<?php echo escape($row['id']); ?>">刪除</a>
        </div>
      </div>
      <?php } ?>
    </div>
  </main>
</body>
</html>