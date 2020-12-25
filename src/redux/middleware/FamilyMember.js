import * as  actionTypes from "../_ActionTypes"
import {showLoader,hideLoader} from "../actions/_Loader"
import {apiRequest} from "../actions/_API"
import * as API from "../../API_URI"
import AsyncStorage from '@react-native-community/async-storage';
import * as RootNavigation from "../../navigation/RootNavigation"
import { GetAllMedicalRecordsSuccess, GetAllMedicalRecordsFail, GetUserMedicalRecordsSuccess, GetUserMedicalRecordsFail } from "../actions/_MedicalRecord"
import { UpdateFamilyMemberList } from "../actions/_FamilyMember";


export const getFamilyMembers=({dispatch})=>next=>action=>{
    next(action)
    if(action.type===actionTypes.GET_ALL_FAMILY_MEMBERS_START){
        dispatch(showLoader())
        dispatch(apiRequest('POST',API.GET_FAMILY_MEMBERS,null,actionTypes.GET_ALL_FAMILY_MEMBERS_SUCCESS,actionTypes.GET_ALL_FAMILY_MEMBERS_FAIL,action.payload))
    }
}

export const createFamilyMember=({dispatch})=>next=>action=>{
    next(action)
    if(action.type===actionTypes.CREATE_FAMILY_MEMBER_START){
        dispatch(showLoader())
        dispatch(apiRequest('POST',API.CREATE_FAMILY_MEMBER,null,actionTypes.CREATE_FAMILY_MEMBER_SUCCESS,actionTypes.CREATE_FAMILY_MEMBER_FAIL,action.payload))
    }
}


export const getFamilyMemberSucccess=({dispatch})=>next=>action=>{
    next(action)

    if(action.type===actionTypes.GET_ALL_FAMILY_MEMBERS_SUCCESS){
        dispatch(UpdateFamilyMemberList(action.payload))
        // console.log("Access Token: ",action.payload.accessToken)
        if(action.payload.returnStatus.returnCode==200){
            saveFamilyMembers(action.payload)
            dispatch(hideLoader())
        }
        else dispatch(hideLoader())
    }
}


export const getFamilyMemberFail=({dispatch})=>next=>action=>{
    next(action)

    if(action.type===actionTypes.GET_ALL_FAMILY_MEMBERS_FAIL){

        const data={message:"Please enter vailid login details"}

        // dispatch(GetAllMedicalRecordsFail(data))
        dispatch(hideLoader())

    }
}

export const createFamilyMemberSuccess=({dispatch})=>next=>action=>{
    next(action)
    console.log(action);
    if(action.type===actionTypes.CREATE_FAMILY_MEMBER_SUCCESS){
        // dispatch(GetUserMedicalRecordsSuccess(action.payload))
        // console.log("Access Token: ",action.payload.accessToken)
        if(action.payload.returnStatus.returnCode==200){
            dispatch(hideLoader())
        }
        else dispatch(hideLoader())
    }
}


export const createFamilyMemberFail=({dispatch})=>next=>action=>{
    next(action)

    if(action.type===actionTypes.CREATE_FAMILY_MEMBER_FAIL){

        const data={message:"Please enter vailid login details"}

        // dispatch(GetUserMedicalRecordsFail(data))
        dispatch(hideLoader())

    }
}

export const saveFamilyMembers=async(payload)=>{
        try{
            await AsyncStorage.setItem('userFamilyMembers',JSON.stringify(payload.familyMembers))
        }
        catch(e){
            console.log("Access Token Saving Error: ",e)
        }
        const FAMILYMEMBERS=await AsyncStorage.getItem('userFamilyMembers')
        console.log("Family Members: ",FAMILYMEMBERS)


}





export const familyMemberMiddleware=[
    getFamilyMembers, 
    getFamilyMemberSucccess, 
    getFamilyMemberFail,
    createFamilyMember,
    createFamilyMemberSuccess,
    createFamilyMemberFail
]