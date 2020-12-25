import React, { Component, PropTypes } from 'react'
import AsyncStorage from '@react-native-community/async-storage';
import { GET_USER_MEDICAL_PROFILE, CREATE_USER_MEDICAL_PROFILE, UPDATE_USER_MEDICAL_PROFILE, DELETE_USER_MEDICAL_PROFILE } from '../API_URI';
import { requestData } from './api_call';

export default class MedicalProfileService extends Component {
    
    constructor(){
        super();
    }
    get(request){
        return requestData(GET_USER_MEDICAL_PROFILE,request);
        let token = request.token;
        let refreshToken = request.refreshToken
        request = JSON.stringify(request);
        return fetch( GET_USER_MEDICAL_PROFILE, {
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
        return requestData(CREATE_USER_MEDICAL_PROFILE,request);
        let token = request.token;
        let refreshToken = request.refreshToken
        request = JSON.stringify(request);
        return fetch( CREATE_USER_MEDICAL_PROFILE, {
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
        return requestData(UPDATE_USER_MEDICAL_PROFILE,request);
        let token = request.token;
        let refreshToken = request.refreshToken
        request = JSON.stringify(request);
        return fetch( UPDATE_USER_MEDICAL_PROFILE, {
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
        return requestData(DELETE_USER_MEDICAL_PROFILE,request);
        let token = request.token;
        let refreshToken = request.refreshToken
        request = JSON.stringify(request);
        return fetch( DELETE_USER_MEDICAL_PROFILE, {
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
