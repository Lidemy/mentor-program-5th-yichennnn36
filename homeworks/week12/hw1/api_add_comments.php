<?php
   require_once('conn.php');
   header('Content-type:application/json;charset=utf-8');
   header('Access-Control-Allow-Origin: *'); // 跨網域存取
   // 做錯誤處理
   if (
     empty($_POST['site_key']) ||
     empty($_POST['nickname']) ||
     empty($_POST['content'])
   ) {
     $json = array(
       "ok" => false,
       "error_message" => "Please input missing fileds"
     );
     $response = json_encode($json); // 轉成 json 格式
     echo $response;
     die();
   }
   // 拿資料
   $site_key = $_POST['site_key'];
   $nickname = $_POST['nickname'];
   $content = $_POST['content'];
 
   $sql = "INSERT INTO yichen_discussions(site_key, nickname, content) VALUE(?, ?, ?)";
   $stmt = $conn->prepare($sql);
   $stmt->bind_param('sss', $site_key, $nickname, $content);
   $result = $stmt->execute();
   if (!$result) {
     $json = array(
       "ok" => false,
       "error_message" => "資料庫寫入失敗！"
     );
     $response = json_encode($json);
     echo $response;
     die();
   }
   // 成功訊息
   $json = array(
     "ok" => true,
     "message" => "success"
   );
   $response = json_encode($json);
   echo $response;
?>