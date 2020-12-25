import * as  actionTypes from "../_ActionTypes"
import {showLoader,hideLoader} from "../actions/_Loader"
import {apiRequest} from "../actions/_API"
import * as API from "../../API_URI"
import AsyncStorage from '@react-native-community/async-storage';
import * as RootNavigation from "../../navigation/RootNavigation"
import { GetAllMedicalRecordsSuccess, GetAllMedicalRecordsFail, GetUserMedicalRecordsSuccess, GetUserMedicalRecordsFail } from "../actions/_MedicalRecord"


export const getAllMedicalRecords=({dispatch})=>next=>action=>{
    next(action)
    if(action.type===actionTypes.GET_ALL_MEDICAL_RECORDS_START){
        dispatch(showLoader())
        dispatch(apiRequest('POST',API.GET_MEDICAL_RECORDS,null,actionTypes.GET_ALL_MEDICAL_RECORDS_SUCCESS,actionTypes.GET_ALL_MEDICAL_RECORDS_FAIL,action.payload))
    }
}

export const getUserMedicalRecords=({dispatch})=>next=>action=>{
    next(action)
    if(action.type===actionTypes.GET_USER_MEDICAL_RECORDS_START){
        dispatch(showLoader())
        dispatch(apiRequest('POST',API.GET_USER_MEDICAL_RECORD,null,actionTypes.GET_USER_MEDICAL_RECORDS_SUCCESS,actionTypes.GET_USER_MEDICAL_RECORDS_FAIL,action.payload))
    }
}

export const createUserMedicalRecords=({dispatch})=>next=>action=>{
    next(action)
    if(action.type===actionTypes.CREATE_MEDICAL_RECORD_START){
        dispatch(showLoader())
        dispatch(apiRequest('POST',API.CREATE_USER_MEDICAL_RECORD,null,actionTypes.CREATE_MEDICAL_PROFILE_SUCCESS,actionTypes.CREATE_MEDICAL_RECORD_FAIL,action.payload))
    }
}


export const allMedicalSuccess=({dispatch})=>next=>action=>{
    next(action)

    if(action.type===actionTypes.GET_ALL_MEDICAL_RECORDS_SUCCESS){
        // dispatch(GetAllMedicalRecordsSuccess(action.payload))
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

    if(action.type===actionTypes.GET_ALL_MEDICAL_RECORDS_FAIL){

        const data={message:"Please enter vailid login details"}

        // dispatch(GetAllMedicalRecordsFail(data))
        dispatch(hideLoader())

    }
}

export const userMedicalSuccess=({dispatch})=>next=>action=>{
    next(action)
    console.log(action);
    if(action.type===actionTypes.GET_USER_MEDICAL_RECORDS_SUCCESS){
        // dispatch(GetUserMedicalRecordsSuccess(action.payload))
        // console.log("Access Token: ",action.payload.accessToken)
        if(action.payload.returnStatus.returnCode==200){
            saveMedicalRecords(action.payload)
            dispatch(hideLoader())
        }
        else dispatch(hideLoader())
    }
}


export const userMedicalFail=({dispatch})=>next=>action=>{
    next(action)

    if(action.type===actionTypes.GET_USER_MEDICAL_RECORDS_FAIL){

        const data={message:"Please enter vailid login details"}

        // dispatch(GetUserMedicalRecordsFail(data))
        dispatch(hideLoader())

    }
}

export const createMedicalSuccess=({dispatch})=>next=>action=>{
    next(action)
    console.log(action);
    if(action.type===actionTypes.CREATE_MEDICAL_RECORD_SUCCESS){
        // dispatch(GetUserMedicalRecordsSuccess(action.payload))
        // console.log("Access Token: ",action.payload.accessToken)
        if(action.payload.returnStatus.returnCode==200){
            console.log(action.payload);
            dispatch(hideLoader())
        }
        else dispatch(hideLoader())
    }
}


export const createMedicalFail=({dispatch})=>next=>action=>{
    next(action)

    if(action.type===actionTypes.CREATE_MEDICAL_RECORD_FAIL){

        const data={message:"Please enter vailid login details"}

        // dispatch(GetUserMedicalRecordsFail(data))
        dispatch(hideLoader())

    }
}

export const saveMedicalRecords=async(payload)=>{
        try{
            await AsyncStorage.setItem('userMedicalRecords',JSON.stringify(payload.medicalRecords))
        }
        catch(e){
            console.log("Access Token Saving Error: ",e)
        }
        const MEDICALRECORDS=await AsyncStorage.getItem('userMedicalRecords')
        console.log("Medical Records: ",MEDICALRECORDS)


}





export const medicalRecordsMiddleware=[getAllMedicalRecords,getUserMedicalRecords,allMedicalSuccess, 
    allMedicalFail, 
    userMedicalSuccess, 
    userMedicalFail,
    createUserMedicalRecords,
    createMedicalSuccess,
    createMedicalFail
]