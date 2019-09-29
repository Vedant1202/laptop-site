<?php

header('Content-Type: application/json');

include "../functions.php";
include "../connection.php";


// Check connection
if ($conn->connect_error) {
  echo "Connection failed: " . $conn->connect_error;
} else {

  if ( isset($_POST["name"]) && !empty($_POST["name"]) && isset($_POST["display"]) && !empty($_POST["display"])
  && isset($_POST["storage"]) && !empty($_POST["storage"]) && isset($_POST["ram"]) && !empty($_POST["ram"]) &&
  isset($_POST["os"]) && !empty($_POST["os"]) && isset($_POST["warranty"]) && !empty($_POST["warranty"]) &&
  isset($_POST["price"]) && !empty($_POST["price"]) ) {

    $name = $_POST["name"];
    $display = $_POST["display"];
    $storage = $_POST["storage"];
    $ram =  $_POST["ram"]);
    $os = $_POST["os"];
    $warranty = $_POST["warranty"];
    $price = $_POST["price"];
    $imgname = ;

    $sql = "INSERT INTO product (name, display, storage, ram, os, warranty, price, imgname)
            VALUES ('$name', '$display', '$storage', '$ram', '$os', '$warranty', '$price', '$imgname')";

    if (!mysqli_query($conn, $sql)) {
      echo statusMessage(500, "internal server error");
      die('Error: ' . mysqli_error($conn));

    } else {
      // echo "New record created successfully";
      $conn->close();
      $res = [
        'added' => TRUE
      ];
      echo json_encode([json_decode(statusMessage(200, "success")), $res]);
    }

  } else {
    echo statusMessage(400, "bad request");
  }

}



 ?>
