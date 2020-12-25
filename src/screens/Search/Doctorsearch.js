import React, { useState, useEffect } from 'react'
import { 
    View, 
    Text, 
    TouchableOpacity, 
    ActivityIndicator, 
    FlatList, 
    RefreshControl,
    StyleSheet,
    Alert,
    Share,
    ScrollView
} from 'react-native'   
// alert('shjhsdkhjb');
import { Styles } from "./Styles/Doctorstyles"
import { theme } from "../../constants"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen"
import { Popover, Layout } from '@ui-kitten/components'
import { Row, Col, Icon, Container, Toast, Input } from "native-base"
import SearchDoctorApiService from "../../services/SearchDoctorApiService"
import langjson from "../../constants/lang.json"
import AsyncStorage from '@react-native-community/async-storage'
import DoctorApiService from '../../services/DocotoApiService'
import Entypo from "react-native-vector-icons/Entypo"
import { Modal } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { Switch } from 'react-native-switch';
navigator.geolocation = require('@react-native-community/geolocation');
import Axios from 'axios'
import { I18nManager } from 'react-native'
import { Translator } from '../../constants/translator'
import { Dimensions } from 'react-native'

export default function Doctorsearch(props) {
    const [List, setList] = useState([])
    let [FilterList, setFilterList] = useState([])
    const [loader, setLoding] = React.useState(true);
    const [toggle,setToggle] = React.useState(false)
    const [visible, setVisible] = React.useState(0);
    const[message, setMessage] = useState("")
    const[currentCountry, setCurrentCountry] = useState("LEB")
    const[showReport, setShowReport] = useState(false)
    const [savedDoctors, setSavedDoctors] = useState([]);
    const getLocation = async ()=>{
            Axios.get('https://ipapi.co/json/').then((response) => {
                let data = response.data;
                // setCurrentCountry(data.country_name.substring(0, 3).toUpperCase())
                setCurrentCountry("LEB")
                console.warn(data.country_name.substring(0, 3).toUpperCase())
                // searchdoctor(toggle, data.country_name.substring(0, 3).toUpperCase());
                searchdoctor(toggle,'LEB');
                getMembers();
            }).catch((error) => {
                console.log(error);
            });
    }
    const getMembers = async() =>{
        // setLoding(true);
        let user = await AsyncStorage.getItem("loginData");
        if(user!=null){
            user = JSON.parse(user);
            let api = new DoctorApiService()
            api.getSavedDoctors({UserId: user.currentUserID, token: user.accessToken,LanguageId: I18nManager.isRTL ? 2 : 1 }).then(res=>res.json()).then(res=>{
                // console.log(res);
                // alert(JSON.stringify(res));
                console.log('saved doctors ', res);
                // setLoding(false)
                if(res.favoriteDoctors != undefined){
                    let records = res.favoriteDoctors;
                    setSavedDoctors(records);
                    setLoding(false);
                    // setMembersList(records);
                    // setFilterList(records)
                }
                
            })
        }
    }
    useEffect(() => {
        // alert('jhbj')
        getLocation();
    }, [props.route.params.sid])
    const searchdoctor = async (val,code) => {
        setLoding(true)
        // await getLocation();
        let user = await AsyncStorage.getItem("loginData");
        if (user != null) {
            user = JSON.parse(user);
            let api = new SearchDoctorApiService();
            if(val == true) {
                await navigator.geolocation.getCurrentPosition(
                        position => {
                            const location = JSON.stringify(position);
                            console.warn("position",position) 
                            let req = {
                                LanguageId: 1,
                                token: user.accessToken,
                                Id: props.route.params.sid,
                                Longitude: position.coords.latitude,             
                                Latitude: position.coords.latitude,     
                                Radius: 2000           
                            }
                            api.searchneardoctor(req).then(res => res.json()).then(res => {
                                setLoding(false)
                                if (res.doctors != undefined) {
                                    let records = res.doctors;
                                    setList(records);
                                    setFilterList(records)
                                }
                            })
                        },
                        error => Alert.alert(error.message),
                        { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
                    );
            } else {
                let req = {
                    LanguageId: I18nManager.isRTL ? 2 : 1,
                    token: user.accessToken,
                    Id: props.route.params.sid,
                    CountryCode: code
                }
                // alert('countryCode' + code);
                api.searchdoctor(req).then(res => res.json()).then(res => {
                    // alert(JSON.stringify(res));
                    console.log('doctors list', res);
                    console.warn(res);
                    setLoding(false)
                    if(res.returnStatus.returnCode==203){
                        Alert.alert("No Doctors Found",res.returnStatus.returnMessage)
                    }
                    if (res.doctors != undefined) {
                        let records = res.doctors;
                        setList(records);
                        setFilterList(records)
                    }
                })
            
            }
        }
    }

    const menuIcon = (id) => (
        <TouchableOpacity onPress={() => setVisible(id)} style={{height:30,width:30,alignItems:"flex-end",paddingLeft:10}}>
            <Entypo name="dots-three-vertical" size={16} color={theme.colors.dark}  />
        </TouchableOpacity>
    )

    const report = async(id,message) => {
        setLoding(true)
        let user = await AsyncStorage.getItem("loginData");
        
        if(user!=null){
            user = JSON.parse(user);
            let req = {"ReportLog":{
                UserID: user.currentUserID, TableName: "Doctor", refreshToken: user.refreshToken, token: user.accessToken, RecordId: id, Message : message
            }}
            let api = new SearchDoctorApiService();
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

    const renderDrowMenu = (id) => {
        return (
            <Layout level='1'>
                <Popover
                    backdropStyle={Styles.backdrop}
                    visible={visible == id}
                    anchor={() => menuIcon(id)}
                    onBackdropPress={() => setVisible(false)}
                >
                    <Layout style={{ marginRight: 50 }}>
                        <View style={{ width: 200 }}>
                            <Text onPress={() => { setVisible(false); saveDoctor({ id }) }}
                                style={{ padding: 10, paddingHorizontal: 20, fontSize: 16, color: '#596377'}}>
                                <Icon name="floppy-o" type="FontAwesome" style={{ fontSize: 14 }}></Icon> {' '}
                                    Save
                                </Text>
                            <View style={{ height: 0.5, width: 250, backgroundColor: "#8A92A3" }}></View>
                            <Text onPress={() => { shareDoctor({ id }) }}
                                style={{ padding: 10, paddingHorizontal: 20, fontSize: 16, color: '#596377' }}>
                                <Icon name="share-2" type="Feather" style={{ fontSize: 14 }}></Icon> {' '}
                                    Share
                                </Text>
                                <View style={{ height: 0.5, width: 250, backgroundColor: "#8A92A3" }}></View>
                                <Text onPress={() => { setShowReport(true) }}
                                style={{ padding: 10, paddingHorizontal: 20, fontSize: 16, color: '#596377' }}>
                                <Icon name="zap" type="Feather" style={{ fontSize: 14 }}></Icon> {' '}
                                    Report
                                </Text>
                        </View>
                    </Layout>
                </Popover>
            </Layout>
      )
    }

    const [language, setLang, updatelang] = useState(1)
    useEffect(() => {
        AsyncStorage.getItem("lang").then(lang => {
            if (lang != null) {
                setLang(lang)
            }
        })
    })

    const filterDoctor = (text) => {
        text = text.toLowerCase()
        let l = List.filter(x => {
            let { streetLine1, streetNumName, village } = x
            return streetLine1.toLowerCase().includes(text)
                || streetNumName.toLowerCase().includes(text)
                || village.toLowerCase().includes(text)
        });
        setFilterList(l)
    }

    const saveDoctor = async (item) => {
        setLoding(true)
        let api = new DoctorApiService()
        let user = JSON.parse(await AsyncStorage.getItem("loginData"))
        let req = {
            DoctorId: item.id,
            UserId: user.currentUserID,
            token: user.accessToken,
            refreshToken: user.refreshToken
        }
        let res = await api.saveDoctor(req).then(res => res.json()).then(()=>{
            getMembers();
        })
        Toast.show({
            text: res.returnStatus.returnMessage,
            buttonText: "Okay!",
        });
        setLoding(false)
    }

    const shareDoctor = async (item) => {
        setLoding(true)
        let api = new DoctorApiService()
        let user = JSON.parse(await AsyncStorage.getItem("loginData"))
        let req = {
            Ids: [item.id],
            UserId: user.currentUserID,
            token: user.accessToken,
            refreshToken: user.refreshToken,
            LanguageId: 1
        }
        let res = await api.shareDoctor(req).then(res => res.json())
        setLoding(false)
        Share.share({
            message: user.userSession.fullName + ' shared you doctor details. Check at ' + res.pdfLink,
            url: res.pdfLink
        })
    }
    const isDoctorSaved=(item)=>{
        if(savedDoctors.length>0){
            if(savedDoctors.filter((obj)=> obj.id==item.id).length>0){
                return true;
            }
            else{
                return false;
            }
            
        }
        else{
            return true;
        }
    }
    const renderRow = ({ item, index }) => {
        return (
            <>
            <TouchableOpacity onPress={() => props.navigation.navigate('doctordetail', { doctor: item , saveDoctor, shareDoctor, description:props.route.params.description, report })}
                key={index} style={{ borderTopWidth: 1, borderTopColor: '#aaa', padding: 10, backgroundColor: '#fff'}} >
                <View style={{ width: '100%'}}>
                    <View style={{ width: '100%', flexDirection: 'row'}}>
                        <View style={{ justifyContent: 'center'}}>
                            <Text style={{ fontSize: 20, paddingLeft: 10, fontFamily: "OpenSans-SemiBold", lineHeight:27 }}>{item.firstname + " " + item.lastname}</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                            <TouchableOpacity>{renderDrowMenu(item.id)}</TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ width: '100%', flexDirection: 'row'}}>
                        <View style={{ }} >
                            {item.specialties.length == 0? <Text style={{ fontSize: 18, paddingLeft: 10, marginBottom:7, fontFamily: "OpenSans-SemiBold", lineHeight:22, color:"#596377"}}>{props.route.params.name}</Text>
                            :
                            <Text style={{ fontSize: 18, paddingLeft: 10, marginBottom:7, fontFamily: "OpenSans-SemiBold", lineHeight:22, color:"#596377"}}>{item.specialties.map(s => {s.title + ","})}</Text>}
                        </View>
                    </View>
                    <View style={{ width: '100%', flexDirection: 'row'}} >
                        <View style={{ justifyContent: 'center' }} >
                            <Text style={{ fontSize: 16, paddingLeft: 10, fontFamily: "OpenSans-SemiBold", lineHeight:22}}>
                                <Icon name="map-marker" type="FontAwesome" style={{ fontSize: 16, color: '#4B4F56' }} />  Clinic</Text>
                            <Text style={{ fontSize: 16, paddingLeft: 26,  color: '#596377', lineHeight:22 }}>
                            {
                                [item.streetLine1,item.streetNumName, item.village].filter((obj)=> obj!=null && obj!=undefined && obj!="").join(",")
                            }
                                {/* {item.streetLine1} {item.streetNumName}, {item.village} */}
                            </Text>
                        </View>
                    </View>
                    <View style={{ width: '100%', flexDirection: 'row', justifyContent : 'space-between' }} >
                        <View style={{ justifyContent: 'center', flex:0.8 }} >
                            <Text style={{ fontSize: 16, paddingLeft: 26, color: '#596377', lineHeight:22 }}>{item.address}</Text>
                        </View>
                        <View style={{justifyContent: 'center', alignItems: 'flex-end', flex:0.2 }} >
                            <Icon 
                            onPress={() => isDoctorSaved(item) ? alert('Doctor already saved ') : saveDoctor(item)} 
                            // onPress={()=>alert(JSON.stringify(item))}
                            // name="bookmark-o" 
                            name={isDoctorSaved(item) ? 'bookmark' : 'bookmark-o'}
                            type="FontAwesome" 
                            style={{ fontSize: 20, color: '#000' }} 
                            />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
            {showReport && 
                <Modal style={{borderWidth:1}} transparent={true} onRequestClose={()=>setShowReport(false)}> 
                    <View style={styles.modal}>
                        <View>
                        <Text style={styles.heading}>Report</Text>
                        </View>
                        <View style={{flex:1}}>
                            <Input placeholder='Enter message...' value={message} onChangeText={(text)=>setMessage(text)} style={{flex:1, height:50}} multiline={true} numberOfLines={7} />
                        </View>
                        <View style={styles.okContainer}>
                            <TouchableOpacity onPress={()=>{setShowReport(false); report(item.id,message)}}>
                                <Text style={styles.ok}>Send</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>}
                </>
        )
    }
    // return(
    //     <View >
    //         {FilterList.length > 0 &&
    //                 <FlatList
    //                     data={FilterList.concat(FilterList)}
    //                     renderItem={renderRow}
    //                     showsHorizontalScrollIndicator={false}
    //                     showsVerticalScrollIndicator={false}
    //                     refreshControl={
    //                         <RefreshControl onRefresh={props.refreshList} refreshing={loader} />
    //                     }
    //                     style={{
    //                         marginBottom: 30
    //                     }}
                        
    //                 />
    //             }
    //             {loader && FilterList.length == 0 &&
    //                 <ActivityIndicator size="large" color={theme.colors.primary} />
    //             }
    //     </View>
    // )
    return (
        <Container style={[Styles.mainContainer]}>
            <ScrollView style={{ paddingHorizontal: 20 }}>
                <View style={Styles.addNewMemberContainer}>
                    <Row>
                        <Col style={{ alignItems: 'flex-start', marginVertical: 12 }}>
                            <Icon onPress={() => props.navigation.goBack(null)} name= {I18nManager.isRTL ? "arrow-right" : 'arrow-left'} size={30} type="Feather" color={'#000'} />
                        </Col>
                    </Row>
                    <View
                        style={{
                            width: '100%',
                            marginVertical: 5,
                            backgroundColor: '#fff',
                            paddingVertical: 15,
                            paddingHorizontal: 22,
                            borderTopWidth:1,
                            borderColor:"#868EA0"
                        }}>
                        <Text style={Styles.topText}>{props.route.params.name}</Text>
                        <Text
                            style={{
                                fontFamily: "OpenSansCondensed-Light"
                            }}
                        >
                            {props.route.params.description}
                        </Text>
                    </View>
                </View>
                <View
                    style={{
                        height: hp('3%'),
                        marginTop: hp('1%'),
                        marginBottom: hp('2%'),
                        flexDirection: 'row'
                    }}
                >
                    <View
                        style={{
                            flex: 4
                        }}
                    >
                        <Text
                            style={{
                                marginLeft:5,
                                textAlign: 'left',
                                fontFamily: "OpenSansCondensed-Light",
                                fontWeight: '900',
                                fontSize: 16
                            }}>
                            {langjson.lang[language - 1].result}: {List.length}
                        </Text>
                    </View>
                    <View
                        style={{
                            flex: 1,
                            alignItems: 'flex-end',
                            marginRight: 10
                        }}
                    >
                        <Icon
                            name="search"
                            type="Feather"
                            style={{
                                fontSize: 25,
                                color: '#000'
                            }}
                            onPress={()=>{props.navigation.navigate('doctor_search', {sid: props.route.params.sid, name: props.route.params.name})}}
                        />

                    </View>
                </View>
                
                <LinearGradient
                    colors={[
                        '#044DC1',
                        '#3BBFE3'
                    ]}
                    style={{
                        height: hp('6%'),
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingLeft: 10,
                        paddingTop: 5,
                        paddingBottom: 5,
                        justifyContent : 'space-between'
                    }}
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                >
                    <View
                        style={{
                            // flex: 0.8
                        }}
                    >
                        <Text
                            style={{
                                fontWeight: 'bold',
                                fontSize: 16,
                                color: '#fff',
                                fontFamily: "OpenSansCondensed-Light",
                                
                            }}
                        >
                            {/* Search Nearby Location */}
                            {Translator('searchNearbyLocation')}
                        </Text>
                    </View>
                    <View
                        style={{
                            // flex: 0.2
                        }}
                    >
                        <Switch
                            value={toggle}
                            onValueChange={(val) => {setToggle(val); searchdoctor(val);}}
                            disabled={false}
                            activeText={'ON'}
                            inActiveText={'OFF'}
                            backgroundActive={'gray'}
                            backgroundInactive={'gray'}
                            circleActiveColor={'#ffffff'}
                            circleInActiveColor={'#ffffff'} />

                    </View>
                </LinearGradient>

                {FilterList.length > 0 &&
                    <FlatList
                        data={FilterList}
                        renderItem={renderRow}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl onRefresh={props.refreshList} refreshing={loader} />
                        }
                        style={{
                            
                        }}
                        
                    />
                }
                {loader && FilterList.length == 0 &&
                    <ActivityIndicator size="large" color={theme.colors.primary} />
                }
            </ScrollView>

        </Container>
    )
}
const styles=StyleSheet.create(
    { 

        modal:{
            backgroundColor:"#FFFFFF",
            borderRadius:10,
            padding:20,
            backgroundColor:theme.colors.background,
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

