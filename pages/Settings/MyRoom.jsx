import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React, { useState, useEffect } from "react";
import RoommateCard from "../../components/RoommateCard";
import { COLORS } from "../../constants";

import { db } from "../../config/firebase";
import { collection, getDocs, where, query } from "firebase/firestore";

const MyRoom = ({ route }) => {
  const { matricNo } = route.params;
  const [room, setRoom] = useState(null);
  const [block, setBlock] = useState(null);
  const [roomLvl, setRoomLvl] = useState(null);
  const [roomNo, setRoomNo] = useState(null);

  const getUserByMatricNo = async (matricNo) => {
    const userRef = collection(db, "users");
    const q = query(userRef, where("matricNo", "==", parseInt(matricNo)));
    const querySnapshot = await getDocs(q);
    return querySnapshot;
  };

  const fetchUserRoom = async () => {
    try {
      const querySnapshot = await getUserByMatricNo(matricNo);
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
        const block = userData.block;
        const roomNo = userData.room;
        const roomLvl = roomNo.split(".")[0];
        const room = `${block} ${roomNo}`;
        setRoom(room);
        setBlock(block);
        setRoomLvl(roomLvl);
        setRoomNo(roomNo);
      } else {
        setRoom(null);
      }
    } catch (error) {
      console.log("Error fetching room number:", error);
    }
  };

  useEffect(() => {
    fetchUserRoom();
  }, []);

  return (
    <SafeAreaView style={styles.main}>
      {room !== null ? <>
      <View style={styles.roomHeader}>
        <Text style={styles.roomNo}>{room}</Text>
      </View>
      <View style={styles.cardContainer}>
        <RoommateCard
          matricNo={matricNo}
          block={block}
          level={roomLvl}
          roomNo={roomNo}
          compartment="A"
        />
        <RoommateCard
          matricNo={matricNo}
          block={block}
          level={roomLvl}
          roomNo={roomNo}
          compartment="B"
        />
      </View>
      <View style={styles.cardContainer}>
        <RoommateCard
          matricNo={matricNo}
          block={block}
          level={roomLvl}
          roomNo={roomNo}
          compartment="C"
        />
        <RoommateCard
          matricNo={matricNo}
          block={block}
          level={roomLvl}
          roomNo={roomNo}
          compartment="D"
        />
      </View>
      </> : <Text>You are not registered to any room</Text> }
      
    </SafeAreaView>
  );
};

export default MyRoom;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.bgColor,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  roomHeader: {},
  roomNo: {
    fontSize: 26,
    fontWeight: 900,
    color: COLORS.primary,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 1,
    padding: 6,
    width: "100%",
    height: "40%",
  },
  roomCard: {
    width: "50%",
    textAlign: "center",
    height: 100,
    borderWidth: 1,
    margin: 6,
  },
});
