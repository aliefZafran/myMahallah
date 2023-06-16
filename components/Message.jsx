import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { COLORS } from '../constants'

const Message = ({currentMatricNo, item}) => {
  const nav = useNavigation();
  

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.mssgContainer} onPress={() => {nav.navigate('Chat', {senderMatricNo: currentMatricNo, recipientMatricNo: item.matricNo})}}>
        <View style={styles.avatar}>
          <Image style={styles.icon} source={{ uri: item.pfp }} />
        </View>
        <View style={styles.text}>
            <Text style={styles.user}>{item.name.split("bin")[0].trim()}</Text>
            {/* <Text style={styles.mssg}>{item.content.substring(0, 25) + "..."}</Text> */}
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default Message

const styles = StyleSheet.create({
    container:{
        width: '100%',
        borderBottomWidth:1,
        borderBottomColor: COLORS.primary,
        padding:10,
    },
    mssgContainer:{
        flexDirection:'row',
        // borderWidth:1,
        marginVertical:12,
    },
    avatar:{
        width:'20%',
        justifyContent:'center',
        alignItems: 'center',
    },
    icon:{
      width: 70,
      height: 70,
      borderWidth: 2,
      borderColor: COLORS.gray,
      borderRadius: 100,
    },
    text:{
        flex:1,
        justifyContent: 'center',
        marginLeft:18,
        width:'100%',
    },
    user:{
      fontSize:18,
      fontWeight:'bold',
      // marginTop:12,
    },
    mssg:{
      fontSize:16,
      marginTop:9,
    },
})