import * as actionTypes from "../_ActionTypes"

export const _GetAllMedicalProfiles=(payload)=>({
    type:actionTypes.GET_ALL_MEDICAL_PROFILES_START,
    payload
})

export const GetAllMedicalProfilesSuccess=(payload)=>({
    type:actionTypes.GET_ALL_MEDICAL_PROFILES_SUCCESS,
    payload
})

export const GetAllMedicalProfilesFail=(payload)=>({
    type:actionTypes.GET_ALL_MEDICAL_PROFILES_FAIL,
    payload:payload
})


export const GetUserMedicalProfilesStart=(payload)=>({
    type:actionTypes.GET_USER_MEDICAL_PROFILES_START,
    payload
})

export const GetUserMedicalProfilesSuccess=(payload)=>({
    type:actionTypes.GET_USER_MEDICAL_PROFILES_SUCCESS,
    payload
})

export const GetUserMedicalProfilesFail = (payload)=>({
    type:actionTypes.GET_USER_MEDICAL_PROFILES_FAIL,
    payload
})