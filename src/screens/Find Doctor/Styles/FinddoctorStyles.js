import {theme} from "../../../constants"
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from "react-native-responsive-screen"
import {StyleSheet} from "react-native"
const height=hp('100%')
const width=wp('100%')

export const Styles =StyleSheet.create({



    mainContainer:{
        flex:0,
        height:hp('100%'),
        paddingVertical:wp('4%'),
        paddingHorizontal:wp('5%'),
        // backgroundColor:theme.colors.white,
    },
    card1:{
        flex:0.
    },
    cardImage:{
        resizeMode:"contain",
        // height:wp('18%'),
        // width:wp("18%"),
        height:80,
        width:80,
        borderRadius:40, 
        // alignSelf: 'center',
        // borderColor:theme.colors.primary,
        // borderWidth:10,
        // borderRadius:wp("9%")
    },
    title:{
    //    fontFamily:"OpenSans-Bold",
        fontSize:12,
        color:"#020202",
        textAlign:'center',

    },
})