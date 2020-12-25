import React,{useState, useEffect} from 'react'
import { View, Image} from 'react-native'
import {Styles} from "./Styles/Medicalprofile"
import {theme,images} from "../../../constants"
import {IndexPath,Select,SelectGroup,SelectItem,Text as Texts, Input} from "@ui-kitten/components"
import {Button} from '@ui-kitten/components'
import {  Container, Content, Item, Label, Row, Col } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import * as  RootNavigation from "../../../navigation/RootNavigation"
import SeededData from '../../../services/SeededData';
import MedicalProfileService from '../../../services/MedicalProfileService';
import { connect } from 'react-redux';

const CreateMedicalForm = (props) => {
    const {icons,loader}=images
    const[bloodGroups, setBloodGroups] = useState([])
    const[bloodGroupSD, setBloodGroupSD] = useState(new IndexPath(0))
    const[maritalData, setMaritalData] = useState([])
    const[maritalStatusSD, setMaritalStatusSD] = useState(new IndexPath(0))
    const[genderData, setGenderData] = useState([])
    const[genderSD, setGenderSD] = useState(new IndexPath(0))
    const[familyMember, setFamilyMember] = useState(null)

    const[weight, setWeight] = useState(0)
    const[height, setHeight] = useState(0)
    const[occupation, setOccupation] = useState('')
    const[insurance, setInsurance] = useState(false)
    const[nssf, setNssf] = useState(false)
    const[children, setChildren] = useState(false)
    const[smoke, setSmoke] = useState(false)
    const[caffeine, setCaffeine] = useState(false)
    const[caffeinePerDay, setCaffeinePerDay] = useState('')
    const[medications, setMedications] = useState(false)
    const[surgeries, setSurgeries] = useState(false)
    const[medicationAllergy, setMedicationAllergy] = useState('')
    const[allergy, setAllergy] = useState('')
    const[familyMedicalHistory, setFamilyMedicalHistory] = useState(false)
    const[firstName, setFirstName] = useState('')
    const[lastName, setLastName] = useState('')
    const[age, setAge] = useState(0)
    const[loading, setLoading] = useState(false)
    const[update, setUpdate] = useState(false)
    const [gender, setGender] = useState(null);
    const [bloodGroup, setBloodGroup] = useState(null);
    const [maritalStatus, setMaritalStatus] = useState(null);
    const[recordID, setRecordID] = useState(null)
    
    const LoadingIndicator = () => (
      <View style={ Styles.indicator}>
       <Image source={loader.white}  />
      </View>
    );

    useEffect(()=>{
      if(genderData.length>0){
        let selectedVal = genderData.filter(d=>{
          return d.id ==  genderSD.row;
        });
        if(selectedVal.length>0){
          setGender(selectedVal[0])
        }
        else{
          setGender(genderData[0])
        }
      }
      if(bloodGroups.length>0){
        let selectedVal = bloodGroups.filter(d=>{
          return d.id ==  bloodGroupSD.row;
        });
        if(selectedVal.length>0){
          setBloodGroup(selectedVal[0])
        }
        else{
          setBloodGroup(bloodGroups[0])
        }
      }
      if(maritalData.length>0){
        let selectedVal = maritalData.filter(d=>{
          return d.id ==  maritalStatusSD.row;
        });
        if(selectedVal.length>0){
          setMaritalStatus(selectedVal[0])
        }
        else{
          setMaritalStatus(maritalData[0])
        }
      }
    }, [bloodGroupSD,genderSD,maritalStatusSD, genderData, bloodGroups, maritalData])

    useEffect(()  =>{
      getProps();
    }, [props]);

    const getProps = () => {
      let service = new SeededData();
      AsyncStorage.getItem('loginData').then(user=>{
        user = JSON.parse(user);
        AsyncStorage.getItem("lang").then(lang=>{
          if(lang == null){
            lang = 1;
          }
          service.get({Codes: ["GEN", "MARSTA", "BLOTYP"], LanguageId: lang, token: user.accessToken })
            .then(res=>res.json()).then(res=>{
              console.log(res)
            setGenderData(res.seededDatas[0].options)
            setMaritalData(res.seededDatas[1].options)
            setBloodGroups(res.seededDatas[2].options)
          })
        })
      })
      console.log("Family", props);
      if(props.route.params != undefined){
        if(props.route.params.familyMember != undefined){
          console.log(props.route.params.familyMember);
          setFamilyMember(props.route.params.familyMember)
        }
        if(props.route.params.profile != undefined){
          console.log("profile", props.route.params.profile);
          let profile = props.route.params.profile
          setAge(profile.age)
          setAllergy(profile.haveOtherAllergy)
          setBloodGroupSD(new IndexPath(profile.bloodGroupSD))
          setCaffeine(profile.caffeineDrinker)
          setChildren(profile.haveChildren)
          setFamilyMedicalHistory(profile.familyMedicalHistory)
          setFirstName(profile.firstName)
          setLastName(profile.lastName)
          setGenderSD(new IndexPath(profile.genderSD))
          setHeight(profile.heightSD)
          setWeight(profile.weightSD)
          setInsurance(profile.haveInsurance)
          setMedications(profile.takeMedication)
          setSmoke(profile.smoker)
          setOccupation(profile.occupation)
          setMaritalStatusSD(new IndexPath(profile.maritalStatusSD))
          setNssf(profile.haveNSSF)
          setCaffeinePerDay(profile.caffeinePerDay)
          setSurgeries(profile.havePreviousSurgeries)
          setMedicationAllergy(profile.haveMedicationAllergy)
          setUpdate(true)
          setRecordID(profile.id)
        }
      }
      
    }

    const renderGenderOption = (title) => (
      <SelectItem  
      title={title.title}/>
    );
  const renderMaritalOption = (title) => (
      <SelectItem  
      title={title.title}/>
    );

    const renderBloodOption = (title) => (
      <SelectItem  
      title={title.title}/>
    );

    const createMadicalProfile=async()=>{
      setLoading(true)
      let user = JSON.parse(await AsyncStorage.getItem('loginData'));
      console.log(user)
      let formData = {
        ID: null,
        UserId: user.currentUserID,
        FirstName: firstName,
        LastName: lastName,
        GenderSD: gender.id,
        MaritalStatusSD: maritalStatus.id,
        Age: age,
        BloodTypeSD: bloodGroup.id,
        WeightSD: weight,
        HeightSD: height,
        Occupation: occupation,
        HaveInsurance: insurance,
        HaveNSSF: nssf,
        Smoker: smoke,
        HaveChildren: children,
        CaffeineDrinker: caffeine,
        CaffeinePerDay: caffeinePerDay,
        TakeMedication: medications,
        HavePreviousSurgeries: surgeries,
        HaveMedicationAllergy: medicationAllergy,
        HaveOtherAllergy: allergy,
        FamilyMedicalHistory: familyMedicalHistory,
        token: user.accessToken,
        refreshToken: user.refreshToken
      }
      if(familyMember != undefined){
        formData.UserId = familyMember.userId
      }
      
      let api = new MedicalProfileService()
      if(update){
        formData.ID = recordID
        console.log("Medical Profile", formData)
        api.update(formData).then(res=>res.json()).then(res=>{
          console.log(res);
          setLoading(false)
          if(res.id == 0){
            alert("Some Backed Error Check\n"+res.returnStatus.returnMessage);
          }
          else{
            alert("Profile Updated Successfully")
          }
          RootNavigation.navigate('medicalprofile');
        })
      }
      else{
        api.create(formData).then(res=>res.json()).then(res=>{
          setLoading(false)
          console.log(res)
          if(res.id == 0){
            alert("Some Backed Error Check\n"+res.returnStatus.returnMessage);
          }
          else{
            alert("Profile Added Successfully")
          }
          
        })
      }
    }

    return (
        <Container style={{padding:10}}>
          <Content>
          <Input value={firstName} label="Firstname" onChangeText={(text)=>setFirstName(text)} />
          <Input value={lastName} label="Lastname" onChangeText={(text)=>setLastName(text)} />
          <Input value={age.toString()} label="Age" onChangeText={(text)=>setAge(text)} keyboardType="number-pad" />
          <Input value={weight.toString()} label="Weight" onChangeText={(text)=>setWeight(text)} keyboardType="decimal-pad" />
          <Input value={height.toString()} label="Height" onChangeText={(text)=>setHeight(text)} keyboardType="decimal-pad" />
          <Row style={{marginTop:5}}>
            <Col>
                {gender != undefined &&
                  <Select
                      label="Gender"
                      placeholder="Select"
                      value={gender.title}
                      selectedIndex={genderSD}
                      onSelect={index => {console.log(index); setGenderSD(new IndexPath(genderData[index.row].id))}}>
                      {genderData.map(renderGenderOption)}
                  </Select>
                }
                {gender == undefined &&
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
                {bloodGroup != undefined &&
                  <Select
                      label="Blood Type"
                      placeholder="Select"
                      value={bloodGroup.title}
                      selectedIndex={bloodGroupSD}
                      onSelect={index => setBloodGroupSD(new IndexPath(bloodGroups[index.row].id))}>
                      {bloodGroups.map(renderBloodOption)}
                  </Select>
                }
                {bloodGroup == undefined &&
                  <Select
                    label="Blood Type"
                    value="Loading...">
                      <SelectItem  
                        title={"Loading..."}/>
                  </Select>
                }
            </Col>
          </Row>
          <Row style={{marginTop:5}}>
            <Col>
                {maritalStatus != undefined &&
                  <Select
                      label="Marital Status"
                      placeholder="Select"
                      value={maritalStatus.title}
                      selectedIndex={maritalStatusSD}
                      onSelect={index => setMaritalStatusSD(new IndexPath(maritalData[index.row].id))}>
                      {maritalData.map(renderMaritalOption)}
                  </Select>
                }
                {maritalStatus == undefined &&
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
              <Select
                  label="Do you have Children?"
                  placeholder="Select"
                  value={children == true ? "Yes" : "No"}
                  onSelect={index => setChildren(index.row==0)}>
                  <SelectItem  
                        title={"Yes"} value={true}/>
                  <SelectItem  
                        title={"No"} value={false}/>
              </Select>
            </Col>
          </Row>
          <Row style={{marginTop:5}}>
            <Col>
              <Select
                  label="Do you have NSSF?"
                  placeholder="Select"
                  value={nssf == true ? "Yes" : "No"}
                  onSelect={index => setNssf(index.row==0)}>
                  <SelectItem  
                        title={"Yes"} value={true}/>
                  <SelectItem  
                        title={"No"} value={false}/>
              </Select>
            </Col>
          </Row>
          <Row style={{marginTop:5}}>
            <Col>
              <Select
                  label="Do you have Insurance?"
                  placeholder="Select"
                  value={insurance == true ? "Yes" : "No"}
                  onSelect={index => setInsurance(index.row==0)}>
                  <SelectItem  
                        title={"Yes"} value={true}/>
                  <SelectItem  
                        title={"No"} value={false}/>
              </Select>
            </Col>
          </Row>
          <Input value={occupation} label="What is your occupation? " onChangeText={(text)=>setOccupation(text)} />
          <Row style={{marginTop:5}}>
            <Col>
              <Select
                  label="Do you Smoke?"
                  placeholder="Select"
                  value={smoke == true ? "Yes" : "No"}
                  onSelect={index => setSmoke(index.row==0)}>
                  <SelectItem  
                        title={"Yes"} value={true}/>
                  <SelectItem  
                        title={"No"} value={false}/>
              </Select>
            </Col>
          </Row>
          <Row style={{marginTop:5}}>
            <Col>
              <Select
                  label="Do you drink Caffeine?"
                  placeholder="Select"
                  value={caffeine == true ? "Yes" : "No"}
                  onSelect={index => setCaffeine(index.row==0)}>
                  <SelectItem  
                        title={"Yes"} value={true}/>
                  <SelectItem  
                        title={"No"} value={false}/>
              </Select>
            </Col>
          </Row>
          {caffeine &&
            <Input value={caffeinePerDay} label="Caffeine Per Day" onChangeText={(text)=>setCaffeinePerDay(text)} />
          }
          <Row style={{marginTop:5}}>
            <Col>
              <Select
                  label="Do you take Medications?"
                  placeholder="Select"
                  value={medications == true ? "Yes" : "No"}
                  onSelect={index => setMedications(index.row==0)}>
                  <SelectItem  
                        title={"Yes"} value={true}/>
                  <SelectItem  
                        title={"No"} value={false}/>
              </Select>
            </Col>
          </Row>
          <Row style={{marginTop:5}}>
            <Col>
              <Select
                  label="Do you have any medication allergy?"
                  placeholder="Select"
                  value={medicationAllergy == true ? "Yes" : "No"}
                  onSelect={index => setMedicationAllergy(index.row==0)}>
                  <SelectItem  
                        title={"Yes"} value={true}/>
                  <SelectItem  
                        title={"No"} value={false}/>
              </Select>
            </Col>
          </Row>
          <Input value={allergy} label="Do you have any other allergy?" onChangeText={(text)=>setAllergy(text)} />
          <Row style={{marginTop:5}}>
            <Col>
              <Select
                  label="Did you undergo any surgery?"
                  placeholder="Select"
                  value={surgeries == true ? "Yes" : "No"}
                  onSelect={index => setSurgeries(index.row==0)}>
                  <SelectItem  
                        title={"Yes"} value={true}/>
                  <SelectItem  
                        title={"No"} value={false}/>
              </Select>
            </Col>
          </Row>
          <Input value={familyMedicalHistory} label="Any Family Medical History" onChangeText={(text)=>setFamilyMedicalHistory(text)} />
          <Row style={{marginTop:10}}>
            <Col style={{marginRight:5}}>
              <Button accessoryLeft={()=>loading?LoadingIndicator():null} 
                onPress={!loading?createMadicalProfile:null} appearance="primary" status="primary" 
                  style={Styles.button} size="large" block>
                  { !loading?update? "Update Profile" : "Create Medical Profile":""}</Button>
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




export default connect (mapStateToProps,mapDispatchToProps)(CreateMedicalForm)
