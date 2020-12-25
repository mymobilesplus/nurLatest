import React, {useState, useEffect} from 'react'
import { View, Text,Image,TouchableOpacity, RefreshControl,TextInput, FlatList, ActivityIndicator, Share, I18nManager} from 'react-native'
import {Styles} from "./Styles/DoctorListStyle"
import {theme,images} from "../../../constants"
import {Icon, Toast} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage'
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from "react-native-responsive-screen"
import { Popover, Layout} from '@ui-kitten/components'
import DoctorApiService from '../../../services/DocotoApiService';
import Entypo from "react-native-vector-icons/Entypo"
const{icons}=images

export default MyDoctors = (props) => {
    const [language, setLang] = useState(1)
    const [List, setMembersList] = React.useState([]);
    const [loader, setLoding]= React.useState(true);
    const [visible, setVisible] = React.useState(0);
    let [FilterList, setFilterList] = useState([])

    const{navigation}=props
    useEffect(() => {
        // code to run on component mount
        AsyncStorage.getItem("lang").then(lang=>{
            if(lang!=null){
                setLang(lang)
            }
        })
        getMembers();
      }, [])

    const getMembers = async() =>{
        setLoding(true);
        let user = await AsyncStorage.getItem("loginData");
        if(user!=null){
            user = JSON.parse(user);
            let api = new DoctorApiService()
            api.getSavedDoctors({UserId: user.currentUserID, token: user.accessToken,LanguageId: I18nManager.isRTL ? 2 : 1 }).then(res=>res.json()).then(res=>{
                // console.log(res);
                // alert(JSON.stringify(res));
                setLoding(false)
                if(res.favoriteDoctors != undefined){
                    let records = res.favoriteDoctors;
                    setMembersList(records);
                    setFilterList(records)
                }
                
            })
        }
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
            LanguageId: I18nManager.isRTL ? 2 : 1
        }
        let res = await api.shareDoctor(req).then(res => res.json())
        setLoding(false)
        Share.share({
            message: user.userSession.fullName + ' shared you doctor details. Check at ' + res.pdfLink,
            url: res.pdfLink
        })
    }

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

    
const menuIcon=(id)=>(
    <Entypo 
        name="dots-three-vertical" 
        size={16}
        color={theme.colors.dark}  
        onPress={() => setVisible(id)} 
        />
)

const renderDrowMenu=(id)=>{
    return(
        <Layout  level='1'>
            <Popover
                backdropStyle={Styles.backdrop}
                visible={visible == id}
                anchor={()=>menuIcon(id)}
                onBackdropPress={() => setVisible(false)}>
                <Layout style={Styles.content}>
                    <View>
                        <Text onPress={()=>shareDoctor(id)} style={{padding: 10, paddingHorizontal: 50, fontSize: 16}}>
                            <Icon name="share-2" type="Feather" style={{fontSize: 14}}></Icon> {' '}
                            Share</Text>
                    </View>
                </Layout>
            </Popover>
        </Layout>
    )
}

    const saveDoctor = async(item) => {
        setLoding(true)
        let api = new DoctorApiService()
        let user = JSON.parse(await AsyncStorage.getItem("loginData"))
        let req = {
            DoctorId: item.id,
            UserId: user.currentUserID,
            token: user.accessToken,
            refreshToken: user.refreshToken
        }
        console.log(user)
        let res = await api.saveDoctor(req).then(res=>res.json())
        console.log(res)
        Toast.show({
            text: res.returnStatus.returnMessage,
            buttonText: "Okay!",
        });
        setLoding(false)
        getMembers()
    }

    const renderRow = ({ item, index }) => {
        console.log(item);
        return (
            <TouchableOpacity onPress={() => props.navigation.navigate('doctordetail', { doctor: item })}
                key={index} style={{backgroundColor: 'white',
                    elevation: 16,
                    shadowColor: '#000',
                    shadowOffset: {width: 0, height: 0},
                    shadowOpacity: 0.1,
                    shadowRadius: 5, height: hp("18%"), borderTopWidth: 1, borderColor:'#ccc', padding: 10, backgroundColor: '#fff', marginHorizontal:10, marginBottom:5}} >
                <View style={{ width: '100%'}}>
                    <View style={{ width: '100%', flexDirection: 'row'}}>
                        <View style={{ justifyContent: 'center'}}>
                            <Text style={{ fontSize: 16, paddingLeft: 10, fontFamily: "OpenSans-SemiBold", lineHeight:27 }}>{item.firstname + " " + item.lastname}</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                            <TouchableOpacity>{renderDrowMenu(item.id)}</TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ width: '100%', flexDirection: 'row'}}>
                        <View style={{ }} >
                            <Text style={{ fontSize: 14, paddingLeft: 10, fontFamily: "OpenSans-SemiBold", lineHeight:22}}>{item.specialties.map(s => {s.title + ","})}</Text>
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
                            <Icon onPress={() => saveDoctor(item)} name="bookmark" type="FontAwesome" style={{ fontSize: 20, color: '#000' }} />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
        
    return (
        <View style={Styles.mainContainer}>

           <View style={{ height:60, flexDirection:'row', marginBottom:10 }}> 
                <View style={{ position:'absolute', top:18, width:60, justifyContent:'center', alignItems:'center' }} >
                    <Icon onPress={()=>props.navigation.goBack(null)} type="Feather" name="arrow-left" size={30} color={'#000'} />
                </View>
                <View style={{ flex:1, justifyContent:'center', alignItems:'center' }} >
                    <Text style={[Styles.mainHeading,{fontSize:18}]} >Saved Doctors</Text>
                </View>  
            </View>
           
           <View style={{ height:60, justifyContent:'center', marginRight:23, marginLeft:23, }}>
                <TextInput style={{ height: 60}} onChangeText={(text)=>filterDoctor(text)} placeholder="Search by doctor name..."
                    style={{ backgroundColor:'#fff', borderRadius:10, borderWidth:2, borderColor:'#eaecef', paddingLeft:20, fontFamily:'OpenSansCondensed-Light', fontWeight:'1000' }} />
                <Icon onPress={()=>props.navigation.goBack(null)} name="search" type="FontAwesome" style={{fontSize:25, color:'#959dac',position:'absolute',right:20}} />
            </View>
          
          
           <View style={Styles.memberContainer}>
                {List.length > 0 &&
                    <FlatList
                    data={FilterList} 
                    renderItem={renderRow}
                    refreshControl={
                        <RefreshControl onRefresh={getMembers} refreshing={loader} />
                    }
                    /> 
                }
                {loader && List.length == 0 &&
                    <ActivityIndicator size="large" color={theme.colors.primary} />
                }
                {List.length == 0 && !loader &&
                    <View style={Styles.mainContainer}>
                        <View style={Styles.heartContainer}>
                            <Image source={icons.heart} style={Styles.heart}  />
                            <Text style={Styles.text}>No favorite doctor found!</Text>
                        </View>
                    </View>
                }
           </View>
        </View>
    )
}
