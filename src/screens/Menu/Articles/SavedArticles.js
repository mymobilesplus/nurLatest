import React, {useState, useEffect} from 'react'
import { View,Text,Image,TouchableOpacity, RefreshControl, FlatList, ActivityIndicator,Alert, TextInput} from 'react-native'
import {Styles} from "./Styles/ArticlesListStyle"
import {theme,images} from "../../../constants"
import {Icon} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage'
import { Row, Col, Container } from 'native-base';
import CommunityService from '../../../services/CommunityService';
import TimeAgo from 'react-native-timeago';
import { IMAGE_URL } from '../../../API_URI';
import CommunityStackHeader from '../../../components/header/CommunityStackHeader';

const{icons}=images

export default SavedArticles = (props) => {
    const [List, setProfileList] = useState([]);
    const [loader, setLoding]= useState(true);
    const [favorites, setFavorite] = useState([])
    const [selectedItems, setSelectedItems] = useState([]);
    let [FilterList, setFilterList] = useState([])

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
              useSearch={true}
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
        let req = {
            UserId: user.currentUserID,
            LanguageId: lang,
            token: user.accessToken,
            refreshToken: user.refreshToken
        };
        console.warn("req",req)
        api
        .getFavoriteArticlesByUser(req)
        .then((res) => res.json())
        .then((res) => {
            console.warn("res",res)
            setLoding(false);
            if (res.favoriteArticles != undefined) {
                let records = res.favoriteArticles;
                console.warn(records)
                setProfileList(records);
                setFilterList(records)
                }
            }).catch(e=>console.warn("error",e));
        }

    }

    const filterArticles = (text) => {
        text = text.toLowerCase()
        let l = List.filter(x => {
            let { title, description } = x
            return title.toLowerCase().includes(text)
                || description.toLowerCase().includes(text)
        });
        setFilterList(l)
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
        getProfiles();
    }

    const renderRow = ({item, index}) =>{
        const backgroundColor = selectedItems.includes(item.id) ? "#f1f1f1" : "white";
        let fav = favorites.filter(f=>{
            return f.id == item.id
        })
        return (
            <View style={{backgroundColor: 'white',
            elevation: 16,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 0},
            shadowOpacity: 0.1,
            shadowRadius: 5, borderColor:'#ccc', marginHorizontal:7,  paddingRight:8, paddingTop:9, paddingBottom:10, marginBottom:5, paddingLeft:11, backgroundColor }}>
                <TouchableOpacity onPress={()=>{console.warn(item); props.navigation.navigate('Community', {topic: item})}} onLongPress={() => {
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
                            {!item.author ? 
                                <View style={[Styles.addPhoto,{backgroundColor:"#f1f1f1", justifyContent:"center"}]}>
                                <Icon name="image" style={{alignSelf:"center", color: '#000', fontSize: 32}} />
                                    </View>:
                            <Image source={{uri: IMAGE_URL + item.img_src}}  style={Styles.addPhoto}  />
                            }
                            {item.authorImage != null ? <Image source={{uri: IMAGE_URL + item.authorImage}}  style={{padding:2, borderRadius:21, height:42, width:42 ,backgroundColor:theme.colors.grey, position:"absolute", bottom:0, left:0}} />
                            :    
                            <View style={{padding:2, borderRadius:21, height:42, width:42 ,backgroundColor:theme.colors.background, position:"absolute", bottom:0, left:0}}  />
                        }
                            </Col> 
                    </Row>
                <Row style={{marginTop:20}}>
                    <Col style={{flex:0.1}}>
                        <Text style={{color:theme.colors.grey, fontWeight:"500"}}>By</Text>
                    </Col>
                    <Col style={{alignItems:'flex-start', flex:0.4}}>
                        <TouchableOpacity onPress={()=>{props.navigation.navigate('Community', {author: item.createUserID, authorName: item.authorName})}}>
                            <Text style={{color:'#146ECB'}}>{item.authorName}</Text>
                        </TouchableOpacity>
                    </Col>
                    <Col style={{flex:0.7}}>
                        <TimeAgo fontWeight="500" style={{color:theme.colors.grey}} time={item.dateCreated} />
                    </Col>
                    <Col  style={{flex:0.1, alignItems:'flex-end'}}>
                    <Icon onPress={() => saveDoctor(item)} name="bookmark" type="FontAwesome" style={{ fontSize: 20, color: '#000' }} />
                    </Col>

                </Row>
                </TouchableOpacity>
            </View>
        )
    }

        return (
            <Container style={Styles.mainContainer}>
            <View style={{ height:60, flexDirection:'row', marginBottom:10 }}> 
                    <View style={{position:'absolute', top:18, width:60, justifyContent:'center', alignItems:'center' }}>
                        <Icon onPress={()=>props.navigation.goBack(null)} type="Feather" name="arrow-left" size={30} color={'#000'} />
                    </View>
                    <View
                        style={{
                        flex:1,
                        justifyContent:'center',
                        alignItems:'center'
                        }}
                        >
                        <Text 
                            style={[Styles.mainHeading,{fontSize:18}]}
                            >
                            Saved Articles
                        </Text>
                    </View>  
            </View>
            <View style={{ justifyContent:'center', marginHorizontal:23 }}>
                <TextInput style={{ height: 60}} onChangeText={(text)=>filterArticles(text)} placeholder="Search by article name..."
                    style={{ backgroundColor:'#fff', borderRadius:10, borderWidth:2, borderColor:'#eaecef', paddingLeft:20, fontFamily:'OpenSansCondensed-Light', fontWeight:'1000' }} />
                <Icon onPress={()=>props.navigation.goBack(null)} name="search" type="FontAwesome" style={{fontSize:25, color:'#959dac',position:'absolute',right:20}} />
            </View>

                <View style={[Styles.memberBox]}>
                {List.length > 0 &&
                    <FlatList
                        data={FilterList} 
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
                </View>
            </Container>
        
        )
}
