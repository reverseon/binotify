package com.tubes2.service;

import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;

import javax.annotation.Resource;
import javax.jws.WebService;
import javax.xml.ws.WebServiceContext;
import javax.xml.ws.handler.MessageContext;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.sql.Timestamp;

@WebService(endpointInterface = "com.tubes2.service.APIKey")
public class APIKeyImpl implements APIKey {
    @Resource
    WebServiceContext wsContext;
    private static String stringToSHA256Hex(String str) {
        try {
            java.security.MessageDigest md = java.security.MessageDigest.getInstance("SHA-256");
            byte[] hash = md.digest(str.getBytes("UTF-8"));
            StringBuilder hexString = new StringBuilder();
            for (byte b : hash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) hexString.append('0');
                hexString.append(hex);
            }
            return hexString.toString();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    private String stringsql(String var) {
        return "'" + var + "'";
    }
    private void logger(String description) {
        try {
            Connection db = new DBConn().getConnection();
            MessageContext msgx = wsContext.getMessageContext();
            HttpExchange httpx = (HttpExchange) msgx.get("com.sun.xml.ws.http.exchange");
            String ip = httpx.getRemoteAddress().getAddress().getHostAddress();
            String endpoint = httpx.getRequestURI().toString();
            Timestamp timestamp = new Timestamp(System.currentTimeMillis());
            Statement statement = db.createStatement();
            String stat = "INSERT INTO logging (ip, endpoint, description, requested_at) VALUES (" + stringsql(ip) + ", " + stringsql(endpoint) + ", " + stringsql(description) + ", " + stringsql(timestamp.toString()) + ")";
            statement.executeUpdate(stat);
            db.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    public MsgWrapper addAPIKey(String uid_str) {
        MessageContext msgx = wsContext.getMessageContext();
        HttpExchange httpx = (HttpExchange) msgx.get("com.sun.xml.ws.http.exchange");
        Headers headers = httpx.getRequestHeaders();
        String auth = headers.getFirst("Authorization");
        try {
            // GET HTTPX HEADER
            int uid = Integer.parseInt(uid_str);
            if (auth == null || !auth.equals(EnvironmentVariable.RESTAPIKey)) {
                logger("FAILED addAPIKey " + uid_str + " " + auth);
                return new MsgWrapper(401, "Unauthorized");
            }
            String api_key = stringToSHA256Hex(uid_str + System.currentTimeMillis());
            Connection conn = new DBConn().getConnection();
            String sql = "INSERT INTO apikey (uid, api_key) VALUES (" + uid + ", " + stringsql(api_key) + ")";
            conn.createStatement().executeUpdate(sql);
            conn.close();
            logger("SUCCESS addAPIKey " + uid_str + " " + auth);
            return new MsgWrapper(200, "Success, (" + uid + ", " + stringsql(api_key) + ") added");
        } catch (Exception e) {
            logger("EXCP addAPIKey " + uid_str + " " + auth);
            return new MsgWrapper(500, "Something went wrong");
        }
    }
    public MsgWrapper getAPIKey(String uid_str) {
        MessageContext msgx = wsContext.getMessageContext();
        HttpExchange httpx = (HttpExchange) msgx.get("com.sun.xml.ws.http.exchange");
        Headers headers = httpx.getRequestHeaders();
        String auth = headers.getFirst("Authorization");
        try {
            // GET HTTPX HEADER
            int uid = Integer.parseInt(uid_str);
            if (auth == null || !auth.equals(EnvironmentVariable.RESTAPIKey)) {
                logger("FAILED getAPIKey " + uid_str + " " + auth);
                return new MsgWrapper(401, "Unauthorized");
            }
            Connection conn = new DBConn().getConnection();
            String sql = "SELECT api_key FROM apikey WHERE uid = " + uid;
            ResultSet api_key_rs = conn.createStatement().executeQuery(sql);
            conn.close();
            if (api_key_rs.next()) {
                String api_key = api_key_rs.getString("api_key");
                MsgWrapper msg = new MsgWrapper(200, "Success");
                msg.addContent(api_key);
                logger("SUCCESS getAPIKey " + uid_str + " " + auth);
                return msg;
            } else {
                logger("FAILED getAPIKey " + uid_str + " " + auth);
                return new MsgWrapper(404, "Not Found");
            }
        } catch (Exception e) {
            e.printStackTrace();
            logger("EXCP getAPIKey " + uid_str + " " + auth);
            return new MsgWrapper(500, "Something went wrong");
        }
    }
}
