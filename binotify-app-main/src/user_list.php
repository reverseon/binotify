<?php 
    require_once 'components/default_session.php';
    if (isset($_SESSION['isadmin']) && $_SESSION['isadmin'] == false) {
        header("Location: /");
        exit;
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
        <?php include_once "components/list-d-dep.php"; ?>
        <link rel="stylesheet" href="/assets/css/user_list.css">
    </head>
    <body>
        <!--[if lt IE 7]>
            <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="#">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->
        <div class="bg-wrap">
            <?php include_once 'components/header.php'; ?>
            <section class="section-fw">
                <div class="list-user flex-col">
                    <h1 class="section-title">User List</h1>
                    <div class="list-user-limit">
                        <?php include 'components/list-display.php'; ?>
                    </div>
                    <?php include_once 'components/list-d-control.php'; ?>
                </div>
            </section>
            <?php include_once 'components/footer.php'; ?>
        </div>
    </body>
    <script src="/assets/js/user_list.js"></script>
</html>