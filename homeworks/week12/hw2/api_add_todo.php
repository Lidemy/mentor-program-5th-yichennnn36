<?php
  require_once('conn.php');
  header('Content-type:application/json;charset=utf-8');
  header('Access-Control-Allow-Origin: *'); // 跨網域存取

  if (empty($_POST['todo'])) {
    $json = array(
      "ok" => false,
      "message" => "no todos"
    );
    $response = json_encode($json);
    echo $response;
    die();
  }
  $todo = $_POST['todo'];
  $sql = "INSERT INTO yichen_todos (todo) VALUE (?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('s', $todo);
  $result = $stmt->execute();
  if (!$result) {
    $json = array(
      "ok" => false,
      "message" => "資料庫寫入失敗！" + $conn->error
    );
    $response = json_encode($json);
    echo $response;
    die();
  }
  // 成功訊息
  $json = array(
    "ok" => true,
    "message" => "success",
    "id" => $conn->insert_id // 拿到新增資料的 id
  );
  $response = json_encode($json);
  echo $response;
?>