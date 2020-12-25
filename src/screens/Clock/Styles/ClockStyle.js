import {theme} from "../../../constants"
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from "react-native-responsive-screen"
import {StyleSheet} from "react-native"
const height=hp('100%')
const width=wp('100%')



export const Styles=StyleSheet.create({

    mainContainer:{
        flex:1,
        marginVertical:20,
        marginBottom:50,
        width:wp('100%'),
        // backgroundColor:theme.colors.white
    },
addNewMemberContainer:{
    flex:0,
    height:hp('30%'),
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
    height:hp('10%'),
    width:wp('15%'),
    backgroundColor:theme.colors.background,
    margin:10,
    
},
memberName:{
    fontSize:wp('4%'),
    fontFamily:"OpenSans-Regular",
    color:theme.colors.dark,
    paddingLeft:wp('4%')
},
heartContainer:{
    textAlign:'center',
    alignSelf:'center'
 },
heart: {
    alignSelf: 'center',
    width: 200, 
    height: 200, 
},

})