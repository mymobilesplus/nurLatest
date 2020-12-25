import React, {useState, useEffect} from 'react'
import { View, Text,Image,TouchableOpacity, RefreshControl, FlatList, ActivityIndicator, Alert, Dimensions} from 'react-native'
import Modal from 'react-native-modal';
import {Styles} from "./Styles/Familyprofilestyle"
import {theme,images} from "../../../constants"
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-community/async-storage'
import langjson from "../../../constants/lang.json"
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from "react-native-responsive-screen"
import {Button} from '@ui-kitten/components'
import {Row, Col, Radio} from "native-base"
import FamilyMemberService from '../../../services/FamilyMemberService';
import { IMAGE_URL } from '../../../API_URI';

const{icons}=images

export default function Familyprofile(props) {
    const [language, setLang] = useState(1)
    const [List, setMembersList] = React.useState([]);
    const [loader, setLoding]= React.useState(true);
    const [showModal, setShowModal]= React.useState(false);
    const[selected, setSelected] = useState(0)

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
            let api = new FamilyMemberService()
            api.get({UserId: user.currentUserID, token: user.accessToken}).then(res=>res.json()).then(res=>{
                console.log(res);
                setLoding(false)
                if(res.familyMembers != undefined){
                    let records = res.familyMembers;
                    // alert(JSON.stringify(records));
                    setMembersList(records);
                }
                
            })
        }
    }
    const giveAccess = async(item) =>{
        setLoding(true);
        let user = await AsyncStorage.getItem("loginData");
        if(user!=null){
            user = JSON.parse(user);
            let api = new FamilyMemberService()
            let data ={UserId: user.currentUserID, FamilyMemberId:item.id, IsOwnershipInvitation: selected == "ownership"? 1 : 0, token: user.accessToken }
            console.warn("data",data)
            api.invite(data).then(res=>res.json()).then(res=>{
                console.log(res);
                setLoding(false)
                if(res.returnStatus.returnCode == 200){
                    Alert.alert("Success", "Invitaion Sent Successfully")
                    setShowModal(false)
                }
                
            }).catch(e=> console.log(e))
        }
    }

    const renderRow = ({item, index}) =>{
        return (
            <TouchableOpacity onPress={
                ()=>props.navigation.navigate('AddPhotoRegistration', {item ,returnURL: 'familyprofile'})
            }
                >
            <View >
            <View style={Styles.memberBox} >
                <View>
                    {<Image style={[Styles.avatar,{borderRadius : 100}]} source={{uri: item.img_src==null ? 'gg' : IMAGE_URL + item.img_src}} />}
                </View>
                <View style={{flex:1}} >
                    <Text style={Styles.memberName}>{item.name}</Text>
                </View>
                    <TouchableOpacity style={{flex :0.7, justifyContent:"center",height:25}} onPress={()=>setShowModal(true)}>
                        <Text style={Styles.giveAccess}>Give Access</Text>
                    </TouchableOpacity>
                    <Modal visible={showModal} style={{margin : 0}} onBackButtonPress={()=>{setShowModal(false)}} >
                        <View style={{flex:1}}>
                        <View style={{backgroundColor:"rgba(0,0,0,0.05)", flex:0.5}}>
                        </View>
                        <View style={{elevation:4, backgroundColor:"#fff", flex:0.5,padding:24, borderTopLeftRadius:10, borderTopRightRadius:10}}>
                            <Text style={{fontSize:22}}>
                            Choose Access Type
                            </Text>
                            <View style={{paddingVertical:15}}>
                                <Text style={{color:"#146ECB", fontSize:20}}>
                                    Viewer
                                </Text>
                                <View style={{flexDirection:"row"}}>
                                    <Text style={{color:"#020202", fontSize:14, padding:8, paddingLeft:0, flex:0.9}}>
                                    This access allows the family member to only view their medical records and diaries. 
                                    </Text>
                                    <Radio style={{flex:0.1}} selected={selected == "viewer"} onPress={()=>setSelected("viewer") } />
                                </View>
                            </View>  
                                                      
                            <View style={{paddingVertical:15}}>
                                <Text style={{color:"#146ECB", fontSize:20}}>
                                Ownership
                                </Text>
                                <View style={{flexDirection:"row"}}>
                                    <Text style={{color:"#020202", fontSize:14, padding:8, paddingLeft:0, flex:0.9}}>
                                    This access transfers the medical records and diaries to a second user and removes this member’s profile from your account.
                                    </Text>
                                    <Radio style={{flex:0.1}} selected={selected == "ownership"} onPress={()=>setSelected("ownership") } />
                                </View>
                            </View>
                        </View>
                            <Button 
                              onPress={()=>giveAccess(item)}
                              appearance="primary" status="primary" 
                              style={{}} size="large" block>
                              Give Access
                            </Button>
                            </View>
                    </Modal>
            </View>
            </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={Styles.mainContainer}>
            
           <View style={Styles.addNewMemberContainer}>
                <Row>
                    <Col style={{flex:0.2, marginTop:10, marginLeft:10}}>
                        <Icon onPress={()=>props.navigation.goBack(null)} name="arrow-left" size={30} color={'#000'} />
                    </Col>
                    <Col>
                        <Text style={{fontSize:22,fontWeight:'700', marginTop:10, textAlign:'center',marginRight:50}}>{langjson.lang[language-1].menu1}</Text>
                    </Col>
                </Row>
                <View style={{flex:2,width:wp('75%'), justifyContent:'flex-start'}}>
                    <Text style={[Styles.topText,{fontFamily:'OpenSansCondensed-Bold'}]}>{langjson.lang[language-1].familydescription}</Text>

                    <Button 
                        style={{
                            backgroundColor:'#146ECB',
                            borderRadius:hp("8%")/2,
                            // paddingLeft:40,
                            // paddingRight:40,
                            width:wp("70%"),
                            height:hp("8%"),
                            paddingTop:10,
                            paddingBottom:10,
                            fontFamily:'OpenSansCondensed-Bold'
                        }}  
                        size="large" 
                        onPress={()=>navigation.navigate('AddPhotoRegistration', {returnURL: 'familyprofile'})} 
                        >
                        {langjson.lang[language-1].addfamilymember}
                    </Button>
                </View>
                
           </View>
           <View style={Styles.memberContainer}>
                {List.length > 0 &&
                    <FlatList
                        data={List}
                        renderItem={renderRow}
                        refreshControl={
                            <RefreshControl onRefresh={getMembers} refreshing={loader} />
                        }
                        showsVerticalScrollIndicator={false}
                        />
                }
                {loader && List.length == 0 &&
                    <ActivityIndicator size="large" color={theme.colors.primary} />
                }
                {List.length == 0 && !loader &&
                    <View style={Styles.mainContainer}>
                        <View style={[Styles.heartContainer,{justifyContent:'center',alignItems:'center'}]}>
                            <Image source={icons.heart} style={Styles.heart}  />
                            <Text style={Styles.text}>Add your first family member</Text>
                        </View>
                    </View>
                }
           </View>
        </View>
    )
}
