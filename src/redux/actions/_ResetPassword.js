import * as actionTypes from "../_ActionTypes"

export const resetPassword=(formdata)=>({
    type:actionTypes.RESET_PASSWORD_START,
    payload:{formdata}
})

export const ResetPasswordUpdateSuccess=(payload)=>({
    type:actionTypes.RESET_PASSWORD_SUCCESS,
    payload:payload
})

export const ResetPasswordUpdateFail=(payload)=>({
    type:actionTypes.UPDATE_RESET_DATA,
    payload:payload
})
