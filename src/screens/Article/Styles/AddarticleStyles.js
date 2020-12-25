import {theme} from "../../../constants"
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from "react-native-responsive-screen"
import {StyleSheet} from "react-native"
const height=hp('100%')
const width=wp('100%')

export const Styles =StyleSheet.create({

mainContainer:{
    flex:1,
    backgroundColor:theme.colors.white,
    justifyContent:"space-between",
    flexDirection:"column"
},
topContainer:{
    padding:wp('4%'),

},
inputBox:{
    backgroundColor:theme.colors.white
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
      width:wp('50%'),
      borderRadius:0
  },
  file:{
      resizeMode:"cover",
      width:wp('20%'),
      height:wp('20%')
  },
  container: {
    alignItems: 'flex-start',
    padding:10,
 },
 modal: {
    alignItems: 'flex-start',
    height:200, 
    width:200,
    marginTop:200,
    flex:0.5
 },
 mainHeading:{
    fontFamily:"OpenSans-ExtraBold",
    color:theme.colors.white,
    fontSize:20,
    marginTop:10,
    marginBottom:10,
},
 text: {
    color: '#000',
    borderBottomWidth:1,
    borderBottomColor:'#ccc',
    padding:10,
 },
 text1: {
    color: '#000',
    justifyContent:'center'
 },
    
})