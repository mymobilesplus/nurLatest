import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Animated,
  PanResponder,
  Image,
  Dimensions,
} from 'react-native';
import hourFace from '../../assets/grey-circle.png';
import minuteFace from '../../assets/blue-circle.png';
import triangle from '../../assets/triangle.png';
import whiteTriangle from '../../assets/whitetri.png';
import ToggleSwitch from 'rn-toggle-switch'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import {images} from "../../constants"
import {Button} from '@ui-kitten/components'
import { Container, Content, Row, Col , Icon} from 'native-base';
import moment from 'moment'
const { height, width } = Dimensions.get('window');

const {icons}=images

export default function openclock(props) {
    const{navigation}=props
    const[times, setTimes]=useState([])
    const [showClock, setClock]=useState(false)

    const [angle, setAngle] = useState(0);
    const [angleOuter, setAngleOuter] = useState(0);
    const [initPos, setPos] = useState({ X: 0, Y: 0 });
    const [initAngle, setInitAngle] = useState(0);
    const [hours, setHours] = useState(6);
    const [minutes, setMinutes] = useState(30);
    const [layout, setLayout] = useState(null);
    const [amPM, changeTime] = useState(false);
    const [time, setTime] = useState('');

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

    const deleteTime=(item)=>{
        times.splice(times.indexOf(item), 1);
        let t = [...times]
        setTimes(t)
    }

    const selectTime=() => {
        let currentDate = new Date();
        let totalHours = amPM ?  hours +12 : hours
        let date = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDay(), totalHours, minutes)
        if(props.route.params){
          props.route.params.setClockDate(date)
          props.navigation.navigate('opencalendar')}
        setClock(false)
        setTimes([ ...times,
            {
                time: date
            }
        ])
        
    };

    const save = ()=>{
        let ReminderDateTimes = [];
        if(times.length==0){
            alert("Select At Least 1 Time");
        }
        else{
            times.map(t=>{
                let x = {
                    ID: null,
                    MedicalReminderID: null,
                    ReminderTime: moment(t.time).format("HH:mm:ss.sss"),
                    EntityState: 1,
                    statusSD: 129
                };
                ReminderDateTimes.push(x)
            })
        }
        navigation.navigate("AddNewReminder", {ReminderDateTimes , isEveryday: true })
    }

    //clock attributes
    const panHandler = PanResponder.create({
        onMoveShouldSetResponderCapture: () => true,
        onMoveShouldSetPanResponderCapture: () => true,
    
        onPanResponderGrant: (e, { moveX, moveY }) => {
          // console.log(`X: ${moveX} Y: ${moveY}`);
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

                  { props.route.params == undefined && 
                  <Row style={{marginTop:10, paddingBottom:20}}>
                    <Col >
                        <Button onPress={()=>navigation.goBack()} style={{backgroundColor:'#aaa'}}><Text>Cancel</Text></Button>
                    </Col>
                    <Col >
                        <Button onPress={save}><Text>
                            <Icon name="save" type="FontAwesome" style={{color: '#fff', fontSize: 18}} /> {' '}
                            Save</Text></Button>
                    </Col>
                </Row>
                }
                <Row style={{marginTop:10,  paddingBottom:20}}>
                    <FlatList
                        data={times}
                        renderItem={renderTime}
                        horizontal={true}
                        />
                </Row>
            </Content>
        </Container>
    )
}

const styles = StyleSheet.create({
    scrollView: {
      backgroundColor: Colors.lighter,
    },
    engine: {
      position: 'absolute',
      right: 0,
    },
    body: {
      backgroundColor: Colors.white,
    },
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
      color: Colors.black,
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
      color: Colors.dark,
    },
    highlight: {
      fontWeight: '700',
    },
    footer: {
      color: Colors.dark,
      fontSize: 12,
      fontWeight: '600',
      padding: 4,
      paddingRight: 12,
      textAlign: 'right',
    },
  });
  
