<?php
require_once 'json_response.php';
require_once 'error_handling.php';
header('Content-Type: application/json; charset=utf-8');
function receieve_callback($data) {
    // assume in the format of {subscription : [{creator_id, subscriber_id, status}]}
    try {
        $db = pg_connect("host=tubes-1-db port=5432 dbname=musikwbd user=postgres password=postgres");  
        // drop all record in subcsription table
        $query = <<< Q
            DELETE FROM subscription
        Q;
        $result = pg_query($db, $query);
        if (!$result) {
            echo_json_msg(500, "Internal Server Error", pg_last_error($db));
        }
        $data = json_decode($data, true);
        $subscriptions = $data['subscriptions'];
        foreach ($subscriptions as $subscription) {
            $creator_id = $subscription['creator_id'];
            $subscriber_id = $subscription['subscriber_id'];
            $status = $subscription['status'];
            // do something with the data
            $query = <<< Q
                INSERT INTO subscription (creator_id, subscriber_id, status)
                VALUES ($creator_id, $subscriber_id, '$status')
            Q;
            $result = pg_query($db, $query);
            if (!$result) {
                echo_json_msg(500, "Internal Server Error", pg_last_error($db));
            }
        }
        echo_json_msg(200, "OK", $data);
    } catch (Exception $e) {
        echo_json_msg(500, "Internal Server Error", $e->getMessage());
    }

}

receieve_callback(file_get_contents('php://input'));
?>
