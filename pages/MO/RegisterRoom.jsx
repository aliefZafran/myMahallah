import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { COLORS } from "../../constants";
import RoomLayout from "../../components/RoomLayout";
import { db } from '../../config/firebase';
import {collection, getDocs} from 'firebase/firestore';

const block = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "PG",
];


const RegisterRoom = ({route}) => {
  const {matricNo} = route.params;
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [loading, setLoading] = useState(false);
  const [roomData, setRoomData] = useState([]);
  
  const handleBlock = (blockValue) => {
    setSelectedBlock(blockValue);
  }

  useEffect(() => {
    const fetchRoomData = async () => {
      if (selectedBlock) {
        setLoading(true);

        try {
          const roomData = [];

          // Fetch room vacancies for each level in the selected block
          for (let level = 1; level <= 4; level++) {
            const levelRef = collection(db, 'uthman', selectedBlock, `lvl${level}`);
            const roomSnapshot = await getDocs(levelRef);
            const rooms = roomSnapshot.docs.map((doc) => doc.data());
            roomData.push({ level, rooms });
          }

          setRoomData(roomData);
          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      }
    };

    fetchRoomData();
  }, [selectedBlock]);

  return (
    <ScrollView style={styles.main}>
      <View style={styles.container}>
        <View style={styles.blockContainer}>
        <View style={styles.select}>
          <Text style={styles.selecttxt}>Select Block:</Text>
        </View>
        <View style={styles.blockRow}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {block.map((item, index) => (
              <TouchableOpacity 
                key={index} 
                style={[styles.blockBtn, selectedBlock === item && styles.blockBtnSelected,]} 
                onPress={() => handleBlock(item)}>
                <Text style={styles.block}>Block {item}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          </View>
        </View>
        <View style={styles.select}>
          <Text style={styles.selecttxt}>Select Room:</Text>
        </View>
        {loading ? (
          <ActivityIndicator size="large" color="gray" />
        ) : (
          <>
            {roomData.map(({ level, rooms }) => (
              <RoomLayout key={level} matricNo={matricNo} block={selectedBlock} level={level} rooms={rooms} />
            ))}
          </>
        )}

        {/* <RoomLayout matricNo={matricNo} block={selectedBlock} level={1} />
        <RoomLayout matricNo={matricNo} block={selectedBlock} level={2} /> */}
        {/* <RoomLayout matricNo={matricNo} block={selectedBlock} level={3} />
        <RoomLayout matricNo={matricNo} block={selectedBlock} level={4} /> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: COLORS.bgColor,
    paddingHorizontal: 8,
    paddingVertical: 10,
    // borderWidth: 1,
    // borderColor: "red",
  },
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 1,
    // borderColor: "blue",
  },
  blockContainer: {
  },
  blockRow: {
    flexDirection: "row",
    paddingVertical: 6,
    paddingHorizontal: 2,
    width: "100%",
    // borderWidth: 1,
  },
  blockBtn: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
  },
  blockBtnSelected: {
    backgroundColor: "orange", 
  },
  block: {
    fontSize: 20,
    color: COLORS.white,
    fontWeight: 500,
  },
  select: {
    width: "100%",
    // marginVertical:12,
    paddingVertical: 8,
    paddingHorizontal: 3,
    // borderWidth:1,
  },
  selecttxt: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default RegisterRoom;