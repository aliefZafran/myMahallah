import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../constants";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabActions } from "@react-navigation/native";
import Homepage from "../pages/Homepage/Homepage";
import Inbox from "../pages/Inbox/Inbox";
import Nav from "../pages/Nav/Nav";
import MO from "../pages/MO/MO";
import Settings from "../pages/Settings/Settings";
import { Entypo, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

const BottomTab = ({navigation, route}) => {
  const tab = createBottomTabNavigator();
  const { matricNo } = route.params;

  return (
    <tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.secondary,
        tabBarInactiveTintColor: COLORS.gray,
        tabBarStyle: { backgroundColor: COLORS.primary },
        labelStyle: { fontSize: 16 },
        tabStyle: { justifyContent: "center", alignItems: "center" },
        tabBarShowLabel: false,
      }}
    >
      <tab.Screen
        name="home"
        component={Homepage}
        initialParams={{ matricNo}}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={30} color={color} />
          ),
          tabBarVisible: route.state && route.state.index === 0,
        }}
      />
      <tab.Screen
        name="inbox"
        component={Inbox}
        initialParams={{ matricNo }}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Entypo name="chat" size={30} color={color} />
          ),
        }}
      />
      <tab.Screen
        name="nav"
        component={Nav}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Entypo name="direction" size={30} color={color} />
          ),
        }}
      />
      <tab.Screen
        name="mo"
        component={MO}
        initialParams={{ matricNo }}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="office-building-cog-outline"
              size={30}
              color={color}
            />
          ),
        }}
      />
      <tab.Screen
        name="settings"
        component={Settings}
        initialParams={{ matricNo }}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={30} color={color} />
          ),
          tabBarVisible: route.state && route.state.index === 0, // Hide the bottom tab bar on other screens except the first screen
        }}
      />
    </tab.Navigator>
  );
};

export default BottomTab;

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       backgroundColor: COLORS.primary,
//     },
// })
