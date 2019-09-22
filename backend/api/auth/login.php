<?php

header('Content-Type: application/json');

include "../functions.php";


if (isset($_POST["username"]) && !empty($_POST["username"]) && isset($_POST["password"]) && !empty($_POST["password"])) {
  echo $_POST["username"] . "\n";
  echo $_POST["password"] . "\n";
  echo statusMessage(200, "success");
} else {
  echo statusMessage(400, "bad request");
}



 ?>
