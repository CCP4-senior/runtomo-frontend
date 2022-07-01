import React, { useState, useRef, useEffect, useContext } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { TextInput, IconButton, Provider, Button } from "react-native-paper";
import Color from "../../assets/themes/Color.js";
import DatePicker from "../event-creation/DatePicker.js";
import AreaModal from "../event-creation/AreaModal.js";
import DurationModal from "../event-creation/DurationModal.js";
import GoogleSearchModal from "../event-creation/GoogleSearchModal.js";
import LongButton from "../../components/LongButton.js";
import CustomInput from "../../components/CustomInput.js";
import axiosInstance from "../../helpers/axios.js";
import uploadImage from "../../helpers/uploadImage.js";
import resizeImage from "../../helpers/resizeImage.js";
import selectImage from "../../helpers/selectImage.js";
import { DataContext } from "../../context/datacontext/DataContext.js";
import { AuthContext } from "../../context/authcontext/AuthContext.js";

const EventEditScreen = ({ navigation, setNewEvent, setData, data }) => {
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
  const [eventDescription, setEventDescription] = useState(null);
  const [imageUri, setImageUri] = useState("");
  const [imageRef, setImageRef] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const inputRef = useRef();
  const { setCurrentEvent } = useContext(DataContext);
  const { user } = useContext(AuthContext);

  const [isUser, setIsUser] = useState(true);

  const hideModal = () => {
    setAreaModalVisible(false);
    setDurationModalVisible(false);
    setGoogleModalVisible(false);
    inputRef.current?.blur();
  };

  const buttonHandler = async () => {
    try {
      let currentRef;
      if (imageUri !== "") {
        const newUri = await resizeImage(imageUri, 300);
        currentRef = await uploadImage("events", newUri);
        setImageRef(currentRef);
      }

      const requiredFields = [title, meetingPoint, date, time, runningDuration];

      if (requiredFields.some((field) => field === "")) {
        setSubmitted(true);
        return;
      }

      const event = {
        title: title,
        location: meetingPoint,
        ward: ward?.ward_name || null,
        date: date,
        time: time,
        running_duration: runningDuration.num,
        description: eventDescription,
        image: currentRef,
        lat: latitude,
        long: longitude,
      };

      const response = await axiosInstance.post("/events/create_event", event);
      setCurrentEvent({ ...event, creator: user });
      navigation.navigate("Event Created");
    } catch (e) {
      console.log(e);
      alert("Something went wrong. Please try again!");
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
              inputRef={inputRef}
            />
            <DatePicker
              setTime={setTime}
              time={time}
              submitted={submitted}
              category="time"
              inputRef={inputRef}
            />
          </View>
          <View style={styles.inputContainer}>
            <CustomInput
              placeholder="Running Duration"
              onFocus={setDurationModalVisible}
              value={runningDuration.name}
              submitted={submitted}
              inputRef={inputRef}
            />
          </View>

          {imageUri === "" && (
            <TouchableOpacity
              style={styles.imagePlaceholderContainer}
              onPress={async () => {
                inputRef.current?.blur();
                await selectImage(setImageUri);
              }}
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
              onChangeText={(text) => {
                setEventDescription(text);
                if (text.length === 255) {
                  alert("Description cannot be exceed 255 character length.");
                }
              }}
              maxLength={255}
              multiline={true}
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

export default EventEditScreen;

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
