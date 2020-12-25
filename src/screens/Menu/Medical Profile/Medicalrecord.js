import React, { Component } from 'react';
import { Text,StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Container, Icon, Row, Col} from 'native-base';

class Medicalrecord extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            products:[{
                name: 'Here comes the description of the medical records and it could be display on two lines...',
                date:'21/7/2020',
                id: 1
            },
            {
                name: 'Here comes the description of the medical records and it could be display on two lines...',
                date:'21/7/2020',
                id: 2
            },
            {
                name: 'Here comes the description of the medical records and it could be display on two lines...',
                date:'21/7/2020',
                id: 3
            },
            
        ]
        }
       
    }
    
   
    renderRow({item, index}){
        return(
            <TouchableOpacity  style={{flex: 1}} >
                <Row style={{marginTop:10, marginBottom:10, padding:10,borderBottomWidth:1, borderBottomColor:'#ccc'}}>
                    <Col>
                        <Row>
                            <Text style={{color:'#000', marginTop:20, fontWeight:'bold'}}>{item.name}</Text>
                        </Row>
                        <Row>
                            <Text style={{color:'#aaa', marginTop:20, fontWeight:'bold'}}><Icon name="calendar-o" type="FontAwesome" style={{fontSize:12}}/> {item.date}</Text>
                        </Row>
                    </Col>
                </Row>
            </TouchableOpacity>
        )
    }

    render() {
        return (
           <Container>
                <FlatList 
                data={this.state.products} 
                renderItem={this.renderRow}
                />
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginBottom: 50
    },
    itemText: {
        fontSize: 16, 
        color: '#000', 
    },
    itemText1: {
        fontSize: 13, 
        color: '#aaa',
    },

    itemText2: {
        fontSize: 16, 
        color: '#aa0114', 
    }, 
    itemText3: {
        fontSize: 16, 
        color: '#aaa', 
        textDecorationLine: 'line-through'
    },   
     backgroundTranslucent:{
        backgroundColor: "rgba(255,255,255, 0.4)"
    }
  });

export default Medicalrecord;
