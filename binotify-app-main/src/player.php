<?php
    require_once 'components/default_session.php';
    if (isset($_SESSION['login']) && $_SESSION['login'] == false) {
        $_SESSION['pb_count'] = -1;
    }
?>

<!DOCTYPE html>
<!-- [if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]>      <html class="no-js"> <!<![endif] -->
<html>
    <head>
        <?php include_once 'components/global-dep.php'; ?>
        <?php include_once 'components/header-dep.php'; ?>
        <?php include_once "components/player-dep.php"; ?>

        <link rel="stylesheet" href="/assets/css/player.css">
    </head>
    <body>
        <?php include_once 'components/header.php'; ?>
        <div class="player-container">
            <audio src="" id="audio"></audio>
            <input type="range" class="music-seek-bar" value="0">
            <div class="player">
                <div class="player-np">
                    <div class="np-details">
                        <p class="np-music"></p>
                        <p class="np-artist"></p>
                    </div>
                </div>
                <div class="player-control">
                    <img src="../assets/img/player-play.svg" class="player-play">
                </div>
                <div class="player-volume">
                    <div class="np-time">
                        <div class="np-current-time">00:00</div>
                        <p> / </p>
                        <div class="np-duration">00:00</div>
                    </div>
                    <img src="../assets/img/player-headphone.svg" class="player-headphone">
                    <input type="range" class="volume-slider" max="1" value="1" step="0.1">
                </div>
            </div>
        </div>
    </body>
</html>
