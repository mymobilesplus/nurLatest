import React,{useEffect, useState} from 'react'
import { View, Text,Image,TouchableOpacity,ImageBackground,KeyboardAvoidingView, Alert} from 'react-native'
import {Styles} from "./Style/CreateAccountStyle"
import {theme,images} from "../../constants"
import Icon from 'react-native-vector-icons/Feather';
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from "react-native-responsive-screen"
import {Button,Input,IndexPath,Select,SelectGroup,SelectItem,} from '@ui-kitten/components'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import calendar from "../../constants/calendar"
import {connect} from "react-redux"
import * as action from "../../redux/actions/_Registration"
import {Formik} from "formik"
import AuthService from '../../services/AuthService';
import * as RootNavigation from "../../navigation/RootNavigation"
import { Col,Row, Content, Container } from 'native-base';
import FamilyMemberService from '../../services/FamilyMemberService';
import AsyncStorage from '@react-native-community/async-storage';
import SeededData from '../../services/SeededData';
const{days,months,years}=calendar
const genderData = [
    'Select',
    'Male',
    'Female',
    'Other',
  ];

  const maritalData = [
    'Select',
    'Single',
    'Married'
  ]

  const relationData = [
    'Select',
    'Father',
    'Mother',
    'Brother',
    'Spouse',
    'Cousin',
    'Other',
  ];

  const bloodData = [
    'Select',
    'A-',
    'A+',
    'B-',
    'B+',
    'AB-',
    'AB+',
    'O-',
    'O+'
  ];
const phone=[
  'Lb +961'
]

