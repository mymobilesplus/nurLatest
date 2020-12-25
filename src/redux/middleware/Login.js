import * as  actionTypes from "../_ActionTypes"
import {LoginSuccess,LoginFail,LoginUpdate} from "../actions/_Login"
import {showLoader,hideLoader} from "../actions/_Loader"
import {apiRequest} from "../actions/_API"
import * as API from "../../API_URI"
import AsyncStorage from '@react-native-community/async-storage';
import * as RootNavigation from "../../navigation/RootNavigation"
export const initialLogin=({dispatch})=>next=>action=>{
    next(action)
    if(action.type===actionTypes.LOGIN_START){
        dispatch(showLoader())
        dispatch(apiRequest('POST',API.LOGIN,null,actionTypes.LOGIN_SUCCESS,actionTypes.LOGIN_FAIL,action.payload))
    }
}


export const loginSuccess=({dispatch})=>next=>action=>{
    next(action)

    if(action.type===actionTypes.LOGIN_SUCCESS){
        dispatch(LoginUpdate(action.payload))
        // console.log("Access Token: ",action.payload.accessToken)
        if(action.payload.accessToken!=null){
            RootNavigation.navigate('Top Tab')
            saveAccessToken(action.payload)
            dispatch(hideLoader())

        }
        else dispatch(hideLoader())
    }
}


export const loginFail=({dispatch})=>next=>action=>{
    next(action)

    if(action.type===actionTypes.LOGIN_FAIL){

        const data={message:"Please enter vailid login details"}

        dispatch(LoginFail(data))
        dispatch(hideLoader())

    }
}

export const saveAccessToken=async(payload)=>{

   
        try{
            await AsyncStorage.setItem('accessToken',payload.accessToken)
            await AsyncStorage.setItem('user',JSON.stringify(payload.userSession))
        }
        catch(e){
            console.log("Access Token Saving Error: ",e)
        }

        const TOKEN=await AsyncStorage.getItem('accessToken')
        const USER=await AsyncStorage.getItem('user')
        console.log("Redux Access Token: ",TOKEN)
        console.log("Redux user: ",USER)


}




export const loginMiddleware=[initialLogin,loginSuccess,loginFail]