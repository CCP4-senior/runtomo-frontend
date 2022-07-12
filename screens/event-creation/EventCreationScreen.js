import React, {
  useState,
  useRef,
  useContext,
  useEffect,
  useCallback,
} from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { TextInput, IconButton, Provider, Button } from "react-native-paper";
import Color from "../../assets/themes/Color.js";
import DatePicker from "./DatePicker.js";
import DurationModal from "./DurationModal.js";
import GoogleSearchModal from "./GoogleSearchModal.js";
import LongButton from "../../components/LongButton.js";
import CustomInput from "../../components/CustomInput.js";
import axiosInstance from "../../helpers/axios.js";
import uploadImage from "../../helpers/uploadImage.js";
import resizeImage from "../../helpers/resizeImage.js";
import selectImage from "../../helpers/selectImage.js";
import { DataContext } from "../../context/datacontext/DataContext.js";
import { AuthContext } from "../../context/authcontext/AuthContext.js";
import LoadingSpinner from "../../components/LoadingSpinner.js";
import runningDurationArray from "../../utils/runningDuration.js";

const EventCreationScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [meetingPoint, setMeetingPoint] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [ward, setWard] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [runningDuration, setRunningDuration] = useState("");
  const [durationModalVisible, setDurationModalVisible] = useState(false);
  const [googleModalVisible, setGoogleModalVisible] = useState(false);
  const [eventDescription, setEventDescription] = useState("");
  const [imageUri, setImageUri] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef();
  const { setCurrentEvent, generateImageUrl } = useContext(DataContext);
  const { user } = useContext(AuthContext);

  const hideModal = () => {
    setDurationModalVisible(false);
    setGoogleModalVisible(false);
    inputRef.current?.blur();
  };

  useFocusEffect(
    useCallback(() => {
      resetInput();
    }, [])
  );

  const resetInput = () => {
    setTitle("");
    setMeetingPoint("");
    setLatitude("");
    setLongitude("");
    setWard("");
    setDate("");
    setTime("");
    setRunningDuration("");
    setEventDescription("");
    setImageUri("");
  };

  const createEvent = async () => {
    try {
      setIsLoading(true);

      let currentRef = null;
      if (imageUri !== "") {
        const newUri = await resizeImage(imageUri, 300);
        currentRef = await uploadImage("events", newUri, user.id);
      }

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
        setIsLoading(false);
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

      const response = await axiosInstance.post("/events/create_event/", event);

      setCurrentEvent({
        ...event,
        creator: user,
        imageUrl: currentRef !== null ? generateImageUrl(currentRef) : null,
      });

      setIsLoading(false);
      navigation.navigate("Event Created", { isConfirmationCard: true });
    } catch (e) {
      setIsLoading(false);
      console.log(e);
      alert("Something went wrong with Create Event. Please try again!");
    }
  };

  const deleteImage = () => {
    setImageUri("");
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
              <Text
                style={{ fontWeight: "bold", marginBottom: 10, fontSize: 16 }}
              >
                Event Image
              </Text>
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
              <Text
                style={{ fontWeight: "bold", fontSize: 16, marginBottom: 10 }}
              >
                Event Image
              </Text>
              <Image source={{ uri: imageUri }} style={{ height: 175 }} />
              <Button color={Color.PrimaryMain} onPress={deleteImage}>
                Undo Selection
              </Button>
            </View>
          )}

          <View style={styles.inputContainer}>
            <TextInput
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
                  alert("Description cannot exceed 255 character length.");
                }
              }}
              maxLength={255}
              multiline={true}
            />
          </View>

          {isLoading ? (
            <View style={{ flex: 1 }}>
              <LongButton
                buttonColor={Color.PrimaryMedium}
                buttonText="Creating Event..."
              />
              <LoadingSpinner />
            </View>
          ) : (
            <LongButton
              buttonHandler={createEvent}
              buttonColor={Color.PrimaryMain}
              buttonText="Create Event"
            />
          )}
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
    paddingTop: 40,
    paddingBottom: 40,
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
});
