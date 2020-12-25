import React, {useState, useEffect} from 'react'
import { View, Text,TouchableOpacity, Switch, Alert} from 'react-native'
import {Styles} from "./Styles/Appsettingstyle"
import Icon from 'react-native-vector-icons/Feather';
import { Layout, Popover} from '@ui-kitten/components'
import {Row, Col, Container, Content, Picker} from "native-base"
import AsyncStorage from '@react-native-community/async-storage';


const Item = Picker.Item;
export default function ReminderSetting(props) {
    const [visible,setVisible]= useState(false)
    const [minutes,setMinutes]= useState(["10 Minutes","30 Minutes", "1 Hour","1 Day","1 Week","1 Month"])
    const [List,setList]= useState(["5 Minutes"])
    const[snooze, setSnooze] = useState(1)

    useEffect(()=>{
        getSnoozeTimes()
    }, [])

    const getSnoozeTimes= async ()=>{
        await AsyncStorage.getItem("snooze").then(snooze=>{
            if(snooze !== null)
                setSnooze(JSON.parse(snooze))
                        console.warn(snooze)
        })
        
    }
    const setSnoozeTime = async (value) => {
        //onValueChange of the switch this function will be called
        await AsyncStorage.setItem("snooze", JSON.stringify([...List,value]));
        setSnooze(value)
        //state changes according to switch
        //which will result in re-render the text
        setList([...List,value]);
     }
    const removeSnoozeTime = async (item) => {
        //onValueChange of the switch this function will be called
        let index = List.indexOf(item)
        let filtered = List.filter((value)=> {return value !== item})
        setList(filtered); 
        // await AsyncStorage.removeItem("snooze", JSON.stringify([...List,item]));
        // setSnooze(item)
        //state changes according to switch
        //which will result in re-render the text
        // setList([...List,value]);
     }

    const menuIcon=(id)=>(
        <Text onPress={() =>{setVisible(id)}} style={{color:"#146ECB", fontSize:18}} >+ Add</Text>
    )

    const renderDrowMenu=(id)=>{
        return(
            <View>
            <Layout  level='1'>
                <Popover
                    backdropStyle={Styles.backdrop}
                    visible={visible == id}
                    anchor={()=>menuIcon(id)}
                    onBackdropPress={() => setVisible(false)}>
                    <Layout style={{elevation:4}}>
                    {minutes.map((minute)=> 
                        <View>
                            <Text onPress={()=> 
                            {List.includes(minute)? Alert.alert("alert",`${minute} is already selected`) : setSnoozeTime(minute); setVisible(false)}} 
                            style={{ padding: 10, paddingHorizontal: 10, fontSize: 16}}>
                                {minute} Before
                            </Text>
                        </View>
                    )}
                    </Layout>
                </Popover>
            </Layout>
            </View>
        )
    }

    

    return (
        <Container>
            <Content>
                <Row>
                    <Col style={{flex:0.2, marginTop:10, marginLeft:10}}>
                        <Icon onPress={()=>props.navigation.goBack(null)} name="arrow-left" size={30} color={'#000'} />
                    </Col>
                    <Col>
                        <Text style={{fontSize:18, marginTop:10}}>Reminder Setting</Text>
                    </Col>
                </Row>
                <Row style={{borderTopWidth:1, borderBottomWidth:1, borderTopColor:'#ddd', borderBottomColor:'#ddd', paddingBottom:10, paddingTop:10}}>
                        <Col style={{alignItems:'flex-start', justifyContent:'center', paddingLeft:10}}><Text><Icon name="clock" type="FontAwesome" style={{fontSize:16}} /> 1 Minute Before</Text></Col>
                        <Col style={{alignItems:'flex-end', justifyContent:'center', paddingRight:10}}><Switch value={true} /></Col>
                </Row>

                {List.map((item)=>{ 
                    return(
                    <Row style={{borderTopWidth:1, borderBottomWidth:1, borderTopColor:'#ddd', borderBottomColor:'#ddd', paddingBottom:10, paddingTop:10}}>
                        <Col style={{alignItems:'flex-start', justifyContent:'center', paddingLeft:10}}><Text><Icon name="clock" type="FontAwesome" style={{fontSize:16}} /> {item} Before</Text></Col>

                        <Col style={{alignItems:'flex-end', justifyContent:'center', paddingRight:10}}>
                        <Icon 
                        onPress={()=> { removeSnoozeTime(item)
                        }}
                        name="trash" type="FontAwesome" style={{fontSize:16}} /></Col>
                    </Row>
                    )
                })}

                <Row>
                    <Col>
                    <TouchableOpacity style={{alignItems:'flex-start', justifyContent:'center', padding:10, marginLeft:10}}>
                        {renderDrowMenu()}
                    </TouchableOpacity>
                    </Col>
                    <Row>
                    </Row>
                </Row>
            </Content>
        </Container>
          
    )
}
