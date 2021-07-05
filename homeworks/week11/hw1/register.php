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
        <a href="./login.php">登入</a>
      </div>
    </div>
    <h2 class="board__title">註冊</h2>
    <?php 
      if (!empty($_GET['errMsg'])) {
        $err_msg = escape($_GET['errMsg']);
        echo '<h3 class="error__msg">' . set_msg($msg['err_msg'], $err_msg) . '</h3>';
      }
    ?>
    <form method="POST" action="handle_register.php">
      <div class="info__input">
        暱稱：  <input type="text" name="nickname">
      </div>
      <div class="info__input">
        帳號：  <input type="text" name="username" placeholder="輸入 6 至 15 碼字母或數字">
      </div>
      <div class="info__input">
        密碼：  <input type="password" name="password" placeholder="輸入 6 至 15 碼字母或數字">
      </div>
      <div class="info__input">
        再次輸入密碼：  <input type="password" name="confirm-password">
      </div>
      <button class="submit__btn">註冊</button>
    </form>
    <div class="board__hr"></div>
  </main>
</body>
</html>