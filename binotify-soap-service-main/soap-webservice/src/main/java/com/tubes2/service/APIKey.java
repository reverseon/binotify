package com.tubes2.service;

import javax.jws.WebMethod;
import javax.jws.WebService;

@WebService
public interface APIKey {
    @WebMethod
    public MsgWrapper addAPIKey(String uid_str);
    public MsgWrapper getAPIKey(String uid_str);
}