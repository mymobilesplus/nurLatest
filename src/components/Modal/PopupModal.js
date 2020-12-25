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
                      <Text style={styles.text}>China is getting ready to celebrate its new year, kicking off the planet's largest human
                    migration.As hundreds of millions of people prepare to travel amid hightened fears and lockdowns due
                    to an outbreak of the coronavirus.
                     </Text>
                    </View>
                    <View style={styles.okContainer}>
                        <TouchableOpacity onPress={()=>setVisible(false)}>
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
            height:hp('35%'),
            backgroundColor:"#FFFFFF",
            borderRadius:3,
            padding:wp('4%'),
            justifyContent:"space-between"
        },
        heading:{
            fontSize:wp('4%'),
            fontFamily:"OpenSans-SemiBold",
        },
        text:{
            paddingTop:wp('5%'),
            fontFamily:"OpenSans-Regular"
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