import React, { Component } from 'react'
import { Text, View } from 'react-native'
import {NavigationContainer} from "@react-navigation/native"
import { createStackNavigator } from '@react-navigation/stack'
import ClosingHeader from "../components/header/ClosingHeader"
import {theme} from "../constants"
import CommunityStackHeader from "../components/header/CommunityStackHeader"
import BottomTabNavigator from "./BottomTabNavigator"
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen"
import _MyHealthdiary from '../screens/My Health Diary/_MyHealthdiary'
import { _AddNewHealthdiary, _AddNewMember } from '../screens/My Health Diary'
import { Right, Icon } from 'native-base'
import _Communitymain from '../screens/Community/_Communitymain'
import { Filterbytopic, CommunityDetail, Publisher } from '../screens/Community'
import AddNewArticle from '../screens/Community/AddNewArticle'
import CommunityArticlesByTopic from '../screens/Community/CommunityArticlesByTopic'
import CommentsScreen from '../screens/Community/CommentsScreen'



const DashNavigator=createStackNavigator()

export default function Community(props){
    return(
        <DashNavigator.Navigator headerMode='float' initialRouteName="Communities">

        <DashNavigator.Screen
          component={_Communitymain} name="Communities"      
          options={{ headerTitle: () => <CommunityStackHeader {...props}   title="Community" />,
            headerTitleContainerStyle:{left:0,top:0,bottom:0}
        }}
          />

          <DashNavigator.Screen
            component={CommunityDetail} name="CommunityDetail"      
            options={{ headerTitle: (navigation) => <CommunityStackHeader {...props}   title="Community" />,
              headerTitleContainerStyle:{left:0,top:0,bottom:0}
          }}
            /> 
          
          <DashNavigator.Screen
            component={CommentsScreen} name="Comments"      
            options={{ headerTitle: (navigation) => <CommunityStackHeader {...props}   title="Community" />,
              headerTitleContainerStyle:{left:0,top:0,bottom:0}
          }}
            />

          <DashNavigator.Screen
            component={Publisher} name="Publisher"      
            options={{ headerTitle: (navigation) => <CommunityStackHeader {...props}   title="Published By" />,
              headerTitleContainerStyle:{left:0,top:0,bottom:0}
          }}
            />
          
    
          
          <DashNavigator.Screen
          component={Filterbytopic} name="Filterbytopic"      
          options={{ headerTitle: (navigation) => <CommunityStackHeader {...props}  title="Filter By Topic" />,
            headerTitleContainerStyle:{left:0,top:0,bottom:0}
        }}
          /> 

          <DashNavigator.Screen
          component={CommunityArticlesByTopic} name="CommunitiesArticleByTopic"      
          options={{ headerTitle: (navigation) => <CommunityStackHeader {...props}  title="Filter By Topic" />,
            headerTitleContainerStyle:{left:0,top:0,bottom:0}
        }}
          />    

          <DashNavigator.Screen
            component={AddNewArticle} name="CreateNewArticle"      
            options={{ headerTitle: (navigation) => <ClosingHeader {...props}  title="Create New Article" />,
              headerTitleContainerStyle:{left:0,top:0,bottom:0}
          }}
          />         

        </DashNavigator.Navigator>
    )
}