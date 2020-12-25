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
   

export default function Addarticle(props){
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
         
              <Row style={{backgroundColor:'blue'}}>
                <Col  style={{flex:0.8, alignItems:'center',}}>
                <Text style={Styles.mainHeading}>Create New Article</Text>
                </Col>
                <Col style={{flex:0.2, alignItems:'center', marginTop:10, marginRight:10}}>
                <Icon onPress={()=>props.navigation.goBack(null)} name="close" type="FontAwesome" style={{fontSize:20, color:'#fff'}} />
                </Col>
              </Row>
              
            </View>
              <Container>
                  <Content>
                  <View style = {Styles.container}>
            <Modal animationType = {"slide"} transparent = {false}
               visible = {modalVisible}
               onRequestClose = {() => {toggleModal(false) } }>
               
               <View style = {Styles.modal}>
                 <Row style={{borderTopColor:'#ccc', borderTopWidth:1, padding:10}} >
                     <Col>
                     <Text style = {Styles.text1}>Create New Topic</Text>
                     </Col>
                 </Row>
                 <Row style={{borderTopColor:'#ccc', borderTopWidth:1, padding:10}}>
                     <Col>
                     <Text >Topic Name Goes Here</Text>
                     </Col>
                     <Col>
                     <Text>32 Articles</Text>
                     </Col>
                 </Row>
                 <Row style={{borderTopColor:'#ccc', borderTopWidth:1, padding:10}}>
                     <Col>
                     <Text >Topic Name Goes Here</Text>
                     </Col>
                     <Col>
                     <Text>32 Articles</Text>
                     </Col>
                 </Row>
                 <Row style={{borderTopColor:'#ccc', borderTopWidth:1, padding:10}}>
                     <Col>
                     <Text >Topic Name Goes Here</Text>
                     </Col>
                     <Col>
                     <Text>32 Articles</Text>
                     </Col>
                 </Row>
                  
                  <TouchableHighlight onPress = {() => {
                     toggleModal(!modalVisible)}}>
                     <Text style = {Styles.text}><Icon name="close" type="FontAwesome"/></Text>
                  </TouchableHighlight>
               </View>
            </Modal>
            
            <TouchableHighlight onPress = {() => {this.toggleModal(true)}}>
              <Text style = {Styles.text}>Select Topic</Text>
            </TouchableHighlight>
            <View style={Styles.fieldContainer}>
            <Texts  appearance='hint'>Add file or photo</Texts>
            <View style={{flexDirection:"row"}}>
            <View style={Styles.addFileContainer}>
                <TouchableOpacity onPress={()=>openImageLibrary()}>
                    <AntDesign name="addfile" color={theme.colors.primary} size={30}  />
                    </TouchableOpacity>
                </View>
                <View style={Styles.addFileContainer}>
                 {file!='' &&<Image source={file} style={Styles.file} />}
                </View>
            </View>
            </View>
            
         </View>
         <Row>
             <Col>
                    <Button style={{backgroundColor:'#ddd', borderWidth:0}}><Text style={{color:'#000'}}>Cancel</Text></Button>
                    
             </Col>
             <Col>
                   
                    <Button><Text>Create</Text></Button>
             </Col>
         </Row>
         
                    </Content>
              </Container>        
        </KeyboardAwareScrollView>
    )
      
}
