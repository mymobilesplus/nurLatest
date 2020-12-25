import {theme} from "../../../constants"
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from "react-native-responsive-screen"
import {StyleSheet} from "react-native"
const width=wp('100%')



export const Styles=StyleSheet.create({

    mainContainer:{
        flex:0,
        height:hp('100%'),
        marginTop:20,
        width:wp('100%')
    },
addNewMemberContainer:{
    flex:0,
    height:hp('10%'),
    justifyContent:"center",
    alignItems:"center"
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
    backgroundColor:theme.colors.white,
    marginTop:10,
    marginBottom:10,
    flexDirection:"row",
    alignItems:"flex-start",
},
avatar:{
    flex:0,
    height:60,
    width:60,
    backgroundColor:'#aaa',
    borderRadius:30
    
},
memberName:{
    fontSize:wp('4%'),
    fontFamily:"OpenSans-Regular",
    fontWeight:'bold',
    color:theme.colors.dark,
    paddingLeft:wp('4%')
},
memberContact:{
    fontSize:wp('4%'),
    fontFamily:"OpenSans-Regular",
    color:theme.colors.dark,
    paddingLeft:wp('4%')
}

})