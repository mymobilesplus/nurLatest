import React, { useEffect } from 'react'
import { View, Text,Image,TouchableOpacity, ActivityIndicator, RefreshControl, FlatList, Share, Modal} from 'react-native'
import {Styles} from "./Style/_MedicalReminderListStyle"
import {theme,images} from "../../constants"
import {Button, Layout, Popover} from "@ui-kitten/components"
import Icon from 'react-native-vector-icons/Feather';
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from "react-native-responsive-screen"
import AsyncStorage from '@react-native-community/async-storage';
import ReminderApiService from '../../services/ReminderApiService';
import {connect} from 'react-redux';
import * as action from "../../redux/actions/_Login"
import moment from "moment"
import Entypo from "react-native-vector-icons/Entypo"
import { useFocusEffect } from '@react-navigation/native';
import DashboardStackHeader from '../../components/header/DashboardStackHeader';
import {  } from 'react-native-paper';
import DeleteModal from '../../components/DeleteModal';
import { IMAGE_URL } from '../../API_URI';
import PushNotification from 'react-native-push-notification'

const{icons}=images

function _MedicalReminderList(props) {
    const [visible, setVisible] = React.useState(0);
    const [selectedIndex, setSelectedIndex] = React.useState(null);
    const [List, setProfileList] = React.useState([]);
    const [loader, setLoding]= React.useState(true);
    const [deleteModal, setDeleteModal]= React.useState(false);
    const [deleteId, setDeleteId]= React.useState(-1);

    const addIcon=()=>{
        return(
            <Icon name="plus" type="Feather" style={{color: theme.colors.primary}} size={30} />
        )
    }

    useEffect(() => {
        // code to run on component mount
        // getProfiles();
      }, [])

      useFocusEffect(React.useCallback(() => {
        getProfiles();
    }, []));

    const getProfiles = async() =>{
        props.navigation.setOptions({ headerTitle: () => <DashboardStackHeader filterRecords={null} {...props}  title="Fetching Reminders..." /> });
        setLoding(true)
        let user = await AsyncStorage.getItem("loginData");
        if(user!=null){
            user = JSON.parse(user);
            let api = new ReminderApiService();
            api.get({UserId: user.currentUserID, token: user.accessToken, refreshToken: user.refreshToken}).then(res=>res.json()).then(res=>{
                setLoding(false)
                if(res.reminders != undefined){
                    let records = res.reminders;
                    setProfileList(records);
                    // alert(JSON.stringify(records));
                    // console.log('recordsss',JSON.stringify(records,null,4));
                    props.navigation.setOptions({ headerTitle: () => <DashboardStackHeader {...props} records={records} filterRecords={filterRecords}  title="My Reminders" /> });
                }
                else{
                    props.logout();
                }
                
            })
        }
    }

    const filterRecords = (text, records) => {
        let list = records.filter(f=>{
            return f.medicineName.toLowerCase().includes(text.toLowerCase());
        })
        setProfileList(list)
    }

    const menuIcon=(id)=>(
        <Entypo name="dots-three-vertical" size={24} color={theme.colors.dark}  onPress={() => setVisible(id)} />
    )

    const renderDrowMenu=(id)=>{
        return(
            <Layout  level='1'>
                <Popover
                    backdropStyle={Styles.backdrop}
                    visible={visible == id}
                    anchor={()=>menuIcon(id)}
                    onBackdropPress={() => setVisible(false)}>
                    <Layout style={[ Styles.content,{ width:180 }]}>
                        <View style={{width:180}}>
                            <Text onPress={()=>{setVisible(false); props.navigation.navigate('AddNewReminder', {reminder: List.filter(l=>
                                    l.id == id
                                    )})}} style={{ padding: 10, 
                                        fontSize: 16,
                                        justifyContent:'flex-start',
                                        alignItems:'flex-start',
                                        borderBottomWidth:0.5,
                                        borderBottomColor:"#8A92A3",
                                        color:"#596377"}}>
                                <Icon name="edit-2"  type="Feather" style={{fontSize: 14, color:"#596377"}}></Icon> {' '}
                                Edit</Text>
                            <Text onPress={()=>{setVisible(false); deleteReminder(id)}} style={{                                    padding: 10, 
                                    // paddingHorizontal: 50, 
                                    fontSize: 16,
                                    justifyContent:'flex-start',
                                    alignItems:'flex-start',
                                    borderBottomWidth:0.5,
                                    borderBottomColor:"#8A92A3",
                                    color:"#596377"}}>
                                <Icon name="trash-2" type="Feather" style={{fontSize: 14, color:"#596377"}}></Icon>{' '}
                                Delete</Text>
                        </View>
                    </Layout>
                </Popover>
            </Layout>
        )
    }

    const deleteReminder = (id) => {
        setDeleteId(id)
        setDeleteModal(true)
    }

    const deleteHealthRecord = () => {
        let id = deleteId
        setDeleteModal(false);
        let data = List.filter((obj)=> obj.id==id);
        // alert(JSON.stringify(data));
        let ids = [];
        data[0].reminderDateTimes.forEach((item,index)=>{
            ids.push(id + '' + index);
        })
        // alert(JSON.stringify(ids));
        // return;
        setLoding(true);
        // alert(id);
        // return;
        AsyncStorage.getItem('loginData').then(user=>{
            user = JSON.parse(user);
            let auth = new ReminderApiService();
            let formData = {
                Id: id,
                refreshToken: user.refreshToken
            }
            formData.token = user.accessToken;
            auth.delete(formData).then(res=>res.json()).then(res=>{
                ids.forEach((item)=>{
                    PushNotification.cancelLocalNotifications({id : item});
                })
                getProfiles();
            })
        });
        // PushNotification.cancelLocalNotifications({id : })
    }

    const renderRow = ({item, index}) => {
        // console.warn(item)
        return(
            <View style={Styles.recordContainer} key={index}>
                {item.files[0] !== undefined && item.files[0].file_src !== "" && item.files[0].file_src !== null ?
                <Image source={{uri: IMAGE_URL + item.files[0].file_src}}  style={Styles.addPhoto}  /> :
                <Image source={require('../../assets/AddPhoto.png')} style={Styles.addPhoto}  />
                } 
                <View style={{flex:1,alignContent:"flex-start",height: hp('16%'), paddingHorizontal:5, justifyContent:"space-between",}}>
                <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                    <View style={Styles.descriptionContainer}>
                        <Text style={Styles.description}>{item.medicineName}</Text>
                        {item.otherMedicineDoze !== "" ? <Text style={Styles.doze}>{item.otherMedicineDoze}</Text> : <Text style={Styles.doze}>No pills</Text>}
                        <Text style={Styles.user}>{item.familyMemberName}</Text>
                    </View>
                    <View style={Styles.iconContainer}>
                        <TouchableOpacity>
                        {renderDrowMenu(item.id)}
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={Styles.bottomContainer}>
                    <View style={Styles.dateContainer}>
                        <Image source={require("../../assets/calendar-blank-outline.png")} style={{ width: 20, height: 20, resizeMode: 'stretch' }} />
                            {item.isLifetime? <Text>Everyday </Text> : item.isEveryday? <Text>{item.noOfDays} {'days '}</Text> : <Text>{' '} {item.reminderDateTimes[0] !== undefined && moment(item.reminderDateTimes[item.reminderDateTimes.length-1].reminderDate).format('DD-MM-yyyy')} {' '}</Text>}
                        <Image source={require("../../assets/clock-outline.png")} style={{ width: 20, height: 20, resizeMode: 'stretch' }} />
                        {item.isEveryday ? <Text>{' '} {item.reminderDateTimes !== undefined && item.reminderDateTimes.length} {item.reminderDateTimes.length === 1 ? "time" : "times"} per day</Text>
                         : <Text>{' '}1 time per day</Text>}
                    </View>
                    <View>
                    </View>
                </View>
                </View>
            </View>
       )
    }

    return (
        <View style={Styles.mainContainer}>
            {List.length > 0 &&
                <FlatList
                    data={List} 
                    renderItem={renderRow}
                    refreshControl={
                        <RefreshControl onRefresh={getProfiles} refreshing={loader} />
                    }
                    /> 
            }
            {loader && List.length == 0 &&
                <View style={Styles.mainContainer}>
                    <ActivityIndicator size="large" color={theme.colors.primary} />
                </View>
            }
            {List.length == 0 && !loader &&
                <View style={Styles.mainContainer}>
                    <View style={Styles.heartContainer}>
                        <Image source={icons.reminders} style={Styles.heart}  />
                        <Text style={Styles.text}>Add Your First Medical Reminder</Text>
                    </View>
                </View>
            }

            <View style={Styles.addButtonContainer}>
                <Button
                    onPress={()=>props.navigation.navigate('Select Family Member')}
                    accessoryLeft={()=>addIcon()} style={Styles.button} status="primary" size="large" />
            </View>
            <Modal animationType="fade" visible={deleteModal} transparent onRequestClose={()=>setDeleteModal(false)}>
                <View style={{flex: 1, paddingHorizontal: 20, backgroundColor: 'rgba(0, 0, 0, 0.5)', paddingBottom: 30, justifyContent: 'flex-end'}}>
                    <DeleteModal message="Are you sure you want to delete?" 
                        delete={deleteHealthRecord} 
                        cancel={()=>setDeleteModal(false)} />
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

export default connect(mapStateToProps,mapDispatchToProps)(_MedicalReminderList)
