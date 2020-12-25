import * as actionTypes from "../_ActionTypes"
import {updateObject} from "./utility"

const initialState={
    data:null,
    error:null
}


const updateForgotData=(action,state)=>{
    return updateObject(state,{
        data:action.payload,
        error:null
    })
}

const updateForgotDataFail=(action,state)=>{
    return updateObject(state,{
        data:null,
        error:action.payload
    })
}



const ForgotPasswordReducer =(state=initialState,action)=>{
    switch (action.type){
        case actionTypes.UPDATE_FORGOT_DATA:return updateForgotData(action,state);
        case actionTypes.FORGOT_PASSWORD_FAIL:return updateForgotDataFail(action,state);



        default:
            return state
    }
}

export default ForgotPasswordReducer