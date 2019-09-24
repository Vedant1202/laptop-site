<?php

header('Content-Type: application/json');

include "../functions.php";


if ( isset($_POST["username"]) && !empty($_POST["username"]) && isset($_POST["password"]) && !empty($_POST["password"])
&& isset($_POST["fname"]) && !empty($_POST["fname"]) && isset($_POST["lname"]) && !empty($_POST["lname"])
&& isset($_POST["phno"]) && !empty($_POST["phno"]) ) {

  echo $_POST["username"] . "\n";
  echo $_POST["password"] . "\n";
  echo $_POST["phno"] . "\n";
  echo $_POST["fname"] . "\n";
  echo $_POST["lname"] . "\n";
  echo statusMessage(200, "success");

} else {

  echo statusMessage(400, "bad request");

}



 ?>
