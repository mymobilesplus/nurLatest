import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ToastAndroid,
  Alert,
} from 'react-native';
import {Styles} from './Style/CreateAccountStyle';
import {images} from '../../constants';
import Icon from 'react-native-vector-icons/Feather';
import {
  Button,
  Input,
  IndexPath,
  Select,
  SelectItem,
} from '@ui-kitten/components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import calendar from '../../constants/calendar';
import {connect} from 'react-redux';
import * as action from '../../redux/actions/_Registration';
import AuthService from '../../services/AuthService';
import langjson from '../../constants/lang.json';
import AsyncStorage from '@react-native-community/async-storage';
import * as RootNavigation from '../../navigation/RootNavigation';
import phone from './Phone.json';

const {days, months, years} = calendar;
const genderData = ['Male', 'Female', 'Other'];

function CreateAccount(props) {
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  const [daysIndex, setDaysIndex] = React.useState(new IndexPath(0));
  const [monthsIndex, setMonthsIndex] = React.useState(new IndexPath(0));
  const [yearsIndex, setYearsIndex] = React.useState(new IndexPath(0));
  const [phoneIndex, setPhoneIndex] = React.useState(new IndexPath(0));
  const [dob, setDob] = React.useState('');
  const [FirstName, setFirstName] = React.useState('');
  const [LastName, setLastName] = React.useState('');
  const [Email, setEmail] = React.useState('');
  const [Username, setUsername] = React.useState('');
  const [Password, setPassword] = React.useState('');
  const [ConfirmPassword, setConfirmPassword] = React.useState('');
  const [Phone, setPhone] = React.useState('');
  const [loading, setLoading] = useState(false);
  const [secureConfirmEntry, setSecureConfirmEntry] = useState(true);
  const [securePasswordEntry, setSecurePasswordEntry] = useState(true);

  const displayValue = genderData[selectedIndex.row];
  const daysValue = days[daysIndex.row];
  const monthsValue = months[monthsIndex.row];
  const yearsValue = years[yearsIndex.row];
  const phoneValue = phone[phoneIndex.row];
  const {icons, loader} = images;
  const renderGenderOption = (title) => <SelectItem title={title} />;
  const renderDaysOption = (title) => <SelectItem title={title} />;
  const renderMonthsOption = (title) => <SelectItem title={title} />;
  const renderYearsOption = (title) => <SelectItem title={title} />;
  const renderPhoneOption = (title) => (
    <SelectItem title={title.code + ' ' + title.dial_code} />
  );
  const dateb = (index) => {
    var dobs = `${daysValue} ${monthsValue} ${yearsValue}`;
    setDob(dobs);
  };

  const LoadingIndicator = (props) => (
    <View style={Styles.indicator}>
      <Image source={loader.white} />
    </View>
  );

  useEffect(() => {
    dateb();
  });

  useEffect(() => {
    console.log('Regitration Error:', props.error);
  }, [props.error]);

  const handleSubmit = () => {
    setLoading(true);
    let formData = {
      FirstName: FirstName,
      LastName: LastName,
      Email: Email,
      Username: Username,
      DateOfBirth: dob,
      PhoneNumber: Phone,
      Password: Password,
      ConfirmPassword: ConfirmPassword,
      CountryCode: phoneValue.code + ' ' + phoneValue.dial_code,
    };
    console.log('Form Data: ', formData);
    let auth = new AuthService();
    auth
      .create(formData)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setLoading(false);
        if (res.message != null) {
          ToastAndroid.show(res.message, ToastAndroid.SHORT);
        } else {
          ToastAndroid.show(
            'Registered Successfully Login to Continue!',
            ToastAndroid.SHORT,
          );
          Alert.alert(
            'Thank you for registeration',
            'Please visit your email to complete registeration. if you don’t see our email in your inbox check your spam folder.',
          );
          RootNavigation.navigate('Login');
        }
      });
  };

  const [language, setLang] = useState(1);
  useEffect(() => {
    AsyncStorage.getItem('lang').then((lang) => {
      if (lang != null) {
        setLang(lang);
      }
    });
  });
  return (
    <KeyboardAwareScrollView style={{flex: 1}}>
      <View style={[Styles.mainContainer]}>
        <View style={Styles.headingContainer}>
          <Text style={Styles.mainHeading}>
            {langjson.lang[language - 1].create}
          </Text>
        </View>

        <View>
          <View style={Styles.nameContainer}>
            <View style={Styles.firstNameContainer}>
              <Input
                label={langjson.lang[language - 1].fullname}
                styles={Styles.inputBox}
                onChangeText={(value) => setFirstName(value)}
              />
            </View>
            <View style={Styles.lastNameContainer}>
              <Input
                label={langjson.lang[language - 1].lastname}
                styles={Styles.inputBox}
                onChangeText={(value) => setLastName(value)}
              />
            </View>
          </View>
          <Select
            label={langjson.lang[language - 1].gender}
            placeholder={langjson.lang[language - 1].select}
            value={displayValue}
            selectedIndex={selectedIndex}
            onSelect={(index) => setSelectedIndex(index)}>
            {genderData.map(renderGenderOption)}
          </Select>
          <Text style={Styles.dobText}>
            {langjson.lang[language - 1].dateofbirth}
          </Text>

          <View style={Styles.dobContainer}>
            <View style={Styles.dob1}>
              <Select
                placeholder="Day"
                value={daysValue}
                selectedIndex={daysIndex}
                onSelect={(index) => setDaysIndex(index)}>
                {days.map(renderDaysOption)}
              </Select>
            </View>
            <View style={Styles.dob2}>
              <Select
                placeholder="Month"
                value={monthsValue}
                selectedIndex={monthsIndex}
                onSelect={(index) => setMonthsIndex(index)}>
                {months.map(renderMonthsOption)}
              </Select>
            </View>
            <View style={Styles.dob3}>
              <Select
                placeholder="Year"
                value={yearsValue}
                selectedIndex={yearsIndex}
                onSelect={(index) => setYearsIndex(index)}>
                {years.map(renderYearsOption)}
              </Select>
            </View>
          </View>
          <Text style={Styles.dobText}>
            {langjson.lang[language - 1].phone}
          </Text>
          <View style={Styles.phoneContainer}>
            <View style={Styles.phone1}>
              <Select
                placeholder="Phone"
                value={phoneValue.code + ' ' + phoneValue.dial_code}
                selectedIndex={phoneIndex}
                onSelect={(index) => setPhoneIndex(index)}>
                {phone.map(renderPhoneOption)}
              </Select>
            </View>
            <View style={Styles.phone2}>
              <Input onChangeText={(value) => setPhone(value)} />
            </View>
          </View>
          <Input
            label={langjson.lang[language - 1].email}
            onChangeText={(value) => setEmail(value)}
          />
          <Input
            label={langjson.lang[language - 1].username}
            onChangeText={(value) => setUsername(value)}
          />
          <Input
            label={langjson.lang[language - 1].password}
            secureTextEntry={securePasswordEntry}
            onChangeText={(value) => setPassword(value)}
            accessoryRight={() => {
              return (
                <Icon
                  style={{padding: 10}}
                  onPress={() => setSecurePasswordEntry(!securePasswordEntry)}
                  name={securePasswordEntry ? 'eye-off' : 'eye'}
                  type="Feather"
                />
              );
            }}
          />
          <Input
            label={langjson.lang[language - 1].confirm}
            secureTextEntry={secureConfirmEntry}
            onChangeText={(value) => setConfirmPassword(value)}
            accessoryRight={() => {
              return (
                <Icon
                  style={{padding: 10}}
                  onPress={() => setSecureConfirmEntry(!secureConfirmEntry)}
                  name={secureConfirmEntry ? 'eye-off' : 'eye'}
                  type="Feather"
                />
              );
            }}
          />

          {props.error != null && (
            <Text style={Styles.error}>{props.error.message}</Text>
          )}
        </View>

        <View>
          <Button
            accessoryLeft={() => (loading ? LoadingIndicator() : null)}
            block
            onPress={() => handleSubmit()}
            children={() => (
              <Text style={Styles.buttonText}>
                {!loading ? langjson.lang[language - 1].create : ''}
              </Text>
            )}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.LoadingReducer.loading,
    error: state.RegistrationReducer.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    registration: (formdata) => dispatch(action._Registration(formdata)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount);
