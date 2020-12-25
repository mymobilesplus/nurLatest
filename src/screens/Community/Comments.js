import React, { useEffect } from 'react'
import { View, Button, Text,Image,TouchableOpacity, FlatList, Modal, RefreshControl, StyleSheet} from 'react-native'
import {Styles} from "./Style/_Community"
import {theme,images} from "../../constants"
import {Input} from "@ui-kitten/components"
import Icon from 'react-native-vector-icons/EvilIcons';
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from "react-native-responsive-screen"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Row, Col } from 'native-base';
import { loader } from '../../constants/images'
import CommunityService from '../../services/CommunityService'
import AsyncStorage from '@react-native-community/async-storage'
import { Icon as CommentIcon } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import { IMAGE_URL } from '../../API_URI';


const{icons}=images

const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
};

export default function Comments(props) {
    const [visible, setVisible] = React.useState(0);
    const [List, setProfileList] = React.useState([]);
    const [file,setFile] = React.useState([])
    const [loading, setLoding]= React.useState(false);
    const [comment, setComment] = React.useState("")

    useEffect(() => {
        // code to run on component mount
        setProfileList(props.comments)
      }, [props])
    

      const renderRow = ({item, index}) =>{
        return (
            <View style={{ margin:10, padding:8}}>
                <View>
                    <Row>
                        <Col style={{flex:0.1}}>
                            <View style={{ borderRadius:14, height:28, width:28 ,backgroundColor:theme.colors.grey, alignSelf:"center"}}  />   
                        </Col>
                        <Col style={{marginLeft:5, alignItems:'flex-start',justifyContent:"center", flex:0.4}}>
                            <View>
                                <Text style={{ color:'#146ECB'}}>{item.userFullName}</Text>
                            </View>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Text style={{marginLeft:28,fontSize:18,marginTop:10,color:"#4B4F56",backgroundColor:"#F8F8FA"}}>
                                {item.comment}
                            </Text>
                        </Col>
                    </Row>

                {item.img_src &&
                    <Row>
                        <Col style={{alignItems:"center"}}>
                        <Image source={{uri: IMAGE_URL + item.img_src}}  style={Styles.addPhoto}  />
                        </Col>
                    </Row>}
                </View>
            </View>
        )
    }

    const share = async(item) => {
        setLoding(true)
        let user = await AsyncStorage.getItem("loginData");
        let lang = await AsyncStorage.getItem("lang")
        if(lang!=null){
            lang = JSON.parse(lang)
        }
        else{
            lang = 1
        }
        
        if(user!=null){
            user = JSON.parse(user);
            let req = {UserId: user.currentUserID, LanguageId: lang, refreshToken: user.refreshToken, token: user.accessToken, ids: [item]}
            let api = new CommunityService();
            api.share(req).then(res=>res.json()).then(res=>{
                setLoding(false)
                let returnStatus = res.returnStatus;
                if(returnStatus.returnCode == 200){
                    Share.share({
                        message: user.userSession.fullName + ' shared you an article. Check at ' + res.pdfLink,
                        url: res.pdfLink
                    })
                }
                else{
                    Alert.alert("Error", returnStatus.returnMessage, [{
                        text: "Ok"
                    }])
                }
            })
        }
    }

    const LoadingIndicator = (props) => (
        <View style={ Styles.indicator}>
         <Image source={loader.white}  />
        </View>
    );
    const submitComment = async() =>{
        setLoding(true)
        let api = new CommunityService();
        let user = await AsyncStorage.getItem("loginData")
        user = JSON.parse(user)
        let req = {
            token: user.accessToken,
            refreshToken: user.refreshToken,
            ArticleComment:{
                UserId: user.currentUserID,
                ArticleId: props.articalid,
                Comment: comment,
                Image: file[0].File == undefined ? null : file[0].File 
            }
        }
        let res = await api.submitComment(req).then(res=>res.json())
        console.warn("res",res)
        props.refreshComments()
    }
    const renderAddPhoto=()=>{
        return(
            <TouchableOpacity
                accessoryLeft={()=>loading?LoadingIndicator():null} 
                onPress={()=>setVisible(true)} appearance="primary" status="primary" 
                size="large" block>
                { !loading && <Icon name="camera" style={{color: '#000', fontSize: 32}} />}</TouchableOpacity>
        )
    }
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
          }
        });
      }
  
      const openCamera=()=>{
        ImagePicker.launchCamera(options, (response) => {
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

    const removeImage = (image) => {
      
        let i = file.indexOf(image)
        let f = [...file];
        f.splice(i, 1);
        setFile(f);
      }

    const renderAddComment=()=>{
        return(
            <Button title="send"
            accessoryLeft={() => (loading ? LoadingIndicator() : null)}
            onPress={()=> !loading && submitComment() }/>
        )
    }

    return (
        <View style={{ height: '98%', backgroundColor: '#fff',borderTopLeftRadius:20, borderTopRightRadius:20,backgroundColor:theme.colors.white} }>
            <KeyboardAwareScrollView contentOffset={120}>
                <View style={[styles.container,{borderTopLeftRadius:20, borderTopRightRadius:20}]}>
                <View style={[styles.mainContainer,{borderTopLeftRadius:20, borderTopRightRadius:20}]}>
                        <Text style={{color:"#146ECB", fontSize: 18}}>
                            <CommentIcon name="commenting-o" type="FontAwesome" style={{fontSize:18,color:"#146ECB"}} />
                            {' '} Comment
                        </Text>
                    <View>
                        <TouchableOpacity onPress={props.close}>
                            <Icon name="close" size={30} color={theme.colors.black} />
                        </TouchableOpacity>
                    </View>
                </View>
                </View>
                {List.length > 0 &&
                    <FlatList
                        data={List} 
                        renderItem={renderRow}
                        refreshControl={
                            <RefreshControl onRefresh={props.refreshComments} refreshing={loading} />
                        }
                        /> 
                }
                {List.length == 0 &&
                    <View style={Styles.heartContainer}>
                        <Image source={icons.heart} style={Styles.heart}  />
                        <Text style={Styles.text}>No Comments, Be the first to comment!</Text>
                    </View>
                }
                
            </KeyboardAwareScrollView>
            <View style={{ flexDirection:"row", paddingHorizontal: 5, borderTopWidth:1, borderTopColor:theme.colors.grey}}>
            {file != '' && (
                    <TouchableOpacity onPress={() => removeImage(file)} style={{width:40,height:40,padding:5, marginRight:5}}>
                        <Image source={file} style={{resizeMode:"cover",height:40,width:40}}/>
                        <Icon name="close" style={{position: 'absolute', top: 10, right: 5}}/>
                    </TouchableOpacity>
                      )}
            <Input
                placeholder="Write a comment…"
                textStyle={{color:theme.colors.black}}
                onChangeText={(comment)=>setComment(comment)}
                style={Styles.inputField}
                value={comment}
                type="basic"
                accessoryLeft={renderAddPhoto}
                accessoryRight={renderAddComment}
                />
            </View>
            <Modal transparent={true} visible={visible} animated={true} onRequestClose={()=>setVisible(false)} >
                <View style={{ flex:1, backgroundColor:'rgba(0,0,0,0.3)'}}>
                    <View style={{position:"absolute", bottom:0, height:hp("20%"), width:wp("90%"),margin:20, backgroundColor:theme.colors.white, justifyContent: 'flex-end'}}>
                        <Text style={{alignSelf:"center", position:"absolute" , top:0, marginTop:10, fontSize:20}}>Add Photo</Text>
                        <View style={{flexDirection:"row", marginTop:20, alignContent:"center", justifyContent:"center", height:hp("15%")}}>
                            <TouchableOpacity onPress={()=>openImageLibrary()} style={{flex:1, margin:25, backgroundColor:"#F8F8FA", borderRadius:28, justifyContent:"center"}} >
                                <Icon name="image" style={{alignSelf:"center", color: '#000', fontSize: 32}} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>openCamera()} style={{flex:1, margin:25, backgroundColor:"#F8F8FA", borderRadius:28, justifyContent:"center"}} >
                                <Icon name="camera" style={{alignSelf:"center", color: '#000', fontSize: 32}} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    
    )
}
const styles = StyleSheet.create({
    container:{
        width:wp('100%'),
        height:wp('16%'),
        overflow:'hidden',
    },
    mainContainer: {
        flex:1,
        backgroundColor:theme.colors.white,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems: "center",
        paddingHorizontal:wp('4%'),
        borderBottomWidth:1,
        borderBottomColor:theme.colors.grey
    },

    backIcon:{
        resizeMode:"contain",
        height:wp('9%'),
        width:wp('9%'),
    },
    leftContainer:{
        flexDirection:"row",
        alignItems:"center"
    },
    title:{
        color:theme.colors.white,
        fontFamily:"OpenSans-Bold",
        fontSize:wp('5%'),
        paddingLeft:wp('3%')
    }


})
