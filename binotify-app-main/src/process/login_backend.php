<?php
    session_start();
    require 'json_response.php';
    require 'error_handling.php';
    header('Content-Type: application/json; charset=utf-8');
    if (isset($_POST['emailuname']) && isset($_POST['password'])) {
        $emailuname = $_POST['emailuname'];
        $password = md5($_POST['password']);
        $db = pg_connect("host=tubes-1-db port=5432 dbname=musikwbd user=postgres password=postgres");
        $res = pg_query($db, "SELECT * FROM user_account WHERE (email = '$emailuname' OR username = '$emailuname') AND password = '$password'");
        if(pg_num_rows($res) == 1) {
            $data = pg_fetch_assoc($res);
            $_SESSION['user_id'] = $data['user_id'];
            $_SESSION['login'] = true;
            $_SESSION['username'] = $data['username'];
            $_SESSION['email'] = $data['email'];
            $_SESSION['isadmin'] = $data['isadmin'] == 't' ? true : false;
            echo_json_msg(200, "Login successful", "You have been logged in as " . $_SESSION['username']);
        } else {
            echo_json_msg(401, "Login Failed", "Invalid email/username or password");
        }
    } else {
        echo_json_msg(400, "Bad Request");
    }
?>