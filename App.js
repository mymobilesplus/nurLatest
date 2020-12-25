
import React,{Component} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from "@react-navigation/native"
import createHomeStack from "./src/navigation/StackNavigator"
import { ApplicationProvider} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import {theme as Theme} from "./src/constants"
import { default as theme } from "./custom-theme.json"; 
import { default as mapping } from './mapping.json'; 
import { navigationRef } from './src/navigation/RootNavigation';
import { Root } from 'native-base';
import SplashScreen from 'react-native-splash-screen';   

class App extends Component {

  componentDidMount = () => {
    // alert('jghjhghh')
     SplashScreen.hide();
  };  

  render(){
    return(
      <>
      <StatusBar backgroundColor={Theme.colors.primary} barStyle="light-content" />
      <Root>
          <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}  customMapping={mapping} >
              <NavigationContainer ref={navigationRef}>
                {createHomeStack()}
              </NavigationContainer>
          </ApplicationProvider>
      </Root>
    </>
    )
  }
}




export default App