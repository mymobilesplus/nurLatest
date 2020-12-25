import React,{useState, useEffect} from 'react'
import { View, Text,Image,TouchableOpacity, StyleSheet} from 'react-native'
import {Styles} from "./Style/MedicalReminderFormStyle"
import {theme,images} from "../../constants"
import Icon from 'react-native-vector-icons/EvilIcons';
import {widthPercentageToDP as wp,heightPercentageToDP as hp, widthPercentageToDP} from "react-native-responsive-screen"
import {Button} from '@ui-kitten/components'
import { Input, Container, Content, Item, Label, Row, Col } from 'native-base';
import AntDesign from "react-native-vector-icons/AntDesign"
import ImagePicker from 'react-native-image-picker';
import ReminderApiService from '../../services/ReminderApiService';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import * as  RootNavigation from "../../navigation/RootNavigation"
import { getAlarms, deleteAllAlarms } from 'react-native-simple-alarm';
import LinearGradient from 'react-native-linear-gradient';
import ClosingHeader from "../../components/header/ClosingHeader"
import Modal from 'react-native-modal';
import PushNotification from 'react-native-push-notification';
import { BASE_API, IMAGE_URL } from '../../API_URI';
const active = [theme.colors.primary, theme.colors.secondary]

const alarmStorage = "_RNSA-alarm";

