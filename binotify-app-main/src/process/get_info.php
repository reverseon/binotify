<?php 
    session_start();
    require 'json_response.php';
    require 'error_handling.php';
    function getDistinctAlbum() {
        $db = pg_connect("host=tubes-1-db port=5432 dbname=musikwbd user=postgres password=postgres");
        $query = <<< Q
            SELECT * FROM album
            Q;
        $result = pg_query($db, $query);
        $data = array();
        while($row = pg_fetch_assoc($result)){
            $data[] = $row;
        }
        echo_json_msg(200, "OK", $data);
    }
    function getDistinctArtist() {
        $db = pg_connect("host=tubes-1-db port=5432 dbname=musikwbd user=postgres password=postgres");
        $query = <<< Q
            SELECT DISTINCT penyanyi FROM song
            Q;
        $result = pg_query($db, $query);
        $data = array();
        while($row = pg_fetch_assoc($result)){
            $data[] = $row;
        }
        echo_json_msg(200, "OK", $data);
    }
    function getDistinctGenre (){
        $db = pg_connect("host=tubes-1-db port=5432 dbname=musikwbd user=postgres password=postgres");
        $query = <<< Q
            SELECT DISTINCT genre FROM song
            Q;
        $result = pg_query($db, $query);
        $data = array();
        while($row = pg_fetch_assoc($result)){
            $data[] = $row;
        }
        echo_json_msg(200, "OK", $data);
    }
    function getAlbumName($album_id) {
        $db = pg_connect("host=tubes-1-db port=5432 dbname=musikwbd user=postgres password=postgres");
        $query = <<< Q
            SELECT * FROM album WHERE album_id = $album_id
            Q;
        $result = pg_query($db, $query);
        $data = array();
        while($row = pg_fetch_assoc($result)){
            $data[] = $row;
        }
        echo_json_msg(200, "OK", $data);
    }

    function getSongInAlbum($album_id) {
        $db = pg_connect("host=tubes-1-db port=5432 dbname=musikwbd user=postgres password=postgres");
        $query = <<< Q
            SELECT * FROM song WHERE album_id = $album_id
            Q;
        $result = pg_query($db, $query);
        $data = array();
        while($row = pg_fetch_assoc($result)){
            $data[] = $row;
        }
        echo_json_msg(200, "OK", $data);
    }
    function getSongNotInAlbum($album_id) {
        $db = pg_connect("host=tubes-1-db port=5432 dbname=musikwbd user=postgres password=postgres");
        $query = <<< Q
            SELECT * FROM song WHERE album_id != $album_id or album_id is null
            Q;
        $result = pg_query($db, $query);
        $data = array();
        while($row = pg_fetch_assoc($result)){
            $data[] = $row;
        }
        echo_json_msg(200, "OK", $data);
    }
    if (isset($_GET['type'])) {
        if ($_GET['type'] == "album") {
            getDistinctAlbum();
        } else if ($_GET['type'] == "artist") {
            getDistinctArtist();
        } else if ($_GET['type'] == "genre") {
            getDistinctGenre();
        } else if ($_GET['type'] == "album_name" && isset($_GET['album_id'])) {
            getAlbumName($_GET['album_id']);
        } else if ($_GET['type'] == "song_in_album" && isset($_GET['album_id'])) {
            getSongInAlbum($_GET['album_id']);
        }  else if ($_GET['type'] == "song_not_in_album" && isset($_GET['album_id'])) {
            getSongNotInAlbum($_GET['album_id']);
        } else  {
            echo_json_msg(400, "Bad Request");
        }
    } else {
        echo_json_msg(400, "Bad Request");
    }
?>