import {theme} from "../../../constants"
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from "react-native-responsive-screen"
import {StyleSheet} from "react-native"
const height=hp('100%')
const width=wp('100%')

export const Styles =StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor:'#f5f5f5', 
        paddingHorizontal:wp('9%'),
     //   paddingVertical:wp('1%'),
        paddingTop:60, 
        justifyContent:'center',
        //backgroundColor:'red',
        justifyContent:'flex-start'
    },

    optionTexts: {
        color:theme.colors.black,
        fontFamily:'OpenSansCondensed-Bold', 
        fontSize:wp('4%'),
   //     fontWeight:'bold'

    }
})