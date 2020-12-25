import * as actionTypes from "../_ActionTypes"
import {updateObject} from "./utility"

const initialState={
    data:null,
    error:null
}


const userSuccess=(action,state)=>{
    return updateObject(state,{
        data:action.payload,
        error:null
    })
}

const userFail=(action,state)=>{
    return updateObject(state,{
        data:null,
        error:action.payload    
    })
}

const updateUserSuccess=(action,state)=>{
    return updateObject(state,{
        data:action.payload,
        error:null
    })
}

const updateUserFail=(action,state)=>{
    return updateObject(state,{
        data:null,
        error:action.payload    
    })
}

const UserReducer =(state=initialState,action)=>{
    switch (action.type){
        case actionTypes.UPDATE_GET_USER_DATA_SUCCESS:return userSuccess(action,state);
        case actionTypes.UPDATE_GET_USER_DATA_FAIL:return userFail(action,state);
        case actionTypes.UPDATE_UPDATE_USER_DATA_SUCCESS:return updateUserSuccess(action,state);
        case actionTypes.UPDATE_UPDATE_USER_DATA_FAIL:return updateUserFail(action,state);
        default:
            return state
    }
}

export default UserReducer