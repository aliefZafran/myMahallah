import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { COLORS } from "../../constants";
import React, { useEffect, useState, useCallback } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { db } from "../../config/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  deleteField,
} from "firebase/firestore";

const Profile = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { matricNo } = route.params;
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

  const handleCheckout = async () => {
    try {
      const { block, room, compartment } = userData;
      const level = room.split(".")[0]; // Extract the level from the room field

      // Update user data in 'users' collection
      const usersRef = collection(db, "users");
      const querySnapshot = await getDocs(
        query(usersRef, where("matricNo", "==", parseInt(matricNo)))
      );
      // Get the document ID of the user's document
      const docId = querySnapshot.docs[0].id;

      // Update user data in 'users' collection
      const userRef = doc(db, "users", docId);
      await updateDoc(userRef, {
        block: deleteField(),
        room: deleteField(),
        compartment: deleteField(),
      });
      // Remove user details from 'uthman' collection
      const roomRef = doc(
        db,
        "uthman",
        block,
        `lvl${level}`,
        room,
        "compartment",
        compartment
      );
      await updateDoc(roomRef, {
        isVacant: true,
        keyCollected: false,
        registered: false,
        name: deleteField(),
        matricNo: deleteField(),
      });

      setTimeout(() =>{
        navigation.goBack();
      },500)
      
    } catch (error) {
      console.log("Error checking out:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [matricNo]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchUserData();
    });

    return unsubscribe;
  }, [navigation, fetchUserData]);

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.container}>
        {userData && userData.pfp ? (
          <Image style={styles.pfp} source={{ uri: userData.pfp }} />
        ) : (
          <Text>Loading...</Text>
        )}

        <View style={styles.userCard}>
          <View style={styles.userDetails}>
            <View style={styles.title}>
              <Text style={styles.titleText}>Name:</Text>
              <Text style={styles.titleText}>Matric Number:</Text>
              <Text style={styles.titleText}>Phone Number:</Text>
              <Text style={styles.titleText}>Email:</Text>
              <Text style={styles.titleText}>Mahallah:</Text>
              <Text style={styles.titleText}>Room:</Text>
              <Text style={styles.titleText}>Compartment:</Text>
            </View>
            <View style={styles.title}>
              <Text style={styles.detailsText}>
                {userData
                  ? userData.name.slice(0, 15) +
                    (userData.name.length > 15 ? "..." : "")
                  : ""}
              </Text>
              <Text style={styles.detailsText}>{matricNo}</Text>
              <Text style={styles.detailsText}>
                {userData ? userData.phoneNo : "-"}
              </Text>
              <Text style={styles.detailsText}>
                {userData ? userData.email : "-"}
              </Text>
              <Text style={styles.detailsText}>
                {userData ? userData.mahallah : "-"}
              </Text>
              <Text style={styles.detailsText}>
                {userData && userData.room ? `${userData.block} ${userData.room}` : "-"}
              </Text>
              <Text style={styles.detailsText}>
                {userData && userData.compartment ? userData.compartment : "-"}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => {
              navigation.navigate("Edit Profile", { matricNo: matricNo });
            }}
          >
            <Text style={styles.textBtn}>EDIT</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("My Room", { matricNo: matricNo });
          }}
          style={styles.roomBtn}
        >
          <Text style={styles.textBtn}>My Room</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleCheckout}
          style={[
            styles.roomBtn,
            { backgroundColor: "#ff0021", marginTop: 30 },
          ]}
        >
          <Text style={styles.textBtn}>Check Out</Text>
        </TouchableOpacity>

        {/* <Modal visible={isConfirmationVisible} animationType="none" transparent>
        <View style={styles.modalContainer}>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <View style={styles.modalContent}>
              <Text style={{ fontWeight: "600", fontSize: 18 }}>
                Confirm your selection?
              </Text>
              <View style={styles.modalRow}>
                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={() => handleConfirm(selectedCompartment)}
                >
                  <Text style={styles.buttonText}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => {
                    setIsConfirmationVisible(false), setSelectedCompartment("");
                  }}
                >
                  <Text style={styles.buttonText}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </Modal> */}
      </View>
    </SafeAreaView>
  );
};

export default Profile;

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
    padding: 20,
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
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    flexDirection: "column",
    width: "50%",
  },
  titleText: {
    textAlign: "right",
    marginBottom: 4,
    fontSize: 13,
    fontWeight: 500,
    height: 20,
  },
  detailsText: {
    textAlign: "left",
    marginBottom: 4,
    marginLeft: 10,
    fontSize: 13,
    fontWeight: 400,
    height: 20,
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
    width: 150,
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
