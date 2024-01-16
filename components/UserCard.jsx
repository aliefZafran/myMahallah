<<<<<<< HEAD
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { COLORS } from "../constants";
import React, { useState, useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { db } from "../config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const UserCard = ({ route }) => {
  const nav = useNavigation();
  const { senderMatricNo, matricNo } = route.params;
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    try {
      const userRef = collection(db, "users");
      const q = query(userRef, where("matricNo", "==", parseInt(matricNo)));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // Handle the case when the user's document is not found
        console.log("User not found");
        return;
      }

      const userData = querySnapshot.docs[0].data();
      setUserData(userData);
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [matricNo]);

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.container}>
        {userData ? (
          <Image style={styles.pfp} source={{ uri: userData.pfp }} />
        ) : (
          <Text>Loading...</Text>
        )}

        <View style={styles.userCard}>
          <View style={styles.userDetails}>
            <View style={styles.title}>
              <Text style={[styles.titleText, { height: 40 }]}>Name:</Text>
              <Text style={[styles.titleText, { height: 25 }]}>Email:</Text>
              <Text style={styles.titleText}>Mahallah:</Text>
              <Text style={styles.titleText}>Block:</Text>
            </View>
            <View style={styles.title}>
              <Text style={[styles.detailsText, { height: 40 }]}>
                {userData ? userData.name.split("bin")[0].trim() : "-"}
              </Text>
              <Text style={[styles.detailsText, { height: 25 }]}>
                {userData ? userData.email : "-"}
              </Text>
              <Text style={styles.detailsText}>
                {userData ? userData.mahallah : "-"}
              </Text>
              <Text style={styles.detailsText}>
                {userData ? userData.block : "-"}
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => {
            nav.navigate("Chat", {
              senderMatricNo: parseInt(senderMatricNo),
              recipientMatricNo: parseInt(matricNo),
            });
          }}
          style={styles.roomBtn}
        >
          <Text style={styles.textBtn}>Message</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: COLORS.bgColor,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  userCard: {
    width: "80%",
    backgroundColor: COLORS.lightGray,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
    padding: 16,
    paddingBottom: 10,
  },
  pfp: {
    width: 80,
    height: 80,
    borderRadius: 100,
    borderWidth: 2, // Set the border width to 2
    borderColor: COLORS.primary,
  },
  userDetails: {
    flexDirection: "row",
    width: "100%",
  },
  title: {
    flexDirection: "column",
    width: "50%",
  },
  titleText: {
    textAlign: "right",
    marginBottom: 4,
    marginRight: 6,
    fontSize: 13,
    fontWeight: 500,
  },
  detailsText: {
    textAlign: "left",
    marginBottom: 4,
    marginLeft: 6,
    fontSize: 13,
    fontWeight: 400,
  },
  editBtn: {
    marginTop: 8,
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  roomBtn: {
    marginTop: 4,
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  textBtn: {
    color: "white",
    fontWeight: 600,
    fontSize: 16,
  },
});
=======
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { COLORS } from "../constants";
import React, { useState, useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { db } from "../config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const UserCard = ({ route }) => {
  const nav = useNavigation();
  const { senderMatricNo, matricNo } = route.params;
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    try {
      const userRef = collection(db, "users");
      const q = query(userRef, where("matricNo", "==", parseInt(matricNo)));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // Handle the case when the user's document is not found
        console.log("User not found");
        return;
      }

      const userData = querySnapshot.docs[0].data();
      setUserData(userData);
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [matricNo]);

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.container}>
        {userData ? (
          <Image style={styles.pfp} source={{ uri: userData.pfp }} />
        ) : (
          <Text>Loading...</Text>
        )}

        <View style={styles.userCard}>
          <View style={styles.userDetails}>
            <View style={styles.title}>
              <Text style={[styles.titleText, { height: 40 }]}>Name:</Text>
              <Text style={[styles.titleText, { height: 25 }]}>Email:</Text>
              <Text style={styles.titleText}>Mahallah:</Text>
              <Text style={styles.titleText}>Block:</Text>
            </View>
            <View style={styles.title}>
              <Text style={[styles.detailsText, { height: 40 }]}>
                {userData ? userData.name.split("bin")[0].trim() : "-"}
              </Text>
              <Text style={[styles.detailsText, { height: 25 }]}>
                {userData ? userData.email : "-"}
              </Text>
              <Text style={styles.detailsText}>
                {userData ? userData.mahallah : "-"}
              </Text>
              <Text style={styles.detailsText}>
                {userData ? userData.block : "-"}
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => {
            nav.navigate("Chat", {
              senderMatricNo: parseInt(senderMatricNo),
              recipientMatricNo: parseInt(matricNo),
            });
          }}
          style={styles.roomBtn}
        >
          <Text style={styles.textBtn}>Message</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: COLORS.bgColor,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  userCard: {
    width: "80%",
    backgroundColor: COLORS.lightGray,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
    padding: 16,
    paddingBottom: 10,
  },
  pfp: {
    width: 80,
    height: 80,
    borderRadius: 100,
    borderWidth: 2, // Set the border width to 2
    borderColor: COLORS.primary,
  },
  userDetails: {
    flexDirection: "row",
    width: "100%",
  },
  title: {
    flexDirection: "column",
    width: "50%",
  },
  titleText: {
    textAlign: "right",
    marginBottom: 4,
    marginRight: 6,
    fontSize: 13,
    fontWeight: 500,
  },
  detailsText: {
    textAlign: "left",
    marginBottom: 4,
    marginLeft: 6,
    fontSize: 13,
    fontWeight: 400,
  },
  editBtn: {
    marginTop: 8,
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  roomBtn: {
    marginTop: 4,
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  textBtn: {
    color: "white",
    fontWeight: 600,
    fontSize: 16,
  },
});
>>>>>>> a0083ca69e521a472eceb9eedfd9f56e422241a0
