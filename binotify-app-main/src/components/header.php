<!-- HTML -->
<header>
    <nav>
        <input type="checkbox" name="" id="dropdown-cbox">
        <label for="dropdown-cbox" class="bar-icon-wrapper">
            <img src="/assets/img/bars.svg"  class="bar-icon"/>
        </label>
        <a href="/" id="logo"><span>アド</span>リブ</a>
        <ul>
            <div class="dropdown-padder"></div>
            <li><a href="/">Explore</a></li>
            <li><a href="/album_list.php">Album</a></li>
            <?php if ($_SESSION['isadmin'] == true) { ?>
                <li><a href="/user_list.php">USERS</a></li>
            <?php } if ($_SESSION['login'] == true) { ?>
                <li><a href="/singer_list.php">Subscriptions</a></li>
                <li><a href="#" id="logout-btn">Logout</a></li>  
            <?php } else { ?>
                <li><a href="/login.php">Login</a></li>
                <li><a href="/register.php">Register</a></li>
            <?php } ?>
            <li class="user-info-h">Logged in as <span><?= $_SESSION['username'] ?></span></li>
        </ul>
        <div class="search-bar">
            <form class="search-form" action="/search_result.php">
                <input type="text" name="query" id="search-bar-nav" placeholder="Try searching for a title or album" class="input-text" value="<?= isset($_GET['query']) ? $_GET['query'] : '' ?>">
            </form>
        </div>
        <div class="search-btn-wrapper">
            <img src="/assets/img/search.svg"  class="search-icon"/>
        </div>
        <!-- <div class="close-search-wrapper">
            <img src="assets/img/times.svg" class="close-search-icon"/>
        </div> -->
    </nav>
</header>