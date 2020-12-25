import * as  actionTypes from "../_ActionTypes"
import {ResetPasswordUpdateFail,ResetPasswordUpdateSuccess} from "../actions/_ResetPassword"
import {showLoader,hideLoader} from "../actions/_Loader"
import {apiRequest} from "../actions/_API"
import * as API from "../../API_URI"
import AsyncStorage from '@react-native-community/async-storage';
import * as RootNavigation from "../../navigation/RootNavigation"



export const resetPasswordStart=({dispatch})=>next=>action=>{
    next(action)
    

    if(action.type===actionTypes.RESET_PASSWORD_START){
        dispatch(showLoader())
        dispatch(apiRequest('POST',API.RESET_PASSWORD,null,actionTypes.RESET_PASSWORD_SUCCESS,actionTypes.RESET_PASSWORD_FAIL,action.payload.formdata))
    }
}

export const afterresetPassword=({dispatch})=>next=>action=>{
    next(action)
    if(action.type===actionTypes.RESET_PASSWORD_SUCCESS){
        // dispatch(ResetPasswordUpdateSuccess(action.payload))
        console.log(action.payload);
        if(action.payload && action.payload.returnStatus.returnCode===200){
            RootNavigation.navigate('Login')
            dispatch(hideLoader())
        }
    }
}


export const resetPasswordFail=({dispatch})=>next=>action=>{
    next(action)

    if(action.type===actionTypes.RESET_PASSWORD_FAIL){
        dispatch(ResetPasswordUpdateFail(action.payload))
        dispatch(hideLoader())
    }
}








export const resetPasswordMdl=[resetPasswordStart,afterresetPassword,resetPasswordFail]