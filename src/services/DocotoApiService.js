import React, { Component, PropTypes } from 'react'
import AsyncStorage from '@react-native-community/async-storage';
import { GET_ALL_SPECIALIZATIONS,GET_MORE_SPECIALIZATIONS, GET_ALL_SPECIALIZATIONS_SEARCH, REPORT, SAVED_DOCTORS, SAVE_DOCTOR, SHARE_DOCTOR } from '../API_URI';
import { requestData } from './api_call';

export default class DoctorApiService extends Component {
    
    constructor(){
        super();
    }
    getSpecialisation(request){ 
        return requestData(GET_ALL_SPECIALIZATIONS,request);
        let token = request.token;
        let refreshToken = request.refreshToken
        request = JSON.stringify(request);
        return fetch( GET_ALL_SPECIALIZATIONS, {
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
    getMoreSpecialisation(request){ 
        return requestData(GET_MORE_SPECIALIZATIONS,request);
        let token = request.token;
        let refreshToken = request.refreshToken
        request = JSON.stringify(request);
        return fetch( GET_MORE_SPECIALIZATIONS, {
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
    getSpecialisationSearch(request){ 
        return requestData(GET_ALL_SPECIALIZATIONS_SEARCH,request);
        let token = request.token;
        let refreshToken = request.refreshToken
        request = JSON.stringify(request);
        return fetch( GET_ALL_SPECIALIZATIONS_SEARCH, {
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
    getSavedDoctors(request){
        return requestData(SAVED_DOCTORS,request);
        let token = request.token;
        let refreshToken = request.refreshToken
        request = JSON.stringify(request);
        return fetch( SAVED_DOCTORS, {
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
    saveDoctor(request){
        return requestData(SAVE_DOCTOR,request);
        let token = request.token;
        let refreshToken = request.refreshToken
        request = JSON.stringify(request);
        return fetch( SAVE_DOCTOR, {
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
    shareDoctor(request){
        return requestData(SHARE_DOCTOR,request);
        let token = request.token;
        let refreshToken = request.refreshToken
        request = JSON.stringify(request);
        return fetch( SHARE_DOCTOR, {
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
