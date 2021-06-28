<?php 
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  $username = NULL;
  $role = NULL;
  $comment_data = NULL;
  if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
    $user_data = get_data_from_users($username);
    $comment_data = get_data_from_comments('username', $username);
    if (!hasPermission($user_data, 'manage', $comment_data)) {
      header('Location:index.php');
      die();
    }
  }
  $page = 1;
  if (!empty($_GET['page'])) {
    $page = intval($_GET['page']);
  }
  $limit = 10;
  $offset = ($page - 1) * $limit;

  $stmt = $conn->prepare('SELECT * FROM yichen_users ORDER BY id ASC limit ? offset ?');
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
  
  <title>留言板後台</title>
</head>
<body>
  <header class="warning">注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。</header>
  <main class="board stage__board">
    <div class="board__btn">
      <div class="board_btn-users">
        <a href="./handle_logout.php">登出</a>
        <a href="./index.php">回留言板</a>
      </div>
    </div>
    <?php 
      if (!empty($_GET['msg'])) {
        $msg = escape($_GET['msg']);
        $id = escape($_GET['id']);
        echo '<h3 class="success__msg"># ID:' . $id . ' ' . set_msg($get_msg[1], $msg) . '</h3>';
      }
      if (!empty($_GET['errCode'])) {
        $code = escape($_GET['errCode']);
        $id = escape($_GET['id']);
        echo '<h3 class="error__msg"># ID:' . $id . ' ' . set_msg($get_msg[0], $code) . '</h3>';
      }
    ?>
    <section class="section__table">
      <table class="backstage__table">
        <thead>
          <tr>
            <th width="60px">ID</th>
            <th width="160px">Role</th>
            <th width="300px">Username</th>
            <th width="300px">Nickname</th>
            <th width="200px">權限調整</th>
          </tr>
        </thead>
        <?php
          while ($row = $result->fetch_assoc()) {
        ?>
        <tbody>
          <tr>
            <td><?php echo escape($row['id']);?></td>
            <td><?php echo escape($row['role']);?></td>
            <td><?php echo escape($row['username']);?></td>
            <td><?php echo escape($row['nickname']);?></td>
            <td>
              <form method="POST" action="./handle_update_role.php?id=<?php echo escape($row["id"]); ?>">
                <select name="role">
                  <option value="SELECTED">選擇</option>
                  <option value="NORMAL">一般使用者</option>
                  <option value="ADMIN">管理員</option>
                  <option value="SUSPENDED">停權使用者</option>
                </select>
                <button class="role__fix-btn">修改</button>
              </form>
            </td>
          </tr>
        </tbody>
        <?php } ?>
      </table>
    </section>
    <?php 
      $stmt = $conn->prepare('SELECT count(id) FROM yichen_users');
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
          <a href="admin.php?page=1"><?php echo '第一頁' ?></a>
          <a href="admin.php?page=<?php echo $page - 1 ?>"><?php echo '上一頁' ?></a>
        <?php } ?>
        <?php 
          if ($page != $total_page) {
        ?>
          <a href="admin.php?page=<?php echo $page + 1 ?>"><?php echo '下一頁' ?></a>
          <a href="admin.php?page=<?php echo $total_page ?>"><?php echo '最後一頁' ?></a>
        <?php } ?>
      </div>
    </div>
  </main>
</body>
</html>