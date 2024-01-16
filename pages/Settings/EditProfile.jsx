import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { COLORS } from "../../constants";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { ImageManipulator } from "expo-image-manipulator";
import { useNavigation, useRoute } from "@react-navigation/native";

import { db, storage } from "../../config/firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import {
  ref,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";

const EditProfile = () => {
  const nav = useNavigation();
  const route = useRoute();
  const { matricNo, refreshUserData } = route.params;

  const [imageURL, setImageURL] = useState(userData ? userData.pfp : "");
  const [userData, setUserData] = useState(null);
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");

  const getUserByMatricNo = async (matricNo) => {
    const userRef = collection(db, "users");
    const q = query(userRef, where("matricNo", "==", parseInt(matricNo)));
    const querySnapshot = await getDocs(q);
    return querySnapshot.empty ? null : querySnapshot.docs[0];
  };

  useEffect(() => {
    fetchUserData();
  }, [matricNo, userData]);

  const fetchUserData = async () => {
    try {
      const userDoc = await getUserByMatricNo(matricNo);

      if (userDoc) {
        const userData = userDoc.data();
        setUserData(userData);
        setImageURL(userData ? userData.pfp : '')
      } else {
        console.log("User not found");
      }
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };

  const updateData = async () => {
    try {
      const userDoc = await getUserByMatricNo(matricNo);

      if (userDoc) {
        const userRef = doc(db, "users", userDoc.id);
        const newData = {
          phoneNo: phoneNo,
          email: email,
        };
        await updateDoc(userRef, newData);
        console.log("Phone and email updated");

        nav.goBack("My Profile", { matricNo });
      } else {
        console.log("User not found");
      }
    } catch (err) {
      console.log("Encounter error when updating", err);
    }
  };

  const selectImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        // Handle the case when permission is not granted
        console.log("Permission not granted");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        // Use the selected image
        const selectedImageUri = result.assets[0].uri;

        const fetchPromise = fetch(selectedImageUri);
        const response = await fetchPromise;
        await new Promise((resolve) => setTimeout(resolve, 6000));
        const blob = await response.blob();

        const fileName = selectedImageUri.split("/").pop();
        const storageRef = ref(storage, `pfp/${fileName}`);
        await uploadBytes(storageRef, blob);
        console.log("Image uploaded successfully");

        const downloadURL = await getDownloadURL(storageRef);

        // // Update the 'pfp' field in the database
        const userDoc = await getUserByMatricNo(matricNo);

        if (userDoc) {
          const userRef = doc(db, "users", userDoc.id);
          const newData = {
            pfp: downloadURL,
          };
          await updateDoc(userRef, newData);
          setImageURL(downloadURL);
          console.log("Profile picture updated");
        } else {
          console.log("User not found");
        }
      }
    } catch (error) {
      console.log("Error selecting image:", error);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollView}
      keyboardShouldPersistTaps="handled"
    >
      <KeyboardAvoidingView behavior="padding">
        <View style={styles.main}>
          <View style={styles.pfpContainer}>
            {imageURL ? (
              <Image style={styles.pfp} source={{ uri: imageURL }} />
            ) : (
              <Text>Loading...</Text>
            )}
            <TouchableOpacity style={styles.icon} onPress={selectImage}>
              <Feather name="plus" size={40} color={COLORS.white} />
            </TouchableOpacity>
          </View>
          <View style={styles.details}>
            <View style={styles.col1}>
              <Text style={styles.txt}>Name:</Text>
              <Text style={styles.txt}>Matric Number:</Text>
              <Text style={styles.txt}>Mahallah:</Text>
              <Text style={styles.txt}>Room:</Text>
              <Text style={styles.txt}>Compartment:</Text>
            </View>
            <View style={styles.col2}>
              <Text style={styles.txtRight}>
                {userData
                  ? userData.name.slice(0, 15) +
                    (userData.name.length > 15 ? "..." : "")
                  : ""}
              </Text>
              <Text style={styles.txtRight}>{matricNo}</Text>
              <Text style={styles.txtRight}>
                {userData ? userData.mahallah : "-"}
              </Text>
              <Text style={styles.txtRight}>
                {userData ? userData.roomNo : "-"}
              </Text>
              <Text style={styles.txtRight}>
                {userData ? userData.compartment : "-"}
              </Text>
            </View>
          </View>
          <View style={styles.edit}>
            <View style={styles.col1}>
              <Text style={[styles.txt, { marginVertical: 10 }]}>
                Phone Number:
              </Text>
              <Text style={[styles.txt, { marginVertical: 10 }]}>Email:</Text>
            </View>
            <View style={styles.col2}>
              <TextInput
                style={styles.input}
                placeholder={
                  userData && userData.phoneNo ? userData.phoneNo : "No"
                }
                placeholderTextColor={COLORS.gray}
                keyboardType="default"
                value={phoneNo}
                onChangeText={(no) => setPhoneNo(no)}
              />
              <TextInput
                style={styles.input}
                placeholder={
                  userData && userData.email ? userData.email : "user@email.com"
                }
                placeholderTextColor={COLORS.gray}
                keyboardType="default"
                value={email}
                onChangeText={(email) => setEmail(email)}
              />
            </View>
          </View>
          <View style={styles.btnRow}>
            <TouchableOpacity
              style={[styles.btn, styles.btnCancel]}
              onPress={() => {
                nav.goBack("My Profile");
              }}
            >
              <Text style={{ color: COLORS.black, fontWeight: "bold" }}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btn, styles.btnSave]}
              onPress={updateData}
            >
              <Text style={{ color: COLORS.white, fontWeight: "bold" }}>
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    alignItems: "center",
    backgroundColor: COLORS.bgColor,
    height: 900,
    paddingTop: 50,
  },
  main: {
    alignItems: "center",
    height: 700,
  },
  pfpContainer: {
    width: "50%",
    height: "28%",
    marginBottom: 20,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  pfp: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  icon: {
    backgroundColor: COLORS.ctaBlue,
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    borderRadius: 35,
    position: "absolute",
    bottom: 5,
    right: 3,
  },
  details: {
    flexDirection: "row",
    margin: 8,
    padding: 10,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  col1: {
    width: "50%",
  },
  txt: {
    textAlign: "right",
    paddingVertical: 3,
    fontSize: 14,
    fontWeight: 600,
    height: 25,
  },
  txtRight: {
    textAlign: "left",
    paddingVertical: 3,
    fontSize: 14,
    fontWeight: 600,
    height: 25,
  },
  col2: {
    marginLeft: 12,
    width: "50%",
  },
  edit: {
    flexDirection: "row",
    margin: 8,
    padding: 10,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "96%",
    backgroundColor: COLORS.white,
    marginVertical: 3,
    borderRadius: 4,
    padding: 6,
  },
  btnRow: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-evenly",
    marginTop: 8,
  },
  btn: {
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
    paddingVertical: 8,
    borderRadius: 50,
  },
  btnCancel: {
    backgroundColor: COLORS.lightGray,
  },
  btnSave: {
    backgroundColor: COLORS.ctaBlue,
  },
});

export default EditProfile;