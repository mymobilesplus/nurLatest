import {theme} from "../../../constants"
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from "react-native-responsive-screen"
import {StyleSheet} from "react-native"
const height=hp('100%')
const width=wp('100%')

export const Styles =StyleSheet.create({

mainContainer:{
    flex:1,
    paddingVertical:wp('4%'),
    paddingHorizontal:wp('5%'),
    backgroundColor:theme.colors.white,
    justifyContent:"space-between"
},
headerContainer:{
    flexDirection:"row",
    justifyContent:"flex-end",
},
mainHeading:{
    fontFamily:"OpenSans-ExtraBold",
    fontSize:wp('5.3%'),
    color:theme.colors.black
},
skip:{
    fontFamily:"OpenSans-Regular",
    fontSize:wp('4%'),
},
circle:{
    flex:0,
    width:wp('70%'),
    height:wp('70%'),
    borderRadius:wp('35%'),
    backgroundColor:theme.colors.background,
    alignItems:"center",
    justifyContent:"center"
},
photoContainer:{
    marginTop:hp('5%'),
    alignItems:"center"
}
})