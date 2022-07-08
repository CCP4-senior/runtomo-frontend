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
  Animated
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
      duration: 500,
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
      isLoginUser ? setUserData(user) : getAndSetUserData(userToView.id);

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
            {/* Images */}

            <View style={styles.imageContainer}>
              {/* Leave for now, may add background image back later */}
              {/* <ImageBackground
                style={styles.backgroundImage}
                imageStyle={{ opacity: 0.4 }}
                source={require("../../assets/images/backgroundProfile.png")}
                resizeMode="cover"
              >
              </ImageBackground>  */}
              <Animated.View style={{opacity}}>
                
                {/* Profile picture */}
                {userData?.imageUrl && (
                  <Avatar.Image
                    style={styles.profilePicture}
                    source={{ uri: userData?.imageUrl }}
                    size={200}
                    onLoadEnd={fadeAnimation}
                    backgroundColor={Color.GrayDark}
                  />
                )}

                {/* Profile picture (default) */}

                {!userData?.imageUrl && (
                  <Avatar.Icon
                    style={[
                      styles.profilePicture,
                      {
                        backgroundColor: Color.GrayDark,
                      }
                    ]}
                    icon="account"
                    size={250}
                    onLoadEnd={fadeAnimation}
                  />
                )}
                </Animated.View>
            </View>

            {/* User information */}

            <View style={styles.userInfoContainer}>
              {/* Username */}

              <View style={styles.userInfoHeader}>
                <Text style={styles.userFullName}>{userData?.username}</Text>

                {/* Edit Profile button */}

                {isLoginUser && (
                  <IconButton
                    onPress={() => navigation.navigate("Edit Profile")}
                    icon="account-edit"
                    size={29}
                    color={Color.PrimaryMain}
                    style={{ width: 30 }}
                  />
                )}

                {/* Edit Profile Photo button */}

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

              {/* Age */}

              <View style={styles.userDataWrapper}>
                <Text style={styles.userDataFont}>
                  Age:{" "}
                  {getAge(userData?.profile?.["date_of_birth"]) ||
                    "Not provided"}
                </Text>
              </View>

              {/* Run Frequency */}

              <View style={styles.userDataWrapper}>
                <Text style={styles.userDataFont}>
                  Run Frequency:{" "}
                  {userData?.profile
                    ? userData.profile?.["run_frequency"] + " times / week"
                    : "Not provided"}
                </Text>
              </View>

              {/* Estimate 5k */}

              <View style={styles.userDataWrapper}>
                <Text style={styles.userDataFont}>
                  Estimated 5k:{" "}
                  {userData?.profile
                    ? userData.profile["estimated5k"]
                    : "Not provided"}
                </Text>
              </View>

              <View style={styles.userDataWrapper}>
                <Text style={styles.userDataFont}>
                  Estimated 10k:{" "}
                  {userData?.profile
                    ? userData.profile["estimated10k"]
                    : "Not provided"}
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
    height: 200,
  },
  profilePicture: {
    width: 200,
    maxHeight: 200,
    borderRadius: 200 / 2,
    marginTop: 30,
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
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
