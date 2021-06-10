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
    <div class="board_btn">
      <a href="./index.php">回留言板</a>
      <a href="./login.php">登入</a>
    </div>
    <h2 class="board_title">註冊</h2>
    <?php 
      if (!empty($_GET['errCode'])) {
        $code = $_GET['errCode']; // $code 為字串
        if ($code === '1') $err_msg = '資料不齊全，請重新輸入！';
        if ($code === '2') $err_msg = '兩次密碼輸入不同，請重新輸入！';
        if ($code === '3') $err_msg = '帳號不符合規定，請重新輸入！';
        if ($code === '4') $err_msg = '密碼不符合規定，請重新輸入！';
        if ($code === '1062') $err_msg = '帳號已被註冊，請重新輸入！';
        echo '<h3 class="error_msg">' . $err_msg . '</h3>';
      }
    ?>
    <form method="POST" action="handle_register.php">
      <div class="info_input">
        暱稱：  <input type="text" name="nickname">
      </div>
      <div class="info_input">
        帳號：  <input type="text" name="username" placeholder="輸入 6 至 15 碼字母或數字">
      </div>
      <div class="info_input">
        密碼：  <input type="password" name="password" placeholder="輸入 6 至 15 碼字母或數字">
      </div>
      <div class="info_input">
        再次輸入密碼：  <input type="password" name="confirm-password">
      </div>
      <button class="submit_btn">註冊</button>
    </form>
    <div class="board_hr"></div>
  </main>
</body>
</html>