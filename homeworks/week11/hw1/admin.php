<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  $username = NULL;
  $comment_data = NULL;
  if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
    $user_data = get_data_from_users($username);
    $comment_data = get_data_from_comments('username', $username);
    if (!hasPermission($user_data, 'manage', $comment_data)) {
      header('Location:index.php');
      die();
    }
  } else {
    header('Location:index.php');
    die();
  }
  $role_datas = get_data_from_role();
  $role_array = array();
  while ($data = $role_datas->fetch_assoc()) {
    $temp = array(
      'role_id' => $data['id'],
      'role' => $data['role']
    );
    array_push($role_array, $temp);
  }
  $page = 1;
  if (!empty($_GET['page'])) {
    $page = intval($_GET['page']);
  }
  $limit = 10;
  $offset = ($page - 1) * $limit;

  $sql =
    'SELECT U.id, U.username, U.nickname, R.role ' .
    'FROM yichen_users as U ' . 
    'LEFT JOIN yichen_role as R on U.role_id = R.id ' .
    'ORDER BY U.id ASC limit ? offset ?';
  $stmt = $conn->prepare($sql);
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
  
  <title>純後端 留言板後台</title>
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
      if (!empty($_GET['successMsg'])) {
        $success_msg = escape($_GET['successMsg']);
        if ($success_msg === 'update_permission' || $success_msg === 'add_new_permission') {
          echo '<h3 class="success__msg">' . set_msg($msg['success_msg'], $success_msg) . '</h3>';
        } else {
          $id = escape($_GET['id']);
          echo '<h3 class="success__msg"># ID:' . $id . ' ' . set_msg($msg['success_msg'], $success_msg) . '</h3>';
        }
      }
      if (!empty($_GET['errMsg'])) {
        $err_msg = escape($_GET['errMsg']);
        $id = escape($_GET['id']);
        echo '<h3 class="error__msg"># ID:' . $id . ' ' . set_msg($msg['err_msg'], $err_msg) . '</h3>';
      }
    ?>
    <section class="section__table">
      <table class="backstage__table">
        <thead>
          <tr>
            <th width="160px">權限角色</th>
            <th width="600px">說明</th>
          </tr>
        </thead>
        <tbody>
        <?php
          $datas = get_data_from_role();
          while ($role_data = $datas->fetch_assoc()) {
        ?>
          <tr>
            <td><?php echo escape($role_data['role']); ?></td>
            <td>
              <form method="POST" action="./handle_update_permission.php?id=<?php echo escape($role_data['id']); ?>">
                <input type="checkbox" name="permission[]" value="add_comment" id="1" <?php if ($role_data['add_comment'] == 1) { ?> checked <?php } ?> ><label for="1"> 新增文章</label>
                <input type="checkbox" name="permission[]" value="update_all_comment" id="2" <?php if ($role_data['update_all_comment'] == 1) { ?> checked <?php } ?> ><label for="2"> 編輯所有留言</label>
                <input type="checkbox" name="permission[]" value="delete_all_comment" id="3" <?php if ($role_data['delete_all_comment'] == 1) { ?> checked <?php } ?> ><label for="3"> 刪除所有留言</label>
                <input type="checkbox" name="permission[]" value="update_self_comment" id="4" <?php if ($role_data['update_self_comment'] == 1) { ?> checked <?php } ?> ><label for="4"> 編輯自己的留言</label>
                <input type="checkbox" name="permission[]" value="delete_self_comment" id="5" <?php if ($role_data['delete_self_comment'] == 1) { ?> checked <?php } ?> ><label for="5"> 刪除自己的留言</label>
                <button class="role__fix-btn">SAVE</button>
              </form>
            </td>
          <tr>
        <?php } ?>
        </tbody>
      </table>
    </section>
    <section>
      <form method="POST" action="handle_add_permission.php">
        <div>    
          自定義權限角色：  <input type="text" name="permission_role">
        </div>
        <div>
          <input type="checkbox" name="permission[]" value="add_comment" id="1"><label for="1"> 新增文章</label>
          <input type="checkbox" name="permission[]" value="update_all_comment" id="2"><label for="2"> 編輯所有留言</label>
          <input type="checkbox" name="permission[]" value="delete_all_comment" id="3"><label for="3"> 刪除所有留言</label>
          <input type="checkbox" name="permission[]" value="update_self_comment" id="4"><label for="4"> 編輯自己的留言</label>
          <input type="checkbox" name="permission[]" value="delete_self_comment" id="5"><label for="5"> 刪除自己的留言</label>
          <button class="role__fix-btn">送出</button>
        <div>
      </form>
    </section>
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
              <form method="POST" action="./handle_update_role.php?id=<?php echo escape($row['id']); ?>">
                <select name="role">
                  <option value="SELECTED">選擇</option>
                  <?php 
                    for ($i = 0; $i < count($role_array); $i++) {
                  ?>
                  <option value="<?php echo escape($role_array[$i]['role_id']); ?>"><?php echo escape($role_array[$i]['role']); ?></option>
                  <?php } ?>
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


