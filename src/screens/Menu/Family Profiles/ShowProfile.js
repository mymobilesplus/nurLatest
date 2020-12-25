import React, { Component, useState, useEffect } from 'react';
import { Text,View,StyleSheet, FlatList, RefreshControl, BackHandler, StatusBar, ScrollView,TouchableOpacity, Image, ImageBackground } from 'react-native';

import {Styles} from "./Styles/Familyprofilestyle"
import { Container, Header, Title, Body, Content, Card,CardItem, Left, Icon, Right, Row, Col} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import {Button} from '@ui-kitten/components'
import MedicalProfileService from '../../../services/MedicalProfileService';
import { ActivityIndicator } from 'react-native-paper';
import { theme } from '../../../constants';

const FamilyMedicalprofile = (props) => {
    const [profile, setProfile] = useState({})
    const [loading, setLoading] = useState(true)
    const [familyMember, setFamilyMember] = useState('')
    useEffect(()=>{
        getProfile()
        console.log(props)
    }, [])
    const getProfile = async() => {
        setLoading(true)
        let member = props.route.params.familyMember;
        setFamilyMember(member)
        console.log(member)
        setLoading(false)
        // let user = JSON.parse(await AsyncStorage.getItem("loginData"))
        // let lang = JSON.parse(await AsyncStorage.getItem("lang"))
        // 
        // console.log(familyMember)
        // if(lang == null){
        //     lang = 1
        // }
        // let api = new MedicalProfileService()
        // let req = {
        //     userId: familyMember.userId,
        //     LanguageId: lang,
        //     token: user.accessToken,
        //     refreshToken: user.refreshToken
        // }
        // let res = await api.get(req).then(res=>res.json())
        // console.log(res)
        // setLoading(false)
        // if(res.medicalProfile.id == 0){
        //     setProfile(null)
        // }
        // else{
        //     setProfile(res.medicalProfile)
        // }

    }
    
    return (
        <Container style={{padding:10, justifyContent: 'center'}}>
            <Row style={{flex:0.1}}>
                <Col style={{flex:0.2, marginTop:10, marginLeft:10}}>
                    <Icon onPress={()=>props.navigation.goBack(null)} type="Feather" name="arrow-left" size={30} color={'#000'} />
                </Col>
                <Col>
                    <Text style={{fontSize:18, marginTop:10, textAlign:'left'}}>Profile</Text>
                </Col>
            </Row>
            {loading &&
                <ActivityIndicator size="large" color={theme.colors.primary} />
            }
            {!loading &&
                <Content style={{paddingHorizontal: 20}}>
                    <Row style={{marginTop:10, marginBottom:10,}}>
                        <Col>
                            <Row><Text>Name</Text></Row>
                            <Row><Text style={{fontSize:18,}}>{familyMember.name}</Text></Row>
                        </Col>
                    </Row>
                    <Row style={{marginTop:10}} >
                        <Col>
                            <Row><Text>Gender</Text></Row>
                            <Row><Text style={{fontSize:18,}}>{familyMember.gender}</Text></Row>
                        </Col>
                    </Row>
                    <Row style={{marginTop:10}} >
                        <Col>
                            <Row><Text>Blood Type</Text></Row>
                            <Row><Text style={{fontSize:18,}}>{familyMember.bloodType}</Text></Row>
                        </Col>
                    </Row>
                    <Row style={{marginTop:10}}>
                        <Col>
                            <Row><Text>Date of birth</Text></Row>
                            <Row><Text style={{fontSize:18,}}>{familyMember.dateOfBirth}</Text></Row>
                        </Col>
                    </Row>
                    <Row style={{marginTop:10}}>
                        <Col>
                            <Row><Text>Do you have any Medication Allergy?</Text></Row>
                            <Row><Text style={{fontSize:18,}}>{familyMember.medicationAllergy? "Yes": "No"}</Text></Row>
                        </Col>
                    </Row>
                    <Row style={{marginTop:10}}>
                        <Col>
                            <Row><Text>Do you have any Child?</Text></Row>
                            <Row><Text style={{fontSize:18,}}>{familyMember.isParent? "Yes": "No"}</Text></Row>
                        </Col>
                    </Row>
                </Content>
            }
            
        </Container>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginBottom: 50
    },
    itemText: {
        fontSize: 16, 
        color: '#000', 
    },
    itemText1: {
        fontSize: 13, 
        color: '#aaa',
    },

    itemText2: {
        fontSize: 16, 
        color: '#aa0114', 
    }, 
    itemText3: {
        fontSize: 16, 
        color: '#aaa', 
        textDecorationLine: 'line-through'
    },   
     backgroundTranslucent:{
        backgroundColor: "rgba(255,255,255, 0.4)"
    }
  });

export default FamilyMedicalprofile;
