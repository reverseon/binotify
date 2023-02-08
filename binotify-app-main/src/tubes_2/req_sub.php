<?php
require_once 'json_response.php';
require_once 'error_handling.php';
header('Content-Type: application/json; charset=utf-8');
function req_sub() {
    // assume in the format of {subscription : [{creator_id, subscriber_id, status}]}
    try {
        $db = pg_connect("host=tubes-1-db port=5432 dbname=musikwbd user=postgres password=postgres");  
        // drop all record in subcsription table
        $query = <<< Q
            SELECT * FROM subscription
        Q;
        $result = pg_query($db, $query);
        if (!$result) {
            echo_json_msg(500, "Internal Server Error", pg_last_error($db));
        }
        // pg_query result as json
        $data = array();
        while($row = pg_fetch_assoc($result)){
            $data[] = $row;
        }
        echo_json_msg(200, "OK", $data);
    } catch (Exception $e) {
        echo_json_msg(500, "Internal Server Error", $e->getMessage());
    }
}
req_sub();
?>
