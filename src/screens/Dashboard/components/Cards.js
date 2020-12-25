import React, { useEffect, useState } from 'react'
import { View, Text, StatusBar ,Image,TouchableOpacity} from 'react-native'
import {images,theme} from "../../../constants"
import {Styles} from "../Style/_CardStyle"
import * as  RootNavigation from "../../../navigation/RootNavigation"
import { Row } from 'native-base'
import AsyncStorage from '@react-native-community/async-storage'
import langjson from '../../../constants/lang.json'
const {icons}=images

let medical = require('../../../assets/medical_records.png');
const Cards = ({navigation}) => {
    const [language, setLang, updatelang] = useState(1)
    useEffect(()=>{
        AsyncStorage.getItem("lang").then(lang=>{
            if(lang!=null){
                setLang(lang)
            }
        })
    })
    
    // console.log("Lang", langjson.lang[language-1].recordTitle)
    return (
        <View style={Styles.mainContainer}>
            <View style={Styles.firstRow}>
                <TouchableOpacity 
                    onPress={()=>RootNavigation.navigate('DashboardStack')} >
                    <View style={[Styles.card1,{marginBottom:10,elevation:5}]}> 
                        <Image source={medical} style={Styles.cardImage}  />
                        <Text style={Styles.title}>{langjson.lang[language-1].recordTitle}</Text>
                    </View>
                </TouchableOpacity>
            
                <TouchableOpacity onPress={()=>RootNavigation.navigate('MyHeathdiary')} >
                    <View style={[Styles.card1,{marginBottom:10,elevation:5}]}>
                        <Image source={icons.health_diary} style={Styles.cardImage} />
                        <Text style={Styles.title}>{langjson.lang[language-1].healthTitle}</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={Styles.firstRow}>
             <TouchableOpacity onPress={()=>RootNavigation.navigate('MyReminder')} >
                <View style={[Styles.card1,{marginBottom:10,elevation:5}]}>
                    <Image source={icons.reminders} style={Styles.cardImage}  />
                    <Text style={Styles.title}>{langjson.lang[language-1].reminderTitle}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>RootNavigation.navigate('Community')} >
                <View style={[Styles.card1,{marginBottom:10, elevation:5}]}>
                    <Image source={icons.community}  style={Styles.cardImage} />
                    <Text style={Styles.title}>{langjson.lang[language-1].communityTitle}</Text>
                </View>
            </TouchableOpacity>
                {/* <TouchableOpacity onPress={()=>RootNavigation.navigate('MyReminder')} >
                    <View style={Styles.card1}>
                        <Image source={icons.reminders} style={Styles.cardImage}  />
                        <Text style={Styles.title}>My Reminder</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>RootNavigation.navigate('addarticle')} >
                    <View style={Styles.card1}>
                        <Image source={icons.community}  style={Styles.cardImage} />
                        <Text style={Styles.title}>Community</Text>
                    </View>
                </TouchableOpacity> */}
            </View>
        </View>
    )
}

export default Cards
