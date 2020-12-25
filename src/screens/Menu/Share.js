import React, {useState, useEffect} from 'react'
import { View, Text,Image,TouchableOpacity, RefreshControl, FlatList, ActivityIndicator} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import Share from "react-native-share";


export default function ShareApp(props) {
    const [language, setLang] = useState(1)
    const [List, setMembersList] = React.useState([]);
    const [loader, setLoding]= React.useState(true);
    const{navigation}=props
    useEffect(() => {
        // code to run on component mount
        AsyncStorage.getItem("lang").then(lang=>{
            if(lang!=null){
                setLang(lang)
            }
        })
        getMembers();
      }, [])

    const getMembers = async() =>{
        let options={
            message:"Test",
            title: "Share App"
        }
        Share.open(options).then(res=>{
            console.log(res)
            navigation.goBack()
        }).catch(e=>{
            navigation.goBack()
        })
        // setLoding(true);
        // let user = await AsyncStorage.getItem("loginData");
        // if(user!=null){
        //     user = JSON.parse(user);
        //     // console.log(user);
        //     let api = new FamilyMemberService()
        //     api.get({UserId: user.currentUserID, token: user.accessToken}).then(res=>res.json()).then(res=>{
        //         console.log(res);
        //         setLoding(false)
        //         if(res.familyMembers != undefined){
        //             let records = res.familyMembers;
        //             setMembersList(records);
        //         }
                
        //     })
        //     // let records = await AsyncStorage.getItem("userFamilyMembers");
            
        // }
    }

    return (
        <View >
            
        </View>
    )
}
