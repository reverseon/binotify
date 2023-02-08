<?php
  require_once 'components/default_session.php';
  if (!isset($_SESSION['login']) || $_SESSION['login'] == false) {
      header("Location: /");
      exit;
  }
  $id_user = $_SESSION['user_id'];
?>
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
        <link rel="stylesheet" href="/assets/css/album-list.css">
    </head>
    <body>
        <!--[if lt IE 7]>
            <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="#">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->
        <div class="bg-wrap">
            <?php include_once 'components/header.php'; ?>
            <section class="section-fw">
                <div class="album-list flex-col">
                    <h1 class="section-title">Singer List</h1>
                    <div class="alb-middle-limit">
                      <div class="list-display">
                        <ul>
                          <!-- <li>
                            <a href="#" class="l-elmt">
                              <div class="l-elmt-detail-wrapper">
                                <div class="l-elmt-detail"> 
                                    <div class="l-elmt-detail-title">Title</div>
                                </div>
                              </div>
                              <div class="delete-icon-wrap">
                                <button class="button-filter">Subscribe</button>
                              </div>
                            </a>
                          </li> -->
                        </ul>
                      </div> 
                    </div>
                </div>
            </section>
            <?php include_once 'components/footer.php'; ?>
        </div>
    </body>
    <script type"text/javascript">
      let id_user = <?php echo $id_user; ?>;
      id_user = parseInt(id_user);
    </script>
    <script src="/assets/js/singer_list.js"></script>
</html>