const {icons}=images
const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export default function _AddNewReminder(props) {
    const {icons,loader}=images
    const [file,setFile]=useState('')
    const [dose,setDose]=useState('')
    const [otherDose,setOtherDose]=useState('')
    const [dates, setDate]=useState([])
    const [medicine,setMedicine]=useState('')
    const [familyMember,setFamilyMember]=useState("")
    const [recordID, setRecordID]=useState(null)
    const [update, setUpdate]=useState(false)
    const [mlDose, setMlDose]=useState(false)
    const [loading,setLoading]=useState(false)
    const [everday, setEverday] = useState(true)
    const [showLifetime, setShowLiftime] = useState(false)
    const [isLifeTime, setLiftime] = useState(false)
    const [showCustom, setShowCustom] = useState(false)
    const [numberOfDays, setNumberOfDays] = useState(1)
    const [visible, setVisible] = useState(0);
    const [id_to_increment_from, set_id_to_increment_from] = useState(null);
    const [everydayTimes, setTime]=useState([])

    useEffect(()  =>{
      getProps();
      getAlarm();
    }, [props]);

    const{navigation}=props
    const LoadingIndicator = (props) => (
      <View style={ Styles.indicator}>
       <Image source={loader.white}  />
      </View>
    );

    const  openImageLibrary=()=>{
      ImagePicker.launchImageLibrary(options, (response) => {
        console.log("Selected File: ",response)
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          let f = [...file];
          const source = { 
            FileName: response.fileName, 
            FileSize: response.fileSize, 
            FileType: response.type,
            FileAsBase64: response.data  };
          f.push({File: source, uri: response.uri})
          setFile(f)
          setVisible(false)
        }
      });
    }
    
    const openCamera=()=>{
      ImagePicker.launchCamera({...options, quality : 0.1}, (response) => {
        console.log("Selected File: ",response)
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          let f = [...file];
          const source = { 
            FileName: response.fileName, 
            FileSize: response.fileSize, 
            FileType: response.type,
            FileAsBase64: response.data  };
          f.push({File: source, uri: response.uri})
          setFile(f)
          setVisible(false)
        }
      });
  }

  const saveReminder=()=>{
    // alert(JSON.stringify(file));
    // return;
    setLoading(true)
    let IsLifetime = 0;
    if(everday){
      IsLifetime = 1
    }
    let formData = {
      ID: recordID,
      MedicineName: medicine,
      MedicineDozeSD: dose, 
      OtherMedicineDoze: otherDose,
      IsLifetime: isLifeTime,
      reminderDateTimes:dates,
      Files: file,
      FamilyMemberID: familyMember, 
      isEveryday : everday,
      noOfDays: everday? numberOfDays : dates.length,
    }
    AsyncStorage.getItem('loginData').then(user=>{
      user = JSON.parse(user);
      let auth = new ReminderApiService();
      formData.token = user.accessToken;
      formData.UserId = user.currentUserID;
      formData.FamilyMemberID = familyMember
      formData.refreshToken= user.refreshToken;
      // alert(JSON.stringify(formData));
      // return;
      if(update){
        let fl = file.filter((obj)=> !obj.id);
        formData.Files = fl;
        // alert(JSON.stringify(fl));
        return;
        let _prev_reminder_dts = props.route.params.reminder[0].reminderDateTimes;
            let ids = [];
            if(_prev_reminder_dts.length>0){
              _prev_reminder_dts.forEach((item,index)=> {ids.push(recordID + '' + index)});
            }
            ids.forEach((item)=> PushNotification.cancelLocalNotifications({id : item}));
            // PushNotification.cancelLocalNotifications({id})
            // alert(JSON.stringify(_prev_reminder_dts));
            // return;
        // alert(JSON.stringify(dates));
        // return;
        formData.ID = recordID
        // console.log("Update Form Data: ",JSON.stringify(formData))
        auth.update({"Reminder": formData}).then(res=>res.json()).then(res=>{
          console.log('some response after adding data',JSON.stringify(res,null,4));
          setLoading(false)
          if(res.id == 0){
            alert("Some Backed Error Check\n"+res.returnStatus.returnMessage);
          }
          else{
            if (dates.length !== 0){
              let date = {}
              let snooze = 0
              if(everday){
                alarmCreate(
                    {Reminder: {
                    ID: recordID,
                    MedicineName: medicine,
                    MedicineDozeSD: dose, 
                    OtherMedicineDoze: otherDose,
                    IsLifetime: isLifeTime,
                    reminderDateTimes:dates,
                    FamilyMemberID: familyMember, 
                    isEveryday : everday,
                    noOfDays: everday? numberOfDays : dates.length,
                  }}
                  ,res.id,date,snooze)
              } else {
                alarmCreate({Reminder: {
                    ID: recordID,
                    MedicineName: medicine,
                    MedicineDozeSD: dose, 
                    OtherMedicineDoze: otherDose,
                    IsLifetime: isLifeTime,
                    reminderDateTimes:dates,
                    Files: file,
                    FamilyMemberID: familyMember, 
                    isEveryday : everday,
                    noOfDays: everday? numberOfDays : dates.length,
                  }},res.id,date,snooze)
              }
            }
            
            alert("Record Updated Successfully")
          }
          RootNavigation.navigate('My Medical Remiders');
        })
      }
      else{
        auth.create({Reminder: formData}).then(res=>res.json()).then(res=>{
          // console.log('some response after adding data',JSON.stringify(res,null,4));
          setLoading(false)
          if(res.id == 0){
            alert("Some Backed Error Check\n"+res.returnStatus.returnMessage);
          }
          else{
            console.warn("dates",dates)
            console.warn("everyday",everday)
            if (dates.length !== 0){
                let date = {}
                let snooze = 0
                if(everday){
                  alarmCreate(
                      {Reminder: {
                      ID: recordID,
                      MedicineName: medicine,
                      MedicineDozeSD: dose,
                      OtherMedicineDoze: otherDose,
                      IsLifetime: isLifeTime,
                      reminderDateTimes:dates,
                      FamilyMemberID: familyMember, 
                      isEveryday : everday,
                      noOfDays: everday? numberOfDays : dates.length,
                    }}
                    ,res.id,date,snooze)
                } else {
                  alarmCreate({Reminder: {
                      ID: recordID,
                      MedicineName: medicine,
                      MedicineDozeSD: dose, 
                      OtherMedicineDoze: otherDose,
                      IsLifetime: isLifeTime,
                      reminderDateTimes:dates,
                      Files: file,
                      FamilyMemberID: familyMember, 
                      isEveryday : everday,
                      noOfDays: everday? numberOfDays : dates.length,
                    }},res.id,date,snooze)
                }
              }
            alert("Record Added Successfully")
            RootNavigation.navigate('My Medical Remiders');
          }
        })
      }
    })
  }

    const getProps = () => {
      if(props.route.params!=undefined){
        console.log('params while editing', JSON.stringify(props.route.params,null,4));
        props.navigation.setOptions({ headerTitle: () => <ClosingHeader {...props} title="Create Medical Reminder"/> });
        let params = props.route.params;

        if(params.reminder !== undefined){
          setDate(params.reminder[0].reminderDateTimes)
          setEverday(params.reminder[0].isEveryday)
          setMedicine(params.reminder[0].medicineName)
          setDose(params.reminder[0].medicineDoze)
          setOtherDose(params.reminder[0].otherMedicineDoze)
          setLiftime(params.reminder[0].isLifetime)
          setEverday(params.reminder[0].isEveryday)
          setFamilyMember(params.reminder[0].familyMemberID)
          setFile(params.reminder[0].files)
          setRecordID(params.reminder[0].id)
          setUpdate(true)
          let id_to_increment_from = params.reminder[0].id + '' +  params.reminder[0].reminderDateTimes.length;
          // alert(id_to_increment_from)
          console.log('_id to increment from ', id_to_increment_from);
          set_id_to_increment_from(id_to_increment_from);
        }
        // alert(dose);
        if(params.ReminderDateTimes!=undefined){
          setDate(params.ReminderDateTimes)
          setEverday(params.isEveryday)
        }
      }
      if(props.route.params.familyMember != undefined){
        setFamilyMember(props.route.params.familyMember.id)
      }
    }

    const createAlarm = async (item) => {
      let alarmId = item._id;
      // alert(item._id);
      // return;
      // let alarmId = Math.floor(Math.random() * 100000) + 1;
      let d = item.date
      if (moment().isAfter(d)) {
        const addDayToDate = moment(d).add(1, "days").format();
        d = addDayToDate;
      }
      console.warn("inside func type", typeof new Date(item.date))
      const alarm = {
      "actions": ["Snooze", "Skip", "Take"],
      "active": true,
      "alertAction": "view",
      "allowWhileIdle": false,
      "autoCancel": true,
      "color": "white",
      "date":new Date(d),
      "id": alarmId,
      "ignoreInForeground": false,
      "importance": "high",
      "invokeApp": false,
      "message": item.message,
      "notificationId": alarmId, 
      "oid": alarmId,
      "ongoing": false,
      "playSound": true,
      "priority": "high",
      "repeatTime": 0,
      "repeatType": "time",
      "snooze": item.snooze,
      "userInfo": item.userInfo,
      "vibrate": true,
      "vibration": 1000,
      "visibility": "private"
    };
    // alert(JSON.stringify(alarm));
    console.log('alarm',JSON.stringify(alarm));
    // return;
      
      const storage = await AsyncStorage.getItem(alarmStorage);
      if (storage && storage.length > 0) {
        const updatedStorage = JSON.stringify([ alarm, ...JSON.parse(storage)]);
        await AsyncStorage.setItem(alarmStorage, updatedStorage);
      } else {
        await AsyncStorage.setItem(alarmStorage, JSON.stringify([alarm]));
      }

      console.warn("final alarm",alarm)
        await PushNotification.localNotificationSchedule(alarm);
        console.warn("alarm Created")      
    }

    const getAlarm = async () => {
      try {
        const alarms = await getAlarms();
        console.warn("alarms",alarms);
      } catch (e) {console.warn("error",e)}
    }

    const deleteAlarms = async () =>{
      try {
        await deleteAllAlarms();
      } catch (e) {}
    }

    const alarmCreate = async (item,id,date,snooze) => {
      try {
        console.warn("dates",dates)
          if(everday){
          let today = moment();
          console.warn("today",today)
          console.warn("year",today.year())
          console.warn("month",today.month())
          console.warn("day",today.date())
          for (let i = 0; i < dates.length ; i++) {
            date = moment(today.year() + "-"+ parseInt(today.month()+1) +"-"+ parseInt(today.date()) +" " + dates[i].ReminderTime, moment.defaultFormat).format();  
            console.warn("everyday date",date)
            console.warn("everyday date type",typeof date);
            
            await createAlarm({
              date,
              message: 'Time to get medicine: ' + medicine + " doze: " + otherDose,
              snooze,
              id,
              _id : id + '' + i,
              userInfo: { item, status:""},
            });
          }
          } else {
            for (let i = 0; i < dates.length ; i++) {
            date = moment(dates[i].ReminderDate + " " + dates[i].ReminderTime).format();
            console.warn("calendar date",date);
            let newItem = {
              Reminder : {
                ...item.Reminder,
                reminderDateTimes : [item.Reminder.reminderDateTimes[i]]
              }
            }
            let _id = id_to_increment_from ? id_to_increment_from : id + '' + i;
            await createAlarm({
              active: true,
              date,
              message: 'Time to get medicine: ' + medicine + " doze: " + otherDose,
              snooze,
              id,
              _id : _id,
              userInfo: {...newItem, status:""},
            });}
            if(id_to_increment_from){
              set_id_to_increment_from((prev) => prev+1);
            }
        }
      } catch (e) {
        console.warn("alarm error",e);
      }
    }

    const removeImage = (image) => {
      
      let i = file.indexOf(image)
      let f = [...file];
      f.splice(i, 1);
      setFile(f);
    }

    return (
        <View style={{flex:1}}>
        <Container style={{padding:wp("6%"),paddingBottom:0}}>
          <Content>
            <Text style={{paddingVertical:10}} >Write Medicine Name</Text>
          <Item regular>
            <Input placeholder='Medicine Name' value={medicine} onChangeText={(text)=>setMedicine(text)} />
          </Item>
          <Row style={{ marginTop:20}}>
            <Col style={{ alignItems:'flex-start', margin:5, marginRight:0}}>
                <Text>Select Doze</Text>
            </Col>
          </Row>
          <Row style={{marginTop:5}}>
              <Col style={{marginRight:5}}>
                <LinearGradient colors={dose=="1 Pill"?active: ["transparent", 'transparent']}  start={{x: 0.0, y: 0}} end={{x: 1.8, y:1.0}}>
                  <Button onPress={()=>setDose("1 Pill")}  style={[dose=="1 Pill"?{backgroundColor: 'transparent'}: styles.default]}>
                      <Text style={[dose=="1 Pill"?styles.activeText: styles.defaultText]}>1 Pill</Text>
                  </Button>
                </LinearGradient>
              </Col>
              <Col style={{marginRight:5}}>
                <LinearGradient colors={dose=="0.5 Pill"?active: ["transparent", 'transparent']}  start={{x: 0.0, y: 0}} end={{x: 1.8, y:1.0}}>
                  <Button onPress={()=>setDose("0.5 Pill")}  style={[dose=="0.5 Pill"?{backgroundColor: 'transparent'}: styles.default]}>
                      <Text style={[dose=="0.5 Pill"?styles.activeText: styles.defaultText]}>0.5 Pill</Text>
                  </Button>
                </LinearGradient>
              </Col>
              {/* <Col  style={{ marginRight:5}}>
                <LinearGradient colors={dose=="0.5 Pill"?active: ["transparent", 'transparent']}  start={{x: 0.0, y: 0}} end={{x: 1.8, y:1.0}}>
                  <Button eva={{style:{textMarginHorizontal:0}}} onPress={()=>setDose("0.5 Pill")} style={[dose=="0.5 Pill"?{backgroundColor: 'transparent',padding:0}: styles.default]}>
                    <Text numberOfLines={1} ellipsizeMode={'tail'} style={[dose=="0.5 Pill"?styles.activeText: styles.defaultText]}>0.5 Pill</Text>
                  </Button>
                </LinearGradient>
              </Col> */}
              <Col  style={{marginRight:5}}>
                <LinearGradient colors={dose=="2 Pills"?active: ["transparent", 'transparent']}  start={{x: 0.0, y: 0}} end={{x: 1.8, y:1.0}}>
                  <Button onPress={()=>setDose("2 Pills")} style={[dose=="2 Pills"?{backgroundColor: 'transparent'}: styles.default]}>
                    <Text style={[dose=="2 Pills"?styles.activeText: styles.defaultText]}>2 Pills</Text>
                  </Button>
                </LinearGradient>
              </Col>
            <Col style={{marginRight:5}}>
                <LinearGradient colors={otherDose=="Other"?active: ["transparent", 'transparent']}  start={{x: 0.0, y: 0}} end={{x: 1.8, y:1.0}}>
                  <Button onPress={()=>{setMlDose(false); setShowCustom("pill") }} style={[dose=="other"?{backgroundColor: 'transparent'}: styles.default]}>
                    <Text style={[otherDose=="Other"?styles.activeText: styles.defaultText]}>Other</Text>
                    </Button>
                </LinearGradient>
              </Col>
          </Row>
          {showCustom=="pill" &&
            <Row style={{marginTop:10}}> 
              <Col style={{marginRight:5}}>
                <Item regular>
                  <Input placeholder='Enter custom pills' onChangeText={(text)=>setOtherDose(text)} />
                </Item>
              </Col>
            </Row>
          }
          <Row style={{marginVertical:10}}>
            <Col style={{ alignItems:'flex-start', margin:5, marginRight:0}}>
                <Text>Or</Text>
            </Col>
          </Row>
          <Row>
              <Col style={{marginRight:5}}>
                <LinearGradient colors={dose=="5 ml"?active: ["transparent", 'transparent']}  start={{x: 0.0, y: 0}} end={{x: 1.8, y:1.0}}>
                  <Button onPress={()=>setDose("5 ml")} style={[dose=="5 ml"?{backgroundColor: 'transparent'}: styles.default]}>
                    <Text style={[dose=="5 ml"?styles.activeText: styles.defaultText]}>5 ml</Text>
                  </Button>
                </LinearGradient>
              </Col>
              <Col  style={{marginRight:5}}>
                <LinearGradient colors={dose=="10 ml"?active: ["transparent", 'transparent']}  start={{x: 0.0, y: 0}} end={{x: 1.8, y:1.0}}>
                  <Button onPress={()=>setDose("10 ml")} style={[dose=="10 ml"?{backgroundColor: 'transparent'}: styles.default]}>
                    <Text style={[dose=="10 ml"?styles.activeText: styles.defaultText]}>10 ml</Text>
                  </Button>
                </LinearGradient>
              </Col>
              <Col  style={{marginRight:5}}>
                <LinearGradient colors={dose=="15 ml"?active: ["transparent", 'transparent']}  start={{x: 0.0, y: 0}} end={{x: 1.8, y:1.0}}>
                  <Button onPress={()=>setDose("15 ml")} style={[dose=="15 ml"?{backgroundColor: 'transparent'}: styles.default]}>
                    <Text style={[dose=="15 ml"?styles.activeText: styles.defaultText]}>15 ml</Text>
                  </Button>
                </LinearGradient>
              </Col>
          </Row>
          <Row style={{marginTop:5}}>
              <Col style={{marginRight:5}}>
                <LinearGradient colors={dose=="20 ml"?active: ["transparent", 'transparent']}  start={{x: 0.0, y: 0}} end={{x: 1.8, y:1.0}}>
                  <Button onPress={()=>setDose("20 ml")} style={[dose=="20 ml"?{backgroundColor: 'transparent'}: styles.default]}>
                    <Text style={[dose=="20 ml"?styles.activeText: styles.defaultText]}>20 ml</Text>
                  </Button>
                </LinearGradient>
              </Col>
              <Col  style={{marginRight:5}}>
                <LinearGradient colors={dose=="25 ml"?active: ["transparent", 'transparent']}  start={{x: 0.0, y: 0}} end={{x: 1.8, y:1.0}}>
                  <Button onPress={()=>setDose("25 ml")} style={[dose=="25 ml"?{backgroundColor: 'transparent'}: styles.default]}>
                    <Text style={[dose=="25 ml"?styles.activeText: styles.defaultText]}>25 ml</Text>
                  </Button>
                </LinearGradient>
              </Col>
              <Col  style={{marginRight:5}}>
                <LinearGradient colors={otherDose=="Other ml"?active: ["transparent", 'transparent']}  start={{x: 0.0, y: 0}} end={{x: 1.8, y:1.0}}>
                  <Button onPress={()=>{setMlDose(true); setShowCustom("ml")}} style={[dose=="other ml"?{backgroundColor: 'transparent'}: styles.default]}>
                    <Text style={[dose=="Other ml"?styles.activeText: styles.defaultText]}>Other</Text>
                  </Button>
                </LinearGradient>
              </Col>
          </Row>
          {showCustom=="ml" &&
            <Row style={{marginTop:10}}> 
              <Col style={{marginRight:5}}>
                <Item regular>
                  <Input 
                  style={styles.default} 
                  placeholder='Enter custom ml' 
                  // value={otherDose? otherDose: null} 
                  onChangeText={(text)=>setOtherDose(text)} />
                </Item>
              </Col>
            </Row>
          }
          <Row style={{marginTop:20}}>
              <Col>
                <Text>Select Time</Text>
              </Col>
          </Row>
          <Row style={{marginTop:10}}>
              <Col style={{marginRight:11}}>
                <LinearGradient colors={everday?active: ["transparent", 'transparent']}  start={{x: 0.0, y: 0}} end={{x: 1.8, y:1.0}}>
                  <Button onPress={()=>{setEverday(true); setShowLiftime(true); }} 
                    style={[everday?{backgroundColor:'transparent'}: styles.default]}>
                    <Text style={[everday?styles.activeText: styles.defaultText]}>Everyday</Text>
                  </Button>
                </LinearGradient>
              </Col>
              <Col  style={{marginLeft:11}}>
                <LinearGradient colors={!everday?active: ["transparent", 'transparent']}  start={{x: 0.0, y: 0}} end={{x: 1.8, y:1.0}}>
                  <Button onPress={()=>{ setEverday(false); props.navigation.navigate('opencalendar')}} 
                    style={[!everday?{backgroundColor: 'transparent'}: styles.default]}>
                      <Text style={[!everday?styles.activeText: styles.defaultText]}>Open Calender</Text>
                  </Button>
                </LinearGradient>
              </Col>
          </Row>
          <Row style={{marginTop:10}}>
              <Col>
                <Text>Add the photo of your medicine, so it can appear on your reminder.</Text>
              </Col>
          </Row>
          <View style={Styles.fieldContainer}>
            {/* <Texts  appearance='hint'>Add file or photo</Texts> */}
            <View style={{flexDirection:"row"}}>
            <View style={Styles.addFileContainer}>
                    <TouchableOpacity onPress={()=>setVisible(true)}>
                      <AntDesign name="addfile" color={theme.colors.primary} size={30}  />
                    </TouchableOpacity>
                </View>
                {file!='' &&
                  file.map((f, index)=>{
                    return (
                      <TouchableOpacity onLongPress={()=>{console.log('files',f)}} key={index} style={Styles.addFileContainer} onPress={()=>removeImage(f)}>
                        <Image 
                        // source={{uri : IMAGE_URL +  f.file_src}} 
                        source={!f.file_src  ? f : {uri : IMAGE_URL + f.file_src}}
                        style={Styles.file} />
                        <Icon name="close" style={{position: 'absolute', top: 10, right: 5}} />
                      </TouchableOpacity>
                    );
                  })
                }
            </View>
            </View>

              <Modal transparent={true}  visible={showLifetime} animated={true} onRequestClose={()=>setShowLiftime(false)} isVisible={showLifetime}
                style={{ flex:1, position:"absolute", bottom:50,  borderRadius:3, justifyContent:"space-between"}} >
                <View style={{backgroundColor:theme.colors.white, width:wp("90%"), height:wp("70%")}}>
                  <View style={{padding:15,alignItems:"center"}}>
                    <Text style={{ fontSize:20}}>Select Option</Text>
                  </View>
                  <LinearGradient style={{marginHorizontal:100}} colors={isLifeTime? active : ["transparent", 'transparent'] }  start={{x: 0.0, y: 0}} end={{x: 1.8, y:1.0}}>
                    <Button onPress={()=>{setLiftime(!isLifeTime); console.warn("lifetime Pressed",isLifeTime)}} style={[ styles.default]}>
                      <Text style={{color:"black", fontSize:18,fontWeight:"100"}} >Lifetime</Text>
                    </Button>
                  </LinearGradient>
                  <View style={{alignItems:"center", padding:5, marginVertical:10}}>
                    <Text >Or</Text>
                  </View>
                  <View style={{marginHorizontal:50,flexDirection:"row", justifyContent:"space-between", marginVertical:10}}>
                    <TouchableOpacity onPress={()=> {numberOfDays >0? setNumberOfDays(numberOfDays-1) : null; setLiftime(false); console.warn(isLifeTime) }} style={{width:60, height:50, marginHorizontal:10, alignItems:"center"}}><Text style={{fontSize:30}}>-</Text></TouchableOpacity>
                  <View style={{ backgroundColor:'transparent', borderWidth:1, borderColor:"#EAECEF", alignItems:"center", justifyContent:"center", width:100, height:40}}>
                    <Text style={{color:"black", fontSize:18}} >{numberOfDays} {numberOfDays == 1 ? "Day" : "Days"}</Text>
                  </View>
                  <TouchableOpacity onPress={()=> {setNumberOfDays(numberOfDays+1); setLiftime(false); console.warn(isLifeTime) }} style={{width:60, height:40, marginHorizontal:10, alignItems:"center"}}><Text style={{fontSize:30}}>+</Text></TouchableOpacity>
                  </View>
                </View>
                <Button accessoryLeft={()=>loading?LoadingIndicator():null} 
                  onPress={()=>{setShowLiftime(false); props.navigation.navigate('openclock')}} appearance="primary" status="primary" 
                  style={{marginTop:10}} size="large" block>
                  SAVE
                </Button>
              </Modal>

              </Content>
              
              </Container>
              <Button accessoryLeft={()=>loading?LoadingIndicator():null} 
                onPress={!loading? saveReminder:null } appearance="primary" status="primary" 
                  style={Styles.button} size="large" block>
                  { !loading?update? "Update" : "Create Reminder":""}
              </Button>
              <Modal style={{margin:0}} transparent={true} visible={visible} animated={true} onRequestClose={()=>setVisible(false)} >
                <View style={{ flex:1, backgroundColor:'rgba(0,0,0,0.3)'}}>
                    <View style={{ position:"absolute", bottom:0, height:hp("20%"), width:wp("90%"),margin:20, backgroundColor:theme.colors.white, alignItems:"center", justifyContent: 'center'}}>
                        <Text style={{alignSelf:"center", position:"absolute" , top:0, marginTop:10, fontSize:20}}>Add Photo</Text>
                        <TouchableOpacity onPress={()=>setVisible(false)} style={{alignSelf:"flex-end", marginTop:10}} >
                            <Icon name="close" style={{alignSelf:"center", color: '#000', fontSize: 32}} />
                        </TouchableOpacity>
                        <View style={{flexDirection:"row", marginTop:20, alignContent:"space-between", justifyContent:"center", height:hp("15%")}}>
                            <TouchableOpacity onPress={openImageLibrary} style={{flex:1, marginVertical:25, marginLeft:wp("15%") , marginRight:13, backgroundColor:"#F8F8FA", borderRadius:28, justifyContent:"center"}} >
                                <Icon name="image" style={{alignSelf:"center", color: '#000', fontSize: 32}} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={openCamera} style={{flex:1, marginVertical:25, marginRight:wp("15%"), backgroundColor:"#F8F8FA", borderRadius:28, justifyContent:"center"}} >
                                <Icon name="camera" style={{alignSelf:"center", color: '#000', fontSize: 32}} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
      </View>
    )
}
const styles = StyleSheet.create({
  default:{padding:0, backgroundColor:'transparent', borderRadius: 0, borderColor:'#222', borderWidth: 1, borderColor:"#EAECEF", height:hp("6%"), overflow:"visible"},
  active:{backgroundColor:theme.colors.secondary, borderColor:theme.colors.secondary},
  activeText: { color: '#fff', fontSize:widthPercentageToDP('3%'), fontFamily: 'OpenSans-SemiBold'},
  defaultText: {color: '#000', fontSize:13 ,fontFamily: 'AvenirNextCondensed-Medium', fontWeight:"normal",overflow:"visible"}
})