import * as  actionTypes from "../_ActionTypes"
import { UpdateUserSuccess, GetUserSuccess, GetUserFail, UpdateUserFail} from "../actions/_User"
import {showLoader,hideLoader} from "../actions/_Loader"
import {apiRequest} from "../actions/_API"
import * as API from "../../API_URI"
import AsyncStorage from '@react-native-community/async-storage';
import * as RootNavigation from "../../navigation/RootNavigation"
export const getUser=({dispatch})=>next=>action=>{
    next(action)
    if(action.type===actionTypes.GET_USER_START){
        dispatch(showLoader())
        dispatch(apiRequest('POST',API.GET_USER,null,actionTypes.GET_USER_SUCCESS,actionTypes.GET_USER_FAIL,action.payload,headers))
    }
}


export const userSuccess=({dispatch})=>next=>action=>{
    next(action)

    if(action.type===actionTypes.GET_USER_SUCCESS){
        dispatch(GetUserSuccess(action.payload))
        // console.log("Access Token: ",action.payload.accessToken)
        if(action.payload.returnStatus.returnCode==200){
            saveUser(action.payload)
            dispatch(hideLoader())
        }
        else dispatch(hideLoader())
    }
}


export const userFail=({dispatch})=>next=>action=>{
    next(action)

    if(action.type===actionTypes.GET_USER_FAIL){

        const data={message:"Please enter vailid login details"}

        dispatch(GetUserFail(data))
        dispatch(hideLoader())

    }
}

export const saveUser=async(payload)=>{

   
        try{
            await AsyncStorage.setItem('getuserdetails',JSON.stringify(payload.user))
        }
        catch(e){
            console.log("Access Token Saving Error: ",e)
        }
        const USER=await AsyncStorage.getItem('getuserdetails')
        console.log("user: ",USER)


}


export const updateUser=({dispatch})=>next=>action=>{
    next(action)
    if(action.type===actionTypes.UPDATE_USER_START){
        dispatch(showLoader())
        dispatch(apiRequest('POST',API.UPDATE_USER,null,actionTypes.UPDATE_USER_SUCCESS,actionTypes.UPDATE_USER_FAIL,action.payload))
    }
}


export const updateUserSuccess=({dispatch})=>next=>action=>{
    next(action)

    if(action.type===actionTypes.UPDATE_USER_SUCCESS){
        dispatch(UpdateUserSuccess(action.payload))
        console.log("Access Token: ",action.payload.accessToken)
        if(action.payload.returnStatus.returnCode==200){
            saveCurrentUser(action.payload)
            dispatch(hideLoader())
        }
        else dispatch(hideLoader())
    }
}


export const updateUserFail=({dispatch})=>next=>action=>{
    next(action)

    if(action.type===actionTypes.UPDATE_USER_FAIL){

        const data={message:"Error Updating User"}

        dispatch(UpdateUserFail(data))
        dispatch(hideLoader())

    }
}


export const saveCurrentUser=async(payload)=>{

   
    try{
        await AsyncStorage.setItem('user',JSON.stringify(payload.user))
    }
    catch(e){
        console.log("Access Token Saving Error: ",e)
    }
    const USER=await AsyncStorage.getItem('user')
    console.log("user: ",USER)


}


export const userMiddleware=[getUser,userSuccess,userFail, updateUser, updateUserSuccess, updateUserFail]