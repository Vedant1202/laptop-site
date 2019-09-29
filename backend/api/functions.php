<?php

function statusMessage($statusCode, $statusMessage, $json = true){
  http_response_code($statusCode);
  $data = [["status" => $statusCode, "message" => $statusMessage]];

  if($json){
    return json_encode($data);
  } else {
    return $data;
  }
};

// $options = array(
//   'salt' => mcrypt_create_iv(22, MCRYPT_DEV_URANDOM),
//   'cost' => 12,
// );



 ?>
