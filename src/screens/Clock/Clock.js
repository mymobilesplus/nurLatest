import React, { useEffect, useState } from 'react'
import { View, Text,Image,TouchableOpacity,KeyboardAvoidingView, StyleSheet, ActivityIndicator, FlatList, RefreshControl, Modal} from 'react-native'
import {Styles} from "./Styles/ClockStyle"
import {theme} from "../../constants"
import { Icon, Content } from 'native-base';
import { icons } from '../../constants/images';
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from "react-native-responsive-screen"
import {Button} from '@ui-kitten/components'
import {Row, Col} from "native-base"
import Header from '../../components/header/Header';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment'
import TimeAgo from 'react-native-timeago';
import Snoozed from '../../components/ClockNotification/Snoozed';
import LinearGradient from 'react-native-linear-gradient';
import { editAlarm ,deleteAlarmById } from 'react-native-simple-alarm';
import DeleteModal from '../../components/DeleteModal';

export default function Clock(props) {
    const [selectedIndex, setSelectedIndex] = React.useState(null);
    const [List, setProfileList] = React.useState([]);
    const [loader, setLoding]= React.useState(false);
    const [snoozed, setSnoozeModal] = useState(false)
    const [showSkipped, setSkipModal] = useState(false)
    const [taken, setTakenModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState({})
    const [deleteModal, setDeleteModal]= React.useState(false);
    const [deleteId, setDeleteId]= React.useState(-1);
    

    useEffect(() => {
        // alert('jhgk')
        // getProfiles();
        getNotifications();

      }, [])

    useFocusEffect(React.useCallback(() => {
        getNotifications();
    }, []));

    const getNotifications = async() =>{
        let alarms = await AsyncStorage.getItem("_RNSA-alarm")
        if(alarms != null){
            alarms = JSON.parse(alarms)
            console.warn("noti",alarms)
            // alert(JSON.stringify(alarms))
            setProfileList(alarms)
            if(props.route.params !== undefined){
                let setItem = alarms.filter(l=> props.route.params.id == l.id )
                setSelectedItem(setItem[0])
                console.warn(alarms.indexOf(setItem[0]))
                console.warn("action",props.route.params.action)
                if (props.route.params.action === "Take") {
                    setTakenModal(true)
                  } else if (props.route.params.action === "Skip") {
                    setSkipModal(true)
                  } else if (props.route.params.action === "Snooze") {
                    setSnoozeModal(true)
                  }
            }
        }
    }

    const skipAlarms = async (item) => {
        console.warn("skipped item id",item.id)
        console.warn("List length",List.length)
        let {id,date,snooze,message,userInfo} = item
        item.active = false
        userInfo.status = "Skipped";
        alarms = List.filter((l)=>l.id !== item.id)
        console.warn("ala1",alarms)
        console.warn("ala2",item)
        try {
          await AsyncStorage.setItem("_RNSA-alarm", JSON.stringify([...alarms, item]))
        } catch (e) {}
      }

    const takenAlarms = async (item) => {
        let {id,date,snooze,message,userInfo} = item
        item.active = false
        userInfo.status = "Taken";
        try {
          await editAlarm({
            id,
            date,
            snooze,
            message,
            active: true,
            userInfo
          });
        } catch (e) {}
      }

    const SnoozeAlarms = async (item,value) => {
        // alert(value);
        // return;
        let {id,date,message,userInfo} = item
        item.active = false
        userInfo.status = "Snoozed";
        try {
          await editAlarm({
            id,
            date,
            snooze: value,
            message,
            active: true,
            userInfo
          });
        } catch (e) {}
      }

      const deleteAlarm = async () => {
        setLoding(true)
        let id = deleteId
        console.warn("delete id", id)
        setDeleteModal(false)
        try {
            await deleteAlarmById(id);
            getNotifications()
            setLoding(false)
          } catch (e) {}
    }

      const confirmDelete = (id) => {
        setDeleteId(id)
        setDeleteModal(true)
    }

    const renderRow = ({item, index}) => {
        const reminder = item.userInfo.Reminder
        let image = undefined;
        return(
            <View style={{paddingHorizontal:15, paddingVertical:5}}>                              
            <TouchableOpacity onLongPress ={()=>{ confirmDelete(item.id)}} 
             onPress={()=> 
                { console.warn(item)
                    if(selectedItem == item){ 
                    setSelectedItem({})
                }else{
                    setSelectedItem(item)
                    }}
            }
            style={{backgroundColor:'#fff', borderWidth:1, borderColor:'#fff', borderRadius:10, elevation:4, flexDirection:'row', padding:wp('5%'), paddingBottom:0 }} > 
            <View style={{ flex:3 }}>
                <View style={{ flex:1, flexDirection:'row' }} >
                    <View style={{ flex:1.5, justifyContent:'center' }} >
                        <LinearGradient 
                            colors={[ '#044DC1', '#3BBFE3' ]} 
                            style={{ height:30, flexDirection:'row', paddingLeft:8, paddingRight:8, justifyContent:'center', alignItems:'center', borderRadius:5 }}
                            start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                            >
                            <Icon name="clock-o" type="FontAwesome" size={3} style={[{ color:theme.colors.white, fontSize:18, marginRight:0, paddingRight:0 }]}/> 
                            <Text style={[ styles.time, {color:'#fff',fontSize:16,fontWeight:'bold',marginLeft:0,textAlign:'left',paddingLeft:4,fontFamily:'OpenSansCondensed-Light'}]}>
                                {moment(reminder.reminderDateTimes[0].ReminderTime, ["HH:mm:ss"]).format('hh:mm a')}
                            </Text>
                        </LinearGradient>    
                    </View>
                    <View style={{flex:2,justifyContent:'center'}}>
                        <Text style={[styles.day,{textTransform:'uppercase',fontSize:18,fontFamily:'OpenSansCondensed-Light',fontWeight:'bold'}]}>
                            <TimeAgo time={item.date} />
                        </Text>
                    </View>
                </View>
                <View style={{flex:1,}}>
                    <Text style={ styles.medicine }>{reminder.MedicineName}</Text>
                </View>
                <View style={{flex:1,}}>
                    <Text style={[styles.pill,{fontFamily:'OpenSansCondensed-Light',fontWeight:'bold',marginBottom:15}]}>{reminder.OtherMedicineDoze}</Text>    
                </View>
            </View>
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <TouchableOpacity >
                    <Image source={image?{uri: image}: icons.AddPhoto} style={{height:60,width:60}} /> 
                </TouchableOpacity>    
            </View>
        </TouchableOpacity>
        {selectedItem.id == item.id &&
            <View style={{marginTop:10, marginBottom:30}}>
                <Row>
                    <Col>
                    <Button disabled={item.userInfo.status=="Skipped" || item.userInfo.status=="Taken" || item.userInfo.status=="Snoozed" } onPress={()=>{console.log("called"); setSnoozeModal(true)}} style={[{borderRadius:20, backgroundColor:'#fff', marginRight:5}, item.userInfo.status=="Skipped" || item.userInfo.status=="Taken"?{borderColor:'#eee'} : {borderColor:'#596377'}]}><Text style={item.userInfo.status=="Skipped" || item.userInfo.status=="Taken"? {color:"#eee"}:{color:"#596377"}}>SNOOZE</Text></Button>
                    </Col>
                    <Col>
                    <Button disabled={item.userInfo.status=="Skipped" || item.userInfo.status=="Taken" || item.userInfo.status=="Snoozed" } onPress={()=>{console.log("called"); setSkipModal(true)}} style={[{borderRadius:20, backgroundColor:'#fff', marginRight:5},item.userInfo.status=="Taken" || item.userInfo.status=="Snoozed"?{borderColor:'#eee'}:{borderColor:'#DB3872'}]}><Text style={item.userInfo.status=="Taken" || item.userInfo.status=="Snoozed"? {color:"#eee"} :{color:'#DB3872'}}>{item.userInfo.status=="Skipped" ? "SKIPPED": "SKIP"}</Text></Button>
                    </Col>
                    <Col>
                    <Button disabled={item.userInfo.status=="Skipped" || item.userInfo.status=="Taken" || item.userInfo.status=="Snoozed" } onPress={()=>{console.log("called"); setTakenModal(true)}} style={[{borderRadius:20, backgroundColor:'transparent',marginRight:5 }, item.userInfo.status=="Skipped" || item.userInfo.status=="Snoozed"?{borderColor:'#eee'}:{borderColor:'#84B244'}]}><Text style={item.userInfo.status=="Skipped" || item.userInfo.status=="Snoozed"?{color:"#eee"} :{color:'#84B244'}}>{item.userInfo.status=="Taken" ? "TAKEN": "TAKE"}</Text></Button>
                    </Col>
                </Row>
            </View>
            }
            <Modal animated={true} visible={snoozed} transparent onRequestClose={()=>setSnoozeModal(false)}>
                <View style={{ flex: 0.5, marginTop:70, marginBottom:140, marginLeft:30, marginRight:30}}>
                    <Snoozed onClose={()=>setSnoozeModal(false)} SnoozeAlarms={SnoozeAlarms} item={selectedItem} refresh={getNotifications} />
                </View>
            </Modal>
            <Modal animated={true} visible={taken} transparent onRequestClose={()=>setTakenModal(false)}>
            <View style={{backgroundColor: '#fff', flex: 0.3, marginTop:60, marginBottom:60, marginLeft:30, marginRight:30}}>
                    {/* <Skipped onClose={()=>setSkipModal(false)} removeItemId={item.id}  refresh={getProfiles} /> */}
                <Content>
                    <Row >
                        <Col style={{alignItems:'center',padding:20}}>
                        <Text style={{fontSize:20, fontWeight:"bold"}}>Are you Sure?</Text>
                        </Col>
                    </Row>

                    <Row style={{marginBottom:10,marginTop:0, padding:10}}>
                        <Col style={{flex:0.6, alignItems:'center', borderWidth:1, borderColor:'#146ECB', padding:10, borderRadius:20, marginRight:5 }}>
                        <TouchableOpacity onPress={()=>setTakenModal(false)} >
                        <Text style={{color:'#146ECB'}}>Cancel</Text>
                        </TouchableOpacity>
                        </Col>
                        <Col style={{flex:0.6, alignItems:'center', borderWidth:1, borderColor:'#84B244',backgroundColor:'#84B244', padding:10, borderRadius:20 }}>
                        <TouchableOpacity onPress={()=>{takenAlarms(selectedItem); setTakenModal(false)}}>
                        <Text style={{color:'#fff'}}>Confirm</Text>
                        </TouchableOpacity>
                        </Col>
                    </Row>
                    </Content>
                </View>
            </Modal>
            <Modal animated={false} visible={showSkipped} transparent onRequestClose={()=>setSkipModal(false)}>
                <View style={{backgroundColor: '#fff', flex: 0.3, marginTop:60, marginBottom:60, marginLeft:30, marginRight:30}}>
                    {/* <Skipped onClose={()=>setSkipModal(false)} removeItemId={item.id}  refresh={getProfiles} /> */}
                <Content>
                    <Row >
                        <Col style={{alignItems:'center',padding:20}}>
                        <Text style={{fontSize:20, fontWeight:"bold"}}>Are you Sure?</Text>
                        </Col>
                    </Row>

                    <Row style={{marginBottom:10,marginTop:0, padding:10}}>
                        <Col style={{flex:0.6, alignItems:'center', borderWidth:1, borderColor:'#146ECB', padding:10, borderRadius:20, marginRight:5 }}>
                        <TouchableOpacity onPress={()=>setSkipModal(false)} >
                        <Text style={{color:'#146ECB'}}>Cancel</Text>
                        </TouchableOpacity>
                        </Col>
                        <Col style={{flex:0.6, alignItems:'center', borderWidth:1, borderColor:'#84B244',backgroundColor:'#84B244', padding:10, borderRadius:20 }}>
                        <TouchableOpacity onPress={()=>{skipAlarms(selectedItem); setSkipModal(false)}}>
                        <Text style={{color:'#fff'}}>Confirm</Text>
                        </TouchableOpacity>
                        </Col>
                    </Row>
                    </Content>
                </View>
            </Modal>
        </View>
       )
    }
    return (
            <View style={Styles.mainContainer}>
                <View style={{height:50}}>
                    <Header {...props} remindersCount={List.length}/>
                </View>
                    <View style={{backgroundColor:theme.colors.white}}>

                {List.length > 0 &&
                    <FlatList
                    keyExtractor={item => item.id}
                    initialScrollIndex={selectedIndex}
                    data={List} 
                    renderItem={renderRow}
                    refreshControl={
                        <RefreshControl onRefresh={getNotifications} refreshing={loader} />
                    }
                    /> 
                }
                </View>
                {loader && List.length == 0 &&
                        <ActivityIndicator size="large" color={theme.colors.primary} />
                }
                {List.length == 0 && !loader &&
                        <View style={Styles.heartContainer}>
                            <Image source={icons.reminders} style={Styles.heart}  />
                            <Text style={Styles.text}>Add Your First Medical Reminder</Text>
                        </View>
                } 
                    <Modal animationType="fade" visible={deleteModal} transparent onRequestClose={()=>setDeleteModal(false)}>
                        <View style={{flex: 1, paddingHorizontal: 20, backgroundColor: 'rgba(0, 0, 0, 0.5)', paddingBottom: 30, justifyContent: 'flex-end'}}>
                            <DeleteModal message="Are you sure you want to delete?" 
                                delete={deleteAlarm} 
                                cancel={()=>setDeleteModal(false)} />
                        </View>
                    </Modal>
                </View>
    )
}

const styles=StyleSheet.create({
   
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
    nameContainer: {
        flex:1,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    },
    nameAndphoto: {
    flexGrow:0.8,
    alignItems:"center",
    flexDirection:"row"
    },
    camera:{
        resizeMode:"contain",
        width:wp('10%'),
        height:wp('10%')
    },
    name:{
        fontSize: wp('6%'),
        fontFamily:"OpenSans-SemiBold",
        color:theme.colors.black,
        paddingLeft:10
    },
    forwardContainer:{
        flexGrow:0.2,
        justifyContent:'flex-end',
        alignItems:'flex-end', 
    },
    forward:{
        resizeMode:"contain",
        width:wp('5%'),
        height:wp('5%')
    },
    container:{
        justifyContent:"space-between",
        flexDirection:"row",
        borderWidth:1,
        padding:5, 
        borderColor:'#ccc',
        marginBottom:10
    },
    timeContainer: {
        flexDirection:"row",
        paddingVertical:wp('3%'),
        alignItems:"center"
    
    },
    timeBackground:{
        backgroundColor:theme.colors.primary,
        borderRadius:3,
        paddingVertical:wp('1%'),
        paddingHorizontal:wp('2%'),
        flexDirection:"row"
    },
    time:{
        color:theme.colors.white,
        fontSize:wp('4%'),
        paddingLeft:10
    
    },
    day:{
        fontSize:wp('4%'),
        textTransform:"uppercase",
        color:theme.colors.black,
        fontFamily:"OpenSans-SemiBold",
        paddingLeft:10
    },
    medicine:{
        fontFamily:"OpenSans-Regular",
        fontSize:wp('5%')
    },
    pill:{
        fontSize:wp('7%'),
        fontFamily:"OpenSans-SemiBold",
        color:theme.colors.black
    },
    addPhotoContainer:{
        justifyContent:"center",
        alignItems:"center"
    },
    addPhoto:{
        resizeMode:"contain",
        width:wp('20%'),
        height:wp('20%')
    }
    })