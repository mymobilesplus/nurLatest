import React,{useState, useEffect} from 'react'
import { View, Text,TouchableOpacity,Image, Alert, Modal } from 'react-native'
import {Styles} from "./Style/_Community"
import {theme,images} from "../../constants"
import Icon from 'react-native-vector-icons/EvilIcons';
import {Button,Input,IndexPath,Select,SelectItem,Text as Texts} from "@ui-kitten/components"
import AntDesign from "react-native-vector-icons/AntDesign"
import ImagePicker from 'react-native-image-picker';
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from "react-native-responsive-screen"
import AsyncStorage from '@react-native-community/async-storage'
import {connect} from "react-redux"
import * as action from "../../redux/actions/_MedicalRecord"
import MedicalRecordsService from '../../services/MedicalRecordsService'
import ClosingHeader from "../../components/header/ClosingHeader"
import { IMAGE_URL } from '../../API_URI'
import { Container, Content } from 'native-base';
import { ActivityIndicator } from 'react-native-paper';
import CommunityService from '../../services/CommunityService';


const data = [
    'Developer',
    'Designer',
    'Product Manager',
  ];

  const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
const {icons}=images
const AddNewArticle = (props) => {
    const { navigation } = props;
    const {icons,loader}=images
    const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
    const [file,setFile]=useState([])
    const [text,setText]=useState('')
    const [articleDescription,setArticleDescription]=useState('')
    const [recordID, setRecordID]=useState(0)
    const [update,setUpdate]=useState(false)
    const [data, setData] = useState([]);
    const [loading,setLoading]=useState(false)
    const [displayValue, setDisplay] = useState()
    const [recordLoading, setRecordLoading] = useState(false)
    const [imageloading, setImageLoading] = useState(true)
    const [newTopic, setNewTopic] = useState(false)
    const [topicname, setNewTopicName] = useState('')
    const [topicDescription,setTopicDescription]=useState('')
    const [visible, setVisible] = React.useState(0);

    useEffect(()  =>{
      getProps();
    }, []);

    useEffect(()=>{
        if(data.length>0){
            let selectedVal = data.filter(d=>{
            return d.topic.id ==  selectedIndex.row;
            });
            if(selectedVal.length>0){
                setDisplay(selectedVal[0])
            }
            else{
                setDisplay(data[0])
            }
        }
    }, [selectedIndex, data])

    const getProps = () => {
      let service = new CommunityService();
      AsyncStorage.getItem('loginData').then(user=>{
        user = JSON.parse(user);
        AsyncStorage.getItem("lang").then(lang=>{
          if(lang == null){
            lang = 1;
          }
          service.get({LanguageId: lang, token: user.accessToken })
            .then(res=>res.json()).then(res=>{
            setData(res.topics)
            
          })
        })
      })
      
      if(props.route.params.familyMember != undefined){
        setFamilyMember(props.route.params.familyMember.id)
      }
      if(props.route.params.medicalRecord != undefined){
        props.navigation.setOptions({ headerTitle: () => <ClosingHeader {...props}  title="Edit Medical Record" /> });
        let record = props.route.params.medicalRecord;
        getRecord(record)
      }
      else{
        props.navigation.setOptions({ headerTitle: () => <ClosingHeader {...props}  title="Create New Article" /> });
      }
    }

    const updateRecord = (record) =>{
      setText(record.description)
      setFamilyMember(record.familyMemberID)
      if(record.medicalRecordTypeSD == null){
        setSelectedIndex(new IndexPath(0));
      }
      else{
        setSelectedIndex(new IndexPath(record.medicalRecordTypeSD))
      }
      let f = record.files
      f.map(fi=>{
        fi.uri = IMAGE_URL + fi.file_src
      })
      setFile(f)
      setUpdate(true)
      setRecordID(record.id)
    }
  
    const getRecord = async(record)=>{
      if(record!=null){
          setRecordLoading(true)
          let r = record;
          let api = new MedicalRecordsService();
          let user = await AsyncStorage.getItem("loginData");
          let lang = await AsyncStorage.getItem("lang")
          if(lang == null){
              lang = 1;
          }
          else{
              lang = JSON.parse(lang);
          }
          user = JSON.parse(user);
          let req = {
              ID: r.id,
              LanguageId: lang,
              token: user.accessToken
          }
          let res = await api.getById(req).then(res=>res.json());
          updateRecord(res.medicalRecord)
          setRecordLoading(false)
      }
    }

    const LoadingIndicator = (props) => (
      <View style={ Styles.indicator}>
       <Image source={loader.white}  />
      </View>
    );

    const renderOption = (title, index) => {
      return ( 
        <SelectItem key={index}
        title={title.topic.title + " - " + title.articlesCount + " Articles"}/>
      );
    };


      const  openImageLibrary=()=>{
        ImagePicker.launchImageLibrary(options, (response) => {
          console.log("Selected File: ",response)
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {
            let f = [...file];
            const source = { 
              FileName: response.fileName, 
              FileSize: response.fileSize, 
              FileType: response.type,
              FileAsBase64: response.data
              };
            f.push({File: source, uri: response.uri})
            setFile(f)
            setVisible(false)
          }
        });
      }

      const openCamera=()=>{
        ImagePicker.launchCamera(options, (response) => {
          console.log("Selected File: ",response)
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {
            let f = [...file];
            const source = { 
              FileName: response.fileName, 
              FileSize: response.fileSize, 
              FileType: response.type,
              FileAsBase64: response.data  
            };
            f.push({File: source, uri: response.uri})
            setFile(f)
            setVisible(false)
          }
        });
    }

    const pickImage = () =>{
        Alert.alert("Select Image", "From:", [
            {
                text: 'Camera', onPress: openCamera
            },
            {
                text: 'Gallery', onPress: openImageLibrary
            }
        ] )
    }
      
    const createNewTopic = async() => {
        let user = JSON.parse(await AsyncStorage.getItem('loginData'));
        let lang = JSON.parse(await AsyncStorage.getItem("lang"));
        if(lang == null){
            lang = 1
        }
        let api = new CommunityService()
        let Topic = {
            Title: topicname,
            Description: topicDescription
        }
        let res = await api.createTopic({Topic, token: user.accessToken, refreshToken: user.refreshToken}).then(res=>res.json())
        setLoading(false)
        return res
    }

    const createArticle = async() => {
        setLoading(true)
        let topic = displayValue.topic;
        if(newTopic){
            topic = await createNewTopic();
        }
        
        
        AsyncStorage.getItem('loginData').then(user=>{
          user = JSON.parse(user);
          let auth = new CommunityService();
          console.warn("test", file)
          let image = {}
          try {
            if (file[0].File == undefined){
              image = null
            } else 
            { image =  file[0].File}
          } catch (error) {
            console.warn(error)
          }
          
          let formData = {
            Article: {
                TopicSD: topic.id,
                Title: text,
                Description: articleDescription,
                Image: image ,
                UserId: user.currentUserID,
            },
            token: user.accessToken,
            refreshToken: user.refreshToken
        }; 
          console.log("Form Data: ",JSON.stringify(formData))

          if(update){
            formData.Article.ID = recordID
            auth.updateArticle(formData).then(res=>res.json()).then(res=>{
              setLoading(false)
              if(res.id == 0){
                alert("Some Backed Error Check\n"+res.returnStatus.returnMessage);
              }
              else{
                alert("Article Updated Successfully!")
              }
              
            })
          }
          else{
            auth.createArticle(formData).then(res=>res.json()).then(res=>{
              setLoading(false)
              if(res.id == 0){
                alert("Some Backed Error Check\n"+res.returnStatus.returnMessage);
              }
              else{
                alert("Article Created Successfully!")
                props.navigation.navigate('Communities');
              }
              
            })
          }
        })
    }

      const removeImage = (image) => {
      
        let i = file.indexOf(image)
        let f = [...file];
        f.splice(i, 1);
        setFile(f);
      }
    
    const updateIndex = (index) => {
        if(index>1){
            setNewTopic(false); 
            setSelectedIndex(new IndexPath(data[index - 2].topic.id))
        }
        else{
            setNewTopic(true)
            setDisplay({topic: {title: "New Topic"}})
        }
    }

    return (
      <Container>
        {recordLoading && (
          <View
            style={{
              padding: 20,
              borderBottomWidth: 1,
              borderBottomColor: '#ccc',
              alignContent: 'center',
              flex: 1,
              justifyContent: 'center',
            }}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
          </View>
        )}
        {!recordLoading && (
          <Content>
            <View style={Styles.mainContainer}>
              <View style={Styles.topContainer}>
                {data.length > 0 && displayValue != undefined && (
                  <View style={Styles.fieldContainer}>
                    <Text style={Styles.inputBoxLabel}>Select Topic</Text>
                    <Select
                      value={displayValue.topic.title}
                      selectedIndex={selectedIndex}
                      onSelect={updateIndex}>
                      <SelectItem title={'Create New Topic'} />
                      {data.map(renderOption)}
                    </Select>
                  </View>
                )}
                {data.length == 0 && displayValue == undefined && (
                  <View style={Styles.fieldContainer}>
                    <Text style={Styles.inputBoxLabel}>Select Topic</Text>
                    <Select value="Loading...">
                      <SelectItem title={'Loading...'} />
                    </Select>
                  </View>
                )}
                {newTopic && (
                  <View style={Styles.fieldContainer}>
                    <Text style={Styles.inputBoxLabel}>Name your new topic</Text>
                    <Input
                      numberOfLines={1}
                      multiline={true}
                      textStyle={{color: theme.colors.black}}
                      onChangeText={(text) => setNewTopicName(text)}
                      style={Styles.inputBox}
                      value={topicname}
                      type="basic"
                    />
                  </View>
                )}
                <View style={Styles.fieldContainer}>
                  <Text style={Styles.inputBoxLabel}>
                    Add Title to your Article
                  </Text>
                  <Input
                    numberOfLines={1}
                    textStyle={{
                      color: theme.colors.black,
                    }}
                    onChangeText={(text) => setText(text)}
                    style={Styles.inputBox}
                    value={text}
                    type="basic"
                  />
                </View>
                <View style={Styles.fieldContainer}>
                  <Text style={Styles.inputBoxLabel}>Describe your article</Text>
                  <Input
                    numberOfLines={7}
                    textStyle={{color:theme.colors.black,alignItems:'flex-start',justifyContent:'flex-start',textAlignVertical: "top"}}
                    onChangeText={(text) => setArticleDescription(text)}
                    style={[Styles.inputBox,{alignItems:'flex-start',justifyContent:'flex-start',textAlignVertical: "top"}]}
                    value={articleDescription}
                    type="basic"
                    multiline={true}
                  />
                </View>
                <View style={Styles.fieldContainer}>
                  <Text style={Styles.inputBoxLabel}>Add File or Photo</Text>
                  <View style={{flexDirection: 'row'}}>
                    <View style={Styles.addFileContainer}>
                      <TouchableOpacity onPress={()=>setVisible(true)}>
                        <AntDesign
                          name="addfile"
                          color={theme.colors.primary}
                          size={30}
                        />
                      </TouchableOpacity>
                    </View>
                    {file != '' &&
                      file.map((f) => {
                        return (
                          <TouchableOpacity
                            onPress={() => removeImage(f)}
                            style={Styles.addFileContainer}>
                            <Image
                              onLoadEnd={() => setImageLoading(false)}
                              source={f}
                              style={Styles.file}
                            />
                            <Icon
                              name="close"
                              style={{position: 'absolute', top: 10, right: 5}}
                            />
                            {imageloading && (
                              <ActivityIndicator
                                size="small"
                                color={theme.colors.primary}
                                style={{position: 'absolute', top: '50%'}}
                              />
                            )}
                          </TouchableOpacity>
                        );
                      })}
                  </View>
                </View>
              </View>
            </View>
            <View style={Styles.buttonContainer}>
              <View>
                <Button
                  onPress={() => navigation.goBack()}
                  appearance="outline"
                  status="basic"
                  style={Styles.buttonForm}
                  size="large"
                  block>
                  Cancel
                </Button>
              </View>
              <View>
                <Button
                  accessoryLeft={() => (loading ? LoadingIndicator() : null)}
                  onPress={!loading ? createArticle : null}
                  appearance="outline"
                  status="primary"
                  style={Styles.buttonForm}
                  disabled={text != '' ? false : true}
                  size="large"
                  block>
                  {!loading ? (update ? 'Update' : 'Create') : ''}
                </Button>
              </View>
            </View>
          </Content>
        )}
            <Modal transparent={true} visible={visible} animated={true} onRequestClose={()=>setVisible(false)} >
                <View style={{ flex:1, backgroundColor:'rgba(0,0,0,0.3)'}}>
                    <View style={{ position:"absolute", bottom:0, height:hp("20%"), width:wp("90%"),margin:20, backgroundColor:theme.colors.white, alignItems:"center", justifyContent: 'center'}}>
                        <Text style={{alignSelf:"center", position:"absolute" , top:0, marginTop:10, fontSize:20}}>Add Photo</Text>
                        <TouchableOpacity onPress={()=>setVisible(false)} style={{alignSelf:"flex-end", marginTop:10}} >
                            <Icon name="close" style={{alignSelf:"center", color: '#000', fontSize: 32}} />
                        </TouchableOpacity>
                        <View style={{flexDirection:"row", marginTop:20, alignContent:"space-between", justifyContent:"center", height:hp("15%")}}>
                            <TouchableOpacity onPress={openImageLibrary} style={{flex:1, marginVertical:25, marginLeft:wp("15%") , marginRight:13, backgroundColor:"#F8F8FA", borderRadius:28, justifyContent:"center"}} >
                                <Icon name="image" style={{alignSelf:"center", color: '#000', fontSize: 32}} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={openCamera} style={{flex:1, marginVertical:25, marginRight:wp("15%"), backgroundColor:"#F8F8FA", borderRadius:28, justifyContent:"center"}} >
                                <Icon name="camera" style={{alignSelf:"center", color: '#000', fontSize: 32}} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
      </Container>
    );
  };

const mapStateToProps=(state)=>{
  return{
      _DEVICE_ID:state.DeviceInfoReducer._DEVICE_ID,
      loading:state.LoadingReducer.loading,
  }
}

const mapDispatchToProps=(dispatch)=>{
  return{
      getMedicalRecords:(formdata)=>dispatch(action.CreateUserMedicalRecord(formdata))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(AddNewArticle)
