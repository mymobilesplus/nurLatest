import * as actionTypes from "../_ActionTypes"
import {updateObject} from "./utility"

const initialState={
    isAuthenticated:false,
    data:null,
    error:null
}


const medicalRecords=(action,state)=>{
    return updateObject(state,{
        isAuthenticated:true,
        data:action.payload,
        error:null
    })
}


const MedicalRecordReducer =(state=initialState,action)=>{
    switch (action.type){
        case actionTypes.GET_ALL_MEDICAL_PROFILES_DATA_SUCCESS:return medicalRecords(action,state);


        default:
            return state
    }
}

export default MedicalRecordReducer