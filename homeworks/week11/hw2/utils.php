<?php
  require_once('conn.php');
  // 建立 array 存取訊息，分為(err_code 錯誤訊息、msg 提示訊息)
  $msg = array(
    'err_msg' => array(
      'empty_content' => '請輸入內容！',
      'empty_input' => '資料不齊全，請重新輸入！',
      'wrong_info' => '帳號或密碼錯誤，請重新輸入！',
    ),
    'success_msg' => array(
      'add_success' => '文章新增成功！',
      'update_success' => '文章修改成功！',
    )
  );

  // set 錯誤或提示訊息
  function set_msg($array, $msg) {
    // 避免使用者利用網址輸入奇怪的內容
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
  function get_data_from_articles($row_name, $value) {
    global $conn;
    if ($row_name === 'id') {
      $stmt = $conn->prepare("SELECT * FROM yichen_blog_articles WHERE id = ?");
      $stmt->bind_param('i', $value);
    }
    if ($row_name === 'username') {
      $stmt = $conn->prepare("SELECT * FROM yichen_blog_articles WHERE username = ?");
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
  // 跳脫
  function escape($str) {
    return htmlspecialchars($str, ENT_QUOTES);
  }
  // 把文章分類的value轉成中文
  function set_category_name($value) {
    $name=array(
      'uncategorized' => '未分類',
      'life' => '生活紀錄',
      'note' => '筆記',
      'share' => '分享',
      'art' => '藝術',
    );
    return $name[$value];
  }
?>