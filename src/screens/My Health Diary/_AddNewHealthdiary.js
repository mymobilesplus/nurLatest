import React, { useEffect } from 'react'
import { View, Text,Image, ActivityIndicator, RefreshControl, FlatList} from 'react-native'
import {Styles} from "./Style/AddNewHealthDiaryStyle"
import {theme,images} from "../../constants"
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from "react-native-responsive-screen"
import {Button} from '@ui-kitten/components'
import FamilyMemberService from '../../services/FamilyMemberService';
import renderFamilyMembers from '../../components/FamilyMemberList';
import AsyncStorage from '@react-native-community/async-storage';
import ClosingHeader from "../../components/header/ClosingHeader"

const{icons}=images

export default function _AddNewHealthdiary(props) {
    const{navigation}=props
    const [List, setMembersList] = React.useState([]);
    const [loader, setLoding]= React.useState(true);

    useEffect(() => {
        // code to run on component mount
        getMembers();
      }, [])

    const getMembers = async() =>{
        props.navigation.setOptions({ headerTitle: () => <ClosingHeader {...props} title="Create Health Diary"/> });
        setLoding(true);
        let user = await AsyncStorage.getItem("loginData");
        if(user!=null){
            user = JSON.parse(user);
            let api = new FamilyMemberService()
            api.get({UserId: user.currentUserID, token: user.accessToken, refreshToken: user.refreshToken}).then(res=>res.json()).then(res=>{
                setLoding(false)
                if(res.familyMembers != undefined){
                    let records = res.familyMembers;
                    setMembersList(records);
                }
                
            })
            
        }
    }

    return (
        <View style={Styles.mainContainer}>
           <View style={Styles.addNewMemberContainer}>
               <Text onPress={()=>props.navigation.navigate('AddNewMember', {familyMember: ''})} style={{color:theme.colors.primary, textAlign: 'right', width: '100%', marginRight: 20, marginBottom:30}}>Skip</Text>
                <View style={{flex:0,width:wp('75%')}}>
                    <Text 
                        style={Styles.topText}
                        >
                        Whom do you want to assign this health diary to?
                    </Text>
                </View>
                <Button style={Styles.button} size="large" onPress={()=>navigation.navigate('AddPhotoRegistration', {returnURL: 'AddNewHealthdiary'})} >
                    Add New Member 
                </Button>
           </View>
           <View style={Styles.memberContainer}>
                {List.length > 0 &&
                    <FlatList
                        data={List}
                        renderItem={({item, index})=>renderFamilyMembers({item, index, props, Styles, navigate: ()=>navigation.navigate('AddNewMember', {familyMember: item})})}
                        refreshControl={
                            <RefreshControl onRefresh={getMembers} refreshing={loader} />
                        }
                        />
                }
                {loader && List.length == 0 &&
                    <ActivityIndicator size="large" color={theme.colors.primary} />
                }
                {List.length == 0 && !loader &&
                    <View style={Styles.mainContainer}>
                        <View style={Styles.heartContainer}>
                            <Image source={icons.heart} style={Styles.heart}  />
                            <Text style={Styles.text}>Add your first family member</Text>
                        </View>
                    </View>
                }
           </View>
        </View>
    )
}
