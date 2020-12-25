import {theme} from "../../../../constants"
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from "react-native-responsive-screen"
import {StyleSheet} from "react-native"
const height=hp('100%')
const width=wp('100%')



export const Styles=StyleSheet.create({

mainContainer:{
    flex:1,
    // backgroundColor:theme.colors.background
    backgroundColor:'#f5f5f5'
},
addNewMemberContainer:{
    flex:0,
    height:hp('28%'),
  //  justifyContent:"center",
    alignItems:"center"
},
topText:{
    fontFamily:"OpenSans-SemiBold",
    fontSize:wp('4.5%'),
    lineHeight:27,
    color:theme.colors.black,
    paddingBottom:wp('3%'),
    textAlign:"center"
},
button:{
    borderRadius:25, 
    marginBottom:20,
    //backgroundColor:'green'
},
memberContainer:{
    flex:1 ,
    marginTop:50
    //backgroundColor:'green'
},

memberBox:{
   // borderTopColor:theme.colors.dark,
   // borderTopWidth:1,
    marginBottom:2,
    backgroundColor:theme.colors.white,
    paddingHorizontal:wp('5%'),
    paddingVertical:wp('4%'),
    flexDirection:"row",
    alignItems:"center"
},
avatar:{
    flex:0,
    height:wp('15%'),
    width:wp('15%'),
    backgroundColor:theme.colors.background,
    borderRadius:100
},
memberName:{
    fontSize:wp('4%'),
    fontFamily:"OpenSansCondensed-Regular",
    color:theme.colors.dark,
    paddingLeft:wp('4%')
},
giveAccess: {
    fontSize:wp('4%'),
    fontFamily:"OpenSansCondensed-Regular",
    paddingLeft:wp('4%'),
    color:"#146ECB",
    // margin:10,
    position:"absolute",
    right:0,
},
select: {
    flex: 1,
    margin: 2,
    backgroundColor:theme.colors.white,
    color:theme.colors.black
  },
  fieldContainer:{
      paddingVertical:wp('2%')
  },
  addFileContainer:{
      flex:0,
      width:wp('20%'),
      height:wp('20%'),
      paddingVertical:wp('6%'),
      paddingHorizontal:wp('6%'),
        borderColor:theme.colors.background,
    borderWidth:2,
        borderRadius:5,
        justifyContent:"center",
        alignItems:"center",
        marginTop:wp('2%'),
        marginRight:wp('3%')

  },
  buttonContainer:{
      flexDirection:"row",
      width:wp('100%')
  },
  button:{
      width:wp('60%'),
      borderRadius:40,
      marginBottom:20
  },
  file:{
      resizeMode:"cover",
      width:wp('20%'),
      height:wp('20%')
  }
})