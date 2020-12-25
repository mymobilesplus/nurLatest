import React, { useEffect } from 'react';

import { View , Image, Dimensions} from 'react-native';


function SplashScreen(props){
    const timer = ()=> setTimeout(()=>{
        props.navigation.replace('Welcome');
    },2000);
    useEffect(()=>{
        timer();
    },[])
    return(
        <View style={{flex:1}}>
            <Image
            source={require('../../assets/launch_screen.png')}
            style={{width : Dimensions.get('window').width, height : Dimensions.get('window').height}}
            />
        </View>
    )
}
export default SplashScreen;