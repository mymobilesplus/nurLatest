import React ,{useState,useEffect}from 'react'
import { View, Text,Image ,TouchableOpacity} from 'react-native'
import {connect} from "react-redux"
import {Styles} from "./Styles/_LoginStyles"
import {Button,Input,Spinner} from "@ui-kitten/components"
import {images,theme} from "../../constants"
import * as action from "../../redux/actions/_Login"
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from "react-native-responsive-screen"
import ID from "../../constants/constant.json"
import { useIsFocused } from '@react-navigation/native';
import {api} from '../../API_URI';
import AuthService from '../../services/AuthService'
import AsyncStorage from '@react-native-community/async-storage'
import * as RootNavigation from "../../navigation/RootNavigation"
import {Icon} from 'native-base';

const height=hp('100%')
const width=wp('100%')





function Login(props) {
    const {icons,loader}=images
    const {navigation}=props
    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    const isFocused = useIsFocused();
    const [err, setError]=useState(null)
    const [loading,setLoading]=useState(false)
    const [secureEntry, setSecureEntry] = useState(true)


useEffect(()=>{
    // console.log("Login Message:",props.data)
},[isFocused])

useEffect(()=>{
    // console.log("Login Message:",props.data)
},[props.data])

const LoadingIndicator = (props) => (
    <View style={ Styles.indicator}>
     <Image source={loader.white}  />
     {/* <Spinner size="small"  /> */}
    </View>
  );

const Login=()=>{
    // props.login(username,password,ID.clientId)
    let auth = new AuthService()
    setLoading(true)
    auth.login({username, password, client_id: ID.clientId}).then(res=>res.json()).then(res=>{
        // console.warn("login",{username, password, clientId: ID.clientId})
        console.warn(res);
        
        if(res.message!=null){
            setError({message: "The user name or password is incorrect!"});
            setLoading(false)
            return;
        }
        AsyncStorage.setItem("loginData", JSON.stringify(res)).then(()=>{
            console.warn("login data",res)
            setLoading(false)
            RootNavigation.navigate('Top Tab');
        });
    })
}

const error=()=>{
    return(
    <Text style={Styles.error}>{err!=null &&err.message?err.message:""}</Text>

    )
}


const renderInputField=(props)=>{
    return(
        <View>
        <View style={Styles.inputView}>
            <Input label="Username"
                onChangeText={(text)=>setUsername(text)}
             style={Styles.inputBox} textStyle={{color:theme.colors.black}} />
          
        </View>
        <View style={Styles.inputView}>
            <Input label="Password" style={Styles.inputBox}
            caption={()=>error()}
            secureTextEntry={secureEntry}
            accessoryRight={()=>{ return  <Icon onPress={()=>setSecureEntry(!secureEntry)} name={secureEntry?"eye-off": 'eye'} type="Feather" /> }} 
            onChangeText={(text)=>setPassword(text)}
            textStyle={{color:theme.colors.black}} />
            <View style={{alignItems:"flex-end"}}>
                <TouchableOpacity onPress={()=>navigation.navigate('ForgetPassword')} >
                <Text style={Styles.forgetPassword}>Forgot Password?</Text>
                </TouchableOpacity>
            </View>
        </View>
        </View>
    )
}
    return (
       <View style={Styles.mainContainer}>
        <View style={Styles.secondContainer}>
           <View style={Styles.headingContainer}>
           <Text style={Styles.heading}>Log in using your Username and Password</Text>
           </View>

            <View style={Styles.formContainer}>
                {renderInputField(props)}
               

            </View>
           </View>
           <View style={Styles.buttonContainer}>
               <Button
                accessoryLeft={()=>loading?LoadingIndicator():null} 
                disabled={username!==""&& password!==""?false:true }
             onPress={!loading?()=>Login():null} children={()=><Text style={Styles.buttonText}>{!loading?"Log In":""}</Text>}/>
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
        login:(username,password,clientId)=>dispatch(action._Login(username,password,clientId))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Login)