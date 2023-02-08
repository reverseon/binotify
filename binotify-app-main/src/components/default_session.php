<?php
    session_start();
    if (!isset($_SESSION['pb_count'])) {
        $_SESSION['pb_count'] = 0;
    }
    if (!isset($_SESSION['login']) || $_SESSION['login'] == false) {
        $_SESSION['login'] = false;
        $_SESSION['user_id'] = 0;
        $_SESSION['username'] = "GUEST";
        $_SESSION['email'] = "GUEST";
        $_SESSION['isadmin'] = false;
    }
?>