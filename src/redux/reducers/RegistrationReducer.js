import * as actionTypes from "../_ActionTypes"
import {updateObject} from "./utility"

const initialState={
    isAuthenticated:false,
    data:null,
    error:null
}


const registrationSuccess=(action,state)=>{
    return updateObject(state,{
        isAuthenticated:true,
        data:action.payload,
        error:null
    })
}

const registrationFail=(action,state)=>{
    return updateObject(state,{
        isAuthenticated: false,
        data:null,
        error:action.payload    
    })
}




const RegistrationReducer =(state=initialState,action)=>{
    switch (action.type){
        case actionTypes.UPDATE_REGISTRATION_DATA_SUCCESS:return registrationSuccess(action,state);
        case actionTypes.UPDATE_REGISTRATION_DATA_FAIL:return registrationFail(action,state);


        default:
            return state
    }
}

export default RegistrationReducer