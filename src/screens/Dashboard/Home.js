import React,{useEffect,useState} from 'react'
import { View, Text ,KeyboardAvoidingView, Modal, TouchableOpacity, Image} from 'react-native'
import Slider from "../../components/Slider/Slider"
import Cards from "./components/Cards"
import TextArea from "./components/TextArea"
import {Styles} from "./Style/_HomeStyle"
import {LifeTimeModal} from "../../components/Modal/Modal"
import {connect} from "react-redux"
import AsyncStorage from '@react-native-community/async-storage';
import Header from "../../components/header/Header" 
import { Col, Row } from 'native-base'
import { useFocusEffect } from '@react-navigation/native'
import { icons } from '../../constants/images'
import langjson from "../../constants/lang.json"
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification'
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from "react-native-responsive-screen"
import { getAlarms } from 'react-native-simple-alarm';
import { I18nManager } from 'react-native';
import AuthService from '../../services/AuthService'
import ID from "../../constants/constant.json"

const Home = (props) => {
    const [show,setShow]=useState(false)
    const [update, setUpdate] = useState(false)
    const [healthComplaint, setModal] = useState(false)
    const [language, setLang, updatelang] = useState(1)
    const [remindersCount,setRemindersCount]=useState(0)
    const [notificationsCount,setNotificationsCount]=useState(0)

    const getReminders = async() => {
        try {
            const alarms = await getAlarms();
            setRemindersCount(alarms.length)
        } catch (e) {
            console.warn("error",e)}
    }
    const refreshAccessToken = async ()=>{

        let auth = new AuthService()
        let refreshToken = ""
        let user = await AsyncStorage.getItem('loginData');
        if (user != null) {
            user = JSON.parse(user);
            refreshToken = user.refreshToken
        }
        auth.login({grant_type:"refresh_token",client_id: ID.clientId, refresh_token: refreshToken}).then(res=>res.json()).then(res=>{
            if(res.message!=null){
                console.warn("res",res)
                return;
            }
            user.accessToken = res.accessToken
            user.refreshToken = res.refreshToken
            console.warn("tokenrefreshed",res)
            AsyncStorage.setItem("loginData", JSON.stringify(user)).then(()=>{
                console.warn("dist",res)
            });
        })
    }

    const getNotifications = async() =>{
        let noti = await AsyncStorage.getItem("notifications")
        if(noti != null){
            noti = JSON.parse(noti)
            setNotificationsCount(noti.length)
        }
    }

    const showModalOnce=async()=>{
        try {
            await AsyncStorage.getItem('loginData').then(res=> {
                console.warn("loginData", JSON.parse(res));
                if(res == null || res == undefined){
                    setShow(true)
                } else{
                    let showDisclaimer = JSON.parse(res)
                    console.warn("dont show disclaimer",showDisclaimer.userSession.isShowDisclaimer)
                    if(showDisclaimer.userSession.isShowDisclaimer !== true){
                        console.warn("show disclaimer")
                        setShow(true)
                    } else {
                        setShow(false)
                    }
                }
            })
        } catch (error) {
            console.warn("e",error)
        }
    }
        const getDeviceID=async()=>{

        try{
            await AsyncStorage.getItem('_DEVICE_ID_').then(res=>{
                console.warn('DEVICE ID in Home: ',res)
                if(res==null || res ==undefined){
                    setShow(true)
                }
            })
          
        }
        catch(e){
            console.log("Unable to fetch Device ID",e)
        } 
    }

    useEffect(()=>{
        showModalOnce()
        // refreshAccessToken()
        // setInterval(refreshAccessToken,3540000)
        getDeviceID()
        getLang()
        getReminders()
        getNotifications()
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            let notifications = await AsyncStorage.getItem("notifications")
            let id = 0;
            if(notifications == null){
                notifications = [];
                id = 1;
            }
            else{
                notifications = JSON.parse(notifications)
                id = notifications.length + 1;
            }
            let notification = {
                id,
                title: remoteMessage.notification.title,
                body: remoteMessage.notification.body,
                actions: remoteMessage.notification.actions,
            }
            notifications.push(notification)
            await AsyncStorage.setItem("notifications", JSON.stringify(notifications))
            let n = await AsyncStorage.getItem("notification")
            if(n != null){
                n = JSON.parse(n)
                if(!n){
                    return;
                }
            }
            PushNotification.localNotification({
                /* Android Only Properties */
                title: remoteMessage.notification.title, // (optional)
                message: remoteMessage.notification.body, // (required)
                actions: remoteMessage.notification.actions,
            });
            
        });
    
        return unsubscribe;
    },[remindersCount,setLang])   

    useFocusEffect(React.useCallback(() => {
        getLang();
        setUpdate(true)
        console.log('hello ');
    }, []));

    let getLang = ()=>{
        AsyncStorage.getItem("lang").then(lang=>{
            if(lang!==null){
                setLang(lang)
                if (lang ==2 ){
                    I18nManager.forceRTL(true);
                } else {
                    I18nManager.forceRTL(false);
                }
            }
        })
    }
    const renderAddPhoto=()=>{
        return(
            <View style={{justifyContent: 'flex-end',borderRadius:10}}>
                <Image source={icons.AddPhoto} style={[Styles.addPhoto,{borderRadius:10}]} />
            </View>
        )
    }

    const requestUserPermission = async() => {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            console.log('Authorization status:', authStatus);
        }
    }

    return (
        <KeyboardAvoidingView behavior="position" style={{flex:1}} keyboardVerticalOffset={90}  >
                <View style={[
                    Styles.mainContainer,
                    {
                        paddingLeft:0,
                        marginLeft:0
                    }]}>
                    <Header {...props} remindersCount={remindersCount} notificationsCount={notificationsCount} />
                    <View style={Styles.slider}> 
                    <Slider update={update} setUpdate={()=>setUpdate(false)}/>
                </View>
                <View style={[Styles.cards]}>
                    <Cards style={{elevation: 4}}/>   
                    {show && <LifeTimeModal setShow={setShow}/>} 
                </View>
                <View
                    style={{
                        marginBottom:hp('2%'),
                        height:hp('3%'),
                        paddingHorizontal:30,
                    }}
                    >
                    <Text 
                    style={[
                            Styles.text,
                            {
                                fontFamily:"OpenSansCondensed-Light",
                                fontSize:16,
                                fontWeight:'bold',
                            }
                        ]}>
                        {langjson.lang[language-1].complaintnote}
                    </Text>
                </View>
                <View
                    style={{
                        marginLeft:10, 
                        marginRight:10,
                        marginBottom:10,
                        borderRadius:10,
                    }}
                    >
                <TouchableOpacity 
                    onPress={()=>setModal(true)} 
                    style={[
                        Styles.textArea,
                    ]}>
                    <View 
                        style={[
                            Styles.textContainer,
                        ]}>
                        <Row 
                            style={{ 
                                backgroundColor: 'white',
                                justifyContent:'center',
                                paddingLeft:10,
                                paddingRight:10,
                                paddingTop:10, 
                                borderRadius:10, 
                                elevation:4
                            }}>
                            <Col style={{width: '80%'}}>
                                <Text 
                                    style={
                                        {
                                            fontFamily:"OpenSansCondensed-Light",
                                            fontSize:18,
                                            color:'#000'
                                        }
                                    }
                                    >{langjson.lang[language-1].write}
                                </Text>
                            </Col>   
                            <Col
                                style={{
                                    alignItems:'center',
                                }}
                                >
                                {renderAddPhoto()}
                            </Col>
                        </Row>
                    </View>
                </TouchableOpacity>
                </View>
                </View>
            <Modal animated={true} visible={healthComplaint} transparent onRequestClose={()=>setModal(false)}>
                <View style={{backgroundColor: '#e9e9e9', flex: 1, marginTop:20}}>
                    <TextArea onClose={()=>setModal(false)} />
                </View>
            </Modal>
        </KeyboardAvoidingView>
    )
}


const mapStateToProps=(state)=>{
    return{
        _DEVICE_ID:state.DeviceInfoReducer._DEVICE_ID
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)
