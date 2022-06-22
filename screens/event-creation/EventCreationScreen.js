import React, { useState, useEffect, useContext } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { TextInput, IconButton, Provider, Button } from "react-native-paper";
import {
  ref,
  uploadString,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import Color from "../../assets/themes/Color.js";
import DatePicker from "./DatePicker.js";
import AreaModal from "./AreaModal.js";
import DurationModal from "./DurationModal.js";
import GoogleSearchModal from "./GoogleSearchModal.js";
import LongButton from "../../components/LongButton.js";
import CustomInput from "../../components/CustomInput.js";
import axiosInstance from "../../helpers/axios.js";
import uploadImage from "../../helpers/uploadImage.js";
import { DataContext } from "../../context/datacontext/DataContext.js";

const EventCreationScreen = ({ navigation, setNewEvent, setData, data }) => {
  const { storage } = useContext(DataContext);
  const [title, setTitle] = useState("");
  const [meetingPoint, setMeetingPoint] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [ward, setWard] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [runningDuration, setRunningDuration] = useState("");
  const [areaModalVisible, setAreaModalVisible] = useState(false);
  const [durationModalVisible, setDurationModalVisible] = useState(false);
  const [googleModalVisible, setGoogleModalVisible] = useState(false);
  const [eventDescription, setEventDescription] = useState("");
  const [imageUri, setImageUri] = useState("");
  const [imageRef, setImageRef] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const hideModal = () => {
    setAreaModalVisible(false);
    setDurationModalVisible(false);
    setGoogleModalVisible(false);
  };

  // Currently, use the following button handler with static value to avoid sending backend data not accepted in the schema.
  const buttonHandler = async () => {
    try {
      const currentRef = await uploadImage("events", imageUri);
      setImageRef(currentRef);
      console.log("ref from imageUpload", currentRef);
      // const response = await axiosInstance.post("/events/", {
      //   title: title,
      //   location: meetingPoint,
      // });
    } catch (e) {
      console.log(e);
      alert("Something went wrong. Please try again!");
    }
  };

  // Leave as a reference. Once backend schema is ready, incorporate this data into the above buttonHandler.
  // const buttonHandler = () => {
  //   const requiredFields = [
  //     title,
  //     meetingPoint,
  //     ward,
  //     date,
  //     time,
  //     runningDuration,
  //   ];
  //   if (requiredFields.some((field) => field === "")) {
  //     setSubmitted(true);
  //     return;
  //   }

  //   const event = {
  //     id: 4,
  //     user: {
  //       id: 2,
  //       username: "WayneWadeRuns",
  //       age: 34,
  //       image: require("../../assets/images/demo/wade.png"),
  //     },
  //     title,
  //     meetingPoint,
  //     ward,
  //     date,
  //     time,
  //     runningDuration,
  //     eventDescription,
  //     participants: [],
  //     owner_id: 2,
  //     hasJoined: true,
  //   };
  //   setNewEvent(event);
  //   setData([...data, event]);
  //   navigation.navigate("Event Created");
  // };

  const selectImage = async () => {
    console.log("selectImage ran");
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 0.5,
      });

      if (!result.cancelled) {
        setImageUri(result.uri);
      }
    } catch (e) {
      alert("Something went wrong. Please try again!");
      console.log(e);
    }
  };

  const deleteImage = () => {
    setImageUri("");
  };

  return (
    <Provider>
      {/* LEAVE FOR REFERENCE, WE MIGHT NEED TO PUT IT BACK*/}
      {/* <AreaModal
        modalVisible={areaModalVisible}
        hideModal={hideModal}
        setWard={setWard}
      /> */}
      <DurationModal
        modalVisible={durationModalVisible}
        setRunningDuration={setRunningDuration}
        hideModal={hideModal}
      />
      <GoogleSearchModal
        modalVisible={googleModalVisible}
        hideModal={hideModal}
        setMeetingPoint={setMeetingPoint}
        setLatitude={setLatitude}
        setLongitude={setLongitude}
        setWard={setWard}
      />

      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <CustomInput
              placeholder="Event Title"
              value={title}
              changeHandler={(text) => setTitle(text)}
              submitted={submitted}
            />
          </View>
          {/* LEAVE FOR REFERENCE, WE MIGHT NEED TO PUT IT BACK*/}
          {/* <View style={styles.inputContainer}>
            <CustomInput
              placeholder="Area"
              onFocus={() => {
                if (ward === "") {
                  setAreaModalVisible(true);
                }
              }}
              value={ward}
              submitted={submitted}
            />
          </View> */}
          <View style={styles.inputContainer}>
            <CustomInput
              placeholder="Meeting Point Address"
              onFocus={() => setGoogleModalVisible(true)}
              value={meetingPoint}
              submitted={submitted}
            />
          </View>
          <View style={styles.pickerContainer}>
            <DatePicker
              setDate={setDate}
              date={date}
              submitted={submitted}
              category="date"
            />
            <DatePicker
              setTime={setTime}
              time={time}
              submitted={submitted}
              category="time"
            />
          </View>
          <View style={styles.inputContainer}>
            <CustomInput
              placeholder="Running Duration"
              customValue={runningDuration}
              onFocus={setDurationModalVisible}
              value={runningDuration}
              submitted={submitted}
            />
          </View>

          {imageUri === "" && (
            <TouchableOpacity
              style={styles.imagePlaceholderContainer}
              onPress={selectImage}
            >
              <Text style={{ fontWeight: "bold" }}>Event Image</Text>
              <View
                backgroundColor="#fff"
                style={styles.imagePlaceholderBackground}
              >
                <View style={styles.imageLogo}>
                  <IconButton icon="camera" color={Color.Text} size={29} />
                  <Text>Add Image</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}

          {imageUri !== "" && (
            <View style={styles.imageBackground}>
              <Text style={{ fontWeight: "bold" }}>Event Image</Text>
              {imageUri !== "" && (
                <Image source={{ uri: imageUri }} style={{ height: 175 }} />
              )}
              <Button color={Color.PrimaryMain} onPress={deleteImage}>
                Delete
              </Button>
            </View>
          )}

          <View style={styles.inputContainer}>
            <TextInput
              mutiline={true}
              mode="outlined"
              outlineColor="#fff"
              activeOutlineColor={Color.GrayDark}
              theme={styles.inputTheme}
              style={styles.input}
              placeholder="Event Description"
              value={eventDescription}
              onChangeText={(text) => setEventDescription(text)}
            />
          </View>
          <LongButton
            buttonHandler={buttonHandler}
            buttonColor={Color.PrimaryMain}
            buttonText="Create Event"
          />
        </View>
      </ScrollView>
    </Provider>
  );
};

export default EventCreationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.Fill,
    padding: 10,
    alignItems: "center",
    overflow: "visible",
  },
  inputContainer: {
    margin: 5,
  },
  description: {
    height: 98,
    borderRadius: 10,
  },
  pickerContainer: {
    width: 335,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imagePlaceholderContainer: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
    marginLeft: 20,
    marginTop: 10,
  },
  imagePlaceholderBackground: {
    width: 98,
    height: 98,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  imageLogo: {
    borderStyle: "dashed",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Color.GrayDark,
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  imageBackground: {
    width: "90%",
    padding: 10,
    paddingTop: 25,
    height: 230,
    backgroundColor: Color.White,
    alignSelf: "center",
    margin: 5,
    justifyContent: "center",
    borderRadius: 10,
  },
  inputTheme: {
    roundness: 10,
    colors: {
      placeholder: Color.Text,
    },
  },
  input: { backgroundColor: "#fff", width: 335, height: 98 },
});
