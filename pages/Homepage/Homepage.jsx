import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect } from "react";
import { FontAwesome, Feather, Entypo, Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants";
import Feed from "../../components/Feed";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../config/firebase";
import { collection, getDocs, where, query, doc, updateDoc } from "firebase/firestore";

const Homepage = ({ route }) => {
  const navigation = useNavigation();
  const { matricNo } = route.params;
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchPosts();
    });

    return unsubscribe;
  }, [navigation, fetchPosts]);

  useEffect(() => {
    fetchPosts();
  }, []);


  const fetchPosts = async () => {
    try {
      const postsRef = collection(db, "posts");
      const querySnapshot = await getDocs(postsRef);
      const fetchedPosts = [];

      for (const postDoc of querySnapshot.docs) {
        const postData = postDoc.data();
        const id = postDoc.id;
        const username = postData.name.split("bin")[0].trim();
        const timestamp = postData.timestamp.toDate();
        const hours = timestamp.getHours().toString().padStart(2, "0");
        const minutes = timestamp.getMinutes().toString().padStart(2, "0");
        const time = `${hours}:${minutes}`;
        const date = timestamp.toISOString().split("T")[0];

        const matricNo = postData.matricNo;
        // Fetch the user document to get the pfp field
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("matricNo", "==", parseInt(matricNo)));
        const userQuerySnapshot = await getDocs(q);

        if (!userQuerySnapshot.empty) {
          const userDoc = userQuerySnapshot.docs[0];
          const userData = userDoc.data();
          const pfp = userData.pfp;
          const post = {
            id,
            pfp,
            username,
            date,
            time,
            ...postData,
            pfp: userData.pfp,
          };
          fetchedPosts.push(post);

          const postRef = doc(db, "posts", id);
          await updateDoc(postRef, { pfp: userData.pfp });
        }
      }

      const sortedPosts = fetchedPosts.sort(
        (a, b) => b.timestamp - a.timestamp
      );
      setPosts(sortedPosts);
    } catch (error) {
      console.log("Error fetching posts:", error);
    }
  };

  const renderPost = ({ item }) => {
    return <Feed userMatricNo={matricNo} item={item} />;
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchPosts();
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>MyMahallah</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("My Room", {matricNo: matricNo});
            }}
          >
            <Ionicons
              style={styles.icon}
              name="ios-bed"
              size={34}
              color={COLORS.primary}
            />
          </TouchableOpacity>
        </View>

        <FlatList
          data={posts}
          renderItem={renderPost}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        />
        <View style={styles.btn}>
          <TouchableOpacity
            style={styles.plusIcon}
            onPress={() =>
              navigation.navigate("New post", { matricNo: matricNo })
            }
          >
            <Entypo name="megaphone" size={40} color={COLORS.bgColor} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 4,
    backgroundColor: COLORS.bgColor,
  },
  container: {
    flex: 1,
    width: "100%",
  },
  header: {
    width: "100%",
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 7,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  title: {
    flex: 1,
    alignItems: "flex-start",
    fontSize: 27,
    fontWeight: 600,
    color: COLORS.primary,
  },
  icon: {
    // flex: 1,
    alignItems: "flex-end",
  },
  btn: {
    flexDirection: "row-reverse",
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  plusIcon: {
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 70,
    borderRadius: 35,
  },
});

export default Homepage;
