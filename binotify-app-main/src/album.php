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
            <input id="album-id" class="display-none" value="<?php echo $_GET['id'] ?>" />
            <section class="album-cover section-fw flex-row">
                <div class="album-cover-img"><img src="" alt=""></div>
                    <div class="album-details">
                        <div id="modifiable-wrapper"></div>
                        <div class="button-filter edit-album-btn">Edit Entry</div>
                    </div>
                <form autocomplete="off" class="edit-album display-none">
                    <input name="judul" type="text" class="input-text" placeholder="Title" name="title" value="" />
                    <input list="artist-opt" class="input-text" placeholder="Artist" name="artist" value="" type="hidden"/>
                    <datalist id="artist-opt">
                    </datalist>
                    <input list="genre-opt" class="input-text" name="genre" placeholder="Genre" />
                    <datalist id="genre-opt">
                    </datalist>           
                    <input type="date" class="input-text" name="release-date" />                    
                    <input type="file" id="album-cover-upload" class="hide-input-file" accept="image/*" name="image_path">
                    <label for="album-cover-upload" class="button-filter album-upload-btn">Upload Album Cover</label>
                    <div class="input-gathered" id="album-filename">Album cover: <span></span></div>
                    <div class="control-commit-album-btn flex-row">
                        <input type="button" name="delete" class="button-filter" value="Delete"/>
                        <input type="button" class="button-filter cancel-edit-btn" value="Cancel"/>
                        <input type="button" name="save" class="button-filter" value="Save"/>
                    </div>
                </form>
            </section>
            <section class="section-fw">
                <div class="album-list flex-col">
                    <div class="add-song-control flex-row">
                        <h1 class="section-title">Song List</h1>
                        <img src="/assets/img/plus-square-o.svg" class="add-song-icon" alt="">
                    </div>
                    <form action="" class="display-none flex-col add-song-panel" autocomplete="off">
                        <input type="list" class="input-text" list="song-list-opt" id="song-add-choice" placeholder="Search song">
                        <datalist id="song-list-opt">
                        </datalist>
                        <input type="hidden" id="song-add-choice-hidden" value="">
                        <input type="button" class="button-filter add-song-btn" value="Add Song">
                    </form>
                    <div class="song-out">

                    </div>
                </div>
            </section>
            <?php include_once 'components/footer.php'; ?>
        </div>
    </body>
    <script src="/assets/js/album.js"></script>
</html>