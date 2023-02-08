<?php
    function echo_json_msg($status, $msg, $result = "") {
        http_response_code($status);
        $json = array("status" => $status, "msg" => $msg, "result" => $result);
        echo json_encode($json);
    }
?>