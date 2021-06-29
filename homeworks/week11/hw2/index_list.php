<?php 
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  $stmt = $conn->prepare('SELECT * FROM yichen_blog_articles WHERE is_deleted is NULL ORDER BY id DESC');
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
    <div class="site__icon"><a href="index.php">A</a></div>
    <label for="nav__control" class="nav__hamburger">
      <span></span>
    </label>
    <nav class="site__navbar">
      <li><a href="#">關於我</a></li>
      <li><a href="index.php">所有文章</a></li>
      <li><a href="index_list.php" class="active">文章列表</a></li>
      <li><a href="#">文章分類</a></li>
      <li><a href="login.php">後台登入</a></li>
    </nav>
  </header>
  <main class="backstage__wrapper">
    <div class="backstage__title">文章列表</div>
    <div class="articles__list">
      <?php 
        while ($row = $result->fetch_assoc()) {
      ?>
      <div class="list__block">
        <a href="index_article.php?id=<?php echo escape($row['id']); ?>">
          <div class="list__block-title"><?php echo escape($row['title']); ?></div>
          <div class="list__block-desc">
            <span><?php echo escape($row['created_at']); ?></span>
            <span class="material-icons-outlined md-16">folder</span>
            <span class="articles__category"><?php echo set_category_name(escape($row['category'])); ?></span>
          </div>
        </a>
      </div>
      <?php } ?>
    </div>
  </main>
</body>
</html>