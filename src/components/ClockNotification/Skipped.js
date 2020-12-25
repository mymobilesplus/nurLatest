import React, { useEffect, useState, useRef } from 'react'
import { View, Text,Image,TouchableOpacity,KeyboardAvoidingView, Keyboard, Alert, Modal } from 'react-native'
import { Input, Button } from '@ui-kitten/components';
import AsyncStorage from '@react-native-community/async-storage'
import { Icon, Row, Col, Radio, Container, Content} from 'native-base';
import ImagePicker from 'react-native-image-picker';
import ReminderApiService from '../../services/ReminderApiService';


const Skipped = (props) => {
  const [loading,setLoading]=useState(false)
  
  const removeReminder=(id)=>{
    setLoading(true)
    let formData = {
      ID: props.removeItemId,
    }
    AsyncStorage.getItem('loginData').then(user=>{
      user = JSON.parse(user);
      let auth = new ReminderApiService();
      formData.token = user.accessToken;
      formData.UserId = user.currentUserID;
      formData.refreshToken= user.refreshToken
      console.log("Form Data: ",JSON.stringify(formData))

      auth.delete(formData).then(res=>res.json()).then(res=>{
        console.log(res);
        setLoading(false)
        if(res.id == 0){
          alert("Some Backed Error Check\n"+res.returnStatus.returnMessage);
        }
        else{
          // deleteAlarm(res.id)
          // alert("Alarm Successfully removed")
          props.refresh()
          props.onClose()
        }
      })
    })
    deleteAlarm(id)
  }

  const deleteAlarm = async (id) => {
    try {
        await cancelAlarmById(id).then(res=> {
          console.warn("delete alarm",res)
        }
          );
    } catch (e) {
      console.log(e);
    }
  }

    return (
      <Container>
        <Content>
        <Row >
            <Col style={{alignItems:'center',padding:20}}>
              <Text style={{fontSize:20, fontWeight:"bold"}}>Are you Sure?</Text>
            </Col>
          </Row>
          
          <Row style={{marginBottom:10,marginTop:0, padding:10}}>
            <Col style={{flex:0.6, alignItems:'center', borderWidth:1, borderColor:'#146ECB', padding:10, borderRadius:20, marginRight:5 }}>
              <TouchableOpacity onPress={props.onClose} >
              <Text style={{color:'#146ECB'}}>Cancel</Text>
              </TouchableOpacity>
            </Col>
            <Col style={{flex:0.6, alignItems:'center', borderWidth:1, borderColor:'#84B244',backgroundColor:'#84B244', padding:10, borderRadius:20 }}>
              <TouchableOpacity onPress={()=>removeReminder(props.removeItemId)}>
              <Text style={{color:'#fff'}}>Confirm</Text>
              </TouchableOpacity>
            </Col>
          </Row>
          
        </Content>
      </Container>
    )
}

export default Skipped
