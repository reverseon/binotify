package com.tubes2.service;

import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;

import javax.annotation.Resource;
import javax.jws.WebService;
import javax.xml.ws.WebServiceContext;
import javax.xml.ws.handler.MessageContext;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.sql.Connection;
import java.sql.ResultSet;

@WebService(endpointInterface = "com.tubes2.service.Callback")
public class CallbackImpl implements Callback {
    @Resource
    WebServiceContext wsContext;
    public MsgWrapper subscriptionCallback(String callback_url) {
        // Create HTTP Post Request
        MessageContext msgx = wsContext.getMessageContext();
        HttpExchange httpx = (HttpExchange) msgx.get("com.sun.xml.ws.http.exchange");
        Headers headers = httpx.getRequestHeaders();
        String auth = headers.getFirst("Authorization");
        try {
            if (auth == null || !(auth.equals(EnvironmentVariable.BinAppKey))) {
                throw new Exception("Unauthorized");
            }
            Connection conn = new DBConn().getConnection();
            String sql = "SELECT * FROM subscription";
            ResultSet rs = conn.createStatement().executeQuery(sql);
            String payload = "";
            while (rs.next()) {
                payload += "{\"creator_id\": " + rs.getInt("creator_id") +
                        ", \"subscriber_id\": " + rs.getInt("subscriber_id") +
                        ", \"status\": \"" + rs.getString("status") + "\"},";
            }
            conn.close();
            payload = payload.substring(0, payload.length() - 1);
            payload = "{\"subscriptions\": [" + payload + "]}";
            URL url = new URL(callback_url);
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("POST");
            con.setRequestProperty("Content-Type", "application/json");
            con.setDoOutput(true);
            byte[] input = payload.getBytes("utf-8");
            OutputStream os = con.getOutputStream();
            os.write(input, 0, input.length);
            if (con.getResponseCode() != 200) {
                throw new RuntimeException("Failed : HTTP error code : " + con.getResponseCode() + " " + con.getResponseMessage() + " with payload " + payload);
            }
            con.disconnect();
            return new MsgWrapper(200,"OK, sending subscription callback to " + callback_url + " with payload " + payload);
        } catch (Exception e) {
            e.printStackTrace();
            return new MsgWrapper(500,e.getMessage());
        }
    }
}
