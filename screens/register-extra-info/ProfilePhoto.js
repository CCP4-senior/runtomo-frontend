import React, { useState } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { TextInput, IconButton, Provider, Button } from "react-native-paper";
import uploadImage from "../../helpers/uploadImage.js";
import resizeImage from "../../helpers/resizeImage.js";
import selectImage from "../../helpers/selectImage.js";
import Color from "../../assets/themes/Color";

const ProfilePhoto = () => {
  const [imageUri, setImageUri] = useState("");
  const deleteImage = () => {
    setImageUri("");
  };
  return (
    <SafeAreaView style={styles.root}>
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
              <Image source={{ uri: imageUri }} style={styles.selectedPhoto} />
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
          Next
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default ProfilePhoto;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    // justifyContent: "center",
    backgroundColor: Color.White,
  },
  title: {
    // height: 20,
    // backgroundColor: "red",
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
    // backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
  },
  imagePlaceholderBackground: {
    justifyContent: "center",
    // backgroundColor: "blue",
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
    // backgroundColor: "blue",
  },
  selectedPhoto: {
    position: "relative",
    height: 200,
    width: 200,
    borderRadius: 200,
    alignSelf: "center",
  },
  //   imageOverlay: {
  //     position: "absolute",
  //     top: 12,
  //     left: 10,
  //     height: 200,
  //     width: "100%",
  //     backgroundColor: "rgba(52, 52, 52, 0.7)",
  //   },

  inputs: {
    alignItems: "center",
  },
  button: {
    width: "75%",
    borderRadius: 10,
    alignSelf: "center",
    marginVertical: 20,
  },
  input: {
    width: "90%",
    marginVertical: 20,
  },
  titleText: {
    fontSize: 28,
    fontWeight: "700",
    letterSpacing: 0.36,
  },
  datePickerContainer: {
    marginBottom: 20,
  },
  dobHeader: { marginBottom: 10, alignSelf: "flex-start", marginLeft: 20 },
  timesPerWeekBtnHeader: {
    marginBottom: 20,
    alignSelf: "flex-start",
    marginLeft: 20,
  },
  estimate5kHeader: {
    marginBottom: 20,
    alignSelf: "flex-start",
    marginLeft: 20,
  },
  estimate10kHeader: {
    marginBottom: 20,
    alignSelf: "flex-start",
    marginLeft: 20,
  },
  timesPerWeekBtnWrapper: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "center",
    marginLeft: 10,
  },
  estimatedKmBtnWrapper: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "center",
    marginLeft: 10,
  },
  timesPerWeekBtns: {
    borderRadius: 20,
    width: 80,
    marginRight: 10,
    marginBottom: 10,
  },
  estimatedKmBtns: {
    borderRadius: 20,
    width: 112,
    marginRight: 10,
    marginBottom: 10,
  },
  btnSelected: {
    backgroundColor: Color.PrimaryMedium,
  },
  btnNotSelected: {
    backgroundColor: "transparent",
  },
});
