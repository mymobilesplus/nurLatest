import React, { useState, useEffect } from 'react'
import { View, Text,Image,TouchableOpacity, Switch} from 'react-native'
import {theme,images} from "../../../constants"
import {Styles} from "./Styles/Appsettingstyle"
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from "react-native-responsive-screen"
import {Button} from '@ui-kitten/components'
import {Row, Col, Container, Content, Icon} from "native-base"
import AsyncStorage from '@react-native-community/async-storage'


export default function Appsetting(props) {
        const[notifications, setNotifications] = useState(true)

        useEffect(()=>{
                getNotification()
        })
        const getNotification = async() =>{
                let notification = await AsyncStorage.getItem("notification")
                if(notification != null){
                        notification = JSON.parse(notification)
                        setNotifications(notification)
                }
        }
    const toggleSwitch = async(value) => {
        //onValueChange of the switch this function will be called
        setNotifications(value)
        console.log(value)
        await AsyncStorage.setItem("notification", JSON.stringify(value))
        //state changes according to switch
        //which will result in re-render the text
     }
    
    

    return (

        <Container>
                <Content>
                        <Row style={{flex:0.2, marginTop:10, marginLeft:10}}>
                                <Col style={{alignItems:'flex-start', flex:0.1, justifyContent:'center'}}>
                                        <Icon onPress={()=>props.navigation.goBack(null)} name="arrow-left" type="FontAwesome" style={{fontSize:20,}} />
                                </Col>
                                <Col style={{alignItems:'center', flex:0.8}}>
                                <Text style={Styles.mainHeading}>App Settings</Text>
                                </Col>
                        </Row>
                        <Row style={{borderTopWidth:1, borderBottomWidth:1, borderTopColor:'#ddd', borderBottomColor:'#ddd', paddingTop:10, paddingBottom:10}}>
                                <Col style={{alignItems:'flex-start', justifyContent:'center', paddingLeft:10}}><Text>Allow Notifications</Text></Col>
                                <Col style={{alignItems:'flex-end', justifyContent:'center', paddingRight:10}}>
                                        <Switch onValueChange={toggleSwitch} value={notifications} />
                                </Col>
                        </Row>
                        <TouchableOpacity  onPress={()=>props.navigation.navigate('ReminderSetting')}>
                                <Row style={{ borderBottomWidth:1, borderTopColor:'#ddd', borderBottomColor:'#ddd',paddingTop:10, paddingBottom:10}}>
                                        <Col style={{alignItems:'flex-start', justifyContent:'center', paddingLeft:10}}><Text>Reminders Settings</Text></Col>
                                        <Col style={{alignItems:'flex-end', justifyContent:'center', paddingRight:10}}><Icon name="settings" type="Feather" size={20} color={'#000'} /></Col>
                                </Row>
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={()=>props.navigation.navigate('Language')}>
                                <Row style={{ borderBottomWidth:1, borderTopColor:'#ddd', borderBottomColor:'#ddd',paddingTop:10, paddingBottom:10}}>
                                        <Col style={{alignItems:'flex-start', justifyContent:'center', paddingLeft:10}}><Text>Language</Text></Col>
                                                
                                </Row>
                        </TouchableOpacity>
                </Content>
        </Container>
          
    )
}
