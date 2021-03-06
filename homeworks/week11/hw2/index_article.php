<?php 
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  if (empty($_GET['id'])) {
    header('Location: index.php');
    die();
  }
  $id = escape($_GET['id']);
  $articles_data = get_data_from_articles('id', $id);
  if (!$articles_data) {
    die('有地方出錯了！請重新操作');
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
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
  <script src="./bundle.js"></script>
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
      <li><a href="index.php">所有文章</a></li>
      <li><a href="index_list.php">文章列表</a></li>
      <li><a href="#">文章分類</a></li>
      <li><a href="login.php">後台登入</a></li>
    </nav>
  </header>
  <main class="wrapper">
    <div class="one__article-block">
      <img src="./img/test-bg.png" class="articles__img">
      <div class="one__article-content">
        <div class="one__article-info">
          <span class=".one__article-at-time"><?php echo escape($articles_data['created_at']); ?></span>
          <span class="material-icons-outlined md-16">folder</span>
          <span class=".one__article-category"><?php echo set_category_name(escape($articles_data['category'])); ?></span>
        </div>
        <h2 class="one__article-title"><?php echo escape($articles_data['title']); ?></h2>
        <p class="one__article-context"><?php echo $articles_data['content']; ?></p>
      </div>
      <div class="message_block">
        <h3 class="message_title"> Write your message here!</h3>
        <div class="comments-area"></div>
      </div>
    </div>
  </main>
  <script>
    commentPlugin.init({
      siteKey: "blog_<?php echo escape($articles_data['id']); ?>",
      apiUrl: 'http://localhost:8080/yichen/review/week12_api',
      containerSelector: '.comments-area'
    });
 
  </script>
</body>
</html>