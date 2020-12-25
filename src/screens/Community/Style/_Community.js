import {theme} from "../../../constants"
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from "react-native-responsive-screen"
import {StyleSheet} from "react-native"
const height=hp('100%')
const width=wp('100%')

export const Styles =StyleSheet.create({

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
    removeButtonContainer:{
        flex:0,
        margin:wp('5%'),
        position: 'absolute',
        marginBottom:61,
        bottom: 10,
        alignSelf:"center"
    },

    clearSelectionContainer:{
        flex:0,
        margin:wp('5%'),
        position: 'absolute',
        marginBottom:61,
        top: 10,
        right: 10,
        alignSelf:"center"
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

    button:{
        borderRadius:100,
        width:73,
        height:73,
        backgroundColor:theme.colors.white,
        borderColor:theme.colors.white,
        elevation:4,
    },

    mainContainer:{
        flex: 0,
        height: hp('90%'),
        paddingVertical: wp('4%'),
        paddingLeft: 25,
        paddingRight: 24,
        backgroundColor: theme.colors.white,
        justifyContent: 'space-between',
    },
    mainContainer1:{
        flex:0,
        height:hp('3%'),
        width:hp('30%'),
       paddingVertical:wp('4%'),
        paddingHorizontal:wp('5%'),
        backgroundColor:theme.colors.white,
        justifyContent:"space-between",
        borderRadius:4
    },
    headingContainer:{
        alignItems:"center"
    },
    addPhotoContainer:{
        justifyContent:"center",
        alignItems:"center"
    },
    addPhoto:{
        resizeMode: 'cover',
        width: wp('23%'),
        height: wp('23%'),
    },
    mainHeading:{
        fontFamily:"OpenSans-ExtraBold",
        color:theme.colors.black,
        fontSize:20,
        marginTop:10,
        marginBottom:10,
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
     heartContainer:{
        textAlign:'center',
        alignSelf:'center'
     },
     heart: {
         alignSelf: 'center'
     },
     text: {
        color: '#000',
        borderBottomWidth:1,
        borderBottomColor:'#ccc',
        padding:10,
        textAlign:'center'
     },
     text1: {
        color: '#000',
        justifyContent:'center'
     },
     inputBox:{
        backgroundColor: theme.colors.white,
    },
    inputField:{
        backgroundColor:"#F8F8FA",
        flex:1,
        borderRadius:20
    },
    inputBoxLabel: {
        fontFamily: 'AvenirNextCondensed-Medium',
        fontSize: 16,
        lineHeight: 22,
        marginBottom: 11.86,
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
          width:wp('100%'),
          justifyContent: 'space-between'
      },
      buttonForm: {
        color: theme.colors.grey,
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