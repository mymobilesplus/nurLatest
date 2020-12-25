import * as  actionTypes from "../_ActionTypes"
import {showLoader,hideLoader} from "../actions/_Loader"
import {LogoutFail,LogoutSuccess,removeAccess} from "../actions/_Login"
import AsyncStorage from '@react-native-community/async-storage';
import * as RootNavigation from "../../navigation/RootNavigation"


export const LogoutProcess=({dispatch})=>next=>action=>{
    next(action)

    if(action.type===actionTypes.LOGOUT_START){
        dispatch(showLoader())
        dispatch(removeAccess())
        removeAccessToken(dispatch)

    }
}


export const removeAccessToken=async(dispatch)=>{
    try{
        await AsyncStorage.removeItem('loginData')
        dispatch(LogoutSuccess())
        RootNavigation.navigate('Login')
        dispatch(hideLoader())
    }
    catch(e){
        dispatch(LogoutFail())
    }
}



// export const logoutMidl=[LogoutProcess]