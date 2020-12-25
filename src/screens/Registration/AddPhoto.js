import React, { useState, useEffect } from 'react'
import { View, Text,Image,TouchableOpacity,ImageBackground} from 'react-native'
import {Styles} from "./Style/AddPhotoStyle"
import {theme} from "../../constants"
import Icon from 'react-native-vector-icons/Feather';
import {Button} from '@ui-kitten/components'
import ImagePicker from 'react-native-image-picker';
import { IMAGE_URL } from '../../API_URI';

const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

export default function AddPhoto(props) {
    const [file,setFile]=useState([])
    const [returnURL, setReturn] = React.useState("Home")

    const{navigation}=props
    const  openImageLibrary=()=>{
        ImagePicker.launchImageLibrary(options, (response) => {
        if (response.didCancel) {
            console.log('User cancelled image picker');
        } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
        } else {
            const source = { 
            FileName: response.fileName, 
            FileSize: response.fileSize, 
            FileType: response.type,
            FileAsBase64: response.data
          };
            setFile({Photo: source, uri: response.uri})
        }
        });
    }
    useEffect(()=>{
        getReturnUrl()
    }, [])
    const getReturnUrl = () =>{
        if(props.route.params.returnURL!=undefined){
            setReturn(props.route.params.returnURL)
        }
        if(props.route.params.item != undefined){
            setFile({Photo: props.route.params.item.photo, uri: props.route.params.item.img_src})
            console.warn("file",file.uri)
        }
        console.log(props.route.params)
    }
    return (
        <View style={Styles.mainContainer}>
            <View>
            <View style={Styles.headerContainer}>
                <View style={{flexDirection:"row",justifyContent:"space-between",flexGrow:0.5,alignItems:"center"}}>
                    <Text style={Styles.mainHeading}>Add Your Photo</Text>
                    <TouchableOpacity onPress={()=>navigation.navigate('AddNewMember', { returnURL, item: props.route.params.item})}>
                        <Text style={Styles.skip}>Skip</Text>
                    </TouchableOpacity>
                </View>
                
           </View>
                <View style={Styles.photoContainer}>
                    <TouchableOpacity onPress={openImageLibrary}>
                        <Image style={Styles.avatar} source={{uri: IMAGE_URL + file.uri}} />
                        <ImageBackground style={Styles.circle} source={file}>
                            <Icon name="camera" size={60} color={theme.colors.primary} />
                        </ImageBackground>
                    </TouchableOpacity>
                </View>
            </View>

            <View>
                <Button block onPress={()=>navigation.navigate('AddNewMember', {file, returnURL, item: props.route.params.item})}>Create</Button>
            </View>

        </View>
    )
}
