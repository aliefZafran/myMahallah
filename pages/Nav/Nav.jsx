<<<<<<< HEAD
import { StyleSheet, Text, View, SafeAreaView, TextInput, FlatList, Linking } from "react-native";
import React, { useState } from "react";
import { COLORS } from "../../constants";
import { FontAwesome } from "@expo/vector-icons";
import MahallahCard from "../../components/MahallahCard";

const Nav = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const data = ['Uthman', 'Siddiq', 'Ali', 'Faruq', 'Bilal', 'Zubair'];

  const filteredData = data.filter((item) =>
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Mahallah Directory</Text>
        </View>
        <View style={styles.search}>
          <View style={styles.searchBar}>
            <FontAwesome
              name="search"
              size={24}
              color={COLORS.gray}
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Where to?"
              placeholderTextColor={COLORS.gray}
              value={searchQuery}
              onChangeText={(query) => setSearchQuery(query)}
            />
          </View>
        </View>

        <FlatList
          style={{width:'100%',}}
          data={filteredData}
          renderItem={({ item }) => <MahallahCard mahallah={item} item={item} />}
        />


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
    alignItems: "center",
  },
  header: {
    width: "100%",
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 7,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerText: {
    fontSize: 27,
    top: 10,
    fontWeight: 600,
    color: COLORS.primary,
  },
  search: {
    width: '100%',
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  searchBar: {
    height: 50,
    width: '94%',
    borderRadius: 100,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 6,
  },
  input: {
    height: '100%',
    width: '90%',
    fontSize: 16,
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
});

export default Nav;
=======
import { StyleSheet, Text, View, SafeAreaView, TextInput, FlatList, Linking } from "react-native";
import React, { useState } from "react";
import { COLORS } from "../../constants";
import { FontAwesome } from "@expo/vector-icons";
import MahallahCard from "../../components/MahallahCard";

const Nav = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const data = ['Uthman', 'Siddiq', 'Ali', 'Faruq', 'Bilal', 'Zubair'];

  const filteredData = data.filter((item) =>
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Mahallah Directory</Text>
        </View>
        <View style={styles.search}>
          <View style={styles.searchBar}>
            <FontAwesome
              name="search"
              size={24}
              color={COLORS.gray}
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Where to?"
              placeholderTextColor={COLORS.gray}
              value={searchQuery}
              onChangeText={(query) => setSearchQuery(query)}
            />
          </View>
        </View>

        <FlatList
          style={{width:'100%',}}
          data={filteredData}
          renderItem={({ item }) => <MahallahCard mahallah={item} item={item} />}
        />


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
    alignItems: "center",
  },
  header: {
    width: "100%",
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 7,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerText: {
    fontSize: 27,
    top: 10,
    fontWeight: 600,
    color: COLORS.primary,
  },
  search: {
    width: '100%',
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  searchBar: {
    height: 50,
    width: '94%',
    borderRadius: 100,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 6,
  },
  input: {
    height: '100%',
    width: '90%',
    fontSize: 16,
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
});

export default Nav;
>>>>>>> a0083ca69e521a472eceb9eedfd9f56e422241a0
