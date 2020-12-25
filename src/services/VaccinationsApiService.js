import React, { Component, PropTypes } from 'react'
import AsyncStorage from '@react-native-community/async-storage';
import { GET_ALL_VACCINATIONS,GET_SEEDED_DATA_RECORDS,GET_SEEDED_DATA, GET_MY_VACCINATIONS, GET_UPCOMING_VACCINATIONS, GET_VACCINATED_VACCINATIONS, GET_OVERDUE_VACCINATIONS, SWITCH_VACCINATED,
     DELETE_VACCINATION, CREATE_VACCINATION, UDPATE_VACCINATION, SHARE_VACCINATION,GET_VACCINATION_BY_CATEGORY_DATA_RECORDS,MULTI_DELETE_VACCINATION, SWITCH_TO_NON_VACCINATED } from '../API_URI';
import { requestData } from './api_call';

export default class VaccinationsApiService extends Component {
    
    constructor(){
        super();
    }
    getAllCat(request){
        return requestData(GET_SEEDED_DATA_RECORDS,request);
        let token = request.token;
        let refreshToken = request.refreshToken;
        request = JSON.stringify(request);
        return fetch( GET_SEEDED_DATA_RECORDS, {
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
    getVaccinationByCategory(request){
        return requestData(GET_VACCINATION_BY_CATEGORY_DATA_RECORDS,request);
        let token = request.token;
        request = JSON.stringify(request);
        return fetch( GET_VACCINATION_BY_CATEGORY_DATA_RECORDS, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: request
        });
    }
    get(request){
        return requestData(GET_ALL_VACCINATIONS,request);
        let token = request.token;
        let refreshToken = request.refreshToken;
        request = JSON.stringify(request);
        return fetch( GET_ALL_VACCINATIONS, {
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
    getMy(request){
        return requestData(GET_MY_VACCINATIONS,request);
        let token = request.token;
        let refreshToken = request.refreshToken;
        request = JSON.stringify(request);
        return fetch( GET_MY_VACCINATIONS, {
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
    getUpcoming(request){
        return requestData(GET_UPCOMING_VACCINATIONS,request);
        let token = request.token;
        let refreshToken = request.refreshToken;
        request = JSON.stringify(request);
        return fetch( GET_UPCOMING_VACCINATIONS, {
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
    getVaccinated(request){
        return requestData(GET_VACCINATED_VACCINATIONS,request);
        let token = request.token;
        let refreshToken = request.refreshToken;
        request = JSON.stringify(request);
        return fetch( GET_VACCINATED_VACCINATIONS, {
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
    getOverdue(request){
        return requestData(GET_OVERDUE_VACCINATIONS,request);
        let token = request.token;
        let refreshToken = request.refreshToken;
        request = JSON.stringify(request);
        return fetch( GET_OVERDUE_VACCINATIONS, {
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
    switchVaccinated(request){
        return requestData(SWITCH_VACCINATED,request);
        let token = request.token;
        let refreshToken = request.refreshToken;
        request = JSON.stringify(request);
        console.warn(request)
        console.warn("endpoint",SWITCH_VACCINATED)
        return fetch( SWITCH_VACCINATED, {
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
    switchToNonVaccinated(request){
        return requestData(SWITCH_TO_NON_VACCINATED,request);
        let token = request.token;
        let refreshToken = request.refreshToken;
        request = JSON.stringify(request);
        return fetch( SWITCH_TO_NON_VACCINATED, {
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
        return requestData(CREATE_VACCINATION,request);
        let token = request.token;
        let refreshToken = request.refreshToken;
        request = JSON.stringify(request);
        return fetch( CREATE_VACCINATION, {
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
        return requestData(UDPATE_VACCINATION,request);
        let token = request.token;
        let refreshToken = request.refreshToken;
        request = JSON.stringify(request);
        return fetch( UDPATE_VACCINATION, {
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
        return requestData(DELETE_VACCINATION,request);
        let token = request.token;
        let refreshToken = request.refreshToken;
        request = JSON.stringify(request);
        return fetch( DELETE_VACCINATION, { 
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
        return requestData(MULTI_DELETE_VACCINATION,request);
        let token = request.token;
        let refreshToken = request.refreshToken;
        request = JSON.stringify(request);
        return fetch( MULTI_DELETE_VACCINATION, { 
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
        return requestData(SHARE_VACCINATION,request);
        let token = request.token;
        let refreshToken = request.refreshToken;
        request = JSON.stringify(request);
        return fetch( SHARE_VACCINATION, {
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
