package com.tubes2.service;

import javax.jws.WebMethod;
import javax.jws.WebService;

@WebService
public interface Callback {
    @WebMethod
    public MsgWrapper subscriptionCallback(String callback_url);
}