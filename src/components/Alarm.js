import PushNotification from 'react-native-push-notification'
import AsyncStorage from '@react-native-community/async-storage';

export function Alarm(props) {
   const alarm = {
    "actions": ["Snooze", "Skip", "Take"],
    "active": true,
    "alertAction": "view",
    "allowWhileIdle": false,
    "autoCancel": true,
    "bigText": null,
    "color": "white",
    "date":new Date(Date.now() + 3000),
    "group": null,
    "id": "10456",
    "ignoreInForeground": false,
    "importance": "high",
    "invokeApp": false,
    "largeIcon": null,
    "message": "Time to get medicine: invoke doze: 1 Pill",
    "notificationId": 10456, 
    "number": null,
    "oid": 10456,
                    "ongoing": false,
                     "playSound": true,
                      "priority": "high",
                       "repeatTime": 0,
                        "repeatType": "time",
                         "smallIcon": null,
                          "snooze": 0,
                           "soundName": null,
                            "subText": null,
                             "tag": null,
                              "ticker": null,
                               "title": null,
                                "userInfo": {"Reminder": {"Files": "", "ID": null, "IsLifetime": false, "MedicineDozeSD": "", "MedicineName": "invoke", "OtherMedicineDoze": "1 Pill", "isEveryday": true, "noOfDays": 1}, "id": "10456", "oid": "10456", "snooze": 0, "status": ""}, "vibrate": true, "vibration": 1000, "visibility": "private"}
                                
}

export function createAlarm();