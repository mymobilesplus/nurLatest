import * as actionTypes from "../_ActionTypes"
import {updateObject} from "./utility"

const initialState={
    data:null,
    error:null
}


const updateResetData=(action,state)=>{
    
    return updateObject(state,{
        data:action.payload,
        error:null
    })
}

const updateResetDataFail=(action,state)=>{
    return updateObject(state,{
        data:null,
        error:action.payload
    })
}



const ResetPasswordReducer =(state=initialState,action)=>{
    
    switch (action.type){
        case actionTypes.UPDATE_RESET_DATA:return updateResetData(action,state);
        case actionTypes.RESET_PASSWORD_FAIL:return updateResetDataFail(action,state);



        default:
            return state
    }
}

export default ResetPasswordReducer