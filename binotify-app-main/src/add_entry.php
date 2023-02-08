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
        <link rel="stylesheet" href="assets/css/add_entry.css">
    </head>
    <body>
        <!--[if lt IE 7]>
            <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="#">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->
        <div class="bg-wrap">
            <?php include_once 'components/header.php'; ?>
            <section class="section-fw flex-col">
                <div>
                    <h1 class="section-title">Add Entry</h1>
                </div>
                <div>
                    <select name="type" class="select-style" id="select-type" autocomplete="off">
                        <option value="album">Album</option>
                        <option value="song">Song</option>
                    </select>
                </div>
                <form action="" class="add-entry-control flex-col form-album" id="album-form"autocomplete="off">
                    <input type="text" name="judul_album" class="input-text" placeholder="Title">
                    <input type="text" name="penyanyi_album" class="input-text" placeholder="Artist">
                    <input type="text" name="genre_album" class="input-text" placeholder="Genre">
                    <input type="date" class="input-text" name="release-date" />                    
                    <input type="file" id="album-cover-upload" name="album_cover_upload" class="hide-input-file" accept="image/*">
                    <label for="album-cover-upload" class="button-filter song-upload-btn">Upload Album Cover</label>
                    <div class="input-gathered">Album cover: <span id="album-file"></span></div>
                    <input type="button" name="submit-btn" class="button-filter" value="Submit">
                </form>
                <form action="" class="display-none add-entry-control form-song flex-col" autocomplete="off">
                    <input type="text" name="judul_lagu" class="input-text" placeholder="Title">
                    <input type="text" name="penyanyi_lagu" class="input-text" placeholder="Artist">
                    <input type="text" name="genre_lagu" class="input-text" placeholder="Genre">
                    <input type="date" class="input-text" name="release-date-lagu" />                    
                    <input type="file" id="song-cover-upload" name="song_cover_upload" class="hide-input-file" accept="image/*">
                    <label for="song-cover-upload" class="button-filter song-upload-btn">Upload Song Cover</label>
                    <div class="input-gathered">Song cover: <span id = "song-cover"></span></div>
                    <input type="file" id="song-audio-upload" name="song_audio_upload" class="hide-input-file" accept="audio/*">
                    <label for="song-audio-upload" class="button-filter song-upload-btn">Upload Song Audio</label>
                    <div class="input-gathered">Song file: <span id = "song-file"></span></div>
                    <input type="button" name="submit-btn" class="button-filter" value="Submit">
                </form>
            </section>
            <?php include_once 'components/footer.php'; ?>
        </div>
    </body>
    <script src="/assets/js/add_entry.js"></script>
</html>