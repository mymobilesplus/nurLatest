import {theme} from "../../../constants"
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from "react-native-responsive-screen"
import {StyleSheet} from "react-native"
const height=hp('100%')
const width=wp('100%')



export const Styles=StyleSheet.create({

    mainContainer:{
        flex:0,
        height:hp('70%'),
        marginTop:20,
        width:wp('100%'),
        justifyContent: 'center'
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
    flexDirection:"row",
    alignItems:"flex-start",
    borderBottomWidth: 1,
    padding: 20,
    borderBottomColor: '#999'
},
avatar:{
    flex:0,
    height:hp('10%'),
    width:wp('15%'),
    backgroundColor:theme.colors.background,
    margin:10,
    
},
title:{
    fontSize:wp('5%'),
    fontFamily:"OpenSans-Bold",
    color:theme.colors.dark,
    paddingLeft:wp('4%')
},
body:{
    fontSize:wp('4%'),
    fontFamily:"OpenSans-Regular",
    color:theme.colors.dark,
    paddingLeft:wp('4%')
},

emptyText:{
    fontSize:wp('5%'),
    fontFamily:"OpenSans-Bold",
    color:theme.colors.dark,
    paddingLeft:wp('4%'),
    textAlign: 'center'
}

})