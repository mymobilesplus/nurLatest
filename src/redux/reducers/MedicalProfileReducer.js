import * as actionTypes from "../_ActionTypes"
import {updateObject} from "./utility"

const initialState={
    data:null,
    error:null
}


const allMedicalProfilesSuccess=(action,state)=>{
    return updateObject(state,{
        data:action.payload,
        error:null
    })
}

const allMedicalProfilesFail=(action,state)=>{
    return updateObject(state,{
        data:null,
        error:action.payload    
    })
}

const userMedicalProfilesSuccess=(action,state)=>{
    return updateObject(state,{
        data:action.payload,
        error:null
    })
}

const userMedicalProfilesFail=(action,state)=>{
    return updateObject(state,{
        data:null,
        error:action.payload    
    })
}

const MedicalProfilesReducer =(state=initialState,action)=>{
    switch (action.type){
        case actionTypes.GET_ALL_MEDICAL_DATA_SUCCESS:return allMedicalProfilesSuccess(action,state);
        case actionTypes.GET_ALL_MEDICAL_DATA_FAIL:return allMedicalProfilesFail(action,state);
        case actionTypes.GET_USER_MEDICAL_DATA_SUCCESS:return userMedicalProfilesSuccess(action,state);
        case actionTypes.GET_USER_MEDICAL_PROFILES_FAIL:return userMedicalProfilesFail(action,state);
        default:
            return state
    }
}

export default MedicalProfilesReducer