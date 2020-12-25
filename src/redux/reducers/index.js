import {combineReducers} from "redux"
import LoadingReducer from "./LoaderReducer"
import DeviceInfoReducer from "./DeviceInfoReducer"
import LoginReducer from "./LoginReducer"
import ForgotPasswordReducer from "./ForgotPasswordReducer"
import RegistrationReducer from "./RegistrationReducer"
import ResetPasswordReducer from "./ResetPasswordReducer"
import UserReducer from "./UserReducer"
import MedicalProfilesReducer from './MedicalProfileReducer'
import FamilyMemberReducer from './FamilyMemberReducer';
import MedicalRecordReducer from './MedicalRecordReducer'

export const Reducers = combineReducers({
LoadingReducer,
DeviceInfoReducer,
LoginReducer,
ForgotPasswordReducer,
RegistrationReducer,
ResetPasswordReducer,
UserReducer,
MedicalProfilesReducer,
FamilyMemberReducer,
MedicalRecordReducer
})