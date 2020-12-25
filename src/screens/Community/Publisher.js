import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  RefreshControl,
  Alert
} from 'react-native';
import {Styles} from './Style/_Community';
import {theme, images} from '../../constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Button} from "@ui-kitten/components"
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Row, Col, Icon} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import TimeAgo from 'react-native-timeago';
import AsyncStorage from '@react-native-community/async-storage';
import CommunityService from '../../services/CommunityService';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import CommunityStackHeader from '../../components/header/CommunityStackHeader';
import {IMAGE_URL} from '../../API_URI';

const {icons} = images;

export default function Publisher(props) {
  const [loading, setLoding] = useState(false);
  const [articles, setArticles] = useState([]);
  const [List, setProfileList] = React.useState([]);
  const [totalArticles, setTotal] = useState(0);
  const [totalTopics, setTotalTopics] = useState(0);
  const [favorites, setFavorite] = React.useState([]);
  const [numOfColumns, setNumOfColumns] = React.useState(3);
  const [selectedItems, setSelectedItems] = React.useState([]);

  useEffect(() => {
    getTopicsByUser();
  }, []);
  useEffect(() => {
    getProfiles();
  }, []);

  const getProfiles = async () => {
    props.navigation.setOptions({
      headerTitle: () => (
        <CommunityStackHeader
          {...props}
          filterRecords={null}
          title="Fetching Articles..."
          useSearch={false}
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
      console.warn(user.accessToken)
      let req = {
        UserId: props.route.params.author,
        token: user.accessToken,
        LanguageId: lang,
      };
      api
        .getArticlesByUser(req)
        .then((res) => res.json())
        .then((res) => {
          setLoding(false);
          if (res.articles != undefined) {
            let records = res.articles;
            setProfileList(records);
            // console.warn(records)
            props.navigation.setOptions({
              headerTitle: () => (
                <CommunityStackHeader
                  {...props}
                  records={records}
                  filterRecords={null}
                  title="Published By"
                  useSearch={false}
                />
              ),
            });
          }
        });
    }

  };

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

  const getTopicsByUser = async () => {
    setLoding(true);
    let user = JSON.parse(await AsyncStorage.getItem('loginData'));
    let lang = JSON.parse(await AsyncStorage.getItem('lang'));
    let req = {
      UserId: props.route.params.author,
      token: user.accessToken,
      LanguageId: lang,
    };
    let api = new CommunityService();
    let res = await api.getTopicsByUser(req).then((res) => res.json());
    setArticles(res);
    let t = 0;
    res.topics.map((tx) => {
      t += tx.articlesCount;
    });
    setTotal(t);
    setTotalTopics(res.topics.length);
    setLoding(false);

  };

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

  const renderTopics = ({item, index}) => {
    return (
      <Row key={index}>
        <Col>
          <LinearGradient style={[Styles.mainContainer1,{width: (item.articlesCount / totalArticles) * 100 + '%'},]}
            colors={[theme.colors.primary, theme.colors.secondary]}
            start={{x: 0.0, y: 0}}
            end={{x: 1.8, y: 1.0}}></LinearGradient>
          <Row style={{marginBottom: 10}}>
            <Col>
              <Text style={{lineHeight:22}}>{item.topic.title}</Text>
            </Col>
            <Col style={{alignItems: 'flex-end'}}>
              <Text style={{color:"#4B4F56"}}>{item.articlesCount} Articles</Text>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  };

  const renderRow = ({item, index}) => {
    const backgroundColor = selectedItems.includes(item.id) ? "#f1f1f1" : "white";
    let fav = favorites.filter((f) => {
      return f.id == item.id;
    });
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
              <Text style={Styles.topicTitle}>{item.title}</Text>
            </Col>
          </Row>
          <Row>
            <Col style={{flex: 5}}>
              <Text style={{fontSize: 20, marginTop: 21}}>
                {item.description}
              </Text>
            </Col>
            {item.img_src ? (
              <Col
                style={{
                  alignItems: 'flex-end',
                  flex: 2,
                  width: 113,
                  height: 103,
                }}>
                <Image
                  source={{uri: IMAGE_URL + item.img_src}}
                  style={Styles.addPhoto}
                />
                <View
                  style={{
                    padding: 2,
                    borderRadius: 21,
                    height: 42,
                    width: 42,
                    backgroundColor: theme.colors.grey,
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                  }}
                />
              </Col>
            ) : (
              <View />
            )}
          </Row>
          <Row style={{marginTop: 20}}>
            <Col style={{flex: 0.1}}>
              <Text style={{color: theme.colors.grey, fontWeight: '500'}}>
                By
              </Text>
            </Col>
            <Col style={{alignItems: 'flex-start', flex: 0.4}}>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('Publisher', {
                    author: item.createUserID,
                    authorName: item.authorName,
                  });
                }}>
                <Text style={{color: '#146ECB'}}>{item.authorName}</Text>
              </TouchableOpacity>
            </Col>
            <Col style={{flex: 0.7}}>
              <TimeAgo
                fontWeight="500"
                style={{color: theme.colors.grey}}
                time={item.dateCreated}
              />
            </Col>
            <Col style={{flex: 0.1, alignItems: 'flex-end'}}>
              <Icon
                onPress={() => markFavorite(item)}
                name="bookmark"
                type="FontAwesome5"
                style={{
                  fontSize: 20,
                  color: theme.colors.dark,
                  height: 22.75,
                  width: 16.25,
                }}
              />
            </Col>
          </Row>
        </TouchableOpacity>
      </View>
    );
  };
const {topics} = articles
let initialTopics = []
if(topics != null){
initialTopics= topics.slice(0,3)
}
  return (
    <View style={{flex: 1}}>
        <ScrollView>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              padding: 10,
              backgroundColor: '#fff',
            }}>
            <Row style={{marginBottom: 10}}>
              <Col style={{flex: 0.25}}>
                <Image source={icons.AddPhoto} style={Styles.addPhoto} />
              </Col>
              <Col
                style={{
                  alignItems: 'flex-start',
                  flex: 0.7,
                  justifyContent: 'center',
                }}>
                <Text style={{fontSize: 25, fontWeight: 'bold', width: '100%'}}>
                  {props.route.params.authorName}
                </Text>
                <Text style={{fontSize: 15}}>
                  {totalArticles} Articles . {totalTopics} Topic
                </Text>
              </Col>
              <Col style={{alignItems: 'flex-end', flex: 0.1}}>
                <Icon name="bookmark-o" type="FontAwesome" />
              </Col>
            </Row>
            {numOfColumns !== totalTopics? (<>
            <Row>
              <Col>
                <View style={{marginLeft: 80}}>
                  <FlatList
                  data={initialTopics}
                  renderItem={renderTopics}
                  numofColumns={3}
                  refreshControl={
                    <RefreshControl
                    onRefresh={getTopicsByUser}
                    refreshing={loading}
                    />
                  }
                  />
                </View>
              </Col>
            </Row>
              <Row>
              <Col style={{borderWidth:1, borderColor:'#146ECB', padding:10, alignItems:'center', marginHorizontal:wp("2%"), marginTop:5}}>
                  <TouchableOpacity onPress={()=>setNumOfColumns(totalTopics)}>
                      <Text style={{fontSize:20, color:'#146ECB'}}>Show more</Text>
                  </TouchableOpacity>
              </Col>
            </Row> 
                  </>
              )
            : <Row>
                <Col>
                <View style={{marginLeft: 80}}>
                  <FlatList
                  data={topics}
                  renderItem={renderTopics}
                  numofColumns={3}
                  refreshControl={
                    <RefreshControl
                    onRefresh={getTopicsByUser}
                    refreshing={loading}
                    />
                  }
                  />
                </View>
              </Col>
            </Row>
          }
            <Row>
              <Col>
                <View>
                    <FlatList
                    data={List}
                    renderItem={renderRow}
                    refreshControl={
                        <RefreshControl onRefresh={getProfiles} refreshing={loading} />
                    }
                    key={List.id}
                    />
                </View>
              </Col>
            </Row>
          </View>
        </ScrollView>
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
    </View>
  );
}
