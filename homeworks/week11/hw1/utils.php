<?php
  require_once('conn.php');
  // 建立 array 存取錯誤訊息、提示訊息
  $msg = array(
    'err_msg' => array(
      'empty_content' => '請輸入內容！',
      'empty_nickname' => '暱稱不能為空！',
      'empty_input' => '資料不齊全，請重新輸入！',
      'wrong_password' => '兩次密碼輸入不同，請重新輸入！',
      'invalid_username' => '帳號不符合規定，請重新輸入！',
      'invalid_password' => '密碼不符合規定，請重新輸入！',
      'wrong_info' => '帳號或密碼錯誤，請重新輸入！',
      'empty_role' => '請選擇修改權限',
      1062 => '帳號已被註冊，請重新輸入！',
    ),
    'success_msg' => array(
      'register_success' => '註冊成功，請再次登入！',
      'update_role' => '已修改權限！',
    )
  );
  // set 錯誤或提示訊息
  function set_msg($array, $msg) {
    if (!array_key_exists($msg, $array)) die('有地方出錯了！請重新操作');
    return $array[$msg];
  }

  function get_data_from_users($username) {
    global $conn;
    $stmt = $conn->prepare("SELECT * FROM yichen_users WHERE username = ?");
    $stmt->bind_param('s', $username);
    $result = $stmt->execute();
    if (!$result) {
      die('$conn->error');
    }
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    return $row;
  }
  // 抓 commments table 資料，分成 WHERE id=?/username=?
  function get_data_from_comments($row_name, $value) {
    global $conn;
    if ($row_name === 'id') {
      $stmt = $conn->prepare("SELECT * FROM yichen_comments WHERE id = ?");
      $stmt->bind_param('i', $value);
    }
    if ($row_name === 'username') {
      $stmt = $conn->prepare("SELECT * FROM yichen_comments WHERE username = ?");
      $stmt->bind_param('d', $value);
    }

    $result = $stmt->execute();
    if (!$result) {
      die('$conn->error');
    }
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    return $row;
  }
  // 判斷有無權限，$action 有 manage後台/create留言/update修改編輯
  function hasPermission($user_data, $action, $comment_data) {
    if (!$user_data) return false;

    switch($action) {
      case 'manage':
        if ($user_data['role'] === 'ADMIN') return true;
        break;
      case 'create':
        if ($user_data['role'] === 'ADMIN' || $user_data['role'] === 'NORMAL') return true;
        break;
      case 'update':
        if ($user_data['role'] === 'ADMIN') return true;
        if ($comment_data['username'] === $user_data['username'] && $comment_data['is_deleted'] != '1') return true;
    }
  }
  // 跳脫
  function escape($str) {
    return htmlspecialchars($str, ENT_QUOTES);
  }
?>