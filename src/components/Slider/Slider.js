import React, { PureComponent, useEffect, useState }  from 'react'
import { Text, View,StyleSheet,Dimensions ,Image,TouchableOpacity} from 'react-native'
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen"
import {theme,images} from "../../constants"
import { icons } from '../../constants/images';
import MaterialCommunityIcons  from "react-native-vector-icons/MaterialCommunityIcons"
import { RNCamera } from 'react-native-camera';
import * as camera from "../camera/Camera"
import Camera from "../camera/Camera"
import * as RootNavigation from '../../navigation/RootNavigation'
import { Container, Content, Icon, Row, Col } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import ReminderApiService from '../../services/ReminderApiService';
import * as action from "../../redux/actions/_Login"
import { connect } from 'react-redux';
import TimeAgo from 'react-native-timeago';
import moment from 'moment';
import langjson from '../../constants/lang.json';
import { IMAGE_URL } from '../../API_URI';
const { width: screenWidth } = Dimensions.get('window')
import LinearGradient from 'react-native-linear-gradient';

class Slider extends PureComponent {

    constructor(props) {
        super(props)
    
        this.state = {
             data:[
             ],
             user: null,
             lang: 1
        }
    }  

    componentDidMount(){
        // this.getReminders.bind(this);
        AsyncStorage.getItem("lang").then(lang=>{
            if(lang!=null){
                this.setState({
                    lang
                })
            }
            // this.getReminders();
        })
        
    }

    componentDidUpdate(){
        if(this.props.update == true){
            console.log('bad thing');
            this.getReminders();
            this.props.setUpdate();
        }
    }
    
    getReminders(){
        AsyncStorage.getItem("loginData").then(user=>{
            if(user!=null){
                user = JSON.parse(user);
                this.setState({
                    user
                })
                // this.state.data[0].name = user.userSession.fullName;
                let api = new ReminderApiService();
                let req={
                    LanguageId: this.state.lang,
                    UserId: user.currentUserID,
                    token: user.accessToken, 
                    refreshToken: user.refreshToken
                }
                api.get(req).then(res=>res.json()).then(res=>{
                    if(res.message != undefined){
                        this.props.logout();
                        return;
                    }
                    // alert(JSON.stringify(res.reminders));
                    if(res.reminders.length>0)
                        res.reminders[0].name=user.userSession.fullName
                    let data = [];
                    let reminders = res.reminders;
                    for(let i = 0; i<reminders.length; i++){
                        let dates = reminders[i].reminderDateTimes
                        for(let x=dates.length-1; x>-1; x--){
                            let d = {};
                            if(x==0 && i==0){
                                d.name=user.userSession.fullName
                            }
                            let dt = '';
                            if(dates[x].reminderDate && dates[x].reminderTime){
                                dt = moment(dates[x].reminderDate.split('T')[0] + ' ' + dates[x].reminderTime).format()
                            }
                            // let dt = dates[x].reminderDate;
                            // d.date = dt.toString().split('T')
                            d.reminderDate = dates[x].reminderDate;
                            d.reminderTime = dates[x].reminderTime;
                            d.medicineName = reminders[i].medicineName;
                            d.medicineDoze = reminders[i].medicineDoze;
                            d.otherMedicineDoze = reminders[i].otherMedicineDoze;
                            d.files = reminders[i].files;
                            d.name = reminders[i].familyMemberName;
                            d.id = reminders[i].id;
                            d.date = dt
                            // d.date = moment(dates[x].reminderDate.split('T')[0] + " " + dates[x].reminderTime).format();
                            data.push(d)
                        }
                    }
                    // console.log(JSON.stringify(data,null,4))
                    this.setState({
                        data
                    })
                })
            }
        })
    }

    _renderItem ({item, index}) {
        let image = undefined;
        if(item.files.length>0){
            image = IMAGE_URL + item.files[0].file_src.substring(1);
        }
        return(
        <TouchableOpacity onPress={()=>RootNavigation.navigate('MyReminder')}
            style={{
                backgroundColor:'#fff',
                borderWidth:1,
                borderColor:'#fff',
                borderRadius:10,
                elevation:4,
                flexDirection:'row',
                padding:wp('5%'),
            }} > 
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
                                {moment(item.reminderTime, ["HH:mm:ss"]).format('hh:mm a')}
                            </Text>
                        </LinearGradient>    
                    </View>
                    <View style={{flex:2,justifyContent:'center'}}>
                        <Text style={[styles.day,{textTransform:'uppercase',fontSize:18,fontFamily:'OpenSansCondensed-Light',fontWeight:'bold'}]}>
                            {item.reminderDate== null? <Text>Today {' '}</Text> : <TimeAgo time={item.date} />}
                        </Text>
                    </View>
                </View>
                <View style={{flex:1,}}>
                    <Text style={ styles.medicine }>{item.medicineName}</Text>
                </View>
                <View style={{flex:1,}}>
                    <Text style={[styles.pill,{fontFamily:'OpenSansCondensed-Light',fontWeight:'bold',marginBottom:15}]}>{item.otherMedicineDoze}</Text>    
                </View>
            </View>
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <TouchableOpacity >
                    <Image source={image?{uri: image}: icons.AddPhoto} style={{height:60,width:60}} />
                </TouchableOpacity>    
            </View>
        </TouchableOpacity>
        )
    }

