<?php 
  require_once('conn.php');
  require_once('utils.php');
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
  <title>Blog 登入</title>
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
      <li><a href="login.php" class="active">後台登入</a></li>
    </nav>
  </header>

  <main class="login__wrapper">
    <h2 class="site__title">Log in</h2>
    <form method="POST" action="handle_login.php" class="login__form">
      <?php 
        if (!empty($_GET['errCode'])) {
          $code = escape($_GET['errCode']);
          echo '<h3 class="error__msg">' . set_msg($get_msg[0], $code) . '</h3>';
        }
      ?>
      <div class="login__input">
        username： <input type="text" name="username">
      </div>
      <div class="login__input">
        password： <input type="password" name="password">
      </div>
      <div class="login__btn">
        <a href="./index.php">回首頁</a>
        <button class="submit__btn">登入</button>
      </div>
    </form>
  </main>
  <script>
    document.querySelector('input[name=username]').focus();
  </script>
</body>
</html>