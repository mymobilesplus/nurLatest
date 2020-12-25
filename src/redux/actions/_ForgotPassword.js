import * as actionTypes from "../_ActionTypes"

export const forgotPassword=(Email)=>({
    type:actionTypes.FORGOT_PASSWORD_START,
    payload:{Email}
})


export const forgotPasswordFail=(error)=>({
    type:actionTypes.FORGOT_PASSWORD_FAIL,
    payload:error
})

export const forgotPasswordSuccess=(data)=>({
    type:actionTypes.UPDATE_FORGOT_DATA,
    payload:data
})

