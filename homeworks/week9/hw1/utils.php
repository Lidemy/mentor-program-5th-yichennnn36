<?php
  require_once('conn.php');

  function get_data_from_users($username) {
    global $conn;
    $sql = sprintf("SELECT * FROM yichen_users WHERE username = '%s'", $username);
    $result = $conn->query($sql);
    if (!$result) {
      die('$conn->error');
    }
    while($row = $result->fetch_assoc()) {
      return $row;
    }
  }
?>