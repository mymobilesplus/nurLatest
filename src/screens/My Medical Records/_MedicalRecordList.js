import React, { useEffect, useState } from 'react'
import { View, Text,TouchableOpacity,Image, RefreshControl, Alert, Share, Modal } from 'react-native'
import {Styles} from "./Style/_MedicalRecordListStyle"
import {theme,images} from "../../constants"
import moment from "moment"
import Entypo from "react-native-vector-icons/Entypo"
import * as action from "../../redux/actions/_Login"
import { Button, Layout,Popover } from '@ui-kitten/components';
import AsyncStorage from '@react-native-community/async-storage'
import {connect} from "react-redux"
import { FlatList } from 'react-native-gesture-handler'
import MedicalRecordsService from '../../services/MedicalRecordsService'
import langjson from "../../constants/lang.json"
import { Icon, CheckBox } from 'native-base'
import { ActivityIndicator } from 'react-native-paper'
import { useFocusEffect } from '@react-navigation/native'
import DashboardStackHeader from '../../components/header/DashboardStackHeader'
import MultiStackHeader from '../../components/header/MultiStackHeader';
import DeleteModal from '../../components/DeleteModal'
import refreshAccessToken from '../../services/refreshToken'

const{icons}=images

function _MedicalRecordList(props) {
    const [visible, setVisible] = React.useState(0);
    const [selectedIndex, setSelectedIndex] = React.useState(null);
    const [List, setProfileList] = React.useState([]);
    const [loader, setLoding]= React.useState(true);
    const [notFound, setNotFound]= React.useState(false);
    const [rec, setRecords] = React.useState([]);
    const [deleteModal, setDeleteModal]= React.useState(false);
    const [multiDeleteModal, setMultiDeleteModal]= React.useState(false);
    const [deleteId, setDeleteId]= React.useState(-1);
    const [loader1, setLoding1]= React.useState(true);
    const [selectedCheckboxs, setSelectedCheckboxs] = React.useState([])

    // useEffect(() => {
    //     // code to run on component mount
    //     getProfiles();
    //   }, [])

    useFocusEffect(React.useCallback(() => {
        // console.log('fetching daraaaabssssssssssssssssssssssssssssss')
        getProfiles();
    }, []));

    const getProfiles = async() =>{
        // alert('dhjd')
        props.navigation.setOptions({ headerTitle: () => <DashboardStackHeader filterRecords={null} {...props}  title="Fetching Records.." /> });
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
            // console.log(user);
            user = JSON.parse(user);
            let api = new MedicalRecordsService();
            api.get({UserId: user.currentUserID, LanguageId: lang, token: user.accessToken, refreshToken: user.refreshToken}).then(res=>{return res.json()}).then(res=>{
                console.log('respppppppppppp',res);
                // alert(JSON.stringify(res))
                setLoding(false)
                if(res.medicalRecords != undefined){
                    let records = res.medicalRecords;
                    setRecords(records);
                    setProfileList(records);
                    props.navigation.setOptions({ headerTitle: () => <DashboardStackHeader {...props} records={records} filterRecords={filterRecords} setNotFound={setNotFound}  title={langjson.lang[language-1].recordTitle} /> });
                }
                else{
                }
                
            }).catch((e)=>{
                // alert(JSON.stringify(e));
                // refreshAccessToken().then(()=>{
                //     getProfiles();
                // })
            })
        }
    }
    const filterRecords = (text, records) => {
        console.log("Filter", records);
        let list = records.filter(f=>{
            return f.description.toLowerCase().includes(text.toLowerCase());
        })
        if (list == "" ){
            setNotFound(true)
        }
        setProfileList(list)
    }

    const share = async(item) => {
        setLoding(true)
        setVisible(false)
        let user = await AsyncStorage.getItem("loginData");
        let lang = await AsyncStorage.getItem("lang")
        if(lang!=null){
            lang = JSON.parse(lang)
        }
        else{
            lang = 1
        }
        
        if(user!=null){
            console.log(user);
            user = JSON.parse(user);
            
            let api = new MedicalRecordsService();
            api.share({UserId: user.currentUserID, LanguageId: lang, refreshToken: user.refreshToken, token: user.accessToken, ids: [item]}).then(res=>res.json()).then(res=>{
                console.log(JSON.stringify(res));
                setLoding(false)
                Share.share({
                    message: user.userSession.fullName + ' shared you medical record. Check at ' + res.pdfLink,
                    url: res.pdfLink
                })
            })
        }
    }
    const multiShare = async() => {
        setLoding(true)
        setVisible(false)
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
            
            let api = new MedicalRecordsService();
            api.share({UserId: user.currentUserID, LanguageId: lang, refreshToken: user.refreshToken, token: user.accessToken, ids: selectedCheckboxs}).then(res=>res.json()).then(res=>{
                console.log(JSON.stringify(res));
                setLoding(false)
                Share.share({
                    message: user.userSession.fullName + ' shared you medical record. Check at ' + res.pdfLink,
                    url: res.pdfLink
                })
            })
        }
    }

    const onItemSelect = (index) => {
        setSelectedIndex(index);
        setVisible(0);
      };

    const menuIcon=(id)=>(
        <Entypo name="dots-three-vertical" size={18} color={theme.colors.dark}  onPress={() => setVisible(id)} />
    )

    const addCheckbox = (done,item) => {
        props.navigation.setOptions({ headerTitle: () => <MultiStackHeader {...props} selectedCheckboxs={selectedCheckboxs} multiShare={multiShare} multiDelete={confirmMultiDelete} title="" /> });
         setLoding1(true) 
         if(selectedCheckboxs.indexOf(item) > -1) {
             selectedCheckboxs.splice(selectedCheckboxs.indexOf(item), 1); 
             setSelectedCheckboxs(selectedCheckboxs); 
             setTimeout(function(){
                 setLoding1(false)
             },100);
         } else {
             selectedCheckboxs.push(item); 
             setSelectedCheckboxs(selectedCheckboxs); 
             setTimeout(function(){
                 setLoding1(false)
             },100);
         }    
     }
    
    callSelectAll = () => {
             List.map((data,key)=> {
                 setTimeout(function(){
                     if(selectedCheckboxs.indexOf(data.id) <= -1) {
                         addCheckbox('',data.id);
                     } 
                 },100);
             })
    } 

    const renderDrowMenu=(id,readOnly)=>{
        return(
            <Layout  level='1'>
                <Popover
                    backdropStyle={Styles.backdrop}
                    visible={visible == id}
                    anchor={()=>(readOnly !== null)? <View/> : menuIcon(id) }
                    onBackdropPress={() => setVisible(false)}>
                    <Layout 
                        style={[
                            Styles.content,
                            {
                                width:180,
                            }
                        ]}>
                        <View>
                            <Text 
                                onPress={()=>{setVisible(false); props.navigation.navigate('Medical Record Form', {medicalRecord: List.filter(l=>
                                    l.id == id
                                    )[0]})}} 
                                style={{
                                    padding: 10, 
                                    fontSize: 16,
                                    justifyContent:'flex-start',
                                    alignItems:'flex-start',
                                    borderBottomWidth:0.5,
                                    borderBottomColor:"#8A92A3",
                                    color:"#596377"
                                }}>
                                <Icon name="edit-2"  type="Feather" style={{fontSize: 14, color:"#596377"}}></Icon> {' '}
                                Edit</Text>
                            <Text 
                                onPress={()=>share(id)} 
                                style={{
                                    padding: 10, 
                                    // paddingHorizontal: 50, 
                                    fontSize: 16,
                                    justifyContent:'flex-start',
                                    alignItems:'flex-start',
                                    borderBottomWidth:0.5,
                                    borderBottomColor:"#8A92A3",
                                    color:"#596377"
                                }}>
                                <Icon name="share-2" type="Feather" style={{fontSize: 14, color:"#596377"}}></Icon> {' '}
                                Share</Text>
                            <Text 
                                onPress={()=>{setVisible(false); confirmDelete(id)}} 
                                style={{
                                    padding: 10, 
                                    // paddingHorizontal: 50, 
                                    fontSize: 16,
                                    justifyContent:'flex-start',
                                    alignItems:'flex-start',
                                    color:"#596377"
                                }}>
                                <Icon name="trash-2" type="Feather" style={{fontSize: 14, color:"#596377"}}></Icon>{' '}
                                Delete</Text>
                        </View>
                    </Layout>
                </Popover>
            </Layout>
        )
    }

    const confirmDelete = (id) => {
        setDeleteId(id)
        setDeleteModal(true)
    }
    const confirmMultiDelete = () => {
        setMultiDeleteModal(true)
    }

    const deleteMedicalRecord = () => {
        setLoding(true)
        setDeleteModal(false)
        let id = deleteId
        AsyncStorage.getItem('loginData').then(user=>{
            user = JSON.parse(user);
            let auth = new MedicalRecordsService();
            let formData = {
                Id: id, refreshToken: user.refreshToken
            }
            formData.token = user.accessToken;
            auth.delete(formData).then(res=>res.json()).then(res=>{
                getProfiles();
            })
          })
    }
    const mutliDeleteMedicalRecord = () => {
        setLoding(true)
        setMultiDeleteModal(false)
        AsyncStorage.getItem('loginData').then(user=>{
            user = JSON.parse(user);
            let auth = new MedicalRecordsService();
            let formData = {
                Ids: selectedCheckboxs, refreshToken: user.refreshToken
            }
            formData.token = user.accessToken;
            auth.multiDelete(formData).then(res=>res.json()).then(res=>{
                getProfiles();
            })
          })
    }
    const renderRow = ({item, index}) => {
        return(
            <TouchableOpacity 
                onPress={()=>props.navigation.navigate('My Medical Records Detail', {record: JSON.stringify(item)})}
                onLongPress={(done)=>addCheckbox(done,item.id)} 
                >
                <View style={Styles.recordContainer} key={index}>
                    <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                        <View style={Styles.descriptionContainer}>
                        {(selectedCheckboxs.length > 0) ?    
                            (<View style={{width:60}}>
                                <CheckBox 
                                    checked={(selectedCheckboxs.indexOf(item.id) > -1) ? true : false} 
                                    value={(selectedCheckboxs.indexOf(item.id) >= 0) ? true : false}
                                    onPress={(done)=>{addCheckbox(done,item.id)}}   
                                    />                   
                            </View>)
                            : null
                        }   
                            <Text numberOfLines={2} style={Styles.description}>{item.description}</Text>
                        </View>
                        <View style={Styles.iconContainer}>
                            <TouchableOpacity>
                            {renderDrowMenu(item.id, item.isReadOnlyMode)}
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={Styles.bottomContainer}>
                        <View style={Styles.dateContainer}>
                            <Image source={require("../../assets/calendar-blank-outline.png")} style={{ color:"#596377", width: 20, height: 20, resizeMode: 'stretch' }} />
                        <Text
                            style={{
                                marginLeft:10 ,
                                color:"#596377"
                            }}
                            >
                            {moment(item.dateCreated).format('l')}
                        </Text>
                        </View>
                        <View>
                            <Text 
                                style={[
                                    Styles.name,
                                    {
                                        color:"#596377",
                                        marginVertical:5
                                    }
                                ]}>
                                {item.familyMemberName}
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
       )
    }

    const addIcon=()=>{
        return(
            <Icon name="plus" type="Feather" style={{color: theme.colors.primary}} size={30} />
        )
    }

    const [language, setLang] = useState(1)
    useEffect(()=>{
        AsyncStorage.getItem("lang").then(lang=>{
            if(lang!=null){
                setLang(lang)
            }
        })
    })
    return (
        <View style={Styles.mainContainer}>
            {(selectedCheckboxs.length > 0) ? 
            (<View 
                style={{
                    height:80,
                    width:'100%',
                    flexDirection:'row',
                    backgroundColor:'#ccc',
                    marginTop:10
                }}>
                <View
                    style={{
                        width:60,
                        justifyContent:'center',
                        paddingLeft:7
                    }}
                    >
                    <CheckBox  
                        checked={
                            List.filter(data => selectedCheckboxs.indexOf(data.id) <= -1)
                        } 
                        onPress={(done)=>{callSelectAll()}} 
                        />    
                </View>
                <View
                    style={{
                        flex:1,
                        justifyContent:'center'
                    }}
                    >
                    <Text
                        style={{
                            color:'blue',
                            fontSize:16,
                            fontWeight:'bold'
                        }}
                        >
                        Select {List.length} Results
                    </Text>
                </View>
                <View
                    style={{
                        flex:1,
                        justifyContent:'center',
                        flexDirection:'row',
                        alignItems:'center'
                    }}
                    >
                </View>
            </View>)
            :  null}
            
            {List.length > 0 &&
                <FlatList
                    data={List} 
                    renderItem={renderRow}
                    initialNumToRender={1}
                    maxToRenderPerBatch={1}
                    refreshControl={
                        <RefreshControl onRefresh={getProfiles} refreshing={loader} />
                    }
                    /> 
            }
            {loader && List.length == 0 &&
                <ActivityIndicator size="large" color={theme.colors.primary} />
            }
            {List.length == 0 && !loader && !notFound &&
                <View style={Styles.mainContainer}>
                <View style={Styles.editblueContainer}>
                    <Image source={icons.heart} style={Styles.heart}  />
                    <Text style={Styles.text}>{langjson.lang[language-1].firstmedicalreccord}</Text>
                    <Image source={language == 1 ? icons.arrow : icons.arrow_ar} style={Styles.arrow}  />
                </View>
            </View>
            }
            {List.length == 0 && !loader && notFound &&
                <View style={Styles.mainContainer}>
                <View style={Styles.editblueContainer}>
                    <Image source={icons.search} style={Styles.heart}  />
                    <Text style={{fontSize:28}}>Could not find any result</Text>
                    <Text style={{color:"#4B4F56"}}>Try changing search items</Text>
                </View>
            </View>
            }
            <View style={Styles.addButtonContainer}>
                <Button
                onPress={()=>props.navigation.navigate('Add New Member')}
                accessoryLeft={()=>addIcon()} style={Styles.button} status="primary" size="large" />
            </View>
            <Modal animationType="fade" visible={deleteModal} transparent onRequestClose={()=>setDeleteModal(false)}>
                <View style={{flex: 1, paddingHorizontal: 20, backgroundColor: 'rgba(0, 0, 0, 0.5)', paddingBottom: 30, justifyContent: 'flex-end'}}>
                    <DeleteModal message="Are you sure you want to delete?" 
                        delete={deleteMedicalRecord} 
                        cancel={()=>setDeleteModal(false)} />
                </View>
            </Modal>
            <Modal animationType="fade" visible={multiDeleteModal} transparent onRequestClose={()=>setMultiDeleteModal(false)}>
                <View style={{flex: 1, paddingHorizontal: 20, backgroundColor: 'rgba(0, 0, 0, 0.5)', paddingBottom: 30, justifyContent: 'flex-end'}}>
                    <DeleteModal message="Are you sure you want to delete?" 
                        delete={mutliDeleteMedicalRecord} 
                        cancel={()=>setMultiDeleteModal(false)} />
                </View>
            </Modal>
        </View>
    )
}

const mapStateToProps=(state)=>{
    return{
        _DEVICE_ID:state.DeviceInfoReducer._DEVICE_ID,
        loading:state.LoadingReducer.loading,
        data:state.MedicalProfilesReducer.data 
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        logout:()=>dispatch(action.LogoutStart())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(_MedicalRecordList)
