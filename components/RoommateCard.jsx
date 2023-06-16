import { StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { COLORS } from "../constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { db } from "../config/firebase.js";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  where,
  query,
} from "firebase/firestore";

const RoommateCard = ({ matricNo, block, level, roomNo, compartment }) => {
  const nav = useNavigation();
  const [roomMate, setRoommate] = useState({});
  const [profilePicture, setProfilePicture] = useState(null);
  const [pfpLoaded, setPfpLoaded] = useState(false);

  const fetchRoommates = async () => {
    try {
      const compartmentRef = doc(
        db,
        "uthman",
        block,
        `lvl${level}`,
        roomNo,
        "compartment",
        compartment
      );

      const compartmentDoc = await getDoc(compartmentRef);

      if (compartmentDoc.exists()) {
        const compartmentData = compartmentDoc.data();
        const roommatesData = {
          roomMateMatricNo: compartmentData.matricNo || "Not Available",
          roomMateName: compartmentData.name
            ? compartmentData.name.split("bin")[0].trim()
            : "Not Available",
        };
        setRoommate(roommatesData);
      }else{
        setRoommate({});
      }
    } catch (error) {
      // console.log("Error fetching roommates:", error);
    }
  };

  const fetchProfilePicture = async () => {
    try {
      const userRef = collection(db, "users");
      const q = query(
        userRef,
        where("matricNo", "==", parseInt(roomMate.roomMateMatricNo))
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
        const pictureURL = userData.pfp;
        setProfilePicture(pictureURL);
      }
    } catch (error) {
      console.log("Error fetching profile picture:", error);
    }
  };

  useEffect(() => {
    fetchRoommates();
  }, [block, level, roomNo, compartment]);

  useEffect(() => {
    fetchProfilePicture(); //
    setTimeout(() => {
      setPfpLoaded(true);
    }, 800);
  }, [roomMate.roomMateMatricNo]);

  return (
    <View style={styles.card}>
      <Text style={styles.compartment}>{compartment}</Text>

      <View style={styles.pfp}>
        {pfpLoaded ? (
          profilePicture ? (
            <Image source={{ uri: profilePicture }} style={styles.picture} />
          ) : null
        ) : (
          <ActivityIndicator />
        )}
      </View>

      <Text style={[styles.txt, { marginBottom: 3 }]}>
        {roomMate && roomMate.roomMateName
          ? roomMate.roomMateName
          : "Not Available"}
      </Text>
      <Text style={[styles.txt, { marginTop: 3 }]}>
        {roomMate && roomMate.roomMateMatricNo
          ? roomMate.roomMateMatricNo
          : "Not Available"}
      </Text>
      {roomMate.roomMateMatricNo === 'Not Available' ||
      parseInt(matricNo) === parseInt(roomMate.roomMateMatricNo) ? null : (
        <TouchableOpacity
          style={styles.msgBtn}
          onPress={() => {
            nav.navigate("Chat", {
              senderMatricNo: parseInt(matricNo),
              recipientMatricNo: roomMate.roomMateMatricNo,
            });
          }}
        >
          <Text style={{ color: COLORS.white }}>Message</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default RoommateCard;

const styles = StyleSheet.create({
  card: {
    width: "48%",
    height: "100%",
    margin: 8,
    paddingVertical: 6,
    paddingHorizontal: 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.lightGray,
    borderRadius: 8,
  },
  compartment: {
    fontSize: 16,
    fontWeight: 800,
    color: COLORS.primary,
    marginTop: 4,
  },
  pfp: {
    width: "70%",
    height: "45%",
    marginTop: 4,
    borderRadius: 20,
    marginBottom: 12,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
  },
  picture: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 20,
  },
  txt: {
    fontSize: 12,
    fontWeight: 600,
    marginVertical: 0.8,
  },
  msgBtn: {
    margin: 10,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
});
