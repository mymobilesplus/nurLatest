import React,{useEffect} from 'react'
import { View, Text,Image,StyleSheet,StatusBar,TouchableOpacity } from 'react-native'
import {images,theme} from "../../constants"
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen"
import LinearGradient from "react-native-linear-gradient"
import * as RootNavigation from "../../navigation/RootNavigation"
import Icon from "react-native-vector-icons/EvilIcons"
const {icons,logo}=images

export default function DashboardStackHeader(props) {

    // useEffect(()=>{
    //     console.log("Header Props: ",props)
    // })
    console.warn(props.navigation)       
    return (
        <>
        <StatusBar backgroundColor={theme.colors.primary} barStyle="light-content" />
        <View style={styles.container}>
        <LinearGradient style={styles.mainContainer} colors={[theme.colors.primary,"#3BBFE3"]}   start={{x: 0.0, y: 0}} end={{x: 1.8, y:1.0}}>
            <View style={styles.leftContainer}>
                <Text style={styles.title} >{props.title}</Text>
            </View>
            <View>
                <TouchableOpacity onPress={()=>props.navigation.goBack()}>
                    <Icon name="close" size={30} color={theme.colors.white} />
                </TouchableOpacity>
            </View>
        </LinearGradient>
        </View>
       
        </>
    )
}



const styles = StyleSheet.create({
    container:{
        width:wp('100%'),
        height:wp('16%'),
        overflow:'hidden'
    },
    mainContainer: {
        flex:1,
        backgroundColor:theme.colors.primary,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems: "center",
        paddingHorizontal:wp('4%'),
        paddingVertical:wp('3%'),
    },

    backIcon:{
        resizeMode:"contain",
        height:wp('9%'),
        width:wp('9%')
    },
    leftContainer:{
        flexDirection:"row",
        alignItems:"center"
    },
    title:{
        color:theme.colors.white,
        fontFamily:"OpenSans-Bold",
        fontSize:wp('5%'),
        paddingLeft:wp('3%')
    }


})