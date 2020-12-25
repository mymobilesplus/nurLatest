import {theme} from "../../../constants"
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from "react-native-responsive-screen"
import {StyleSheet} from "react-native"
const height=hp('100%')
const width=wp('100%')

export const Styles =StyleSheet.create({



    mainContainer:{
        flex:0,
        height:hp('100%'),
        paddingVertical:wp('4%'),
        paddingHorizontal:wp('5%'),
        backgroundColor:theme.colors.white,
        justifyContent:"space-between"
    },
    headingContainer:{
        alignItems:"center"
    },
    addPhotoContainer:{
        justifyContent:"center",
        alignItems:"center"
    },
    addPhoto:{
        resizeMode:"contain",
        width:wp('20%'),
        height:wp('20%')
    },
    mainHeading:{
        fontFamily:"OpenSans-ExtraBold",
        color:theme.colors.black,
        fontSize:20,
        marginTop:10,
        marginBottom:10,
    },
    inputBox:{
        backgroundColor:theme.colors.white,
    },
    dobContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        paddingVertical:10,
        // flex:1
    },
    dob1:{
        flexGrow:0.2
    },
    dob2:{
        flexGrow:0.3
    },
    dob3:{
        flexGrow:0.4
    },
    dobText:{
        fontFamily:"OpenSans-Bold",
        fontSize:wp('3.4%'),
        color:theme.colors.grey
    },
    phoneContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        paddingVertical:10,
    },
    phone1:{
        flexGrow:0.3
    },
    phone2:{
        flexGrow:0.6
    },
    nameContainer:{
        flexDirection:"row",
        justifyContent:"space-between"
    },
    firstNameContainer: {
        flexGrow:0.48
    },
    lastNameContainer:{
        flexGrow:0.48
    },
    indicator: {
        justifyContent: 'center',
        alignItems: 'center',
      },

      error:{
        color:theme.colors.danger,
        fontSize:wp('2.8%'),
        fontFamily:"OpenSans-Regular"
    },
    
    buttonText:{
        fontFamily:"OpenSans-SemiBold",
        fontSize:wp('4.5%'),
        color:theme.colors.white
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