import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {images, theme} from '../../constants';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import * as RootNavigation from '../../navigation/RootNavigation';
import {Input} from '@ui-kitten/components';
import Filterbytopic from '../../screens/Community/Filterbytopic';
import AsyncStorage from '@react-native-community/async-storage'
const {icons, logo} = images;

export default function CommunityStackHeader(props) {
  const searchInput = useRef();
  const [search, setSearch] = useState(false);
  const [text, setText] = useState('');
  const [language, setLang, updatelang] = useState(1)

  useEffect(() => {
    getLang()
    setSearch(false);
    setText('');
  }, [props.filterRecords]);
  useEffect(() => {
    if (searchInput.current != undefined) {
      searchInput.current.focus();
    }
  }, [search]);
  const updateSearch = () => {
    if (!search) {
      // searchInput.current.focus();
    }
    setSearch(!search);
    setText('');
  };
  const updateText = (text) => {
    setText(text);
    props.filterRecords(text, props.records);
  };
  let getLang = ()=>{
    AsyncStorage.getItem("lang").then(lang=>{
        if(lang!==null){
            setLang(lang)
        }
    })
}

  return (
    <>
      <StatusBar
        backgroundColor={theme.colors.primary}
        barStyle="light-content"
      />
      <View style={styles.container}>
        <LinearGradient
          style={styles.mainContainer}
          colors={[theme.colors.primary, "#3BBFE3"]}
          start={{x: 0.0, y: 0}}
          end={{x: 1.8, y: 1.0}}>
          {!search && (
            <View style={styles.leftContainer}>
              <TouchableOpacity onPress={() => props.navigation.goBack()}>
                <Image source={language == 1 ? icons.backIcon : icons.backIcon_ar} style={styles.backIcon} />
              </TouchableOpacity>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{props.title}</Text>
              </View>
              {props.useSearch && 
              <TouchableOpacity onPress={updateSearch}>
                <Image source={icons.search} style={styles.backIcon} />
              </TouchableOpacity>
              }
            </View>
          )}
          {search && (
            <View style={styles.leftContainer}>
              <TouchableOpacity onPress={() => setSearch(false)}>
                <Image
                  source={language == 1 ? icons.backIcon : icons.backIcon_ar}
                  style={[styles.backIcon, {color: theme.colors.green}]}
                />
              </TouchableOpacity>
              <View style={styles.titleContainer}>
                <Input
                  placeholder="Search..."
                  placeholderTextColor={theme.colors.grey}
                  numberOfLines={1}
                  ref={searchInput}
                  textStyle={{color: theme.colors.grey}}
                  onChangeText={updateText}
                  value={text}
                  style={styles.searchBar}
                />
              </View>
            </View>
          )}
          <View style={StyleSheet.leftContainer}>
              <TouchableOpacity
                style={{flex: 1}}
                onPress={() => props.navigation.navigate('Filterbytopic')}>
                <Image source={icons.filter} style={styles.filterIcon} />
              </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    height: wp('16%'),
    backgroundColor: 'red',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp('4%'),
    paddingVertical: wp('3%'),
  },

  backIcon: {
    resizeMode: 'contain',
    height: wp('9%'),
    width: wp('9%'),
    alignSelf: 'flex-end',
  },
  filterIcon: {
    resizeMode: 'contain',
    height: wp('9%'),
    width: wp('9%'),
    alignSelf: 'flex-end',
  },
  leftContainer: {
    flex: 1,
    width: wp('50%'),
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    color: theme.colors.white,
    fontFamily: 'OpenSans-Bold',
    fontSize: wp('5%'),
    paddingLeft: wp('3%'),
  },

  searchBar: {
    flex: 1,
    width: '90%',
    color: '#fff',
    marginLeft: 10,
  },
});
