import React, { useEffect, useState, useRef } from 'react'
import { View, Text,Image,TouchableOpacity,KeyboardAvoidingView, Keyboard, Alert } from 'react-native'
import {Styles} from "../Style/_TextAreaStyle"
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from "react-native-responsive-screen"
import { Input, Button } from '@ui-kitten/components';
import AsyncStorage from '@react-native-community/async-storage'
import {images,theme} from "../../../constants"
import langjson from "../../../constants/lang.json"
import Icon from 'react-native-vector-icons/EvilIcons';
import { Row, Col } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import { loader } from '../../../constants/images';
import HealthDairyService from '../../../services/HealthDiaryServices';
import { Modal } from 'react-native-paper';
const {icons}=images



const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
};
  
let keyboardDidShowListener;
let keyboardDidHideListener;
const TextArea = (props) => {
    const[button, setButton] = useState(false)
    const [loading,setLoading]=useState(false)
    const [file,setFile]=useState('')
    const[text, setText]=useState('')
    const [visible, setVisible] = useState(false);
    const input = useRef()

    const LoadingIndicator = (props) => (
        <View style={ Styles.indicator}>
         <Image source={loader.white}  />
         {/* <Spinner size="small"  /> */}
        </View>
    );

    const renderAddPhoto=()=>{
        return(
            <View>
                <TouchableOpacity onPress={pickImage}>
                    <Image source={file==''?icons.AddPhoto:file} style={Styles.addPhoto} />
                </TouchableOpacity>
                {/* <Button
                    accessoryLeft={()=>loading?LoadingIndicator():null} 
                    onPress={!loading?createHealthRecord:null} appearance="primary" status="primary" 
                    style={Styles.button} size="large" block>
                    { !loading?<Icon name="save" type="FontAwesome" style={{color: '#fff'}} />:""}</Button> */}
            </View>
        )
    }

    // const openImageLibrary=()=>{
    //     ImagePicker.launchImageLibrary(options, (response) => {
    //       console.log("Selected File: ",response)
    //       if (response.didCancel) {
    //         console.log('User cancelled image picker');
    //       } else if (response.error) {
    //         console.log('ImagePicker Error: ', response.error);
    //       } else if (response.customButton) {
    //         console.log('User tapped custom button: ', response.customButton);
    //       } else {
    //         let f = [];
    //         const source = { 
    //           FileName: response.fileName, 
    //           FileSize: response.fileSize, 
    //           FileType: response.type,
    //           FileAsBase64: response.data  };
    //         f.push({File: source, uri: response.uri})
    //         setFile(f)
    //         console.log("Source: ",source)
    //       }
    //     });
    // }
    const  openImageLibrary=()=>{
      ImagePicker.launchImageLibrary(options, (response) => {
        // console.log("Selected File: ",response)
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          let f = [...file];
          const source = { 
            FileName: response.fileName, 
            FileSize: response.fileSize, 
            FileType: response.type,
            FileAsBase64: response.data  };
          f.push({File: source, uri: response.uri})
          setFile(f)
          setVisible(false)
          // console.log("File: ",f)
        }
      });
    }

    const openCamera=()=>{
      ImagePicker.launchCamera(options, (response) => {
        // console.log("Selected File: ",response)
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          let f = [...file];
          const source = { 
            FileName: response.fileName, 
            FileSize: response.fileSize, 
            FileType: response.type,
            FileAsBase64: response.data  };
          f.push({File: source, uri: response.uri})
          setFile(f)
          setVisible(false)
        }
      });
  }

    // const openCamera=()=>{
    //     ImagePicker.launchCamera(options, (response) => {
    //       console.log("Selected File: ",response)
    //       if (response.didCancel) {
    //         console.log('User cancelled image picker');
    //       } else if (response.error) {
    //         console.log('ImagePicker Error: ', response.error);
    //       } else if (response.customButton) {
    //         console.log('User tapped custom button: ', response.customButton);
    //       } else {
    //         let f = [];
    //         const source = { 
    //           FileName: response.fileName, 
    //           FileSize: response.fileSize, 
    //           FileType: response.type,
    //           FileAsBase64: response.data  };
    //         f.push({File: source, uri: response.uri})
    //         setFile(f)
    //         console.log("Source: ",source)
    //       }
    //     });
    // }

    const pickImage = () =>{
        Alert.alert("Select Image", "From:", [
            {
                text: 'Camera', onPress: openCamera
            },
            {
                text: 'Gallery', onPress: openImageLibrary
            }
        ] )
    }

    const useInputState = (initialValue = '') => {
        const [value, setValue] = React.useState(initialValue);
        return { value, onChangeText: setValue };
    };
    const [language, setLang, updatelang] = useState(1)
    useEffect(()=>{
        AsyncStorage.getItem("lang").then(lang=>{
            if(lang!=null){
                setLang(lang)
            }
        })
        setTimeout(()=>{
          input.current.focus()
        }, 1)
    }, [])
    const multilineInputState = useInputState();
    const _keyboardDidShow = () => {
        setButton(true)
        // alert('Keyboard Shown');
    }
    
    const _keyboardDidHide = () => {
        setButton(false)
        // alert('Keyboard Hidden');
    }

    const createHealthRecord = () => {
        setLoading(true)
        let formData = {
          HealthDiary: {
            Description: text,
            Files: file
            // GenderSD:genderData[selectedIndex.row]
          }
        }; 
        
        AsyncStorage.getItem('loginData').then(user=>{
            user = JSON.parse(user);
            let auth = new HealthDairyService();
            formData.token = user.accessToken;
            formData.HealthDiary.UserId = user.currentUserID;
            // console.log("Form Data: ",JSON.stringify(formData))
            auth.create(formData).then(res=>res.json()).then(res=>{
                console.log(res);
                setLoading(false)
                if(res.id == 0){
                    alert("Some Backed Error Check\n"+res.returnStatus.returnMessage);
                }
                else{
                    alert("Record Added Successfully!")
                    setText("")
                    setFile('')
                }
            })
        })
    }

    return (
      <View style={Styles.textArea}>
        <View style={Styles.mainContainer}>
          <Row style={{flex: 0.5, borderBottomWidth:0.7, borderColor:"#979797"}}>
            <Col style={{flex: 9}}>
              <Text style={Styles.text}>{langjson.lang[language-1].complaintnote}</Text>
            </Col>
            <Col style={{flex: 1, paddingVertical:15}}>
              <Icon onPress={props.onClose} name="close" size={24} />
            </Col>
          </Row>
            <Row style={{flex: 5.5, backgroundColor: 'white'}}>
              <Col style={{flex:3.5}}>
              <Input
              placeholder="Write..."
                  ref={input}
                  autoFocus={true}
                  multiline={true}
                  textStyle={{ minHeight:10,color:theme.colors.black }}
                  {...multilineInputState}
                  style={Styles.inputBox} 
                  value={text}
                  onChangeText={(text)=>setText(text)}
              />
              </Col>
              <Col style={{marginHorizontal:15}}>
                {renderAddPhoto()}
              </Col>
            </Row>
            <Row>
            <View style={Styles.buttonContainer}>
              <View>
                <Button
                  onPress={props.onClose}
                  appearance="outline"
                  status="basic"
                  style={Styles.buttonForm}
                  size="large"
                  block>
                  Cancel
                </Button>
              </View>
              <View>
                <Button
                  accessoryLeft={()=>loading?LoadingIndicator():null} 
                  onPress={!loading?createHealthRecord:null}
                  appearance="outline"
                  status="primary"
                  style={Styles.buttonForm}
                  disabled={text != '' ? false : true}
                  size="large"
                  block> SAVE
                  {/* {!loading ? (update ? 'Update' : 'Create') : ''} */}
                </Button>
              </View>
            </View>
            </Row>
            {/* <Modal transparent={true} visible={visible} onRequestClose={()=>setVisible(false)} onPress={()=>console.log("modal pressed")}>
                <View style={{ flex:0, backgroundColor:'rgba(0,0,0,0.3)'}}>
                    <View style={{ position:"absolute", bottom:0, height:hp("20%"), width:wp("90%"),margin:20, backgroundColor:theme.colors.white, alignItems:"center", justifyContent: 'center'}}>
                        <Text style={{alignSelf:"center", position:"absolute" , top:0, marginTop:10, fontSize:20}}>Add Photo</Text>
                        <TouchableOpacity onPress={()=>setVisible(false)} style={{alignSelf:"flex-end", marginTop:10}} >
                            <Icon name="close" style={{alignSelf:"center", color: '#000', fontSize: 32}} />
                        </TouchableOpacity>
                        <View style={{flexDirection:"row", marginTop:20, alignContent:"space-between", justifyContent:"center", height:hp("15%")}}>
                            <TouchableOpacity onPress={openImageLibrary} style={{flex:1, marginVertical:25, marginLeft:wp("15%") , marginRight:13, backgroundColor:"#F8F8FA", borderRadius:28, justifyContent:"center"}} >
                                <Icon name="image" style={{alignSelf:"center", color: '#000', fontSize: 32}} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={openCamera} style={{flex:1, marginVertical:25, marginRight:wp("15%"), backgroundColor:"#F8F8FA", borderRadius:28, justifyContent:"center"}} >
                                <Icon name="camera" style={{alignSelf:"center", color: '#000', fontSize: 32}} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal> */}
        </View>
      </View>
    )
}

export default TextArea
