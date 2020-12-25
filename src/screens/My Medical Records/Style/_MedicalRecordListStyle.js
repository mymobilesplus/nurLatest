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
    floatingButton:{
        flex:0,
        height:hp('10%'),
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
    file:{
        resizeMode:"cover",
        width:wp('20%'),
        height:wp('20%'),
    },
    recordContainer:{
        flex:0,
        height:hp("14%"),
        maxHeight:hp('100%'),
        overflow:"hidden",
        backgroundColor:theme.colors.white,
        paddingVertical:wp('4%'),
        paddingLeft:wp('5%'),
        paddingRight:wp('3%'),
        borderTopWidth:1,
        borderTopColor:theme.colors.grey,
        justifyContent:"space-between"
    },
    descriptionContainer:{
        flex:1,
       flexGrow:0.93 ,
       flexDirection:'row'
    },
    iconContainer:{
        flex:1,
        flexGrow:0.07
    },
    description:{
        fontFamily:"OpenSansCondensed-Bold", 
        fontSize:18,
        color:theme.colors.dark
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
        alignSelf:"flex-end"
    },
    editblueContainer:{
        flex:0,
        height:hp('30%'),
        alignItems:"center",
        marginBottom:hp("15%")
    },
    
    heart:{
        resizeMode:"contain",
        height:wp('30%'),
        width:wp('30%')
    },
    
    arrow:{
        resizeMode:"contain",
        marginLeft:wp("25%"),
        height:hp('32%'),
        width:wp('50%'),
        
    },
    text:{
        fontSize:20
    }
    
})