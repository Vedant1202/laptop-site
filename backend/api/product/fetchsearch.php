<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include "../functions.php";
include "../connection.php";


// Check connection
if ($conn->connect_error) {
  echo "Connection failed: " . $conn->connect_error;
} else {
  if ( isset($_POST["key"]) && !empty($_POST["key"])){    // code...

    $key = $_POST['key'];
    $sql = "SELECT * FROM product WHERE name LIKE '%$key%' OR processor LIKE '%$key%' OR os LIKE '%$key%'";
    $result = $conn->query($sql);

    if (!mysqli_query($conn, $sql)) {
      echo statusMessage(500, "internal server error");
      die('Error: ' . mysqli_error($conn));

    } else {
      // echo "New record created successfully";
      $conn->close();
      $collection = array();
      while($row = $result->fetch_assoc())
      {
        $res = json_encode([
        "name" => $row["name"] ,
        "display" => $row["display"],
        "storage" => $row["storage"],
        "processor" => $row["processor"],
        "ram" => $row["ram"],
        "os" => $row["os"],
        "warranty" => $row["warranty"],
        "price" => $row["price"],
        "imgname" => 'https://www.laptop-site.ml/laptop-site/backend/uploads/' . $row["imgname"]
      ]);

        array_push($collection, $res);
      };
      echo json_encode($collection);
      #'added' => TRUE

      // echo json_encode([json_decode(statusMessage(200, "success")), $res]);
    }
  } else {
    // code...
    echo statusMessage(400, "bad request");

  }




  }

 ?>
