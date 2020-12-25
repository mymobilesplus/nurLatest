import React from 'react'
import { View, Text,Image } from 'react-native'
import {connect} from "react-redux"
import {Styles} from "./Styles/_LoginOptionStyles"
import {Button} from "@ui-kitten/components"
import {images,theme} from "../../constants"
import * as action from "../../redux/actions/_ExternalLogin"
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk'
import * as RootNavigation from "../../navigation/RootNavigation"
import AuthService from '../../services/AuthService'
import AsyncStorage from '@react-native-community/async-storage'
const {icons}=images


const renderFacebookIcon=()=>{
    return(
        <Image source={icons.fb} style={Styles.fbIcon} />
    )
}

const renderMailIcon=()=>{
    return(
        <Image source={icons.mail} style={Styles.fbIcon} />
    )
}



const renderButtons=(props)=>{
    const {navigation}=props
    return(
        <View>
        <View style={Styles.singleButton}>
            <Button onPress={loginWithFacebook} accessoryLeft={()=>renderFacebookIcon()} status="basic" style={Styles.fbButton} >Log in with Facebook</Button>
        </View>
          <View style={Styles.singleButton}>
          <Button accessoryLeft={()=>renderMailIcon()} status="basic" style={Styles.fbButton}
          onPress={()=>navigation.navigate('Login')}
          >Log in with your Email</Button>
        </View>
        </View>
    )
}




const LoginOption = (props) => {
  const getDt = ()=>{
  const token = "EAArdlwcxb5QBAJHpQCYzepd5O4HJZAEzPnNuZBCJY8OaYJK5w9wc156Bl0XwoxhyrDc0ZAsLQKvnztzIUoGsJ1k5dNe6Xffrn6y4PUZBVwZCZBQUgLyEGrKcolJZCCZCRdhXBQ6q3PJGz9sZCDZANPDZCC8A0ZA1UsEOdRkZD";
  // let auth1 = new AuthService();
  //     auth1.fbLogin({
  //       "provider": "Facebook",
  //       "externalaccesstoken": token,
  //     }).then((re)=>re.json()).then((resp)=>{
  //       console.log('login response',resp);
  //     }).catch((e)=>{
  //       console.log('e',e);
  //     })
  // return;
  let auth = new AuthService();
  const user = {
    first_name : 'John',
    last_name : 'Doe',
    email : 'daily4u@gmail.com'
  }
  // console.warn("data sent to register",{UserName:`${user.first_name} ${user.last_name}`, Email: user.email, FirstName:user.first_name, LastName:user.last_name, Provider: "Facebook", ExternalAccessToken: token, provider:"Facebook",    "MobilePhone": "",
  // "Gender": "M",
  // "DateOfBirth": "01-01-2000"})
  auth.registerFacebook({UserName:'kikoze', Email: user.email, FirstName:user.first_name, LastName:user.last_name, Provider: "Facebook", ExternalAccessToken: token, provider:"Facebook",    "MobilePhone": "",
  "Gender": "M",
  "DateOfBirth": "01-01-2000"})
    .then(res=>res.json()).then(res=>{
      
      console.warn("register facebook",res);
      if(res.acess_token==null){
        fbLogin(token);
      }
  }).catch(e=>console.warn("catch error",e));
  }
    getInfoFromToken = token => {
        const PROFILE_REQUEST_PARAMS = {
          fields: {
            string: 'id,name,first_name,last_name,email',
          },
        };
        const profileRequest = new GraphRequest(
          '/me',
          {token, parameters: PROFILE_REQUEST_PARAMS},
          (error, user) => {
            if (error) {
              console.log('login info has error: ' + error);
            } else {
            //   this.setState({userInfo: user});
                
              console.log('result:', user);
              // return;
              // props.login(user.email, "Facebook", token);
              let auth = new AuthService();
              console.warn("data sent to register",{UserName:`${user.first_name} ${user.last_name}`, Email: user.email, FirstName:user.first_name, LastName:user.last_name, Provider: "Facebook", ExternalAccessToken: token, provider:"Facebook",    "MobilePhone": "",
              "Gender": "M",
              "DateOfBirth": "01-01-2000"})
              auth.registerFacebook({UserName:'kikozed', Email: user.email, FirstName:user.first_name, LastName:user.last_name, Provider: "Facebook", ExternalAccessToken: token, provider:"Facebook",    "MobilePhone": "",
              "Gender": "M",
              "DateOfBirth": "01-01-2000"})
                .then(res=>res.json()).then(res=>{
                  
                  console.warn("register facebook",res);
                  if(res.acess_token==null){
                    fbLogin(token);
                  }
              }).catch(e=>console.warn("catch error",e));
            }
          },
        );
        new GraphRequestManager().addRequest(profileRequest).start();
    };
    
    loginWithFacebook = () => {
      getDt();
      return;
      
        // Attempt a login using the Facebook login dialog asking for default permissions.
        LoginManager.logInWithPermissions(["email", "public_profile", "user_friends"]).then(
          login => {
            if (login.isCancelled) {
              console.log('Login cancelled');
            } else {
              AccessToken.getCurrentAccessToken().then(data => {
                const accessToken = data.accessToken.toString();
                console.warn("access token",accessToken)
                getInfoFromToken(accessToken);
                return;
                if(accessToken){

                  let auth = new AuthService();
                  auth.fbLogin({
                    "provider": "Facebook",
                    "externalaccesstoken": accessToken,
                }
                )
                  .then( async res=>{
                    console.warn("local access token",res);
                    if(res.status == 200){
                      let dt = await res.json();
                      console.log('respsss', dt)
                      // AsyncStorage.setItem("loginData", JSON.stringify(data)).then(()=>{
                      //   console.warn("succes",data)
                      //   // RootNavigation.navigate('Top Tab');
                      // })
                    }
                  }).catch(e=>console.warn("error",e));
                }
              });
            }
          },
          error => {
            console.warn('Login fail with error: ' + error);
            LoginManager.logOut();
          },
        );
      };
    const fbLogin = (token)=>{
      let auth = new AuthService();
      auth.fbLogin({
        "provider": "Facebook",
        "externalaccesstoken": token,
      }).then( async res=>{
        console.warn("local access token",res);
        if(res.status == 200){
          let dt = await res.json();
          let data = {
            ...dt
          };
          console.log('respsss', dt)
          data.accessToken = dt.access_Token;
          data.userSession = {
            claims : dt.claims,
            "countryCode": dt.countryCode, 
            "dateOfBirth": dt.dateOfBirth, 
            "email": dt.email, 
            "emailConfirmed": true, 
            "fullName": dt.userName, 
            "genderSD": dt.genderSD, 
            "id": dt.userId, 
            "isShowDisclaimer": true, 
            "joinDate": dt.joinDate, 
            "level": dt.level, 
            "parentID": dt.parentId, 
            "phoneNumber": dt.phoneNumber, 
            "roles": dt.roles, 
            // "url": "https://demo.inplan-asp.com/NurseNova/Webservices/Auth-Server-WEB-API/api/accounts/getUser?id=2cd48dc1-2268-4e8a-909a-c6877334ad89", 
            "userName": dt.userName
          }
          if(!dt.refreshToken){
            data.refreshToken = "fdffffffffgfdfdsfds";
          }
          if(!dt.currentUserID){
            data.currentUserID = dt.UserId
          }
          AsyncStorage.setItem("loginData", JSON.stringify(data)).then(()=>{
            console.warn("succes",data)
            RootNavigation.navigate('Top Tab');
          })
        }
      }).catch(e=>console.warn("error",e));
    }
    return (
        <View style={Styles.mainContainer}>
            <Text style={Styles.heading}>Select an option to Log in to your account</Text>
            <View style={Styles.buttonContainer}>
                {renderButtons(props)}
            </View>
        </View>
    )
}

