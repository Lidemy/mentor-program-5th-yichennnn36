<?php 
  require_once('conn.php');
  require_once('utils.php');
  
  $nickname = escape($_POST['nickname']);
  $username = escape($_POST['username']);
  $password = escape($_POST['password']);
  $confirm_password = escape($_POST['confirm-password']);

  // function 判斷是否符合 6-15碼 英文字母或數字
  function is_valid_pass($str) {
    if (preg_match('/^[a-zA-Z0-9]{6,15}+$/', $str)) {
      return true;
    }
  }

  if (!$nickname || !$username || !$password || !$confirm_password) {
    header("Location: register.php?errMsg=empty_input");
    die();
  }
  if ($password !== $confirm_password) {
    header("Location: register.php?errMsg=wrong_password");
    die();
  }
  if (!is_valid_pass($username)) {
    header("Location: register.php?errMsg=invalid_username");
    die();
  }
  if (!is_valid_pass($password)) {
    header("Location: register.php?errMsg=invalid_password");
    die();
  }

  // hash
  $hash_password = password_hash($_POST['password'], PASSWORD_DEFAULT);
  $hash_confirm_password = password_hash($_POST['confirm-password'], PASSWORD_DEFAULT);

  $stmt = $conn->prepare("INSERT INTO yichen_users(nickname, username, password, confirm_password) VALUES (?, ?, ?, ?)");
  $stmt->bind_param('ssss', $nickname, $username, $hash_password, $hash_confirm_password);

  $result = $stmt->execute();
  if (!$result) {
    $code = $conn->errno;
    if ($code === 1062) {
      header('Location: register.php?errMsg=1062');
      die();
    }
    die($conn->error);
  }
  header('Location: login.php?successMsg=register_success'); // 導回登入頁面並顯示再次登入
?>