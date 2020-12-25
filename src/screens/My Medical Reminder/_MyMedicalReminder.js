import React from 'react'
import { View, Text,Image} from 'react-native'
import {Styles} from "./Style/_MyMedicalRemindersStyle"
import {theme,images} from "../../constants"
import {Button} from "@ui-kitten/components"
import Icon from 'react-native-vector-icons/Feather';

const{icons}=images

export default function _MyMedicalReminder(props) {
    const addIcon=()=>{
        return(
            <Icon name="plus" type="Feather" style={{color: theme.colors.primary}} size={30} />
        )
    }

    return (
        <View style={Styles.mainContainer}>
            <View style={Styles.heartContainer}>
            <Image source={icons.reminders} style={Styles.heart}  />
            <Text style={Styles.text}>Add Your First Medical Reminder</Text>
            </View>
            <View style={Styles.addButtonContainer}>
                <Button
                onPress={()=>props.navigation.navigate('AddNewReminder')}
                accessoryLeft={()=>addIcon()} style={Styles.button} status="primary" size="large" />
            </View>
        </View>
    )
}
