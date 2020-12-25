import React, { useState, useEffect } from 'react'
import { 
    View, 
    Text, 
    TouchableOpacity, 
    ActivityIndicator, 
    FlatList, 
    RefreshControl,
    Alert,
    TextInput,
    Share
} from 'react-native'   
import { Styles } from "./Styles/Doctorstyles"
import { theme } from "../../constants"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen"
import { Popover, Layout, Input } from '@ui-kitten/components'
import { Icon, Container, Toast } from "native-base"
import langjson from "../../constants/lang.json"
import AsyncStorage from '@react-native-community/async-storage'
import SearchDoctorApiService from '../../services/SearchDoctorApiService'
import DoctorApiService from '../../services/DocotoApiService'
import Entypo from "react-native-vector-icons/Entypo"
import LinearGradient from 'react-native-linear-gradient';
import { Switch } from 'react-native-switch';
import Axios from 'axios'
navigator.geolocation = require('@react-native-community/geolocation');

export default function Doctor_search(props) {
    const [List, setList] = useState([])
    let [FilterList, setFilterList] = useState([])
    const [loader, setLoding] = React.useState(true);
    const [toggle,setToggle] = React.useState(false)
    const [visible, setVisible] = React.useState(0);
    const [countryCode, setCurrentCountry] = React.useState('LEB');
    // console.log(props);
    const getLocation = async ()=>{

        Axios.get('https://ipapi.co/json/').then((response) => {
            let data = response.data;
            // setCurrentCountry(data.country_name.substring(0, 3).toUpperCase())
            setCurrentCountry("LEB")
            console.warn(data.country_name.substring(0, 3).toUpperCase())
            searchdoctor('LEB');
            // searchdoctor(toggle,data.country_name.substring(0, 3).toUpperCase());
        }).catch((error) => {
            console.log(error);
        });
}
    useEffect(() => {
        getLocation();
        // alert('fjfjh')
        // searchdoctor(toggle);

    }, [props.route.params.sid])
    const searchdoctor = async (val,code) => {
        setLoding(true)
        let user = await AsyncStorage.getItem("loginData");
        if (user != null) {
            user = JSON.parse(user);
            let api = new SearchDoctorApiService();
            console.warn(val)
            if(val == true) {
                console.warn(val)
                await navigator.geolocation.getCurrentPosition(
                        position => {
                            const location = JSON.stringify(position);
                            console.warn(position) 
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
                    LanguageId: 1,
                    token: user.accessToken,
                    Id: props.route.params.sid,
                    CountryCode : code
                }
                api.searchdoctor(req).then(res => res.json()).then(res => {
                    console.log(res);
                    setLoding(false)
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
        <Entypo
            name="dots-three-vertical"
            size={16}
            color={theme.colors.dark}
            onPress={() => setVisible(id)}
        />
    )

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
                                <Text onPress={() => { shareDoctor({ id }) }}
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
            let { firstname, lastname, streetLine1, streetNumName, village } = x
            return streetLine1.toLowerCase().includes(text)
                || streetNumName.toLowerCase().includes(text)
                || firstname.toLowerCase().includes(text)
                || lastname.toLowerCase().includes(text)
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
        let res = await api.saveDoctor(req).then(res => res.json())
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
    const renderRow = ({ item, index }) => {
        console.log(item);
        return (            
        <TouchableOpacity onPress={() => props.navigation.navigate('doctordetail', { doctor: item })}
        key={index} style={{ height: hp("18%"), borderTopWidth: 1, borderTopColor: '#aaa', padding: 10, backgroundColor: '#fff'}} >
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
                        <Icon name="map-marker" type="FontAwesome" style={{ fontSize: 16, color: '#146cc1' }} />  Clinic</Text>
                    <Text style={{ fontSize: 16, paddingLeft: 26, fontFamily: "OpenSansCondensed-Light", color: '#596377', lineHeight:22 }}>
                        {item.streetLine1}, {item.streetNumName}, {item.village}
                    </Text>
                </View>
            </View>
            <View style={{ width: '100%', flexDirection: 'row' }} >
                <View style={{ justifyContent: 'center' }} >
                    <Text style={{ fontSize: 16, paddingLeft: 26, fontFamily: "OpenSansCondensed-Light", color: '#596377', lineHeight:22 }}>{item.address}</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }} >
                    <Icon onPress={() => saveDoctor(item)} name="bookmark-o" type="FontAwesome" style={{ fontSize: 20, color: '#000' }} />
                </View>
            </View>
        </View>
    </TouchableOpacity>
        )
    }
    return (
        <Container style={[Styles.mainContainer]}>
            <View style={[Styles.mainContainer, { padding:20 }]}>
                
                <View 
                    style={{
                        height:60,
                        width:'100%',
                        justifyContent:'center',
                        marginRight:10,
                        marginTop:20,
                        marginBottom:20,
                    }}>
                    <TextInput
                        style={{ height: 60}}
                        onChangeText={(text)=>filterDoctor(text)}
                        placeholder="Search by doctor name..."
                        style={{
                            backgroundColor:'#fff',
                            borderRadius:10,
                            borderColor:'#eaecef', 
                            paddingLeft:20,
                            fontFamily:'OpenSansCondensed-Light',
                            fontWeight:'1000'
                        }}
                        />
                    <Icon 
                        onPress={()=>props.navigation.goBack(null)} 
                        name="close" 
                        type="FontAwesome" 
                        style={{fontSize:25, color:'#959dac',position:'absolute',right:20}} 
                        />
                            
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
                        paddingBottom: 5
                    }}
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                >
                    <View
                        style={{
                            flex: 4
                        }}
                    >
                        <Text
                            style={{
                                fontWeight: 'bold',
                                fontSize: 16,
                                color: '#fff',
                                fontFamily: "OpenSansCondensed-Light"
                            }}
                        >
                            Search Nearby Location
                        </Text>
                    </View>
                    <View
                        style={{
                            flex: 1
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

                <View
                    style={{
                        height: hp('3%'),
                        marginTop: hp('1%'),
                        marginBottom: hp('1%'),
                        flexDirection: 'row'
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            alignItems: 'flex-end',
                            marginRight: 10
                        }}
                    >
                        <Text
                            style={{
                                textAlign: 'left',
                                fontFamily: "OpenSansCondensed-Light",
                                fontWeight: '900',
                                fontSize: 16
                            }}>
                            {langjson.lang[language - 1].result}: {List.length}
                        </Text>

                    </View>
                </View>
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
                            marginBottom: 30
                        }}
                    />
                }
                {loader && FilterList.length == 0 &&
                    <ActivityIndicator size="large" color={theme.colors.primary} />
                }
            </View>
        </Container>
    )
}
