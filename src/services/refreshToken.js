const { default: AsyncStorage } = require("@react-native-community/async-storage");
// const { default: AuthService } = require("./AuthService");
import ID from '../constants/constant.json';
import AuthService from './AuthService';
const refreshAccessToken = async ()=>{

    let auth = new AuthService();
    let refreshToken = ""
    let user = await AsyncStorage.getItem('loginData');
    if (user != null) {
        user = JSON.parse(user);
        refreshToken = user.refreshToken
    }
    return auth.login({grant_type:"refresh_token",client_id: ID.clientId, refresh_token: refreshToken}).then(res=>res.json()).then(async res=>{
        if(res.message!=null){
            console.warn("res",res)
            return;
        }
        user.accessToken = res.accessToken
        user.refreshToken = res.refreshToken
        console.warn("tokenrefreshed",res)
        await AsyncStorage.setItem("loginData", JSON.stringify(user)).then(()=>{
            console.warn("dist",res)
        });
    })
}
export default refreshAccessToken;