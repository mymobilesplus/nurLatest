import React,{useState} from 'react'
import {View,Text,StyleSheet,TouchableOpacity} from "react-native"
import Modal from 'react-native-modal';
import {theme} from "../../constants"
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from "react-native-responsive-screen"
const height=hp('100%')
const width=wp('100%')


export const LifeTimeModal=(props)=>{
    const[visible,setVisible]=useState(true)

    return(
        <View style={styles.container}>
            <Modal isVisible={visible} >
                <View style={styles.modal}>
                    <View>
                    <Text style={styles.heading}>Disclaimer</Text>
                      <Text style={styles.text}>Nurse Nova is designed as a personal tool for patients to archive their medical records, keep track of their symptoms, set medical reminders, search for doctors and participate in the app’s community to share and read articles and opinions. The content of Nurse Nova (including text, images, information) is not intended to be a substitute for professional medical advice, diagnosis, and/or treatment. Always seek the advice of your doctor/physician or other qualified health provider with any questions or concern you may have regarding a medical condition.
                     </Text>
                    </View>
                    <View style={styles.okContainer}>
                        <TouchableOpacity onPress={
                            ()=>
                            {
                            
                            props.setShow(false);
                        }}
                            >
                        <Text style={styles.ok}>OK</Text>

                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )


}




const styles=StyleSheet.create(
    { 
        container:{

            flex:1,
            justifyContent:"center",
            alignItems:"center"
        },
        modal:{
            flex:0,
            position:"absolute",
            top:50,
            backgroundColor:"#FFFFFF",
            borderRadius:3,
            padding:20,
            justifyContent:"space-between"
        },
        heading:{
            fontSize:20,
            fontWeight:"bold"
        },
        text:{
            paddingTop:wp('3%'),
            lineHeight:22,
        },
        okContainer:{
            justifyContent:"flex-end",
            alignItems:"flex-end",
            paddingHorizontal:wp('4%')
        },
        ok:{
            color:theme.colors.green,
            fontFamily:"OpenSans-SemiBold",
        }
    
    
    }
)