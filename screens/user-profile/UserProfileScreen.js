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
  Animated,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
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
  const { generateImageUrl } = useContext(DataContext);

  const userToView = route.params.userToView;
  const isLoginUser = userToView.id === user.id;

  const { height } = useWindowDimensions();
  const [isImageAvailable, setIsImageAvailable] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [imageUri, setImageUri] = useState("");
  const [wantsToDelete, setWantsToDelete] = useState(false);
  const [userData, setUserData] = useState(null);

  const controller = new AbortController();

  const [opacity, setOpacity] = useState(new Animated.Value(0));

  const fadeAnimation = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const getAndSetUserData = async (id) => {
    try {
      const response = await axiosInstance(`/users/${id}/`, {
        signal: controller.signal,
      });

      setUserData({
        ...response.data,
        imageUrl: response.data.image
          ? generateImageUrl(response.data.image)
          : null,
      });
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

  useFocusEffect(
    React.useCallback(() => {
      if (isLoginUser) {
        setUserData(user);
      } else {
        const response = getAndSetUserData(userToView.id);
      }

      return () => {
        controller.abort();
      };
    }, [user])
  );

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
              <ImageBackground
                style={styles.backgroundImage}
                source={require("../../assets/images/profile-bg.png")}
                resizeMode="cover"
              >
                <Animated.View style={[styles.avatarContainer, { opacity }]}>
                  {!userData?.imageUrl && (
                    <Avatar.Image
                      size={180}
                      source={require("../../assets/images/avatar-blank.png")}
                      backgroundColor={"transparent"}
                      style={styles.profilePicture}
                    />
                  )}

                  {userData?.imageUrl && (
                    <Avatar.Image
                      size={180}
                      source={{ uri: userData.imageUrl }}
                      onLoadEnd={fadeAnimation}
                      backgroundColor={"transparent"}
                      style={styles.profilePicture}
                    />
                  )}
                </Animated.View>
              </ImageBackground>
            </View>

            <View style={styles.userInfoContainer}>
              <Animated.View style={{ opacity }}>
                <View style={styles.userInfoHeader}>
                  <Text style={styles.userFullName}>
                    {userData?.username || " "}
                  </Text>

                  {isLoginUser && (
                    <IconButton
                      onPress={() => navigation.navigate("Edit Profile")}
                      icon="account-edit"
                      size={29}
                      color={Color.PrimaryMain}
                      style={{ width: 30 }}
                    />
                  )}

                  {isLoginUser && (
                    <IconButton
                      onPress={showModal}
                      icon="camera-flip"
                      size={29}
                      color={Color.PrimaryMain}
                      style={{ width: 30 }}
                    />
                  )}
                </View>

                <View style={styles.descriptionContainer}>
                  <Text
                    style={styles.descriptionText}
                    // onLoad={fadeAnimation}
                  >
                    {userData?.profile?.description || " "}
                  </Text>
                </View>

                <View style={styles.infoSection}>
                  <View style={styles.infoItem}>
                    <Text style={styles.infoTitle}>AGE</Text>
                    <Text style={styles.infoText}>
                      {getAge(userData?.profile?.["date_of_birth"]) ||
                        "Not provided"}
                    </Text>
                  </View>

                  <View style={styles.infoItem}>
                    <Text style={styles.infoTitle}>RUN FREQUENCY</Text>
                    <Text style={styles.infoText}>
                      {userData?.profile
                        ? userData.profile?.["run_frequency"] + " times / week"
                        : "Not provided"}
                    </Text>
                  </View>

                  <View style={styles.infoItem}>
                    <Text style={styles.infoTitle}>ESTIMATED 5K</Text>
                    <Text style={styles.infoText}>
                      {userData?.profile
                        ? userData.profile["estimated5k"]
                        : "Not provided"}
                    </Text>
                  </View>

                  <View style={styles.infoItem}>
                    <Text style={styles.infoTitle}>ESTIMATED 10K</Text>
                    <Text style={styles.infoText}>
                      {userData?.profile
                        ? userData.profile["estimated10k"]
                        : "Not provided"}
                    </Text>
                  </View>
                </View>
              </Animated.View>
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
    backgroundColor: Color.Fill,
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
    justifyContent: "center",
    alignContent: "center",
  },
  profilePicture: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
  userInfoContainer: {
    flex: 2,
    padding: 20,
  },
  userFullName: {
    fontSize: 36,
    fontWeight: "bold",
    alignSelf: "center",
  },
  userInfoHeader: {
    flexDirection: "row",
    alignSelf: "center",
    margin: 5,
  },
  descriptionContainer: {
    margin: 10,
    marginBottom: 20,
    width: "90%",
    alignSelf: "center",
  },
  descriptionText: {
    fontSize: 20,
    // letterSpacing: 0.5,
    fontWeight: "500",
    textAlign: "center",
    color: "#484848",
    padding: 5,
  },
  infoSection: {
    backgroundColor: Color.White,
    borderRadius: 20,
    padding: 20,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  infoItem: {
    marginLeft: 10,
    marginVertical: 15,
  },
  infoTitle: {
    fontSize: 20,
    color: Color.PrimaryMain,
    fontWeight: "bold",
    marginBottom: 2,
  },
  infoText: {
    fontSize: 20,
    color: "#363D4E",
  },
  avatarAnimatedContainer: {},
  avatarContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    avatar: { backgroundColor: Color.GrayDark },
  },
});
