import React, { useState, useRef, useContext } from "react";
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
import DurationModal from "../event-creation/DurationModal.js";
import GoogleSearchModal from "../event-creation/GoogleSearchModal.js";
import LongButton from "../../components/LongButton.js";
import CustomInput from "../../components/CustomInput.js";
import axiosInstance from "../../helpers/axios.js";
import uploadImage from "../../helpers/uploadImage.js";
import resizeImage from "../../helpers/resizeImage.js";
import selectImage from "../../helpers/selectImage.js";
import deleteStoredImage from "../../helpers/deleteStoredImage.js";
import { DataContext } from "../../context/datacontext/DataContext.js";
import { AuthContext } from "../../context/authcontext/AuthContext.js";
import runningDurationArray from "../../utils/runningDuration.js";

const EventEditScreen = ({ navigation }) => {
  const { setCurrentEvent, currentEvent, generateImageUrl } =
    useContext(DataContext);
  const { user } = useContext(AuthContext);

  const [title, setTitle] = useState(currentEvent?.title || "");
  const [meetingPoint, setMeetingPoint] = useState(
    currentEvent?.location || ""
  );
  const [latitude, setLatitude] = useState(currentEvent?.lat || "");
  const [longitude, setLongitude] = useState(currentEvent?.long || "");
  const [ward, setWard] = useState(currentEvent?.ward || "");
  const [date, setDate] = useState(currentEvent?.date || "");
  const [time, setTime] = useState(currentEvent?.time || "");

  const [runningDuration, setRunningDuration] = useState(
    currentEvent?.running_duration
      ? runningDurationArray.find(
          (el) => el.num === currentEvent.running_duration
        )
      : ""
  );
  const [durationModalVisible, setDurationModalVisible] = useState(false);
  const [googleModalVisible, setGoogleModalVisible] = useState(false);
  const [eventDescription, setEventDescription] = useState(
    currentEvent?.description || null
  );
  const [imageUri, setImageUri] = useState(currentEvent?.imageUrl || "");
  const [submitted, setSubmitted] = useState(false);
  const inputRef = useRef();
  const hasPhoto = currentEvent.imageUrl;
  const [photoHasChanged, setPhotoHasChanged] = useState(false);
  const [isDateUTC, setIsDateUTC] = useState(true);
  const [isTimeUTC, setIsTimeUTC] = useState(true);

  const hideModal = () => {
    setDurationModalVisible(false);
    setGoogleModalVisible(false);
    inputRef.current?.blur();
  };

  const buttonHandler = async () => {
    try {
      const requiredFields = [
        title,
        meetingPoint,
        date,
        time,
        runningDuration,
        eventDescription,
      ];

      if (requiredFields.some((field) => field === "")) {
        setSubmitted(true);
        return;
      }

      let currentRef = currentEvent.image;
      if (imageUri !== "" && photoHasChanged) {
        currentRef = await storeNewImage();
      }
      if (imageUri === "" && hasPhoto) {
        const prevImageUrl = currentEvent.imageUrl;
        await deleteStoredImage(prevImageUrl);
        currentRef = null;
      }

      const event = {
        title: title,
        location: meetingPoint,
        ward: ward && typeof ward === "string" ? ward : ward.ward_name || null,
        date: new Date(date),
        time: new Date(time),
        running_duration: runningDuration.num,
        description: eventDescription,
        image: currentRef,
        lat: latitude,
        long: longitude,
        creator: {
          ...currentEvent.creator,
        },
      };

      console.log(event);

      const response = await axiosInstance.put(
        `/events/${currentEvent.id}/`,
        event
      );
      setCurrentEvent({
        ...event,
        id: currentEvent.id,
        // creator: user,
        imageUrl: currentRef !== null ? generateImageUrl(currentRef) : null,
      });
      navigation.navigate("Event Updated", {
        isConfirmationCard: true,
        isDateUTC: isDateUTC,
        isTimeUTC: isTimeUTC,
      });
    } catch (e) {
      console.log(e);
      alert("Something went wrong. Please try again!");
    }
  };

  const deleteImage = () => {
    setImageUri("");
  };

  const storeNewImage = async () => {
    const newUri = await resizeImage(imageUri, 300);
    const imageRef = await uploadImage("events", newUri, user.id);

    if (hasPhoto) {
      const prevImageUrl = currentEvent.imageUrl;
      await deleteStoredImage(prevImageUrl);
    }
    return imageRef;
  };

  return (
    <Provider>
      <DurationModal
        modalVisible={durationModalVisible}
        setRunningDuration={setRunningDuration}
        hideModal={hideModal}
        runningDuration={runningDurationArray}
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
              isDateUTC={isDateUTC}
              setIsDateUTC={setIsDateUTC}
            />
            <DatePicker
              setTime={setTime}
              time={time}
              submitted={submitted}
              category="time"
              inputRef={inputRef}
              isTimeUTC={isTimeUTC}
              setIsTimeUTC={setIsTimeUTC}
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
                setPhotoHasChanged(true);
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
              <Image source={{ uri: imageUri }} style={{ height: 175 }} />
              <View style={styles.imageButtonsContainer}>
                <Button
                  color={Color.PrimaryMain}
                  onPress={async () => {
                    inputRef.current?.blur();
                    await selectImage(setImageUri, setPhotoHasChanged);
                  }}
                >
                  Change
                </Button>
                <Button color={Color.PrimaryMain} onPress={deleteImage}>
                  Delete
                </Button>
              </View>
            </View>
          )}

          <View style={styles.inputContainer}>
            <TextInput
              mutiline={true}
              mode="outlined"
              theme={{
                ...styles.inputTheme,
                colors: {
                  placeholder: !submitted
                    ? Color.Text
                    : eventDescription
                    ? Color.Text
                    : Color.PrimaryMain,
                },
              }}
              style={styles.input}
              outlineColor={
                !submitted
                  ? "#fff"
                  : eventDescription
                  ? "#fff"
                  : Color.PrimaryMain
              }
              activeOutlineColor={
                !submitted
                  ? Color.GrayDark
                  : eventDescription
                  ? Color.GrayLight
                  : Color.PrimaryMain
              }
              placeholder={
                !submitted
                  ? "Event Description"
                  : eventDescription
                  ? "Event Description"
                  : `Event Description Required`
              }
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
            buttonText="Update event"
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
    alignItems: "center",
    overflow: "visible",
  },
  inputContainer: {
    margin: 5,
    width: "100%",
    alignItems: "center",
  },
  pickerContainer: {
    width: "90%",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imagePlaceholderContainer: {
    alignItems: "flex-start",
    justifyContent: "center",
    marginTop: 8,
    width: "90%",
    paddingLeft: 8,
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
  input: { backgroundColor: "#fff", width: "90%", height: 98 },
  imageButtonsContainer: {
    flexDirection: "row",
    width: "70%",
    justifyContent: "space-between",
    alignSelf: "center",
  },
});
