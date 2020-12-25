/**
 * @format
 */
import 'react-native-gesture-handler';
import React,{Component} from "react"
import {Provider} from "react-redux"
import {AppRegistry, AppState} from 'react-native';
import {store} from "./src/redux/store/store"
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification, { PushNotificationScheduleObject } from "react-native-push-notification";
import AsyncStorage from '@react-native-community/async-storage';
import * as RootNavigation from "./src/navigation/RootNavigation"

PushNotification.configure({
    onRegister: function (token) {
        console.log("TOKEN:", token);
      },

    onNotification: function(notification) {
        PushNotification.invokeApp(notification);
        console.log('LOCAL NOTIFICATION ==>', notification)
        RootNavigation.navigate('clock', {id: notification.id, action:notification.action});
      },
    onAction: function (notification) {
        // if(AppState.currentState=="inactive"){
        //     PushNotification.invokeApp(notification);
        // }
    PushNotification.invokeApp(notification);
      console.warn("ACTION:", notification.action);
      RootNavigation.navigate('clock', {id: notification.id, action : notification.action});
      console.log("NOTIFICATION:", notification);
    },
    onRegistrationError: function(err) {
      console.error(err.message, err);
    },
    popInitialNotification: true,
    requestPermissions: true
  });

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
    let notifications = await AsyncStorage.getItem("notifications")
    let id = 0;
    if(notifications == null){
        notifications = [];
        id = 1;
    }
    else{
        notifications = JSON.parse(notifications)
        id = notifications.length + 1;
    }
    let notification = {
        id,
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
        actions: remoteMessage.notification.actions,
    }
    notifications.push(notification)
    await AsyncStorage.setItem("notifications", JSON.stringify(notifications))
    
    let n = await AsyncStorage.getItem("notification")
    if(n != null){
        n = JSON.parse(n)
        if(!n){
            return;
        }
    }
    // PushNotification.localNotification({
    //     /* Android Only Properties */
    //     title: remoteMessage.notification.title, // (optional)
    //     message: remoteMessage.notification.body, // (required)
    //     actions: remoteMessage.notification.actions,
    // });

});



export default class NurseNova extends Component {
    render(){
        return(
            <Provider store={store}>
                <App/>
            </Provider>
        )
    }
}

function HeadlessCheck({ isHeadless }) {
    if (isHeadless) {
      // App has been launched in the background by iOS, ignore
      return null;
    }
  
    return <NurseNova />;
}



AppRegistry.registerComponent(appName, () => HeadlessCheck);
