import React, { Component, PropTypes } from 'react'
import AsyncStorage from '@react-native-community/async-storage';
import { GET_USER_MEDICAL_RECORD, CREATE_USER_MEDICAL_RECORD, UPDATE_USER_MEDICAL_RECORD, DELETE_USER_MEDICAL_RECORD, SHARE_USER_MEDICAL_RECORD, GET_BY_ID_MEDICAL_RECORD,GET_MEDICAL_RECORD_MULTI_DELETE } from '../API_URI';
import refreshAccessToken from './refreshToken';
import { requestData } from './api_call';
let id = 0;
export default class MedicalRecordsService extends Component {
    constructor(){
        super();
        this.state = {
            id : 0
        }
        
    }
    get(request){
        return requestData(GET_USER_MEDICAL_RECORD,request);
        // console.log('request', request);
        let token = request.token;
        let refreshToken = request.refreshToken;
        // // request = JSON.stringify(request);
        return this.requestData(GET_USER_MEDICAL_RECORD,request);
    }
    create(request){
        return requestData(CREATE_USER_MEDICAL_RECORD,request);
        let token = request.token;
        let refreshToken = request.refreshToken;
        // request = JSON.stringify(request);
        return this.requestData(CREATE_USER_MEDICAL_RECORD,request);
        // return fetch( CREATE_USER_MEDICAL_RECORD, { 
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //         'Authorization': 'Bearer ' + token,
        //         'refreshToken': refreshToken
        //     },
        //     body: request
        // });
    }
    update(request){
        return requestData(UPDATE_USER_MEDICAL_RECORD,request);
        let token = request.token;
        let refreshToken = request.refreshToken;
        request = JSON.stringify(request);

        return fetch( UPDATE_USER_MEDICAL_RECORD, {
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
        return requestData(DELETE_USER_MEDICAL_RECORD,request);
        let token = request.token;
        let refreshToken = request.refreshToken;
        request = JSON.stringify(request);
        return fetch( DELETE_USER_MEDICAL_RECORD, {
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
        return requestData(GET_MEDICAL_RECORD_MULTI_DELETE,request);
        let token = request.token;
        let refreshToken = request.refreshToken;
        request = JSON.stringify(request);
        return fetch( GET_MEDICAL_RECORD_MULTI_DELETE, {
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
        return requestData(SHARE_USER_MEDICAL_RECORD,request);
        let token = request.token;
        let refreshToken = request.refreshToken;
        request = JSON.stringify(request);
        return fetch( SHARE_USER_MEDICAL_RECORD, {
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
        return requestData(GET_BY_ID_MEDICAL_RECORD,request);
        let token = request.token;
        let refreshToken = request.refreshToken;
        request = JSON.stringify(request);
        return fetch( GET_BY_ID_MEDICAL_RECORD, {
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
    requestData(endpoint,request){
        console.log('request',request);
        let token = request.token;
        console.log('token',token);
        let refreshToken = request.refreshToken;
        console.log('refreshToken',refreshToken);
        return new Promise((resolve, reject)=>{
            fetch( endpoint, { 
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                    'refreshToken': refreshToken
                },
                body: JSON.stringify(request)
            }).then((resp)=>{
                console.log('resp', JSON.stringify(resp,null,4));

                if(resp.status==200){
                    resolve(resp);
                }
                if(resp.status==401){
                    // alert('hi')
                    refreshAccessToken().then(async()=>{
                        let user = await AsyncStorage.getItem('loginData');
                        let data = JSON.parse(user);
                        fetch( endpoint, { 
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + data.accessToken,
                                'refreshToken': data.refreshToken
                            },
                            body: request
                        }).then((response)=>{
                            resolve(response);
                        })
                    })
                }
            });
        })
    }
}
