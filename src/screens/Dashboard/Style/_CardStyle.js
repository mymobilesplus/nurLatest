import {theme} from "../../../constants"
import {StyleSheet} from "react-native"

import {widthPercentageToDP as wp,heightPercentageToDP as hp} from "react-native-responsive-screen"
const height=hp('100%')
const width=wp('100%')

export const Styles =StyleSheet.create({
    mainContainer:{
        flex:1,
    },
    firstRow:{
        flexDirection:"row",
        overflow:"hidden",
        alignItems:'center',
        justifyContent:'center',
        width:wp('100%')
    },
    card1:{
        flex:0,
        height:hp('21%'),
        width:wp('45%'),
        justifyContent:"center",
        alignItems:"center",
        margin:4,
        backgroundColor:theme.colors.white,
        borderRadius:10,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: .3,
        shadowRadius: 3,
        elevation: 5,

    },
    cardImage:{
        resizeMode:"contain",
        height:wp('18%'),
        width:wp("18%"),
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: .3,
        shadowRadius: 3,
        elevation: 5,
    },
    title:{
        fontFamily:"OpenSansCondensed-Light",
        fontWeight:'bold',
        fontSize:wp('3.5%'),
        color:'#000'
    }
})