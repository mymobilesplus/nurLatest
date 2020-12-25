import React, { useEffect, useState, useRef } from 'react'
import { View, Text,Image,TouchableOpacity,KeyboardAvoidingView, Keyboard, Alert, Modal } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import {Button,IndexPath, Layout, Select, SelectItem} from "@ui-kitten/components"
import { Icon, Row, Col, Radio, Container, Content, Picker, Input} from 'native-base';
import ImagePicker from 'react-native-image-picker';


const Customesnoozed = (props) => {
  const[selected, setSelected] = useState();

  const onValueChange = (value) => {
    setSelected(value)
  }
    return (
      <Container>
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
              onValueChange={onValueChange}
            >
              <Picker.Item label="Minutes" value="key0" />
              <Picker.Item label="Seconds" value="key1" />
              <Picker.Item label="Hours" value="key2" />
            </Picker>
            </Col>
          </Row>
          <Row style={{marginBottom:10, marginLeft:20, marginTop:20}}>
            <TouchableOpacity onPress={props.onClose}>
                <Col style={{flex:0.6}}><Text>Back to preset time</Text></Col>
            </TouchableOpacity>
            <Col style={{flex:0.5, alignItems:'flex-end', }}>
              <TouchableOpacity onPress={props.onClose} >
              <Text>Cancel</Text>
              </TouchableOpacity>
            </Col>
            <Col style={{flex:0.3, alignItems:'flex-end', }}>
              <TouchableOpacity onPress={()=> console.log("custom ok pressed",selected)}>
              <Text>Ok</Text>
              </TouchableOpacity>
            </Col>
          </Row>
          
        </Content>
      </Container>
    )
}

export default Customesnoozed
