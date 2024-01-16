<<<<<<< HEAD
import { StyleSheet, Text, View, SafeAreaView, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { COLORS } from "../../constants";
import Message from "../../components/Message";


import { db } from "../../config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const Inbox = ({route}) => {
  const { matricNo } = route.params;
  const [usersData, setUsersData] = useState([]);

  const fetchUsersData = async () => {
    try {
      const querySnapshot = await getDocs(query(collection(db, 'users'), where('role', '==', 'student')));
      const usersData = querySnapshot.docs.map((doc) => doc.data()).filter((doc) => doc.matricNo !== parseInt(matricNo));
      setUsersData(usersData);
    } catch (error) {
      console.log("Error fetching users data:", error);
    }
  };

  useEffect(() => {
    fetchUsersData();
  }, []);

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Inbox</Text>
      </View>

      <View style={styles.container}>
        {usersData.map((user) => (
          <Message key={user.matricNo} currentMatricNo={parseInt(matricNo)} item={user} />
        ))}
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
    paddingHorizontal: 3,
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
  headerText: {
    flex: 1,
    alignItems: "flex-start",
    fontSize: 27,
    fontWeight: 600,
    color: COLORS.primary,
  },
});

export default Inbox;
=======
import { StyleSheet, Text, View, SafeAreaView, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { COLORS } from "../../constants";
import Message from "../../components/Message";


import { db } from "../../config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const Inbox = ({route}) => {
  const { matricNo } = route.params;
  const [usersData, setUsersData] = useState([]);

  const fetchUsersData = async () => {
    try {
      const querySnapshot = await getDocs(query(collection(db, 'users'), where('role', '==', 'student')));
      const usersData = querySnapshot.docs.map((doc) => doc.data()).filter((doc) => doc.matricNo !== parseInt(matricNo));
      setUsersData(usersData);
    } catch (error) {
      console.log("Error fetching users data:", error);
    }
  };

  useEffect(() => {
    fetchUsersData();
  }, []);

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Inbox</Text>
      </View>

      <View style={styles.container}>
        {usersData.map((user) => (
          <Message key={user.matricNo} currentMatricNo={parseInt(matricNo)} item={user} />
        ))}
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
    paddingHorizontal: 3,
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
  headerText: {
    flex: 1,
    alignItems: "flex-start",
    fontSize: 27,
    fontWeight: 600,
    color: COLORS.primary,
  },
});

export default Inbox;
>>>>>>> a0083ca69e521a472eceb9eedfd9f56e422241a0
