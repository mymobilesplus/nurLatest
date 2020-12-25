import React, { useState, useEffect } from 'react'
import { View, Text,Image, ActivityIndicator, FlatList, RefreshControl} from 'react-native'
import {Styles} from "./Styles/VaccinationStyles"
import {theme,images} from "../../../constants"
import Icon from 'react-native-vector-icons/Feather';
import { Container } from 'native-base';

const{icons}=images

export default function StandardVaccination(props) {
    let [List, setList] = useState([])
    const [loader, setLoding]= React.useState(true);

    useEffect(() => {
        // code to run on component mount
        getProps()
        console.warn("test", List)
    }, [props.list, props.loader])

    const getProps=()=>{
        setList(props.list);
        setLoding(props.loader);
    }
    const renderRow = ({item, index}) => {
        return(
            <View style={Styles.recordContainer} key={index}>
                <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                    <View style={Styles.descriptionContainer}>
                    <Text style={Styles.description}>{item.title}</Text>
                    </View>
                </View>
            </View>
       )
    }
    return (
        <Container style={Styles.mainContainer}>
            {List.length > 0 &&
                <FlatList
                    data={List} 
                    renderItem={renderRow}
                    refreshControl={
                        <RefreshControl onRefresh={props.refreshList} refreshing={loader} />
                    }
                    /> 
            }
            {loader && List.length == 0 &&
                <ActivityIndicator size="large" color={theme.colors.primary} />
            }
            {List.length == 0 && !loader &&
                <View style={Styles.heartContainer}>
                    <Image source={icons.heart} style={Styles.heart}  />
                    <Text style={Styles.text}>Add first Vaccination</Text>
                </View>
            }
        </Container>
    )
}
