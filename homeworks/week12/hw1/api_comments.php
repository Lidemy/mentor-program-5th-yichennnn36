<?php
  require_once('conn.php');
  header('Content-type:application/json;charset=utf-8'); // 回傳 jSON 格式的資料
  header('Access-Control-Allow-Origin: *'); // 跨網域存取
  // 做錯誤處理(沒拿到 side_key)
  if (empty($_GET['site_key'])) {
    $json = array(
      "ok" => false,
      "error_message" => "Please add site_key in url"
    );
    $response = json_encode($json); // 轉成 json 格式
    echo $response;
    die();
  }
  // 拿資料
  $site_key = $_GET['site_key'];
  if (!empty($_GET['cursor'])) {
    $cursor = $_GET['cursor'];
    $sql = "
      SELECT * FROM yichen_discussions " .
      "WHERE (site_key = ? AND id < ?) ORDER BY id DESC " .
      "LIMIT 6";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('si', $site_key, $cursor);
  } else {
    $sql = "
      SELECT * FROM yichen_discussions " .
      "WHERE site_key = ? ORDER BY id DESC " .
      "LIMIT 6";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $site_key);
  }
  $result = $stmt->execute();
  if (!$result) {
    $json = array(
      "ok" => false,
      "error_message" => "資料抓取失敗！"
    );
    $response = json_encode($json);
    echo $response;
    die();
  }
  $result = $stmt->get_result();
  $discussions = array();
  while ($row = $result->fetch_assoc()) {
    array_push($discussions, array(
      "id" => $row['id'],
      "nickname" => $row['nickname'],
      "content" => $row['content'],
      "created_at" => $row['created_at'],
    ));
  }
  // 成功訊息
  $is_last_page = false;
  $count = $stmt->affected_rows;
  if ($count < 6) $is_last_page = true;
  
  $json = array(
    "ok" => true,
    "discussions" => $discussions,
    "is_last_page" => $is_last_page
  );
  $response = json_encode($json);
  echo $response;
?>