import React, { useEffect, useState } from 'react'
import { View, Text,Image } from 'react-native'
import {theme,images} from "../../constants"
import Entypo from "react-native-vector-icons/Entypo"
import * as action from "../../redux/actions/_Login"
import { Layout,Popover } from '@ui-kitten/components';
import AsyncStorage from '@react-native-community/async-storage'
import {connect} from "react-redux"
import MedicalRecordsService from '../../services/MedicalRecordsService'
import { Icon, Container, Content, Row, Col } from 'native-base'
import { ActivityIndicator } from 'react-native-paper'
import { IMAGE_URL } from '../../API_URI'
import {Styles} from "./Style/MedicalReminderFormStyle"
import HealthDairyService from '../../services/HealthDiaryServices'
import ClosingHeader from "../../components/header/ClosingHeader"

const{icons}=images

function _Detail(props) {
    const [visible, setVisible] = React.useState(0);
    const [file,setFile]=useState([])
    const [record, setRecord] = useState({})
    const [loading, setLoading] = useState(false)
    const [imageloading, setImageLoading] = useState(true)
    useEffect(()  =>{
        getRecord();
      }, []);

    const getRecord = async()=>{
        props.navigation.setOptions({ headerTitle: () => <ClosingHeader {...props} title="Create Health Diary"/> });
        if(props.route.params.record!=null){
            setLoading(true)
            let r = props.route.params.record;
            let api = new HealthDairyService();
            let user = await AsyncStorage.getItem("loginData");
            let lang = await AsyncStorage.getItem("lang")
            if(lang == null){
                lang = 1;
            }
            else{
                lang = JSON.parse(lang);
            }
            user = JSON.parse(user);
            let req = {
                ID: r.id,
                LanguageId: lang,
                token: user.accessToken,
                refreshToken: user.refreshToken
            }
            let res = await api.getById(req).then(res=>res.json());
            setFile(res.healthDiary.files)
            setRecord(res.healthDiary);
            console.warn(res.healthDiary);
            setLoading(false)
        }
    }
   
    const menuIcon=(id)=>(
        <Entypo name="dots-three-vertical" size={18} color={theme.colors.dark}  onPress={() => setVisible(true)} />
    )

    const deleteMedicalRecord = (id) => {
        setLoading(true)
        AsyncStorage.getItem('loginData').then(user=>{
            user = JSON.parse(user);
            let auth = new MedicalRecordsService();
            let formData = {
                Id: id, refreshToken: user.refreshToken
            }
            formData.token = user.accessToken;
            auth.delete(formData).then(res=>res.json()).then(res=>{
                props.navigation.goBack()
            })
          })
    }

        return(
            <Container>
                {loading &&
                    <View style={{padding:20, borderBottomWidth:1, borderBottomColor:'#ccc', alignContent: 'center', flex: 1, justifyContent: 'center'}}>
                        <ActivityIndicator size="large" color={theme.colors.primary} />
                    </View>
                }
                {!loading &&
                    <Content>
                        <Row style={{padding:25, borderBottomWidth:1, borderBottomColor:'#ccc'}}>
                            <Col style={{flex:1}}>
                                <Text style={{fontSize:18}}>{record.description}</Text>
                            </Col>
                            <Col style={{alignItems:'flex-end',flex:0.1}}>
                                <Popover
                                    backdropStyle={Styles.backdrop}
                                    visible={visible}
                                    anchor={()=>menuIcon({id: record.id})}
                                    onBackdropPress={() => setVisible(false)}>
                                    <Layout style={Styles.content}>
                                    <View style={{borderBottomWidth:0.5,width:180,borderBottomColor:"#8A92A3"}}>
                                            <Text onPress={()=>{setVisible(false); props.navigation.navigate('AddNewMember', {healthDiary: [record]})}} style={{padding: 10, fontSize: 16, color:"#596377"}}>
                                                <Icon name="edit-2"  type="Feather" style={{fontSize: 14, color:"#596377"}}></Icon>{' '}
                                                Edit</Text>
                                    </View>
                                    <View style={{borderBottomWidth:0.5,width:180,borderBottomColor:"#8A92A3"}}>
                                            <Text style={{padding: 10, fontSize: 16, color:"#596377"}}>
                                                <Icon name="share-2" type="Feather" style={{fontSize: 14, color:"#596377"}}></Icon>{' '}
                                                Share</Text>
                                    </View>
                                    <View>
                                            <Text onPress={()=>{setVisible(false); deleteMedicalRecord(record.id)}} style={{padding: 10, fontSize: 16, color:"#596377"}}>
                                                <Icon name="trash-2" type="Feather" style={{fontSize: 14, color:"#596377"}}></Icon>{' '}
                                                Delete</Text>
                                    </View>
                                    </Layout>
                                </Popover>
                            </Col>
                        </Row>
                        <Row style={{padding:20, borderBottomWidth:1, borderBottomColor:'#ccc'}}>
                            <Col>
                                <Text style={{fontSize:15}}>File Type: {record.healthDiaryType !== "Other" ? record.healthDiaryType : record.healthDiaryTypeOther == "" ? record.healthDiaryType : record.healthDiaryTypeOther}</Text>
                            </Col>
                        </Row> 
                        {record.files!=null && record.files.length>0? <>
                        <Row style={{paddingHorizontal:25, paddingTop:25}}>
                            <Col>
                                <Text style={{fontSize:15}}>File Attatched</Text>
                            </Col>
                        </Row> 
                        <Row style={{paddingHorizontal:25,paddingVertical:12}}>
                            {record.files!=null &&
                                record.files.map((f, index)=>{
                                    return (
                                        <View key={index} style={Styles.addFileContainer}>
                                            {imageloading &&
                                                <ActivityIndicator size="small" color={theme.colors.primary} style={{position: 'absolute', top: '50%'}} />
                                            }
                                            <Image onLoadEnd={()=>setImageLoading(false)} source={{uri: IMAGE_URL + f.file_src}} style={Styles.file} />
                                        </View>
                                    );
                                })
                            }  
                        </Row>
                        </> 
                        : <Row></Row>
                    }
                    </Content>
                }
            </Container>
       )

   
}

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

export default connect(mapStateToProps,mapDispatchToProps)(_Detail)
