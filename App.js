import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { COLORS } from "./constants";
import Homepage from "./pages/Homepage/Homepage";
import Login from "./pages/Login/Login";
import StackNav from "./stack/StackNav";
import Inbox from "./pages/Inbox/Inbox";
import MO from "./pages/MO/MO";
import { NavigationContainer } from "@react-navigation/native";
import BottomTab from "./stack/BottomTab";

export default function App() {
  return (
    <NavigationContainer>
      <StackNav />
      {/* <BottomTab /> */}
      {/* <Login /> */}
      {/* <Homepage /> */}
      {/* <Inbox /> */}
    </NavigationContainer>
    
  );
}
