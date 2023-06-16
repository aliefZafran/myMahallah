import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import {COLORS} from '../constants'
import Login from '../pages/Login/Login';
import Profile from '../pages/Settings/Profile';
import EditProfile from '../pages/Settings/EditProfile';
import ChangePw from '../pages/Settings/ChangePw';
import BottomTab from './BottomTab';
import MyRoom from '../pages/Settings/MyRoom';
import RegisterRoom from '../pages/MO/RegisterRoom';
import Form from '../pages/MO/Form';
import Contact from '../pages/MO/Contact';
import About from '../pages/Settings/About';
import NewPost from '../components/NewPost';
import UserCard from '../components/UserCard';
import Chat from '../pages/Inbox/Chat';

const StackNav = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown:true,
                headerBackTitleVisible:false,
                headerStyle:{
                    backgroundColor: COLORS.bgColor
                }
            }}
        >
            <Stack.Screen name='login' component={Login} options={{headerShown:false}}/>
            <Stack.Screen name='homescreen' component={BottomTab} options={{headerShown:false}}/>
            <Stack.Screen name='New post' component={NewPost} options={{headerShown:false}}/>
            <Stack.Screen name='Profile' component={UserCard} />
            <Stack.Screen name='My Profile' component={Profile}  />
            <Stack.Screen name='Edit Profile' component={EditProfile}  />
            <Stack.Screen name='Change Password' component={ChangePw}  />
            <Stack.Screen name='My Room' component={MyRoom}/>
            <Stack.Screen name='Register Room' component={RegisterRoom} />
            <Stack.Screen name='Maintenance Request' component={Form} />
            <Stack.Screen name='Contact' component={Contact} />
            <Stack.Screen name='MyMahallah' component={About} />
            <Stack.Screen name='Chat' component={Chat} />
        </Stack.Navigator>

  )
}

export default StackNav