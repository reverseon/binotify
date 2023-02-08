<?php
    session_start();
    require 'json_response.php';
    require 'error_handling.php';
    $db = pg_connect("host=tubes-1-db port=5432 dbname=musikwbd user=postgres password=postgres");
    // CHECK UNAME
    if (isset($_GET['username'])) {
        $username = $_GET['username'];
        $res = pg_query($db, "SELECT * FROM user_account WHERE username = '$username'");
        if(pg_num_rows($res) > 0) {
            echo_json_msg(400, "Username already taken");
        } else {
            echo_json_msg(200, "Username available");
        }
    } else if (isset($_GET['email'])) {
        $email = $_GET['email'];
        $res = pg_query($db, "SELECT * FROM user_account WHERE email = '$email'");
        if(pg_num_rows($res) > 0) {
            echo_json_msg(400, "Email already taken");
        } else {
            echo_json_msg(200, "Email available");
        }
    } else if (isset($_POST['username']) && isset($_POST['email']) && isset($_POST['password'])) {
        $username = $_POST['username'];
        $email = $_POST['email'];
        $password = md5($_POST['password']);
        $res = pg_query($db, "INSERT INTO user_account (username, email, password) VALUES ('$username', '$email', '$password')");
        if($res) {
            echo_json_msg(200, "Registration successful", "You have been registered as " . $username);
        } else {
            echo_json_msg(500, "Registration failed", "Something went wrong");
        }
    } else {
        echo_json_msg(400, "Bad Request");
    }
?>