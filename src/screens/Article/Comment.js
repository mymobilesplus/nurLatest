import React,{useEffect,useState, useReducer, Component} from 'react'
import { View, Text,Image,TouchableOpacity,ImageBackground,KeyboardAvoidingView, ScrollView, Modal,TouchableHighlight} from 'react-native'
import {Styles} from "./Styles/AddarticleStyles"
import {theme,images} from "../../constants"
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from "react-native-responsive-screen"
import {Button,Input,IndexPath,Select,SelectGroup,SelectItem, Text as Texts} from '@ui-kitten/components'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {connect} from "react-redux"
import AntDesign from "react-native-vector-icons/AntDesign"
import {Row, Col, Container, Content, Icon, Form, Picker} from "native-base"
import {Formik} from "formik"
import { Searchbar } from 'react-native-paper';
import ImagePicker from 'react-native-image-picker';

import { icons, doctor } from '../../constants/images';
const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
   

export default function comment(props){
    const [modalVisible, setVisible] = useState(false); 
    
     toggleModal = (visible) => {
         setVisible(visible);
       
     }
     const [file,setFile]=useState('')
        const  openImageLibrary=()=>{
           ImagePicker.launchImageLibrary(options, (response) => {
             console.log("Selected File: ",response)
             if (response.didCancel) {
               console.log('User cancelled image picker');
             } else if (response.error) {
               console.log('ImagePicker Error: ', response.error);
             } else if (response.customButton) {
               console.log('User tapped custom button: ', response.customButton);
             } else {
               const source = { uri: response.uri };
               setFile(source)
               console.log("Source: ",source)
             }
           });
         }
    
    
        
     
    return (
      <KeyboardAwareScrollView style={{flex:1}}>
          <View >
         
              <Row >
                <Col  style={{flex:0.8, alignItems:'center',padding:10}}>
                <Text style={{fontSize:18, color:'blue'}}>Comment</Text>
                </Col>
                <Col style={{flex:0.2, alignItems:'center', marginTop:10, marginRight:10}}>
                <Icon onPress={()=>props.navigation.goBack(null)} name="close" type="FontAwesome" style={{fontSize:20, color:'#000'}} />
                </Col>
              </Row>
              
            </View>
             <Container>
                 <Content>
                     <Row style={{padding:10}}>
                         <Col style={{flex:0.2}}><Image></Image></Col>
                         <Col  style={{flex:0.8, alignItems:'flex-start'}}><Text style={{color:'blue'}}>Name</Text></Col>
                     </Row>
                     <Row>
                         <Col>
                            <Text>comment</Text>
                         </Col>
                     </Row>
                     <Row>
                         <Col>
                            
                         </Col>
                     </Row>
                        {/* <Row>
                            <Col>
                                    <Button style={{backgroundColor:'#ddd', borderWidth:0}}><Text style={{color:'#000'}}>Cancel</Text></Button>
                                    
                            </Col>
                            <Col>
                                
                                    <Button><Text>Create</Text></Button>
                            </Col>
                        </Row> */}
                    </Content>
              </Container>        
        </KeyboardAwareScrollView>
    )
      
}
