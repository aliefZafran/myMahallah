<<<<<<< HEAD
import { StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native'
import React,{useState} from 'react'
import { COLORS } from '../../constants'
import * as Clipboard from 'expo-clipboard'

const Contact = () => {
  const [copiedText, setCopiedText] = useState(false)

  const copyToClipboard = () => {
    Clipboard.setStringAsync('text copied')
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 1000);
  }
  const handleCall = () => {
    const phoneNumber = '+629999999999'; // replace with the actual phone number
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <View style={styles.main}>
      <View style={styles.mahallah}>
        <Text style={styles.mahallahName}>Mahallah Uthman</Text>
      
      <View style={styles.mahallahAddress}>
        <Text style={styles.address}>{`International Islamic University Malaysia\nJalan Gombak, 53100 Kuala Lumpur\nMalaysia`}</Text>
      </View>
      <View style={styles.contactNo}>
        <Text style={styles.contactNoText}>{`+62 9999999999 (MO)`}</Text>
      </View>

      <View style={styles.btnRow}>
        <TouchableOpacity style={[styles.btn, styles.btnCopy]} onPress={copyToClipboard}>
            <Text style={{color:COLORS.white, fontWeight:'bold'}}>Copy Address</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, styles.btnCall]} onPress={handleCall}>
            <Text style={{color:COLORS.white, fontWeight:'bold'}}>Call Office</Text>
        </TouchableOpacity>
      </View>
      </View>
      {copiedText && <View style={styles.copy}>
      <Text style={{ color: 'green' }}>Copied to clipboard!</Text>
      </View>}
    </View>
  )
}

const styles = StyleSheet.create({
    main:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.bgColor,
    },
    mahallah:{
        width: '90%',
        justifyContent:'center',
        alignItems:'center',
        // borderWidth:1,
        // borderColor:'blue',
    },
    mahallahName:{
        fontSize: 27,
        fontWeight: 'bold',
        color: COLORS.black,
    },
    mahallahAddress:{
        width: '100%',
        paddingVertical:8,
        // justifyContent:'center',
        alignItems:'center',
    },
    address:{
        textAlign:'center',
        fontSize: 16,
        fontWeight:600,
        color: COLORS.black,
    },
    contactNo:{
        marginVertical:10,
    },
    contactNoText:{
        fontSize: 16,
        fontWeight:600,
        color: COLORS.black,
    },
    btnRow:{
        flexDirection:'row',
        width:'80%',
        justifyContent:'space-evenly',
        marginTop:8,
        // borderWidth:1,

    },
    btn:{
        width:'45%',
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:4,
        paddingVertical:8,
        borderRadius:50,
    },
    btnCopy:{
        backgroundColor:COLORS.gray,
    },
    btnCall:{
        backgroundColor:COLORS.ctaGreen,
    },
    copy:{
      backgroundColor:COLORS.lightGray,
      borderRadius:60,
      position:'relative',
      justifyContent: 'center',
      alignItems:'center',
      padding:6,
      top:30,
      width:'47%',
    }
})

=======
import { StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native'
import React,{useState} from 'react'
import { COLORS } from '../../constants'
import * as Clipboard from 'expo-clipboard'

const Contact = () => {
  const [copiedText, setCopiedText] = useState(false)

  const copyToClipboard = () => {
    Clipboard.setStringAsync('text copied')
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 1000);
  }
  const handleCall = () => {
    const phoneNumber = '+629999999999'; // replace with the actual phone number
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <View style={styles.main}>
      <View style={styles.mahallah}>
        <Text style={styles.mahallahName}>Mahallah Uthman</Text>
      
      <View style={styles.mahallahAddress}>
        <Text style={styles.address}>{`International Islamic University Malaysia\nJalan Gombak, 53100 Kuala Lumpur\nMalaysia`}</Text>
      </View>
      <View style={styles.contactNo}>
        <Text style={styles.contactNoText}>{`+62 9999999999 (MO)`}</Text>
      </View>

      <View style={styles.btnRow}>
        <TouchableOpacity style={[styles.btn, styles.btnCopy]} onPress={copyToClipboard}>
            <Text style={{color:COLORS.white, fontWeight:'bold'}}>Copy Address</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, styles.btnCall]} onPress={handleCall}>
            <Text style={{color:COLORS.white, fontWeight:'bold'}}>Call Office</Text>
        </TouchableOpacity>
      </View>
      </View>
      {copiedText && <View style={styles.copy}>
      <Text style={{ color: 'green' }}>Copied to clipboard!</Text>
      </View>}
    </View>
  )
}

const styles = StyleSheet.create({
    main:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.bgColor,
    },
    mahallah:{
        width: '90%',
        justifyContent:'center',
        alignItems:'center',
        // borderWidth:1,
        // borderColor:'blue',
    },
    mahallahName:{
        fontSize: 27,
        fontWeight: 'bold',
        color: COLORS.black,
    },
    mahallahAddress:{
        width: '100%',
        paddingVertical:8,
        // justifyContent:'center',
        alignItems:'center',
    },
    address:{
        textAlign:'center',
        fontSize: 16,
        fontWeight:600,
        color: COLORS.black,
    },
    contactNo:{
        marginVertical:10,
    },
    contactNoText:{
        fontSize: 16,
        fontWeight:600,
        color: COLORS.black,
    },
    btnRow:{
        flexDirection:'row',
        width:'80%',
        justifyContent:'space-evenly',
        marginTop:8,
        // borderWidth:1,

    },
    btn:{
        width:'45%',
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:4,
        paddingVertical:8,
        borderRadius:50,
    },
    btnCopy:{
        backgroundColor:COLORS.gray,
    },
    btnCall:{
        backgroundColor:COLORS.ctaGreen,
    },
    copy:{
      backgroundColor:COLORS.lightGray,
      borderRadius:60,
      position:'relative',
      justifyContent: 'center',
      alignItems:'center',
      padding:6,
      top:30,
      width:'47%',
    }
})

>>>>>>> a0083ca69e521a472eceb9eedfd9f56e422241a0
export default Contact