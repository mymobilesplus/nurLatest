import {theme} from "../../../constants"
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from "react-native-responsive-screen"
import {StyleSheet} from "react-native"
const height=hp('100%')
const width=wp('100%')

export const Styles =StyleSheet.create({

    mainContainer:{
        flex:1,
        backgroundColor:theme.colors.background,
        justifyContent: 'center'
    },
    addPhoto:{
        resizeMode: 'cover',
        width: wp('24%'),
        height: wp('24%'),
        margin:5
    },
    recordContainer:{
        flex:0,
        minHeight:hp("18%"),
        maxHeight:hp('100%'),
        overflow:"hidden",
        backgroundColor:theme.colors.white,
        padding:wp('1%'),
        borderTopColor:theme.colors.grey,
        justifyContent:"space-between",
        alignItems:"flex-start",
        flexDirection:"row",
        margin:5
    },
    descriptionContainer:{
        flex:0
    },
    user:{
        fontFamily:"OpenSans-Regular",
        color:theme.colors.dark,
        backgroundColor:theme.colors.background,
        paddingHorizontal:15,
        fontSize:16,
        marginTop:10,
    },
    iconContainer:{
        flex:1,
        marginTop: 5,
        position:"absolute",
        top : 5,
        right:5
    },
    description:{
        fontFamily:"OpenSans-SemiBold",
        fontSize:18,
        color:"#146ECB",
    },
    doze:{
        fontFamily:"OpenSans-SemiBold",
        fontSize:16,
        color:"#020202",
    },
    bottomContainer:{
        flexDirection:"row",
        justifyContent:"space-between"
    },
    dateContainer:{
        flexDirection:"row",
        alignItems:"center"
    },
    name:{
        fontFamily:"OpenSans-Regular",
        color:theme.colors.dark,
        backgroundColor:theme.colors.background,
        paddingHorizontal:15,
        paddingVertical:5,
        borderRadius:3,
        fontSize:wp('3.5%')
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    heartContainer:{
        flex:0,
        height:hp('30%'),
        alignItems:"center"
    },
    
    heart:{
        resizeMode:"contain",
        height:wp('40%'),
        width:wp('40%')
    },
    
    text:{
        fontFamily:"OpenSans-Regular",
        fontSize:wp('4.5%')
    },
    floatingButton:{
        flex:0,
        height:hp('70%'),
        justifyContent:"center",
        alignItems:"flex-end"
    },
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
    button:{
        borderRadius:100,
        width:73,
        height:73,
        backgroundColor:theme.colors.white,
        borderColor:theme.colors.white,
        elevation:4,
    },
})