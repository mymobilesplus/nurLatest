import React, { useEffect, useState } from 'react'
import { View, Text,Image,TouchableOpacity, RefreshControl} from 'react-native'
import {Styles} from "./Styles/NotificationStyles"
import {theme,images} from "../../constants"
import Icon from 'react-native-vector-icons/Feather';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from "react-native-responsive-screen"
import {Button} from '@ui-kitten/components'
import {Row, Col, Container, Content} from "native-base"
import Header from '../../components/header/Header';
import AsyncStorage from '@react-native-community/async-storage';
import { FlatList } from 'react-native-gesture-handler';

const user=[
]



export default Notification = (props) => {
   const[notifications, setNotifications] = useState([])
   const[refreshing, setRefreshing] = useState(false)
    useEffect(()=>{
        getNotifications()
    }, [])
    const getNotifications = async() =>{
        setRefreshing(true)
        let noti = await AsyncStorage.getItem("notifications")
        if(noti != null){
            noti = JSON.parse(noti)
            setNotifications(noti)
        }
        setRefreshing(false)
    }
    const removeNotification = async() =>{
        setRefreshing(true)
        try {
            await AsyncStorage.removeItem("notifications");
          } catch (error) {
              console.log(error)
          }
        setRefreshing(false)
    }
    const renderRow = ({item, index}) => {
        return (
            <View>
                <View style={Styles.memberBox} >                        
                    <Row>
                        <Col>
                        <TouchableOpacity onPress={()=>removeNotification()}>
                            <Text style={Styles.title}>{item.title}</Text>
                            <Text style={Styles.body}>{item.body}</Text>
                        </TouchableOpacity>
                        </Col>
                    </Row>
                </View>
            </View>
        )
    }
    return (
        <Container style={{flex:1}}>
            <Header {...props} />
            <View style={[Styles.mainContainer, notifications.length>0? { justifyContent: 'flex-start' }: {}]}>
                <View >
                    {notifications.length == 0 &&
                        <Text style={[Styles.emptyText]}>No Notification Received Yet!</Text>
                    }
                    <FlatList
                        data={notifications}
                        renderItem={renderRow}
                        refreshControl={
                            <RefreshControl onRefresh={getNotifications} refreshing={refreshing} />
                        }
                        />
                </View>
            </View>
        </Container>
    )
}
