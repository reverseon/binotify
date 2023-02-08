<?php
    require_once 'list-d-elmt.php';
    function get_list_display($type, $json) {
        $json = json_decode($json, true);
        $list_display = '
        <div class="list-display">
            <ul>';
        if (count($json) > 0) {
            foreach ($json as $elmt) {
                $list_display .= get_l_d_elmt($type, json_encode($elmt));
            }
        } else {
            $list_display .= '
                <li class="no-data">No Data</li>';
        }
        $list_display .= '
            </ul>
        </div>';
        return $list_display;
    }
    // return isset($_GET['type']) && isset($_GET['json']) && $json !== '' ? get_list_display($_GET['type'], $_GET['json']) : 'Query not found';
    if (isset($_GET['type']) && isset($_GET['json'])) {
        echo get_list_display($_GET['type'], $_GET['json']);
    } else {
        echo 'Query not found';
    }
?>