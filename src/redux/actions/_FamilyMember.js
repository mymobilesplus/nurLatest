import * as actionTypes from "../_ActionTypes"

export const _GetFamilyMembersStart=(payload)=>({
    type:actionTypes.GET_ALL_FAMILY_MEMBERS_START,
    payload
})

export const GetFamilyMembersSuccess=(payload)=>({
    type:actionTypes.GET_ALL_FAMILY_MEMBERS_SUCCESS,
    payload
})

export const UpdateFamilyMemberList=(payload)=>({
    type:actionTypes.GET_ALL_FAMILY_MEMBERS_DATA_SUCCESS,
    payload:payload
})

export const GetFamilyMembersFail=(payload)=>({
    type:actionTypes.GET_ALL_FAMILY_MEMBERS_FAIL,
    payload:payload
})

export const CreateFamilyMemberStart=(formdata)=>({
    type:actionTypes.CREATE_FAMILY_MEMBER_START,
    payload:{formdata}
})

export const CreateFamilyMemberSuccess=(payload)=>({
    type:actionTypes.CREATE_FAMILY_MEMBER_SUCCESS,
    payload:payload
})

export const CreateFamilyMemberFail=(payload)=>({
    type:actionTypes.CREATE_FAMILY_MEMBER_FAIL,
    payload:payload
})