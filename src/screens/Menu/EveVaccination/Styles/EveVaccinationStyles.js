import {theme} from "../../../../constants"
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
    heartContainer:{
        flex:0,
        height:hp('30%'),
        justifyContent:"center",
        alignItems:"center"
    },
    mainHeading:{
        fontFamily:"OpenSans-ExtraBold",
        color:theme.colors.black,
        marginVertical:14,
        fontSize:22
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
        borderTopColor:'rgba(0,0,0,0.5)',
        borderBottomWidth:0.5,
        backgroundColor:theme.colors.white,
        paddingHorizontal:wp('5%'),
        paddingVertical:wp('4%'),
        flexDirection:"row",
        alignItems:"center",
        marginTop:10
    },
    avatar:{
        flex:0,
        height:hp('7%'),
        width:wp('15%'),
        backgroundColor:theme.colors.background,
        borderRadius:100
    },
    memberName:{
        fontSize:18,
        fontFamily:"OpenSans-Regular",
        color:'#000000',
        paddingLeft:wp('4%')
    },
    categoryItem:{
        fontFamily:"OpenSans-Regular",
        color:'#000000',
        fontWeight:'bold',
        fontSize:18
   //     paddingLeft:wp('4%')
    },
    activeCategoryItem:{
        fontFamily:"OpenSans-Regular",
        color:'#146ECB',
        fontWeight:'bold',
        fontSize:18
    },
    categoryTab: {
        marginHorizontal:10,
        width:110,
        justifyContent:'center',
        alignItems:'center'
    },
    activeCategoryTab: {
        marginHorizontal:15,
        width:110,
        justifyContent:'center',
        alignItems:'center',
        borderBottomWidth:2,
        borderBottomColor:'#146ECB',
    } 
})