import React from 'react'
import { View, Text,Image} from 'react-native'
import {Styles} from "./Style/_MyMedicalRecordsStyle"
import {theme,images} from "../../constants"
import {Button} from "@ui-kitten/components"
import Icon from 'react-native-vector-icons/Feather';

const{icons}=images

export default function _MyMedicalRecords(props) {
    const addIcon=()=>{
        return(
            <Icon name="plus" type="Feather" style={{color: theme.colors.primary}} size={30} />
        )
    }

    return (
        <View style={Styles.mainContainer}>
            <View style={Styles.heartContainer}>
            <Image source={icons.heart} style={Styles.heart}  />
            <Text style={Styles.text}>Add your first Medical Records</Text>
            </View>
            <View style={Styles.addButtonContainer}>
                <Button
                onPress={()=>props.navigation.navigate('Add New Member')}
                accessoryLeft={()=>addIcon()} style={Styles.button} status="primary" size="large" />
            </View>
        </View>
    )
}
