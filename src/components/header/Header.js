import React from 'react'
import { StyleSheet, Text, View,Image,StatusBar,TouchableOpacity} from 'react-native'
import {images,theme} from "../../constants"
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen"
import MaterialCommunityIcons  from "react-native-vector-icons/MaterialCommunityIcons"
import { Icon } from 'native-base'
const {icons,logo}=images

const Header = (props) => {
    // console.warn("count",props.remindersCount)
    return (
        <View style={styles.mainContainer}>
                  <StatusBar backgroundColor={theme.colors.background} barStyle="dark-content" />

            <View style={styles.logoContainer} >
                <TouchableOpacity onPress={()=> props.navigation.navigate("Home")} >
                    <Image source={logo.logo}  style={styles.logo}  />
                </TouchableOpacity>
            </View>

            <View style={styles.iconContainer}>

            <View style={{width:30,height:30}}>
                <Icon onPress={()=>{props.navigation.navigate('notification')}} name="bell" type="FontAwesome" style={[{fontSize: 26,color:"#596377"}]} /> 
                {props.notificationsCount > 0 &&
                    <View style={{position:"absolute", right:0, backgroundColor:"#DB3872",height:15,width:15, alignItems:"center", borderRadius:5}}>
                        <Text style={{fontSize: 10}}>{props.notificationsCount}</Text>
                    </View>
                }
               </View>

               <View style={{width:30,height:30}}>
                <Icon onPress={()=>{props.navigation.navigate('clock')}} name="clock-o" type="FontAwesome" style={{fontSize: 26, color:"#596377"}} /> 
                {props.remindersCount >0 && 
                <View style={{position:"absolute", right:0, backgroundColor:"#DB3872",height:15,width:15, alignItems:"center", borderRadius:5}}>
                    <Text style={{fontSize: 10}}>{props.remindersCount}</Text>
                </View>
                }
               </View>
              
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({

mainContainer:{
    flex:0.4,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    paddingHorizontal:wp('4%'),
},
logo:{
    resizeMode:"contain",
    height:wp('20%'),
    width:wp('20%')
},
logoContainer: {
    flex:0,
    width:wp('60%'),
},
iconContainer:{
    flex:0,
    width:wp('38%'),
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
    paddingHorizontal:wp('8%')

}


})



