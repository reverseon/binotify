<?php 
    require_once 'json_response.php';
    require_once 'error_handling.php';
    header('Content-Type: application/json; charset=utf-8');
    function subscribe($creator_id, $subscriber_id) {
        try {
            $soap_ep = "http://tubes2-soap-ws:2434/subscription";
            $headers = array(
                'Content-Type: text/xml; charset=utf-8',
                'Authorization: Siesta-Chicken-Nugget'
            );
        
            $body1 = 
                '<?xml version="1.0" encoding="utf-8"?>
                <s11:Envelope xmlns:s11="http://schemas.xmlsoap.org/soap/envelope/">
                  <s11:Body>
                    <ns1:subscribe xmlns:ns1="http://service.tubes2.com/">
                      <arg0>' . $creator_id . '</arg0>
                      <arg1>' . $subscriber_id . '</arg1>
                    </ns1:subscribe>
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
        } catch (Exception $e) {
            echo_json_msg(500, "Internal Server Error", $e->getMessage());
        }
    }
    if (isset($_GET['creator_id']) && isset($_GET['subscriber_id'])) {
        subscribe($_GET['creator_id'], $_GET['subscriber_id']);
    }
?>