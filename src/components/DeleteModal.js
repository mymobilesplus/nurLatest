import React from 'react'
import { View,StyleSheet} from 'react-native'
import {Body, Button as Buttons,Icon,Right,Text, Title, Button, Row, Col} from "native-base"
import {widthPercentageToDP,heightPercentageToDP} from "react-native-responsive-screen"
import { Container, Header, Content} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import { theme } from '../constants';
const DeleteModal = (props) => {
    return (
        <Container style={{flex: 0.2, paddingBottom: 50}}>
            {/* <Header style={{backgroundColor: theme.colors.background}}>
                <Body>
                    <Title style={{color: theme.colors.black, paddingStart: 20}}>{props.title}</Title>
                </Body>
                <Right>
                    <Icon name="x" type="Feather" style={{paddingRight: 10}} onPress={props.close} />
                </Right>
            </Header> */}
            <Text style={{textAlign: 'center', fontFamily:"OpenSans-SemiBold", padding: 30, fontSize: widthPercentageToDP('5%'), }}>{props.message}</Text>
            <Row style={{bottom:0}}>
                <Col style={{justifyContent: 'center'}}>
                    <Button style={[styles.Button]} transparent onPress={props.cancel}>
                        <Text style={[styles.text, {color: theme.colors.secondary}]}>No</Text>
                    </Button>
                </Col>
                <Col style={{justifyContent: 'center'}}>
                    <Button danger style={[styles.Button, { backgroundColor: theme.colors.danger, borderColor: theme.colors.danger }]} onPress={props.delete}>
                        <Text style={[styles.text]}>Yes</Text>
                    </Button>
                </Col>
                
            </Row>
        </Container>
             
    )
}

export default DeleteModal


const styles=StyleSheet.create({
    container:{
        justifyContent:"center",
        alignItems:"center",
        borderRadius:5

    },
    text:{
        fontSize:widthPercentageToDP('5%'),
       color:"#FFFFFF",
       fontFamily:"OpenSans-SemiBold",
       width: '100%',
       textAlign: 'center'
    },
    Button: {
        borderWidth: 2,
        borderRadius: 50,
        alignSelf: 'center',
        width: '60%',
        height: 70,
        borderColor: theme.colors.secondary
    }
})