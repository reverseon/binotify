<?php
    session_start();
    require 'json_response.php';
    require 'error_handling.php';
    header('Content-Type: application/json; charset=utf-8');

    function fetch_user() {
        $db = pg_connect("host=tubes-1-db port=5432 dbname=musikwbd user=postgres password=postgres");
        $username = (isset($_GET['username'])) ? $_GET['username'] : '%';
        $email = (isset($_GET['email'])) ? $_GET['email'] : '%';

        $query = <<< Q
                    SELECT * FROM user_account WHERE username LIKE '$username' 
                    AND email LIKE '$email' 
                Q;

        $result = pg_query($db, $query);
        $data = array();
        while ($row = pg_fetch_assoc($result)) {
            $data[] = $row;
        }
        echo_json_msg(200, "OK", $data);
    }
    if (isset($_GET['a']) && isset($_SESSION['isadmin']) && $_SESSION['isadmin'] == true) {
        if ($_GET['a'] == 'fetch') {
            fetch_user();
        } else {
            echo_json_msg(400, "Bad Request");
        }
    } else {
        echo_json_msg(400, "Bad Request");
    }
?>