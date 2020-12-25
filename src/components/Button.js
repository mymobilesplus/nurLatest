import React from 'react'
import { View,StyleSheet} from 'react-native'
import {Button as Buttons,Text} from "native-base"
import {widthPercentageToDP,heightPercentageToDP} from "react-native-responsive-screen"
import { Container, Header, Content} from 'native-base';
const Button = (props) => {
    return (
      
                <Content>
                     <Buttons  block >
                         <Text style={styles.text}>{props.title}</Text>
                      </Buttons>
                    </Content>
             
    )
}

export default Button


const styles=StyleSheet.create({
    container:{
        justifyContent:"center",
        alignItems:"center",
        borderRadius:5

    },
    text:{
        fontSize:widthPercentageToDP('4%'),
       color:"#FFFFFF",
       fontFamily:"OpenSans-SemiBold",
    }
})