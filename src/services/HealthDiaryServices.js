import React, { Component, PropTypes } from 'react'
import AsyncStorage from '@react-native-community/async-storage';
import { GET_HEALTH_DAIRY_MEMBERS, CREATE_HEALTH_DAIRY_MEMBER, UPDATE_HEALTH_DAIRY_MEMBER, DELETE_HEALTH_DAIRY_MEMBER, GET_BY_ID_HEALTH_DAIRY_RECORD, SHARE_HEALTH_DAIRY_RECORD,MULTI_DELETE_HEALTH_DAIRY_MEMBER } from '../API_URI';
import { requestData } from './api_call';

export default class HealthDairyService extends Component {
    constructor(){
        super();
    } 

    get(request){
        return requestData(GET_HEALTH_DAIRY_MEMBERS,request);
        let token = request.token;
        let refreshToken = request.refreshToken
        request = JSON.stringify(request);
        return fetch( GET_HEALTH_DAIRY_MEMBERS, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
                'refreshToken': refreshToken
            },
            body: request
        });
    }
    create(request){
        return requestData(CREATE_HEALTH_DAIRY_MEMBER,request);
        let token = request.token;
        let refreshToken = request.refreshToken
        request = JSON.stringify(request);
        return fetch( CREATE_HEALTH_DAIRY_MEMBER, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
                'refreshToken': refreshToken
            },
            body: request
        });
    }
    update(request){
        return requestData(UPDATE_HEALTH_DAIRY_MEMBER,request);
        let token = request.token;
        let refreshToken = request.refreshToken
        request = JSON.stringify(request);
        return fetch( UPDATE_HEALTH_DAIRY_MEMBER, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
                'refreshToken': refreshToken
            },
            body: request
        });
    }
    delete(request){
        return requestData(DELETE_HEALTH_DAIRY_MEMBER,request);
        let token = request.token;
        let refreshToken = request.refreshToken
        request = JSON.stringify(request);
        return fetch( DELETE_HEALTH_DAIRY_MEMBER, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
                'refreshToken': refreshToken
            },
            body: request
        });
    }
    multiDelete(request){
        return requestData(MULTI_DELETE_HEALTH_DAIRY_MEMBER,request);
        let token = request.token;
        let refreshToken = request.refreshToken
        request = JSON.stringify(request);
        return fetch( MULTI_DELETE_HEALTH_DAIRY_MEMBER, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
                'refreshToken': refreshToken
            },
            body: request
        });
    }
    share(request){
        return requestData(SHARE_HEALTH_DAIRY_RECORD,request);
        let token = request.token;
        let refreshToken = request.refreshToken;
        request = JSON.stringify(request);
        return fetch( SHARE_HEALTH_DAIRY_RECORD, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
                'refreshToken': refreshToken
            },
            body: request
        });
    }
    getById(request){
        return requestData(GET_BY_ID_HEALTH_DAIRY_RECORD,request);
        let token = request.token;
        let refreshToken = request.refreshToken
        request = JSON.stringify(request);
        return fetch( GET_BY_ID_HEALTH_DAIRY_RECORD, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
                'refreshToken': refreshToken
            },
            body: request
        });
    }
}
