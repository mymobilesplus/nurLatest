import React,{useState,useEffect} from 'react'
import { View, Text,Image ,TouchableOpacity} from 'react-native'
import {connect} from "react-redux"
import {Styles} from "./Style/_ResetPasswordStyle"
import {Button,Input} from "@ui-kitten/components"
import {images,theme} from "../../constants"
import * as actions from "../../redux/actions/_ForgotPassword"
import AsyncStorage from '@react-native-community/async-storage'
const {icons,loader}=images
const emailRegex=/^[\w.+-_]+@[^.][\w.-]*\.[\w-]{2,63}$/iu


 function ResetPassword(props) {

const {loading,error,data,navigation}=props
const [email,setEmail]=useState("")



    const renderInputField=()=>{
        return(
            <View>
            <View style={Styles.inputView}>
                <Input label="Email Address"
                onChangeText={(text)=>setEmail(text)}
                style={Styles.inputBox} textStyle={{color:theme.colors.black}} />
            </View>
            </View>
        )
    }


    const LoadingIndicator = (props) => (
        <View style={ Styles.indicator}>
         <Image source={loader.white}  />
         {/* <Spinner size="small"  /> */}
        </View>
      );
    
    
const sendForgotRequest=()=>{
    AsyncStorage.setItem("forgotemail", email).then(()=>{
        console.log(email);
        props.forgotPassword(email)
    });
    
}



    return (
       <View style={Styles.mainContainer}>
        <View style={Styles.secondContainer}>
           <View style={Styles.headingContainer}>
           <Text style={Styles.heading}>Reset your password</Text>
           </View>

            <View style={Styles.formContainer}>
                {renderInputField()}
            </View>
           </View>
           <View style={Styles.buttonContainer}>
           <Button
           disabled={emailRegex.test(email)?false:true}
            accessoryLeft={()=>loading?LoadingIndicator():null} 
             onPress={!loading?()=>sendForgotRequest():null} children={()=><Text style={Styles.buttonText}>{!loading?"Next":""}</Text>}/>
           </View>
       </View>
    )
}


const mapStateToProps=(state)=>{
    return{
        loading:state.LoadingReducer.loading,
        data:state.ForgotPasswordReducer.data,
        error:state.ForgotPasswordReducer.error
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        forgotPassword:(email)=>dispatch(actions.forgotPassword(email))
    }
}




export default connect(mapStateToProps,mapDispatchToProps)(ResetPassword) 