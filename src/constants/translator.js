import ReactNative from 'react-native';
import langjson from './lang.json';
export const Translator = (key) =>{
    if(ReactNative.I18nManager.isRTL){
        return langjson.lang[1][key]
    }
    else{
        return langjson.lang[0][key]
    }
}