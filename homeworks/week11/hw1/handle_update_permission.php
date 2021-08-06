<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  $id = intval($_GET['id']);
  $permission = array(
    'add_comment' => 0,
    'update_all_comment' => 0,
    'delete_all_comment' => 0,
    'update_self_comment' => 0,
    'delete_self_comment' => 0
  );
  $result = $_POST['permission'];
  for ($i = 0; $i < count($result); $i++) {
    $permission[$result[$i]] = 1;
  }
  $sql = 
    'UPDATE yichen_role SET ' .
    'add_comment = ?, update_all_comment = ?, delete_all_comment = ?, ' .
    'update_self_comment = ?, delete_self_comment = ? ' .
    'WHERE id = ?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('iiiiii', 
    $permission['add_comment'], 
    $permission['update_all_comment'], 
    $permission['delete_all_comment'], 
    $permission['update_self_comment'], 
    $permission['delete_self_comment'], 
    $id);
  $result = $stmt->execute();
  
  if (!$result) {
    die($conn->error);
  }
  header('Location:admin.php?successMsg=update_permission&id=' . $id);
?>
