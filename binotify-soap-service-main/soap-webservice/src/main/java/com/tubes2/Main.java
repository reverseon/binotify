package com.tubes2;
import com.tubes2.service.*;
import javax.xml.ws.Endpoint;

public class Main {
    public static void main(String[] args) {
        try {
            Endpoint.publish("http://0.0.0.0:2434/subscription", new SubscriptionImpl());
            System.out.println("Server started at " + "http://0.0.0.0:2434/subscription");
            Endpoint.publish("http://0.0.0.0:2434/apikey", new APIKeyImpl());
            System.out.println("Server started at http://0.0.0.0:2434/apikey");
            Endpoint.publish("http://0.0.0.0:2434/callback", new CallbackImpl());
            System.out.println("Server started at http://0.0.0.0:2434/callback");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}