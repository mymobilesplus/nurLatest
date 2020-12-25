import React, { Component } from 'react'
import {createStackNavigator} from "@react-navigation/stack"
import {
    Welcome,
    LoginOption,
    Login,
    ResetPassword,
    VerificationCode,
    NewPassword,
    AddPhoto,
    CreateAccount,
    _MedicalRecordList
} from "../screens/index"
import Camera from "../components/camera/Camera"
import BottomTabNavigator from "./BottomTabNavigator"
import TopNavigator from "./TopNavigator"
import _DashboardNavigator from "./_DashboardNavigator"
import MyReminder from './_MyReminder'
import MyHeathdiary from './_MyHealthdiary'
import Community from './_Community'
import Myaccount from '../screens/Menu/My Account/Myaccount'
import Aboutus from '../screens/Menu/Aboutus/Aboutus'
import Familyprofile from '../screens/Menu/Family Profiles/Familyprofile'
import Appsetting from '../screens/Menu/App Setting/Appsetting'
import Notification from '../screens/Notifications/Notification'
import Myvaccination from '../screens/Menu/Myvaccinations/Myvaccination'
import Clock from '../screens/Clock/Clock';
// import Medicalprofile from '../screens/Menu/Medical Profile/Medicalprofile'
import main from '../screens/Menu/Medical Profile/Main'
import vaccinationslist from '../screens/Menu/Vaccinations List/Vaccinationslist'
import calendar from '../constants/calendar'
import opencalendar from '../screens/My Medical Reminder/Opencalender'
import Alldoctorsearch from '../screens/Search/Alldoctorsearch'
import Doctorsearch from '../screens/Search/Doctorsearch'
import Doctor_search from '../screens/Search/Doctor_search'
import Doctordetail from '../screens/Search/Doctordetail'
import Contact from '../screens/Contact/Contact'
import Evevaccination from '../screens/Menu/EveVaccination/EveVacccination'
import Savedarticle from '../screens/Article/Savedarticle'
import Addarticle from '../screens/Article/Addarticle'
import Comment from '../screens/Article/Comment'
import openclock from '../screens/My Medical Reminder/Openclock'
import SendFeedback from '../screens/Menu/Send Feedback/SendFeedback'
import ReminderSetting from '../screens/Menu/App Setting/RemiderSetting'
import AddNewMember from '../screens/Registration/AddNewMember'
import Languagae from '../screens/Menu/App Setting/Language'
import searchdoctor from '../screens/Find Doctor/SearchDoctor'
import MyDoctors from '../screens/Menu/Doctor/MyDoctors'
import SavedArticles from '../screens/Menu/Articles/SavedArticles'
import ShareApp from '../screens/Menu/Share'
import _Detail from '../screens/My Health Diary/_Detail'
import FamilyVaccination from '../screens/Menu/EveVaccination/FamilyVaccination'
import FamilyMedicalProfile from '../screens/Menu/Family Profiles/ShowProfile'
import CreateMedicalForm from '../screens/Menu/Medical Profile/CreateMedicalProfile'
import AddVaccination from '../screens/Menu/EveVaccination/AddVaccination'
import SplashScreen from '../screens/Splash/SplashScreen'
// import SplashScreen from 'react-native-splash-screen'
const Stack=createStackNavigator()



export default function createHomeStack(){
    return(
        <Stack.Navigator screenOptions={{
            headerShown: false
          }} headerMode="none" >
            <Stack.Screen  name="Splash" component={SplashScreen}  />
            <Stack.Screen  name="Welcome" component={Welcome}  />
            <Stack.Screen  name="LoginOption" component={LoginOption}  />
            <Stack.Screen  name="Login" component={Login}  />
            <Stack.Screen  name="ForgetPassword" component={ResetPassword}  />
            <Stack.Screen  name="VerificationCode" component={VerificationCode}  />
            <Stack.Screen  name="NewPassword" component={NewPassword}  />
            <Stack.Screen  name="Camera" component={Camera}  />
            <Stack.Screen  name="Bottom Tabs" component={BottomTabNavigator} />
            <Stack.Screen  name="Top Tab" component={TopNavigator} />
            <Stack.Screen  name="DashboardStack" component={_DashboardNavigator} />
            <Stack.Screen  name="AddPhotoRegistration" component={AddPhoto} />
            <Stack.Screen  name="AddNewMember" component={AddNewMember}/>
            <Stack.Screen  name="CreateAccount" component={CreateAccount} />
            <Stack.Screen  name="MyReminder" component={MyReminder} />
            <Stack.Screen  name="MyHeathdiary" component={MyHeathdiary}/>
            <Stack.Screen  name="Community" component={Community}/>
            <Stack.Screen  name="myaccount" key="myaccount" component={Myaccount} />
            <Stack.Screen  name="aboutus" component={Aboutus} />
            <Stack.Screen  name="familyprofile" component={Familyprofile} />
            <Stack.Screen  name="appsetting" component={Appsetting} />
            <Stack.Screen  name="notification" component={Notification} />
            <Stack.Screen  name="clock" component={Clock} />
            <Stack.Screen  name="myvaccination" component={Myvaccination} />
            <Stack.Screen  name="medicalprofile" component={main}/>
            <Stack.Screen  name="CreateMedicalProfile" component={CreateMedicalForm}/>
            <Stack.Screen  name="vaccinationslist" component={vaccinationslist}/>
            <Stack.Screen  name="opencalendar" component={opencalendar}/>
            <Stack.Screen  name="openclock" component={openclock}/>
            <Stack.Screen  name="doctorsearch" component={Doctorsearch}/>
            <Stack.Screen  name="doctor_search" component={Doctor_search}/>
            <Stack.Screen  name="alldoctorsearch" component={Alldoctorsearch}/>
            <Stack.Screen  name="doctordetail" component={Doctordetail}/>
            <Stack.Screen  name="Contact" component={Contact}/>
            <Stack.Screen  name="Evevaccination" component={Evevaccination}/>
            <Stack.Screen  name="CreateVaccination" component={AddVaccination}/>
            <Stack.Screen  name="savedarticle"  component={Savedarticle}/>
            <Stack.Screen  name="addarticle" component={Addarticle}/>
            <Stack.Screen  name="SendFeedback" component={SendFeedback}/>
            <Stack.Screen  name="ReminderSetting" component={ReminderSetting}/>
            <Stack.Screen  name="comment" component={Comment}/>
            <Stack.Screen  name="Language" component={Languagae}/>
            <Stack.Screen  name="MyMedicalRecords" component={_MedicalRecordList}/>
            <Stack.Screen  name="MyDoctors" component={MyDoctors}/>
            <Stack.Screen  name="savedArticles" component={SavedArticles}/>
            <Stack.Screen  name="Share" component={ShareApp}/>
            <Stack.Screen  name="FamilyVaccinations" component={FamilyVaccination}/>
            <Stack.Screen  name="FamilyMedicalProfile" component={FamilyMedicalProfile}/>
        </Stack.Navigator>
    )
}