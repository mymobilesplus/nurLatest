import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import {Home} from "../screens"
import {theme} from "../constants"
import Header from "../components/header/Header"
import BottomTabNavigator from "./BottomTabNavigator"
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen"

const TopStack=createStackNavigator()


export default function TopNavigator(){
    return(
        <TopStack.Navigator
        headerMode="none"
        screenOptions={{
            header:({scene,previous,navigation})=>{
                return(
                    <Header/>
                )
            },
            headerStyle:{
                height:60,
            },
            }}
        >
            <TopStack.Screen
            name="Home"
            component={BottomTabNavigator}
            />
        </TopStack.Navigator>
    )
}