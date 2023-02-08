<?php require_once 'components/default_session.php'; ?>

<!DOCTYPE html>
<!-- [if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]>      <html class="no-js"> <!<![endif] -->
<html>
    <head>
        <?php include_once 'components/global-dep.php'; ?>
        <?php include_once 'components/header-dep.php'; ?>
        <?php include_once "components/list-d-dep.php"; ?>
    
        <link rel="stylesheet" href="/assets/css/home.css">
    </head>
    <body>
        <!--[if lt IE 7]>
            <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="#">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->
        <div class="bg-wrap">
            <?php include_once 'components/header.php'; ?>
            <section class="section-fw flex-row">
                <div class="recent-music flex-col">
                    <h1 class="section-title">Recent Music</h1>
                    <div class="song-mid-limit">
                        
                    </div>
                </div>
                <div class="user-info">
                    <div>Logged in as <span><?= $_SESSION['username'] ?></span></div>
                </div>
            </section>
            <!-- <section class="player">
            <?php include_once 'components/player.php'; ?>
            </section> -->
            <?php include_once 'components/footer.php'; ?>
        </div>
    </body>
    <script src="/assets/js/home.js"></script>
</html>