import {theme} from "../../../constants"
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from "react-native-responsive-screen"
import {StyleSheet} from "react-native"
const height=hp('100%')
const width=wp('100%')



export const Styles=StyleSheet.create({

mainContainer:{
    flex:1,
    backgroundColor:'whitesmoke'
},
addNewMemberContainer:{
    flex:0,
    height:hp('20%'),
    width:'100%',
    justifyContent:"center",
    alignItems:"center"
},
topText:{
    fontSize:18,
    color:"#020202",
    paddingBottom:wp('1%'),
    fontWeight:'500',
    textAlign:"left"
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
    borderTopWidth:1,
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
    fontSize:wp('5%'),
    fontFamily:"OpenSansCondensed-Light", 
    color:theme.colors.dark,
    marginLeft:10
},
inputBox: {
    width: '100%',
    backgroundColor: 'transparent',
    borderColor: 'transparent'
}

})