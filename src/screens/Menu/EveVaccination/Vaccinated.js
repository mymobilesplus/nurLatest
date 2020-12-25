import React, { useEffect, useState } from 'react';
import { Text,View,StyleSheet, FlatList, TouchableOpacity, } from 'react-native';

import { Container, CheckBox, Icon, Row, Col} from 'native-base';
import moment from 'moment'
import { Switch } from 'react-native-paper';
import { theme } from '../../../constants';
import { Layout, Popover } from '@ui-kitten/components';
import Entypo from "react-native-vector-icons/Entypo"
import { Styles } from "../../Search/Styles/Doctorstyles"
import { heightPercentageToDP } from 'react-native-responsive-screen';

Vaccinated = (props) => {
    const[list, setList] = useState([])
    const[selectedCheckboxs, setSelectedCheckboxs] = useState([])
    const [visible, setVisible] = React.useState(0);
    useEffect(()=>{
        setSelectedCheckboxs(props.selectedCheckboxs)
        setList(props.list)
    }, [props])
    const menuIcon = (id) => (
        <TouchableOpacity onPress={() => setVisible(id)} style={{height:30,width:30,alignItems:"flex-end", paddingLeft:10}}>
            <Entypo name="dots-three-vertical" size={20} color={theme.colors.dark}  />
        </TouchableOpacity>
    )
    const vaccinatedDropDown = (item)=>{
        return(
                <Layout  level='1'>
            <Popover 
                backdropStyle={Styles.backdrop}
                visible={visible == item.id}
                anchor={() => menuIcon(item.id)}
                onBackdropPress={() => setVisible(false)}
            >
                <Layout style={[Styles.content,{width:180,}]}>
                    <View>
                        <Text 
                            onPress={(done)=>props.vaccinated(done, item)}
                            style={{ padding: 10, fontSize: 16, justifyContent:'flex-start', alignItems:'flex-start', borderBottomWidth:0.5, borderBottomColor:"#8A92A3", color:"#596377" }}>
                            <Icon name="floppy-o" type="FontAwesome" style={{ fontSize: 14 }}></Icon> {' '}
                            Restore {item.isVaccinated}
                        </Text>
                        <Text 
                            onPress={()=>props.share(item)} 
                            style={{ padding: 10,fontSize: 16,justifyContent:'flex-start',alignItems:'flex-start',borderBottomWidth:0.5,borderBottomColor:"#8A92A3",color:"#596377"}}>
                            <Icon name="share-2" type="Feather" style={{fontSize: 14, color:"#596377"}}></Icon> {' '}
                            Share
                        </Text>
                    </View>
                </Layout>
            </Popover>
        </Layout>
        )
    }

    const renderRow = ({item, index}) =>{
        return(
            <TouchableOpacity 
                onLongPress={(done)=>props.addCheckbox(done,item.id)} 
                key={'item'+item.id}
                onPress={(done)=>{(props.selectedCheckboxs.length > 0) ? props.addCheckbox(done,item.id) : console.warn(item)}}
                style={{
                    flex: 1, 
                    padding: 18, 
                    minHeight: 50, 
                    borderBottomColor: '#999', 
                    borderBottomWidth: 1,
                    width:'100%',
                    height:heightPercentageToDP("14%")
                }} >
                {(props.type == 'overdue') && (
                    <Col style={{position:'absolute',right:10,bottom:20}}>
                        <Switch 
                        color={theme.colors.primary} 
                        onValueChange={(done)=>props.vaccinated(done, item)} 
                        value={item.isVaccinated} 
                        />
                    </Col>
                    )}
            <Row style={{}}>
                {(props.selectedCheckboxs.length > 0) ? 
                    (<View style={{width:60, paddingTop:10}}>
                        <CheckBox 
                            checked={(props.selectedCheckboxs.indexOf(item.id) > -1) ? true : false} 
                            value={(props.selectedCheckboxs.indexOf(item.id) >= 0) ? true : false}
                            onPress={(done)=>{props.addCheckbox(done,item.id)}}  
                            />                   
                    </View>)
                    : null
                }   
                <Col style={{justifyContent:"center"}}>
                    <Text style={{color:'#000', fontWeight:'bold'}} numberOfLines={2}>{item.title}</Text>
                </Col>
                {(props.type == 'vaccinated') && vaccinatedDropDown(item)}
            </Row>
            {(props.type == 'vaccinated')  && <Row style={{marginTop:10, marginBottom:10, }}>
                <Col style={{width: '100%',}}>
                    <Text style={{color:'#596377', marginTop:10, fontWeight:'bold', width: '100%' , fontSize:17}}>
                        Vaccinated Date:  {item.vaccinatedDate == null ? moment(item.vaccinationDueDate).format("MMM DD, YYYY") :  moment(item.vaccinatedDate).format("MMM DD, YYYY")}
                    </Text>
                </Col>
            </Row> }
            { (props.type == 'upcoming')  && <Row style={{marginTop:10, marginBottom:10, }}>
                <Col style={{width: '100%',}}>
                    <Text style={{color:'#596377', marginTop:10, fontWeight:'bold', width: '100%' , fontSize:17}}>
                        Vaccination Date:  {moment(item.vaccinationDueDate).format("MMM DD, YYYY") }
                    </Text>
                </Col>

            </Row> }
            {(props.type == 'upcoming') && 
                <Col style={{position:'absolute',right:10,bottom:20}}>
                    <Switch 
                    color={theme.colors.primary} 
                    onValueChange={(done)=>props.vaccinated(done, item)} 
                    value={item.isVaccinated} 
                    />
                </Col>
                }
                {(props.type == 'upcoming') && !item.isStandard &&
                    <Col style={{position:'absolute',right:10,top:20}}>
                        {props.renderDrowMenu(item.id,item)}
                    </Col> 
                }
        </TouchableOpacity>
        )
    }
    callSelectAll = () => {
        setTimeout(function(){
            list.map((data,key)=> {
                setTimeout(function(){
                    if(props.selectedCheckboxs.indexOf(data.id) <= -1) {
                        props.addCheckbox('',data.id);
                    } 
                },100);
            })
        },300);
    }
    
    return (
        <Container>
        {(props.selectedCheckboxs.length > 0) ? 
        (<View 
            style={{
                height:50,
                width:'100%',
                flexDirection:'row',
                backgroundColor:'#ccc'
            }}>
            <View
                style={{
                    width:60,
                    justifyContent:'center',
                    paddingLeft:8
                }}
                >
                <CheckBox  
                     checked={
                        list.filter(data => props.selectedCheckboxs.indexOf(data.id) <= -1)
                    } 
                     onPress={(done)=>{callSelectAll()}} 
                    />    
            </View>
            <View
                style={{
                    flex:1,
                    justifyContent:'center'
                }}
                >
                <Text
                    style={{
                        color:'blue',
                        fontSize:16,
                        fontWeight:'bold'
                    }}
                    >
                    Select {props.checkboxcount} Results
                </Text>
            </View>
            <View
                style={{
                    flex:1,
                    justifyContent:'center',
                    flexDirection:'row',
                    alignItems:'center'
                }}
                >
                <TouchableOpacity
                    style={{
                        height:30,
                        width:80,
                        borderWidth:1,
                        borderRadius:5,
                        backgroundColor:theme.colors.primary,
                        borderColor:theme.colors.primary,
                        justifyContent:'center',
                        alignItems:'center'
                    }}
                    onPress={(done)=>{props.multiShare()}} 
                    >
                    <Text
                        style={{
                            color:'#fff'
                        }}
                        >
                        Share
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        height:30,
                        width:80,
                        borderWidth:1,
                        borderRadius:5,
                        borderColor:theme.colors.danger,
                        backgroundColor:theme.colors.danger,
                        justifyContent:'center',
                        alignItems:'center',
                        marginLeft:5
                    }}
                    onPress={()=>{props.confirmDeleteAll()}}
                    >
                    <Text
                        style={{
                            color:'#fff'
                        }}
                        >
                        Delete
                    </Text>
                </TouchableOpacity>
            </View>
        </View>)
        :  null}
        <FlatList 
            data={list} 
            renderItem={renderRow}
            />
        </Container>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginBottom: 50
    },
    itemText: {
        fontSize: 16, 
        color: '#000', 
    },
    itemText1: {
        fontSize: 13, 
        color: '#aaa',
    },

    itemText2: {
        fontSize: 16, 
        color: '#aa0114', 
    }, 
    itemText3: {
        fontSize: 16, 
        color: '#aaa', 
        textDecorationLine: 'line-through'
    },   
     backgroundTranslucent:{
        backgroundColor: "rgba(255,255,255, 0.4)"
    },
    
  });

export default Vaccinated;
