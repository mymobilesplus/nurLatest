import React, { Component, PropTypes } from 'react'
import AsyncStorage from '@react-native-community/async-storage';
import { GET_REMINDERS, CREATE_REMINDERS, UPDATE_REMINDERS, DELETE_REMINDERS, GET_BY_ID_REMINDER } from '../API_URI';
import refreshAccessToken from './refreshToken';
import { requestData } from './api_call';

export default class ReminderApiService extends Component {
    
    constructor(){
        super();
    }
    get(request){
        let token = request.token;
        let refreshToken = request.refreshToken;
        return requestData(GET_REMINDERS,request);
        // request = JSON.stringify(request);
        // return this.requestData(GET_REMINDERS,request);
        // return fetch( GET_REMINDERS, {
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
    create(request){
        request.token = request.Reminder.token;
        request.refreshToken = request.Reminder.refreshToken;
        return requestData(CREATE_REMINDERS,request);
        let token = request.Reminder.token;
        let refreshToken = request.refreshToken;
        request = JSON.stringify(request);
        return fetch( CREATE_REMINDERS, {
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
        // request.token = request.Reminder.token;
        // request.refreshToken = request.Reminder.refreshToken;
        return requestData(UPDATE_REMINDERS,request);
        let token = request.Reminder.token;
        let refreshToken = request.refreshToken;
        request = JSON.stringify(request);
        return fetch( UPDATE_REMINDERS, {
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
        return requestData(DELETE_REMINDERS,request);
        let token = request.token;
        let refreshToken = request.refreshToken;
        request = JSON.stringify(request);
        console.warn(request)
        console.warn("endpoint",DELETE_REMINDERS)
        return fetch( DELETE_REMINDERS, {
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
        return requestData(GET_BY_ID_REMINDER,request);
        let token = request.token;
        let refreshToken = request.refreshToken;
        request = JSON.stringify(request);
        return fetch( GET_BY_ID_REMINDER, {
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
        // alert('gelll')
        console.log('request',request);
        let token = request.token;
        // console.log('token',token);
        let refreshToken = request.refreshToken;
        // console.log('refreshToken',refreshToken);
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
