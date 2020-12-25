import React,{useState} from 'react'
import { View, Text,Image ,TouchableOpacity} from 'react-native'
import {connect} from "react-redux"
import {Styles} from "./Style/_NewStyle"
import {Button,Input} from "@ui-kitten/components"
import {images,theme} from "../../constants"
import * as actions from "../../redux/actions/_ResetPassword"
const {icons,loader}=images


const NewPassword = (props) => {
    const [newpass,setnewPassword]=useState("")
    const [confirmpass,setconfirmPassword]=useState("")
    const [formData,setFormData]=React.useState({})

    const [loading,setLoading]=useState(false)

    const LoadingIndicator = (props) => (
        <View style={ Styles.indicator}>
         <Image source={loader.white} style={{resizeMode:"contain",width:80,height:20}} />
         {/* <Spinner size="small"  /> */}
        </View>
      );


    const renderInputField=()=>{
        return(
            <View>
                 <View style={Styles.inputView}>
                <Input secureTextEntry onChangeText={(newpass)=>setnewPassword(newpass)} label="New Password"  style={Styles.inputBox}  textStyle={{color:theme.colors.black}}  />
                </View>

                <View style={Styles.inputView}>
                <Input secureTextEntry onChangeText={(confirm)=>setconfirmPassword(confirm)} label="Confirm Password"  style={Styles.inputBox}  textStyle={{color:theme.colors.black}}  />
                </View>
            </View>
          
        )
    }


    const handleSubmit=()=>{
        setLoading(true);
        console.log(props);
        setFormData({
            NewPassword:newpass,
            ConfirmNewPassword:confirmpass,
            ResetCode: props.route.params.code
          // GenderSD:genderData[selectedIndex.row]
        }),
        console.log("Form Data: ",formData)
        if(formData.NewPassword != null)
            props.resetPassword(formData)
    }


    return (
        <View style={Styles.mainContainer}>
            <Text style={Styles.heading}>Create a new password</Text>
            <View>
                {renderInputField()}
            </View>
            <View styles={Styles.buttonContainer}>
                <Button 
                 accessoryLeft={()=>loading?LoadingIndicator():null} 
                 onPress={handleSubmit} 
                style={Styles.button} 
                children={()=><Text style={Styles.buttonText}>{!loading?"Reset":""}</Text>}
                />
            </View>
        </View>
    )
}

const mapStateToProps=(state)=>{
    console.log(state);
    return{
        loading:state.LoadingReducer.loading,
        data:state.ResetPasswordReducer.data,
        error:state.ResetPasswordReducer.error
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        resetPassword:(formdata)=>dispatch(actions.resetPassword(formdata))
    }
}




export default connect(mapStateToProps,mapDispatchToProps)(NewPassword) 
