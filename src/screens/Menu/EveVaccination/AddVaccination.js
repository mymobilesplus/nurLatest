import React,{useState, useEffect} from 'react'
import { View, Text,Image} from 'react-native'
import {Styles} from "./Styles/VaccinationStyles"
import {theme,images} from "../../../constants"
import Icon from 'react-native-vector-icons/FontAwesome';
import {Text as Texts, Input, Datepicker} from "@ui-kitten/components"
import {Button} from '@ui-kitten/components'
import {  Container, Content, Row, Col } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import { connect } from 'react-redux';
import VaccinationsApiService from '../../../services/VaccinationsApiService';
const active = [theme.colors.primary, theme.colors.secondary]

const {icons}=images
const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const AddVaccination = (props) => {
    const {icons,loader}=images
    const[title, setTitle] = useState('')
    const[description, setDescription] = useState('')
    const[vaccinationDueDate, setVaccinationDueDate] = useState(new Date())
    const[vaccinationDate, setVaccinationDate] = useState(new Date())
    const[familyMember, setFamilyMember] = useState(null)
    const[loading, setLoading] = useState(false)
    const[update, setUpdate] = useState(false)

    const[record, setRecord] = useState(null)
     const{navigation}=props
    const LoadingIndicator = () => (
      <View style={ Styles.indicator}>
       <Image source={loader.white}  />
      </View>
    );

    useEffect(()  =>{
      getProps();
    }, [props]);

    const getProps = () => {
      if(props.route.params != undefined){
        if(props.route.params.familyMember != undefined){
          console.log(props.route.params.familyMember);
          setFamilyMember(props.route.params.familyMember)
        }
        if(props.route.params.vaccine != undefined){
          console.log("profile", props.route.params.vaccine);
          let vaccine = props.route.params.vaccine
          setUpdate(true)
          setRecord(vaccine.id)
          setTitle(vaccine.title)
          setDescription(vaccine.description)
          setVaccinationDueDate(new Date(moment(vaccine.vaccinatedDate).format()))
          setVaccinationDueDate(new Date(moment(vaccine.vaccinationDueDate).format()))
        }
      }
      
    }

    const createVaccination=async()=>{
      setLoading(true)
      let user = JSON.parse(await AsyncStorage.getItem('loginData'));
      let familyMemberId = ""
      if(familyMember.id != undefined){
        familyMemberId = familyMember.id
      }
      console.warn(familyMember)
      let formData = {
        MyVaccination: {
            UserID: user.currentUserID, 
            FamilyMemberId: familyMemberId,
            Title: title,
            Description: description, 
            VaccinationDueDate: moment(vaccinationDueDate).format("yyyy-MM-DD"),
            VaccinatedDate: moment(vaccinationDate).format("yyyy-MM-DD")
        },
        token: user.accessToken,
        refreshToken: user.refreshToken
      }
      
      let api = new VaccinationsApiService()
      if(update){
        formData.MyVaccination.ID = record
        console.log("Vaccination", formData)
        api.update(formData).then(res=>res.json()).then(res=>{
          console.log(res);
          setLoading(false)
          if(res.id == 0){
            alert("Some Backed Error Check\n"+res.returnStatus.returnMessage);
          }
          else{
            alert("Vaccination Updated Successfully")
          }
          props.navigation.goBack();
        })
      }
      else{
        console.log("Vaccination", formData)
        api.create(formData).then(res=>res.json()).then(res=>{
          setLoading(false)
          console.log(res)
          if(res.id == 0){
            alert("Some Backed Error Check\n"+res.returnStatus.returnMessage);
          }
          else{
            alert("Vaccination Added Successfully")
            props.navigation.goBack();
          }
          
        })
      }
    }

    return (
        <Container style={{padding:10}}>
            <Row style={{ height:40, marginLeft:10, borderBottomColor: '#999', borderBottomWidth: 1, justifyContent:"center"}}>
                <Col style={{alignItems:'flex-start', flex:0.1, justifyContent:'center'}}>
                    <Icon onPress={()=>props.navigation.goBack(null)} name="arrow-left" type="Feather" style={{fontSize:20,}} />
                </Col>
                <Col style={{alignItems:'center', flex:1}}>
                    <Text style={Styles.mainHeading}>Create Vaccination</Text>
                </Col>
            </Row>
            <Content style={{marginTop: 20, padding: 10}}>
                <Input value={title} label="Title" onChangeText={(text)=>setTitle(text)} />
                <Input value={description} style={{alignItems:'flex-start',justifyContent:'flex-start',textAlignVertical: "top"}} numberOfLines={7} label="Description" onChangeText={(text)=>setDescription(text)} />
                <Datepicker date={vaccinationDueDate} label="Vaccination Due Date" onSelect={(text)=>setVaccinationDueDate(text)} />
                <Row style={{marginTop:10}}>
                    <Col style={{marginRight:5}}>
                    <Button accessoryLeft={()=>loading?LoadingIndicator():null} 
                        onPress={!loading?createVaccination:null} appearance="primary" status="primary" 
                        style={Styles.buttonForm} size="large" block>
                        { !loading?update? "Update Vaccination" : "Create Vaccination":""}</Button>
                    </Col>
                </Row>
            </Content>
        </Container>
    )
}
const styles={
  default:{backgroundColor:'transparent', borderColor:'#000'},
  active:{backgroundColor:theme.colors.secondary, borderColor:'blue'},
  activeText: { color: '#fff'},
  defaultText: {color: '#000'}
}

const mapStateToProps=(state)=>{
  return{
     loading:state.LoadingReducer.loading,
     error:state.RegistrationReducer.error 
  }
}

const mapDispatchToProps=(dispatch)=>{
  return{
      registration:(formdata)=>dispatch(action._Registration(formdata))
  }
}




export default connect (mapStateToProps,mapDispatchToProps)(AddVaccination)