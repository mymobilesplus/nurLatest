import {theme} from "../../../constants"
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from "react-native-responsive-screen"
import {StyleSheet} from "react-native"
const height=hp('100%')
const width=wp('100%')

export const Styles =StyleSheet.create({


mainContainer:{
    flex:0,
    height:hp('100%'),
    marginTop:0,
    width:wp('100%')
},
slider:{
    flex:0,
    height:hp('14.5%'),
    paddingLeft:0,
    marginLeft:0  
},
cards:{
    flex:0,
    height:hp('45%'),
    
    /* shadowOffset: { width: 0, height: 0 },
    shadowOpacity: .3,
    shadowRadius: 3,
    elevation: 5, */

},
addPhoto:{
    resizeMode:"contain",
    width:wp('20%'),
    height:wp('20%'),
    alignSelf: 'flex-end',
    bottom: 0,
    
},
text:{
    fontSize:wp('3.8%'),
    color:theme.colors.black,
    fontFamily: "OpenSans-SemiBold",
    paddingVertical:10
},
textArea:{
    flex:0,
    height:hp('14%'),
   /*  shadowOffset: { width: 0, height: 0 },
    shadowOpacity: .3,
    shadowRadius: 3,
    elevation: 5, */
},
textContainer:{
    flex:1,
    paddingHorizontal:10,
  //  elevation: 2,
  /*   shadowOffset: { width: 0, height: 0 },
    shadowOpacity: .3,
    shadowRadius: 3,
     */
},


})