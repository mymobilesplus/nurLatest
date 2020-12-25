import React, { useEffect, useState } from 'react'
import { View, Text,Image,TouchableOpacity, Modal, Share, Alert, StyleSheet} from 'react-native'
import {Styles} from "./Style/_Community"
import {theme,images} from "../../constants"
import {Button, Layout, Popover} from "@ui-kitten/components"
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from "react-native-responsive-screen"
import { Row, Col, Container, Content, Icon, Input } from 'native-base';
import { ActivityIndicator } from 'react-native-paper';
import TimeAgo from 'react-native-timeago';
import { useRoute } from '@react-navigation/native';
import { IMAGE_URL } from '../../API_URI';
import CommunityService from '../../services/CommunityService';
import AsyncStorage from '@react-native-community/async-storage';
import Comments from './Comments';
import CommunityStackHeader from '../../components/header/CommunityStackHeader';
import Entypo from "react-native-vector-icons/Entypo"

const{icons}=images

export default function CommunityDetail(props) {
    const [visible, setVisible] = React.useState(0);
    const [topic, setTopic] = React.useState(undefined);
    const [loader, setLoding]= React.useState(true);
    const[showComments, setShowComments] = React.useState(false)
    const[message, setMessage] = useState("")
    const[showReport, setShowReport] = useState(false)

    const route = useRoute()
    useEffect(() => {
        // code to run on component mount
        getByArticle()
      }, [])

    const getByArticle = async() =>{
        props.navigation.setOptions({
            headerTitle: () => (
              <CommunityStackHeader
                {...props}
                title="Fetching Details..."
                useSearch={false}
              />
            ),
          });
        setLoding(true)
        let user = await AsyncStorage.getItem("loginData");
        let lang = await AsyncStorage.getItem("lang")
        let topic = props.route.params.topic;
        if(lang!=null){
            lang = JSON.parse(lang)
        }
        else{
            lang = 1
        }
        
        if(user!=null){

            user = JSON.parse(user);
            let api = new CommunityService();
            api.getByArticle({ id: topic.id, UserId: user.currentUserID, LanguageId: lang, token: user.accessToken}).then(res=>res.json()).then(res=>{
                
                if(res.article != undefined){
                    let records = res.article;
                    setTopic(records);
                    props.navigation.setOptions({
                        headerTitle: () => (
                          <CommunityStackHeader
                            {...props}
                            records={records}
                            title="Community"
                            useSearch={false}
                          />
                        ),
                      });
                }
                setLoding(false)
            })
        }
    }

    const markLike = async(item) => {
        setLoding(true)
        let user = JSON.parse(await AsyncStorage.getItem("loginData"))
        let lang = JSON.parse(await AsyncStorage.getItem("lang"))
        let req = {
            UserId: user.currentUserID,
            ArticleId: item.id,
            token: user.accessToken
        }
        let api = new CommunityService()
        let res = await api.markArticleLike(req).then(res=>res.json())
        getByArticle()
        setLoding(false)
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
    const report = async(id,message) => {
        setLoding(true)
        let user = await AsyncStorage.getItem("loginData");
        
        if(user!=null){
            user = JSON.parse(user);
            let req = {"ReportLog":{
                UserID: user.currentUserID, TableName: "Article", refreshToken: user.refreshToken, token: user.accessToken, RecordId: id, Message : message
            }}
            let api = new CommunityService();
            console.warn("req",req)
            api.report(req).then(res=>res.json()).then(res=>{
                console.warn(res)
                Alert.alert("Report sent", "Thanks for sending to us.")
                setVisible(false)
                let returnStatus = res.returnStatus;
                if(returnStatus.returnCode == 200){
                }
            }).catch(e=>console.warn(e))
            setLoding(false)
        }
    }
    const menuIcon=(id)=>(
        <Entypo name="dots-three-vertical" size={24} color={theme.colors.dark}  onPress={() =>{console.warn("ids",id); setVisible(id)}} />
    )
    const renderDrowMenu=(id)=>{
        return(
            <View>
            <Layout  level='1'>
                <Popover
                    backdropStyle={Styles.backdrop}
                    visible={visible == id}
                    anchor={()=>menuIcon(id)}
                    onBackdropPress={() => setVisible(false)}>
                    <Layout style={{elevation:4}}>
                        <View>
                            <Text 
                            onPress={()=>setShowReport(true)}
                             style={{ padding: 10, paddingHorizontal: 10, fontSize: 16}}>
                                <Icon name="zap" type="Feather" style={{fontSize: 20}}></Icon> {' '}
                                Report this
                            </Text>
                        </View>
                    </Layout>
                </Popover>
            </Layout>
            </View>
        )
    }

    return (
        <Container style={{flex:1, justifyContent: 'center'}}>
            {loader &&
                <ActivityIndicator size="large" color={theme.colors.primary} />
            }
            {!loader && 
                <Container style={{backgroundColor:'#f5f5f5'}}>
                    <Content>
                        <View style={{ margin: 7, padding:11, backgroundColor:theme.colors.white}}>
                            <Row style={{marginTop:13}} >
                                <Col style={Styles.topicTitleContainer}>
                                    <Text style={Styles.topicTitle}>{topic.topicTitle}</Text>
                                </Col>
                                <Col style={{fontSize:14 ,position:"absolute",right:0 ,flexDirection:"row" ,paddingRight:10, alignItems:'center'}}>
                                    <Text>+{topic.likesCount} 
                                     </Text>
                                     <Icon name='heart' type='FontAwesome' style={{marginHorizontal:5, color:"#DB3872" ,fontSize:26}} />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Text style={{fontSize:20, marginTop:10}}>
                                        {topic.description}
                                    </Text>
                                </Col>
                                
                            </Row>
                            <Row style={{height:28, alignItems:"center",marginVertical:5}}>
                                <Col style={{flex:0.1}}>
                                    <Text style={{color:theme.colors.grey, fontWeight:"500"}}>By</Text>
                                </Col>
                                <Col style={{flex:0.1}}>
                                    {topic.authorImage != null ? <Image source={{uri: IMAGE_URL + topic.authorImage}} style={{ borderRadius:14, height:28, width:28 ,backgroundColor:theme.colors.grey, alignSelf:"center"}}/>:
                                    <View style={{ borderRadius:14, height:28, width:28 ,backgroundColor:theme.colors.background, alignSelf:"center"}}  />   
                                     }
                                </Col>
                                <Col style={{marginHorizontal:10, alignItems:'flex-start', flex:0.4}}>
                                    <TouchableOpacity onPress={()=>{props.navigation.navigate('Publisher', {author: topic.createUserID , authorName: topic.authorName})}}>
                                        <Text style={{color:'#146ECB'}}>{topic.authorName}</Text>
                                    </TouchableOpacity>
                                </Col>
                                <Col style={{flex:0.7}}>
                                    <TimeAgo fontWeight="500" style={{color:theme.colors.grey}} time={topic.dateCreated} />
                                </Col>
                                <Col  style={{flex:0.1, alignItems:'flex-end'}}>
                                    <TouchableOpacity>
                                        {renderDrowMenu(topic.id)}
                                    </TouchableOpacity>
                                </Col>

                            </Row>
                            <Row style={{justifyContent: 'center', width:wp("90%"),height:hp("20%")}}>
                                <Col style={{justifyContent: 'center'}}>
                                    {(!topic.img_src)?
                                    <View style={{width:'100%',height:"100%", backgroundColor:"#f1f1f1", justifyContent:"center"}}>
                                        <Icon name="image" style={{alignSelf:"center", color: 'white', fontSize: 32}} />
                                    </View> :
                                    <Image source={{uri: IMAGE_URL + topic.img_src}}  style={{width:'100%', height:hp("20%"), resizeMode: 'stretch'}}  /> 
                                    }
                                </Col>
                            </Row>
                            <Row style={{marginTop:10, marginBottom:10}}>
                                <Col >
                                <Text style={{fontSize:16, color:theme.colors.grey}}>{topic.description}</Text>
                                </Col>
                            </Row>
                        </View>
                        <Row>
                            <Col style={{borderWidth:1, borderColor:'#146ECB', padding:10, alignItems:'center', marginHorizontal:wp("2%"), marginTop:5}}>
                                <TouchableOpacity onPress={()=>{props.navigation.navigate('Comments', {Comments: topic.comments,articalid: topic.id})}}>
                                    <Text style={{fontSize:20, lineHeight:50, color:'#146ECB'}}>See {topic.commentsCount} Responses</Text>
                                </TouchableOpacity>
                            </Col>
                        </Row>
            
                    </Content>
                    <Modal transparent={true}  visible={showComments} animated={true} onRequestClose={()=>setShowComments(false)} >
                        <View style={{flex: 1, backgroundColor:'rgba(0,0,0,0.3)', justifyContent: 'flex-end'}}>
                            <Comments articalid={topic.id} close={()=>{console.log("Calling");setShowComments(false)}} comments={topic.comments} refreshComments={()=>{setShowComments(false); getByArticle()}} />
                        </View>
                    </Modal>
                </Container>
            }
            <Row style={{position:'absolute', bottom:0, backgroundColor:theme.colors.white, alignItems : 'center'}}>
            <Col style={{padding:0,margin:0, flex:1}}>
                    <Button onPress={()=>markLike(topic)} style={{flex:1,backgroundColor:'transparent', borderWidth:0}}>
                        <Text style={{color:"#146ECB", fontSize: 18, fontFamily:"AvenirNextCondensed-Medium"}}>
                            <Icon name="heart-o" type="FontAwesome" style={{fontSize:18,color:"#146ECB"}} />
                            {' '} Like
                        </Text>
                    </Button>
                </Col>
                <Col style={{padding:0,margin:0, flex:1.45, paddingBottom : 2}}>
                    <Button onPress={()=>setShowComments(true)} style={{backgroundColor:'transparent', borderWidth:0}}>
                        <Text style={{color:"#146ECB", width: '100%', fontSize: 18, fontFamily:"AvenirNextCondensed-Medium"}}>
                            <Icon name="commenting-o" type="FontAwesome" style={{fontSize:18,color:"#146ECB"}} />
                            {' '} Comment
                        </Text>
                    </Button>
                </Col>
                <Col style={{padding:0,margin:0, flex:1.1}}>
                    <Button onPress={()=>share(topic.id)} style={{flex:1,backgroundColor:'transparent', borderWidth:0}}>
                        <Text style={{color:"#146ECB", fontSize: 18, fontFamily:"AvenirNextCondensed-Medium"}}>
                            <Icon name="share-alt" type="FontAwesome" style={{fontSize:18,color:"#146ECB"}} />
                            {' '} Share
                        </Text>
                    </Button>
                </Col>
            </Row>
            {showReport && 
            <Modal style={{borderWidth:1}} transparent={true} onRequestClose={()=>setShowReport(false)}> 
                <View style={styles.modal}>
                    <View>
                    <Text style={styles.heading}>Report</Text>
                      <Input value={message} onChangeText={setMessage}/>
                    </View>
                    <View style={{flex:1}}>

                      <Input placeholder='Enter message...' value={message} onChangeText={(text)=>setMessage(text)} style={{flex:1, height:50}} multiline={true} numberOfLines={7} />
                    </View>

                    <View style={styles.okContainer}>
                        <TouchableOpacity onPress={()=>{setShowReport(false); report((topic.id),message)}}>
                            <Text style={styles.ok}>Send</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>}
            
        </Container>
    
    )
}
const styles=StyleSheet.create(
    { 

        modal:{
            backgroundColor:"#FFFFFF",
            borderRadius:10,
            padding:20,
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
