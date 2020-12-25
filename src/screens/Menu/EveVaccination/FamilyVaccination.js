import React, { useState, useEffect, useCallback } from 'react'
import { 
    View, 
    Text,
    Image,
    TouchableOpacity, 
    TouchableHighlight,
    ActivityIndicator, 
    Modal, 
    FlatList, 
    RefreshControl,
    StyleSheet, 
    Share, 
    Alert
} from 'react-native'
import {Styles} from "./Styles/VaccinationStyles"
import {theme,images} from "../../../constants"
import Entypo from "react-native-vector-icons/Entypo"
import ActionButton from 'react-native-action-button';
import {Button, Layout, Popover} from "@ui-kitten/components"
import Icon from 'react-native-vector-icons/Feather';
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from "react-native-responsive-screen"
import { Container, Tabs, Tab, Row, Col,CheckBox } from 'native-base';
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons"
import moment from "moment"
import Vaccinated from './Vaccinated';
import AsyncStorage from '@react-native-community/async-storage';
import VaccinationsApiService from '../../../services/VaccinationsApiService';
import { useFocusEffect } from '@react-navigation/native';
import DeleteModal from '../../../components/DeleteModal';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

const{icons}=images

export default function FamilyVaccination(props) {
    const[familyMember, setMember] = useState({})
    let [upcoming, setUpcoming] = useState([])
    let [vaccinated, setvaccinated] = useState([])
    let [overdue, setOverdue] = useState([])
    let [selecteditem, setSelectedItem] = useState([])
    let [selecteddates, setSelectedDates] = useState({})
    let [selectDatet, setSelectedDate] = useState(0)
    
    const [loader, setLoding]= React.useState(true);
    const [loader1, setLoding1]= React.useState(true);
    const [selectedCheckboxs, setSelectedCheckboxs] = React.useState([])
    const[visible, setVisible] = useState(-1)
    const [deleteModal, setDeleteModal]= React.useState(false);
    const [deleteAllModal, setDeleteAllModal]= React.useState(false);
    const [deleteId, setDeleteId]= React.useState(-1);
    const [modalVisible, setModalVisible] = useState(false);
    const [initialPage, setInitialPage] = useState(0);
    useEffect(() => {
        // code to run on component mount
        // getProps()
        
    }, [])

    useFocusEffect(useCallback(()=>{
        getProps()
    }, []))

    const getProps=()=>{
        if(props.route.params != undefined){
            if (props.route.params.familyMember !== ""){
                setMember(props.route.params.familyMember);
            } else {
                setMember({name : "My Vaccinations"});
            }
        } else {
            setMember({name : "My Vaccinations"});
        }
        getVaccinations()
    }

    const addIcon=()=>{
        return(
            <Icon name="plus" type="Feather" style={{color: theme.colors.primary}} size={30} />
        )
    }


    const selectDate=(val)=>{
        let dateString = val.dateString;
        let data = {}
        data[dateString]= { selected: true }
    
        setSelectedDates( data );
        setSelectedDate(val);
    }

    
    const getVaccinations = async()=>{
        setLoding(true)
        let user = JSON.parse(await AsyncStorage.getItem("loginData"))
        let lang = JSON.parse(await AsyncStorage.getItem("lang"))
        let familyMemberId = ""
        if(props.route.params != undefined){
            let familyMember = props.route.params.familyMember
            familyMemberId = familyMember.id
        }
        if(lang == null){
            lang = 1
        }

        let api = new VaccinationsApiService();
        let req = {
            LanguageId: lang, 
            refreshToken: user.refreshToken, 
            UserID: user.currentUserID, 
            FamilyMemberId: familyMemberId, 
            token: user.accessToken
        }
        api.getUpcoming(req)
            .then(res=>res.json()).then(res=>{
            if(res.myVaccinations != undefined){
                let records = res.myVaccinations;
                setUpcoming(records);
            }
        });
        api.getVaccinated(req)
            .then(res=>res.json()).then(res=>{
            if(res.myVaccinations != undefined){
                let records = res.myVaccinations;
                setvaccinated(records);
            }
        });
        api.getOverdue(req)
            .then(res=>res.json()).then(res=>{
            if(res.myVaccinations != undefined){
                let records = res.myVaccinations;
                setOverdue(records);
            }
            setLoding(false)
        });
    }

    const updatevaccinated = async(done, item) => {
        setInitialPage(1);
        setLoding(true)
        
        let user = JSON.parse(await AsyncStorage.getItem("loginData"))
        let lang = JSON.parse(await AsyncStorage.getItem("lang"))
        let req = {
            Id: item.id,
            token: user.accessToken,
            refreshToken: user.refreshToken,
            VaccinationDate: selectDatet.dateString
        }
        if(item.VaccinationDate){
            req.VaccinationDate = item.VaccinationDate.dateString;
        }
        let api = new VaccinationsApiService()
        api.switchVaccinated(req).then(res=>res.json().then(res=>console.warn(res)).catch(e=>console.log(e)))
        getVaccinations()
    }

    const switchToNonVaccinated = async(done, item) => {
        setInitialPage(1);
        setLoding(true)
        
        let user = JSON.parse(await AsyncStorage.getItem("loginData"))
        let lang = JSON.parse(await AsyncStorage.getItem("lang"))
        let req = {
            id: item.id,
            token: user.accessToken,
            refreshToken: user.refreshToken
        }
        let api = new VaccinationsApiService()
        await api.switchToNonVaccinated(req).then(res=>res.json().then(res=>console.log(res)))
        getVaccinations()
    }

    const showModal = async(done, item) => {
        setSelectedItem(item);
        setModalVisible(true);
    }
    const addCheckbox = (done,item) => {
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
 
    const clearCheckboxList = async() => {
            setSelectedCheckboxs([]); 
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
            let req = {UserId: user.currentUserID, LanguageId: lang, refreshToken: user.refreshToken, token: user.accessToken, ids: [item]}
            let api = new VaccinationsApiService();
            api.share(req).then(res=>res.json()).then(res=>{
                setLoding(false)
                let returnStatus = res.returnStatus;
                if(returnStatus.returnCode == 200){
                    Share.share({
                        message: user.userSession.fullName + ' shared you vaccination. Check at ' + res.pdfLink,
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
            let req = {UserId: user.currentUserID, LanguageId: lang, refreshToken: user.refreshToken, token: user.accessToken, ids: selectedCheckboxs}
            console.warn(selectedCheckboxs)
            let api = new VaccinationsApiService();
            console.warn(req)
            api.share(req).then(res=>res.json()).then(res=>{
                setLoding(false)
                let returnStatus = res.returnStatus;
                if(returnStatus.returnCode == 200){
                    Share.share({
                        message: user.userSession.fullName + ' shared you vaccination. Check at ' + res.pdfLink,
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
    const callActions = (index) => {
        if(index == 1) {
            let datas = selecteditem;
            datas.VaccinationDate = selectDatet;
            updatevaccinated('',datas);
        } else {
            updatevaccinated('',selecteditem);
        }
    };

    const menuIcon=(id)=>(
        <TouchableOpacity onPress={() => setVisible(id)} style={{height:30,width:30,alignItems:"flex-end", paddingLeft:10}}>
            <Entypo name="dots-three-vertical" size={20} color={theme.colors.dark}  />
        </TouchableOpacity>
    )
    
    const renderCheckbox=(item)=>{
        if(selectedCheckboxs.length > 0) { 
        return(<View style={{width:60, paddingTop:10}}>
            <CheckBox 
                checked={(selectedCheckboxs.indexOf(item.id) > -1) ? true : false} 
                value={item.id}
                onValueChange={(done)=>{addCheckbox(done,item.id)}}
                />                   
        </View>)
            
        } else{ 
            return(null) 
        }
    } 


    const renderDrowMenu=(id, item)=>{
        return(
        <Layout  level='1'>
            <Popover 
                backdropStyle={Styles.backdrop}
                visible={visible == item.id}
                anchor={() => menuIcon(item.id)}
                onBackdropPress={() => setVisible(false)}
            >
                <Layout style={[Styles.content,{width:180,}]}>
                    <View>
                        <Text 
                            onPress={()=>{setVisible(false); props.navigation.navigate('CreateVaccination', {familyMember, vaccine: item})}}
                            style={{ padding: 10, fontSize: 16, justifyContent:'flex-start', alignItems:'flex-start', borderBottomWidth:0.5, borderBottomColor:"#8A92A3", color:"#596377" }}>
                            <Icon name="edit-2"  type="Feather" style={{fontSize: 14, color:"#596377"}}></Icon> {' '}
                            Edit
                        </Text>
                        <Text 
                            onPress={()=>share(id)}
                            style={{ padding: 10,fontSize: 16,justifyContent:'flex-start',alignItems:'flex-start',borderBottomWidth:0.5,borderBottomColor:"#8A92A3",color:"#596377"}}>
                            <Icon name="share-2" type="Feather" style={{fontSize: 14, color:"#596377"}}></Icon> {' '}
                            Share
                        </Text>
                        <Text 
                        onPress={()=>{setVisible(false); confirmDelete(id)}}
                            style={{padding: 10,fontSize: 16,justifyContent:'flex-start',alignItems:'flex-start',color:"#596377"}}>
                            <Icon name="trash-2" type="Feather" style={{fontSize: 14, color:"#596377"}}></Icon>{' '}
                            Delete
                        </Text>
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
    const confirmDeleteAll = () => {
        setDeleteAllModal(true)
    }

    const deleteVaccination = () => {
        setLoding(true)
        setDeleteModal(false)
        let id = deleteId
        AsyncStorage.getItem('loginData').then(user=>{
            user = JSON.parse(user);
            let auth = new VaccinationsApiService();
            let formData = {
                Id: id, refreshToken: user.refreshToken
            }
            formData.token = user.accessToken;
            auth.delete(formData).then(res=>res.json()).then(res=>{
                // console.log(res)
                getVaccinations();
            })
          })
    }
    const multiDeleteVaccination = () => {
        setLoding(true)
        setDeleteAllModal(false)
        AsyncStorage.getItem('loginData').then(user=>{
            user = JSON.parse(user);
            let auth = new VaccinationsApiService();
            let formData = {
                Ids: selectedCheckboxs, refreshToken: user.refreshToken
            }
            formData.token = user.accessToken;
            auth.multiDelete(formData).then(res=>res.json()).then(res=>{
                getVaccinations();
            })
          })
    }
    return (
        <Container style={Styles.mainContainer}>
            {loader &&
                <ActivityIndicator size="large" color={theme.colors.primary} />
            }
            {!loader &&
                <>
                <Row style={{flex:0.07, marginVertical:10, marginLeft:10}}>
                    <Col style={{alignItems:'flex-start', flex:0.1, justifyContent:'center'}}>
                        <Icon onPress={()=>props.navigation.goBack(null)} name="arrow-left" type="Feather" style={{fontSize:20,}} />
                    </Col>
                    <Col style={{alignItems:'center', flex:0.8, justifyContent:'center'}}>
                        {familyMember.name == "My Vaccinations"? <Text style={Styles.mainHeading}>{familyMember.name}</Text> : <Text style={Styles.mainHeading}>{familyMember.name} 's Vaccinations</Text> }
                    </Col>
                </Row>
            
                <Row style={{flex:1}}>
                    <Tabs 
                        tabBarUnderlineStyle={{ backgroundColor: "#146ECB"}}
                        initialPage={initialPage} 
                        style={{margin:2, flex: 1}} 
                        onChangeTab={({i}) => clearCheckboxList()}
                        >
                        <Tab heading={"Upcoming " + upcoming.length + " "} tabStyle={{backgroundColor: '#fff'}} textStyle={{fontSize:14, fontWeight:"bold", color: '#000'}} activeTabStyle={{backgroundColor:'#fff',}} activeTextStyle={{color: '#146ECB', fontWeight: 'bold'}}>
                            <Vaccinated setVisible={setVisible} renderDrowMenu={renderDrowMenu} vaccinated={showModal} list={upcoming} type={"upcoming"} share={share} visible={visible} addCheckbox={addCheckbox} selectedCheckboxs={selectedCheckboxs} checkboxcount= {upcoming.length} renderCheckbox={renderCheckbox} clearCheckboxList={clearCheckboxList} confirmDeleteAll={confirmDeleteAll} confirmDelete={confirmDelete} multiShare={multiShare} />
                        </Tab>
                        <Tab heading={"Vaccinated " + vaccinated.length + " "} tabStyle={{backgroundColor: '#fff'}} textStyle={{fontSize:14, fontWeight:"bold", color: '#000'}} activeTabStyle={{backgroundColor:'#fff',}} activeTextStyle={{color: '#146ECB', fontWeight: 'bold'}} >
                            <Vaccinated setVisible={setVisible} renderDrowMenu={renderDrowMenu} vaccinated={switchToNonVaccinated} list={vaccinated} type={"vaccinated"} share={share} visible={visible} addCheckbox={addCheckbox}  selectedCheckboxs={selectedCheckboxs} checkboxcount= {vaccinated.length} renderCheckbox={renderCheckbox} clearCheckboxList={clearCheckboxList} confirmDeleteAll={confirmDeleteAll}  multiShare={multiShare} />
                        </Tab>
                        <Tab heading={"Overdue " + overdue.length + " "} tabStyle={{backgroundColor: '#fff'}} textStyle={{fontSize:14, fontWeight:"bold", color: '#000'}} activeTabStyle={{backgroundColor:'#fff',}} activeTextStyle={{color: '#146ECB', fontWeight: 'bold'}} >
                            <Vaccinated setVisible={setVisible} renderDrowMenu={renderDrowMenu} vaccinated={showModal} list={overdue} type={"overdue"} share={share} visible={visible} addCheckbox={addCheckbox}  selectedCheckboxs={selectedCheckboxs} checkboxcount= {overdue.length} renderCheckbox={renderCheckbox} clearCheckboxList={clearCheckboxList} confirmDeleteAll={confirmDeleteAll}  multiShare={multiShare} />
                        </Tab>
                    </Tabs>
                </Row>
                </>
            }
            <View style={Styles.addButtonContainer}>
                <Button
                onPress={()=>props.navigation.navigate('CreateVaccination', {familyMember})}
                accessoryLeft={()=>addIcon()} style={Styles.button} status="primary" size="large" />
            </View>
            <Modal animationType="fade" visible={deleteModal} transparent onRequestClose={()=>setDeleteModal(false)}>
                <View style={{flex: 1, paddingHorizontal: 20, backgroundColor: 'rgba(0, 0, 0, 0.5)', paddingBottom: 30, justifyContent: 'flex-end'}}>
                    <DeleteModal message="Are you sure you want to delete?" 
                        delete={deleteVaccination} 
                        cancel={()=>setDeleteModal(false)} />
                </View>
            </Modal>
            <Modal animationType="fade" visible={deleteAllModal} transparent onRequestClose={()=>setDeleteAllModal(false)}>
                <View style={{flex: 1, paddingHorizontal: 20, backgroundColor: 'rgba(0, 0, 0, 0.5)', paddingBottom: 30, justifyContent: 'flex-end'}}>
                    <DeleteModal message="Are you sure you want to delete?" 
                        delete={multiDeleteVaccination} 
                        cancel={()=>setDeleteAllModal(false)} />
                </View>
            </Modal>


            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                }}
            >
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Calendar
                        onDayPress={selectDate}
                        markedDates={selecteddates}
                        />
                    <View
                        style={{
                            height:80,
                            flexDirection:'row',
                            justifyContent:'center',
                            alignItems:'center'
                        }}
                        >
                        <View
                            style={{
                                flex:1,
                                justifyContent:'center',
                                alignItems:'center',
                                flexDirection:'row',

                            }}
                            >
                            <TouchableOpacity 
                                onPress={() => {
                                    setModalVisible(!modalVisible);
                                }}
                                style={{
                                    flexDirection:'row',
                                }}
                                >
                                <Text style={{fontSize:10}}>CANCEL</Text>  
                            </TouchableOpacity> 
                        </View>
                        <View
                            style={{
                                flex:1,
                                justifyContent:'center',
                                alignItems:'center'
                            }}
                            >
                            <TouchableOpacity 
                                onPress={() => {
                                    setModalVisible(!modalVisible);
                                    callActions(0);
                                }}>
                                <Text style={{fontSize:10}}>SAVE WITHOUT DATE</Text>   
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                                flex:1,
                                justifyContent:'center',
                                alignItems:'center'
                            }}
                            >  
                            <TouchableOpacity 
                                onPress={() => {
                                    setModalVisible(!modalVisible);
                                    callActions(1);
                                }}>
                                <Text style={{fontSize:10}}>SAVE</Text>   
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                </View>
            </Modal>
        </Container>
    )
}
const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 10,
      backgroundColor: "white",
      borderRadius: 10,
      padding: 0,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    openButton: {
      backgroundColor: "#F194FF",
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });