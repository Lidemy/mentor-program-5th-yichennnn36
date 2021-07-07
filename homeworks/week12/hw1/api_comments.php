<?php
  require_once('conn.php');
  header('Content-type:application/json;charset=utf-8');
  header('Access-Control-Allow-Origin: *'); // 跨網域存取
  // 做錯誤處理(沒拿到 side_key)
  if (empty($_GET['site_key'])) {
    $json = array(
      "ok" => false,
      "message" => "Please add site_key in url"
    );
    $response = json_encode($json); // 轉成 json 格式
    echo $response;
    die();
  }
  // 拿資料
  // 
  $site_key = $_GET['site_key'];
  if (!empty($_GET['cursor'])) {
    $cursor = $_GET['cursor'];
    $sql = "
      SELECT id, nickname, content, created_at FROM yichen_discussions " .
      "WHERE (site_key = ? AND id < ?) ORDER BY id DESC " .
      "LIMIT 6";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('si', $site_key, $cursor);
  } else {
    $sql = "
      SELECT id, nickname, content, created_at FROM yichen_discussions " .
      "WHERE site_key = ? ORDER BY id DESC " .
      "LIMIT 6";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $site_key);
  }
  $result = $stmt->execute();
  if (!$result) {
    $json = array(
      "ok" => false,
      "message" => "資料抓取失敗！" + $conn->error
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
      "created_at" => $row['created_at']
    ));
  }
  // 成功訊息
  $json = array(
    "ok" => true,
    "discussions" => $discussions
  );
  $response = json_encode($json);
  echo $response;
?>