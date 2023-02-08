package com.tubes2.service;

import javax.jws.WebService;
import javax.xml.ws.WebServiceContext;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.sql.Timestamp;
import javax.annotation.Resource;
import javax.xml.ws.handler.MessageContext;

import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;

@WebService(endpointInterface = "com.tubes2.service.Subscription")
public class SubscriptionImpl implements Subscription {
    @Resource
    WebServiceContext wsContext;
    private String stringsql(String var) {
        return "'" + var + "'";
    }
    private String getAPIKey(int uid) {
        try {
            Connection conn = new DBConn().getConnection();
            String sql = "SELECT api_key FROM apikey WHERE uid = " + uid;
            ResultSet rs = conn.createStatement().executeQuery(sql);
            conn.close();
            if (rs.next()) {
                return rs.getString("api_key");
            } else {
                return null;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
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
    public MsgWrapper subscribe(String creator_id_str, String subscriber_id_str) {
        MessageContext msgx = wsContext.getMessageContext();
        HttpExchange httpx = (HttpExchange) msgx.get("com.sun.xml.ws.http.exchange");
        Headers headers = httpx.getRequestHeaders();
        String auth = headers.getFirst("Authorization");
        try {
            int creator_id = Integer.parseInt(creator_id_str);
            int subscriber_id = Integer.parseInt(subscriber_id_str);
            if (auth == null || !(auth.equals(EnvironmentVariable.BinAppKey) || auth.equals(EnvironmentVariable.RESTAPIKey))) {
                logger("FAILED subscribe " + creator_id_str + " " + subscriber_id_str + " " + auth);
                return new MsgWrapper(401, "Unauthorized");
            }
            Connection db = new DBConn().getConnection();
            Statement statement = db.createStatement();
            String stat = "INSERT INTO subscription (creator_id, subscriber_id) VALUES (" + creator_id + ", " + subscriber_id + ")";
            int rowaf = statement.executeUpdate(stat);
            db.close();
            logger("SUCCESS subscribe " + creator_id_str  + " " + subscriber_id_str + " " + auth);
            return new MsgWrapper(200, "Operation Succeed, " + rowaf + " row(s) affected");
        } catch (Exception e) {
            logger("EXCP subscribe " + creator_id_str  + " " + subscriber_id_str + " " + auth);
            return new MsgWrapper(500, e.getMessage());
        }
    }
    public MsgWrapper updateSub(String creator_id_str, String subscriber_id_str, String status) {
        MessageContext msgx = wsContext.getMessageContext();
        HttpExchange httpx = (HttpExchange) msgx.get("com.sun.xml.ws.http.exchange");
        Headers headers = httpx.getRequestHeaders();
        String auth = headers.getFirst("Authorization");
        try {
            if (auth == null || !auth.equals(EnvironmentVariable.RESTAPIKey)) {
                logger("FAILED updateSub " + creator_id_str + " " + subscriber_id_str + " " + status + " " + auth);
                return new MsgWrapper(401, "Unauthorized");
            }
            int creator_id = Integer.parseInt(creator_id_str);
            int subscriber_id = Integer.parseInt(subscriber_id_str);
            Connection db = new DBConn().getConnection();
            Statement statement = db.createStatement();
            String stat = "UPDATE subscription SET status = " + stringsql(status) + " WHERE creator_id = " + creator_id + " AND subscriber_id = " + subscriber_id;
            int rowaf = statement.executeUpdate(stat);
            db.close();
            logger("SUCCESS updateSub " + creator_id_str  + " " + subscriber_id_str + " " + status + " " + auth);
            return new MsgWrapper(200, "Operation Succeed, " + rowaf + " row(s) affected");
        } catch (Exception e) {
            logger("EXCP updateSub " + creator_id_str  + " " + subscriber_id_str + " " + status + " " + auth);
            return new MsgWrapper(500, e.getMessage());
        }
    }
    public MsgWrapper getSub(String creator_id_str, String subscriber_id_str, String status) {
        // ASUMSI, KALO EMPTY STRING REQUEST BERARTI ALL
        MessageContext msgx = wsContext.getMessageContext();
        HttpExchange httpx = (HttpExchange) msgx.get("com.sun.xml.ws.http.exchange");
        Headers headers = httpx.getRequestHeaders();
        String auth = headers.getFirst("Authorization");
        String stat;
        try {
            if (auth == null || !(auth.equals(EnvironmentVariable.RESTAPIKey))) {
                logger("FAILED getSub " + creator_id_str + " " + subscriber_id_str + " " + status + " " + auth);
                return new MsgWrapper(401, "Unauthorized");
            }
            Connection db = new DBConn().getConnection();
            if (creator_id_str.equals("") && subscriber_id_str.equals("") && status.equals("")) {
                stat = "SELECT * FROM subscription";
            } else {
                stat = "SELECT * FROM subscription WHERE ";
                if (!creator_id_str.equals("")) {
                    stat += "creator_id = " + creator_id_str;
                }
                if (!subscriber_id_str.equals("")) {
                    if (!creator_id_str.equals("")) {
                        stat += " AND ";
                    }
                    stat += "subscriber_id = " + subscriber_id_str;
                }
                if (!status.equals("")) {
                    if (!creator_id_str.equals("") || !subscriber_id_str.equals("")) {
                        stat += " AND ";
                    }
                    stat += "status = " + stringsql(status);
                }
            }
            Statement statement = db.createStatement();
            ResultSet res = statement.executeQuery(stat);
            MsgWrapper ret = null;
            if (res.next()) {
                ret = new MsgWrapper(200, "Operation Succeed");
                String oneline = "0," + res.getString("creator_id") + "," + res.getString("subscriber_id") + "," + res.getString("status");
                ret.addContent(oneline);
                for (int i = 1; res.next(); i++) {
                    oneline = i + "," + res.getString("creator_id") + "," + res.getString("subscriber_id") + "," + res.getString("status");
                    ret.addContent(oneline);
                }
            } else {
                ret = new MsgWrapper(404, "Not Found");
            }
            db.close();
            logger("SUCCESS getSub " + creator_id_str  + " " + subscriber_id_str + " " + status + " " + auth);
            return ret;
        } catch (Exception e) {
            logger("EXCP getSub " + creator_id_str  + " " + subscriber_id_str + " " + status + " " + auth);
            return new MsgWrapper(500, e.getMessage());
        }
    }
}
