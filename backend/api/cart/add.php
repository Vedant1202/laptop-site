<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include "../functions.php";
include "../connection.php";


// Check connection
if ($conn->connect_error) {
  echo "Connection failed: " . $conn->connect_error;
} else {

  if ( isset($_POST["pid"]) && !empty($_POST["pid"]) && isset($_POST["uid"]) && !empty($_POST["uid"])) {

    $pid = $_POST["pid"];
    // $password =  password_hash(mysqli_real_escape_string($conn, $_POST["password"]), PASSWORD_BCRYPT);
    // $phno = $_POST["phno"];
    // $fname = $_POST["fname"];
    $uid = $_POST["uid"];

    $sql = "INSERT INTO user (pid,uid)
            VALUES ('$pid', '$uid')";

    if (!mysqli_query($conn, $sql)) {
      echo statusMessage(500, "internal server error");
      die('Error: ' . mysqli_error($conn));

    } else {
      // echo "New record created successfully";
      $conn->close();
      $res = [
        'register' => TRUE
      ];
      echo json_encode([json_decode(statusMessage(200, "success")), $res]);
    }

  } else {
    echo statusMessage(400, "bad request");
  }

}



 ?>
