package com.tubes2.service;

import java.util.ArrayList;
import java.util.List;

public class MsgWrapper {
    public int status;
    public String message;
    public Content content;
    public MsgWrapper(int status, String message) {
        this.status = status;
        this.message = message;
        this.content = new Content();
    }
    public void addContent(String content) {
        this.content.addContent(content);
    }
}
