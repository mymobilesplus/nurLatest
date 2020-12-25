import * as actionTypes from "../_ActionTypes"

export const _Registration=(formdata)=>({
    type:actionTypes.REGISTRATION_START,
    payload:{formdata}
})

export const RegistrationUpdateSuccess=(payload)=>({
    type:actionTypes.UPDATE_REGISTRATION_DATA_SUCCESS,
    payload:payload
})

export const RegistrationUpdateFail=(payload)=>({
    type:actionTypes.UPDATE_REGISTRATION_DATA_FAIL,
    payload:payload
})

