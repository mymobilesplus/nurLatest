import * as actionTypes from "../_ActionTypes"
import * as API from "../../API_URI"
import axios from "axios"
import AsyncStorage from '@react-native-community/async-storage';

// const accessToken = AsyncStorage.getItem('accessToken')

export const api = ({dispatch})=>next=>async action=>{
    if(action.type === actionTypes.API_REQUEST){
        const {method,url,onSuccess,onError,data}=action.meta;
        // console.log("API Params: ",data)
        let accessToken = await AsyncStorage.getItem('accessToken')
        
        let headers = {}
        if(accessToken != null){
            headers = {
                Authorization: "Bearer " + accessToken
            }
        }
        axios({
            url:url,
            method:method,
            baseURL:API.BASE_API,
            transformRequest:[(data,headers)=>{
               const serializedData=[]
               for(const k in data){
                   if(data[k]){
                       serializedData.push(`${k}=${encodeURIComponent(data[k])}`)
                   }
               }
               return serializedData.join('&')
            }],
            data:data,
            transformResponse:[(data)=>{
                console.log(data);
            }],
            headers
        }).then(res=>{
            console.log("Response: ",JSON.parse(res.request.response))
            if(res.request){
                dispatch({type:onSuccess,payload:JSON.parse(res.request.response)})
            }    
        })
        .catch(error=>{
            console.log(error);
            if(error.response){
                console.log('Error: ',error.response)
                dispatch({type:onError,payload:JSON.parse(error.response.request._response)})
            }
        })
    }
    return next(action)
}