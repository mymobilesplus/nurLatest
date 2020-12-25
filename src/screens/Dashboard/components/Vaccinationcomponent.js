import React, { Component, PropTypes } from 'react'
import { View, UIManager, findNodeHandle, TouchableOpacity } from 'react-native'
import { Container, Header, Title, Body, Content, Card,CardItem, Left, Icon, Right, Button, Row, Col, Text} from 'native-base';
import { MenuProvider, Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';



export default class VaccinationComponent extends Component {
 

  render () {
    return (
       
        <Menu onSelect={value => console.log(`Selected number: ${value}`)}>
            <MenuTrigger  style={{padding: 20}}>
                <Icon name="ellipsis-v" type="FontAwesome" style={{fontSize:20, color: '#000'}}/>
            </MenuTrigger>
            <MenuOptions style={{backgroundColor:'#fff',color:'#000'}}>
            <MenuOption value={1} >
              <Row>
                <Icon name="refresh" type="FontAwesome" style={{fontSize:10}}/>
                <Text style={{color:'#000'}}>Restore</Text>
              </Row></MenuOption>
            <MenuOption value={2}><Icon name="share-alt" type="FontAwesome" style={{fontSize:10}}/><Text style={{color:'#000'}}>Share</Text>
            </MenuOption>
            
            </MenuOptions>
        </Menu>
        
    )
  }

}

