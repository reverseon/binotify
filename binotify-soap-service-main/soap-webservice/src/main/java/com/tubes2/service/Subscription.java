package com.tubes2.service;

import javax.jws.WebService;
import javax.jws.WebMethod;
@WebService
public interface Subscription {
    @WebMethod
    public MsgWrapper subscribe(String creator_id_str, String subscriber_id_str);
    @WebMethod
    public MsgWrapper updateSub(String creator_id_str, String subscriber_id_str, String status);
    @WebMethod
    public MsgWrapper getSub(String creator_id_str, String subscriber_id_str, String status);
}
