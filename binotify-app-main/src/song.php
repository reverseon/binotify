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
        <link rel="stylesheet" href="/assets/css/song.css">
    </head>
    <body>
        <!--[if lt IE 7]>
            <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="#">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->
        <div class="bg-wrap">
            <?php include_once 'components/header.php'; ?>
            <input id="song-id" class="display-none" value="<?php echo $_GET['id'] ?>" />
            <section class="song-cover section-fw flex-row">
                <div class="song-cover-img"><img src="" alt=""></div>
                <div class="song-details">
                    <div id="modifiable-wrapper">
                    </div>
                    <div class="song-control flex-row">
                        <div class="button-filter play-song-btn">Play</div>
                        <div class="button-filter edit-song-btn">Edit Entry</div>
                    </div>
                </div>
                <form action="" class="edit-song display-none" autocomplete="off">
                    <input type="text" name="judul" class="input-text" placeholder="Title" value="" />
                    <input type="list" list="album-list-opt"  id="albuminp" class="input-text" placeholder="Album" name="album" value="" />
                    <datalist id="album-list-opt">
                        <!-- dummy data -->
                    </datalist>
                    <input type="hidden" name="answer" id="albuminp-hidden">
                    <input type="hidden" list="artist-list-opt" class="input-text" placeholder="Artist" name="artist" value="" />
                    <datalist id="artist-list-opt">
                        <!-- dummy data -->
                    </datalist>
                    <input type="list" list="genre-list-opt" class="input-text" placeholder="Genre" name="genre" value="" />
                    <datalist id="genre-list-opt">
                        <!-- dummy data -->
                    </datalist>
                    <input type="date" class="input-text" name="release-date" value="" />                    
                    <input type="file" name="image_path" id="song-cover-upload" class="hide-input-file" accept="image/*">
                    <label for="song-cover-upload" class="button-filter song-upload-btn">Upload Song Cover</label>
                    <div class="input-gathered" id="song-cover-msg">Song cover: <span></span></div>
                    <input type="file" name="file_path" id="song-audio-upload" class="hide-input-file" accept="audio/*">
                    <label for="song-audio-upload" class="button-filter song-upload-btn">Upload Song Audio</label>
                    <div class="input-gathered" id="song-file-msg">Song file: <span></span></div>
                    <div class="control-commit-song-btn flex-row">
                        <input type="button" class="button-filter" value="Delete" name="delete"/>
                        <input type="button" class="button-filter cancel-edit-btn" name="cancel" value="Cancel"/>
                        <input type="button" class="button-filter" value="Save" name="save"/>
                    </div>
                    <div id="general-msg" class="display-none"></div>
                </form>
                <?php
                    global $id;
                    $id = $_GET['id'];
                    include_once 'player.php'; ?>
            </section>
            <?php include_once 'components/footer.php'; ?>
        </div>
    </body>
    <script src="/assets/js/song.js"></script>
</html>