import React, { useEffect } from 'react'
import { View, Text,Image, FlatList, RefreshControl, ActivityIndicator} from 'react-native'
import {Styles} from "./Style/AddNewMemberStyle"
import {theme,images} from "../../constants"
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from "react-native-responsive-screen"
import {Button} from '@ui-kitten/components'
import * as action from "../../redux/actions/_FamilyMember"
import {connect} from "react-redux"
import AsyncStorage from '@react-native-community/async-storage';
import FamilyMemberService from '../../services/FamilyMemberService';
import renderFamilyMembers from '../../components/FamilyMemberList';
import { useFocusEffect } from '@react-navigation/native';
import ClosingHeader from "../../components/header/ClosingHeader"
const{icons}=images

function _AddNewMember(props) {
    const{navigation}=props
    const [List, setMembersList] = React.useState([]);
    const [loader, setLoding]= React.useState(true);
    
    useEffect(() => {
        // code to run on component mount
        // getMembers();
      }, [])
    
    useFocusEffect(React.useCallback(() => {
        getMembers();
    }, []));

    const getMembers = async() =>{
        props.navigation.setOptions({ headerTitle: () => <ClosingHeader {...props} title="Create Medical Reminder"/> });
        setLoding(true);
        let user = await AsyncStorage.getItem("loginData");
        if(user!=null){
            user = JSON.parse(user);
            let api = new FamilyMemberService()
            api.get({UserId: user.currentUserID, refreshToken: user.refreshToken, token: user.accessToken}).then(res=>res.json()).then(res=>{
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
                <Text onPress={()=>props.navigation.navigate('AddNewReminder', {familyMember: ''})} style={{color:theme.colors.primary, textAlign: 'right', width: '100%', marginRight: 20, marginBottom:30}}>Skip</Text>
                <View style={{flex:0,width:wp('75%')}}>
                    <Text style={Styles.topText}>Whom do you want to assign this medical reminder to?</Text>
                </View>
                <Button style={Styles.button} size="large" onPress={()=>navigation.navigate('AddPhotoRegistration', {returnURL: 'Select Family Member'})} >Add New Member</Button>
           </View>
           <View style={Styles.memberContainer}>
           {List.length > 0 &&
                <FlatList
                    data={List}
                    renderItem={({item, index})=>renderFamilyMembers({item, index, props, Styles, navigate: ()=>props.navigation.navigate('AddNewReminder', {familyMember: item})})}
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


const mapStateToProps=(state)=>{
    return{
        _DEVICE_ID:state.DeviceInfoReducer._DEVICE_ID,
        loading:state.LoadingReducer.loading,
        data:state.FamilyMemberReducer.data 
    }
  }
  
  const mapDispatchToProps=(dispatch)=>{
    return{
        getFamilyMembers:(formdata)=>dispatch(action._GetFamilyMembersStart(formdata))
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(_AddNewMember)