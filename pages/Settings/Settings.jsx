<<<<<<< HEAD
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { COLORS } from "../../constants";
import { useNavigation } from "@react-navigation/native";

const Settings = ({ route }) => {
  const nav = useNavigation();
  const { matricNo } = route.params;

  const handleLogout = () => {
    // Perform any necessary logout logic here

    // Navigate back to the login page by resetting the navigation stack
    nav.reset({
      index: 0,
      routes: [{ name: "login" }],
    });
  };

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Settings</Text>
        </View>

        <View style={styles.body}>
          <View style={styles.options}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => nav.navigate("My Profile", { matricNo })}
            >
              <Text style={styles.txtBtn}>Account</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => nav.navigate("MyMahallah")}
            >
              <Text style={[styles.txtBtn, styles.longtxt]}>
                About MyMahallah
              </Text>
            </TouchableOpacity>
          </View>
          {/* <TouchableOpacity style={styles.btn} onPress={() => nav.navigate('Change Password', { matricNo })}>
              <Text style={[styles.txtBtn, styles.longtxt]}>Change Password</Text>
            </TouchableOpacity> */}

          <View style={styles.logOut}>
            <TouchableOpacity
              style={[styles.btn, { backgroundColor: "#ff0021" }]}
              onPress={handleLogout}
            >
              <Text style={[styles.txtBtn, styles.longtxt]}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 4,
    backgroundColor: COLORS.bgColor,
  },
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    // justifyContent:'center',
    alignItems: "center",
  },
  header: {
    width: "100%",
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 7,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerText: {
    fontSize: 27,
    top: 10,
    fontWeight: 600,
    color: COLORS.primary,
  },
  body: {
    width: "100%",
    height: "70%",
    justifyContent: "center",
    alignItems: "center",
  },
  options: {
    width: "80%",
    height: "50%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  btn: {
    width: "60%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    borderRadius: 50,
  },
  txtBtn: {
    fontSize: 18,
    color: COLORS.white,
    fontWeight: "bold",
    textAlign: "center",
  },
  longtxt: {
    fontSize: 14,
  },
  logOut: {
    position: "absolute",
    bottom: 0,
    width: "80%",
    alignItems: "center",
  },
});

export default Settings;
=======
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { COLORS } from "../../constants";
import { useNavigation } from "@react-navigation/native";

const Settings = ({ route }) => {
  const nav = useNavigation();
  const { matricNo } = route.params;

  const handleLogout = () => {
    // Perform any necessary logout logic here

    // Navigate back to the login page by resetting the navigation stack
    nav.reset({
      index: 0,
      routes: [{ name: "login" }],
    });
  };

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Settings</Text>
        </View>

        <View style={styles.body}>
          <View style={styles.options}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => nav.navigate("My Profile", { matricNo })}
            >
              <Text style={styles.txtBtn}>Account</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => nav.navigate("MyMahallah")}
            >
              <Text style={[styles.txtBtn, styles.longtxt]}>
                About MyMahallah
              </Text>
            </TouchableOpacity>
          </View>
          {/* <TouchableOpacity style={styles.btn} onPress={() => nav.navigate('Change Password', { matricNo })}>
              <Text style={[styles.txtBtn, styles.longtxt]}>Change Password</Text>
            </TouchableOpacity> */}

          <View style={styles.logOut}>
            <TouchableOpacity
              style={[styles.btn, { backgroundColor: "#ff0021" }]}
              onPress={handleLogout}
            >
              <Text style={[styles.txtBtn, styles.longtxt]}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 4,
    backgroundColor: COLORS.bgColor,
  },
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    // justifyContent:'center',
    alignItems: "center",
  },
  header: {
    width: "100%",
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 7,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerText: {
    fontSize: 27,
    top: 10,
    fontWeight: 600,
    color: COLORS.primary,
  },
  body: {
    width: "100%",
    height: "70%",
    justifyContent: "center",
    alignItems: "center",
  },
  options: {
    width: "80%",
    height: "50%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  btn: {
    width: "60%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    borderRadius: 50,
  },
  txtBtn: {
    fontSize: 18,
    color: COLORS.white,
    fontWeight: "bold",
    textAlign: "center",
  },
  longtxt: {
    fontSize: 14,
  },
  logOut: {
    position: "absolute",
    bottom: 0,
    width: "80%",
    alignItems: "center",
  },
});

export default Settings;
>>>>>>> a0083ca69e521a472eceb9eedfd9f56e422241a0
