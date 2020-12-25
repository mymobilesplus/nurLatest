import * as actionTypes from "../_ActionTypes"

export const _GetUser=(payload)=>({
    type:actionTypes.GET_USER_START,
    payload
})

export const GetUserSuccess=(payload)=>({
    type:actionTypes.LOGIN_SUCCESS,
    payload
})

export const GetUserFail=(payload)=>({
    type:actionTypes.GET_USER_FAIL,
    payload:payload
})


export const UpdateUserStart=(payload)=>({
    type:actionTypes.UPDATE_USER_START,
    payload
})

export const UpdateUserSuccess=(payload)=>({
    type:actionTypes.UPDATE_USER_SUCCESS,
    payload
})

export const UpdateUserFail = (payload)=>({
    type:actionTypes.UPDATE_USER_FAIL,
    payload
})