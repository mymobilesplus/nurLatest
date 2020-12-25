import * as actionTypes from "../_ActionTypes"
import {updateObject} from "./utility"

const initialState={
    loading:false,
}


const showLoader=(action,state)=>{
    return updateObject(state,{
        loading:true
    })
}

const hideLoader=(action,state)=>{
    return updateObject(state,{
        loading:false
    })
}


const LoadingReducer =(state=initialState,action)=>{
    switch (action.type){
        case actionTypes.SHOW_LOADER:return showLoader(action,state);
        case actionTypes.HIDE_LOADER:return hideLoader(action,state);


        default:
            return state
    }
}

export default LoadingReducer