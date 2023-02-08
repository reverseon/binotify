<?php
    require_once 'components/default_session.php';
    if (isset($_SESSION['login']) && $_SESSION['login'] == true) {
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
        <link rel="stylesheet" href="assets/css/login.css">
    </head>
    <body>
        <!--[if lt IE 7]>
            <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="#">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->
        <div class="bg-wrap">
            <?php include_once 'components/header.php'; ?>
            <section class="section-fw flex-col">
                <form action="" class="login-control flex-col form-album" autocomplete="off" id="login-form">
                    <input type="text" name="emailuname" class="input-text" placeholder="Email / Username">
                    <input type="password" name="password" class="input-text" placeholder="Password">
                    <input type="button" name="submit-btn"class="button-filter" value="Login">
                </form>
            </section>
            <?php include_once 'components/footer.php'; ?>
        </div>
    </body>
    <script src="/assets/js/login.js"></script>
</html>