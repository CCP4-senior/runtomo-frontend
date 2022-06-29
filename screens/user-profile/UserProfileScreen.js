import React, { useState, useContext, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  useWindowDimensions,
  ImageBackground,
  Icon,
} from "react-native";
import { AuthContext } from "../../context/authcontext/AuthContext";
import { Button } from "react-native-paper";
import Color from "../../assets/themes/Color";
import { TouchableOpacity } from "react-native-web";

const UserProfileScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  console.log("🍎 user:", user);

  const { height } = useWindowDimensions();
  const [isImageAvailable, setIsImageAvailable] = useState(false);

  const mockData = {
    username: "wadeMock",
    email: "wadeMock@app.com",
    age: "34",
  };

  // TODO: replace userData with db info User is ready
  const userData = {
    username: user.username,
    age: user.age,
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
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
              source={require("../../assets/images/demo/wade.png")}
              resizeMode="contain"
            />
          </ImageBackground>
        </View>
        <View style={styles.userInfoContainer}>
          {/* Username */}

          <View style={styles.userInfoHeader}>
            <Text style={styles.userFullName}>{user.username}</Text>

            {/* Edit Profile button */}

            <Button
              onPress={() => navigation.navigate("Edit Profile")}
              icon="account-edit"
              color={Color.PrimaryMain}
              labelStyle={{
                fontSize: 30,
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
              }}
            />
          </View>

          {/* Date of Birth */}
          <View style={styles.userDataWrapper}>
            <Text style={styles.userDataFont}>
              Date of Birth: {user["profile"]["date_of_birth"]}
            </Text>
          </View>

          {/* Run Frequency */}
          <View style={styles.userDataWrapper}>
            <Text style={styles.userDataFont}>
              Run Frequency: {user["profile"]["run_frequency"]} / week
            </Text>
          </View>

          <View style={styles.userDataWrapper}>
            <Text style={styles.userDataFont}>
              Estimated 5k: {user["profile"]["estimated5k"]}
            </Text>
          </View>

          <View style={styles.userDataWrapper}>
            <Text style={styles.userDataFont}>
              Estimated 10k: {user["profile"]["estimated10k"]}
            </Text>
          </View>
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
  container: {
    flex: 1,
    backgroundColor: Color.Fill,
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
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
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
    marginVertical: 5,
  },
  userDataWrapper: {
    backgroundColor: Color.White,
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
