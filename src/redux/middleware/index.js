import {deviceMiddleWare} from "./DeviceInfo"
import {loginMiddleware} from "./Login"
import {LogoutProcess} from "./Logout"
import {api} from "./API"
import {forgotMidl} from "./ForgotPassword"
import {registrationMdl} from "./Registration"
import {resetPasswordMdl} from "./ResetPassword"
import { externalLoginMiddleware } from "./ExternalLogin"
import { userMiddleware } from "./User"
import { medicalProfileMiddleware } from './MedicalProfiles'
import { medicalRecordsMiddleware } from "./MedicalRecords"
import { familyMemberMiddleware } from "./FamilyMember"
export const MiddleWare=[
    ...deviceMiddleWare,
    ...loginMiddleware,
    ...externalLoginMiddleware,
    LogoutProcess,
    ...registrationMdl,
    ...forgotMidl,
    ...resetPasswordMdl,
    ...userMiddleware,
    ...medicalProfileMiddleware,
    ...medicalRecordsMiddleware,
    ...familyMemberMiddleware,
    api
]