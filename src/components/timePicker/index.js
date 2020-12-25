import React, { useImperativeHandle, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Animated,
  PanResponder,
  Image,
  Dimensions,
  Alert
} from 'react-native';
import hourFace from './grey-circle.png';
import minuteFace from './blue-circle.png';
import triangle from './triangle.png';
import whiteTriangle from './whitetri.png';
import ToggleSwitch from 'rn-toggle-switch'

import { Colors } from 'react-native/Libraries/NewAppScreen';
const { height, width } = Dimensions.get('window');
const hourTranslation = {
  0: 6,
  1: 5,
  2: 4,
  3: 3,
  4: 2,
  5: 1,
  6: 12,
  7: 11,
  8: 10,
  9: 9,
  10: 8,
  11: 7,
}
const TimePicker = React.forwardRef((props, ref) => {
  
  const [angle, setAngle] = useState(0);
  const [angleOuter, setAngleOuter] = useState(0);
  const [initPos, setPos] = useState({ X: 0, Y: 0 });
  const [initAngle, setInitAngle] = useState(0);
  const [hours, setHours] = useState(6);
  const [minutes, setMinutes] = useState(30);
  const [layout, setLayout] = useState(null);
  const [amPM, changeTime] = useState(false);
  const [time, setTime] = useState('');
  useImperativeHandle(ref, () => ({getMyState: () => {return time}}), [time])

  const panHandler = PanResponder.create({
    onMoveShouldSetResponderCapture: () => true,
    onMoveShouldSetPanResponderCapture: () => true,

    onPanResponderGrant: (e, { moveX, moveY }) => {
      console.log(`X: ${moveX} Y: ${moveY}`);
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

      // The most recent move distance is gestureState.move{X,Y}
      // The accumulated gesture distance since becoming responder is
      // gestureState.d{x,y}
      //console.log(layout);
      //setAngle(parseInt(angle)-parseInt(gestureState.dx)+(gestureState.moveX > (layout.x + layout.width)/2?1:-1)*parseInt(gestureState.dy));
    },
    onPanResponderRelease: (e, gestureHandler) => {
      // showTime();
      setAngle((6 - hours) * 30);
    }
  });
  const panHandlerOuter = PanResponder.create({
    onMoveShouldSetResponderCapture: () => true,
    onMoveShouldSetPanResponderCapture: () => true,

    onPanResponderGrant: (e, { moveX, moveY }) => {
      console.log(`X: ${moveX} Y: ${moveY}`);
      // setPos({X:moveX,Y:moveY});
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

      // The most recent move distance is gestureState.move{X,Y}
      // The accumulated gesture distance since becoming responder is
      // gestureState.d{x,y}
      //console.log(layout);
      //setAngle(parseInt(angle)-parseInt(gestureState.dx)+(gestureState.moveX > (layout.x + layout.width)/2?1:-1)*parseInt(gestureState.dy));
    },
    onPanResponderRelease: (e, gestureEvent) => {
      console.log(gestureEvent);
      // showTime();
    }
  })
  const showTime = () => {
    setTime(( (amPM? {hours} +12 : hours.toString().length === 1 ? `0${hours}` : hours)) + ":" + (minutes.toString().length === 1 ? `0${minutes}` : minutes)) + ":" + "00.123"
    console.warn("timess", time)
    Alert.alert("The Time",((hours.toString().length === 1 ? `0${hours}` : hours) + ":" + (minutes.toString().length === 1 ? `0${minutes}` : minutes) +(amPM?' PM':' AM')));
    Alert.alert(
      "Select Time",
      "You want to add a reminder at " + ((hours.toString().length === 1 ? `0${hours}` : hours) + ":" + (minutes.toString().length === 1 ? `0${minutes}` : minutes) +(amPM?' PM':' AM')),
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => setTime(time) }
      ],
      { cancelable: false }
    );
  }
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
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

      </SafeAreaView>
    </>
  );
});

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

export default TimePicker;
