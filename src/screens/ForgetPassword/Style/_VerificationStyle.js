import {theme} from "../../../constants"
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from "react-native-responsive-screen"
import {StyleSheet} from "react-native"
const height=hp('100%')
const width=wp('100%')

export const Styles =StyleSheet.create({
    mainContainer:{
        backgroundColor:theme.colors.white,
        flex:1,
        paddingVertical:20,
        paddingHorizontal:15,
    } ,
     heading:{
        fontFamily:"OpenSans-ExtraBold",
        fontSize:wp('4.8%'),
        letterSpacing:0,
        color:theme.colors.black
    },
    info:{
        fontFamily:"OpenSans-SemiBold",
        fontSize:wp("3.2%"),
        color:theme.colors.grey
    },
    inputBox:{
        backgroundColor:theme.colors.white
    },
    inputView:{
        paddingTop:hp('2%')
    },
    buttonContainer:{
        flex:0,
        width:wp('40%'),
        marginVertical:hp('5%')
    },
    button:{
        width:wp('40%'),
        marginTop:hp('5%')

    },
    resendContainer:{
        flexDirection:"row",
        paddingTop:hp('4%')
    },
    text:{
        fontFamily:"OpenSans-Regular",
        color:theme.colors.black
    },
    resendText:{
        fontFamily:"OpenSans-Regular",
        color:theme.colors.primary
    }
})