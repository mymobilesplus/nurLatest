import React from 'react'
import { View, Text,Image,TouchableOpacity} from 'react-native'
import {Styles} from "./Style/_Community"
import {theme} from "../../constants"
import Icon from 'react-native-vector-icons/Feather';
import { Row, Col } from 'native-base';
import TimeAgo from 'react-native-timeago';
import { IMAGE_URL } from '../../API_URI';


export default function Article(props) {
    return (
        <View style={{ elevation:1, borderWidth:1, borderColor:'#ccc', marginHorizontal:7, marginTop:12, paddingRight:8, paddingTop:9, paddingBottom:10, paddingLeft:11 }}>
        <TouchableOpacity onPress={()=>{props.navigation.navigate('CommunityDetail', {topic: item})}}>
        <Row>
            <Col style={Styles.topicTitleContainer}>
                <Text style={Styles.topicTitle}>{item.title}</Text>
            </Col>
        </Row>
            <Row>
                <Col style={{flex:5}}>
                    <Text style={{fontSize:20,marginTop:21}}>
                        {item.description}
                    </Text>
                </Col>
                {(item.img_src)?
                <Col style={{alignItems:'flex-end',flex:2, width:113, height:103}}>
                    <Image source={{uri: IMAGE_URL + item.img_src}}  style={Styles.addPhoto}  />
                    <View style={{padding:2, borderRadius:21, height:42, width:42 ,backgroundColor:theme.colors.grey, position:"absolute", bottom:0, left:0}}  />
                </Col> : 
                <View/>
                }
            </Row>
        <Row style={{marginTop:20}}>
            <Col style={{flex:0.1}}>
                <Text style={{color:theme.colors.grey, fontWeight:"500"}}>By</Text>
            </Col>
            <Col style={{alignItems:'flex-start', flex:0.4}}>
                <TouchableOpacity onPress={()=>{props.navigation.navigate('Publisher', {author: item.createUserID, authorName: item.authorName})}}>
                    <Text style={{color:'#146ECB'}}>{item.authorName}</Text>
                </TouchableOpacity>
            </Col>
            <Col style={{flex:0.7}}>
                <TimeAgo fontWeight="500" style={{color:theme.colors.grey}} time={item.dateCreated} />
            </Col>
            <Col  style={{flex:0.1, alignItems:'flex-end'}}>
                <Icon onPress={()=>markFavorite(item)} name="bookmark" 
                    type="FontAwesome5" style={{fontSize:20, color:theme.colors.dark, height: 22.75, width: 16.25}}/>
            </Col>

        </Row>
        </TouchableOpacity>
    </View>
    )
}
