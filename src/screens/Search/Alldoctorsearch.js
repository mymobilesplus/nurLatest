import React, { useState, useEffect } from 'react'
import { 
    View, 
    Text, 
    TouchableOpacity, 
    ActivityIndicator, 
    FlatList, 
    TextInput 
} from 'react-native'
import { theme} from "../../constants"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen"
import { Icon } from "native-base"
import AsyncStorage from '@react-native-community/async-storage'
import DoctorApiService from '../../services/DocotoApiService'

export default function Alldoctorsearch(props) {
    const [loader, setLoding] = useState(true)
    const [List, setList] = useState([])
    const [issearch, isSetSearch] = React.useState(0)
    const [value, onChangeText] = useState('');
    
    console.log(props);
    const [language, setLang, updatelang] = useState(1)
    useEffect(() => {
        AsyncStorage.getItem("lang").then(lang => {
            if (lang != null) {
                setLang(lang)
            }
        });
        getSepeciality();
    }, [])

    const getSepeciality = async () => {
        setLoding(true)
        console.log("called !!");

        let user = await AsyncStorage.getItem("loginData");
        if (user != null) {
            user = JSON.parse(user);
            console.log(user);
            let api = new DoctorApiService();
            let req = {
                LanguageId: 1
            }
            api.getMoreSpecialisation({ UserId: user.currentUserID, token: user.accessToken, LanguageId: 1 }).then(res => res.json()).then(res => {
                console.log(res.specialties);
                setLoding(false)
                if (res.specialties != undefined) {
                    let records = res.specialties;
                    setList(records);
                }
            })
        }
    }

    const getSepecialitySearch = async(value)=>{
        if(value != '') {
            setLoding(true)
            let user = await AsyncStorage.getItem("loginData");
            if(user!=null){
                user = JSON.parse(user);
                console.log(user);
                let api = new DoctorApiService();
                let req = {
                    LanguageId: 1
                }
                api.getSpecialisationSearch({UserId: user.currentUserID, token: user.accessToken,Search:value, LanguageId: 1}).then(res=>res.json()).then(res=>{
                    console.log(res);
                    setLoding(false)
                    if(res.specialties != undefined){
                        let records = res.specialties;
                        setList(records);
                    }
                })
            }
        } else {
            getSepeciality();
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#f5f5f5'}}>
        {(issearch == 1) ? 
            (<View 
                style={{
                    height:80,
                    padding: 20,
                    width:'100%',
                    borderRadius:10,
                    justifyContent:'center',
                    alignItems:'center',
                    flexDirection:'row',
                }}>
                <View style={{ flex:6 }} >
                    <TextInput
                        style={{ height: 60}}
                        onChangeText={text => {onChangeText(text);getSepecialitySearch(text);}}
                        value={value}
                        placeholder="Search by doctor name..."
                        style={{
                            backgroundColor:'#fff',
                            borderRadius:10,
                            borderWidth:2,
                            borderColor:'#eaecef', 
                            paddingLeft:20,
                            fontFamily:'OpenSansCondensed-Light',
                            fontWeight:'1000'
                        }} />
                </View>
                <View style={{ flex:1, justifyContent:'center', alignItems:'flex-end' }} >
                    <Icon onPress={()=>{isSetSearch(0)}} name="close" type="FontAwesome" style={{fontSize:25, color:'#959dac',position:'absolute'}} />
                </View>
            </View>)
            : 
            (<View style={{ padding: 20, height: hp("9%"), width: '100%', }} >
                <Icon onPress={() => props.navigation.goBack(null)} name="arrow-left" size={30} type="Feather" color={'#000'} />
                <Icon onPress={()=>{isSetSearch(1)}} name="search" type="FontAwesome" style={{ fontSize: 25, color: '#959dac', position: 'absolute', right: 20, top: 15 }} />
            </View>)
        }
        {(!loader) ?       
            <FlatList
                data={List}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={()=>props.navigation.navigate('doctorsearch',{sid: item.id, name: item.title, description:item.description})} >
                        <View style={{  width: '100%', backgroundColor: 'white', padding: 20, borderTopWidth:1, borderColor:"#868EA0"}}>
                            <Text style={{ color: '#020202', fontSize: 18}}>{item.title}</Text>
                            {item.description !== null && <Text style={{ color: '#596377', fontSize: 18}} numberOfLines={2}>{item.description}</Text>}
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index}
            /> : <View></View> }
            {loader &&
                <View style={{flex:1,backgroundColor: '#D8D8D8',justifyContent:'center',alignItems:'center'}}>
                    <ActivityIndicator size="large" color={theme.colors.primary} />
                </View>
            }
        </View>
    )
}
