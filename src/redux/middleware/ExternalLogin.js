import * as  actionTypes from "../_ActionTypes"
import {LoginSuccess,LoginFail,LoginUpdate} from "../actions/_ExternalLogin"
import {showLoader,hideLoader} from "../actions/_Loader"
import {apiRequest} from "../actions/_API"
import * as API from "../../API_URI"
import AsyncStorage from '@react-native-community/async-storage';
import * as RootNavigation from "../../navigation/RootNavigation"
export const initialLogin=({dispatch})=>next=>action=>{
    next(action)
    if(action.type===actionTypes.EXTERNAL_LOGIN_START){
        dispatch(showLoader())
        dispatch(apiRequest('POST',API.REGISTER_FACEBOOK_LOGIN,null,actionTypes.EXTERNAL_LOGIN_SUCCESS,actionTypes.EXTERNAL_LOGIN_FAIL,action.payload))
    }
}


export const loginSuccess=({dispatch})=>next=>action=>{
    next(action)
    
    if(action.type===actionTypes.EXTERNAL_LOGIN_SUCCESS){
        dispatch(LoginUpdate(action.payload))
        // console.log("Access Token: ",action.payload.accessToken)
        if(action.payload.accessToken!=null){
            RootNavigation.navigate('Top Tab')
            saveAccessToken(action.payload.accessToken)
            dispatch(hideLoader())

        }
        else dispatch(hideLoader())
    }
}


export const loginFail=({dispatch})=>next=>action=>{
    next(action)
    if(action.type===actionTypes.EXTERNAL_LOGIN_FAIL){

        const data={message:"Please enter vailid login details"}

        dispatch(LoginFail(data))
        dispatch(hideLoader())

    }
}

export const saveAccessToken=async(accessToken)=>{

   
        try{
            await AsyncStorage.setItem('accessToken',accessToken)
        }
        catch(e){
            console.log("Access Token Saving Error: ",e)
        }

        const TOKEN=await AsyncStorage.getItem('accessToken')
        console.log("Access Token: ",TOKEN)
}




export const externalLoginMiddleware=[initialLogin,loginSuccess,loginFail]