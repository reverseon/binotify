<?php
session_start();
require 'json_response.php';
require 'error_handling.php';

function createAlbum()
{
    $judul = $_POST["judul_album"];
    $penyanyi = $_POST["penyanyi_album"];
    $tanggal_terbit = $_POST["tanggal_terbit_album"];
    $genre = $_POST["genre_album"];

    $db = pg_connect("host=tubes-1-db port=5432 dbname=musikwbd user=postgres password=postgres");
    $cekJudul = <<< Q
            SELECT * FROM album WHERE judul = '$judul'
        Q;
    $r = pg_query($db, $cekJudul);
    if (pg_num_rows($r) > 0) {
        echo_json_msg(400, "Judul sudah ada");
    } else {
        $image = $_FILES["album_cover_upload"]["name"];
        $image_ext = strtolower(pathinfo($image, PATHINFO_EXTENSION));
        $image_name = basename($_FILES['album_cover_upload']['tmp_name']) . "." . $image_ext;
        $image_dir = "../assets/img/" . $image_name;
        if (isset($genre)) { // genre is optional
            $query = <<< Q
                INSERT INTO album (judul, penyanyi, total_duration, image_path, tanggal_terbit, genre) 
                VALUES ('$judul', '$penyanyi', 0, '/assets/img/$image_name', '$tanggal_terbit', '$genre')
            Q;
            if (move_uploaded_file($_FILES["album_cover_upload"]["tmp_name"], $image_dir)) {
                $r = pg_query($db, $query);
                echo_json_msg(200, "Upload Success");
            } else {
                echo_json_msg(400, "Upload Failed");
            }
        } else {
            $query = <<< Q
                INSERT INTO album (judul, penyanyi, total_duration, image_path, tanggal_terbit) 
                VALUES ('$judul', '$penyanyi', 0, '/assets/img/$image_name', '$tanggal_terbit')
            Q;
            if (move_uploaded_file($_FILES["album_cover_upload"]["tmp_name"], $image_dir)) {
                $r = pg_query($db, $query);
                echo_json_msg(200, "Upload Success");
            } else {
                echo_json_msg(400, "Upload Failed");
            }
        }
    }
}

function albumAddContent()
{
    $judul = $_POST['judul'];
    $penyanyi = $_POST['penyanyi'];
    $tanggal_terbit = $_POST['tanggal_terbit'];
    $genre = $_POST['genre'];
    $album = $_POST['album'];

    $dur = shell_exec("ffmpeg -i " . $_FILES['file']['tmp_name'] . " 2>&1");
    preg_match("/Duration: (.{2}):(.{2}):(.{2})/", $dur, $duration);
    $hours = $duration[1];
    $minutes = $duration[2];
    $seconds = $duration[3];
    $durasi = $seconds + ($minutes * 60) + ($hours * 60 * 60);
    $audio = $_FILES['file']['name'];
    $audio_type = strtolower(pathinfo($audio, PATHINFO_EXTENSION));
    $audio_name = basename($_FILES['file']['tmp_name']) . "." . $audio_type;
    $audio_dir = "../assets/audio/" . $audio_name;

    $db = pg_connect("host=tubes-1-db port=5432 dbname=musikwbd user=postgres password=postgres");
    $cekJudul = <<< Q
            SELECT * FROM song WHERE judul = '$judul' AND penyanyi = '$penyanyi'
        Q;
    $queryCheckAlbum = "SELECT album_id FROM album WHERE album_id = '$album'";
    $resultCheckJudul = pg_query($db, $cekJudul);
    $resultCheckAlbum = pg_query($db, $queryCheckAlbum);

    if (isset($_FILES['image'])) {
        $image = $_FILES['image']['name'];
        $image_ext = strtolower(pathinfo($image, PATHINFO_EXTENSION));
        $image_name = basename($_FILES['image']['tmp_name']) . "." . $image_ext;
        $image_dir = "../assets/img/" . $image_name;

        if (move_uploaded_file($_FILES['file']['tmp_name'], $audio_dir && move_uploaded_file($_FILES['image']['tmp_name'], $image_dir))) {
            $query = <<< Q
                INSERT INTO song (judul, penyanyi, tanggal_terbit, genre, 
                duration, audio_path, image_path, album_id) 
                VALUES ('$judul', '$penyanyi', '$tanggal_terbit', '$genre', 
                '$durasi', '/assets/audio/$audio_name', '/assets/img/$image_name', '$album')
                Q;
            $r = pg_query($db, $query);
            echo_json_msg(200, "Upload Success");
        } else {
            echo_json_msg(400, "Upload Failed");
        }
    } else {
        if (move_uploaded_file($_FILES['file']['tmp_name'], $audio_dir)) {
            $query = "INSERT INTO song (judul, penyanyi, tanggal_terbit, genre, duration, audio_path, album_id) VALUES ('$judul', '$penyanyi', '$tanggal_terbit', '$genre', '$durasi', '/assets/audio/$audio_name', '$album')";
            $r = pg_query($db, $query);
            echo_json_msg(200, "Upload success");
        } else {
            echo_json_msg(400, "Upload failed");
        }
    }
}

