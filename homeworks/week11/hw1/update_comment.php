<?php 
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  $username = NULL;
  $user_data = NULL;
  if(!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
    $user_data = get_data_from_users($username);
  }
  if (empty($_GET['id'])) {
    header('Location: index.php');
    die();
  }
  $id = escape($_GET['id']);
  $comment_data = get_data_from_comments('id', $id);
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
    <h2 class="board__title">Edit your comment !</h2>
    <?php 
      if (hasPermission($user_data, 'update', $comment_data)) {
    ?>
      <form method="POST" action="handle_update_comment.php">
        <?php 
          if (!empty($_GET['errCode'])) {
            $code = escape($_GET['errCode']);
            echo '<h3 class="error__msg">' . set_msg($get_msg[0], $code) . '</h3>';
          }
        ?>
        <div class="comments__input">
          <textarea name="content" rows="6"><?php echo escape($comment_data['content']); ?></textarea>
          <input type="hidden" name="id" value="<?php echo escape($comment_data['id']); ?>">
          <button class="submit__btn">送出</button>
        </div>
      </form>
    <?php } else { ?>
      <h3 class="error__msg">你沒有權限！</h3>
    <?php } ?>
    <div class="board__hr"></div>
  </main>
</body>
</html>