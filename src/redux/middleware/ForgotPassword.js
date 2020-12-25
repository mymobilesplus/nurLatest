//-------------------------------------------------------------
import * as  actionTypes from "../_ActionTypes"
import * as API from "../../API_URI"
import * as RootNavigation from "../../navigation/RootNavigation"
import {showLoader,hideLoader} from "../actions/_Loader"
import {apiRequest} from "../actions/_API"

//----------------------------------------------------------------
import {forgotPasswordFail,forgotPasswordSuccess} from "../actions/_ForgotPassword"


export const forgotPassword=({dispatch})=>next=>action=>{
    next(action)

    if(action.type===actionTypes.FORGOT_PASSWORD_START){
            dispatch(showLoader())
            dispatch(apiRequest(
                'POST',API.FORGOT_PASSWORD,null,actionTypes.FORGOT_PASSWORD_SUCCESS,actionTypes.FORGOT_PASSWORD_FAIL,action.payload
            ))

    }
}


export const afterApiRequest=({dispatch})=>next=>action=>{
    next(action)

    if(action.type===actionTypes.FORGOT_PASSWORD_SUCCESS){
        dispatch(forgotPasswordSuccess(action.payload))
        if(action.payload && action.payload.returnStatus.returnCode===200){
            RootNavigation.navigate('VerificationCode')
            dispatch(hideLoader())
        }
    }

    else if(action.type===actionTypes.FORGOT_PASSWORD_FAIL){
        dispatch(forgotPasswordFail(action.payload))
        dispatch(hideLoader())

    }
}


export const forgotMidl=[forgotPassword,afterApiRequest]