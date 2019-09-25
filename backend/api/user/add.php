<?php

header('Content-Type: application/json');

include "../functions.php";
include "../connection.php";


// Check connection
if ($conn->connect_error) {
  echo "Connection failed: " . $conn->connect_error;
} else {

  if ( isset($_POST["username"]) && !empty($_POST["username"]) && isset($_POST["password"]) && !empty($_POST["password"])
  && isset($_POST["fname"]) && !empty($_POST["fname"]) && isset($_POST["lname"]) && !empty($_POST["lname"])
  && isset($_POST["phno"]) && !empty($_POST["phno"]) ) {

    $username = $_POST["username"];
    $password =  password_hash(mysqli_real_escape_string($conn, $_POST["password"]), PASSWORD_BCRYPT);
    $phno = $_POST["phno"];
    $fname = $_POST["fname"];
    $lname = $_POST["lname"];

    $sql = "INSERT INTO users (fname, lname, phno, username, password)
            VALUES ('$fname', '$lname', '$phno', '$username', '$password')";

    if (!mysqli_query($conn, $sql)) {
      echo statusMessage(500, "internal server error");
      die('Error: ' . mysqli_error($conn));
    } else {
      echo "New record created successfully";
      echo statusMessage(200, "success");
      $conn->close();
    }

  } else {
    echo statusMessage(400, "bad request");
  }

}



 ?>
