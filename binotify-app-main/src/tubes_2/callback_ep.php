<?php
require_once 'json_response.php';
require_once 'error_handling.php';
header('Content-Type: application/json; charset=utf-8');

function callback_request() {
    try {
        $soap_ep = "http://tubes2-soap-ws:2434/callback";
        $headers = array(
            'Content-Type: text/xml; charset=utf-8',
            'Authorization: Siesta-Chicken-Nugget'
        );
    
        $body1 = 
            '<?xml version="1.0" encoding="utf-8"?>
            <s11:Envelope xmlns:s11="http://schemas.xmlsoap.org/soap/envelope/">
              <s11:Body>
                <ns1:subscriptionCallback xmlns:ns1="http://service.tubes2.com/">
                  <arg0>http://tubes-1-server:80/tubes_2/callback_receive.php</arg0>
                </ns1:subscriptionCallback>
              </s11:Body>
            </s11:Envelope>';
    
        $ch = curl_init($soap_ep);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $body1);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    
        $result1 = curl_exec($ch);
        curl_close($ch);
        echo_json_msg(200, "OK", $result1);
    } catch (Exception $e) {
        echo_json_msg(500, "Internal Server Error", $e->getMessage());
    }
}


if (isset($_POST['subscription'])) {
    receieve_callback(stream_get_contents(STDIN));
} else if (isset($_GET['call_req'])) {
    if ($_GET['call_req'] == 'true') {
        callback_request();
    }
}



?>