import React, { useState, useContext, useRef, useEffect } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { Avatar, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { formatRelative, addHours } from "date-fns";
import { DataContext } from "../../context/datacontext/DataContext";
import { AuthContext } from "../../context/authcontext/AuthContext";
import Color from "../../assets/themes/Color";
import axiosInstance from "../../helpers/axios";
import { navigationRef } from "../../navigations/RootNavigator";

const DialogCard = ({ message }) => {
  const { user } = useContext(AuthContext);
  const isSelf = message.comment_user.id === user.id;
  return (
    <View style={styles.contentContainer}>
      <View style={isSelf ? styles.selfCardContainer : styles.cardContainer}>
        {!isSelf && (
          <View style={styles.avatarContainer}>
            {message.comment_user.image ? (
              <Avatar.Image
                size={33}
                source={message.comment_user.image}
                style={styles.avatar}
              />
            ) : (
              <Avatar.Icon size={33} icon="account" style={styles.avatar} />
            )}
          </View>
        )}
        {!isSelf && (
          <View style={{ flexDirection: "column", alignItems: "flex-start" }}>
            <Text style={styles.username}>{message.comment_user.username}</Text>
            <View
              style={isSelf ? styles.selfTextContainer : styles.textContainer}
            >
              <Text style={styles.text}>{message.text}</Text>
            </View>
            <View>
              <Text style={isSelf ? styles.selfTime : styles.time}>
                {formatRelative(
                  addHours(new Date(message.created), 9),
                  new Date()
                )}{" "}
              </Text>
            </View>
          </View>
        )}
        {isSelf && (
          <>
            <View
              style={isSelf ? styles.selfTextContainer : styles.textContainer}
            >
              <Text style={styles.text}>{message.text}</Text>
            </View>
            <View>
              <Text style={isSelf ? styles.selfTime : styles.time}>
                {formatRelative(
                  addHours(new Date(message.created), 9),
                  new Date()
                )}{" "}
              </Text>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

const InputBox = ({ data, setData, currentEvent }) => {
  const [height, setHeight] = useState(45);
  const [message, setMessage] = useState("");
  const postMessage = async () => {
    try {
      const post = {
        text: message,
      };
      const response = await axiosInstance.post(
        `/event_comments/${currentEvent.id}/create_comment/`,
        post
      );
      setData([...data, response.data]);
      setMessage("");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.inputBar}>
      <View style={{ ...styles.inputContainer, height: height }}>
        <TextInput
          theme={styles.inputTheme}
          style={{ ...styles.input }}
          placeholder="Enter your message"
          onContentSizeChange={(event) => {
            setHeight(event.nativeEvent.contentSize.height * 1.6);
          }}
          onChangeText={(text) => {
            setMessage(text);
            if (text.length === 255) {
              alert(
                "Sorry! One message cannot exceed 255 character length. Please include the rest in the next message"
              );
            }
          }}
          value={message}
          blurOnSubmit={true}
          maxLength={255}
          multiline={true}
        />
      </View>
      <IconButton
        icon="send"
        color={message === "" ? Color.GrayDark : Color.PrimaryMain}
        size={25}
        onPress={() => {
          postMessage();
          Keyboard.dismiss();
        }}
      />
    </View>
  );
};

const Messages = () => {
  const navigation = useNavigation();
  const { currentEvent } = useContext(DataContext);
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(true);
  const scrollViewRef = useRef(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getMessages(1);
  }, []);

  const getMessages = async (page, data = []) => {
    try {
      let response = await axiosInstance(
        `/event_comments/${currentEvent.id}/comments/?page=${page}`
      );
      const newData = data.concat(response.data.results);
      if (response.data.next !== null) {
        console.log("next fetch ran with page", page + 1);
        await getMessages(page + 1, newData);
      } else {
        setData(newData);
      }
    } catch (e) {
      console.log(e.config);
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <IconButton
          icon={"chevron-left"}
          size={25}
          style={{ position: "absolute", left: 0 }}
          onPress={() => {
            navigationRef.navigate("Running Event");
          }}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Private messages for</Text>
          <Text style={styles.title}>{currentEvent.title}</Text>
        </View>
        <IconButton
          icon={"refresh"}
          size={25}
          style={{ position: "absolute", right: 0 }}
          onPress={() => getMessages(1)}
        />
      </View>
      <ScrollView
        style={styles.messages}
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({ animated: true })
        }
      >
        <View>
          {data.map((message) => (
            <DialogCard key={message.id} message={message} />
          ))}
        </View>
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <InputBox data={data} setData={setData} currentEvent={currentEvent} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Messages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: Color.Fill,
    width: "100%",
    paddingBottom: 80,
  },
  topContainer: {
    height: 50,
  },
  titleContainer: {
    alignSelf: "center",
  },
  title: {
    paddingHorizontal: 15,
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
  messages: {
    flex: 1,
    paddingHorizontal: 10,
  },
  selfCardContainer: {
    marginTop: 8,
    position: "relative",
    width: "100%",
    minHeight: 40,
    marginBottom: 2,
    justifyContent: "flex-end",
  },
  cardContainer: {
    marginTop: 3,
    position: "relative",
    width: "100%",
    minHeight: 40,
    flexDirection: "row",
    marginBottom: 2,
  },
  contentContainer: {
    width: "100%",
  },

  avatar: {
    backgroundColor: Color.GrayDark,
  },
  username: {
    lineHeight: 20,
    marginLeft: 5,
    fontWeight: "700",
  },
  selfTextContainer: {
    backgroundColor: "#66db30",
    right: 10,
    borderRadius: 10,
    minHeight: 50,
    maxWidth: "80%",
    padding: 10,
    justifyContent: "center",
    alignSelf: "flex-end",
  },
  textContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    minHeight: 50,
    maxWidth: "90%",
    padding: 10,
    justifyContent: "center",
  },
  text: {
    fontSize: 15,
  },
  selfTime: {
    right: 17,
    textAlign: "right",
    color: Color.Text,
    fontSize: 10,
    paddingTop: 2,
  },
  time: {
    color: Color.Text,
    fontSize: 10,
    textAlign: "left",
    left: 5,
    paddingTop: 2,
  },
  refreshButton: {
    position: "absolute",
    bottom: 80,
    left: 13,
    borderRadius: 30,
    width: 100,
    height: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4.84,

    elevation: 5,
  },
  inputBar: {
    backgroundColor: "#fff",
    minHeight: 70,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingTop: 5,
    paddingBottom: 5,
  },
  inputTheme: {
    colors: {
      placeholder: Color.Text,
    },
  },
  inputContainer: {
    backgroundColor: Color.GrayMedium,
    width: "80%",
    borderRadius: 30,
    paddingLeft: 15,
    paddingRight: 15,
    textAlignVertical: "center",
  },
  input: {
    fontSize: 16,
  },
});
