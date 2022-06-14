import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  ImageBackground,
} from "react-native";
import { Card, Title, List, Button } from "react-native-paper";

const UserProfileScreen = ({ navigation }) => {
  const { height } = useWindowDimensions();

  const userData = {
    firstName: "Wane",
    lastName: "Wade",
    age: 28,
    email: "wanewayde@gmail.com",
    runnerType: ["casual", "social"],
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.imageContainer}>
        {/* placeholder image, to be updated */}
        <ImageBackground
          style={styles.backgroundImage}
          imageStyle={{ opacity: 0.75 }}
          source={require("../../assets/images/backgroundProfile.png")}
          resizeMode="cover"
        >
          <Image
            style={[styles.profilePicture, { height: height * 0.3 }]}
            source={{
              uri: "https://xsgames.co/randomusers/avatar.php?g=male",
            }}
            resizeMode="contain"
          />
        </ImageBackground>
      </View>
      <View style={styles.userInfoContainer}>
        <View style={styles.userInfoHeader}>
          <Text style={styles.userFullName}>
            {userData.firstName} {userData.lastName}
          </Text>
          <Button
            onPress={() => alert("Edit!")}
            icon="account-edit"
            color="red"
            labelStyle={{ fontSize: 30 }}
          ></Button>
        </View>
        <View style={styles.userDataWrapper}>
          <Text style={styles.userDataFont}>Email: {userData.email}</Text>
        </View>
        <View style={styles.userDataWrapper}>
          <Text style={styles.userDataFont}>Age: {userData.age}</Text>
        </View>
        <View style={[styles.userDataWrapper, styles.tagsContainer]}>
          <Text style={styles.userDataFont}>Runner Type:</Text>
          {userData.runnerType.map((type, index) => {
            return (
              <Text style={[styles.tags, styles.userDataFont]} key={index}>
                {" "}
                {type}{" "}
              </Text>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UserProfileScreen;

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
    width: "48%",
    maxHeight: 200,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "black",
    alignSelf: "center",
    marginTop: "auto",
    marginBottom: "auto",
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
    backgroundColor: "rgba(233, 4, 4, 0.9)",
    marginHorizontal: 4,
    borderRadius: 6,
    borderColor: "red",
    borderWidth: 0.2,
    overflow: "hidden",
    padding: 3,
    color: "white",
    fontWeight: "bold",
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
  },
});
