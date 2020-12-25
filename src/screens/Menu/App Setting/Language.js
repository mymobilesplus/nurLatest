import React, { useState, useEffect } from 'react'
import { View, Text,Image,TouchableOpacity, Switch} from 'react-native'
import {theme,images} from "../../../constants"
import {Styles} from "./Styles/Appsettingstyle"
import Icon from 'react-native-vector-icons/Feather';
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from "react-native-responsive-screen"
import {Button} from '@ui-kitten/components'
import {Row, Col, Container, Content} from "native-base"
import AsyncStorage from '@react-native-community/async-storage';
import { I18nManager } from 'react-native';
// import { NativeModules } from "react-native";
import RNRestart from 'react-native-restart';





export default function Language(props) {
    const[lang, setLang] = useState(1)

    useEffect(()=>{
        getLanguage()
    }, [])

    const getLanguage=()=>{
        AsyncStorage.getItem("lang").then(lang=>{
                if(lang!=null)
                        setLang(JSON.parse(lang))
        })
    }
    const toggleSwitch = (value) => {
        //onValueChange of the switch this function will be called
        AsyncStorage.setItem("lang", JSON.stringify(value));
        setLang(value)
        if(value == 2){
                I18nManager.forceRTL(true);
                // NativeModules.reload();
                RNRestart.Restart();
        } else {
                I18nManager.forceRTL(false);
                // NativeModules.DevSettings.reload();
                RNRestart.Restart();
        }
        //state changes according to switch
        //which will result in re-render the text
     }
    
    

    return (

        <Container>
                <Content>
                        <Row>
                                <Col style={{flex:0.2, marginTop:10, marginLeft:10}}>
                                        <Icon onPress={()=>props.navigation.goBack(null)} name="arrow-left" size={30} color={'#000'} />
                                </Col>
                                <Col>
                                        <Text style={{fontSize:18, marginTop:10}}>Languages</Text>
                                </Col>
                        </Row>
                        <Row style={{borderTopWidth:1, borderBottomWidth:1, borderTopColor:'#ddd', borderBottomColor:'#ddd', paddingTop:10, paddingBottom:10}}>
                                <Col style={{alignItems:'flex-start', justifyContent:'center', paddingLeft:10}}><Text>English</Text></Col>
                                <Col style={{alignItems:'flex-end', justifyContent:'center', paddingRight:10}}>
                                        <Switch value={lang==1} onValueChange={()=>toggleSwitch(1)} />
                                </Col>
                        </Row>
                        <Row style={{borderTopWidth:1, borderBottomWidth:1, borderTopColor:'#ddd', borderBottomColor:'#ddd', paddingTop:10, paddingBottom:10}}>
                                <Col style={{alignItems:'flex-start', justifyContent:'center', paddingLeft:10}}><Text>Arabic</Text></Col>
                                <Col style={{alignItems:'flex-end', justifyContent:'center', paddingRight:10}}>
                                        <Switch value={lang==2} onValueChange={()=>toggleSwitch(2)} />
                                </Col>
                        </Row>
                        
                </Content>
        </Container>
          
    )
}
