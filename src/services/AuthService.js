import React, { Component, PropTypes } from 'react'
import AsyncStorage from '@react-native-community/async-storage';
import { SIGNUP, LOGIN, FACEBOOK_LOGIN, REGISTER_FACEBOOK_LOGIN, OBTAIN_LOCAL_ACCESS_TOKEN, FORGOT_PASSWORD, RESET_PASSWORD, GET_USER, UPDATE_USER } from '../API_URI';
import { requestData } from './api_call';

export default class AuthService extends Component {
    
    constructor(){
        super();
    }
    create(request){
        request = JSON.stringify(request);
        return fetch( SIGNUP, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: request
        });
    }
    login(request){
        request = JSON.stringify(request);
        let refreshToken = request.refreshToken
        return fetch( LOGIN, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'refreshToken': refreshToken
            },
            body: request
        });
    }
    registerFacebook(request){
        request = JSON.stringify(request);
        console.warn("endpoint",REGISTER_FACEBOOK_LOGIN)
        return fetch( REGISTER_FACEBOOK_LOGIN, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: request
        });
    }
    fbLogin(request){
        // request = JSON.stringify(request);
        console.log('requirestss',request);
        console.warn("endpoint",OBTAIN_LOCAL_ACCESS_TOKEN)
        return fetch( `${OBTAIN_LOCAL_ACCESS_TOKEN}?provider=Facebook&externalaccesstoken=${request.externalaccesstoken}`, {
            method: 'GET'
        });
    }
    forgetPassword(request){
        request = JSON.stringify(request);
        return fetch( FORGOT_PASSWORD, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: request
        });
    }
    resetPassword(request){
        request = JSON.stringify(request);
        return fetch( RESET_PASSWORD, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: request
        });
    }
    getUser(request){
        return requestData(GET_USER,request);
        let token = request.token;
        let refreshToken = request.refreshToken
        request = JSON.stringify(request);
        return fetch( GET_USER, {
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
    updateUser(request){
        return requestData(UPDATE_USER,request);
        let token = request.token;
        let refreshToken = request.refreshToken
        request = JSON.stringify(request);
        return fetch( UPDATE_USER, {
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
