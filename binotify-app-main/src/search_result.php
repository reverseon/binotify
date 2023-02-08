<?php include_once "components/default_session.php" ?>
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
        <link rel="stylesheet" href="/assets/css/search-result.css">
    </head>
    <body>
        <!--[if lt IE 7]>
            <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="#">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->
        <div class="bg-wrap">
            <?php include_once 'components/header.php'; ?>
            <section class="section-fw">
                <div class="song-list flex-col">
                    <div class="s-filter-control flex-row">
                        <h1 class="section-title">Song Result</h1>
                        <img src="/assets/img/filter.svg" class="search-filter-icon" alt="">
                    </div>
                    <form action="" class="display-none flex-col filter-form" autocomplete="off" onkeydown="return event.key != 'Enter';">
                        <div class="filter-panel flex-row dark-radio">
                            <div class="sort-by">   
                                <div class="text">Sort by</div>
                                <label>
                                    <input type="radio" name="sort-type" value="judul" checked>
                                    <span class="design"></span>
                                    <span class="text">Title</span>
                                </label>
                                <label>
                                    <input type="radio" name="sort-type" value="tahun">
                                    <span class="design"></span>
                                    <span class="text">Release Year</span>
                                </label>
                            </div>
                            <div class="sort-order">
                                <div class="text">Sort order</div>
                                <label>
                                    <input type="radio" name="sort-order" value="ASC" checked>
                                    <span class="design"></span>
                                    <span class="text">Ascending</span>
                                </label>
                                <label>
                                    <input type="radio" name="sort-order" value="DESC">
                                    <span class="design"></span>
                                    <span class="text">Descending</span>
                                </label>
                            </div>
                            <div class="genre-select-container">
                                <div class="text">Genre</div>
                                <input list="genre-select-opt" value="All" placeholder="e.g. JPop"class="input-text" name="genre" id="genre-select">
                                <datalist id="genre-select-opt">
                                    <option value="All">
                                </select>
                            </div>
                            <div class="type-cb-container">
                                <div class="text">Type</div>
                                <input type="checkbox" id="type-judul" name="judul" value="judul" checked>
                                <label for="type-judul">Title</label><br>
                                <input type="checkbox" id="type-penyanyi" name="penyanyi" value="penyanyi">
                                <label for="type-penyanyi">Artist</label><br>
                                <input type="checkbox" id="type-tahun" name="tahun" value="tahun">
                                <label for="type-tahun">Release Year</label><br>
                            </div>  
                        </div>
                        <input type="button" value="Search Filtered" class="button-filter" id="search-filtered-btn">
                    </form>              
                    <div class="song-middle-limit">
                    </div>      
                    <?php include 'components/list-d-control.php'; ?>
                </div>
            </section>
            <?php include_once 'components/footer.php'; ?>
        </div>
    </body>
    <script src="/assets/js/search-result.js"></script>
</html>