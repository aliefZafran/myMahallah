import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { COLORS } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../config/firebase";
import { doc, onSnapshot } from "firebase/firestore";
const MO = ({ route }) => {
  const nav = useNavigation();
  const { matricNo } = route.params;
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const docRef = doc(db, "uthman", "switch");
    const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        setEnabled(data.registrationEnabled);
      }
    });

    return () => {
      // Unsubscribe the listener when the component is unmounted
      unsubscribe();
    };
  }, []);

  const handleRegisterRoom = () => {
    if (enabled) {
      nav.navigate("Register Room", { matricNo });
    } else {
      alert("Sorry, registration period is closed");
    }
  };

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Mahallah Office</Text>
        </View>

        <View style={styles.body}>
          <View style={styles.options}>
            <TouchableOpacity style={styles.btn} onPress={handleRegisterRoom}>
              <Text style={styles.txtBtn}>Register Room</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => nav.navigate("Maintenance Request", { matricNo })}
            >
              <Text style={styles.txtBtn}>Submit Form</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => nav.navigate("Contact")}
            >
              <Text style={styles.txtBtn}>Contact MO</Text>
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
    justifyContent: "space-around",
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
});

export default MO;
