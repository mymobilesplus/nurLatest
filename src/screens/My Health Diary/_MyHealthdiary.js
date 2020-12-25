import React, { useEffect } from 'react'
import { View, Text,Image,TouchableOpacity, ActivityIndicator, RefreshControl, FlatList, Modal, Share} from 'react-native'
import {Styles} from "./Style/_MyHealthdiaryStyle"
import {theme,images} from "../../constants"
import {Button, Layout, Popover} from "@ui-kitten/components"
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-community/async-storage';
import HealthDairyServices from '../../services/HealthDiaryServices';
import {connect} from 'react-redux';
import * as action from "../../redux/actions/_Login"
import moment from "moment"
import Entypo from "react-native-vector-icons/Entypo"
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import DashboardStackHeader from '../../components/header/DashboardStackHeader';
import MultiStackHeader from '../../components/header/MultiStackHeader';
import DeleteModal from '../../components/DeleteModal';
import { CheckBox } from 'native-base';


const{icons}=images

function _MyHealthdiary(props) {
    const [visible, setVisible] = React.useState(0);
    const [selectedIndex, setSelectedIndex] = React.useState(null);
    const [List, setProfileList] = React.useState([]);
    const [loader, setLoding]= React.useState(true);
    const [notFound, setNotFound]= React.useState(false);
    const [deleteModal, setDeleteModal]= React.useState(false);
    const [deleteId, setDeleteId]= React.useState(-1);

    const [multiDeleteModal, setMultiDeleteModal]= React.useState(false);
    const [selectedCheckboxs, setSelectedCheckboxs] = React.useState([])
    const [loader1, setLoding1]= React.useState(true);


    const addIcon=()=>{
        return(
            <Icon name="plus" type="Feather" style={{color: theme.colors.primary}} size={30} />
        )
    }

    useEffect(() => {
        // getProfiles();
      }, [])

    useFocusEffect(React.useCallback(() => {
        getProfiles();
    }, []));

    const getProfiles = async() =>{
        props.navigation.setOptions({ headerTitle: () => <DashboardStackHeader filterRecords={null} {...props}  title="Fetching Records.." /> });
        setLoding(true)
        let user = await AsyncStorage.getItem("loginData");
        if(user!=null){
            user = JSON.parse(user);
            let api = new HealthDairyServices();
            api.get({UserId: user.currentUserID, token: user.accessToken, refreshToken: user.refreshToken}).then(res=>res.json()).then(res=>{
                setLoding(false)
                if(res.healthDiaries != undefined){
                    let records = res.healthDiaries;
                    setProfileList(records);
                    props.navigation.setOptions({ headerTitle: () => <DashboardStackHeader {...props} records={records} filterRecords={filterRecords} title="My Health Diary" /> });
                }
                else{
                    props.logout();
                }
            })
        }
    }

    const filterRecords = (text, records) => {
        let list = records.filter(f=>{
            return f.description.toLowerCase().includes(text.toLowerCase());
        })
        if (list == "" ){
            setNotFound(true)
        }
        setProfileList(list)
    }

    const menuIcon=(id)=>(
        <Entypo name="dots-three-vertical" size={18} color={theme.colors.dark}  onPress={() => setVisible(id)} />
    )

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
                        ]}
                        >
                        <View>
                            <Text 
                                onPress={()=>{setVisible(false); props.navigation.navigate('AddNewMember', {healthDiary: List.filter(l=>
                                    l.id == id
                                    )})}} 
                                style={{
                                    padding: 10, 
                                    fontSize: 16,
                                    justifyContent:'flex-start',
                                    alignItems:'flex-start',
                                    borderBottomWidth:0.5,
                                    borderBottomColor:"#8A92A3",
                                    color:"#596377"
                                }}
                                >
                                <Icon name="edit-2"  type="Feather" style={{fontSize: 14, color:"#596377"}}></Icon> {' '}
                                Edit</Text>
                            <Text 
                                onPress={()=>share(id)} 
                                style={{
                                    padding: 10, 
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
    const confirmMutliDelete = () => {
        setMultiDeleteModal(true)
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
            user = JSON.parse(user);
            let api = new HealthDairyServices();
            api.share({UserId: user.currentUserID, LanguageId: lang, refreshToken: user.refreshToken, token: user.accessToken, ids: [item]}).then(res=>res.json()).then(res=>{
                
                setLoding(false)
                Share.share({
                    message: user.userSession.fullName + ' shared you health record. Check at ' + res.pdfLink,
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
            
            let api = new HealthDairyServices();
            api.share({UserId: user.currentUserID, LanguageId: lang, refreshToken: user.refreshToken, token: user.accessToken, ids: selectedCheckboxs}).then(res=>res.json()).then(res=>{
                
                setLoding(false)
                Share.share({
                    message: user.userSession.fullName + ' shared you health record. Check at ' + res.pdfLink,
                    url: res.pdfLink
                })
            })
        }
    }

    const deleteHealthRecord = () => {
        setLoding(true)
        let id = deleteId
        setDeleteModal(false)
        AsyncStorage.getItem('loginData').then(user=>{
            user = JSON.parse(user);
            let auth = new HealthDairyServices();
            let formData = {
                Id: id, refreshToken: user.refreshToken
            }
            formData.token = user.accessToken;
            auth.delete(formData).then(res=>res.json()).then(res=>{
                getProfiles();
            })
          })
    }
    
    const mutliDeleteHealthRecord = () => {
        setLoding(true)
        setMultiDeleteModal(false)
        AsyncStorage.getItem('loginData').then(user=>{
            user = JSON.parse(user);
            let auth = new HealthDairyServices();
            let formData = {
                Ids: selectedCheckboxs, refreshToken: user.refreshToken
            }
            formData.token = user.accessToken;
            auth.multiDelete(formData).then(res=>res.json()).then(res=>{
                getProfiles();
            })
          })
    }

    const addCheckbox = (done,item) => {
        props.navigation.setOptions({ headerTitle: () => <MultiStackHeader {...props} selectedCheckboxs={selectedCheckboxs} multiShare={multiShare} multiDelete={confirmMutliDelete} title="" /> });
        // let selecteddata = ;
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
    
    const callSelectAll = () => {
             List.map((data,key)=> {
                 setTimeout(function(){
                     if(selectedCheckboxs.indexOf(data.id) <= -1) {
                         addCheckbox('',data.id);
                     } 
                 },100);
             })
    } 

    const renderRow = ({item, index}) => {
        console.warn("test",item.isReadOnlyMode)
        return(
            <TouchableOpacity 
                onPress={()=>props.navigation.navigate("HealthDiaryDetail", {record: item})} 
                style={Styles.recordContainer} 
                key={index}
                onLongPress={(done)=>addCheckbox(done,item.id)} 
                >
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
                        {renderDrowMenu(item.id,item.isReadOnlyMode)}
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={Styles.bottomContainer}>
                    <View style={Styles.dateContainer}>
                            <Image source={require("../../assets/calendar-blank-outline.png")} style={{ color:"#596377" ,width: 20, height: 20, resizeMode: 'stretch' }} />
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
            </TouchableOpacity>
       )
    }

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
                        <Image source={icons.editblue} style={Styles.editblue}  />
                        <Text style={Styles.text}>Add Your First Health Diary</Text>
                        <Image source={icons.arrow} style={Styles.arrow}  />
                    </View>
                </View>
            }
            {List.length == 0 && !loader && notFound &&
                <View style={Styles.mainContainer}>
                <View style={Styles.editblueContainer}>
                    <Image source={icons.search} style={Styles.editblue}  />
                    <Text style={{fontSize:28}}>Could not find any result</Text>
                    <Text style={{color:"#4B4F56"}}>Try changing search items</Text>
                </View>
            </View>
            }

            <View style={Styles.addButtonContainer}>
                <Button
                    onPress={()=>props.navigation.navigate('AddNewHealthdiary')}
                    accessoryLeft={()=>addIcon()} style={Styles.button} status="primary" size="large" />
            </View>
            <Modal animationType="fade" visible={deleteModal} transparent onRequestClose={()=>setDeleteModal(false)}>
                <View style={{flex: 1, paddingHorizontal: 20, backgroundColor: 'rgba(0, 0, 0, 0.5)', paddingBottom: 30, justifyContent: 'flex-end'}}>
                    <DeleteModal message="Are you sure you want to delete?" 
                        delete={deleteHealthRecord} 
                        cancel={()=>setDeleteModal(false)} />
                </View>
            </Modal>
            <Modal animationType="fade" visible={multiDeleteModal} transparent onRequestClose={()=>setMultiDeleteModal(false)}>
                <View style={{flex: 1, paddingHorizontal: 20, backgroundColor: 'rgba(0, 0, 0, 0.5)', paddingBottom: 30, justifyContent: 'flex-end'}}>
                    <DeleteModal message="Are you sure you want to delete?" 
                        delete={mutliDeleteHealthRecord} 
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

export default connect(mapStateToProps,mapDispatchToProps)(_MyHealthdiary)
