import React, { Component, useState, useEffect } from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import {Home,Menu} from "../screens"
import {theme} from "../constants"
import Icon from "react-native-vector-icons/AntDesign"
import Fontisto from "react-native-vector-icons/Fontisto"
import Feather from "react-native-vector-icons/Feather"
import Finddoctor from '../screens/Find Doctor/Finddoctor'
import langjson from "../constants/lang.json"
import AsyncStorage from '@react-native-community/async-storage'

const BottomTabs = createMaterialBottomTabNavigator();


export default function BottomTabNavigator(){
  const [language, setLang] = useState(1)
  useEffect(()=>{
      AsyncStorage.getItem("lang").then(lang=>{
          if(lang!==null){
              setLang(lang)
          }
      })
  })
    return(
      <BottomTabs.Navigator
      // style={{backgroundColor:theme.colors.background,borderWidth:0,}}
      // shifting={true}
      barStyle={{backgroundColor:theme.colors.background,
        borderWidth:0,
        // paddingBottom:5          
      }}
      
      activeColor={theme.colors.primary}
      >
          <BottomTabs.Screen
          name="home"
          component={Home}
          options={{
            title: langjson.lang[language-1].Home,
              tabBarIcon:({color})=>(
                <Icon name={'home'} style={[{color:color}]} size={25}  />
              ),
          }}
          />

        <BottomTabs.Screen
          name="Find Doctors"
          component={Finddoctor}
          options={{
            title: langjson.lang[language-1].finddoctor,
            tabBarIcon:({color})=>(
              <Fontisto name={'search'} style={[{color:color}]} size={25}  />
            ),
            
        }}
          />

        <BottomTabs.Screen
          name="Menu"
          component={Menu}
          options={{
            title: langjson.lang[language-1].menu,
            tabBarIcon:({color})=>(
              <Feather name={'menu'} style={[{color:color}]} size={25}  />
            ),
        }}
          />

      </BottomTabs.Navigator>
    )
}