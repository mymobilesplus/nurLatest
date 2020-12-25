import React, { Component, PropTypes } from 'react'
import AsyncStorage from '@react-native-community/async-storage';
import { GET_SEEDED_DATA, CREATE_FEEDBACK } from '../API_URI';
import { requestData } from './api_call';

export default class SeededData extends Component {
    
    constructor(){
        super();
    }
    get(request){
        return requestData(GET_SEEDED_DATA,request);
        let token = request.token;
        let refreshToken = request.refreshToken;
        request = JSON.stringify(request);
        return fetch( GET_SEEDED_DATA, {
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
    sendFeedback(request){
        return requestData(CREATE_FEEDBACK,request);
        let token = request.token;
        let refreshToken = request.refreshToken;
        request = JSON.stringify(request);
        return fetch( CREATE_FEEDBACK, {
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
