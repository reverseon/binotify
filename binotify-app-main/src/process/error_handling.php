<?php
    require_once 'json_response.php';
    function genericErrorHandler($errno, $errstr, $errfile, $errline) {
        echo_json_msg(500, "Internal Server Error", $errstr);
    }
    set_error_handler("genericErrorHandler");
    ini_set('display_errors', 0);
?>