function AddNewMember(props) {
    const [relation, setRelation] = React.useState(new IndexPath(0));
    const [gender, setGender] = React.useState(new IndexPath(0));
    const [bloodGroup, setBloodGroup] = React.useState(new IndexPath(0));
    const [martialStatus, setMaritalStatus] = React.useState(new IndexPath(0));
    const [daysIndex, setDaysIndex] = React.useState(new IndexPath(0));
    const [monthsIndex, setMonthsIndex] = React.useState(new IndexPath(0));
    const [yearsIndex, setYearsIndex] = React.useState(new IndexPath(0));
    const [file, setFile] = React.useState([])
    const [returnURL, setReturn] = React.useState("Home")
    const [genderData, setGenderData] = useState([]);
    const [relationData, setRelationData] = useState([]);
    const [bloodData, setBloodData] = useState([]);
    const [maritalData, setMeritalData] = useState([]);
    
    const [dob,setDob]=React.useState('')
    const [Name,setFirstName]=React.useState('')
    const [MedicalAllergy, setMedicalAllergy] = React.useState('')
    const [Remarks, setRemarks] = React.useState('')
    const [update, setUpdate] = React.useState(false)
    
    const genderValue = genderData[gender.row];
    const relationValue = relationData[relation.row];
    const bloodValue = bloodData[bloodGroup.row];
    const maritalValue = maritalData[martialStatus.row];
    const daysValue=days[daysIndex.row]
    const monthsValue=months[monthsIndex.row]
    const yearsValue=years[yearsIndex.row]


    const {icons,loader}=images

    const renderGenderOption = (title) => (
        <SelectItem  
        title={title.title}/>
      );
    const renderMaritalOption = (title) => (
        <SelectItem  
        title={title.title}/>
      );

      const renderRelationOption = (title) => (
        <SelectItem  
        title={title.title}/>
      );

      const renderBloodOption = (title) => (
        <SelectItem  
        title={title.title}/>
      );

    const renderDaysOption=(title)=>(
      <SelectItem title={title} />
    )

    const renderMonthsOption=(title)=>(
      <SelectItem title={title} />
    )

    const renderYearsOption=(title)=>(
      <SelectItem title={title} />
    )
    const renderPhoneOption=(title)=>(
      <SelectItem title={title} />
    )
    const dateb=(index)=>{
      
       var dobs=`${daysValue} ${monthsValue} ${yearsValue}`
       setDob(dobs) 
       if(props.route.params != null)
        setFile(props.route.params.file)
       if(props.route.params.returnURL!=undefined){
         setReturn(props.route.params.returnURL)
       }
    }
    
    const LoadingIndicator = (props) => (
      <View style={ Styles.indicator}>
       <Image source={loader.white}  />
       {/* <Spinner size="small"  /> */}
      </View>
    );


    useEffect(()=>{
      dateb()
    })

    useEffect(()=>{
      getData()
    }, [])

    useEffect(()=>{
      // console.log("Regitration Error:" ,props.error)
    },[props.error])

    const getData = () => {
      if(props.route.params != undefined){
        let {item} = props.route.params;
        // console.warn("item",item)

        if(item !== undefined){
          // console.warn("name",item.name)
          let {name,id,bloodTypeSD,genderSD,dateOfBirth,remark,relationshipSD,medicationAllergy} = props.route.params.item;
          setFirstName(name)
          setDob(dateOfBirth)
          setRemarks(remark)
          setUpdate(true)
        }}
        
      let service = new SeededData();
      AsyncStorage.getItem('loginData').then(user=>{
        user = JSON.parse(user);
        AsyncStorage.getItem("lang").then(lang=>{
          if(lang == null){
            lang = 1;
          }
          service.get({Codes: ["GEN", "REL", "MARSTA", "BLOTYP"], LanguageId: lang, token: user.accessToken })
            .then(res=>res.json()).then(res=>{
            setGenderData(res.seededDatas[0].options)
            setRelationData(res.seededDatas[1].options)
            setMeritalData(res.seededDatas[2].options)
            setBloodData(res.seededDatas[3].options)
            // setData(res.seededDatas[0].options)
            // console.warn("marital",res.seededDatas[2].options)
          })
        })
      })
    }


    const handleSubmit=()=>{
        // console.warn(file.Photo);
        let auth = new FamilyMemberService();
        if(update){
          let {name,id,bloodTypeSD,genderSD,dateOfBirth,remark,relationshipSD,medicationAllergy} = props.route.params.item;
          let formData = {
            FamilyMember: {
                id,
                Name,
                GenderSD: genderSD,
                RelationshipSD: relationshipSD,
                MaritalStatusSD: maritalValue.id,
                DateOfBirth: dob,
                BloodTypeSD: bloodTypeSD,
                MedicalAllergy: medicationAllergy,
                Remark: Remarks,
                Photo :file != undefined ? file.Photo : {} 
                // GenderSD:genderData[selectedIndex.row]
              }
            };
            // console.warn("Form Data: ",formData)
            AsyncStorage.getItem('loginData').then(user=>{
              user = JSON.parse(user);
              formData.token = user.accessToken;
              formData.FamilyMember.UserId = user.currentUserID;
              auth.update(formData).then(res=>res.json()).then(res=>{
                console.log(res);
                if(res.id == undefined){
                  RootNavigation.navigate("Login");
                }
                if(res.id==0){
                  alert("Some Backed Error Check\n"+res.returnStatus.returnMessage);
                }
                else{
                  alert("Member updated successfully")
                  RootNavigation.navigate(returnURL);
                }
                
              })
            })
        } else{
          let formData = {
            FamilyMember: {
                Name,
                GenderSD: genderValue.id,
                RelationshipSD: relationValue.id,
                MaritalStatusSD: maritalValue.id,
                DateOfBirth: dob,
                BloodTypeSD: bloodValue.id,
                MedicalAllergy: MedicalAllergy.id,
                Remark: Remarks,
                Photo :file != undefined ? file.Photo : {} 
                // GenderSD:genderData[selectedIndex.row]
              }
            };
          // console.warn("Form Data: ",formData)
          AsyncStorage.getItem('loginData').then(user=>{
            user = JSON.parse(user);
            formData.token = user.accessToken;
            formData.FamilyMember.UserId = user.currentUserID;
            auth.create(formData).then(res=>res.json()).then(res=>{
              console.log(res);
              if(res.id == undefined){
                RootNavigation.navigate("Login");
              }
              if(res.id==0){
                alert("Some Backed Error Check\n"+res.returnStatus.returnMessage);
              }
              else{
                alert("Member added successfully")
                RootNavigation.navigate(returnURL);
              }
              
            })
          })
        }

        
    }


    return (
        <Container>
          <Content>
            <Row>
              <Col style={{flex:0.2, marginTop:10, marginLeft:10}}>
                      <Icon onPress={()=>props.navigation.goBack(null)} name="arrow-left" size={30} color={'#000'} />
              </Col>
              <Col>
                      <Text style={{fontSize:18, marginTop:10}}>Add Member</Text>
              </Col>
            </Row>
            
            <View style={{margin:10}}>
                <Row>
                    <Col>
                        <Input label="Name" value={Name}
                            onChangeText={(value)=>setFirstName(value)}
                        />
                    </Col>
                </Row>
                <Row style={{marginTop:5}}>
                    <Col>
                        {relationValue != undefined &&
                          <Select
                              label="Marital Status"
                              placeholder="Select"
                              value={relationValue.title}
                              selectedIndex={relation}
                              onSelect={index => setRelation(index)}>
                              {relationData.map(renderRelationOption)}
                          </Select>
                        }
                        {relationValue == undefined &&
                          <Select
                            label="Marital Status"
                            value="Loading...">
                              <SelectItem  
                                title={"Loading..."}/>
                          </Select>
                        }
                    </Col>
                </Row>

                <Row style={{marginTop:5}}>
                    <Col>
                        {genderValue != undefined &&
                          <Select
                              label="Gender"
                              placeholder="Select"
                              value={genderValue.title}
                              selectedIndex={gender}
                              onSelect={index => setGender(index)}>
                              {genderData.map(renderGenderOption)}
                          </Select>
                        }
                        {genderValue == undefined &&
                          <Select
                            label="Gender"
                            value="Loading...">
                              <SelectItem  
                                title={"Loading..."}/>
                          </Select>
                        }
                    </Col>
                </Row>     
                <Row style={{marginTop:5}}>
                    <Col>
                        {maritalValue != undefined &&
                          <Select
                              label="Relationship"
                              placeholder="Select"
                              value={maritalValue.title}
                              selectedIndex={martialStatus}
                              onSelect={index => setMaritalStatus(index)}>
                              {maritalData.map(renderMaritalOption)}
                          </Select>
                        }
                        {maritalValue == undefined &&
                          <Select
                            label="Options of Relationship"
                            value="Loading...">
                              <SelectItem  
                                title={"Loading..."}/>
                          </Select>
                        }
                    </Col>
                </Row>   
                <Row style={{marginTop:5}}>
                    <Col>
                    <Text style={Styles.dobText}>Date of Birth</Text>
                    </Col>
                </Row>
                <Row style={{marginTop:5}}>
                    <Col  style={{flex:0.3}}>
                        <Select  placeholder="Day" value={daysValue} 
                            selectedIndex={daysIndex} onSelect={index => setDaysIndex(index)}>
                                {days.map(renderDaysOption)}
                        </Select>
                </Col>
                <Col style={{flex:0.3}}>
                        <Select  placeholder="Month"
                            value={monthsValue} selectedIndex={monthsIndex} onSelect={index => setMonthsIndex(index)}>
                                {months.map(renderMonthsOption)}
                        </Select>
                </Col>
                <Col style={{flex:0.4}}>
                        <Select  placeholder="Year"
                            value={yearsValue} selectedIndex={yearsIndex} onSelect={index => setYearsIndex(index)}>
                                {years.map(renderYearsOption)}
                        </Select>
                </Col>
                </Row>
                <Row style={{marginTop:5}}>
                    <Col>
                        {bloodValue != undefined &&
                          <Select
                              label="Blood Type"
                              placeholder="Select"
                              value={bloodValue.title}
                              selectedIndex={bloodGroup}
                              onSelect={index => setBloodGroup(index)}>
                              {bloodData.map(renderBloodOption)}
                          </Select>
                        }
                        {bloodValue == undefined &&
                          <Select
                            label="Blood Type"
                            value="Loading...">
                              <SelectItem  
                                title={"Loading..."}/>
                          </Select>
                        }
                    </Col>
                </Row>   
                <Row style={{marginTop:5}} >
                    <Col>
                        <Input label="Medication Allergy" 
                            textAlignVertical='top'
                            numberOfLines={5}
                            onChangeText={(text)=>setMedicalAllergy(text)}
                        />
                    </Col>
                </Row> 
                <Row style={{marginTop:5}} >
                    <Col>
                        <Input label="Remarks" 
                            textAlignVertical='top'
                            numberOfLines={5}
                            onChangeText={(text)=>setRemarks(text)}
                        />
                    </Col>
                </Row> 
            </View>
            <View>
            <Button
            accessoryLeft={()=>props.loading?LoadingIndicator():null} 
            block onPress={()=>handleSubmit()} children={()=><Text style={Styles.buttonText}>Next</Text>}/>
            </View>
          </Content>
        </Container>
    )
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




export default connect (mapStateToProps,mapDispatchToProps)(AddNewMember)