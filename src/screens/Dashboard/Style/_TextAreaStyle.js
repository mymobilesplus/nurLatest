import {theme} from "../../../constants"
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from "react-native-responsive-screen"
import {StyleSheet} from "react-native"
const height=hp('100%')
const width=wp('100%')

export const Styles =StyleSheet.create({
    mainContainer:{
        flex:1,
    },
    textArea:{
        height:hp('100%'),
        borderTopLeftRadius:8,
        borderTopRightRadius:8,
        backgroundColor:"white",
    },
    inputBox:{
        backgroundColor:theme.colors.white,
        borderWidth:0,
        justifyContent: 'flex-start',
        borderColor:theme.colors.white,
        width: '80%',
        // height: hp('100%')
    },
    text:{
        fontSize:20,
        color:"#020202",
        fontFamily: "OpenSans-SemiBold",
        padding:15
    },
    addPhoto:{
        resizeMode:"contain",
        width:wp('20%'),
        height:wp('20%'),
        marginVertical:15
    },
    buttonContainer:{
        flexDirection:"row",
        width:wp('100%'),
        justifyContent: 'space-between',
        position:"absolute",
        bottom:45,
    },
    buttonForm: {
      color: theme.colors.grey,
      width: wp('50%'),
      borderRadius: 0,
      borderWidth: 0,
    },
})