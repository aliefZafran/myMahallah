<<<<<<< HEAD
import { StyleSheet, Text, View, TouchableOpacity, Linking, Image } from "react-native";
import React from "react";
import { COLORS } from "../constants";

const mahallahImages = {
  Uthman: require("../assets/mahallah/Uthman.png"),
  Siddiq: require("../assets/mahallah/Siddiq.png"),
  Ali: require("../assets/mahallah/Ali.png"),
  Faruq: require("../assets/mahallah/Faruq.png"),
  Bilal: require("../assets/mahallah/Bilal.png"),
  Zubair: require("../assets/mahallah/Zubair.png"),
};


const MahallahCard = ({ mahallah }) => {
  const openMapsApp = () => {
    const url =
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent(`Mahallah ${mahallah}`);
    Linking.openURL(url);
  };

  const imagePath = mahallahImages[mahallah];

  return (
    <View style={styles.container}>
      <Image source={imagePath} style={styles.mahallahPic} />
      <View style={styles.mahallahDetails}>
        <Text style={styles.mahallahTxt}>{`Mahallah ${mahallah}`}</Text>
        <View style={styles.btnRow}>
          {/* <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnInfo}>View Details</Text>
            </TouchableOpacity> */}
          <TouchableOpacity style={styles.btn} onPress={openMapsApp}>
            <Text style={styles.btnGo}>Direction</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    borderBottomWidth: 1,
    flexDirection: "row",
    marginBottom: 10,
    // borderWidth:1,
    paddingHorizontal: 8,
    paddingTop: 6,
    paddingBottom: 10,
  },
  mahallahPic: {
    width: "30%",
    height: 100,
    backgroundColor: COLORS.white,
  },
  mahallahDetails: {
    flexDirection: "column",
    justifyContent: "center",
    width: 240,
    marginLeft: 18,
    // borderWidth:1,
  },
  btnRow: {
    flexDirection: "row",
  },
  btn: {
    width: "auto",
    paddingHorizontal: 15,
    paddingVertical: 3,
    borderRadius: 20,
    backgroundColor: COLORS.ctaBlue,
    justifyContent: "center",
    alignItems: "center",
  },
  mahallahTxt: {
    marginBottom: 18,
    fontSize: 18,
    fontWeight: 700,
    color: COLORS.black,
  },
  btnGo: {
    color: COLORS.white,
  },
});

export default MahallahCard;
=======
import { StyleSheet, Text, View, TouchableOpacity, Linking, Image } from "react-native";
import React from "react";
import { COLORS } from "../constants";

const mahallahImages = {
  Uthman: require("../assets/mahallah/Uthman.png"),
  Siddiq: require("../assets/mahallah/Siddiq.png"),
  Ali: require("../assets/mahallah/Ali.png"),
  Faruq: require("../assets/mahallah/Faruq.png"),
  Bilal: require("../assets/mahallah/Bilal.png"),
  Zubair: require("../assets/mahallah/Zubair.png"),
};


const MahallahCard = ({ mahallah }) => {
  const openMapsApp = () => {
    const url =
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent(`Mahallah ${mahallah}`);
    Linking.openURL(url);
  };

  const imagePath = mahallahImages[mahallah];

  return (
    <View style={styles.container}>
      <Image source={imagePath} style={styles.mahallahPic} />
      <View style={styles.mahallahDetails}>
        <Text style={styles.mahallahTxt}>{`Mahallah ${mahallah}`}</Text>
        <View style={styles.btnRow}>
          {/* <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnInfo}>View Details</Text>
            </TouchableOpacity> */}
          <TouchableOpacity style={styles.btn} onPress={openMapsApp}>
            <Text style={styles.btnGo}>Direction</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    borderBottomWidth: 1,
    flexDirection: "row",
    marginBottom: 10,
    // borderWidth:1,
    paddingHorizontal: 8,
    paddingTop: 6,
    paddingBottom: 10,
  },
  mahallahPic: {
    width: "30%",
    height: 100,
    backgroundColor: COLORS.white,
  },
  mahallahDetails: {
    flexDirection: "column",
    justifyContent: "center",
    width: 240,
    marginLeft: 18,
    // borderWidth:1,
  },
  btnRow: {
    flexDirection: "row",
  },
  btn: {
    width: "auto",
    paddingHorizontal: 15,
    paddingVertical: 3,
    borderRadius: 20,
    backgroundColor: COLORS.ctaBlue,
    justifyContent: "center",
    alignItems: "center",
  },
  mahallahTxt: {
    marginBottom: 18,
    fontSize: 18,
    fontWeight: 700,
    color: COLORS.black,
  },
  btnGo: {
    color: COLORS.white,
  },
});

export default MahallahCard;
>>>>>>> a0083ca69e521a472eceb9eedfd9f56e422241a0
