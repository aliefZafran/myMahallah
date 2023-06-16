import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants'

const About = () => {
  return (
    <View style={styles.main}>
        <View style={styles.container}>
            <Text style={styles.about}>MyMahallah, aims to address the current lack of a centralized system for students living in Mahallah. By providing a one-stop mobile application that delivers all necessary information and services, we aim to improve the overall experience of students living on campus. The app will allow students to easily engage with their Mahallah community, stay informed about announcements and events, and access services offered by the Mahallah Office. Additionally, the app will provide the Mahallah Office with a better management system to streamline their operations and improve communication with students. Ultimately, MyMahallah will be an invaluable tool for both students and the Mahallah Office, helping to create a more cohesive and connected community within the Mahallah.</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    main:{
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.bgColor,
        
    },
    container:{
        marginTop:44,
        paddingHorizontal:8,
        width:'90%',
    },
    about:{
        fontSize:14,
        fontWeight:500,
        textAlign: 'justify',
    },
})

export default About