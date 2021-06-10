<?php 
  require_once('conn.php');

  $nickname = $_POST['nickname'];
  $username = $_POST['username'];
  $password = $_POST['password'];
  $confirm_password = $_POST['confirm-password'];
  // function 判斷是否符合 6-15碼 英文字母或數字
  function is_valid_pass($str) {
    if (preg_match('/^[a-zA-Z0-9]{6,15}+$/', $str)) {
      return true;
    }
  }

  if (!$nickname || !$username || !$password || !$confirm_password) {
    header("Location: register.php?errCode=1");
    die();
  }
  if ($password !== $confirm_password) {
    header("Location: register.php?errCode=2");
    die();
  }
  if (!is_valid_pass($username)) {
    header("Location: register.php?errCode=3");
    die();
  }
  if (!is_valid_pass($password)) {
    header("Location: register.php?errCode=4");
    die();
  }

  $sql = sprintf("INSERT INTO yichen_users(nickname, username, password, confirm_password) VALUES('%s', '%s', '%s', '%s')", $nickname, $username, $password, $confirm_password);
  $result = $conn->query($sql);
  if (!$result) {
    $code = $conn->errno;
    if ($code === 1062) {
      header("Location: register.php?errCode=1062");
      die();
    }
    die($conn->error);
  }

  header("Location: login.php?msg=1"); // 導回登入頁面並顯示再次登入
?>