function deleteAlbum()
{
    $db = pg_connect("host=tubes-1-db port=5432 dbname=musikwbd user=postgres password=postgres");
    $id = $_POST['id_delete'];
    $filequery = "SELECT song_id FROM song WHERE album_id = '$id'";
    $fileResult = pg_query($db, $filequery);
    while ($row = pg_fetch_row($fileResult)) {
        $filequery2 = "SELECT audio_path FROM song WHERE song_id = '$row[0]'";
        $fileResult2 = pg_query($db, $filequery2);
        $row2 = pg_fetch_row($fileResult2);
        $filequery3 = "SELECT image_path FROM song WHERE song_id = '$row[0]'";
        $fileResult3 = pg_query($db, $filequery3);
        $row3 = pg_fetch_row($fileResult3);
        unlink(".." . $row2[0]);
        unlink(".." . $row3[0]);
    }

    $query = "DELETE from album WHERE album_id = '$id'";
    $result = pg_query($db, $query);
    if ($result) {
        echo_json_msg(200, "Success");
    } else {
        echo_json_msg(200, "Failed");
    }
}

function deleteAlbumContent()
{
    $db = pg_connect("host=tubes-1-db port=5432 dbname=musikwbd user=postgres password=postgres");
    $id = $_POST['id'];

    $queryPath = "SELECT audio_path, image_path FROM song WHERE song_id = '$id'";
    $resultPath = pg_query($db, $queryPath);
    $path = pg_fetch_assoc($resultPath);
    unlink(".." . $path['audio_path']);
    if ($path['image_path'] != NULL) {
        unlink(".." . $path['image_path']);
    }

    $query = "DELETE from song WHERE song_id = '$id'";
    $result = pg_query($db, $query);
    if ($result) {
        echo_json_msg(200, "File deleted successfully");
    } else {
        echo_json_msg(200, "Failed to delete file");
    }
}

function getAlbumByID()
{
    $id = $_GET['id'];
    $db = pg_connect("host=tubes-1-db port=5432 dbname=musikwbd user=postgres password=postgres");
    $query = "SELECT * FROM album WHERE album_id = '$id'";
    $result = pg_query($db, $query);
    $data = array();
    while ($row = pg_fetch_assoc($result)) {
        $data[] = $row;
    }
    echo_json_msg(200, "OK", $data);
}

function countData()
{
    $db = pg_connect("host=tubes-1-db port=5432 dbname=musikwbd user=postgres password=postgres");
    $query = "SELECT * FROM album";
    $result = pg_query($db, $query);
    $data = pg_num_rows($result);
    echo_json_msg(200, "OK", $data);
}

/*
function editAlbum()
{
    $db = pg_connect("host=tubes-1-db port=5432 dbname=musikwbd user=postgres password=postgres");
    $id = $_POST['id'];
    $judul = $_POST['judul'];
    $tanggal_terbit = $_POST['tanggal_terbit'];
    $genre = $_POST['genre'];

    if (isset($_FILES['image'])) {
        $target_dir = "../assets/img/";
        $tmpname = basename($_FILES['image']['tmp_name']) . "." . $image_ext;
        $target_file = $target_dir . basename($_FILES['image']['tmp_name']) . "." . $image_ext;
        if (move_uploaded_file($_FILES['image']['tmp_name'], $target_file)) {
            $findPath = "SELECT image_path FROM album WHERE album_id = '$id'";
            $resultPath = pg_query($db, $findPath);
            $path = pg_fetch_assoc($resultPath);
            unlink(".." . $path['image_path']);
            $query = "UPDATE album SET judul = '$judul', tanggal_terbit = '$tanggal_terbit', genre = '$genre', image_path = '/assets/img/$tmpname' WHERE album_id = '$id'";
            $result = pg_query($db, $query);
            echo_json_msg(200, "Upload Success");
        } else {
            echo_json_msg(200, "Upload Failed");
        }
    } else {
        $query = "UPDATE album SET judul = '$judul', tanggal_terbit = '$tanggal_terbit', genre = '$genre' WHERE album_id = '$id'";
        $result = pg_query($db, $query);
        echo_json_msg(200, "Berhasil");
    }
}
*/

