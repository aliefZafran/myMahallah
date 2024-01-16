<<<<<<< HEAD
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../constants";
import { db } from "../../config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import bcrypt from "bcryptjs";

const Login = () => {
  const [matricNo, setMatricNo] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigation = useNavigation();

  const togglePassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleLoginPress = async () => {
    if (!matricNo && !password) {
      alert("Please fill in your matric number and password.");
      return;
    } else if (!matricNo) {
      alert("Please fill in your matric number.");
      return;
    } else if (!password) {
      alert("Please fill in your password.");
      return;
    }

    try {
      const userRef = collection(db, "users");
      const q = query(userRef, where("matricNo", "==", parseInt(matricNo)));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        alert("User does not exist.");
        return;
      }

      querySnapshot.forEach(async (doc) => {
        const userData = doc.data();
        const storedPw = userData.password;

        const isPasswordMatch = await bcrypt.compare(password, storedPw);
        if (isPasswordMatch) {
          console.log("Login successful");
          navigation.replace("homescreen", { matricNo });
        } else {
          alert("Invalid password");
          setIsLoading(false);
        }
      });
      setIsLoading(true);
    } catch (e) {
      alert("Error");
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.welcome}>Welcome to</Text>
          <Text style={styles.title}>MyMahallah</Text>
          <TextInput
            style={styles.input}
            placeholder="Matric No"
            placeholderTextColor={COLORS.gray}
            keyboardType="numeric"
            value={matricNo}
            onChangeText={setMatricNo}
          />
          <View style={styles.pwInput}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={COLORS.gray}
              secureTextEntry={!isPasswordVisible}
              keyboardType="default"
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={togglePassword} style={styles.eyeIcon}>
              <Feather
                name={!isPasswordVisible ? "eye" : "eye-off"}
                size={24}
                color={COLORS.gray}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={handleLoginPress} style={styles.loginBtn}>
            {isLoading ? (
              <ActivityIndicator color='white' />
            ) : (
              <Text
                style={{
                  color: COLORS.white,
                  fontWeight: 500,
                  fontSize: 14,
                }}
              >
                Login
              </Text>
            )}
          </TouchableOpacity>
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
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  form: {
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  welcome: {
    color: COLORS.primary,
    fontSize: 27,
    fontWeight: 500,
  },
  title: {
    color: COLORS.primary,
    fontSize: 34,
    fontWeight: 600,
  },
  input: {
    height: 40,
    width: "90%",
    backgroundColor: COLORS.white,
    borderRadius: 10,
    margin: 8,
    padding: 4,
  },
  pwInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
  },
  eyeIcon: {
    position: "absolute",
    right: 14,
  },
  loginBtn: {
    margin: 6,
    width: 100,
    height: 30,
    backgroundColor: COLORS.ctaBlue,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Login;
=======
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../constants";
import { db } from "../../config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import bcrypt from "bcryptjs";

const Login = () => {
  const [matricNo, setMatricNo] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigation = useNavigation();

  const togglePassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleLoginPress = async () => {
    if (!matricNo && !password) {
      alert("Please fill in your matric number and password.");
      return;
    } else if (!matricNo) {
      alert("Please fill in your matric number.");
      return;
    } else if (!password) {
      alert("Please fill in your password.");
      return;
    }

    try {
      const userRef = collection(db, "users");
      const q = query(userRef, where("matricNo", "==", parseInt(matricNo)));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        alert("User does not exist.");
        return;
      }

      querySnapshot.forEach(async (doc) => {
        const userData = doc.data();
        const storedPw = userData.password;

        const isPasswordMatch = await bcrypt.compare(password, storedPw);
        if (isPasswordMatch) {
          console.log("Login successful");
          navigation.replace("homescreen", { matricNo });
        } else {
          alert("Invalid password");
          setIsLoading(false);
        }
      });
      setIsLoading(true);
    } catch (e) {
      alert("Error");
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.welcome}>Welcome to</Text>
          <Text style={styles.title}>MyMahallah</Text>
          <TextInput
            style={styles.input}
            placeholder="Matric No"
            placeholderTextColor={COLORS.gray}
            keyboardType="numeric"
            value={matricNo}
            onChangeText={setMatricNo}
          />
          <View style={styles.pwInput}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={COLORS.gray}
              secureTextEntry={!isPasswordVisible}
              keyboardType="default"
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={togglePassword} style={styles.eyeIcon}>
              <Feather
                name={!isPasswordVisible ? "eye" : "eye-off"}
                size={24}
                color={COLORS.gray}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={handleLoginPress} style={styles.loginBtn}>
            {isLoading ? (
              <ActivityIndicator color='white' />
            ) : (
              <Text
                style={{
                  color: COLORS.white,
                  fontWeight: 500,
                  fontSize: 14,
                }}
              >
                Login
              </Text>
            )}
          </TouchableOpacity>
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
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  form: {
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  welcome: {
    color: COLORS.primary,
    fontSize: 27,
    fontWeight: 500,
  },
  title: {
    color: COLORS.primary,
    fontSize: 34,
    fontWeight: 600,
  },
  input: {
    height: 40,
    width: "90%",
    backgroundColor: COLORS.white,
    borderRadius: 10,
    margin: 8,
    padding: 4,
  },
  pwInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
  },
  eyeIcon: {
    position: "absolute",
    right: 14,
  },
  loginBtn: {
    margin: 6,
    width: 100,
    height: 30,
    backgroundColor: COLORS.ctaBlue,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Login;
>>>>>>> a0083ca69e521a472eceb9eedfd9f56e422241a0
