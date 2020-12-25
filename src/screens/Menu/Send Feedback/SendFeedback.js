import React,{useState} from 'react'
import { View, Text,Image, Alert} from 'react-native'
import {Styles} from "./Styles/SendFeedbackStyles"
import {theme,images} from "../../../constants"
import {Button,Input} from '@ui-kitten/components'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {Row, Col, Icon} from "native-base"
import AsyncStorage from '@react-native-community/async-storage'
import SeededData from '../../../services/SeededData'
const {icons,loader}=images

export default function SendFeedback(props) {
    const [text,setText]=useState('')
    const [loading,setLoading]=useState(false)

    const LoadingIndicator = (props) => (
        <View style={ Styles.indicator}>
         <Image source={loader.white}  />
        </View>
    );

    const handleSubmit = async() => {
        setLoading(true)
        let user = JSON.parse(await AsyncStorage.getItem("loginData"))
        let lang = JSON.parse(await AsyncStorage.getItem("lang"))
        let req={
            Feedback:{
                UserId: user.currentUserID,
                Message: text
            },
            token: user.accessToken,
            refreshToken: user.refreshToken
        }
        console.log(req)
        let api = new SeededData()
        let res = await api.sendFeedback(req).then(res=>res.json())
        console.log("response", res)
        Alert.alert("Thanks!", "Thanks for your valuable feedback. This will encourage us to improve!", [{
            text: 'OK'
        }])
        setLoading(false)
    }

    return (
      <KeyboardAwareScrollView style={{flex:1}}>
          <View >
                <View 
                    style={{
                        height:60,
                        flexDirection:'row',
                        backgroundColor:'#fff'
                    }}>
                    <View
                        style={{
                            position:'absolute',
                            top:18,
                            width:60,
                            justifyContent:'center',
                            alignItems:'center'
                        }}
                        >
                        <Icon 
                            onPress={()=>props.navigation.goBack(null)} 
                            name="arrow-left" 
                            type="Feather" 
                            size={30} 
                            color={'#000'} 
                            />

                    </View>
                    <View
                        style={{
                            flex:1,
                            justifyContent:'center',
                            alignItems:'center',
                        }}
                        >
                        <Text style={[Styles.mainHeading]}>Send Feedback</Text>
                    </View>  
                </View>
              <Row 
                style={{backgroundColor:'#fff'}}
                >
                  <Col style={{padding:10,paddingBottom:5,paddingLeft:20}}>
                        <Text 
                            style={{
                                fontSize:16,    
                                fontFamily:"OpenSansCondensed-Bold",
                            }}>
                            Message
                        </Text>
                  </Col>
              </Row>
              <Row
                style={{backgroundColor:'#fff'}}
                >
                  <Col style={{padding:20,paddingTop:4}}>
                      <Input                       
                          numberOfLines={10}
                          textAlignVertical='top'
                          textStyle={{color:theme.colors.black}}
                          onChangeText={(text)=>setText(text)}
                          style={Styles.inputBox}
                      />
                  </Col>
              </Row>
            </View>
            <Row>
                <Col
                    style={{paddingLeft:20,marginRight:5}}
                    >
                    <Button 
                        style={{
                            backgroundColor:'#ccc', 
                            borderWidth:0
                        }}
                        onPress={()=>props.navigation.goBack()}
                        children={()=><Text style={{color:'#000'}}>{!props.loading?"Cancel":""}</Text>}
                        />
                </Col>
                <Col
                    style={{paddingRight:20,marginLeft:5}}
                    >
                    <Button
                        accessoryLeft={()=>loading?LoadingIndicator():null} 
                        style={{backgroundColor:theme.colors.primary, borderWidth:0}}
                        block onPress={()=>handleSubmit()} 
                        >
                        {!loading &&
                            <Text>Send</Text>
                        }
                    </Button>
                </Col>
              </Row>        
        </KeyboardAwareScrollView>
    )
}
