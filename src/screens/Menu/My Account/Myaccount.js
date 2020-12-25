import React, { useEffect, useState } from 'react'
import { View, Text, Image, Alert } from 'react-native'
import { Styles } from "./Style/MyaccountStyles"
import { images } from "../../../constants"
import Icon from 'react-native-vector-icons/Feather';
import { Button, Input, IndexPath, Select, SelectItem } from '@ui-kitten/components'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import calendar from "../../../constants/calendar"
import { connect } from "react-redux"
import { Row, Col, Container, Content, Left } from "native-base"
import langjson from "../../../constants/lang.json"
import AsyncStorage from '@react-native-community/async-storage'
import * as action from "../../../redux/actions/_Registration"
import AuthService from '../../../services/AuthService';
import SeededData from '../../../services/SeededData';
import phone from '../../Registration/Phone.json';

const { days, months, years } = calendar

function MyAccount(props) {
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  const [daysIndex, setDaysIndex] = React.useState(new IndexPath(0));
  const [monthsIndex, setMonthsIndex] = React.useState(new IndexPath(0));
  const [yearsIndex, setYearsIndex] = React.useState(new IndexPath(0));
  const [phoneIndex, setPhoneIndex] = React.useState(new IndexPath(0));
  const [dob, setDob] = React.useState('')
  const [FirstName, setFirstName] = React.useState('')
  const [LastName, setLastName] = React.useState('')
  const [Email, setEmail] = React.useState('')
  const [Password, setPassword] = React.useState('')
  const [ConfirmPassword, setConfirmPassword] = React.useState('')
  const [Phone, setPhone] = React.useState('')
  const [language, setLang] = useState(1)
  const [genderData, setGenderData] = useState([])
  const [gender, setGender] = useState(null)
  const [genderSD, setGenderSD] = useState(new IndexPath(0))
  const [loading, setLoading] = useState(false)

  const displayValue = genderData[selectedIndex.row];
  const daysValue = days[daysIndex.row]
  const monthsValue = months[monthsIndex.row]
  const yearsValue = years[yearsIndex.row]
  const phoneValue = phone[phoneIndex.row]


  const { icons, loader } = images

  const renderGenderOption = (title) => (
    <SelectItem
      title={title.title} />
  );

  const renderDaysOption = (title) => (
    <SelectItem title={title} />
  )

  const renderMonthsOption = (title) => (
    <SelectItem title={title} />
  )

  const renderYearsOption = (title) => (
    <SelectItem title={title} />
  )
  const renderPhoneOption = (title) => (
    <SelectItem title={title.code + " " + title.dial_code} />
  )
  const dateb = (index) => {
    let month = monthsIndex.row + 1
    var dobs = `${yearsValue}-${month}-${daysValue}`
    setDob(dobs)
    console.log("Date of Birth: ", dobs)
  }

  const LoadingIndicator = (props) => (
    <View style={Styles.indicator}>
      <Image source={loader.white} />
      {/* <Spinner size="small"  /> */}
    </View>
  );

  useEffect(() => {
    if (genderData.length > 0) {
      let selectedVal = genderData.filter(d => {
        return d.id == genderSD.row;
      });
      console.log(selectedVal)
      if (selectedVal.length > 0) {
        setGender(selectedVal[0])
      }
      else {
        setGender(genderData[0])
        setGenderSD(new IndexPath(genderData[0].id))
      }
    }
  }, [genderSD, genderData])

  useEffect(() => {
    dateb()
  }, [monthsIndex, yearsValue, daysValue])
  useEffect(() => {
    dateb()
    AsyncStorage.getItem("lang").then(lang => {
      if (lang != null) {
        setLang(lang)
      }
    })
    AsyncStorage.getItem("loginData").then(user => {

      if (user != null) {
        user = JSON.parse(user);
        let api = new AuthService()
        let req = {
          id: user.currentUserID,
          token: user.accessToken,
          refreshToken: user.refreshToken
        }
        console.log(req)
        api.getUser(req).then(res => res.json()).then(res => {
          console.log(res)
          setFirstName(res.user.fullName.split(" ")[0])
          setLastName(res.user.fullName.split(" ")[1])
          setEmail(res.user.email)
          setPhone(res.user.phoneNumber)
          setGenderSD(new IndexPath(res.genderSD))
        })
        let service = new SeededData();
        service.get({ Codes: ["GEN"], LanguageId: language, token: user.accessToken })
          .then(res => res.json()).then(res => {
            setGenderData(res.seededDatas[0].options)
          })
      }
    })
  }, [])



  const handleSubmit = async () => {
    setLoading(true)
    let user = JSON.parse(await AsyncStorage.getItem("loginData"))
    console.log("User", user);
    let req = {
      Username: user.userSession.userName,
      JoinDate: user.userSession.joinDate,
      Level: user.userSession.level,
      Firstname: FirstName,
      Lastname: LastName,
      Email: Email,
      DateOfBirth: `${yearsValue}-${monthsIndex.row + 1}-${daysValue}`,
      GenderSD: genderSD.row,
      Id: user.currentUserID,
      token: user.accessToken,
      refreshToken: user.refreshToken,
      ParentId: ''
    }

    console.log("Form Data: ", req)
    let api = new AuthService()
    let res = await api.updateUser(req).then(res => res.json())
    console.log(res)
    setLoading(false)
    Alert.alert("Success", "Details Updated Successfully!", [{
      text: "OK"
    }]);
  }



  return (
    <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: '#FFFFFF20' }}>
      <View>
        <View 
          style={{
            height:60,
            flexDirection:'row',
            backgroundColor:'#fff'
          }}>
          <View
            style={{
              position:'absolute',
              top:18,
              width:60,
              justifyContent:'center',
              alignItems:'center'
            }}
            >
            <Icon 
              onPress={() => props.navigation.goBack(null)} 
              name="arrow-left" 
              size={30} 
              color={'#000'} 
              />
          </View>
          <View
            style={{
              flex:1,
              justifyContent:'center',
              alignItems:'center'
            }}
            >
            <Text style={[Styles.mainHeading]}>My Account</Text>
          </View>  
        </View>
      </View>
      <Container>
        <Content style={{ paddingLeft: 20,paddingRight: 20, marginTop: 10, backgroundColor: '#FFFFFF20' }}>
          <Row style={{ marginBottom: 10, marginTop: 15, }}>
              <Col>
                <Text style={{
                  color: '#212B36',
                  fontSize: 16,
                  marginBottom: 10,
                  fontFamily:"OpenSansCondensed-Light",
                }}>Full Name 1</Text>
                <Input
                  labelStyle={{ color: '#000' }}
                  styles={[Styles.inputBox,{backgroundColor:'#fff'}]}
                  onChangeText={(value) => setFirstName(value)}
                  value={FirstName}
                />
              </Col>
          </Row>  
          <Row style={{ marginBottom: 10 }}>
            <Col>
              <Text style={{
                color: '#212B36',
                fontSize: 16,
                marginBottom: 10,
                fontFamily:"OpenSansCondensed-Light",
              
              }}>Gender</Text>
              {gender != undefined &&

                <Select
                  value={gender.title}
                  selectedIndex={genderSD}
                  onSelect={index => { console.log(index); setGenderSD(new IndexPath(genderData[index.row].id)) }}>
                  {genderData.map(renderGenderOption)}
                </Select>
              }
              {gender == undefined &&
                <Select
                  value="Select">
                  <SelectItem
                    title={"Select"} />
                </Select>
              }
            </Col>
          </Row>

          <Row style={{ marginBottom: 10 }}>
            <Col>
              <Text style={{
                color: '#212B36',
                fontSize: 16,
                fontFamily:"OpenSansCondensed-Light",
              }}>{langjson.lang[language - 1].dateofbirth}</Text>
            </Col>
          </Row>
          <Row style={{ marginBottom: 10 }}>
            <Col>
              <Select placeholder="Day" value={daysValue}
                selectedIndex={daysIndex} onSelect={index => setDaysIndex(index)}>
                {days.map(renderDaysOption)}
              </Select>
            </Col>
            <Col style={{
              marginLeft: 7,
              marginRight: 7
            }}>
              <Select placeholder="Month"
                value={monthsValue} selectedIndex={monthsIndex} onSelect={index => setMonthsIndex(index)}>
                {months.map(renderMonthsOption)}
              </Select>
            </Col>
            <Col>
              <Select placeholder="Year"
                value={yearsValue} selectedIndex={yearsIndex} onSelect={index => setYearsIndex(index)}>
                {years.map(renderYearsOption)}
              </Select>
            </Col>
          </Row>
          <Row style={{ marginBottom: 10 }}>
            <Col>
              <Text style={{
                color: '#212B36',
                fontSize: 16,
                fontFamily:"OpenSansCondensed-Light",
               
              }}>{langjson.lang[language - 1].phone}</Text>
            </Col>
          </Row>
          <Row style={{ marginBottom: 10 }}>
            <Col style={{
              width: 150
            }}>
              <Select placeholder="Phone" value={phoneValue.code + " " + phoneValue.dial_code} selectedIndex={phoneIndex} onSelect={index => setPhoneIndex(index)}>
                {phone.map(renderPhoneOption)}
              </Select>
            </Col>
            <Col style={{
              marginLeft: 15
            }}>
              <Input value={Phone} onChangeText={(value) => setPhone(value)} />
            </Col>
          </Row>
          <Row style={{ marginBottom: 10 }}>
            <Col>
              <Text style={{
                color: '#212B36',
                fontSize: 16,
                marginBottom: 10,
                fontFamily:"OpenSansCondensed-Light",
              }}>
                {langjson.lang[language - 1].email}
              </Text>
              <Input
                onChangeText={(value) => setEmail(value)}
                value={Email}
              />
            </Col>
          </Row>
          <Row style={{ marginBottom: 10 }}>
            <Col>
            <Text style={{
                color: '#212B36',
                fontSize: 16,
                fontFamily:"OpenSansCondensed-Light",
              }}>
                {langjson.lang[language - 1].password}
              </Text>
              <Input
                onChangeText={(value) => setPassword(value)}
              />
            </Col>
          </Row>
          <Row style={{ marginBottom: 10 }}>
            <Col>
            <Text style={{
                color: '#212B36',
                fontSize: 16,
                fontFamily:"OpenSansCondensed-Light",
              }}>
                {langjson.lang[language - 1].confirm}
              </Text>
              <Input 
                onChangeText={(value) => setConfirmPassword(value)}
              />
            </Col>
          </Row>

          {props.error != null && <Text style={Styles.error}>{props.error.message}</Text>}
          <Row style={{ marginTop: 10, }}>
            <Col style={{paddingRight:5}}>
              <Button style={{ backgroundColor: '#F5FBFF', borderColor: '#F5FBFF', height: 50 }}
                block onPress={() => props.navigation.goBack()} children={() => <Text >{!props.loading ? "Cancel" : ""}</Text>} />
            </Col>
            <Col style={{paddingLeft:5}}>
              <Button style={{ backgroundColor: '#146ECB', height: 50 }} accessoryLeft={() => loading ? LoadingIndicator() : null} onPress={() => handleSubmit()}>
                <Text >{!loading ? "Save" : ""}</Text></Button>
            </Col>
          </Row>
        </Content>
      </Container>
    </KeyboardAwareScrollView>
  )
}

const mapStateToProps = (state) => {
  return {
    loading: state.LoadingReducer.loading,
    error: state.RegistrationReducer.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    registration: (formdata) => dispatch(action._Registration(formdata))
  }
}




export default connect(mapStateToProps, mapDispatchToProps)(MyAccount)