import {theme} from "../../../../constants"
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from "react-native-responsive-screen"
import {StyleSheet} from "react-native"
const height=hp('100%')
const width=wp('100%')

export const Styles =StyleSheet.create({
mainContainer:{
    backgroundColor:theme.colors.background,
    flex:0,
    justifyContent:"flex-start"

},
mainHeading:{
    fontSize:22,
    fontWeight:"bold",
},

backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
},
heartContainer:{
    marginTop:120,
    flex:0,
    height:hp('30%'),
    justifyContent:"center",
    alignItems:"center"
},

heart:{
    resizeMode:"contain",
    height:wp('40%'),
    width:wp('40%')
},

text:{
    fontFamily:"OpenSans-Regular",
    fontSize:wp('4.5%')
},
floatingButton:{
    flex:0,
    height:hp('70%'),
    justifyContent:"center",
    alignItems:"flex-end"
},
addButtonContainer:{
    flex:0,
    height:hp('60%'),
    margin:wp('5%'),
    marginBottom:61,
    justifyContent:"flex-end",
    alignItems:"flex-end",
    position: 'absolute',
    right: 10,
    bottom: 10
},
button:{
    borderRadius:100,
    width:73,
    height:73,
    backgroundColor:theme.colors.white,
    borderColor:theme.colors.white,
    elevation:4,
},
description:{
    fontFamily:"OpenSans-SemiBold",
    fontSize:20,
    color:"#020202",
    padding:20
},
descriptionContainer:{
    flex:1,
    flexGrow:0.93,
},
recordContainer:{
    flex:0,
    minHeight:hp("10%"),
    maxHeight:hp('100%'),
    overflow:"hidden",
    backgroundColor:theme.colors.white,
    padding:wp('2%'),
    borderTopWidth:1,
    borderTopColor:theme.colors.grey,
    justifyContent:"space-between"
},
buttonContainer:{
    flexDirection:"row",
    width:wp('100%')
},
buttonForm:{
    width:wp('95%'),
    borderRadius:0
},
})