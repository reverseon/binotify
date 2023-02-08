package com.tubes2.service;

import java.util.ArrayList;
import java.util.List;

public class Content {
    public List<String> value;
    public Content() {
        this.value = new ArrayList<String>();
    }
    public void addContent(Object content) {
        this.value.add(content.toString());
    }
}
