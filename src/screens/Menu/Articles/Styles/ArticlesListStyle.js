import {theme} from "../../../../constants"
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from "react-native-responsive-screen"
import {StyleSheet} from "react-native"
const height=hp('100%')
const width=wp('100%')



export const Styles=StyleSheet.create({

mainContainer:{
    flex:1,
    backgroundColor:theme.colors.white
},
addNewMemberContainer:{
    flex:0,
    height:hp('8%'),
    justifyContent:"center",
    alignItems:"center"
},
addPhoto:{
    resizeMode: 'cover',
    width: wp('23%'),
    height: wp('23%'),
},
topText:{
    fontFamily:"OpenSans-SemiBold",
    fontSize:wp('4.5%'),
    color:theme.colors.black,
    paddingBottom:wp('3%'),
    textAlign:"center"
},
button:{
    borderRadius:25, 
    marginBottom:20
},
memberContainer:{
    flex:1,
},
memberBox:{
    borderTopColor:theme.colors.dark,
    // borderTopWidth:1,
    backgroundColor:theme.colors.white,
    paddingHorizontal:wp('5%'),
    paddingVertical:wp('4%'),
    flexDirection:"row",
    alignItems:"center"
},
avatar:{
    flex:0,
    height:hp('7%'),
    width:wp('15%'),
    backgroundColor:theme.colors.background,
    borderRadius:100
},
memberName:{
    fontSize:wp('4%'),
    fontFamily:"OpenSans-Regular",
    color:theme.colors.dark,
    paddingLeft:wp('4%')
},
Name:{
    fontSize:wp('5%'),
    fontFamily:"OpenSans-Regular",
    color:'#000000',
    paddingLeft:wp('4%')
},
heartContainer:{
    flex:0,
    height:hp('30%'),
    justifyContent:"flex-end",
    alignItems:"center"
},

heart:{
    resizeMode:"contain",
    height:wp('40%'),
    width:wp('40%')
},
topicTitleContainer: {
    backgroundColor: "#f1f1f1", 
    height:20, 
    flex: 0, 
    flexWrap: "wrap", 
    justifyContent:'center',
},

topicTitle: {
    color:theme.colors.green, 
    textAlign: 'center',
    fontSize: 16
},
})