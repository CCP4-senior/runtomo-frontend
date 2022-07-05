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
  ScrollView,
} from "react-native";
import { AuthContext } from "../../context/authcontext/AuthContext";
import { DataContext } from "../../context/datacontext/DataContext";
import { Avatar, Button, IconButton, Provider } from "react-native-paper";
import Color from "../../assets/themes/Color";
import { TouchableOpacity } from "react-native-web";
import ProfilePhotoModal from "./ProfilePhotoModal";
import axiosInstance from "../../helpers/axios.js";

function getAge(dateString) {
  var ageInMilliseconds = new Date() - new Date(dateString);
  return Math.floor(ageInMilliseconds / 1000 / 60 / 60 / 24 / 365);
}

const UserProfileScreen = ({ navigation, route }) => {
  const { user } = useContext(AuthContext);

  const userToView = route.params.userToView;
  const isLoginUser = userToView.id === user.id;

  const { height } = useWindowDimensions();
  const [isImageAvailable, setIsImageAvailable] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [imageUri, setImageUri] = useState("");
  const [wantsToDelete, setWantsToDelete] = useState(false);
  const [userData, setUserData] = useState(null);

  const getUserData = async (id) => {
    try {
      const response = await axiosInstance(`/users/${id}/`);
      setUserData(response.data);
      console.log("🍎 userData Gogo!:", userData);
    } catch (e) {
      console.log(e);
    }
  };

  const hideModal = () => {
    setModalVisible(false);
    setImageUri("");
  };
  const showModal = () => {
    setModalVisible(true);
  };

  const mockData = {
    username: "wadeMock",
    email: "wadeMock@app.com",
    age: "34",
  };

  useEffect(() => {
    isLoginUser ? setUserData(user) : getUserData(userToView.id);
  }, []);

  return (
    <Provider>
      <ProfilePhotoModal
        modalVisible={modalVisible}
        hideModal={hideModal}
        setImageUri={setImageUri}
        imageUri={imageUri}
        wantsToDelete={wantsToDelete}
        setWantsToDelete={setWantsToDelete}
      />

      <SafeAreaView style={styles.root}>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.imageContainer}>
              {/* placeholder image, to be updated */}
              <ImageBackground
                style={styles.backgroundImage}
                imageStyle={{ opacity: 0.75 }}
                source={require("../../assets/images/backgroundProfile.png")}
                resizeMode="cover"
              >
                {/* <Image
                style={[styles.profilePicture, { height: height * 0.3 }]}
                // source={require("../../assets/images/demo/wade.png")}
                resizeMode="contain"
              /> */}
                {user.imageUrl && (
                  <Avatar.Image
                    style={[styles.profilePicture]}
                    source={{ uri: user.imageUrl }}
                    size={200}
                  />
                )}
                {!user.imageUrl && (
                  <Avatar.Icon
                    style={[
                      styles.profilePicture,
                      {
                        backgroundColor: Color.GrayDark,
                      },
                    ]}
                    icon="account"
                    size={250}
                  />
                )}
              </ImageBackground>
            </View>
            <View style={styles.userInfoContainer}>
              {/* Username */}

              <View style={styles.userInfoHeader}>
                <Text style={styles.userFullName}>{userData && userData.username}</Text>

                {/* Edit Profile button */}

                {/* <Button
                onPress={() => navigation.navigate("Edit Profile")}
                icon="account-edit"
                color={Color.PrimaryMain}
                labelStyle={{
                  fontSize: 30,
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                }}
              /> */}
                <IconButton
                  onPress={() => navigation.navigate("Edit Profile")}
                  icon="account-edit"
                  size={29}
                  color={Color.PrimaryMain}
                  style={{ width: 30 }}
                />
                <IconButton
                  onPress={showModal}
                  icon="camera-flip-outline"
                  size={29}
                  color={Color.PrimaryMain}
                  style={{ width: 30 }}
                />
              </View>

              {/* Age */}
              <View style={styles.userDataWrapper}>
                <Text style={styles.userDataFont}>
                  Age:{" "}
                  {userData?.profile && getAge(userData["profile"]["date_of_birth"])}
                </Text>
              </View>

              {/* Date of Birth */}
              <View style={styles.userDataWrapper}>
                <Text style={styles.userDataFont}>
                  Date of Birth: {userData?.profile && userData["profile"]["date_of_birth"]}
                </Text>
              </View>

              {/* Run Frequency */}
              <View style={styles.userDataWrapper}>
                <Text style={styles.userDataFont}>
                  Run Frequency: {userData?.profile && userData["profile"]["run_frequency"]} / week
                </Text>
              </View>

              <View style={styles.userDataWrapper}>
                <Text style={styles.userDataFont}>
                  Estimated 5k: {userData?.profile && userData["profile"]["estimated5k"]}
                </Text>
              </View>

              <View style={styles.userDataWrapper}>
                <Text style={styles.userDataFont}>
                  Estimated 10k: {userData?.profile && userData["profile"]["estimated10k"]}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Provider>
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
