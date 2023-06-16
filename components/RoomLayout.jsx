import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import RoomCard from "./RoomCard";
import { db } from "../config/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";

const RoomLayout = ({ matricNo, block, level }) => {
  const [roomVacancies, setRoomVacancies] = useState([]);
  const [roomDataLoaded, setRoomDataLoaded] = useState(false);
  const compartments = ["A", "B", "C", "D"];

  const fetchRoomVacancy = async (block, level, roomNo, compartment) => {
    const roomRef = doc(
      db,
      "uthman",
      block,
      `lvl${level}`,
      `${level}.${roomNo}`,
      "compartment",
      compartment
    );

    const unsubscribe = onSnapshot(roomRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const compartmentData = docSnapshot.data();
        const isVacant = compartmentData.isVacant;
        // Update the vacancy status for the specific compartment
        setRoomVacancies((prevRoomVacancies) => {
          const updatedRoomVacancies = [...prevRoomVacancies];
          updatedRoomVacancies[roomNo - 1][compartment] = isVacant;
          return updatedRoomVacancies;
        });
      } else {
      }
    });

    // Return the unsubscribe function to allow unsubscribing later if needed
    return unsubscribe;
  };

  useEffect(() => {
    const fetchVacancies = async () => {
      const roomVacancies = [];
      const unsubscribeFunctions = [];

      // Fetch room vacancies for each room in the level
      for (let roomNo = 1; roomNo <= 8; roomNo++) {
        const compartmentVacancies = {};
        const promises = compartments.map(
          (compartment) =>
            new Promise((resolve) => {
              const unsubscribe = fetchRoomVacancy(
                block,
                level,
                roomNo,
                compartment
              );
              unsubscribeFunctions.push(unsubscribe);
              resolve(unsubscribe);
            })
        );

        const unsubscribe = await Promise.all(promises);
        unsubscribeFunctions.push(unsubscribe);

        // Set initial values for compartmentVacancies
        compartments.forEach((compartment) => {
          compartmentVacancies[compartment] = true; // Set a default value for isVacant
        });

        roomVacancies.push(compartmentVacancies);
      }

      setRoomVacancies(roomVacancies);

      return () => {
        unsubscribeFunctions.forEach((unsubscribe) => unsubscribe());
      };
    };

    fetchVacancies();
    setTimeout(() => {
      setRoomDataLoaded(true);
    }, 1000);

  }, [block, level]);

  return (
    <View style={styles.container}>
      {roomDataLoaded ? (
        <>
          <View style={styles.levelHeader}>
            <Text style={styles.level}>Level {level}</Text>
          </View>
          <View style={styles.roomRow}>
            {roomVacancies.slice(0, 3).map((compartmentVacancies, roomNo) => (
              <RoomCard
                key={roomNo}
                level={level}
                block={block}
                roomNo={roomNo + 1}
                matricNo={matricNo}
                compartmentVacancies={compartmentVacancies}
                compartments={compartments}
              />
            ))}
          </View>
          <View style={styles.roomRow}>
            {roomVacancies.slice(3, 6).map((compartmentVacancies, roomNo) => (
              <RoomCard
                key={roomNo}
                level={level}
                block={block}
                roomNo={roomNo + 4}
                matricNo={matricNo}
                compartmentVacancies={compartmentVacancies}
                compartments={compartments}
              />
            ))}
          </View>
          <View style={styles.roomRow}>
            {roomVacancies.slice(6, 8).map((compartmentVacancies, roomNo) => (
              <RoomCard
                key={roomNo}
                level={level}
                block={block}
                roomNo={roomNo + 7}
                matricNo={matricNo}
                compartmentVacancies={compartmentVacancies}
                compartments={compartments}
              />
            ))}
          </View>
        </>
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    height: 500,
    borderBottomWidth: 1,
    paddingTop: 4,
    // borderWidth:1,
    // position:'relative',
    // top:20,
  },
  roomRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
  },
  levelHeader: {
    paddingVertical: 8,
    paddingHorizontal: 6,
  },
  level: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default RoomLayout;
