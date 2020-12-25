import React,{useEffect} from 'react'
import { View, Text,Image,TouchableOpacity,ImageBackground,KeyboardAvoidingView, ScrollView} from 'react-native'
import {Styles} from "./Styles/VacinnationslistStyle"
import {theme,images} from "../../../constants"
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from "react-native-responsive-screen"
import {Button,Input,IndexPath,Select,SelectGroup,SelectItem,} from '@ui-kitten/components'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import calendar from "../../../constants/calendar"
import {connect} from "react-redux"
import { Card, CardItem, Body, Row, Col, Container, Header, Left,Content, navigationOptions, Tabs, Tab, TabHeading, Title,ScrollableTab } from 'native-base';
import * as action from "../../../redux/actions/_Registration"
import {Formik} from "formik"

import Icon from 'react-native-vector-icons/Feather';
import MenuComponent from '../../Dashboard/components/Menucomponent'
import { MenuProvider } from 'react-native-popup-menu'
import Upcoming from './Upcoming'
const {icons,logo}=images

export default function vaccinationslist(props) {
    return (
      <KeyboardAwareScrollView style={{flex:1}}>
               <Row>
                <Col style={{flex:0.2, marginTop:10, marginLeft:10}}>
                <Icon onPress={()=>props.navigation.goBack(null)} name="arrow-left" size={30} color={'#000'} />
                </Col>
                <Col>
                <Text style={{fontSize:18, marginTop:10}}>Elie's Vaccinations</Text>
                </Col>
              </Row>

              <Tabs
           
           tabBarUnderlineStyle={{ backgroundColor: "blue"}}initialPage={0} tabBarBackgroundColor="#ddd" style={{margin:2,backgroundColor:'#ccc'}} >
              <Tab heading="4 Upcoming" tabStyle={{backgroundColor: '#fff'}} textStyle={{color: '#000',}} activeTabStyle={{backgroundColor:'#fff',}} activeTextStyle={{color: 'blue', fontWeight: 'normal'}}>
            <Upcoming/>
             </Tab>
             <Tab heading="5 Vaccinated" tabStyle={{backgroundColor: '#fff'}} textStyle={{color: '#000',}} activeTabStyle={{backgroundColor:'#fff',}} activeTextStyle={{color: 'blue', fontWeight: 'normal'}}>
             <Upcoming/>
             </Tab>
             <Tab heading="1 Overdue" tabStyle={{backgroundColor: '#fff'}} textStyle={{color: '#000',}} activeTabStyle={{backgroundColor:'#fff',}} activeTextStyle={{color: 'blue', fontWeight: 'normal'}}>
             <Upcoming/>
             </Tab>
             
           </Tabs>
      
        
        </KeyboardAwareScrollView>
    )
}
