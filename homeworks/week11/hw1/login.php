<?php
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
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400&display=swap" rel="stylesheet">
  <title>留言板</title>
</head>
<body>
  <header class="warning">注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。</header>
  <main class="board">
    <div class="board__btn">
      <div class="board_btn-users">
        <a href="./index.php">回留言板</a>
        <a href="./register.php">註冊</a>
      </div>
    </div>
    <h2 class="board__title">登入</h2>
    <?php 
      if (!empty($_GET['msg'])) {
        $msg = escape($_GET['msg']);
        echo '<h3 class="success__msg">' . set_msg($get_msg[1], $msg) . '</h3>';
      }
    ?>
    <?php 
      if (!empty($_GET['errCode'])) {
        $code = escape($_GET['errCode']);
        echo '<h3 class="error__msg">' . set_msg($get_msg[0], $code) . '</h3>';
      }
    ?>
    <form method="POST" action="handle_login.php">
      <div class="info__input">
        帳號：  <input type="text" name="username">
      </div>
      <div class="info__input">
        密碼：  <input type="password" name="password">
      </div>
      <button class="submit__btn">登入</button>
    </form>
    <div class="board__hr"></div>
  </main>
</body>
</html>