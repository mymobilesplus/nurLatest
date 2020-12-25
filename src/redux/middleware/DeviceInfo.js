import * as  actionTypes from "../_ActionTypes"
import AsyncStorage from '@react-native-community/async-storage';
import { showLoader,hideLoader } from "../actions/_Loader"
import {getDeviceInfoFail,getDeviceInfoSuccess, getDeviceInfoLast} from "../actions/DeviceInfo"
import { getDeviceId,getAndroidId,getUniqueId } from 'react-native-device-info';


export const DeviceInfo =({dispatch})=>next=>action=>{
    next(action);

    if(action.type===actionTypes.GET_DEVICE_INFO_START){
        dispatch(showLoader());
        console.log("Device ID: ",getUniqueId())
        let DEVICEID=getUniqueId()
        if(DEVICEID!=null){
            dispatch(getDeviceInfoSuccess())

        }
    }

}


export const SaveDeviceInfo=({dispatch})=>next=>action=>{
    next(action);

    if(action.type===actionTypes.GET_DEVICE_INFO_SUCCESS){
            dispatch(hideLoader());
           saveAsync(action.payload.data,dispatch)
    }
}



const saveAsync=async(data,dispatch)=>{
    let DEVICEID=getUniqueId()

    try{
      const ID= await AsyncStorage.getItem('_DEVICE_ID_').then(res=>{
           console.log("DeVIIII: ",res)
            if(res==null){
                dispatch(getDeviceInfoFail())
                try{
                   AsyncStorage.setItem('_DEVICE_ID_',DEVICEID)
                    console.log("SAVED DEVICE ID: ",DEVICEID)
                }
                catch(err){
                    console.log("DEVICE ID ERROR: ",err)
                }
            }
            else{
                dispatch(getDeviceInfoLast(res))
            }
        })
    }catch(e){
        dispatch(getDeviceInfoFail())
        console.log("DEVICE ID NOT AVAILABLE")
    }
}



export const deviceMiddleWare=[DeviceInfo,SaveDeviceInfo]