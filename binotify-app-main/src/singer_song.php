<?php require_once 'components/default_session.php'; ?>
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]>      <html class="no-js"> <!--<![endif]-->
<html>
    <head>
        <?php include_once 'components/global-dep.php'; ?>
        <?php include_once 'components/header-dep.php'; ?>
        <?php include_once "components/list-d-dep.php"; ?>
        <link rel="stylesheet" href="/assets/css/album.css">
    </head>
    <body>
        <!--[if lt IE 7]>
            <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="#">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->
        <div class="bg-wrap">
            <?php include_once 'components/header.php'; ?>
            <input id="creator-id" class="display-none" value="<?php echo $_GET['id'] ?>" />
            <input id="subscriber-id" class="display-none" value="<?php echo $_SESSION['user_id'] ?>" />
            <section class="section-fw">
                <div class="album-list flex-col">
                    <div class="add-song-control flex-row">
                        <h1 class="section-title">Song List</h1>
                        <div class="alb-middle-limit">
                            <?php include 'components/list-display.php'; ?>
                        </div>
                        <?php include 'components/list-d-control.php'; ?>
                    </div>
                </div>
            </section>
            <?php include_once 'components/footer.php'; ?>
        </div>
    </body>
    <script src="/assets/js/singer_song.js"></script>
</html>