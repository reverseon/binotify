<?php
    session_start();
    require 'json_response.php';
    require 'error_handling.php';
    header('Content-Type: application/json; charset=utf-8');

    function getSongByParam($db) {
        $s = $_GET['query'];
        $g = (strtolower($_GET['genre']) === "all") ? "%' or genre is null" : (strtolower($_GET['genre']) === "unknown" ? "' or genre is null" : strtolower($_GET['genre']) . "'");
        $order = (isset($_GET['order']) ? $_GET['order'] : 'ASC');
        $sort = (isset($_GET['sortby']) && $_GET['sortby'] == "tahun" ? ("tanggal_terbit " . $order . ",judul " . $order) : 'judul ' . $order);
        $p = $_GET['page'];
        $l = $_GET['limit'];
        $query = "";
        if ($_GET['judul'] == "true") {
            $query .= <<< Q
            (SELECT * FROM song 
            WHERE lower(judul) LIKE lower('%$s%') 
            AND (lower(genre) like '$g)) 
            Q;
        }
        if ($_GET['penyanyi'] == "true") {
            if ($query != "") {
                $query .= " UNION ";
            }
            $query .= <<< Q
            (SELECT * FROM song 
            WHERE lower(penyanyi) LIKE lower('%$s%') 
            AND (lower(genre) like '$g)) 
            Q;
        }
        if ($_GET['tahun'] == "true") {
            if ($query != "") {
                $query .= " UNION ";
            }
            $query .= <<< Q
            (SELECT * FROM song 
            WHERE extract(year from tanggal_terbit)::varchar(255) like '%$s%' 
            AND (lower(genre) like '$g))
            Q;
        }
        if ($_GET['judul'] != "true" && $_GET['penyanyi'] != "true" && $_GET['tahun'] != "true") {
            $query .= <<< Q
            SELECT * FROM song LIMIT 0
            Q;
        }
        $query = "SELECT * FROM (" . $query . ") as song ORDER BY $sort LIMIT $l OFFSET " . ($p - 1) * $l;
        // $offset = ($p - 1) * $l;
        // $query .= " LIMIT $l OFFSET $offset";
        $result = pg_query($db, $query);
        $data = array();
        while($row = pg_fetch_assoc($result)){
            $data[] = $row;
        }
        echo_json_msg(200, "OK", $data);
    }
    function getSongById($db) {
        $sid = $_GET['song_id'];
        $query = <<< Q
            SELECT * FROM song WHERE song_id = $sid
        Q;
        $result = pg_query($db, $query);
        $data = array();
        while ($row = pg_fetch_assoc($result)) {
            $data[] = $row;
        }
        echo_json_msg(200, "OK", $data);
    }

    function getSongByGenre($db) {
        $query = <<< Q
        SELECT DISTINCT
        CASE WHEN genre is null THEN 'Unknown' ELSE genre
        END AS genre
        FROM song
        Q;
        $result = pg_query($db, $query);
        $data = array();
        while ($row = pg_fetch_assoc($result)) {
            $data[] = $row;
        }
        echo_json_msg(200, "OK", $data);
    }

    if (isset($_SESSION['login'])) {
        $db = pg_connect("host=tubes-1-db port=5432 dbname=musikwbd user=postgres password=postgres");    
        if($db) {
            if (isset($_GET['get_genre']) && $_GET['get_genre'] == "true") {
                getSongByGenre($db);
            } else if (isset($_GET['song_id'])) {
                getSongById($db);
            } else if (isset($_GET['query']) && isset($_GET['judul']) && isset($_GET['penyanyi']) && isset($_GET['tahun']) && isset($_GET['genre']) && isset($_GET['page']) && isset($_GET['limit'])) {
                getSongByParam($db);
            } else {
                echo_json_msg(400, "Bad Request 400");
            }
        } else {
            echo_json_msg(500, "Internal Server Error", $query);
        }
    } else {
        echo_json_msg(400, "Bad Request");
    }
?>