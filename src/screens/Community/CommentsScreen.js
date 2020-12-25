import React, { useEffect } from 'react'
import { View, Text,Image,TouchableOpacity, Share, Alert, FlatList, StyleSheet} from 'react-native'
import {Styles} from "./Style/_Community"
import {theme,images} from "../../constants"
import {Layout, Popover} from "@ui-kitten/components"
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from "react-native-responsive-screen"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Row, Col, Icon } from 'native-base';
import { ActivityIndicator } from 'react-native-paper';
import TimeAgo from 'react-native-timeago';
import CommunityService from '../../services/CommunityService';
import AsyncStorage from '@react-native-community/async-storage';
import CommunityStackHeader from '../../components/header/CommunityStackHeader';
import Entypo from "react-native-vector-icons/Entypo"
import { IMAGE_URL } from '../../API_URI';

const{icons}=images

export default function CommunityDetail(props) {
    const [visible, setVisible] = React.useState(0);
    const [List, setProfileList] = React.useState([]);
    const [loader, setLoding]= React.useState(true);

    useEffect(() => {
        // code to run on component mount
        getByArticle()
      }, [props])

      const getByArticle = async() =>{
        props.navigation.setOptions({
            headerTitle: () => (
              <CommunityStackHeader
                {...props}
                title="Fetching Comments..."
              />
            ),
          });
          setLoding(true)
          setProfileList(props.route.params.Comments);
          props.navigation.setOptions({
            headerTitle: () => (
              <CommunityStackHeader
                {...props}
                title="Community"
              />
            ),
          });
          setLoding(false)
        }

        const share = async(item) => {
            setLoding(true)
            let user = await AsyncStorage.getItem("loginData");
            let lang = await AsyncStorage.getItem("lang")
            if(lang!=null){
                lang = JSON.parse(lang)
            }
            else{
                lang = 1
            }
            
            if(user!=null){
                user = JSON.parse(user);
                let req = {UserId: user.currentUserID, LanguageId: lang, refreshToken: user.refreshToken, token: user.accessToken, ids: [item]}
                let api = new CommunityService();
                api.share(req).then(res=>res.json()).then(res=>{
                    setLoding(false)
                    let returnStatus = res.returnStatus;
                    if(returnStatus.returnCode == 200){
                        Share.share({
                            message: user.userSession.fullName + ' shared you an article. Check at ' + res.pdfLink,
                            url: res.pdfLink
                        })
                    }
                    else{
                        Alert.alert("Error", returnStatus.returnMessage, [{
                            text: "Ok"
                        }])
                    }
                })
            }
        }

    const menuIcon=(id)=>(
        <Entypo name="dots-three-vertical" size={24} color={theme.colors.dark}  onPress={() =>{console.warn("ids",id); setVisible(id)}} />
    )

    const renderAddComment=()=>{
        return(
            <Button title="send"
            accessoryLeft={() => (loading ? LoadingIndicator() : null)}
            onPress={!loading ? submitComment : null}>
            </Button>
        )
    }
    
    const renderDrowMenu=(id)=>{
        return(
            <View>
            <Layout  level='1'>
                <Popover
                    backdropStyle={Styles.backdrop}
                    visible={visible == id}
                    anchor={()=>menuIcon(id)}
                    onBackdropPress={() => setVisible(false)}>
                    <Layout style={{elevation:4}}>
                        <View>
                            <Text onPress={()=>share(id)} style={{ padding: 10, paddingHorizontal: 10, fontSize: 16}}>
                                <Icon name="zap" type="Feather" style={{fontSize: 20}}></Icon> {' '}
                                Report this
                            </Text>
                        </View>
                    </Layout>
                </Popover>
            </Layout>
            </View>
        )
    }

    const renderRow = ({item, index}) =>{
        console.warn("comments",item)
        return (
            <View style={{ marginHorizontal:8,marginVertical:4, padding:10, backgroundColor:theme.colors.white }}>
                <View style={{marginTop:7}}>
                    <Row>
                        <Col>
                    <Text style={{fontSize:16, color:theme.colors.grey}}>Comment By</Text>
                        </Col>
                    <Col  style={{flex:0.1, alignItems:'flex-end'}}>
                        <TouchableOpacity>
                            {renderDrowMenu(item.id)}
                        </TouchableOpacity>
                    </Col>
                    </Row>
                    <Row>
                        <Col style={{flex:0.1}}>
                            <View style={{ borderRadius:14, height:28, width:28, alignSelf:"center",backgroundColor:"#F5F5F5"}}  />   
                        </Col>
                        <Col style={{marginLeft:5, alignItems:'flex-start',justifyContent:"center", flex:0.4}}>
                            <View style={{flexDirection:"row"}}>
                                <Text style={{ color:'#146ECB'}}>{item.userFullName} . </Text>
                                    <TimeAgo time={item.dateOfComment}></TimeAgo>
                            </View>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Text style={{paddingLeft:40,fontSize:18,marginTop:10,color:"#4B4F56"}}>
                                {item.comment}
                            </Text>
                        </Col>
                    </Row>

                {item.img_src &&
                    <Row>
                        <Col style={{alignItems:"center"}}>
                        <Image source={{uri: IMAGE_URL + item.img_src}}  style={Styles.addPhoto}  />
                        </Col>
                    </Row>}
                </View>
            </View>
        )
    }

    return (
        <View style={{ height: '98%', backgroundColor: '#fff',borderTopLeftRadius:10, borderTopRightRadius:10,backgroundColor:"#F5F5F5"} }>
            {loader &&
                <ActivityIndicator size="large" color={theme.colors.primary} />
            }
            {!loader && 
            <KeyboardAwareScrollView contentOffset={120}>
                {List.length !== null && List.length > 0 &&
                    <FlatList
                        data={List} 
                        renderItem={renderRow}
                        /> 
                }
                {List.length !== null && List.length == 0 &&
                    <View style={Styles.heartContainer}>
                        <Image source={icons.heart} style={Styles.heart}  />
                        <Text style={Styles.text}>No Comments, Be the first to comment!</Text>
                    </View>
                }
                
            </KeyboardAwareScrollView>
        }
        </View>
    
    )
}
const styles = StyleSheet.create({
    container:{
        width:wp('100%'),
        height:wp('16%'),
        overflow:'hidden',
    },
    mainContainer: {
        flex:1,
        backgroundColor:theme.colors.white,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems: "center",
        paddingHorizontal:wp('4%'),
        borderBottomWidth:1,
        borderBottomColor:theme.colors.grey
    }})