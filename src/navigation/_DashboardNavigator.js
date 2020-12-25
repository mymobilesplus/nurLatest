import React, { Component, useState, useEffect } from 'react'
import { Text, View } from 'react-native'
import {NavigationContainer} from "@react-navigation/native"
import { createStackNavigator } from '@react-navigation/stack'
import {_MyMedicalRecords,_AddNewMember,_MedicalRecordForm,_MedicalRecordList} from "../screens"
import ClosingHeader from "../components/header/ClosingHeader"
import AsyncStorage from '@react-native-community/async-storage'
import {theme} from "../constants"
import DashboardStackHeader from "../components/header/DashboardStackHeader"
import BottomTabNavigator from "./BottomTabNavigator"
import langjson from "../constants/lang.json"
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen"
import _MyMedicalRecordsDetail from '../screens/My Medical Records/_MyMedicalrecordDetail'



const DashNavigator=createStackNavigator()

export default function DashboardNavigator(props){
  const [language, setLang] = useState(1)
        useEffect(()=>{
            AsyncStorage.getItem("lang").then(lang=>{
                if(lang!=null){
                    setLang(lang)
                }
            })
        })
    return(
        <DashNavigator.Navigator headerMode='float'>
        <DashNavigator.Screen
          component={_MedicalRecordList} name="MyMedicalRecords"       
          options={{ headerTitle: () => <DashboardStackHeader {...props}  title={langjson.lang[language-1].recordTitle} />,
            headerTitleContainerStyle:{left:0,top:0,bottom:0},
            // headerStyle:{height:hp},
        }}
          />
        <DashNavigator.Screen
          component={_MyMedicalRecords} name="AddFirstMedicalRecord"      
          options={{ headerTitle: (navigation) => <DashboardStackHeader {...props}   title="My Medical Records" />,
            headerTitleContainerStyle:{left:0,top:0,bottom:0}
        }}
          />
            <DashNavigator.Screen
          component={_AddNewMember} name="Add New Member"       
          options={{ headerTitle: () => <ClosingHeader {...props}  title="Create Medical Record" />,
            headerTitleContainerStyle:{left:0,top:0,bottom:0},
            // headerStyle:{height:60},
        }}
          />
         <DashNavigator.Screen
          component={_MedicalRecordForm} name="Medical Record Form"       
          options={{ headerTitle: () => <ClosingHeader {...props}  title="Edit Medical Record" />,
            headerTitleContainerStyle:{left:0,top:0,bottom:0},
            // headerStyle:{height:60},
        }}
          />
          <DashNavigator.Screen
          component={_MyMedicalRecordsDetail} name="My Medical Records Detail"       
          options={{ headerTitle: () => <ClosingHeader {...props}  title={"Record Detail"} />,
            headerTitleContainerStyle:{left:0,top:0,bottom:0},
            // headerStyle:{height:hp},
        }}
          />
          

        </DashNavigator.Navigator>
    )
}