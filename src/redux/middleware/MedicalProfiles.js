import * as  actionTypes from "../_ActionTypes"
import {showLoader,hideLoader} from "../actions/_Loader"
import {apiRequest} from "../actions/_API"
import * as API from "../../API_URI"
import AsyncStorage from '@react-native-community/async-storage';
import * as RootNavigation from "../../navigation/RootNavigation"
import { GetAllMedicalProfilesSuccess, GetAllMedicalProfilesFail, GetUserMedicalProfilesSuccess, GetUserMedicalProfilesFail } from "../actions/_MedicalProfile"


export const getAllMedicalProfiles=({dispatch})=>next=>action=>{
    next(action)
    if(action.type===actionTypes.GET_ALL_MEDICAL_PROFILES_START){
        dispatch(showLoader())
        dispatch(apiRequest('POST',API.GET_MEDICAL_PROFILES,null,actionTypes.GET_ALL_MEDICAL_PROFILES_SUCCESS,actionTypes.GET_ALL_MEDICAL_PROFILES_FAIL,action.payload))
    }
}

export const getUserMedicalProfiles=({dispatch})=>next=>action=>{
    next(action)
    if(action.type===actionTypes.GET_USER_MEDICAL_PROFILES_START){
        dispatch(showLoader())
        dispatch(apiRequest('POST',API.GET_USER_MEDICAL_PROFILE,null,actionTypes.GET_USER_MEDICAL_PROFILES_SUCCESS,actionTypes.GET_USER_MEDICAL_PROFILES_FAIL,action.payload))
    }
}


export const allMedicalSuccess=({dispatch})=>next=>action=>{
    next(action)

    if(action.type===actionTypes.GET_ALL_MEDICAL_PROFILES_SUCCESS){
        dispatch(GetAllMedicalProfilesSuccess(action.payload))
        // console.log("Access Token: ",action.payload.accessToken)
        if(action.payload.returnStatus.returnCode==200){
            // saveUser(action.payload)
            dispatch(hideLoader())
        }
        else dispatch(hideLoader())
    }
}


export const allMedicalFail=({dispatch})=>next=>action=>{
    next(action)

    if(action.type===actionTypes.GET_ALL_MEDICAL_PROFILES_FAIL){

        const data={message:"Please enter vailid login details"}

        dispatch(GetAllMedicalProfilesFail(data))
        dispatch(hideLoader())

    }
}

export const userMedicalSuccess=({dispatch})=>next=>action=>{
    next(action)
    console.log(action);
    if(action.type===actionTypes.GET_USER_MEDICAL_PROFILES_SUCCESS){
        dispatch(GetUserMedicalProfilesSuccess(action.payload))
        // console.log("Access Token: ",action.payload.accessToken)
        if(action.payload.returnStatus.returnCode==200){
            saveMedicalProfiles(action.payload)
            dispatch(hideLoader())
        }
        else dispatch(hideLoader())
    }
}


export const userMedicalFail=({dispatch})=>next=>action=>{
    next(action)

    if(action.type===actionTypes.GET_USER_MEDICAL_PROFILES_FAIL){

        const data={message:"Please enter vailid login details"}

        dispatch(GetUserMedicalProfilesFail(data))
        dispatch(hideLoader())

    }
}

export const saveMedicalProfiles=async(payload)=>{
        try{
            await AsyncStorage.setItem('userMedicalProfiles',JSON.stringify(payload.medicalProfiles))
        }
        catch(e){
            console.log("Access Token Saving Error: ",e)
        }
        const MEDICALPROFILES=await AsyncStorage.getItem('userMedicalProfiles')
        console.log("Medical Profiles: ",MEDICALPROFILES)


}





export const medicalProfileMiddleware=[getAllMedicalProfiles,getUserMedicalProfiles,allMedicalSuccess, allMedicalFail, userMedicalSuccess, userMedicalFail]