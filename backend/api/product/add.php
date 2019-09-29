<?php

header('Access-Control-Allow-Origin: *');
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
    $ram =  $_POST["ram"];
    $os = $_POST["os"];
    $warranty = $_POST["warranty"];
    $price = $_POST["price"];


    if ( 0 < $_FILES['file']['error'] ) {
        echo 'Error: ' . $_FILES['file']['error'] . '<br>';
    }
    else {

        $imgname = $_FILES["file"]["name"];
        move_uploaded_file($_FILES['file']['tmp_name'], '../../uploads/' . $_FILES['file']['name']);

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
    }

  } else {
    echo statusMessage(400, "bad request");
  }

}



 ?>
