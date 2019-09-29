<?php

 header('Access-Control-Allow-Origin: *');
 header('Content-Type: application/json');

include "../functions.php";
include "../connection.php";

// Check connection
if ($conn->connect_error) {
  echo "Connection failed: " . $conn->connect_error;
} else {

  if (isset($_POST["username"]) && !empty($_POST["username"]) && isset($_POST["password"]) && !empty($_POST["password"])) {
    $username = $_POST["username"];
    $password = $_POST["password"];

    $sql = "SELECT * FROM user WHERE username = '$username' ;";


    if (!mysqli_query($conn, $sql)) {
      echo statusMessage(500, "internal server error");
      die('Error: ' . mysqli_error($conn));
    } else {

      $result = $conn->query($sql);
      if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
          $password_hash = $row['password'];
          if (password_verify($password, $password_hash)) {
            // echo statusMessage(200, "success");
            $res = [
              'login' => TRUE
            ];
          } else {
            // echo statusMessage(203, "nikal");
            $res = [
              'login' => FALSE
            ];
          }
          // $row['password'];
        }
      }
      $conn->close();
      echo json_encode([json_decode(statusMessage(200, "success")), $res]);
    }

  } else {
    echo statusMessage(400, "bad request");
  }

}




 ?>
