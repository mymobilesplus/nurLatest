import * as  actionTypes from "../_ActionTypes"
import {RegistrationUpdateFail,RegistrationUpdateSuccess} from "../actions/_Registration"
import {showLoader,hideLoader} from "../actions/_Loader"
import {apiRequest} from "../actions/_API"
import * as API from "../../API_URI"
import AsyncStorage from '@react-native-community/async-storage';
import * as RootNavigation from "../../navigation/RootNavigation"



export const registrationStart=({dispatch})=>next=>action=>{
    next(action)


    if(action.type===actionTypes.REGISTRATION_START){
        dispatch(showLoader())
        dispatch(apiRequest('POST',API.REGISTER,null,actionTypes.REGISTRATION_SUCCESS,actionTypes.REGISTRATION_FAIL,action.payload.formdata))
    }
}

export const afterRegistration=({dispatch})=>next=>action=>{
    next(action)

    if(action.type===actionTypes.REGISTRATION_SUCCESS){
        dispatch(RegistrationUpdateSuccess(action.payload))
        RootNavigation.navigate('Login')
        dispatch(hideLoader())
    }
}


export const registrationFail=({dispatch})=>next=>action=>{
    next(action)

    if(action.type===actionTypes.REGISTRATION_FAIL){
        dispatch(RegistrationUpdateFail(action.payload))
        dispatch(hideLoader())
    }
}








export const registrationMdl=[registrationStart,afterRegistration,registrationFail]