import React, { Component, PropTypes } from 'react'
import AsyncStorage from '@react-native-community/async-storage';
import { GET_FAMILY_MEMBERS, CREATE_FAMILY_MEMBER, UPDATE_FAMILY_MEMBER, DELETE_FAMILY_MEMBER, INVITE_FAMILY_MEMBER } from '../API_URI';
import { requestData } from './api_call';

export default class FamilyMemberService extends Component {
    
    constructor(){
        super();
    }
    get(request){
        return requestData(GET_FAMILY_MEMBERS,request);
        let token = request.token;
        let refreshToken = request.refreshToken;
        request = JSON.stringify(request);
        return fetch( GET_FAMILY_MEMBERS, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: request
        });
    }
    create(request){
        return requestData(CREATE_FAMILY_MEMBER,request);
        let token = request.token;
        let refreshToken = request.refreshToken;
        request = JSON.stringify(request);
        console.log(request);
        return fetch( CREATE_FAMILY_MEMBER, {
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
        return requestData(UPDATE_FAMILY_MEMBER,request);
        let token = request.token;
        let refreshToken = request.refreshToken;
        request = JSON.stringify(request);
        return fetch( UPDATE_FAMILY_MEMBER, {
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
        return requestData(DELETE_FAMILY_MEMBER,request);
        let token = request.token;
        let refreshToken = request.refreshToken;
        request = JSON.stringify(request);
        return fetch( DELETE_FAMILY_MEMBER, {
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
    invite(request){
        return requestData(INVITE_FAMILY_MEMBER,request);
        let token = request.token;
        let refreshToken = request.refreshToken;
        request = JSON.stringify(request);
        return fetch( INVITE_FAMILY_MEMBER, {
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