const mapStateToProps=(state)=>{
    return{
       loading:state.LoadingReducer.loading,
       data:state.LoginReducer.data 
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        login:(username,provider,External_Access_token)=>dispatch(action._Login(username,provider,External_Access_token))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(LoginOption)
// {"access_Token": "oagUIEZTgzTtTMOlZ8osjKT_MllygC9TObxe4vD9bh16daHqx_I4dZKa6KfuQ06PR7zXWtkd_kTWuRgx8YxQOrGCNtXJUGgZx9zznL13m7UqthNNiyZg1LdemKV07kbH3tuLqdZO320rzLlvZlplRbvkkVlg2jZZfKie4JG30XDuEJXZZQOhB3sFaq_TcxUnOLMrH2-ApcQ8C0P11nZHYBnC86jmRxgXgUroBnCmrT7i7DJPjJIP41nae-I00ndD", 
// "claims": [], 
// "countryCode": null, 
// "dateOfBirth": "2000-01-01T00:00:00+01:00", 
// "email": "abc02168@gmail.com", 
// "expires_In": 
// "86400", 
// "genderSD": "3", 
// "joinDate": "2020-12-18T10:45:50.14+01:00", 
// "level": 4, 
// "parentId": null, 
// "phoneNumber": "", 
// "returnStatus": {
//   "returnCode": 200, 
//   "returnMessage": null
// }, 
// "roles": ["User"], 
// "token_Type": "bearer", 
// "userId": "15d008b1-7db6-455d-86cc-3fc60511f6e9", 
// "userName": "NaynSingh"}