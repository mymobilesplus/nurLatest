import {theme} from "../../../constants"
import {widthPercentageToDP,heightPercentageToDP} from "react-native-responsive-screen"

import {StyleSheet} from "react-native"
const height=heightPercentageToDP('100%')
const width=widthPercentageToDP('100%')

export const Styles =StyleSheet.create({
   imageBackground: {
        flex:0,
        resizeMode:"stretch",
        height,
        width
        
   },
   sliderContainer: {
       flex:0,
       height,
       width,
       justifyContent:"space-around",
       padding:20,
   },
   logoContainer:{
       alignItems:"center",
       height:heightPercentageToDP('50%')
   },
   pagination: {
        position:"absolute",
        bottom:10,
        top:0,
        left:0,
        right:0,
       justifyContent:"flex-end",
       alignItems:"center",
       width:width,
       paddingHorizontal:widthPercentageToDP('5%'),
   },
  
   textContainer:{
    alignItems:"center",
    justifyContent:"flex-end",
    paddingBottom:'50%',
    flex:1,
   },
   sliderText:{
       color:"#FFFFFF",
       fontSize:25,
    //    fontFamily:"OpenSans-SemiBold",
    marginBottom:heightPercentageToDP("5%"),
       fontFamily:"AvenirNextCondensed-Medium",
       textAlign:"center"
   },
   button:{
       width,
       paddingHorizontal:widthPercentageToDP('4%'),
       paddingBottom:widthPercentageToDP('4%')
   },
   buttons:{
       backgroundColor:"rgba(0,0,0,0.3)"
   },
   logo:{
        // resizeMode: 'contain',
        height:130,
        width:157
   }
})