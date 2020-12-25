import React, {useState} from 'react'
import { View, Text,Image ,TouchableOpacity, StatusBar, AsyncStorage} from 'react-native'
import {connect} from "react-redux"
import {Styles} from "./Style/_VerificationStyle"
import {Button,Input} from "@ui-kitten/components"
import {images,theme} from "../../constants"
import * as actions from "../../redux/actions/_ForgotPassword"
const {icons}=images



    const VerificationCode = (props) => {
        const {navigation}=props
        const [code,setCode]=useState("")
            
        const renderInputField=()=>{
            return(
                <View style={Styles.inputView}>
                <Input onChangeText={(code)=>setCode(code)} value={code} label="Enter Verification Code" style={Styles.inputBox} textStyle={{color:theme.colors.black}}  />
                </View>
            )
        }


        const resendRequest=()=>{
            AsyncStorage.getItem("forgotemail").then(email=>{
                
                props.forgotPassword(email)
            });
            
        }

        const saveCode=()=>{
            navigation.navigate('NewPassword', {code})
        }



    return (
        <View style={Styles.mainContainer}>
            <View>
            <Text style={Styles.heading}>We just send you a verification code</Text>
            <Text style={Styles.info}>We just send  a verification code to your email. If you don't see our email in your inbox
                check your spam folder.
            </Text>
            </View>
            <View>
                {renderInputField()}
            </View>
            <View styles={Styles.buttonContainer}>
                <Button onPress={saveCode} style={Styles.button}>Submit</Button>
            </View>
            <View style={Styles.resendContainer}>
                <Text style={Styles.text}>Didn't receive the code? </Text>
                <TouchableOpacity onPress={resendRequest}>
                <Text style={Styles.resendText}>Resend</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const mapDispatchToProps=(dispatch)=>{
    return{
        forgotPassword:(email)=>dispatch(actions.forgotPassword(email))
    }
}

const mapStateToProps=(state)=>{
    return{
        loading:state.LoadingReducer.loading,
        data:state.ForgotPasswordReducer.data,
        error:state.ForgotPasswordReducer.error
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(VerificationCode) 
