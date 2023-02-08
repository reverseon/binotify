<?php
    session_start();
    require 'json_response.php';
    require 'error_handling.php';
    function addNewSong(){
        $judul = $_POST['judul_lagu'];
        $penyanyi = $_POST['penyanyi_lagu'];
        $tanggal_terbit = $_POST['tanggal_terbit_lagu'];
        $genre = $_POST['genre_lagu'];
        // CHECK NOT ZERO LENGTH
        if (!isset($_FILES['file_lagu']['name']) || strlen($judul) == 0 || strlen($tanggal_terbit) == 0){
            echo_json_msg(400, "Masukkan kosong atau tidak valid");
            return;
        }
        $judul = "'" . $_POST['judul_lagu'] . "'";
        $penyanyi = $_POST['penyanyi_lagu'] == '' ? "NULL" : "'" . $_POST['penyanyi_lagu'] . "'";
        $tanggal_terbit = "'" . $_POST['tanggal_terbit_lagu'] . "'" ;
        $genre = $_POST['genre_lagu'] == '' ? 'NULL' : "'" . $_POST['genre_lagu'] . "'";
        $filename = !isset($_FILES['file_lagu']['name']) ? echo_json_msg(400, 'File not selected') : $_FILES['file_lagu']['name'];

        $dur = shell_exec("ffmpeg -i ".$_FILES['file_lagu']['tmp_name']." 2>&1");
        preg_match("/Duration: (.{2}):(.{2}):(.{2})/", $dur, $duration);
        $hours = $duration[1];
        $minutes = $duration[2];
        $seconds = $duration[3];
        $durasi = $seconds + ($minutes*60) + ($hours*60*60);
        $FileType = strtolower(pathinfo($filename,PATHINFO_EXTENSION));
        $target_dir = "../assets/audio/";
        $target_file = $target_dir. basename($_FILES['file_lagu']['tmp_name']).".".$FileType;
        $tmpname = basename($_FILES['file_lagu']['tmp_name']).".".$FileType;

        $db = pg_connect("host=tubes-1-db port=5432 dbname=musikwbd user=postgres password=postgres");
        $queryCheckJudul = "SELECT * FROM song WHERE judul = $judul" . ($penyanyi == "NULL" ? " AND penyanyi is null" : " AND penyanyi = $penyanyi");
        $resultCheckJudul = pg_query($db, $queryCheckJudul);
        if (pg_num_rows($resultCheckJudul) > 0){
            echo_json_msg(400, "Judul lagu sudah ada");
            return;
        }
        if (isset($_FILES['image_lagu'])){
            $image = $_FILES['image_lagu']['name'];
            $imageFileType = strtolower(pathinfo($image,PATHINFO_EXTENSION));
            $target_dir_image = "../assets/img/";
            $tmpimagename = basename($_FILES['image_lagu']['tmp_name']).".".$imageFileType;
            $target_file_image = $target_dir_image. basename($_FILES['image_lagu']['tmp_name']).".".$imageFileType;
            if(move_uploaded_file($_FILES['file_lagu']['tmp_name'], $target_file) && move_uploaded_file($_FILES['image_lagu']['tmp_name'], $target_file_image)){
                $queryImage = "INSERT INTO song (judul, penyanyi, tanggal_terbit, genre, duration, audio_path, image_path) VALUES ($judul, $penyanyi, $tanggal_terbit, $genre, $durasi, '/assets/audio/$tmpname', '/assets/img/$tmpimagename')";
                pg_query($db, $queryImage);
                echo_json_msg(200, "Upload Success");
            }
            else{
                echo_json_msg(400,"Something went wrong, upload failed");
            }

        } else {
            if(move_uploaded_file($_FILES['file_lagu']['tmp_name'], $target_file)){
                $query = "INSERT INTO song (judul, penyanyi, tanggal_terbit, genre, duration, audio_path) VALUES ($judul, $penyanyi, $tanggal_terbit, $genre, $durasi, '/assets/audio/$tmpname')";
                $result = pg_query($db, $query);
                echo_json_msg(200, "Upload Success");
            }

            else{
                echo_json_msg(400,"Something went wrong, upload failed");
            }
        }
    }

    Function editSong(){
        /*
            form2.append("id", this.song_id);
            form2.append("judul_lagu_update", this.judul_lagu.value);
            form2.append("judul_album_update", this.judul_album.value);
            form2.append("penyanyi_update", this.penyanyi.value);
            form2.append("genre_lagu_update", this.genre_lagu.value);
            form2.append("tanggal_terbit_lagu_update", this.tanggal_terbit_lagu.value);
        */
        $id = $_POST['id'];
        $judul = $_POST['judul_lagu_update'];
        $album = $_POST['judul_album_update'];
        $penyanyi = $_POST['penyanyi_update'];
        $tanggal_terbit = $_POST['tanggal_terbit_lagu_update'];
        $genre = $_POST['genre_lagu_update'];
        if(strlen($judul)==0 || strlen($tanggal_terbit)==0){
            echo_json_msg(400, "Masukkan kosong atau tidak valid");
            return;
        }
        $judul = "'" . $_POST['judul_lagu'] . "'";
        $penyanyi = $_POST['penyanyi_lagu'] == '' ? "NULL" : "'" . $_POST['penyanyi_lagu'] . "'";
        $tanggal_terbit = "'" . $_POST['tanggal_terbit_lagu'] . "'" ;
        $genre = $_POST['genre_lagu'] == '' ? 'NULL' : "'" . $_POST['genre_lagu'] . "'";
        $checkPenyanyi = "SELECT penyanyi FROM song WHERE song_id = $id";
        $db = pg_connect("host=tubes-1-db port=5432 dbname=musikwbd user=postgres password=postgres");
        $resultPenyanyi = pg_query($db, $checkPenyanyi);
        $penyanyi = pg_fetch_row($resultPenyanyi)[0];
        $checkJudul = "SELECT judul FROM song WHERE judul = $judul AND penyanyi = $penyanyi";
        if (pg_num_rows(pg_query($db, $checkJudul)) > 1){
            echo_json_msg(400, "Judul sudah ada");
            return;
        }
        $findPath = "SELECT audio_path, image_path FROM song WHERE song_id = $id";
        $resultPath = pg_query($db, $findPath);
        $path = pg_fetch_assoc($resultPath);
        $query = "UPDATE song SET judul = $judul, album_id = $album, penyanyi = $penyanyi, tanggal_terbit = $tanggal_terbit, genre = $genre WHERE song_id = $id";
        $result = pg_query($db, $query);
        if (!isset($_FILES['image_lagu']) && !isset($_FILES['file_lagu'])) {
            echo_json_msg(200, "Update Success");
            return;
        }
        if (isset($_FILES['image_lagu'])){
            $image = $_FILES['image_lagu']['name'];
            $imageFileType = strtolower(pathinfo($image,PATHINFO_EXTENSION));
            $target_dir_image = "../assets/img/";
            $tmpimagename = basename($_FILES['image_lagu']['tmp_name']).".".$imageFileType;
            $target_file_image = $target_dir_image. basename($_FILES['image_lagu']['tmp_name']).".".$imageFileType;

            if(move_uploaded_file($_FILES['image_lagu']['tmp_name'], $target_file_image)){
                if ($path['image_path'] != NULL){
                    unlink ("..".$path['image_path']);
                }
                $queryImage = "UPDATE song SET image_path = '/assets/img/$tmpimagename' WHERE song_id = $id";
                pg_query($db, $queryImage); 
                echo_json_msg(200,"Update success");
            }
            else{
                echo_json_msg(400,"Update failed");
            }
        } 
        if (isset($_FILES['file_lagu'])){
            $filename = $_FILES['file_lagu']['name'];
            $FileType = strtolower(pathinfo($filename,PATHINFO_EXTENSION));
            $target_dir = "../assets/audio/";
            $target_file = $target_dir. basename($_FILES['file_lagu']['tmp_name']).".".$FileType;
            $tmpname = basename($_FILES['file_lagu']['tmp_name']).".".$FileType;
            if(move_uploaded_file($_FILES['file_lagu']['tmp_name'], $target_file)){
                if ($path['audio_path'] != NULL){
                    unlink ("..".$path['audio_path']);
                }
                $query = "UPDATE song SET audio_path = '/assets/audio/$tmpname' WHERE song_id = $id";
                $result = pg_query($db, $query);
                echo_json_msg(200,"Update success");
            }
            else{
                echo_json_msg(400,"Update failed");
            }
        }
    }
        
    Function deleteSong(){
        $id=$_POST['song_id'];
        $db = pg_connect("host=tubes-1-db port=5432 dbname=musikwbd user=postgres password=postgres");
        $findPath = "SELECT audio_path, image_path FROM song WHERE song_id = $id";
        $resultPath = pg_query($db, $findPath);
        $path = pg_fetch_assoc($resultPath);
        unlink ("..".$path['audio_path']);
        if ($path['image_path'] != NULL){
            unlink ("..".$path['image_path']);
        }
        $findAlbum = "SELECT album_id FROM song WHERE song_id = $id";
        $resultAlbum = pg_query($db, $findAlbum);
        $query = "DELETE FROM song WHERE song_id = $id";
        $result = pg_query($db, $query);
        if ($resultAlbum){
            $albumRow = pg_fetch_assoc($resultAlbum);
            $album = $albumRow['album_id'];
            $countTime = "UPDATE album SET total_duration = COALESCE((SELECT SUM(duration) FROM song WHERE album_id = $album),0) WHERE album_id = $album";
            $resultTime = pg_query($db, $countTime);
        }
        echo_json_msg(200,"Delete success");
    }

    

    if (isset($_POST["judul_lagu"]) && isset($_POST["tanggal_terbit_lagu"]) && isset($_FILES["file_lagu"])) {
        addNewSong();
    } else if (isset($_POST["id"]) && isset($_POST["judul_lagu_update"]) && isset($_POST["judul_album_update"]) && isset($_POST["penyanyi_update"]) && isset($_POST["genre_lagu_update"]) && isset($_POST["tanggal_terbit_lagu_update"])){
        editSong();
    } else if (isset($_POST["song_id"])){
        deleteSong();
    } else  {
        echo_json_msg(400, "Invalid request");
    }

?>