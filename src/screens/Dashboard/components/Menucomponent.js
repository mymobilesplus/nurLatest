import React, { Component, PropTypes } from 'react'
import { View, UIManager, findNodeHandle, TouchableOpacity } from 'react-native'
import { Container, Header, Title, Body, Content, Card,CardItem, Left, Icon, Right, Button, Row, Col, Text} from 'native-base';
import { MenuProvider, Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';



export default class MenuComponent extends Component {
 

  render () {
    return (
       
        <Menu onSelect={value => console.log(`Selected number: ${value}`)}>
            <MenuTrigger  style={{padding: 10}}>
                <Icon name="ellipsis-v" type="FontAwesome" style={{fontSize:20, color: '#000'}}/>
            </MenuTrigger>
            <MenuOptions style={{backgroundColor:'#fff',color:'#000'}}>
            <MenuOption value={1} >
              <Row>
                <Col style={{justifyContent: 'center', flex: 0.1, paddingLeft: 5}}>
                  <Icon name="pencil" type="FontAwesome" style={{fontSize:10}}/>
                </Col>
                <Col>
                  <Text style={{color:'#000'}}> Edit</Text>
                </Col>
              </Row></MenuOption>
            <MenuOption value={2}>
              <Row>
                <Col style={{justifyContent: 'center', flex: 0.1, paddingLeft: 5}}>
                  <Icon name="share-alt" type="FontAwesome" style={{fontSize:10}}/>
                </Col>
                <Col>
                  <Text style={{color:'#000'}}>Share</Text>
                </Col>
              </Row>
            </MenuOption>
            <MenuOption value={3}>
              <Row>
                <Col style={{justifyContent: 'center', flex: 0.1, paddingLeft: 5}}>
                  <Icon name="trash-o" type="FontAwesome" style={{fontSize:10}}/>
                </Col>
                <Col>
                  <Text  style={{color:'#000'}}>Delete</Text>
                </Col>
              </Row> 
            </MenuOption>
            </MenuOptions>
        </Menu>
        
    )
  }

}

