import React, { useEffect, useState, useRef } from 'react'
import { View, Text,Image,TouchableOpacity,KeyboardAvoidingView, Keyboard, Alert, Modal } from 'react-native'
import { Input, Button } from '@ui-kitten/components';
import AsyncStorage from '@react-native-community/async-storage'
import { Icon, Row, Col, Radio, Container, Picker, Content} from 'native-base';
import ImagePicker from 'react-native-image-picker';


const Snoozed = (props) => {
  const[customesnoozed, setModal] = useState(false)
  const[selected, setSelected] = useState(0)
  const[snoozeTime, setSnoozeTime] = useState(0)

  const Customesnoozed = () => {
      return (
        // <Container>
          <Content>
          <Row >
              <Col style={{alignItems:'flex-start',padding:20}}>
                <Text style={{fontSize:17}}>Custom Snooze Time</Text>
              </Col>
            </Row>
            <Row style={{padding:10}}>
              <Col style={{flex:0.5, borderBottomWidth:1, borderColor:'#ccc', marginRight:10}}><Input  /></Col>
              <Col style={{flex:0.6, borderWidth:1, borderColor:'#ccc'}} >
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                style={{ width: undefined }}
                selectedValue={selected}
                onValueChange={(value) => setSelected(value)}
              >
                <Picker.Item label="Minutes" value="key0" />
                <Picker.Item label="Seconds" value="key1" />
                <Picker.Item label="Hours" value="key2" />
              </Picker>
              </Col>
            </Row>
            <Row style={{marginBottom:10, marginLeft:20, marginTop:20}}>
              <TouchableOpacity onPress={()=>setModal(false)}>
                  <Col style={{flex:0.6}}><Text>Back to preset time</Text></Col>
              </TouchableOpacity>
              <Col style={{flex:0.5, alignItems:'flex-end', }}>
                <TouchableOpacity onPress={props.onClose} >
                <Text>Cancel</Text>
                </TouchableOpacity>
              </Col>
              <Col style={{flex:0.3, alignItems:'flex-end', }}>
                <TouchableOpacity onPress={()=>{ 
                alert("Alarm Successfully snoozed");
                props.onClose() }}>
                <Text>Ok</Text>
                </TouchableOpacity>
              </Col>
            </Row>
            
          </Content>
        // </Container>
      )
  }

  let List = [5,10,15]
    return (
      <Container >
        <Content style={{elevation:2}}>
        <Row >
            <Col style={{alignItems:'flex-start',padding:20}}>
              <Text style={{fontSize:17}}>Snoozed after...</Text>
            </Col>
          </Row>
          {List.map((item,index)=> 
            <Row style={{padding:10}}>
              <Col style={{flex:0.2}}><Radio selected={selected == item} onPress={()=>{setSelected(item); setSnoozeTime(item)}} /></Col>
            <Col style={{flex:1}} ><Text>{item} Minutes</Text></Col>
          </Row>)
          }
          <Row style={{marginBottom:10, marginLeft:20,marginTop:20}}>
            <TouchableOpacity onPress={()=>{console.log("called"); setModal(true)}} >
                <Col style={{flex:1}}><Text>Custom Snooze Time</Text></Col>
            </TouchableOpacity>
            <Col style={{flex:0.5, alignItems:'flex-end', }}>
              <TouchableOpacity onPress={props.onClose} >
              <Text>Cancel</Text>
              </TouchableOpacity>
            </Col>
            <Col style={{flex:0.3, alignItems:'flex-end', }}>
              <TouchableOpacity onPress={()=>{ 
                props.SnoozeAlarms(props.item,snoozeTime)
                props.onClose() }}>
              <Text>Ok</Text>
              </TouchableOpacity>
            </Col>
          </Row>
          <Modal animated={true} visible={customesnoozed} transparent onRequestClose={()=>setModal(false)}>
              <View style={{elevation:2, backgroundColor: '#fff', flex: 0.4, marginTop:60, marginBottom:60, marginLeft:30, marginRight:30}}>
                  <Customesnoozed/>
              </View>
          </Modal>
        </Content>
      </Container>
    )
}

export default Snoozed
