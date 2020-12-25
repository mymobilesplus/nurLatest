import * as actionTypes from "../_ActionTypes"


export const getDeviceInfo=()=>({
    type:actionTypes.GET_DEVICE_INFO_START
})

export const getDeviceInfoFail=()=>({
    type:actionTypes.GET_DEVICE_INFO_FAIL
})

export const getDeviceInfoSuccess=(data)=>({
    type:actionTypes.GET_DEVICE_INFO_SUCCESS,
    payload:{data}
})

export const getDeviceInfoLast=(data)=>({
    type:actionTypes.INSERT_DEVICE_INFO,
    payload:{
        data
    }
})