<?php 
    require_once 'default_session.php';
    header("Location: ../singer_list.php");
    $headers = array(
        'Content-Type: text/xml; charset=utf-8',
        'Authorization: Ima-Suki-Ni-Naru'
    );

    $body1 = 
        '<?xml version="1.0" encoding="utf-8"?>
        <s11:Envelope xmlns:s11="http://schemas.xmlsoap.org/soap/envelope/">
          <s11:Body>
            <ns1:subscribe xmlns:ns1="http://service.tubes2.com/">
              <arg0>'. $_GET['id'] .'</arg0><arg1>'. $_SESSION['user_id']. '</arg1>
            </ns1:subscribe>
          </s11:Body>
        </s11:Envelope>';

    $ch = curl_init("http://tubes2-soap-ws:2434/subscription");
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $body1);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

    $result1 = curl_exec($ch);
    curl_close($ch);

    $body2=
    '<?xml version="1.0" encoding="utf-8"?>
    <s11:Envelope xmlns:s11="http://schemas.xmlsoap.org/soap/envelope/">
      <s11:Body>
        <ns1:getSub xmlns:ns1="http://service.tubes2.com/">
          <arg0></arg0><arg1></arg1><arg2></arg2>
        </ns1:getSub>
      </s11:Body>
    </s11:Envelope>';
    
    $ch2 = curl_init("http://tubes2-soap-ws:2434/subscription");
    curl_setopt($ch2, CURLOPT_HTTPGET, true);
    curl_setopt($ch2, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch2, CURLOPT_POSTFIELDS, $body2);
    curl_setopt($ch2, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch2, CURLOPT_SSL_VERIFYHOST, false);
    curl_setopt($ch2, CURLOPT_SSL_VERIFYPEER, false);

    $result2 = curl_exec($ch2);
    curl_close($ch2);

    $data = explode(",", $result2);

    $db = pg_connect("host=tubes-1-db port=5432 dbname=musikwbd user=postgres password=postgres");
    $del_data = <<< Q
        DELETE FROM subscription
    Q;

    $result_db = pg_query($db, $del_data);

    for($x = 1; $x < count($data); $x+=3) {
      $creator_id = $data[$x];
      $subs_id = $data[$x+1];
      $status = "";
      if (preg_match('/PENDING/i', $data[$x+2]) == 1){
        $status = "PENDING";
      } elseif (preg_match('/ACCEPTED/i', $data[$x+2]) == 1){
        $status = "ACCEPTED";
      } elseif (preg_match('/REJECTED/i', $data[$x+2]) == 1){
        $status = "REJECTED";
      }

      $insert_data = <<< Q
        INSERT INTO subscription(creator_id, subscriber_id, status) VALUES ($creator_id, $subs_id, '$status')
      Q;

      $result_db2 = pg_query($db, $insert_data);
    }
    
    exit;
?>

<html>

</html>