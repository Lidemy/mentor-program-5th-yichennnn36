<?php 
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  $username = NULL;
  if ($_SESSION['username']) $username = $_SESSION['username'];
  $nickname = get_data_from_users($username)['nickname'];

  $result = $conn->query("SELECT * FROM yichen_comments ORDER BY id DESC");
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
  
  <title>留言板</title>
</head>
<body>
  <header class="warning">注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。</header>
  <main class="board">
    <div class="board_btn">
      <?php 
        if (!empty($_SESSION['username'])) {
      ?>
        <a href="./handle_logout.php">登出</a>
      <?php } else { ?>
        <a href="./register.php">註冊</a>
        <a href="./login.php">登入</a>
      <?php }?>
    </div>
    <h2 class="board_title">Comments</h2>
    <?php 
      if (!empty($_SESSION['username'])) {
    ?>
    <form method="POST" action="handle_add_comment.php">
    <?php 
      if (!empty($_GET['errCode'])) {
        $code = $_GET['errCode'];
        if ($code === '1') $err_msg = '請輸入你的內容！';
        echo '<h3 class="error_msg">' . $err_msg . '</h3>';
      }
    ?>
      <div class="name_input">
        <span>Hello!</span>
        <span class="nickname_input"><?php echo $nickname ?></span>
      </div>
      <div class="comments_input">
        <textarea name="content" rows="6" placeholder="請輸入你的留言..."></textarea>
        <button class="submit_btn">送出</button>
      </div>
    </form>
    <?php } else { ?>
      <h3 class="input_warning">/ 請登入發布留言 /</h3>
    <?php } ?>
    <div class="board_hr"></div>
    <section>
      <?php 
        while ($row = $result->fetch_assoc()) {
      ?>
        <div class="comments_block">
          <div class="comments_avatar"></div>
          <div class="comments_content">
            <div class="content_info">
              <span class="content_author"><?php echo $row['nickname']; ?></span>
              <span class="content_date">・<?php echo $row['created_at']; ?></span>
            </div>
            <p><?php echo htmlentities($row['content']); ?></p>
          </div>
        </div>
      <?php } ?>
    </section>
  </main>
</body>
</html>