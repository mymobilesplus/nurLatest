import React, { useEffect, useState } from 'react'
import { View, Text,TouchableOpacity, Modal, StyleSheet} from 'react-native'
import {Styles} from "./Styles/Doctorstyles"
import {theme} from "../../constants"
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from "react-native-responsive-screen"
import {Layout, Popover} from '@ui-kitten/components'
import {Row, Col, Container, Content, Icon, Input} from "native-base"
import Entypo from "react-native-vector-icons/Entypo"
import { Translator } from '../../constants/translator'
import { I18nManager } from 'react-native'


export default function Doctordetail(props) {

    const [doctor, setDoctor] = useState({})
    const [visible, setVisible] = React.useState(0);
    const [showReport, setShowReport] = useState(false)
    const [message, setMessage] = useState("")

    useEffect(()=>{
        setDoctor(props.route.params.doctor)
        // alert(JSON.stringify(props.route.params.doctor))
    }, [])

const menuIcon = (id) => (
    <TouchableOpacity onPress={() => setVisible(id)} style={{height:30,width:30,alignItems:"flex-end",paddingLeft:10}}>
        <Entypo name="dots-three-vertical" size={16} color={theme.colors.dark}  />
    </TouchableOpacity>
)

const renderDrowMenu = (id) => {
    return (
        <Layout level='1'>
            <Popover
                backdropStyle={Styles.backdrop}
                visible={visible == id}
                anchor={() => menuIcon(id)}
                onBackdropPress={() => setVisible(false)}
            >
                <Layout style={{ marginRight: 50 }}>
                    <View style={{ width: 200 }}>
                        <Text onPress={() => { setVisible(false); props.route.params.saveDoctor({ id }) }}
                            style={{ padding: 10, paddingHorizontal: 20, fontSize: 16, color: '#596377'}}>
                            <Icon name="floppy-o" type="FontAwesome" style={{ fontSize: 14 }}></Icon> {' '}
                                Save
                            </Text>
                        <View style={{ height: 0.5, width: 250, backgroundColor: "#8A92A3" }}></View>
                        <Text onPress={() => { props.route.params.shareDoctor({ id }) }}
                            style={{ padding: 10, paddingHorizontal: 20, fontSize: 16, color: '#596377' }}>
                            <Icon name="share-2" type="Feather" style={{ fontSize: 14 }}></Icon> {' '}
                                Share
                            </Text>
                            <View style={{ height: 0.5, width: 250, backgroundColor: "#8A92A3" }}></View>
                            <Text onPress={() => { setShowReport(true) }}
                            style={{ padding: 10, paddingHorizontal: 20, fontSize: 16, color: '#596377' }}>
                            <Icon name="zap" type="Feather" style={{ fontSize: 14 }}></Icon> {' '}
                                Report
                            </Text>
                    </View>
                </Layout>
            </Popover>
        </Layout>
  )
}
    console.warn(doctor)
    return (
    <Container >
        <Content>
        <View style={{padding:10}}>
        <Row>
            <View style={{marginVertical:10, marginLeft:10,}}>
            <Icon onPress={()=>props.navigation.goBack(null)} name={I18nManager.isRTL ? 'arrow-right' : 'arrow-left'} type="Feather" style={{fontSize:32, color: '#000'}} />
            </View>
        </Row>
        <View style={{paddingHorizontal:25}}>
        <View style={{paddingVertical:22}}>
        <Row style={{borderBottomColor:'#aaa', borderBottomWidth:1}}>
            <Col>
                <Text style={{ fontSize:20, lineHeight:27, textAlign : 'left'}}>Dr. {doctor.firstname} {doctor.lastname}</Text>
                    <Text style={{fontSize:18, color:"#596377", marginBottom:20}}>{props.route.params.description}</Text>
            </Col >
            <Col style={{flex:0.1}}>
                <View style={{ justifyContent: 'center', alignItems: 'flex-end'}}>
                    <TouchableOpacity>{renderDrowMenu(doctor.id)}</TouchableOpacity>
                </View>
            </Col>
        </Row>
        </View>
        {
            (doctor.streetLine1!=null || doctor.streetNumName!= null || doctor.village!=null) ? 
            <View style={{paddingVertical:22, paddingTop:22}}>
            <Row>
                <Col style={{ flex:0.1}}>
                    <Icon name="map-marker" type="FontAwesome" style={{fontSize:20, color: '#044DC1'}}/>                        
                </Col>
                <Col style={{flex:0.9, alignItems:'flex-start'}}>
                    <Text style={{color:"#4B4F56", fontsize:16}} >Clinic</Text>
                </Col>
            </Row>
            <Row>
                <Col style={{marginLeft:30}}>
                    <Text style={{color:"#4B4F56", fontsize:16}} >{doctor.streetLine1}, {doctor.streetNumName}, {doctor.village}</Text>
                </Col>
            </Row>
        </View>
        :
        null
        }
        
        {
            doctor.mobile=="" || doctor.mobile==null  || doctor.mobile == undefined ? 
            null
            :
            <View style={{paddingVertical:22}}>
            <Row>
                <Col style={{ flex:0.1}}>
                    <Icon name="phone" type="FontAwesome" style={{fontSize:20, color: '#044DC1'}}/>                        
                </Col>
                <Col style={{flex:0.9, alignItems:'flex-start'}}>
                <Text style={{color:"#4B4F56", fontsize:16, textAlign:'left'}} >{doctor.mobile}</Text></Col>
            </Row>
            <Row>
                <Col style={{marginLeft:30}}>
                    <Text style={{color:"#4B4F56", fontsize:16, textAlign : 'left'}} >{Translator('phone')}</Text>
                </Col>
                </Row>
            </View>
        }
        {
            doctor.clinicPhone==null || doctor.clinicPhone=="" || doctor.clinicPhone==undefined ? 
            null : 
            <View style={{paddingVertical:22}}>
            <Row>
                <Col style={{ flex:0.1}}>
                    <Icon name="phone" type="FontAwesome" style={{fontSize:20, color: '#044DC1'}}/>                        
                </Col>
                <Col style={{flex:0.9, alignItems:'flex-start'}}>
                <Text style={{color:"#4B4F56", fontsize:16}} >{doctor.clinicPhone}</Text></Col>
            </Row>
            <Row>
                <Col style={{marginLeft:30}}>
                    <Text style={{color:"#4B4F56", fontsize:16, textAlign : 'left'}} >{Translator('clinic')}</Text>
                </Col>
            </Row>
        </View>
        }
        
        {
            doctor.emailAddress==null || doctor.emailAddress=="" || doctor.emailAddress == undefined ? 
            null : 
            <View style={{paddingVertical:22}}>
            <Row>
                <Col style={{ flex:0.1}}>
                    <Icon name="envelope" type="FontAwesome" style={{fontSize:20, color: '#044DC1'}}/>                        
                </Col>
                <Col style={{flex:0.9, alignItems:'flex-start'}}>
                <Text style={{color:"#4B4F56", fontsize:16}} >{doctor.emailAddress}</Text></Col>
            </Row>
            <Row>
                <Col style={{marginLeft:30}}>
                    <Text style={{color:"#4B4F56", fontsize:16, textAlign : 'left'}} >{Translator('email')}</Text>
                </Col>
            </Row>
        </View>
        }
        {
            doctor.website=="" || doctor.website==null || doctor.website==undefined ? 
            null :
            <View style={{paddingVertical:22}}>
            <Row>
                <Col style={{ flex:0.1}}>
                    <Icon name="globe" type="FontAwesome" style={{fontSize:20, color: '#044DC1'}}/>                        
                </Col>
                <Col style={{flex:0.9, alignItems:'flex-start'}}>
                <Text style={{color:"#4B4F56", fontsize:16}} >{doctor.website}</Text></Col>
            </Row>
            <Row>
                <Col style={{marginLeft:30}}>
                    <Text style={{color:"#4B4F56", fontsize:16, textAlign : 'left'}}>{Translator('website')}</Text>
                </Col>
            </Row>
        </View>
        }
        <View style={{padding:10}}>
            <Row>
                
            </Row>
        </View>
        </View>
        </View>
        {showReport && 
                <Modal style={{borderWidth:1}} transparent={true} onRequestClose={()=>setShowReport(false)}> 
                    <View style={styles.modal}>
                        <View>
                        <Text style={styles.heading}>Report</Text>
                        </View>
                        <View style={{flex:1}}>
                            <Input placeholder='Enter message...' value={message} onChangeText={(text)=>setMessage(text)} style={{flex:1, height:50}} multiline={true} numberOfLines={7} />
                        </View>
                        <View style={styles.okContainer}>
                            <TouchableOpacity onPress={()=>{ props.route.params.report(doctor.id,message); setShowReport(false); setVisible(false)}}>
                                <Text style={styles.ok}>Send</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>}
        </Content>
    </Container>
        
          
      )
  }
  const styles=StyleSheet.create(
    { 

        modal:{
            backgroundColor:"#FFFFFF",
            borderRadius:10,
            padding:20,
            backgroundColor:theme.colors.background,
            borderWidth:1,
            marginHorizontal:50,
            height:hp("30%"),
            marginTop:100
        },
        heading:{
            fontSize:20,
            fontWeight:"bold",
        },
        text:{
            paddingTop:wp('3%'),
            lineHeight:22,
        },
        okContainer:{
            justifyContent:"flex-end",
            alignItems:"flex-end",
            paddingHorizontal:wp('4%'),
            marginVertical:10
        },
        ok:{
            fontFamily:"OpenSans-SemiBold",
        }
    
    
    }
)