import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {Styles} from './Style/_Community';
import {theme, images} from '../../constants';
import {Row, Col, Container} from 'native-base';
import {useFocusEffect} from '@react-navigation/native';
import CommunityService from '../../services/CommunityService';
import AsyncStorage from '@react-native-community/async-storage';
import {IMAGE_URL} from '../../API_URI';
import CommunityStackHeader from '../../components/header/CommunityStackHeader';

const {icons} = images;

export default function CommunityTopics(props) {
  const [List, setProfileList] = React.useState([]);
  const [loader, setLoding] = React.useState(true);

  useEffect(() => {
    // code to run on component mount
    // getProfiles();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getProfiles();
    }, []),
  );
  const getProfiles = async () => {
    props.navigation.setOptions({
      headerTitle: () => (
        <CommunityStackHeader
          {...props}
          filterRecords={null}
          title="Fetching Topics..."
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
      api
        .get({
          UserId: user.currentUserID,
          LanguageId: lang,
          token: user.accessToken,
        })
        .then((res) => res.json())
        .then((res) => {
          setLoding(false);
          if (res.topics != undefined) {
            let records = res.topics;
            setProfileList(records);
            props.navigation.setOptions({
              headerTitle: () => (
                <CommunityStackHeader
                  {...props}
                  records={records}
                  filterRecords={filterRecords}
                  title="Community"
                  useSearch={true}
                />
              ),
            });
          }
        });
    }
  };


  const filterRecords = (text, records) => {
    let list = records.filter((f) => {
      return f.topic.title.toLowerCase().includes(text.toLowerCase());
    });
    setProfileList(list);
  };

  const renderRow = ({item, index}) => {
    return (
      <View
        style={{borderWidth: 1, borderColor: '#ccc', margin: 10, padding: 10}}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('CommunitiesArticleByTopic', {topic: item});
          }}>
          <Row>
            <Col>
              <Text style={{fontSize: 18, marginTop: 10}}>
                {item.topic.title}
              </Text>
            </Col>
            <Col style={{alignItems: 'flex-end'}}>
              <Image
                source={{uri: IMAGE_URL + item.topic.imgSrc}}
                style={Styles.addPhoto}
              />
            </Col>
          </Row>
        </TouchableOpacity>
        <Row>
          <Col style={{flex: 0.4}}>
            <Text>Total Articles</Text>
          </Col>
          <Col style={{alignItems: 'flex-start', flex: 1}}>
            <Text style={{color: 'blue'}}>{item.articlesCount}</Text>
          </Col>
        </Row>
      </View>
    );
  };
  return (
    <Container style={{justifyContent: 'center'}}>
      {List.length > 0 && (
        <FlatList
          data={List}
          renderItem={renderRow}
          refreshControl={
            <RefreshControl onRefresh={getProfiles} refreshing={loader} />
          }
        />
      )}
      {loader && List.length == 0 && (
        <ActivityIndicator size="large" color={theme.colors.primary} />
      )}
      {List.length == 0 && !loader && (
        <View style={Styles.mainContainer}>
          <View style={Styles.heartContainer}>
            <Image source={icons.heart} style={Styles.heart} />
            <Text style={Styles.text}>No Record</Text>
          </View>
        </View>
      )}
    </Container>
  );
}