function getAlbumDuration()
{
    $db = pg_connect("host=tubes-1-db port=5432 dbname=musikwbd user=postgres password=postgres");
    $id = $_GET['album_id_duration'];
    $query = "SELECT SUM(duration) FROM song WHERE album_id = '$id'";
    $result = pg_query($db, $query);
    $data = pg_fetch_assoc($result);
    echo_json_msg(200, "OK", $data);
}

function getSongByAlbumID()
{
    $db = pg_connect("host=tubes-1-db port=5432 dbname=musikwbd user=postgres password=postgres");
    $id = $_GET['album_id_song'];
    $query = "SELECT * FROM song WHERE album_id = '$id'";
    $result = pg_query($db, $query);
    $data = array();
    while ($row = pg_fetch_assoc($result)) {
        $data[] = $row;
    }
    echo_json_msg(200, "OK", $data);
}
function changeSongAlbumto($songid, $albumid)
{
    $db = pg_connect("host=tubes-1-db port=5432 dbname=musikwbd user=postgres password=postgres");
    $query = "UPDATE song SET album_id = $albumid WHERE song_id = $songid";
    $result = pg_query($db, $query);
    if ($result) {
        echo_json_msg(200, "Success");
    } else {
        echo_json_msg(400, "Failed");
    }
}

function getAlbumByPage()
{
    $db = pg_connect("host=tubes-1-db port=5432 dbname=musikwbd user=postgres password=postgres");
    if ($db && isset($_GET['page']) && isset($_GET['limit'])) {
        // $judul = (isset($_GET['judul']) ? $_GET['judul'] : '%');
        // $penyanyi = (isset($_GET['penyanyi']) ? $_GET['penyanyi'] : '%');
        // $tahun = (isset($_GET['tahun']) ? $_GET['tahun'] : '%');
        // $genre = (isset($_GET['genre']) ? $_GET['genre'] : '%');
        // $sort = (isset($_GET['sort']) ? $_GET['sort'] . ', judul' : 'judul');
        // $order = (isset($_GET['order']) ? $_GET['order'] : 'ASC');
        $p = $_GET['page'];
        $l = $_GET['limit'];
        $query = 'SELECT * FROM album ORDER BY judul ASC LIMIT ' . $l . ' OFFSET ' . ($p - 1) * $l;

        $result = pg_query($db, $query);
        $data = array();
        while ($row = pg_fetch_assoc($result)) {
            $data[] = $row;
        }
        echo_json_msg(200, "OK", $data);
    } else {
        echo_json_msg(500, "Internal Server Error");
    }
}

if (isset($_SESSION['login'])) {
    if (isset($_POST["judul_album"]) && isset($_POST["penyanyi_album"]) && isset($_POST["tanggal_terbit_album"]) && isset($_FILES["album_cover_upload"])) {
        createAlbum();
    } else if (isset($_POST['album_id']) && isset($_POST['song_id'])) {
        changeSongAlbumto($_POST['song_id'], $_POST['album_id']);
    } /* elseif (isset($_POST['id']) && isset($_POST['judul']) && isset($_POST['tanggal_terbit']) && isset($_POST['genre'])) {
        editAlbum();
    } */ elseif (isset($_POST['id_delete'])) {
        deleteAlbum();
    } elseif (isset($_POST['id']) && isset($_POST['album_id'])) {
        deleteAlbumContent();
    } elseif (isset($_GET['id'])) {
        getAlbumByID();
    } elseif (isset($_GET['count'])) {
        countData();
    } elseif (isset($_GET['album_id_duration'])) {
        getAlbumDuration();
    } elseif (isset($_GET['album_id_song'])) {
        getSongByAlbumID();
    } else if (isset($_GET['page']) && isset($_GET['limit'])) {
        getAlbumByPage();
    } else {
        echo_json_msg(400, "Bad Request");
    }
} else {
    echo_json_msg(400, "Bad Request");
}
