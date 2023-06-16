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

const ChangePw = () => {
  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.container}>
        <Text>ChangePw</Text>
      </View>
    </SafeAreaView>
  );
};

export default ChangePw;

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
});
