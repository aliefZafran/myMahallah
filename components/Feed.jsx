import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { FontAwesome, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../constants";

const Feed = ({ userMatricNo, item }) => {
  const nav = useNavigation();
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };
  const heartColor = liked ? "red" : "gray";

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <TouchableOpacity
          onPress={() => {
            if (parseInt(item.matricNo) !== parseInt(userMatricNo) && item.username !== 'Mahallah Office @ Uthman') {
              nav.navigate("Profile", { senderMatricNo: userMatricNo, matricNo: item.matricNo });
            }else if (parseInt(item.matricNo) === parseInt(userMatricNo)){
              nav.navigate("My Profile", { matricNo: userMatricNo })
            }else{
              null
            }
          }}
        >
          <Image
            style={styles.pfp}
            source={{uri:item.pfp}}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.username}>
            {item.username}
          </Text>
          <Text style={styles.time}>{item.time}  {item.date}</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.text}>
            {item.content ? item.content : "null"}
          </Text>
        </View>
        <View style={styles.footer}>
          {/* comment feature */}
          {/* <TouchableOpacity>
            <Feather
              style={styles.icon}
              name="message-circle"
              size={20}
              color="gray"
            />
          </TouchableOpacity> */}
          <TouchableOpacity onPress={handleLike}>
            <Feather
              style={styles.icon}
              name="heart"
              size={20}
              color={heartColor}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 8,
    width: "100%",
    marginTop: 4,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
  },
  avatar: {
    width: "12%",
    height: 42,
    borderRadius: 20,
    position: "relative",
  },
  pfp: {
    width: 47,
    height: 47,
    borderRadius: 100,
    borderWidth: 2, // Set the border width to 2
    borderColor: COLORS.primary,
  },
  content: {
    flex: 1,
    flexDirection: "column",
    marginLeft: 12,
  },
  header: {
    flexDirection: "column",
    marginBottom: 8,
  },
  username: {
    fontSize: 12,
    fontWeight: "bold",
    color: "black",
  },
  time: {
    fontSize: 12,
    color: "gray",
    paddingVertical: 2,
  },
  text: {
    textAlign: "left",
    fontSize: 14,
    lineHeight: 20,
  },
  tweetImage: {
    marginTop: 8,
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  footer: {
    flexDirection: "row",
    marginTop: 8,
  },
  icon: {
    marginRight: 20,
  },
});

export default Feed;
