<?php 
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  $username = NULL;
  $user_data = NULL;
  $comment_data = NULL;
  $role = NULL;
  if(!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
    $user_data = get_data_from_users($username);
    $comment_data = get_data_from_comments('username', $username);
    $role = $user_data['role'];
    $nickname = $user_data['nickname'];
  }
  
  $page = 1;
  if (!empty($_GET['page'])) {
    $page = intval($_GET['page']);
  }
  $limit = 5;
  $offset = ($page - 1) * $limit;

  $stmt = $conn->prepare(
    "SELECT " . 
    "C.id, C.username, C.content, C.is_deleted," .
    "C.created_at, U.nickname " .
    "FROM yichen_comments as C " . 
    "LEFT JOIN yichen_users as U on C.username = U.username " .
    "WHERE C.is_deleted is NULL " .
    "ORDER BY C.id DESC limit ? offset ?"
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
  <title>留言板</title>
</head>
<body>
  <header class="warning">注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。</header>
  <main class="board">
    <div class="board__btn">
      <div class="board_btn-users">
      <?php 
        if (!empty($_SESSION['username'])) {
      ?>
        <a href="./handle_logout.php">登出</a>
        <a href="#" name="update__btn">編輯暱稱</a>
      <?php } else { ?>
        <a href="./register.php">註冊</a>
        <a href="./login.php">登入</a>
      <?php }?>
      </div>
      <div class="board_btn-backstage">
        <?php
          if (hasPermission($user_data, 'manage', $comment_data)) {
        ?>
          <a href="./admin.php">後台管理</a>
        <?php } ?>
      </div>
    </div>
    <form method="POST" action="handle_update_nickname.php" class="nickname__update-form">
      <input type="text" class="nickname__update hide" name="nickname__update">
      <button class="submit__btn hide">編輯完成</button>
    </form>
    <h2 class="board__title">Comments</h2>
    <?php 
      if (!empty($_SESSION['username'])) {
    ?>
      <div class="name__input">
        <span>Hello!</span>
        <span class="nickname__input"><?php echo escape($nickname); ?></span>
      </div>
    <?php } ?>
    <?php 
      if (hasPermission($user_data, 'create', $comment_data)) {
    ?>
    <form method="POST" action="handle_add_comment.php">
    <?php 
      if (!empty($_GET['errMsg'])) {
        $err_msg = escape($_GET['errMsg']);
        echo '<h3 class="error__msg">' . set_msg($msg['err_msg'], $err_msg) . '</h3>';
      }
    ?>
      <div class="comments__input">
        <textarea name="content" rows="6" placeholder="請輸入你的留言..."></textarea>
        <button class="submit__btn">送出</button>
      </div>
    </form>
    <?php } else if (escape($role) === 'SUSPENDED') { ?>
      <h3 class="input__warning">/ 你沒有發佈留言的權限 /</h3>
    <?php } else { ?>
      <h3 class="input__warning">/ 請登入發布留言 /</h3>
    <?php } ?>
    <div class="board__hr"></div>
    <section>
    <?php 
      while ($row = $result->fetch_assoc()) {
    ?>
      <div class="comments__block">
        <div class="comments__avatar"></div>
        <div class="comments__content">
          <div class="content__info">
            <span class="content__author"><?php echo escape($row['nickname']); ?></span>
            <span class="content__author">(@<?php echo $row['username']; ?>)</span>
            <span class="content__date">・<?php echo $row['created_at']; ?></span>
            <?php if (hasPermission($user_data, 'update', $row)) { ?>
              <div class="function_btn">
                <a href="update_comment.php?id=<?php echo $row['id']; ?>">
                  <span class="material-icons-outlined">create</span>
                </a>
                <a href="handle_del_comment.php?id=<?php echo $row['id']; ?>">
                  <span class="material-icons-outlined">delete_forever</span>
                </a>
              </div>
            <? } ?>
          </div>
          <p><?php echo escape($row['content']); ?></p>
        </div>
      </div>
    <?php } ?>
    </section>
    <div class="board__hr"></div>
    <?php 
      $stmt = $conn->prepare("SELECT count(id) FROM yichen_comments WHERE is_deleted IS NULL");
      $result = $stmt->execute();
      $result = $stmt->get_result();
      $row = $result->fetch_assoc();
      $count = $row['count(id)'];
      $total_page = ceil($count / $limit);
    ?>
    <div class="pagination">
      <?php 
        echo '在 第 ' . $page . ' 頁 / 共 ' . $total_page . ' 頁';
      ?>
      <div class="pagination__btn">
        <?php 
          if ($page != 1) {
        ?>
          <a href="index.php?page=1"><?php echo '第一頁' ?></a>
          <a href="index.php?page=<?php echo $page - 1 ?>"><?php echo '上一頁' ?></a>
        <?php } ?>
        <?php 
          if ($page != $total_page) {
        ?>
          <a href="index.php?page=<?php echo $page + 1 ?>"><?php echo '下一頁' ?></a>
          <a href="index.php?page=<?php echo $total_page ?>"><?php echo '最後一頁' ?></a>
        <?php } ?>
      </div>
    </div>
  </main>
  <script>
    if (document.querySelector('.nickname__input')) {
      const nickname = document.querySelector('.nickname__input').innerText;
    }
    const inputUpdate = document.querySelector('form [name=nickname__update]');
    const btnUpdateDone = document.querySelector('.nickname__update-form button');
    const btnUpdate = document.querySelector('.board__btn [name=update__btn]');

    if (btnUpdate) {
      btnUpdate.addEventListener('click', (e) => {
        inputUpdate.classList.toggle('hide');
        btnUpdateDone.classList.toggle('hide');
        inputUpdate.setAttribute('value', nickname);
        setFocus(inputUpdate);
      });
    }

    // 游標挪至 input 最後一位
    function setFocus(obj) {
      obj.focus();
      const len = obj.value.length;
      if (document.selection) {
        const sel = obj.createTextRange();
        sel.moveStart('character', len); // 設定開頭的位置
        sel.collapse();
        sel.select();
      } else if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
        obj.selectionStart = obj.selectionEnd = len;
      }
    }
  </script>
</body>
</html>