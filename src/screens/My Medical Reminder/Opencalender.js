import React, { useState, useEffect } from 'react'
import { View, Text,Image, PanResponder,  Animated, FlatList, Dimensions} from 'react-native'
import {images} from "../../constants"
import {Button} from '@ui-kitten/components'
import {  Container, Content, Row, Col , Icon} from 'native-base';
import {Calendar} from 'react-native-calendars';
import moment from 'moment';
import hourFace from '../../assets/grey-circle.png';
import minuteFace from '../../assets/blue-circle.png';
import triangle from '../../assets/triangle.png';
import whiteTriangle from '../../assets/whitetri.png';
import Toggle from 'rn-toggle-switch'
const { height, width } = Dimensions.get('window');

const {icons}=images
class ToggleSwitch extends Toggle {
    onDragEnd = (e) => {
      const { contentOffset } = e.nativeEvent;
      if(contentOffset.x > (this.props.width ) / 2) {
        this.scrollRef.scrollToEnd();
        this.updateState(false);
      } else {
        this.scrollRef.scrollTo({x: 0, y: 0, animated: true});
        this.updateState(true);
      }
    }
  
    onDragStart = () => {}
  }

export default function opencalendar(props) {
    const{navigation}=props
    const[dates, setDate]=useState([])
    const[times, setTime]=useState([])
    const[showClock, setClock]=useState(false)
    const[clockId, setClockId]=useState("")
    const[clockDate, setClockDate]=useState("")

    const [angle, setAngle] = useState(0);
    const [angleOuter, setAngleOuter] = useState(0);
    const [initPos, setPos] = useState({ X: 0, Y: 0 });
    const [initAngle, setInitAngle] = useState(0);
    const [hours, setHours] = useState(6);
    const [minutes, setMinutes] = useState(30);
    const [layout, setLayout] = useState(null);
    const [amPM, changeTime] = useState(false);
    

    useEffect(()=>{
        if(props.route.params != undefined){
            setClockDate(props.route.params.date)
            selectTime()
        }
    },[])

    const selectDate=(val)=>{
        let d = [];
        d.push(...dates, {date: val.timestamp})
        setDate(d)
    }
    const renderTime=({item, index})=>{
        return(
            <Col style={{marginRight:10}} key={index}>
                <Button onPress={()=>deleteTime(item)} style={{backgroundColor:'#888'}}>
                    <Text>{moment(item.time).format("hh:mm a")} </Text>
                    <Icon name="close" type="FontAwesome" style={{fontSize:15, color:'#fff'}}></Icon>
                </Button>
            </Col>
        )
    }
    const deleteTim=(dateInd,timeInd)=>{
        let newDate = [...dates];
        // alert(JSON.stringify(newDate));
        // return;
        let dt = newDate[dateInd];
        let newTime = dt.time.filter((ob,ind)=> ind!=timeInd);
        dt.time = newTime;
        newDate[dateInd] = dt;
        setDate(newDate);
        // alert(JSON.stringify(dt));
    }
    const editTim=(dateInd,timeInd)=>{

    }
    const renderDate=({item, index})=>{
        return(
            <Row key={index} style={{marginTop:10, borderBottomColor:'#777', borderBottomWidth:1, paddingBottom:20}}>
                <Col style={{marginRight:10}}>
                    <Button onPress={()=>deleteDate(item)} style={{backgroundColor:'#888'}}><Text>{moment(item.date).toDate().toDateString()}{' '}</Text>
                        <Icon  name="close" type="FontAwesome" style={{fontSize:15, color:'#fff'}}></Icon>
                    </Button>
                </Col>
                <Col style={{marginRight:10}}>
                {
                    item.time!=undefined ?
                    item.time.map((ite,ind)=>{
                        return(
                            <Button key={ind} 
                            // onPress={()=>{setClockDate(item.date); setClockId(index); setClock(true)}}
                            >
                                <Icon name="clock-o" type="FontAwesome" style={{fontSize:15, color:'#fff'}}></Icon>
                                <Text>{' '}{ite.time!=null?moment(ite.time).format("hh:mm a"): "Add Time"}{"  "}</Text>
                                    <Icon onPress={()=>{deleteTim(index,ind)}} name="close" type="FontAwesome" style={{fontSize:20, color:'#fff'}}></Icon>
                            </Button>
                        )
                    })
                    :
                    null
                }
                    <Button onPress={()=>{setClockDate(item.date); setClockId(index); setClock(true)}}>
                        <Icon name="clock-o" type="FontAwesome" style={{fontSize:15, color:'#fff'}}></Icon>
                        <Text>{"Add Time"}</Text>
                    </Button>
                </Col>
            </Row>
        )
    }
    const deleteDate=(item)=>{
        dates.splice(dates.indexOf(item), 1);
        let d = [...dates]
        setDate(d)
    }
    const deleteTime=(item)=>{
        times.splice(times.indexOf(item), 1);
        let t = [...times]
        setTime(t)
    }
    const selectTime=() => {
        let currentDate = new Date();
        let totalHours = amPM ?  hours +12 : hours
        let date = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDay(), totalHours, minutes)
        if(clockId=="all"){
            setDate([])
            setTime({})
            dates.map(dx=>{
                let d = dates;
                dx.time=date;
            })
            let d = dates;
            console.warn("d",d)
            d.time = date
            setDate(dates)
            setTime(times,{time: d.time})
        }
        else{
            let dt = [
                {date : '', time : [{time : '', time : ''}]}
            ]
            setTime([]);
            let newDates = dates;
            let time = newDates[clockId].time==undefined ? [] : newDates[clockId].time;
            newDates[clockId].time = [...time, {time : date}];
            // alert(JSON.stringify(newDates));
            // return;
            setDate(newDates)
        }
        setClock(false)
    };
    const save = ()=>{
        let ReminderDateTimes = [];
        if(times.length==0){
            let d = dates.filter(dx=>{
                return dx.time == undefined || dx.time.length==0
            })
            if(d.length>0){
                alert("One date doesn't have time please select time!")
                return
            }
            dates.map(dx=>{
                dx.time.map((item)=>{
                    let x = {
                        ID: null,
                        MedicalReminderID: null,
                        ReminderDate: moment(dx.date).format('yyyy-MM-DD'),
                        ReminderTime: moment(item.time).format("HH:mm:ss.sss"),
                        EntityState: 1,
                        statusSD:129
                    };
                    ReminderDateTimes.push(x)
                })
                // let x = {
                //     ID: null,
                //     MedicalReminderID: null,
                //     ReminderDate: moment(dx.date).format('yyyy-MM-DD'),
                //     ReminderTime: moment(dx.time).format("HH:mm:ss.sss"),
                //     EntityState: 1,
                //     statusSD:129
                // };
                // ReminderDateTimes.push(x)
            })
            // alert(JSON.stringify(ReminderDateTimes));
        }
        else{
            times.map(t=>{
                dates.forEach((d)=>{
                    let x = {
                        ID: null,
                        MedicalReminderID: null,
                        ReminderDate: moment(d.date).format('yyyy-MM-DD'),
                        ReminderTime: moment(t.time).format("HH:mm:ss.sss"),
                        EntityState: 1,
                        statusSD:129
                    };
                    ReminderDateTimes.push(x)
                })
            })
        }
        // return;
        navigation.navigate("AddNewReminder", {ReminderDateTimes, isEveryday: false})
    }
    
    //clock attributes
    const panHandler = PanResponder.create({
        onMoveShouldSetResponderCapture: () => true,
        onMoveShouldSetPanResponderCapture: () => true,
    
        onPanResponderGrant: (e, { moveX, moveY }) => {
        //   console.log(`X: ${moveX} Y: ${moveY}`);
          // setPos({X:moveX,Y:moveY});
        },
    
        onPanResponderMove: (evt, gestureHandler) => {
          let { moveX, moveY, dx, dy } = gestureHandler;
          let dX = moveY < height / 2 ? dx : -dx;
          let dY = moveX < width / 2 ? -dy : dy;
    
          setAngle(angle + dX + dY);
          let hrs = 6 - parseInt((angle % 360) / 30);
    
          if (hrs <= 0) {
            hrs = 12 + hrs;
          } else if (hrs > 12) {
            hrs = hrs % 12;
          }
          if (hrs === 0) hrs = 12;
          setHours(hrs);
    
        },
        onPanResponderRelease: (e, gestureHandler) => {
          setAngle((6 - hours) * 30);
        }
      });
      const panHandlerOuter = PanResponder.create({
        onMoveShouldSetResponderCapture: () => true,
        onMoveShouldSetPanResponderCapture: () => true,
    
        onPanResponderGrant: (e, { moveX, moveY }) => {
        },
    
        onPanResponderMove: (evt, gestureHandler) => {
          let { moveX, moveY, dx, dy } = gestureHandler;
          let dX = moveY < height / 2 ? dx : -dx;
          let dY = moveX < width / 2 ? -dy : dy;
    
          setAngleOuter(angleOuter + dX * 0.7 + dY * .7);
          let mins = 30 - parseInt((angleOuter % 360) / 6);
          if (mins > 60) mins = mins % 61;
          if (mins <= 0) mins = 60 + mins;
          setMinutes(mins);
        },
        onPanResponderRelease: (e, gestureEvent) => {
        }
      })
    return (
        <Container style={{padding:10}}>
            {!showClock &&(
            <Content>
                <Calendar onDayPress={selectDate} />
                <Row>
                    <Col>
                        <Button onPress={()=>{
                                if(dates.length>0){
                                    setClockDate(dates[0].date)
                                    setClockId("all"); 
                                    setClock(true);
                                }
                                else{
                                    alert("Select Date First")
                                }
                            }}>
                            <Text>Add Same Time For All Selected Dates</Text>
                        </Button>
                    </Col>
                </Row>
                <FlatList
                    data={dates}
                    renderItem={renderDate}
                    horizontal={false}
                    />
                
                <Row style={{marginTop:10, paddingBottom:20}}>
                    <Col >
                        <Button onPress={()=>navigation.goBack()} style={{backgroundColor:'#aaa'}}><Text>Cancel</Text></Button>
                    </Col>
                    <Col >
                        <Button onPress={save}><Text>Save</Text></Button>
                    </Col>
                </Row>
            </Content>
            )}
        {showClock && 
        <Content>
                <Row>
                    <Col style={{alignContent: 'center', alignItems: 'center'}}>
                <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                    <Text style={{ position: 'absolute', left: 50, bottom: -85, fontSize: 48, color:"#596377" }} >{hours.toString().length === 1 ? `0${hours}` : hours}:{minutes.toString().length === 1 ? `0${minutes}` : minutes}</Text>
                    <Image source={triangle} resizeMode="contain" style={{ position: 'absolute', top: height / 2 -40 , width: 10, height: 10 }} />
                    <View style={{ position: 'absolute', top: height / 2 , left: width /2 }}>

                    <ToggleSwitch
                        text={{ on: 'PM', off: 'AM', activeTextColor: '#fff', inactiveTextColor: '#fff' }}
                        textStyle={{ fontWeight: 'bold' }}
                        color={{ indicator: 'white', active: '#596377', inactive: '#596377', activeBorder: '#E9E9E9', inactiveBorder: '#E9E9E9' }}
                        active={amPM}
                        disabled={false}
                        width={80}
                        radius={25}
                        onValueChange={(val) => {
                        changeTime(!amPM);
                        }}
                        
                    />
                    </View>
                    <Animated.View {...panHandlerOuter.panHandlers} style={{ height: 350, width: 350, borderRadius:120, transform: [{ rotate: angleOuter + 'deg' }] }}>
                    <Image source={minuteFace} resizeMode="contain" style={{ height: '100%', width: '100%' }} />
                    </Animated.View>

                    <Animated.View onLayout={layoutR => layout ? null : setLayout(layoutR)} {...panHandler.panHandlers} style={{justifyContent:'center',alignItems:'center',backgroundColor:'rgb(67,111,149)', position: 'absolute', height: 240, width: 240, transform: [{ rotate: angle + 'deg' }], borderRadius: 120 }}>
                    <Image source={hourFace} resizeMode="contain" style={{ height: 240, width: 240, }} />
                    </Animated.View>
                    <Image source={whiteTriangle} resizeMode="contain" style={{ position: 'absolute',zIndex:30, top: height / 2 -130, width: 10, height: 10, transform: [{ rotate: '180deg' }] }} />

                    </View>
                    </Col>
                </Row>

                <Row style={{marginTop:120, paddingBottom:20}}>
                    <Col>
                        <Button onPress={()=>selectTime()}>Set Time</Button>
                    </Col>
                </Row>
            </Content>
            }
    </Container>
    )
}
