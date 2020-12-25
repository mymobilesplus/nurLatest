import React, { Component } from 'react'
import { Text, View } from 'react-native'
import {NavigationContainer} from "@react-navigation/native"
import { createStackNavigator } from '@react-navigation/stack'
import ClosingHeader from "../components/header/ClosingHeader"
import {theme} from "../constants"
import DashboardStackHeader from "../components/header/DashboardStackHeader"
import BottomTabNavigator from "./BottomTabNavigator"
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen"
import _MyHealthdiary from '../screens/My Health Diary/_MyHealthdiary'
import { _AddNewHealthdiary, _AddNewMember } from '../screens/My Health Diary'
import { Right, Icon } from 'native-base'
import _Detail from '../screens/My Health Diary/_Detail'



const DashNavigator=createStackNavigator()

export default function MyHealthdiary(props){
    return(
        <DashNavigator.Navigator headerMode='float'>

        <DashNavigator.Screen
          component={_MyHealthdiary} name="AddFirstHealthdiary"      
          options={{ headerTitle: (navigation) => <DashboardStackHeader {...props}   title="My Health Diary" />,
            headerTitleContainerStyle:{left:0,top:0,bottom:0}
        }}
          />
          

          <DashNavigator.Screen
          component={_AddNewHealthdiary} name="AddNewHealthdiary"      
          options={{ headerTitle: (navigation) => <ClosingHeader {...props} title="Create Health Diary" />,
            headerTitleContainerStyle:{left:0,top:0,bottom:0}
          
        }}
          />      
          
          <DashNavigator.Screen
          component={_AddNewMember} name="AddNewMember"      
          options={{ headerTitle: (navigation) => <ClosingHeader {...props}  title="Create Health Diary" />,
            headerTitleContainerStyle:{left:0,top:0,bottom:0}
        }}
          />  
          <DashNavigator.Screen
            component={_Detail} name="HealthDiaryDetail"      
            options={{ headerTitle: (navigation) => <ClosingHeader {...props}  title="Health Diary Detail" />,
              headerTitleContainerStyle:{left:0,top:0,bottom:0}
          }}
            />
        </DashNavigator.Navigator>
    )
}