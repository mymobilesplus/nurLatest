import React, { Component, PropTypes } from 'react'
import AsyncStorage from '@react-native-community/async-storage';
import { SEARCH_FOR_SPECIALITIES,SEARCH_FOR_NEAR_SPECIALITIES, REPORT } from '../API_URI';
import { requestData } from './api_call';

export default class SearchDoctorApiService extends Component {
    
    constructor(){
        super();
    }
    searchdoctor(request){
        return requestData(SEARCH_FOR_SPECIALITIES,request);
        let token = request.token;
        let refreshToken = request.refreshToken;
        request = JSON.stringify(request);
        return fetch( SEARCH_FOR_SPECIALITIES, {
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
    
    searchneardoctor(request){
        return requestData(SEARCH_FOR_NEAR_SPECIALITIES,request);
        let token = request.token;
        let refreshToken = request.refreshToken;
        request = JSON.stringify(request);
        return fetch( SEARCH_FOR_NEAR_SPECIALITIES, {
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
    
    search_doctor(request){
        return requestData(SEARCH_FOR_SPECIALITIES,request);
        let token = request.token;
        let refreshToken = request.refreshToken;
        request = JSON.stringify(request);
        return fetch( SEARCH_FOR_SPECIALITIES, {
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
    report(request){
        let token = request.ReportLog.token;
        let refreshToken = request.ReportLog.refreshToken
        request = JSON.stringify(request);
        return fetch( REPORT, {
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
