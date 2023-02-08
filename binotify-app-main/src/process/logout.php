<?php 
    session_start();
    require 'json_response.php';
    require 'error_handling.php';
    header('Content-Type: application/json; charset=utf-8');
    if (isset($_SESSION['login'])) {
        $temp = $_SESSION['pb_count'];
        session_destroy();
        $_SESSION['pb_count'] = $temp;
        echo_json_msg(200, "Logout successful", "You have been logged out");
    } else {
        echo_json_msg(400, "Bad Request");
    }
?>