<?php 
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  $page = 1;
  if (!empty($_GET['page'])) {
    $page = intval($_GET['page']); // intval() 函式將字串轉換為整型 int 。
  }
  $limit = 5; // 一頁五篇文章
  $offset = ($page - 1) * $limit;

  $stmt = $conn->prepare(
    "SELECT * FROM yichen_blog_articles WHERE is_deleted is NULL " . 
    "ORDER BY id DESC LIMIT ? OFFSET ?"
  );
  $stmt->bind_param('ii', $limit, $offset);
  $result = $stmt->execute();
  if (!$result) {
    die($conn->error);
  }
  $result = $stmt->get_result();
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
  <title>Blog</title>
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
      <li><a href="index.php" class="active">所有文章</a></li>
      <li><a href="index_list.php">文章列表</a></li>
      <li><a href="#">文章分類</a></li>
      <li><a href="login.php">後台登入</a></li>
    </nav>
  </header>
  <main class="wrapper">
    <div class="site__title">The Blog</div>
    <div class="site__articles">
      <?php 
        while ($row = $result->fetch_assoc()) {
      ?>
      <div class="articles__block">
        <img src="./img/test-bg.png" class="articles__img">
        <div class="articles__content">
          <div class="articles__info">
            <span class="articles__at-time"><?php echo escape($row['created_at']); ?></span>
            <span class="material-icons-outlined md-16">folder</span>
            <span class="articles__category"><?php echo set_category_name(escape($row['category'])); ?></span>
          </div>
          <h2 class="articles__title"><?php echo escape($row['title']); ?></h2>
          <p class="articles__context"><?php echo escape($row['content']); ?></p>
          <div class="articles__btn">
            <a href="index_article.php?id=<?php echo escape($row['id']); ?>">Read more...</a>
          </div>
        </div>
      </div>
      <?php } ?>
    </div>
    <?php 
      $stmt->prepare('SELECT count(*) FROM yichen_blog_articles WHERE is_deleted IS NULL');
      $stmt->execute();
      $result = $stmt->get_result();
      if (!$result) {
        die($conn->error);
      }
      $row = $result->fetch_assoc();
      $count = $row['count(*)'];
      $total_page = ceil($count/$limit);
    ?>
    <div class="pagination">
      <?php
        if ($page != 1) { 
      ?>
        <a href="index.php?page=<?php echo $page - 1; ?>"> < </a>
      <?php } ?>
        <a href=""><?php echo $page; ?> / <?php echo $total_page; ?></a>
      <?php 
        if ($page != $total_page) {
      ?>
        <a href="index.php?page=<?php echo $page + 1; ?>"> > </a>
      <?php } ?>
    </div>
  </main>
</body>
</html>