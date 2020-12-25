import React, { Component } from 'react'
import { Text, View } from 'react-native'
import {NavigationContainer} from "@react-navigation/native"
import { createStackNavigator } from '@react-navigation/stack'
import ClosingHeader from "../components/header/ClosingHeader"
import {theme} from "../constants"
import DashboardStackHeader from "../components/header/DashboardStackHeader"
import BottomTabNavigator from "./BottomTabNavigator"
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen"
import _MyMedicalReminder from '../screens/My Medical Reminder/_MyMedicalReminder'
import _AddNewReminder from '../screens/My Medical Reminder/_AddNewReminder'
import _MedicalReminderList from '../screens/My Medical Reminder/_MedicalReminderList'
import _AddNewMember from '../screens/My Medical Reminder/_AddNewMember'



const DashNavigator=createStackNavigator()

export default function MyReminder(props){
    return(
        <DashNavigator.Navigator headerMode='float'>
        <DashNavigator.Screen
          component={_MedicalReminderList} name="My Medical Remiders"       
          options={{ headerTitle: () => <DashboardStackHeader {...props}  title="My Medical Reminders" />,
            headerTitleContainerStyle:{left:0,top:0,bottom:0},
            // headerStyle:{height:hp},
          }}
          />
        <DashNavigator.Screen
          component={_MyMedicalReminder} name="AddFirstMedicalReminder"      
          options={{ headerTitle: (navigation) => <DashboardStackHeader {...props}   title="My Medical Reminder" />,
            headerTitleContainerStyle:{left:0,top:0,bottom:0}
        }}
          />
          <DashNavigator.Screen
          component={_AddNewReminder} name="AddNewReminder"      
          options={{ headerTitle: (navigation) => <ClosingHeader {...props} title="Create Medical Reminder" />,
            headerTitleContainerStyle:{left:0,top:0,bottom:0}
        }}
          />
            <DashNavigator.Screen
          component={_AddNewMember} name="Select Family Member"       
          options={{ headerTitle: () => <ClosingHeader {...props}  title="Select Family Member" />,
            headerTitleContainerStyle:{left:0,top:0,bottom:0},
            // headerStyle:{height:60},
        }}
          />
         {/* <DashNavigator.Screen
          component={_MedicalReminderForm} name="Medical Reminder Form"       
          options={{ headerTitle: () => <ClosingHeader {...props}  title="Create Medical Reminder" />,
            headerTitleContainerStyle:{left:0,top:0,bottom:0},
            // headerStyle:{height:60},
        }}
          /> */}
          

        </DashNavigator.Navigator>
    )
}