<?php


  header("Content-Type:application/json");
  echo "Chikshi to pune"

  if (isset($_POST['username']) && $_POST['username']!="" && isset($_POST['password']) && $_POST['password']!="") {
    $username = $_POST['username'];
    $password = $_POST['password'];
    response(NULL, NULL, 200,"No Record Found");
  } else {
     response(NULL, NULL, 400,"Invalid Request");
  }


  function response($order_id,$amount,$response_code,$response_desc){
    $response['order_id'] = $order_id;
    $response['amount'] = $amount;
    $response['response_code'] = $response_code;
    $response['response_desc'] = $response_desc;

    $json_response = json_encode($response);
    echo $json_response;
  }



 ?>
