import React, { Component, PropTypes } from 'react'
import AsyncStorage from '@react-native-community/async-storage';
import { GET_ALL_TOPICS, GET_BY_TOPIC, GET_BY_ARTICLE, MARK_ARTICLE_FAVORITE, MARK_ARTICLE_LIKE, ADD_COMMENT_TO_ARTICAL, GET_ALL_ARTICLES ,GET_ARTICLES_BY_USER, GET_FAVORITE_ARTICLES_BY_USER, GET_TOPIC_BY_USER, CREATE_ARTICLE, UPDATE_ARTICLE, DELETE_ARTICLE, CREATE_TOPIC, UPDATE_TOPIC, DELETE_TOPIC, SHARE_ARTICLE, DELETE_MULTIPLE_ARTICLES, REPORT } from '../API_URI';
import { requestData } from './api_call';

export default class CommunityService extends Component {
    
    constructor(){
        super();
    }
    get(request){
        return requestData(GET_ALL_TOPICS,request);
        let token = request.token;
        let refreshToken = request.refreshToken
        request = JSON.stringify(request);
        return fetch( GET_ALL_TOPICS, {
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
    getArticles(request){
        return requestData(GET_ALL_ARTICLES,request);
        let token = request.token;
        let refreshToken = request.refreshToken
        request = JSON.stringify(request);
        return fetch( GET_ALL_ARTICLES, {
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
    getByTopic(request){
        return requestData(GET_BY_TOPIC,request);
        let token = request.token;
        let refreshToken = request.refreshToken
        request = JSON.stringify(request);
        return fetch( GET_BY_TOPIC, {
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
    getByArticle(request){
        return requestData(GET_BY_ARTICLE,request);
        let token = request.token;
        let refreshToken = request.refreshToken
        request = JSON.stringify(request);
        return fetch( GET_BY_ARTICLE, {
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
    getTopicsByUser(request){
        return requestData(GET_TOPIC_BY_USER,request);
        let token = request.token;
        let refreshToken = request.refreshToken
        request = JSON.stringify(request);
        return fetch( GET_TOPIC_BY_USER, {
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
        getArticlesByUser(request){
        return requestData(GET_ARTICLES_BY_USER,request);
        let token = request.token;
        let refreshToken = request.refreshToken
        request = JSON.stringify(request);
        return fetch( GET_ARTICLES_BY_USER, {
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

        getFavoriteArticlesByUser(request){
        return requestData(GET_FAVORITE_ARTICLES_BY_USER,request);
        let token = request.token;
        let refreshToken = request.refreshToken
        request = JSON.stringify(request);
        return fetch( GET_FAVORITE_ARTICLES_BY_USER, {
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

    createArticle(request){
        return requestData(CREATE_ARTICLE,request);
        let token = request.token;
        let refreshToken = request.refreshToken
        request = JSON.stringify(request);
        return fetch( CREATE_ARTICLE, {
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
    updateArticle(request){
        return requestData(UPDATE_ARTICLE,request);
        let token = request.token;
        let refreshToken = request.refreshToken
        request = JSON.stringify(request);
        return fetch( UPDATE_ARTICLE, {
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
    deleteArticle(request){
        return requestData(DELETE_ARTICLE,request);
        let token = request.token;
        let refreshToken = request.refreshToken
        request = JSON.stringify(request);
        return fetch( DELETE_ARTICLE, {
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
    deleteMultipleArticles(request){
        return requestData(DELETE_MULTIPLE_ARTICLES,request);
        let token = request.token;
        let refreshToken = request.refreshToken
        request = JSON.stringify(request);
        return fetch( DELETE_MULTIPLE_ARTICLES, {
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
        return requestData(SHARE_ARTICLE,request);
        let token = request.token;
        let refreshToken = request.refreshToken
        request = JSON.stringify(request);
        return fetch( SHARE_ARTICLE, {
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
    markArticleFavorite(request){
        return requestData(MARK_ARTICLE_FAVORITE,request);
        let token = request.token;
        let refreshToken = request.refreshToken
        request = JSON.stringify(request);
        return fetch( MARK_ARTICLE_FAVORITE, {
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
    markArticleLike(request){
        return requestData(MARK_ARTICLE_LIKE,request);
        let token = request.token;
        let refreshToken = request.refreshToken
        request = JSON.stringify(request);
        return fetch( MARK_ARTICLE_LIKE, {
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
    submitComment(request){
        return requestData(ADD_COMMENT_TO_ARTICAL,request);
        let token = request.token;
        let refreshToken = request.refreshToken
        request = JSON.stringify(request);
        // console.log(request)
        return fetch( ADD_COMMENT_TO_ARTICAL, {
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
    createTopic(request){
        return requestData(CREATE_TOPIC,request);
        let token = request.token;
        let refreshToken = request.refreshToken
        request = JSON.stringify(request);
        // console.log(request);
        return fetch( CREATE_TOPIC, {
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
    updateTopic(request){
        return requestData(UPDATE_TOPIC,request);
        let token = request.token;
        let refreshToken = request.refreshToken
        request = JSON.stringify(request);
        return fetch( UPDATE_TOPIC, {
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
    deleteTopic(request){
        return requestData(DELETE_TOPIC,request);
        let token = request.token;
        let refreshToken = request.refreshToken
        request = JSON.stringify(request);
        return fetch( DELETE_TOPIC, {
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
