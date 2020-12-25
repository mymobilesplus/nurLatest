import * as actionTypes from "../_ActionTypes"

export const _Login=(username,provider,External_Access_token)=>({
    type:actionTypes.EXTERNAL_LOGIN_START,
    payload:{username,provider,External_Access_token}
})

export const LoginUpdate=(payload)=>({
    type:actionTypes.UPDATE_EXTERNAL_LOGIN_DATA_SUCCESS,
    payload:payload
})

export const LoginSuccess=()=>({
    type:actionTypes.EXTERNAL_LOGIN_SUCCESS
})

export const LoginFail=(payload)=>({
    type:actionTypes.UPDATE_EXTERNAL_LOGIN_DATA_FAIL,
    payload:payload
})