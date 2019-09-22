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

 ?>
