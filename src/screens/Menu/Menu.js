import React,{useState,useEffect} from 'react'
import { View, Text,TouchableOpacity, StyleSheet } from 'react-native'
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from "react-native-responsive-screen"
import {connect} from "react-redux"
import {Styles} from "./Style/MenuStyles"
import MenuName from "./MenuItem.json"
import arabicName from "./arabicMenuItem.json"
import * as action from "../../redux/actions/_Login"
import { Spinner } from '@ui-kitten/components';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { getInstallerPackageName } from 'react-native-device-info'
import langjson from "../../constants/lang.json"
import AsyncStorage from '@react-native-community/async-storage'

function Menu(props) {
const {loading}=props
const[UILoader,setUILoader]=useState(false)
const[menu, setMenu] = useState(MenuName)
const [language, setLang] = useState(1)

const handleMenuOption=(event)=>{
    // console.log("Menu key:",event)
   if(event==="Sign Out"){
       setUILoader(true)
        props.logout()
   }
   else{
        props.navigation.navigate(event);
   }
}

useEffect(()=>{
    setUILoader(false)
    getLang();
    
},[!loading])
useFocusEffect(React.useCallback(() => {
    getLang();
}, []));

const getLang = async() =>{
    AsyncStorage.getItem("lang").then(lang=>{
        if(lang!=null){
            setLang(lang)
            console.warn(lang)
            if(lang==2){
                setMenu(arabicName)
                
            } else { 
                setMenu(MenuName)
            }
        }
    })
}

const Loader = () => (
    <Spinner/>
  );

    return ( 
        <View style={[Styles.mainContainer]}>
            {menu.map((item,index)=>{
                return( 
                    <TouchableOpacity key={index} onPress={()=>handleMenuOption(item.key)} >
                    <View style={[styles.optionContainer]}>
                        <Text style={Styles.optionTexts}>{item.name}</Text>
                        <View  >
                        {/* {loading&&UILoader?Loader():null} */}
                        </View>
                    </View>
                    </TouchableOpacity>
                )
                
            })}
        </View>
    )
}
const styles = StyleSheet.create({
    optionContainer:{
        paddingHorizontal:wp('5%'),
        paddingVertical:wp('3%'),
        backgroundColor:'#ffffff',
        borderTopColor:'#868EA0',
        borderTopWidth:1,
        justifyContent:"space-between",
        flexDirection:"row",
        justifyContent: "flex-start"
    },
})




const mapStateToProps=(state)=>{
    return{
        loading:state.LoadingReducer.loading
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        logout:()=>dispatch(action.LogoutStart())
    }
}



export default connect(mapStateToProps,mapDispatchToProps)(Menu)