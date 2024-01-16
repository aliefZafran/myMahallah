import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { COLORS } from "../constants";
import { db } from "../config/firebase";
import {
  doc,
  updateDoc,
  collection,
  where,
  query,
  getDocs,
  getDoc,
  runTransaction,
} from "firebase/firestore";

const RoomCard = ({
  matricNo,
  block,
  level,
  roomNo,
  compartmentVacancies,
  compartments,
}) => {
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const [selectedCompartment, setSelectedCompartment] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getUserByMatricNo = async (matricNo) => {
    const userRef = collection(db, "users");
    const q = query(userRef, where("matricNo", "==", parseInt(matricNo)));
    const querySnapshot = await getDocs(q);
    return querySnapshot.empty ? null : querySnapshot.docs[0];
  };

  const handleConfirm = async (compartment) => {
    console.log(
      `${matricNo} selects block ${block} room ${level}.${roomNo}, compartment ${compartment}`
    );
  
    try {
      const userDoc = await getUserByMatricNo(matricNo);
      const userRef = doc(db, "users", userDoc.id);
      const prevRoom = userDoc.data().room;
      const prevCompartment = userDoc.data().compartment;
  
      if (prevRoom && prevCompartment) {
        const prevRoomRef = doc(
          db,
          "uthman",
          block,
          `lvl${level}`,
          prevRoom,
          "compartment",
          prevCompartment
        );
  
        const prevRoomSnapshot = await getDoc(prevRoomRef);
        const prevRoomData = prevRoomSnapshot.data();
  
        // Update previous room if it is not vacant
        if (prevRoomData && !prevRoomData.isVacant) {
          await updateDoc(prevRoomRef, {
            isVacant: true,
            matricNo: "",
            name: "",
            registered: false,
            keyCollected: false,
          });
        }
      }
  
      await runTransaction(db, async (transaction) => {
        const roomRef = doc(
          db,
          "uthman",
          block,
          `lvl${level}`,
          `${level}.${roomNo}`,
          "compartment",
          selectedCompartment
        );
  
        const roomSnapshot = await transaction.get(roomRef);
        const roomData = roomSnapshot.data();
  
        // Handle clashes if the room is already occupied
        if (!roomData.isVacant) {
          throw new Error("Selected room is already occupied.");
        }
  
        // Update selected room
        transaction.update(roomRef, {
          isVacant: false,
          matricNo: userDoc.data().matricNo,
          name: userDoc.data().name,
          registered: true,
          keyCollected: false,
        });
  
        // Update user document
        transaction.update(userRef, {
          block: block,
          room: `${level}.${roomNo}`,
          compartment: compartment,
        });
      });
  
      console.log("Data updated successfully.");
    } catch (error) {
      alert('Sorry the room is already occupied')
      console.log("Error updating data:", error);
      // Handle the error and show an appropriate message to the user
    }
  
    setSelectedCompartment('');
    setIsLoading(true);
    // Close the confirmation modal
    setTimeout(() => {
      setIsConfirmationVisible(false);
      setIsLoading(false);
    }, 1000);
  };

  const handleCompartmentSelect = (compartment, compartmentVacancies) => {
    console.log("Selected Compartment:", compartment);

    if (compartmentVacancies[compartment]) {
      if (selectedCompartment !== "" && selectedCompartment !== compartment) {
        alert("Cannot select another compartment");
      } else {
        setSelectedCompartment(compartment);
        setIsConfirmationVisible(true); // Open the confirmation modal
      }
    } else {
      alert("Compartment unavailable");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.roomNo}>
        {level}.{roomNo}
      </Text>
      <View style={styles.compartmentRow}>
        {compartments.slice(0, 2).map((compartment) => (
          <TouchableOpacity
            key={compartment}
            style={[
              styles.roomBtn,
              selectedCompartment === compartment && styles.selectedRoom,
              compartmentVacancies[compartment] ? null : styles.occupiedRoom,
            ]}
            onPress={() =>
              handleCompartmentSelect(compartment, compartmentVacancies)
            }
          >
            <Text style={styles.compartment}>{compartment}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.compartmentRow}>
        {compartments.slice(2, 4).map((compartment) => (
          <TouchableOpacity
            key={compartment}
            style={[
              styles.roomBtn,
              selectedCompartment === compartment && styles.selectedRoom,
              compartmentVacancies[compartment] ? null : styles.occupiedRoom,
            ]}
            onPress={() =>
              handleCompartmentSelect(compartment, compartmentVacancies)
            }
          >
            <Text style={styles.compartment}>{compartment}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Modal visible={isConfirmationVisible} animationType="none" transparent>
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
      </Modal>
    </View>
  );
};

export default RoomCard;

const styles = StyleSheet.create({
  container: {
    width: "28%",
    justifyContent: "center",
    alignItems: "center",
    margin: 9,
    padding: 3,
    // borderWidth:1,
    // borderColor:COLORS.black,
  },
  compartmentRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    // borderWidth:1,
    // borderColor:'blue',
  },
  roomNo: {
    paddingVertical: 2,
    fontWeight: "bold",
  },
  roomBtn: {
    width: "40%",
    alignItems: "center",
    marginHorizontal: 8,
    marginVertical: 4,
    paddingVertical: 2,
    backgroundColor: COLORS.lightGray,
    borderRadius: 6,
  },
  selectedRoom: {
    width: "40%",
    alignItems: "center",
    marginHorizontal: 8,
    marginVertical: 4,
    paddingVertical: 2,
    backgroundColor: "green",
    borderRadius: 6,
  },
  vacantRoom: {
    backgroundColor: "blue",
  },
  occupiedRoom: {
    backgroundColor: "red",
    width: "40%",
    alignItems: "center",
    marginHorizontal: 8,
    marginVertical: 4,
    paddingVertical: 2,
    borderRadius: 6,
  },
  compartment: {
    textAlign: "center",
    fontWeight: 600,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  modalRow: {
    flexDirection: "row",
    marginTop: 30,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  confirmButton: {
    backgroundColor: COLORS.primary,
    width: 80,
    padding: 10,
    marginRight: 30,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: COLORS.gray,
    width: 80,
    marginLeft: 30,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
});