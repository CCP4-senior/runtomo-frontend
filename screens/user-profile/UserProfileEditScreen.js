import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  Image,
  useWindowDimensions,
  Button
} from "react-native";

import Color from "../../assets/themes/Color";


const UserProfileEditScreen = ({ navigation, user }) => {


  const { height } = useWindowDimensions();
  const [imageUrl, setImageUrl] = useState("wade.png");

  const userData = {
    username: user.username,
    age: user.age,
    runnerType: ["avid", "social"],
  };

  return (
    <SafeAreaView style={styles.root}>


    </SafeAreaView>
  );
};

export default UserProfileEditScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  imageContainer: {
    alignItems: "center",
  },
  backgroundImage: {
    width: "100%",
    height: 250,
  },
  profilePicture: {
    width: 200,
    maxHeight: 200,
    borderRadius: 200 / 2,
    borderWidth: 2,
    borderColor: Color.Black,
    alignSelf: "center",
    marginTop: "auto",
    marginBottom: "auto",
    overflow: "hidden",
  },
  userInfoContainer: {
    flex: 2,
    padding: 20,
  },
  userFullName: {
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
  },
  userInfoHeader: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 10,
  },
  tagsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  tags: {
    backgroundColor: Color.PrimaryMain,
    marginHorizontal: 4,
    borderRadius: 6,
    borderColor: Color.PrimaryMain,
    borderWidth: 0.2,
    overflow: "hidden",
    padding: 3,
    color: Color.White,
    fontWeight: "bold",
    fontSize: 16,
  },
  userDataWrapper: {
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
    padding: 20,
    width: "100%",
    marginBottom: 10,
  },
  userDataFont: {
    fontSize: 16,
    color: Color.Black,
    fontWeight: "500",
  },
});
