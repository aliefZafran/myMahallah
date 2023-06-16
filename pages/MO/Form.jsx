import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { COLORS } from "../../constants";
import { FontAwesome } from "@expo/vector-icons";
import { db } from "../../config/firebase";
import { collection, getDocs, query, where, setDoc, doc } from "firebase/firestore";

const dismissKeyboard = () => {
  Keyboard.dismiss();
};

const Form = ({ route }) => {
  const { matricNo } = route.params;
  const [userData, setUserData] = useState(null);
  const [report, setReport] = useState("");
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState("");
  const nav = useNavigation();

  const fetchUserData = async () => {
    try {
      const userRef = collection(db, "users");
      const q = query(userRef, where("matricNo", "==", parseInt(matricNo)));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // Handle the case when the user's document is not found
        console.log("User not found");
        return;
      }

      const userData = querySnapshot.docs[0].data();
      setUserData(userData);
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [matricNo]);

  const handleDropdownSelect = (issue) => {
    setSelectedIssue(issue);
    setDropdownVisible(false);
  };

  const toggleDropdown = () => {
    setSelectedIssue(null);
    setDropdownVisible(!dropdownVisible);
  };

  const generateIncrementalID = async () => {
    try {
      // Fetch the current maximum ID from Firestore
      const querySnapshot = await getDocs(collection(db, "forms"));

      if (querySnapshot.empty) {
        const randomID = Math.floor(Math.random() * 10);
        return randomID;
      }
  
      // Get the maximum ID from the existing documents
      const maxID = querySnapshot.docs.reduce(
        (max, doc) => Math.max(max, parseInt(doc.id)),
        0
      );
  
      // Generate the next ID by incrementing the maximum ID
      const nextID = Math.floor(Math.random(maxID + 100) * 1000);
  
      return nextID;
    } catch (error) {
      console.error("Error generating incremental ID: ", error);
      throw error;
    }
  };

  const submitForm = async (issue, desc) => {
    try {
      setIsSubmitting(true);
      if (!issue || !desc) {
        // Handle the case when issue or desc is null or empty
        alert("Please fill in the form properly!");
        setSubmissionStatus("error");
        return;
      }

      const id = await generateIncrementalID();

      const formsRef = doc(collection(db, "forms"), id.toString());
      await setDoc(formsRef, {
        matricNo: userData.matricNo,
        room: userData.room ? userData.room : '',
        timestamp: new Date(),
        issue: issue,
        description: desc,
        status: "New",
        remarks: "",
        isComplete: false,
      });
      setSubmissionStatus("success");
      setTimeout(() => {
        nav.goBack();
      }, 1000);
    } catch (err) {
      console.log(err);
      setSubmissionStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <ScrollView style={styles.main}>
        <View style={styles.header}>
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>Form</Text>
        </View>
        <View style={styles.form}>
          <View style={styles.row}>
            <Text style={styles.txtDetails}>Name:</Text>
            <Text>{userData ? userData.name : "-"}</Text>
          </View>
          <View style={styles.secondRow}>
            <View style={styles.matricCol}>
              <Text style={styles.txtDetails}>Matric No:</Text>
              <Text>{matricNo}</Text>
            </View>
            <View style={styles.roomCol}>
              <Text style={styles.txtDetails}>Room:</Text>
              <Text>{userData && userData.room? userData.room : '-'}</Text>
            </View>
          </View>
        </View>

        <View style={styles.report}>
          <Text style={styles.reportHeader}>Report</Text>
          <View style={[styles.row, { alignItems: "baseline" }]}>
            <Text style={styles.txtDetails}>Issue:</Text>

            <TouchableOpacity
              style={styles.dropdownContainer}
              onPress={toggleDropdown}
            >
              <View style={styles.dropDownRow}>
                <Text style={styles.dropdownText}>
                  {selectedIssue || "Select an issue"}
                </Text>
                {dropdownVisible ? (
                  <FontAwesome name="angle-down" size={24} color="black" />
                ) : (
                  <FontAwesome name="angle-left" size={24} color="black" />
                )}
              </View>
              {dropdownVisible && (
                <View style={styles.dropdown}>
                  <TouchableOpacity
                    style={styles.dropdownOption}
                    onPress={() => handleDropdownSelect("Room Maintenance")}
                  >
                    <Text>Room Maintenance</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.dropdownOption}
                    onPress={() => handleDropdownSelect("Electrical")}
                  >
                    <Text>Electrical</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.dropdownOption}
                    onPress={() => handleDropdownSelect("Plumbing")}
                  >
                    <Text>Plumbing</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.dropdownOption}
                    onPress={() => handleDropdownSelect("Others")}
                  >
                    <Text>Others</Text>
                  </TouchableOpacity>
                </View>
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.description}>
            <Text style={styles.txtDetails}>Description:</Text>
            <TextInput
              style={styles.inputDesc}
              multiline={true}
              textAlignVertical="top"
              value={report}
              onChangeText={(text) => setReport(text)}
            />
          </View>
          <TouchableOpacity
            onPress={() => submitForm(selectedIssue, report)}
            disabled={isSubmitting} // Disable the button while submitting
          >
            <View style={styles.btn}>
              {isSubmitting ? (
                // Show the activity indicator while submitting
                <ActivityIndicator size="small" color="#ffffff" />
              ) : submissionStatus === "success" ? (
                // Show the tick icon if the form submission was successful
                <FontAwesome name="check" size={18} color="#ffffff" />
              ) : (
                // Show the "Submit" text if not submitting or submitted successfully
                <Text style={{ fontWeight: "bold", color: "#ffffff" }}>
                  Submit
                </Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: COLORS.bgColor,
    // borderWidth: 1,
    // borderColor: "red",
    padding: 20,
  },
  header: {
    width: "100%",
    height: "auto",
    alignItems: "center",
    // borderWidth: 1,
    // borderColor: "blue",
    marginBottom: 20,
  },
  form: {
    width: "100%",
    height: "auto",
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 30,
    // borderWidth: 1,
    // borderColor: "green",
    // marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    width: "100%",
    marginVertical: 3,
    paddingVertical: 4,
    alignItems: "center",
    // borderWidth:1,
  },
  secondRow: {
    flexDirection: "row",
    width: "100%",
    marginVertical: 3,
  },
  matricCol: {
    width: "60%",
    flexDirection: "row",
    alignItems: "center",
  },
  roomCol: {
    width: "40%",
    justifyContent: "flex-end",
    flexDirection: "row",
    alignItems: "center",
  },
  txtDetails: {
    marginRight: 6,
    fontWeight: 600,
  },
  report: {
    width: "100%",
    height: "auto",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 30,
    postition: "relative",
    // borderWidth: 1,
    // borderColor: "green",
    marginBottom: 20,
  },
  reportHeader: {
    fontSize: 22,
    fontWeight: 600,
    width: "100%",
    marginBottom: 4,
    // borderWidth:1,
  },
  input: {
    backgroundColor: COLORS.white,
    width: "50%",
    paddingHorizontal: 4,
    paddingVertical: 2,
    alignItems: "center",
    borderRadius: 5,
  },
  description: {
    width: "100%",
    marginVertical: 3,
    paddingVertical: 4,
    position: "relative",
    zIndex: -1000,
    // borderWidth:1
  },
  inputDesc: {
    width: "100%",
    backgroundColor: COLORS.white,
    padding: 5,
    borderRadius: 8,
    height: 150,
    marginTop: 10,
    borderWidth: 1,
    borderColor: COLORS.gray,
  },
  btn: {
    backgroundColor: COLORS.ctaBlue,
    justifyContent: "center",
    width: 100,
    alignItems: "center",
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 12,
  },
  dropdownContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    width: 180,
    paddingVertical: 2,
    paddingHorizontal: 8,
    position: "absolute",
    zIndex: 1000,
    left: 50,
    top: -5,
    borderWidth: 1,
    borderColor: COLORS.gray,
  },
  dropDownRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  dropdownOption: {
    marginVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
    paddingBottom: 3,
  },
});

export default Form;
