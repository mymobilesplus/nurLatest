import React,{useEffect,useState} from 'react'
import { View, Text, Image, FlatList, ActivityIndicator, RefreshControl, TouchableOpacity, Dimensions, TextInput, I18nManager } from 'react-native'
import {Styles} from "./Styles/FinddoctorStyles"
import {connect} from "react-redux"
import AsyncStorage from '@react-native-community/async-storage';
import { Icon, Col } from 'native-base';
import DoctorApiService from '../../services/DocotoApiService';
import {theme} from "../../constants"
import * as action from "../../redux/actions/_Login"
import { IMAGE_URL } from '../../API_URI';
import refreshAccessToken from '../../services/refreshToken';
import { Translator } from '../../constants/translator';

const Finddoctor = (props) => {

    const[loader,setLoding]=useState(true)
    const[List, setList] = useState([])

    const [value, onChangeText] = useState('');

    useEffect(()=>{
        getSepeciality();
    }, [])

    const getSepeciality = async()=>{
        // alert('hbhv')
        setLoding(true)
        let user = await AsyncStorage.getItem("loginData");
        if(user!=null){
            user = JSON.parse(user);
            console.log(user);
            let api = new DoctorApiService();
            let req = {
                LanguageId: 1
            }
            return api.getSpecialisation({UserId: user.currentUserID, token: user.accessToken, LanguageId: I18nManager.isRTL ? 2 : 1}).then(res=>res.json()).then(res=>{
                console.log(res);
                setLoding(false)
                if(res.specialties != undefined){
                    let records = res.specialties;
                    setList(records);
                    // alert(JSON.stringify(records));
                }
                else{
                    props.logout();
                }
                
            })
        }
    }

    const getSepecialitySearch = async(value)=>{
        if(value != '') {
            setLoding(true)
            let user = await AsyncStorage.getItem("loginData");
            if(user!=null){
                user = JSON.parse(user);
                console.log(user);
                let api = new DoctorApiService();
                let req = {
                    LanguageId: 1
                }
                api.getSpecialisationSearch({UserId: user.currentUserID, token: user.accessToken,Search:value, LanguageId: 1}).then(res=>res.json()).then(res=>{
                    console.log(res);
                    setLoding(false)
                    if(res.specialties != undefined){
                        let records = res.specialties;
                        setList(records);
                    }
                    else{
                        props.logout();
                    }
                })
                // .catch((error)=>{
                //     refreshAccessToken().then(()=>{
                //         getSepecialitySearch(value);
                //     })
                // })
            }
        } else {
            getSepeciality()
            // .catch((error)=>{
            //     refreshAccessToken().then(()=>{
            //         getSepeciality();
            //     })
            // });
        }
    }

    const renderRow = ({item, index}) =>{
        if(index <  11) {
            return( 
                <Col 
                    style={{
                        flex:0.4, 
                        alignItems:'center',
                        paddingBottom:10,
                        paddingTop:10
                    }} 
                    key={index}
                    >
                    <TouchableOpacity  onPress={()=>props.navigation.navigate('doctorsearch', {sid: item.id, name: item.title, description: item.description})} >
                        <View >
                            <Image source={{uri: IMAGE_URL + item.imgSrc}} style={Styles.cardImage}  />
                            <Text style={[Styles.title,{marginTop:5,fontFamily:'OpenSansCondensed-Light'}]}>{item.title}</Text> 
                        </View>
                    </TouchableOpacity>
                </Col>
            )
        }
    }
    return (
        <View style={{ flex:1, backgroundColor:'whitesmoke', padding:20, paddingTop:30 }} >
            <View style={{ height:Dimensions.get('window').height-70, }}>
                <View style={{ flex:1, justifyContent:'center', alignItems:'center', marginBottom:20 }}>
                    <View style={{ height:60, width:'100%', borderRadius:10, justifyContent:'center', flexDirection : 'row' }}>
                        <TextInput style={{ height: 60}} onChangeText={text => {onChangeText(text);getSepecialitySearch(text);}} value={value} placeholder="Search by Speciality..." placeholderTextColor="#8A92A3"
                            style={{ backgroundColor:'#fff', borderRadius:10, borderWidth:2, borderColor:'#EAECEF', paddingLeft:20, fontFamily:'OpenSansCondensed-Light', fontWeight:"900", flex:1, textAlign : I18nManager.isRTL ? 'right' : 'left' }} />
                        <Icon onPress={()=>props.navigation.goBack(null)} name="search" type="FontAwesome" 
                        style={{fontSize:25, color:'#959dac', position : 'absolute', right : 10, alignSelf : 'center'}}
                         />
                    </View>
                </View>
                <View style={{ flex:20}}>
                    <FlatList data={List} numColumns={3} initialNumToRender={3} maxToRenderPerBatch={3} renderItem={({item, index}) =>{
                            if(index <=  11) {
                                return( 
                                    <View style={{ width:"33%", alignItems:'center', paddingBottom:10, paddingTop:10 }} key={index} >
                                        <TouchableOpacity  onPress={()=>props.navigation.navigate('doctorsearch', {sid: item.id, name: item.title, description:item.description})} >
                                            <View style={{justifyContent:'center', alignItems:'center' }}>
                                                <View style={{ backgroundColor:'#fff', height:74, width:74, borderRadius:37, borderColor:"#146cc1", justifyContent:'center', alignItems:'center' }} >
                                                    <Image source={{uri: IMAGE_URL + item.imgSrc}} style={[ Styles.cardImage, ]} />
                                                </View>
                                                <Text style={[Styles.title,{marginTop:5,fontWeight:'500'}]}>{item.title}</Text> 
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                )
                            }
                        }}
                        refreshControl={<RefreshControl onRefresh={getSepeciality} refreshing={loader} />}
                    />  
                    {loader &&
                        <View style={Styles.mainContainer}>
                            <ActivityIndicator size="large" color={theme.colors.primary} />
                        </View>
                    }
                
                {(!loader)?       
                        (<View style={{ flex:1, justifyContent:'center', alignItems:'center', marginBottom:50 }}>
                            <TouchableOpacity style={{ borderWidth:1, borderColor:'#146cc1', justifyContent:'center', alignItems:'center', width:'50%', paddingTop:15, paddingBottom:15, borderRadius:25 }}
                                onPress={()=>props.navigation.navigate('alldoctorsearch')}>
                                <Text style={{ fontSize:16, fontWeight:'bold', color:'#146cc1', fontFamily:'OpenSansCondensed-Light', padding : 5}}>{Translator('view_more')}</Text>
                            </TouchableOpacity>
                        </View>) 
                        : 
                        null 
                }
                </View>
            </View>
        </View>
    )
}


const mapStateToProps=(state)=>{
    return{
        _DEVICE_ID:state.DeviceInfoReducer._DEVICE_ID
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        logout:()=>dispatch(action.LogoutStart())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Finddoctor)
