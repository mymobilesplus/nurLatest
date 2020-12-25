import React, { Component } from 'react'
import { Text, View ,ImageBackground,SafeAreaView,Image} from 'react-native'
import Carousel,{Pagination} from "react-native-snap-carousel"
import {images,theme} from "../../constants"
import {heightPercentageToDP,widthPercentageToDP} from "react-native-responsive-screen"
import {Styles} from "./Style/Style"
import LinearGradient from "react-native-linear-gradient"
import {Button} from "@ui-kitten/components"
import {connect} from "react-redux"
import * as action from "../../redux/actions/DeviceInfo"
import * as RootNavigation from "../../navigation/RootNavigation"
import AsyncStorage from '@react-native-community/async-storage'
import langjson from "../../constants/lang.json"
import AuthService from '../../services/AuthService'
import refreshAccessToken from '../../services/refreshToken'

const HEIGHT=heightPercentageToDP('100%')
const WIDTH=widthPercentageToDP('100%')

const {slider,logo}=images   
let language = 1    
let getLang = ()=>{
    AsyncStorage.getItem("lang").then(lang=>{
        if(lang!=null){
            language = lang
        }
    })
}
class Welcome extends Component {
    
    constructor(props) {
        super(props)
    
        this.state = {
            activeIndex:0,
            carouselItems: [
            {
                title:langjson.lang[language-1].welcometitle1,
                image: slider.slider1,
            },    
            {
                title:"Tracking your daily symptoms can help you and your doctors make better decisions",
                image: slider.slider2,
            },
            {
                title:"Find a doctor",
                image: slider.slider3,
            },
            {
                title:"Set your medical reminders",
                image: slider.slider4, 
            },
            {
                title:"Be part of Nurse Nova Community",
                image: slider.slider5,
            },
          ]
        }
    }
    get pagination () {
        const { carouselItems, activeIndex } = this.state;
        
        return (
            <Pagination
              dotsLength={carouselItems.length}
              activeDotIndex={activeIndex}
              containerStyle={Styles.dots}
              dotStyle={{
                  width: 15,
                  height: 15,
                  borderRadius: 10,
                  marginHorizontal: 8,
                  backgroundColor: theme.colors.primary
              }}
              inactiveDotStyle={{
                backgroundColor: "#FFFFFF"
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={1}

            />
        );
    }

    renderButtons=()=>{
        const {navigation}=this.props
        
        return(
        <View>
            <View style={Styles.button}>
            <Button appearance="outline" status="info" onPress={()=>navigation.navigate("CreateAccount")}  >{langjson.lang[language-1].welcomestartbutton}</Button>
      </View>
      <View style={Styles.button}>
            <Button appearance="outline" onPress={()=>navigation.navigate('LoginOption')} status="info" >{langjson.lang[language-1].welcomeloginbutton}</Button>
      </View>
      </View>
        )
    }
    
    _renderItem({item,index}){
        return (
        <ImageBackground source={item.image} style={Styles.imageBackground} imageStyle={Styles.imageBackground}>
            <LinearGradient style={Styles.sliderContainer} start={{x: 0.0, y: 0.0}} end={{x: 0.0, y:1.5}} colors={[ 'transparent','rgba(0,0,0,0.8)',]}>
               <View style={Styles.logoContainer}>
               <Image source={logo.logo} style={Styles.logo} />
               </View>
                <View style={Styles.textContainer}>
                <Text style={Styles.sliderText} >{item.title}</Text>

                </View>
            </LinearGradient>
        </ImageBackground>

        )
    }


    componentDidMount(){
        // alert('jhjlkjvghvhlhjkhvjh')
        getLang()
        this.props.getDeviceInfo()
        AsyncStorage.getItem("loginData").then(user=>{
            if(user != null){
                let auth = new AuthService();
                // refreshAccessToken().then(()=>{
                    RootNavigation.navigate("Top Tab")
                // })
            }
        })
    }

 
    render() {
        return ( 
            <SafeAreaView style={{flex: 1, }}>
            <View style={{ flex: 1, justifyContent: 'center', width:WIDTH,zIndex:-999}}>
                <Carousel
                  layout={"tinder"}
                  ref={ref => this.carousel = ref}
                  data={this.state.carouselItems}
                  sliderWidth={WIDTH}
                  itemWidth={WIDTH}
                  renderItem={this._renderItem}
                  onSnapToItem = { index => this.setState({activeIndex:index}) } />
                  <View style={Styles.pagination}>
                        {this.pagination}
                        {this.renderButtons()}

                  </View>

            </View>
          </SafeAreaView>
        )
    }
}


const mapStateToProps = state=>{
    return{

    }
}

const mapDispatchToProps=dispatch=>{
    return{
        getDeviceInfo:()=>dispatch(action.getDeviceInfo())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Welcome)