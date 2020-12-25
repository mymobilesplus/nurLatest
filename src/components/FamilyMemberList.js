import React from 'react';
const { TouchableOpacity, Text, Image } = require("react-native")
const { View } = require("native-base")


export default renderFamilyMembers = ({item, index, props, Styles, navigate}) => {
    // console.warn(props.route.params.giveAccess)
    return(
        <TouchableOpacity key={index} onPress={()=>navigate({item})}>
            <View style={Styles.memberBox} >
                <View>
                    <Image style={Styles.avatar} source={item.img_src} />
                </View>
                <View>
                    <Text style={Styles.memberName}>{item.name}</Text>
                    {/* {props.route.params.giveAccess && <Text style={Styles.giveAccess}>Give access</Text>} */}
                </View>
            </View>
         </TouchableOpacity>
    )
}