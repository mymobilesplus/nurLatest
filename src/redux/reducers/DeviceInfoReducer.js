import * as actionTypes from "../_ActionTypes"
import {updateObject} from "./utility"

const initialState={
    _DEVICE_ID:null
}

const getDeviceInfo=(action,state)=>{
    return updateObject(state,{
        _DEVICE_ID:null

    })
}

const getDeviceInfoSuccess=(action,state)=>{
    return updateObject(state,{
        _DEVICE_ID:null
    })
}

const getDeviceInfoFail=(action,state)=>{
    return updateObject(state,{
        _DEVICE_ID:null

    })
}


const getDeviceInfoLast=(action,state)=>{
    return updateObject(state,{
        _DEVICE_ID:action.payload.data

    })
}

const DeviceInfoReducer =(state=initialState,action)=>{
    switch (action.type){
        case actionTypes.GET_DEVICE_INFO_START:return getDeviceInfo(action,state);
        case actionTypes.GET_DEVICE_INFO_SUCCESS:return getDeviceInfoSuccess(action,state);
        case actionTypes.GET_DEVICE_INFO_FAIL:return getDeviceInfoFail(action,state);
        case actionTypes.INSERT_DEVICE_INFO:return getDeviceInfoLast(action,state);


        default:
            return state
    }
}

export default DeviceInfoReducer