import React,{useEffect} from 'react'
import { View, Text,Image,TouchableOpacity,ImageBackground,KeyboardAvoidingView, ScrollView} from 'react-native'
import {Styles} from "./Styles/MyvaccinationStyle"
import {theme,images} from "../../../constants"
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from "react-native-responsive-screen"
import {Button,Input,IndexPath,Select,SelectGroup,SelectItem,} from '@ui-kitten/components'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import calendar from "../../../constants/calendar"
import {connect} from "react-redux"
import { Card, CardItem, Body, Row, Col, Container, Header, Left, Icon,Content, navigationOptions, Tabs, Tab, TabHeading, Title,ScrollableTab } from 'native-base';
import * as action from "../../../redux/actions/_Registration"
import {Formik} from "formik"
import Vaccinated from '../EveVaccination/Vaccinated';
import MenuComponent from '../../Dashboard/components/Menucomponent'
import { MenuProvider } from 'react-native-popup-menu'

export default function myvaccination(props) {
    return (
      <KeyboardAwareScrollView style={{flex:1}}>
          <MenuProvider >
              <Row style={{flex:0.2, marginTop:10, marginLeft:10}}>
                <Col style={{alignItems:'flex-start', flex:0.1, justifyContent:'center'}}>
                <Icon onPress={()=>props.navigation.goBack(null)} name="arrow-left" type="Feather" style={{fontSize:20,}} />
                </Col>
                <Col style={{alignItems:'center', flex:0.8}}>
                <Text style={Styles.mainHeading}>My Vaccinations</Text>
                </Col>
                <Col style={{alignItems:'flex-end', flex:0.1,justifyContent:'center', marginRight:10}}>
                <MenuComponent />
                </Col>
              </Row>
              <Tabs
           
           tabBarUnderlineStyle={{ backgroundColor: "blue"}}initialPage={0} style={{margin:2,}} >
             <Tab heading="Upcoming" tabStyle={{backgroundColor: '#fff'}} textStyle={{color: '#000',}} activeTabStyle={{backgroundColor:'#fff',}} activeTextStyle={{color: '#000', fontWeight: 'normal'}}>
              <Vaccinated/>
             </Tab>
             <Tab heading="Vaccinated" tabStyle={{backgroundColor: '#fff'}} textStyle={{color: '#000'}} activeTabStyle={{backgroundColor:'#fff',}} activeTextStyle={{color: '#000', fontWeight: 'normal'}} >
              <Vaccinated/>
             </Tab>
             <Tab heading="Ignored" tabStyle={{backgroundColor: '#fff'}} textStyle={{color: '#000'}} activeTabStyle={{backgroundColor:'#fff',}} activeTextStyle={{color: '#000', fontWeight: 'normal'}} >
              <Vaccinated/>
             </Tab>
           </Tabs>
            </MenuProvider>
      
        
        </KeyboardAwareScrollView>
    )
}
