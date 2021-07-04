<?php
  require_once('conn.php');
  header('Content-type:application/json;charset=utf-8');
  header('Access-Control-Allow-Origin: *');

  // if (empty($_GET['todo'])) {
  //   $json = array(
  //     "ok" => false,
  //     "message" => "no todos"
  //   );
  //   $response = json_encode($json);
  //   echo $response;
  //   die();
  // }
  if (empty($_GET['id'])) {
    $json = array(
      "ok" => false,
      "message" => "Please add id in url!"
    );
    $response = json_encode($json);
    echo $response;
    die();
  }
  $id = intval($_GET['id']); // 轉成數字型態
  $sql = "SELECT * FROM yichen_todos WHERE id = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i', $id);
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
  $result = $stmt->get_result();
  $todos = array();

  while($row = $result->fetch_assoc()) {
    array_push($todos, array(
      "id" => $row['id'],
      "todo" => $row['todo']
    ));
  }
  // 成功訊息
  $json = array(
    "ok" => true,
    "todos" => $todos
  );
  $response = json_encode($json);
  echo $response;
?>