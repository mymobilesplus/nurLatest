import React,{useEffect, useReducer} from 'react'
import { View, Text,Image,TouchableOpacity,ImageBackground,KeyboardAvoidingView, ScrollView} from 'react-native'
import {Styles} from "./Styles/SavedarticleStyles"
import {theme,images} from "../../constants"
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from "react-native-responsive-screen"
import {Button,Input,IndexPath,Select,SelectGroup,SelectItem,} from '@ui-kitten/components'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {connect} from "react-redux"
import {Row, Col, Container, Content, Icon} from "native-base"
import {Formik} from "formik"
import { Searchbar } from 'react-native-paper';

import { icons, doctor } from '../../constants/images';

export default function Savedarticle(props) {
    return (
      <KeyboardAwareScrollView style={{flex:1}}>
          <View >
         
              <Row>
                <Col style={{flex:0.2, marginTop:10, marginLeft:10}}>
                <Icon onPress={()=>props.navigation.goBack(null)} name="arrow-left" type="FontAwesome" style={{fontSize:20, color:'#000'}} />
                </Col>
                <Col>
                <Text style={Styles.mainHeading}>Saved Article</Text>
                </Col>
              </Row>
              
            </View>
              <Container>
                  <Content>
                        <Row>
                            <Col>
                            <Searchbar placeholder="Search by Doctor name....." icon source={icons.search} iconColor="#aaa"/>
                            </Col>
                        </Row>
                        <View style={{borderWidth:1, borderColor:'#ccc', margin:10, padding:10}}>
                        <Row >
                            <Col style={{backgroundColor:'green', height:20, width:80, marginLeft:10, paddingLeft:10, paddingRight:10, justifyContent:'center'}}>
                            <Text>Nutrition</Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Text style={{fontSize:18,marginTop:10}}>
                                    The 25 Best Diet Tips to lose Weight and improve health
                                </Text>
                            </Col>
                            <Col style={{alignItems:'flex-end'}}>
                            <Image source={icons.AddPhoto}  style={Styles.addPhoto}  />
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{flex:0.1}}>
                                <Text>By</Text>
                            </Col>
                            <Col style={{alignItems:'flex-start', flex:0.4}}>
                                <Text style={{color:'blue'}}>Elie Tannous</Text>
                            </Col>
                            <Col style={{flex:0.4}}>
                                <Text>3 Weeks ago</Text>
                            </Col>
                            <Col  style={{flex:0.1, alignItems:'flex-end'}}>
                              <Icon name="bookmark" type="FontAwesome" style={{fontSize:20, color:'#000'}}/>
                            </Col>

                        </Row>
                        </View>
                  
           
                    </Content>
              </Container>
      
        
        </KeyboardAwareScrollView>
    )
}
