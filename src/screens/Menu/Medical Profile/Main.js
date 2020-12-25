import React,{useEffect, useState} from 'react'
import { View, Text,StyleSheet } from 'react-native'
import {Styles} from "./Styles/Medicalprofile"
import {theme,images} from "../../../constants"
import {Button} from '@ui-kitten/components'
import { Row, Col, Container, Icon, Content } from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { ActivityIndicator } from 'react-native-paper';
import MedicalProfileService from '../../../services/MedicalProfileService';
import Entypo from "react-native-vector-icons/Entypo"

export default function main(props) {
  const [profile, setProfile] = useState({})
  const [loading, setLoading] = useState(true)
  useEffect(()=>{
    //   getProfile()
  }, [])
  useFocusEffect(React.useCallback(()=>{
      getProfile()
  }, []))
  const getProfile = async() => {
      setLoading(true)
      let user = JSON.parse(await AsyncStorage.getItem("loginData"))
      let lang = JSON.parse(await AsyncStorage.getItem("lang"))
      if(lang == null){
          lang = 1
      }
      let api = new MedicalProfileService()
      let req = {
          userId: user.currentUserID,
          LanguageId: lang,
          token: user.accessToken,
          refreshToken: user.refreshToken
      }
      let res = await api.get(req).then(res=>res.json())
      console.log(res)
      setLoading(false)
      if(res.medicalProfile.id == 0){
          setProfile(null)
      }
      else{
          setProfile(res.medicalProfile)
      }

  }

    return (
      <Container style={{flex:1}}>
                   <View 
                style={{
                    height:60,
                    flexDirection:'row',
                    marginBottom:10
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
                        <Icon onPress={()=>props.navigation.goBack(null)} type="Feather" name="arrow-left" size={30} color={'#000'} />
                    </View>
                    <View
                        style={{
                        flex:1,
                        justifyContent:'center',
                        alignItems:'center'
                        }}
                        >
                        <Text 
                            style={[Styles.mainHeading,{fontSize:18}]}
                            >
                            My Medical Profile
                        </Text>
                        {!loading && profile !== null &&
                        <View  style={{
                          position:'absolute',
                          top:18,
                          right:5,
                          width:60,
                          justifyContent:'center',
                          alignItems:'center'
                          }}>
                              <Entypo name="dots-three-vertical" size={24} color={theme.colors.dark}  onPress={()=>props.navigation.navigate("CreateMedicalProfile", {profile})} />
                      </View>
                      }
                    </View>  

            </View>
            {loading &&
                <ActivityIndicator size="large" color={theme.colors.primary} />
            }
            {!loading && profile == null &&
                <Row style={{marginTop:10}}>
                    <Col>
                        <Button 
                            onPress={()=>props.navigation.navigate("CreateMedicalProfile")} 
                            appearance="primary" status="primary"
                            style={Styles.button} size="large">
                              <Text style={{fontSize:20}}>
                            Add Your Medical Profile
                            </Text>
                            </Button>
                    </Col>
                </Row>
                    
            }
            {!loading && profile != null &&
                <Content style={{paddingHorizontal:29, marginBottom:30}}>
                    <Row style={{marginTop:10}}>
                        <Col>
                            <Row><Text style={{color:"#4B4F56"}}>First name</Text></Row>
                            <Row><Text style={{fontSize:20}}>{profile.firstName}</Text></Row>
                        </Col>
                    </Row>
                    <Row style={{marginTop:10}}>
                        <Col>
                            <Row><Text style={{color:"#4B4F56"}}>Last name</Text></Row>
                            <Row><Text style={{fontSize:20}}>{profile.lastName}</Text></Row>
                        </Col>
                    </Row>
                    <Row style={{marginTop:10}} >
                        <Col>
                            <Row><Text style={{color:"#4B4F56"}}>Age</Text></Row>
                            <Row><Text style={{fontSize:20}}>{profile.age}</Text></Row>
                        </Col>
                    </Row>
                    <Row style={{marginTop:10}}>
                        <Col>
                            <Row><Text style={{color:"#4B4F56"}}>Weight</Text></Row>
                            <Row><Text style={{fontSize:20}}>{profile.weightSD}Kg</Text></Row>
                        </Col>
                    </Row>
                    <Row style={{marginTop:10}}>
                        <Col>
                            <Row><Text style={{color:"#4B4F56"}}>Height</Text></Row>
                            <Row><Text style={{fontSize:20}}>{profile.heightSD}cm</Text></Row>
                        </Col>
                    </Row>
                    <Row style={{marginTop:10}} >
                        <Col>
                            <Row><Text style={{color:"#4B4F56"}}>Gender</Text></Row>
                            <Row><Text style={{fontSize:20}}>{profile.gender}</Text></Row>
                        </Col>
                    </Row>
                    <Row style={{marginTop:10}} >
                        <Col>
                            <Row><Text style={{color:"#4B4F56"}}>Blood Type</Text></Row>
                            <Row><Text style={{fontSize:20}}>{profile.bloodType}</Text></Row>
                        </Col>
                    </Row>
                    <Row style={{marginTop:10}}>
                        <Col>
                            <Row><Text style={{color:"#4B4F56"}}>Marital Status</Text></Row>
                            <Row><Text style={{fontSize:20}}>{profile.maritalStatus}</Text></Row>
                        </Col>
                    </Row>
                    <Row style={{marginTop:10}}>
                        <Col>
                            <Row><Text style={{color:"#4B4F56"}}>Do you have Children?</Text></Row>
                            <Row><Text style={{fontSize:20}}>{profile.haveChildren? "Yes": "No"}</Text></Row>
                        </Col>
                    </Row>
                    <Row style={{marginTop:10}}>
                        <Col>
                            <Row><Text style={{color:"#4B4F56"}}>Do you have Nssf?</Text></Row>
                            <Row><Text style={{fontSize:20}}>{profile.haveNSSF? "Yes": "No"}</Text></Row>
                        </Col>
                    </Row>
                    <Row style={{marginTop:10}}>
                        <Col>
                            <Row><Text style={{color:"#4B4F56"}}>Do you have insurance?</Text></Row>
                            <Row><Text style={{fontSize:20}}>{profile.haveInsurance? "Yes": "No"}</Text></Row>
                        </Col>
                    </Row>
                    <Row style={{marginTop:10}}>
                        <Col>
                            <Row><Text style={{color:"#4B4F56"}}>What is your occupation?</Text></Row>
                            <Row><Text style={{fontSize:20}}>{profile.occupation}</Text></Row>
                        </Col>
                    </Row>
                    <Row style={{marginTop:10}}>
                        <Col>
                            <Row><Text style={{color:"#4B4F56"}}>Do you smoke?</Text></Row>
                            <Row><Text style={{fontSize:20}}>{profile.haveChildren? "Yes": "No"}</Text></Row>
                        </Col>
                    </Row>
                    <Row style={{marginTop:10}}>
                        <Col>
                            <Row><Text style={{color:"#4B4F56"}}>Do you drink caffeine?</Text></Row>
                            <Row><Text style={{fontSize:20}}>{profile.caffeineDrinker? "Yes": "No"}, {profile.caffeinePerDay}</Text></Row>
                        </Col>
                    </Row>
                    <Row style={{marginTop:10}}>
                        <Col>
                            <Row><Text style={{color:"#4B4F56"}}>Do you take medications?</Text></Row>
                            <Row><Text style={{fontSize:20}}>{profile.takeMedication? "Yes": "No"}</Text></Row>
                        </Col>
                    </Row>
                    <Row style={{marginTop:10}}>
                        <Col>
                            <Row><Text style={{color:"#4B4F56"}}>Do you have any Medication Allergy?</Text></Row>
                            <Row><Text style={{fontSize:20}}>{profile.haveMedicationAllergy? "Yes": "No"}</Text></Row>
                        </Col>
                    </Row>
                    <Row style={{marginTop:10}}>
                        <Col>
                            <Row><Text style={{color:"#4B4F56"}}>Do you have any other Allergy?</Text></Row>
                            <Row><Text style={{fontSize:20}}>{profile.haveOtherAllergy}</Text></Row>
                        </Col>
                    </Row>
                    <Row style={{marginTop:10}}>
                        <Col>
                            <Row><Text style={{color:"#4B4F56"}}>Did you undergo any surgery?</Text></Row>
                            <Row><Text style={{fontSize:20}}>{profile.havePreviousSurgeries? "Yes": "No"}</Text></Row>
                        </Col>
                    </Row>
                    <Row style={{marginTop:10}}>
                        <Col>
                            <Row><Text style={{color:"#4B4F56"}}>Family Medical History?</Text></Row>
                            <Row><Text style={{fontSize:20}}>{profile.familyMedicalHistory}</Text></Row>
                        </Col>
                    </Row>
                </Content>
            }
        </Container>
    )
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
