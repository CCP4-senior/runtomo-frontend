import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import {
  IconButton,
  Provider,
  Button,
  Portal,
  Dialog,
  Paragraph,
} from "react-native-paper";
import uploadImage from "../../helpers/uploadImage.js";
import resizeImage from "../../helpers/resizeImage.js";
import selectImage from "../../helpers/selectImage.js";
import Color from "../../assets/themes/Color";
import { AuthContext } from "../../context/authcontext/AuthContext.js";

const ProfilePhoto = ({ route }) => {
  const { username, email, password } = route.params;
  const { createUser, createUserProfile, userToBeRegistered } =
    useContext(AuthContext);
  const [imageUri, setImageUri] = useState("");
  const [visible, setVisible] = useState(false);
  const [imageRef, setImageRef] = useState(null);
  const deleteImage = () => {
    setImageUri("");
  };
  const showDialog = () => setVisible(true);
  const hideDialog = () => {
    setVisible(false);
  };

  const handlePress = async () => {
    if (imageUri === "") {
      showDialog();
    } else {
      const newUri = await resizeImage(imageUri);
      const currentRef = await uploadImage("events", newUri);
      setImageRef(currentRef);

      createUserAndProfile();
    }
  };

  const createUserAndProfile = async () => {
    try {
      await createUser({ username, email, password });
      await createUserProfile({ ...userToBeRegistered, image: imageRef });
    } catch (e) {
      alert("Something went wrong! Please try again");
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <Provider>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Confirmation</Dialog.Title>
            <Dialog.Content>
              <Paragraph>
                You haven't selected your profile photo! Add it now?
              </Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog} color={Color.PrimaryMain}>
                Add now
              </Button>
              <Button onPress={createUserAndProfile} color="grey">
                Later
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

        {/*  Title */}
        <View style={styles.title}>
          <Text style={styles.titleText}>My Picture</Text>
        </View>
        <View style={styles.subtitle}>
          <Text style={styles.subtitleText}>
            Show who you are by selecting your profile photo!
          </Text>
        </View>

        {/* Image picker */}
        <View style={styles.mainContainer}>
          {imageUri === "" && (
            <TouchableOpacity
              onPress={async () => {
                await selectImage(setImageUri);
              }}
            >
              <View
                backgroundColor="#fff"
                style={styles.imagePlaceholderBackground}
              >
                <View style={styles.imageLogo}>
                  <IconButton
                    icon="camera"
                    color={Color.PrimaryMain}
                    size={100}
                  />
                </View>
              </View>
            </TouchableOpacity>
          )}

          {imageUri !== "" && (
            <View style={styles.imageBackground}>
              <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                Profile Photo
              </Text>
              {imageUri !== "" && (
                <Image
                  source={{ uri: imageUri }}
                  style={styles.selectedPhoto}
                />
              )}
              <View style={styles.imageOverlay}></View>
              <Button color={Color.PrimaryMain} onPress={deleteImage}>
                Delete
              </Button>
            </View>
          )}
        </View>

        <View style={styles.button}>
          <Button
            mode="contained"
            uppercase={false}
            color={Color.PrimaryMain}
            style={{ borderRadius: 10 }}
            labelStyle={{
              fontWeight: "bold",
              fontSize: 18,
            }}
            contentStyle={{
              padding: 5,
            }}
            onPress={() => handlePress()}
          >
            Register
          </Button>
        </View>
      </Provider>
    </SafeAreaView>
  );
};

export default ProfilePhoto;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.White,
  },
  title: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: "15%",
  },
  titleText: {
    fontSize: 28,
    fontWeight: "700",
    letterSpacing: 0.36,
  },
  subtitle: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 20,
  },
  subtitleText: {
    fontSize: 16,
    color: Color.Text,
  },
  mainContainer: {
    height: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  imagePlaceholderBackground: {
    justifyContent: "center",
    width: 120,
    height: 120,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  imageLogo: {
    borderStyle: "dashed",
    borderWidth: 1.6,
    borderRadius: 15,
    borderColor: Color.PrimaryMain,
    width: 150,
    height: 150,
    alignItems: "center",
    justifyContent: "center",
  },
  imageBackground: {
    width: "90%",
    padding: 10,
    paddingTop: 25,
    height: 230,
    alignSelf: "center",
    margin: 5,
    justifyContent: "center",
    borderRadius: 10,
  },
  selectedPhoto: {
    position: "relative",
    height: 200,
    width: 200,
    borderRadius: 200,
    alignSelf: "center",
  },

  button: {
    width: "75%",
    borderRadius: 10,
    alignSelf: "center",
    marginVertical: 20,
  },
  btnSelected: {
    backgroundColor: Color.PrimaryMedium,
  },
  btnNotSelected: {
    backgroundColor: "transparent",
  },
});
