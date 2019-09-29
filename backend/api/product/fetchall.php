<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include "../functions.php";
include "../connection.php";


// Check connection
if ($conn->connect_error) {
  echo "Connection failed: " . $conn->connect_error;
} else {
  if ( isset($_POST["pid"]) && !empty($_POST["pid"])){    // code...

    $sql = "SELECT * FROM product ORDER BY pid DESC";
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
          "processor" => $row["processor"],
          "storage" => $row["storage"],
          "ram" => $row["ram"],
          "os" => $row["os"],
          "warranty" => $row["warranty"],
          "price" => $row["price"],
          "imgname" => 'http://localhost:8080/laptop-site/backend/uploads/' . $row["imgname"]
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
