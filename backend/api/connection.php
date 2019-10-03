<?php

// $servername = "13.127.239.17";
$servername = "localhost";  // For AWS

$username = "root";
$password = "Root1234.";
// $password = "";
$dbname = "laptop";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  echo "Connection failed: " . $conn->connect_error;
}
 ?>
