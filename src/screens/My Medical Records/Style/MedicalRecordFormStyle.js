import {theme} from "../../../constants"
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from "react-native-responsive-screen"
import {StyleSheet} from "react-native"
const height=hp('100%')
const width=wp('100%')

export const Styles =StyleSheet.create({

mainContainer:{
    flex: 1,
    paddingVertical:0,
    padding: wp('3%'),
    backgroundColor: theme.colors.white,
    justifyContent: 'space-between',
},
topContainer:{
    padding:wp('4%'),
    height:hp("90%")
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
    marginRight:wp('3%'),

  },
buttonContainer:{
    flexDirection:"row",
    width:wp('100%'),
    justifyContent: 'space-between',
    position:"absolute",
    bottom:0
},
button: {
  color: theme.colors.white,
  width: wp('50%'),
  borderRadius: 0,
  borderWidth: 0,
},
  file:{
      resizeMode:"cover",
      width:wp('20%'),
      height:wp('20%'),
  }
    
})