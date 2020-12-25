import React, { useState, useEffect } from 'react'
import { View, Text,Image,TouchableOpacity, FlatList} from 'react-native'
import {Styles} from "./Style/AddNewReminderStyle"
import {theme,images} from "../../constants"
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from "react-native-responsive-screen"
import {Button} from '@ui-kitten/components'
import { Input, Container, Content, Item, Label, Row, Col , Icon} from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import calendar from '../../constants/calendar';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';

const {icons}=images

export default function opencalendar(props) {
    const{navigation}=props
    const[dates, setDate]=useState([])
    const[times, setTime]=useState([])
    const[showClock, setClock]=useState(false)
    const[clockId, setClockId]=useState("")
    const[clockDate, setClockDate]=useState("")

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
    const renderDate=({item, index})=>{
        return(
            <Row key={index} style={{marginTop:10, borderBottomColor:'#777', borderBottomWidth:1, paddingBottom:20}}>
                <Col style={{marginRight:10}}>
                    <Button onPress={()=>deleteDate(item)} style={{backgroundColor:'#888'}}><Text>{moment(item.date).toDate().toDateString()}{' '}</Text>
                        <Icon  name="close" type="FontAwesome" style={{fontSize:15, color:'#fff'}}></Icon>
                    </Button>
                </Col>
                <Col style={{marginRight:10}}>
                    <Button onPress={()=>{setClockDate(item.date); setClockId(index); setClock(true)}}>
                        <Icon name="clock-o" type="FontAwesome" style={{fontSize:15, color:'#fff'}}></Icon>
                        <Text>{' '}{item.time!=null?moment(item.time).format("hh:mm a"): "Add Time"}</Text>
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
    const selectTime=(event, selectedDate) => {
        console.log(selectedDate)
        setClock(false)
        if(clockId=="all"){
            dates.map(dx=>{
                dx.time=null;
            })
            setDate([...dates])
            setTime([ ...times,
                {
                    time: selectedDate
                }
            ])
        }
        else{
            setTime([]);
            let d = dates[clockId];
            d.time = selectedDate
            dates.splice(clockId, 1)
            setDate([...dates, d])
        }
        
    };
    const save = ()=>{
        let ReminderDateTimes = [];
        if(times.length==0){
            let d = dates.filter(dx=>{
                return dx.time == undefined
            })
            if(d.length>0){
                alert("One date doesn't have time please select time!")
                return
            }
            dates.map(dx=>{
                let x = {
                    ID: null,
                    MedicalReminderID: null,
                    ReminderDate: moment(dx.date).format('yyyy-MM-DD'),
                    ReminderTime: moment(dx.time).format("HH:mm:ss.sss"),
                    EntityState: 1
                };
                ReminderDateTimes.push(x)
            })
        }
        else{
            times.map(t=>{
                dates.forEach((d)=>{
                    let x = {
                        ID: null,
                        MedicalReminderID: null,
                        ReminderDate: moment(d.date).format('yyyy-MM-DD'),
                        ReminderTime: moment(t.time).format("HH:mm:ss.sss"),
                        EntityState: 1
                    };
                    ReminderDateTimes.push(x)
                })
            })
        }
        console.log(ReminderDateTimes);
        navigation.navigate("AddNewReminder", {ReminderDateTimes})
    }
    return (
        <Container style={{padding:10}}>
            <Content>
                <Calendar
                    onDayPress={selectDate}
                    />
            <Row>
                <Col>
                    <Button onPress={()=>{
                            if(dates.length>0){
                                setClockDate(dates[0].date)
                                setClockId("all"); 
                                setClock(true);
                                console.log(clockDate);
                            }
                            else{
                                alert("Select Date First")
                            }
                        }}>
                        <Text>Add Same Time For All Selected Dates</Text>
                    </Button>
                </Col>
            </Row>
            <Row style={{marginTop:10, borderBottomColor:'#777', borderBottomWidth:1, paddingBottom:20}}>
                <FlatList
                    data={times}
                    renderItem={renderTime}
                    horizontal={true}
                    />
            </Row>
            <FlatList
                data={dates}
                renderItem={renderDate}
                horizontal={false}
                />
            
            <Row style={{marginTop:10, paddingBottom:20}}>
                
                <Col >
                    <Button style={{backgroundColor:'#aaa'}}><Text style={{color:'#888'}}>Cancel</Text></Button>
                </Col>
                <Col >
                    <Button onPress={save}><Text>Save</Text></Button>
                </Col>
            </Row>
        </Content>
        {showClock && (
            <DateTimePicker
                testID="dateTimePicker"
                mode="time"
                value={clockDate}
                is24Hour={false}
                display="default"
                onChange={selectTime}
                
            />
        )}
    </Container>
    )
}
