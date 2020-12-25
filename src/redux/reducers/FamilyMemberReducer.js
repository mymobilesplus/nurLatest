import * as actionTypes from "../_ActionTypes"
import {updateObject} from "./utility"

const initialState={
    isAuthenticated:false,
    data:null,
    error:null
}


const familyMembers=(action,state)=>{
    console.log(action);
    return updateObject(state,{
        isAuthenticated:true,
        data:action.payload,
        error:null
    })
}


const FamilyMemberReducer =(state=initialState,action)=>{
    switch (action.type){
        case actionTypes.GET_ALL_FAMILY_MEMBERS_DATA_SUCCESS:return familyMembers(action,state);


        default:
            return state
    }
}

export default FamilyMemberReducer