    renderEmpty(){
        let { user } = this.state;
        return(
            <View style={{backgroundColor:'#fff',
            overflow:"hidden",
            marginVertical:15,
            borderRadius:10,
            backgroundColor:theme.colors.white,
            padding:wp('3%'),
            marginBottom:5,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: .3,
            elevation: 4}}
            >              
                <View style={styles.nameContainer}>
                    <View style={styles.nameAndphoto}>
                        <TouchableOpacity>
                            <Image source={icons.camera} style={styles.camera} />
                        </TouchableOpacity>
                        <Text style={styles.name}>{user!=null?user.userSession.fullName: ''}</Text>
                    </View>
                    <View style={styles.forwardContainer}>
                        <TouchableOpacity>
                            <Image source={icons.forward} style={styles.forward} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.container}>
                    <View style={styles.infoContainer}>
                        <View style={[styles.timeContainer, {justifyContent: 'center', alignContent: 'center', width: '100%'}]}>
                            {/* <View style={styles.timeBackground}>            
                            {/* <Icon name="clock-o" type="FontAwesome" size={10} style={[{color:theme.colors.white}]}/> 
                            <Text style={styles.time}>  </Text>
                            </View> */}
                            <View>
                                <Text style={styles.day}>No Reminder Added</Text>
                            </View>
                        </View>
                        <View>
                            <Text style={styles.medicine}></Text>
                        </View>
                        <View>
                            <Text style={styles.pill}></Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
    

    render() {
        return (
            <View style={{flex:1}}>
                <Carousel
                sliderWidth={screenWidth}
                sliderHeight={screenWidth}
                itemWidth={screenWidth-30}
                ListEmptyComponent={this.renderEmpty.bind(this)}
                data={this.state.data}
                renderItem={this._renderItem}
                hasParallaxImages={true}
                style={{marginLeft:0,paddingLeft:0}} 
                
            />  
            </View>
        )
    }
}






const styles=StyleSheet.create({
mainContainer:{
    flex:0,
    height:(Dimensions.get('window').height)*15/100,
/*     minHeight:hp("20%"),
    maxHeight:hp('100%'), */
    overflow:"hidden",
    borderRadius:10,
    backgroundColor:theme.colors.white,
    paddingVertical:wp('0%'),
    paddingHorizontal:wp('3%'),
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: .3,
    shadowRadius: 3,
    elevation: 5,
},
preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
nameContainer: {
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    flex: 0,
    height: hp("5%")
},
nameAndphoto: {
    flexGrow:0.2,
    alignItems:"flex-start",
    flexDirection:"row",
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
    paddingLeft:10,
},
forwardContainer:{
    flexGrow:0.2,
    justifyContent:"center",
    alignItems:"center"
},
forward:{
    resizeMode:"contain",
    width:wp('5%'),
    height:wp('5%')
},
container:{
    justifyContent:"space-between",
    flexDirection:"row"
},
timeContainer: {
    flexDirection:"row",
    paddingVertical:wp('3%'),
    alignItems:"flex-start",
    alignContent: 'flex-start',
    justifyContent: 'flex-start'
},
infoContainer: {
    alignItems:"flex-start",
    alignContent: 'flex-start'
},  
timeBackground:{
    backgroundColor:theme.colors.primary,
    borderRadius:3,
    paddingVertical:wp('1%'),
    paddingHorizontal:wp('2%'),
    flexDirection:"row",
    justifyContent:'center',
    flexGrow:0.4
},
time:{
    color:theme.colors.white,
    // fontSize:wp('4%'),
    fontSize:21,
    paddingLeft:10,
    justifyContent:'center',
},
day:{
    fontSize:wp('4%'),
    textTransform:"uppercase",
    color:theme.colors.black,
    fontFamily:"OpenSans-SemiBold",
    textAlign: 'center',
    marginLeft:5
},
medicine:{
    fontSize:18,
    marginTop:5,
    fontWeight:"normal",
    color:"#020202"
},
pill:{
    fontSize:wp('7%'),
    fontFamily:"OpenSans-SemiBold",
    color:theme.colors.black
},
addPhotoContainer:{
    justifyContent:"flex-end",
    alignItems:"flex-end",
    marginBottom:10,

},
addPhoto:{
    resizeMode:"contain",
    width:wp('20%'),
    height:wp('20%'),
    marginBottom:20
}
})

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

export default connect(mapStateToProps,mapDispatchToProps)(Slider)