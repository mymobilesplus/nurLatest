import * as actionTypes from "../_ActionTypes"

export const _GetAllMedicalRecords=(payload)=>({
    type:actionTypes.GET_ALL_MEDICAL_RECORDS_START,
    payload
})

export const GetAllMedicalRecordsSuccess=(payload)=>({
    type:actionTypes.GET_ALL_MEDICAL_RECORDS_SUCCESS,
    payload
})

export const GetAllMedicalRecordsFail=(payload)=>({
    type:actionTypes.GET_ALL_MEDICAL_RECORDS_FAIL,
    payload:payload
})


export const GetUserMedicalRecordsStart=(payload)=>({
    type:actionTypes.GET_USER_MEDICAL_RECORDS_START,
    payload
})

export const GetUserMedicalRecordsSuccess=(payload)=>({
    type:actionTypes.GET_USER_MEDICAL_RECORDS_SUCCESS,
    payload
})

export const GetUserMedicalRecordsFail = (payload)=>({
    type:actionTypes.GET_USER_MEDICAL_RECORDS_FAIL,
    payload
})

export const CreateUserMedicalRecord=(formdata)=>({
    type:actionTypes.CREATE_MEDICAL_RECORD_START,
    payload:{formdata}
})

export const CreateMedicalRecordSuccess=(payload)=>({
    type:actionTypes.CREATE_MEDICAL_RECORD_SUCCESS,
    payload:payload
})

export const CreateMedicalRecordFail=(payload)=>({
    type:actionTypes.CREATE_MEDICAL_RECORD_FAIL,
    payload:payload
})