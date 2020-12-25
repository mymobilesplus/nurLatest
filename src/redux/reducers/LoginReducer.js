import * as actionTypes from "../_ActionTypes"
import {updateObject} from "./utility"

const initialState={
    isAuthenticated:false,
    data:null,
    error:null
}


const loginSuccess=(action,state)=>{
    return updateObject(state,{
        isAuthenticated:true,
        data:action.payload,
        error:null
    })
}

const loginFail=(action,state)=>{
    return updateObject(state,{
        isAuthenticated: false,
        data:null,
        error:action.payload    
    })
}


const logout=(action,state)=>{
    return updateObject(state,{
        isAuthenticated:false,
        data:null,
    })
}

const LoginReducer =(state=initialState,action)=>{
    switch (action.type){
        case actionTypes.UPDATE_LOGIN_DATA_SUCCESS:return loginSuccess(action,state);
        case actionTypes.UPDATE_LOGIN_DATA_FAIL:return loginFail(action,state);
        case actionTypes.LOGIN_SUCCESS:return logout(action,state)


        default:
            return state
    }
}

export default LoginReducer