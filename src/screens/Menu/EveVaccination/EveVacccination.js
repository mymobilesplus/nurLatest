import React,{useEffect, useState} from 'react'
import { View, Text,Image,TouchableOpacity,ImageBackground,KeyboardAvoidingView, ScrollView, RefreshControl, ActivityIndicator} from 'react-native'
import {Styles} from "./Styles/EveVaccinationStyles"
import {theme,images} from "../../../constants"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {connect} from "react-redux"
import { Row, Col, Container, Icon, Tabs, Tab } from 'native-base';
import StandardVaccination from './StandardVaccination'
import VaccinationsApiService from '../../../services/VaccinationsApiService'
import AsyncStorage from '@react-native-community/async-storage'
import * as action from "../../../redux/actions/_Login"
import FamilyMemberService from '../../../services/FamilyMemberService'
import renderFamilyMembers from '../../../components/FamilyMemberList';
import { FlatList } from 'react-native-gesture-handler'
const{icons}=images

function Evevaccination(props) {
  let [vaccinationList, setList] = useState([]);
  let [myVaccinationList, setMyList] = useState([]);
  let [categoriesList, setCategoriesList] = useState([]);
  let [activeTabId, setActiveTabId] = useState(0);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    // code to run on component mount
    getVaccinations();
    getAllCat();
    getMyVaccinations();
  }, [])

  const getAllCat = async() => {
      console.log("vaccinations !!");
      setLoading(true)
      let user = await AsyncStorage.getItem("loginData");
      if(user!=null){
          user = JSON.parse(user);
          console.log("i am here !!")
          let api = new VaccinationsApiService();
          api.getAllCat({LanguageId: 1,Codes:["STAVACCAT"], token: user.accessToken}).then(res=>res.json()).then(res=>{
              if(res.seededDatas != undefined){
                  let records = res.seededDatas[0].options;
                  setCategoriesList(records);
                  console.warn("categories", records)
              }
              else{
                  props.logout();
              }
              setLoading(false)
          })
      } 
  }

  const getVaccinationByCategory = async(id) => {
      setLoading(true)
      setActiveTabId(id);
      let user = await AsyncStorage.getItem("loginData");
      if(user!=null){
          user = JSON.parse(user);
          let api = new VaccinationsApiService();
          api.getVaccinationByCategory({LanguageId: 1,Id:id, token: user.accessToken}).then(res=>res.json()).then(res=>{
               console.warn("theRequest",{LanguageId: 1,Id:id, token: user.accessToken});
               console.warn("theResponse",res);
              if(res.standardVaccinations != undefined){
                let records = res.standardVaccinations;
                setList(records);
              }
              else{
                  props.logout();
              }
              setLoading(false)
          })
      } 
  }


  const getVaccinations = async() =>{
      setLoading(true)
      let user = await AsyncStorage.getItem("loginData");
      if(user!=null){
          user = JSON.parse(user);
          let api = new VaccinationsApiService();
          api.get({LanguageId: 1, token: user.accessToken}).then(res=>res.json()).then(res=>{
              if(res.standardVaccinations != undefined){
                  let records = res.standardVaccinations;
                  setList(records);
              }
              else{
                  props.logout();
              }
              setLoading(false)
          })
      }
  }

  const getMyVaccinations = async() =>{
    setLoading(true)
    let user = await AsyncStorage.getItem("loginData");
    let lang = await AsyncStorage.getItem("lang");
    if(lang == null){
      lang = 1;
    }
    if(user!=null){
        user = JSON.parse(user);
        let api = new FamilyMemberService();
        api.get({LanguageId: lang, UserId: user.currentUserID, token: user.accessToken}).then(res=>res.json()).then(res=>{
            if(res.familyMembers != undefined){
                let records = res.familyMembers;
                setMyList(records);
                setTimeout(function(){
                  setLoading(false)
                },1000);
            } else {
                setLoading(false)
            }
        })
    }
  }
  const renderOwner = () => {
    return(
        <TouchableOpacity onPress={()=>props.navigation.navigate('FamilyVaccinations')}>
            <View style={Styles.memberBox} >
                <View>
                    <Image style={Styles.avatar} />
                </View>
                <View>
                    <Text style={Styles.memberName}>My Vaccinations</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
  }

    return (
          <KeyboardAwareScrollView style={{flex:1, backgroundColor:theme.colors.white}}>
            <Row style={{flex:0.2, marginTop:10, marginLeft:10}}>
              <Col style={{alignItems:'flex-start', flex:0.1, justifyContent:'center'}}>
                <Icon onPress={()=>props.navigation.goBack(null)} name="arrow-left" type="Feather" style={{fontSize:32}} />
              </Col>
              <Col style={{alignItems:'center', flex:0.8}}>
                <Text style={Styles.mainHeading}>Vaccinations</Text>
              </Col>
              <Col style={{alignItems:'flex-end', flex:0.1,justifyContent:'center', marginRight:10}}>
              </Col>
            </Row>
            <Tabs 
              locked={true}
              tabBarUnderlineStyle={{ backgroundColor: "#146ECB"}}
              initialPage={0} 
              style={{color:"#F3F4F6"}} >
                
              <Tab heading="My Vaccinations" tabStyle={{ backgroundColor: '#F3F4F6'}} textStyle={{color: '#000'}} activeTabStyle={{backgroundColor:'#F3F4F6',}} activeTextStyle={{color: '#146ECB', fontWeight: 'normal'}}>
                <Container>
                  {myVaccinationList.length > 0 &&
                      <FlatList
                          data={myVaccinationList}
                          renderItem={({item, index})=>renderFamilyMembers({item, index, props, Styles, navigate: ()=>props.navigation.navigate('FamilyVaccinations', {familyMember: item})})}
                          refreshControl={
                              <RefreshControl onRefresh={getMyVaccinations} refreshing={loading} />
                          }
                          />
                  }
                  {loading && myVaccinationList.length == 0 &&
                      <ActivityIndicator size="large" color={theme.colors.primary} />
                  }
                  {myVaccinationList.length == 0 && !loading &&
                      <View style={Styles.mainContainer}>
                          <View style={Styles.heartContainer}>
                              <Image source={icons.heart} style={Styles.heart}  />
                              <Text style={Styles.text}>Add your first family member</Text>
                          </View>
                      </View>
                  }
                </Container>
              </Tab>
              <Tab heading="Standard Vaccinations" tabStyle={{ backgroundColor: '#F3F4F6'}} textStyle={{color: '#000'}} activeTabStyle={{backgroundColor:'',}} activeTextStyle={{ color: '#146ECB', fontWeight: 'normal'}} >
                <ScrollView 
                  style={{
                    height:50,
                  }}
                  horizontal={true}
                  >
                    {(categoriesList.length > 0) ?
                      categoriesList.map((catvalue)=> {
                        console.warn("idValue",catvalue.id)
                        return(
                          <TouchableOpacity
                            style={(activeTabId == catvalue.id) ? Styles.activeCategoryTab : Styles.categoryTab}
                            onPress={()=>{getVaccinationByCategory(catvalue.id);}}
                            key={catvalue.id}
                            >
                            <Text
                              style={[(activeTabId == catvalue.id) ? Styles.activeCategoryItem : Styles.categoryItem, {fontSize : 16}]}
                              >
                              {catvalue.title.replace('yrs',' yrs').replace('birth','Birth').replace('(','\n(')}
                            </Text>
                          </TouchableOpacity>
                        )
                      })
                    : null}
                </ScrollView>
                
                <StandardVaccination  list={vaccinationList} loader={loading} refreshList={getVaccinations} />
              </Tab>
          </Tabs>
        </KeyboardAwareScrollView>
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

export default connect(mapStateToProps,mapDispatchToProps)(Evevaccination)
