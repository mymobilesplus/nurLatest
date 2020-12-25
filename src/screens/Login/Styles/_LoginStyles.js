import {theme} from "../../../constants"
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from "react-native-responsive-screen"
import {StyleSheet} from "react-native"
const height=hp('100%')
const width=wp('100%')

export const Styles =StyleSheet.create({
    mainContainer:{
        flex:1,
        padding:20,
        justifyContent:"space-between",
        alignItems:"center",
        backgroundColor:theme.colors.white

    },
    heading:{
        fontFamily:"OpenSans-ExtraBold",
        fontSize:wp('5.5%'),
        textAlign:"center"
    },
    headingContainer:{
    paddingHorizontal:20
    },
    buttonContainer:{
        width,
        padding:20
    },
    fbIcon:{
        resizeMode:"contain",
        height:wp('6%'),
        width:wp('6%'),
    },
    fbButton:{
        borderColor:"grey"
    },
    singleButton: {
        paddingVertical:wp('3%')
    },
    inputBox:{
        backgroundColor:theme.colors.white,
    },
    inputView:{
        paddingVertical:hp('1%')
    },
    // secondarContainer:{
    //     width
    // }

    buttonContainer:{
        width,
        paddingHorizontal:20
    },
    forgetPassword:{
        color:theme.colors.primary,
        fontFamily:"OpenSans-SemiBold"
    },
    indicator: {
        justifyContent: 'center',
        alignItems: 'center',
      },

      buttonText:{
          fontFamily:"OpenSans-SemiBold",
          fontSize:wp('4.5%'),
          color:theme.colors.white
      },

      error:{
          color:theme.colors.danger,
          fontSize:wp('2.8%'),
          fontFamily:"OpenSans-Regular"
      }
})