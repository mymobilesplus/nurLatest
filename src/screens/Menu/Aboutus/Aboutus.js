import React,{useEffect} from 'react'
import { View, Text} from 'react-native'
import {Styles} from "./Style/Aboutstyle"
import Icon from 'react-native-vector-icons/Feather';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function Aboutus(props) {
    return (
      <KeyboardAwareScrollView style={{flex:1,backgroundColor:'#fff'}}>
          <View style={{backgroundColor:'#fff'}}>
                <View 
                    style={{
                        height:60,
                        flexDirection:'row',
                        backgroundColor:'#fff'
                    }}>
                    <View
                        style={{
                            position:'absolute',
                            top:18,
                            width:60,
                            justifyContent:'center',
                            alignItems:'center'
                        }}
                        >
                        <Icon 
                            onPress={()=>props.navigation.goBack(null)} 
                            name="arrow-left" 
                            type="Feather" 
                            size={30} 
                            color={'#000'} 
                            // style={{fontSize:20}} 
                            />

                    </View>
                    <View
                        style={{
                            flex:1,
                            justifyContent:'center',
                            alignItems:'center',
                        }}
                        >
                        <Text style={[Styles.mainHeading]}>About us</Text>
                    </View>  
                </View>
                <View
                    style={{
                        flex:1,
                        padding:25,
                        paddingTop:0
                    }}
                    >
                    <View
                        style={{
                            height:40,
                            width:'100%',
                            justifyContent:'flex-end',
                            marginBottom:10
                        }}
                        >
                        <Text style={{fontSize:20,fontFamily:"OpenSansCondensed-Bold"}}>Nurse Nova</Text>
                    </View>
                    <View 
                        style={{flex:1}}
                        >
                        <Text style={{lineHeight:22,fontFamily:"OpenSansCondensed-Regular"}}>Nurse Nova is a personal health and medical record app. Nurse Nova is available on web and mobile. With Nurse Nova, it is easy for the patients to store, record and share the personal medical data with any doctors or healthcare providers. Nurse Nova also gives you the option to track your daily symptoms, set reminders, search for doctors and share your case and opinion in the app’s community, in addition to other features.
                        </Text>    
                    </View>
                </View>
            </View>
        </KeyboardAwareScrollView>
    )
}
