import { StyleSheet, Text, View } from "react-native";
import React, {
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
} from "react";
import { db } from "../../config/firebase";
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
// import "react-native-get-random-values";
// import { v4 as uuidv4 } from "uuid";
import { NativeModules } from "react-native";

import { GiftedChat, Bubble, Avatar } from "react-native-gifted-chat";

const Chat = ({ route }) => {
  const [messages, setMessages] = useState([]);
  const { senderMatricNo, recipientMatricNo } = route.params;

  const generateUniqueID = () => {
    const timestamp = Date.now().toString(36);
    const randomChars = Math.random().toString(36).substring(2, 8);
    const uniqueID = `${timestamp}-${randomChars}`;
    return uniqueID;
  };

  const renderBubble = (props) => {
    // Customize the bubble style for sender and recipient
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#0084FF", // Set the background color for sender bubble
          },
          left: {
            backgroundColor: "white", // Set the background color for recipient bubble
          },
        }}
      />
    );
  };

  const renderAvatar = (props) => {
    // Remove the avatar for the recipient
    if (props.currentMessage.user._id === 2) {
      return null;
    }

    return <Avatar {...props} />;
  };

  useLayoutEffect(() => {
    // Check if the conversation exists
    const checkConversation = async () => {
      try {
        const querySnapshot = await getDocs(
          query(
            collection(db, "conversations"),
            where("senderMatricNo", "in", [senderMatricNo, recipientMatricNo]),
            where("recipientMatricNo", "in", [
              senderMatricNo,
              recipientMatricNo,
            ])
          )
        );

        if (querySnapshot.size > 0) {
          // Conversation exists, retrieve the existing conversation ID
          const conversationId = querySnapshot.docs[0].id;

          // Set up a listener for the messages collection to fetch live updates
          const messagesRef = collection(
            db,
            "conversations",
            conversationId,
            "messages"
          );
          const unsubscribe = onSnapshot(messagesRef, (snapshot) => {
            const updatedMessages = snapshot.docs.map((doc) => ({
              _id: doc.id,
              text: doc.data().text,
              createdAt: doc.data().createdAt.toDate(),
              user: {
                _id: doc.data().senderMatricNo === senderMatricNo ? 1 : 2,
                name:
                  doc.data().senderMatricNo === senderMatricNo
                    ? "You"
                    : "Other User",
              },
            }));
            updatedMessages.sort((a, b) => b.createdAt - a.createdAt);

            setMessages(updatedMessages);
          });

          // Clean up the listener when the component unmounts
          return () => unsubscribe();
        } else {
          // Conversation does not exist, create a new conversation document
          const newConversationRef = await addDoc(
            collection(db, "conversations"),
            {
              senderMatricNo: senderMatricNo,
              recipientMatricNo: recipientMatricNo,
            }
          );

          const newConversationId = newConversationRef.id;
          const messagesRef = collection(
            db,
            "conversations",
            newConversationId,
            "messages"
          );
          const unsubscribe = onSnapshot(messagesRef, (snapshot) => {
            const updatedMessages = snapshot.docs.map((doc) => ({
              _id: doc.id,
              text: doc.data().text,
              createdAt: doc.data().createdAt.toDate(),
              user: {
                _id: doc.data().senderMatricNo === senderMatricNo ? 1 : 2,
                name:
                  doc.data().senderMatricNo === senderMatricNo
                    ? "You"
                    : "Other User",
              },
            }));
            updatedMessages.sort((a, b) => b.createdAt - a.createdAt);

            setMessages(updatedMessages);
          });

          // Clean up the listener when the component unmounts
          return () => unsubscribe();

          // Set the conversation ID in the state or use it to store in the context for future use

          // ...
        }
      } catch (error) {
        console.log("Error checking conversation:", error);
      }
    };

    checkConversation();
  }, [senderMatricNo, recipientMatricNo]);

  const onSend = useCallback(
    async (messages = []) => {
      try {
        const newMessages = messages.map((message) => ({
          _id: generateUniqueID(),
          text: message.text,
          createdAt: new Date(),
          senderMatricNo: senderMatricNo,
          user: {
            _id: 1,
          },
        }));

        const conversationQuerySnapshot = await getDocs(
          query(
            collection(db, "conversations"),
            where("senderMatricNo", "in", [senderMatricNo, recipientMatricNo]),
            where("recipientMatricNo", "in", [
              senderMatricNo,
              recipientMatricNo,
            ])
          )
        );

        if (conversationQuerySnapshot.size > 0) {
          // Conversation exists, retrieve the existing conversation ID
          const conversationId = conversationQuerySnapshot.docs[0].id;

          // Add new messages to the messages subcollection of the existing conversation
          for (const newMessage of newMessages) {
            await addDoc(
              collection(db, "conversations", conversationId, "messages"),
              newMessage
            );
          }
        } else {
          // Conversation does not exist
          // Create a new conversation document
          const newConversationRef = await addDoc(
            collection(db, "conversations"),
            {
              senderMatricNo: senderMatricNo,
              recipientMatricNo: recipientMatricNo,
            }
          );

          const newConversationId = newConversationRef.id;

          // Add new messages to the messages subcollection of the new conversation
          for (const newMessage of newMessages) {
            await addDoc(
              collection(db, "conversations", newConversationId, "messages"),
              newMessage
            );
          }
        }
        // setMessages((previousMessages) =>
        //   GiftedChat.append(previousMessages, newMessages)
        // );
      } catch (error) {
        console.log("Error sending message:", error);
      }
    },
    [senderMatricNo, recipientMatricNo]
  );

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1,
      }}
      renderBubble={renderBubble}
      renderAvatar={renderAvatar}
    />
  );
};

export default Chat;

const styles = StyleSheet.create({});
