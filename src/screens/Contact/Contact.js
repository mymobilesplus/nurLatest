import React from 'react'
import { View, Text,Image,TouchableOpacity, ScrollView} from 'react-native'
import {Styles} from "./Styles/ContactStyles"
import {theme,images} from "../../constants"
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from "react-native-responsive-screen"
import {Button} from '@ui-kitten/components'
import {Row, Col, Icon} from "native-base"

const user=[
    {
    id:1,
    name:"Elie Tannous",
    contact:"1234546"
   },
   {    id:2,
       name:"Eve Tannous",
       contact:"1234546"
   },
   {    id:3,
       name:"Pauline Tannous",
       contact:"1234546"
   },
   {    id:4,
    name:"Pauline Tannous",
    contact:"1234546"
},
{    id:5,
    name:"Pauline Tannous",
    contact:"1234546"
},
{    id:6,
    name:"Pauline Tannous",
    contact:"1234546"
},
{    id:7,
    name:"Pauline Tannous",
    contact:"1234546"
},
{    id:8,
    name:"Pauline Tannous",
    contact:"1234546"
},
{    id:9,
    name:"Pauline Tannous",
    contact:"1234546"
},
{    id:10,
    name:"Pauline Tannous",
    contact:"1234546"
}
]



export default function Contact(props) {
   

    return (
        <View style={Styles.mainContainer}>
            
           <View style={Styles.addNewMemberContainer}>
                <Row>
                    <Col style={{alignItems:'center'}}>
                    <Text style={{fontSize:18, fontWeight:'bold'}}>Choose Contact</Text>
                    </Col>
                    <Col style={{flex:0.2, marginLeft:10}}>
                    <Icon onPress={()=>props.navigation.goBack(null)} name="close" type="FontAwesome" style={{fontSize:20, color:'#000'}} />
                    </Col>
                    
                </Row>
            </View>
            <ScrollView>
                <View style={Styles.memberContainer}>
                    {user.map((item,index)=>{
                        return(
                            
                            <TouchableOpacity>
                                <Row style={{padding:10}}>
                                    <Col style={Styles.avatar}>
                                    </Col>
                                    <Col>
                                        <Row>
                                            <Text style={Styles.memberName}>{item.name}</Text>
                                        </Row>
                                        <Row>
                                            <Text style={Styles.memberContact}>{item.contact}</Text>
                                        </Row>
                                    </Col>
                                    <Col >
                                    <Button style={{marginRight:10, width:120}}><Text>Give Access</Text></Button>
                                    </Col>
                                </Row>
                            {/* <View style={Styles.memberBox} >
                            <View>
                                <View style={Styles.avatar}/>
                            </View>
                            <View>
                                <Text style={Styles.memberName}>{item.name}</Text>
                            </View>
                            </View> */}
                            </TouchableOpacity>
                        )
                    
                    })}
                </View>
           </ScrollView>
        </View>
    )
}
