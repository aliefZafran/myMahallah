import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  TextInput,
  Text,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../constants";
import { db } from "../config/firebase";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  query,
  where,
} from "firebase/firestore";

const NewPost = () => {
  const nav = useNavigation();
  const route = useRoute();
  const { matricNo } = route.params;
  const [text, setText] = useState("");

  useEffect(() => {
    Keyboard.dismiss();
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      _keyboardDidShow
    );
    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);

  const _keyboardDidShow = () => {
    // you can do something here if needed
  };

  const getUserByMatricNo = async (matricNo) => {
    const userRef = collection(db, "users");
    const q = query(userRef, where("matricNo", "==", parseInt(matricNo)));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0].data(); //check extra if
      const userId = querySnapshot.docs[0].id;
      if (userDoc) {
        return { id: userId, ...userDoc };
      }
    }
    return null;
  };

  const post = async (content) => {
    try {
      const userDoc = await getUserByMatricNo(matricNo);
      if (userDoc) {
        const userRef = doc(db, "users", userDoc.id);
        const userSnapshot = await getDoc(userRef);

        if (userSnapshot.exists()) {
          const userPfp = userSnapshot.get("pfp");

          const postsRef = collection(db, "posts");
          await addDoc(postsRef, {
            content: content,
            timestamp: new Date(),
            matricNo: userDoc.matricNo,
            name: userDoc.name,
            pfp: userPfp,
          });
        }
      }
      console.log("post made");
      nav.goBack();
    } catch (err) {
      console.log("Error:", err);
    }
  };

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.btnRow}>
        <TouchableOpacity style={styles.btnCancel} onPress={() => nav.goBack()}>
          <Text style={{ textAlign: "center", fontWeight: "600" }}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnPost}
          onPress={() => {
            post(text);
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "600",
              color: COLORS.white,
            }}
          >
            Post
          </Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        multiline={true}
        textAlignVertical="top"
        value={text}
        onChangeText={setText}
        autoFocus={true} // automatically focus on the input when the page loads
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: COLORS.bgColor,
    alignItems: "center",
  },
  btnRow: {
    width: "95%",
    height: 40,
    marginHorizontal: 12,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btnCancel: {
    height: "100%",
    backgroundColor: COLORS.lightGray,
    justifyContent: "center",
    paddingHorizontal: 10,
    width: 100,
    borderRadius: 6,
  },
  btnPost: {
    height: "100%",
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    paddingHorizontal: 10,
    width: 100,
    borderRadius: 6,
  },
  input: {
    flex: 1,
    width: "95%",
    marginTop: 8,
    paddingHorizontal: 10,
    fontSize: 18,
    backgroundColor: COLORS.white,
    // borderWidth:1,
    borderRadius: 8,
    borderColor: COLORS.black,
  },
});

export default NewPost;
