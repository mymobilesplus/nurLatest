import React, { useEffect } from 'react'
import { View, Text,Image,TouchableOpacity, FlatList, ActivityIndicator, RefreshControl, Alert} from 'react-native'
import {Styles} from "./Style/_Community"
import {theme,images} from "../../constants"
import {Button} from "@ui-kitten/components"
import Icon from 'react-native-vector-icons/Feather';
import { Row, Col, Container } from 'native-base';
import CommunityService from '../../services/CommunityService';
import AsyncStorage from '@react-native-community/async-storage';
import TimeAgo from 'react-native-timeago';
import { IMAGE_URL } from '../../API_URI';
import CommunityStackHeader from '../../components/header/CommunityStackHeader';

const{icons}=images

export default function CommunityArticlesByTopic(props) {
    const [List, setProfileList] = React.useState([]);
    const [loader, setLoding]= React.useState(true);
    const [favorites, setFavorite] = React.useState([])
    const [selectedItems, setSelectedItems] = React.useState([]);

    useEffect(() => {
        // code to run on component mount
        getProfiles();
      }, [])

    const getProfiles = async () => {
        props.navigation.setOptions({
          headerTitle: () => (
            <CommunityStackHeader
              {...props}
              filterRecords={null}
              title="Fetching Articles..."
            />
          ),
        });
        setLoding(true);
        let user = await AsyncStorage.getItem('loginData');
        let lang = await AsyncStorage.getItem('lang');
        if (lang != null) {
          lang = JSON.parse(lang);
        } else {
          lang = 1;
        }
    
        if (user != null) {
          user = JSON.parse(user);
          let api = new CommunityService();

        let Id = props.route.params.topic.topic.id;
        let req = {
        Id,
        UserId: user.currentUserID,
        LanguageId: lang,
        token: user.accessToken,
        };
        api
        .getByTopic(req)
        .then((res) => res.json())
        .then((res) => {
            setLoding(false);
            if (res.articles != undefined) {
            let records = res.articles;
            setProfileList(records);
                      }
                    });
                };
            }

    const removeArticles = async () => {
        setLoding(true);
        
        let user = await AsyncStorage.getItem('loginData');
        let lang = await AsyncStorage.getItem('lang');
        if (lang != null) {
            lang = JSON.parse(lang);
        } else {
            lang = 1;
        }
        if (user != null) {
            user = JSON.parse(user);
            let api = new CommunityService();
        let req = {
            "Ids": selectedItems,
            LanguageId: lang,
            token: user.accessToken,
        }
        api
        .deleteMultipleArticles(req)
        .then((res) => res.json())
        .then((res) => {
        // console.warn(res)
        setLoding(false);
        }).then(()=>getProfiles())
        .then(()=>setSelectedItems([]))
        .catch(e=>{
        console.log(e);
        setLoding(false)
        });
    }
    };
        

    const filterRecords = (text, records) => {
        let list = records.filter(f=>{
            return f.title.toLowerCase().includes(text.toLowerCase()) 
                || f.description.toLowerCase().includes(text.toLowerCase())
                || f.authorName.toLowerCase().includes(text.toLowerCase());
        })
        setProfileList(list)
    }
    const markFavorite = async(item) => {
        setLoding(true)
        let user = JSON.parse(await AsyncStorage.getItem("loginData"))
        let lang = JSON.parse(await AsyncStorage.getItem("lang"))
        let req = {
            UserId: user.currentUserID,
            ArticleId: item.id,
            token: user.accessToken
        }
        let api = new CommunityService()
        let res = await api.markArticleFavorite(req).then(res=>res.json())
        if(res.isAdded){
            Alert.alert("Success", "Article marked as favorite!", [{
                text: 'OK'
            }])
        }
        setLoding(false)
    }

    const addIcon=()=>{
        return(
            <Icon name="plus" type="Feather" style={{color: theme.colors.primary}} color={theme.colors.white} size={30} />
        )
    }
    
    const removeIcon=()=>{
        return(
            <Icon name="trash-2" type="Feather" style={{color: theme.colors.danger}} color={theme.colors.white} size={30} />
        )
    }
    const assignCheck=()=>{
        return(
            <Icon name="check" type="Feather" style={{color: theme.colors.green}} color={theme.colors.white} size={30} />
        )
    }
    const clearSelectionIcon=()=>{
        return(
            <Text style={{color: theme.colors.secondary, fontSize:12,textAlign:"center"}} color={theme.colors.white} >Clear    Selection</Text>
        )
    }

    const renderRow = ({item, index}) =>{
        const backgroundColor = selectedItems.includes(item.id) ? "#f1f1f1" : "white";
        let fav = favorites.filter(f=>{
            return f.id == item.id
        })
        return (
            <View style={{ elevation:2, borderColor:'#ccc', marginHorizontal:7, marginTop:12, paddingRight:8, paddingTop:9, paddingBottom:10, paddingLeft:11, backgroundColor }}>
                <TouchableOpacity onPress={()=>{props.navigation.navigate('CommunityDetail', {topic: item})}} onLongPress={() => {
                    if(selectedItems.includes(item.id)){
                        if(selectedItems.length==1){
                            setSelectedItems([])
                        } else {
                            let indexOF = selectedItems.indexOf(item.id)
                            setSelectedItems(selectedItems.splice(indexOF-1,1))
                        }
                    }else{
                        setSelectedItems([...selectedItems, item.id])
                    }
                }
                    } >
                {selectedItems.includes(item.id) && (
                <View style={Styles.removeButtonContainer}>
                    <Button
                    onPress={()=>removeArticles()}
                    accessoryLeft={()=>assignCheck()} style={Styles.button} status="primary" size="large" />
                </View>
                )
                }
                <Row>
                    <Col style={Styles.topicTitleContainer}>
                        <Text style={Styles.topicTitle}>{item.topicTitle}</Text>
                    </Col>
                </Row>
                    <Row>
                        <Col style={{flex:5}}>
                            <Text style={{fontSize:20,marginTop:21}}>
                                {item.title}
                            </Text>
                        </Col>
                        <Col style={{alignItems:'flex-end',flex:2, width:113, height:103}}>
                            {!item.img_src ? 
                                <View style={[Styles.addPhoto,{backgroundColor:"#f1f1f1", justifyContent:"center"}]}>
                                <Icon name="image" style={{alignSelf:"center", color: '#000', fontSize: 32}} />
                                    </View>:
                            <Image source={{uri: IMAGE_URL + item.img_src}}  style={Styles.addPhoto}  />
                            }
                            <View style={{padding:2, borderRadius:21, height:42, width:42 ,backgroundColor:theme.colors.grey, position:"absolute", bottom:0, left:0}}  />
                        </Col> 
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
    return (
        <Container style={{justifyContent: 'center'}}>
            {List.length > 0 &&
                <FlatList
                    data={List} 
                    renderItem={renderRow}
                    refreshControl={
                        <RefreshControl onRefresh={getProfiles} refreshing={loader} />
                    }
                    key={List.id}
                    /> 
            }
            {loader && List.length == 0 &&
                <ActivityIndicator size="large" color={theme.colors.primary} />
            }
            {List.length == 0 && !loader &&
                <View style={Styles.mainContainer}>
                    <View style={Styles.heartContainer}>
                        <Image source={icons.heart} style={Styles.heart}  />
                        <Text style={Styles.text}>No Record</Text>
                    </View>
                </View>
            }
            <View style={Styles.addButtonContainer}>
                <Button
                onPress={()=>props.navigation.navigate('CreateNewArticle', {})}
                accessoryLeft={()=>addIcon()} style={Styles.button} status="primary" size="large" />
            </View>
            {selectedItems.length !== 0 &&
                (<>
                <View style={Styles.removeButtonContainer}>
                <Button
                onPress={()=>{
                    Alert.alert(
                        "Alert!",
                        "Are you sure you want to delete these articles?",
                        [
                          {
                            text: "yes",
                            onPress: () => removeArticles(),
                            style: "cancel"
                          },
                          { text: "No", onPress: () => console.log("OK Pressed") }
                        ],
                        { cancelable: false }
                      );
                    
                }
                }
                accessoryLeft={()=>removeIcon()} style={Styles.button} status="primary" size="large" />
                </View>
                    <View style={Styles.clearSelectionContainer}>
                        <Button
                        onPress={()=>setSelectedItems([])}
                        accessoryLeft={()=>clearSelectionIcon()} style={Styles.button} status="primary" size="large" />
                    </View>
                </>
                )
            }  
        </Container>
    
    )
}
