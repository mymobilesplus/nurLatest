import AsyncStorage from "@react-native-community/async-storage";
import refreshAccessToken from "./refreshToken";
export const requestData = async (endpoint,request,method="POST") =>{
    // alert('gelll')
    // console.log('request',request);
    // let token = request.token;
    // // console.log('token',token);

    // let refreshToken = request.refreshToken;
    // console.log('refreshToken',refreshToken);
    let user_dt = await AsyncStorage.getItem('loginData');
    let user_data = JSON.parse(user_dt);
    console.log('user_data',user_data);
    return new Promise((resolve, reject)=>{
        console.log('url fetching data', endpoint);
        fetch( endpoint, { 
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user_data.accessToken,
                'refreshToken': user_data.refreshToken
            },
            body: JSON.stringify(request)
        }).then((resp)=>{

            if(resp.status==200){
                resolve(resp);
            }
            if(resp.status==401){
                console.log('resp', JSON.stringify(resp,null,4));
                // alert('token expired');
                console.warn('got status code 401');
                refreshAccessToken().then(async()=>{
                    let user = await AsyncStorage.getItem('loginData');
                    let data = JSON.parse(user);
                    fetch( endpoint, { 
                        method: method,
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + data.accessToken,
                            'refreshToken': data.refreshToken
                        },
                        body: JSON.stringify(request)
                    }).then((response)=>{
                        resolve(response);
                    })
                })
            }
        });
    })
}