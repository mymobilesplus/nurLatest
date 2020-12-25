import {theme} from "../../../constants"
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from "react-native-responsive-screen"
import {StyleSheet} from "react-native"
const height=hp('100%')
const width=wp('100%')

export const Styles =StyleSheet.create({
    mainContainer:{
        flex:1,
        padding:20,
        alignItems:"center"
    },
    heading:{
        fontFamily:"OpenSans-ExtraBold",
        fontSize:wp('5.5%'),
        textAlign:"center"
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
    }
})