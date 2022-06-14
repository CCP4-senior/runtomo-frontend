import React, { useState } from "react";
import { ScrollView, View, StyleSheet, Text } from "react-native";
import { TextInput, IconButton, Provider } from "react-native-paper";
import Colors from "../../assets/styles/colors.js";
import DatePicker from "./DatePicker.js";
import TimePicker from "./TimePicker.js";
import AreaModal from "./AreaModal.js";
import DurationModal from "./DurationModal.js";
import LongButton from "../../components/LongButton.js";

const EventCreationScreen = ({ navigation, newEvent, setNewEvent }) => {
  const [eventTitle, setEventTitle] = useState("");
  const [meetingPoint, setmeetingPoint] = useState("");
  const [area, setArea] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [runningDuration, setRunningDuration] = useState("");
  const [areaModalVisible, setAreaModalVisible] = useState(false);
  const [durationModalVisible, setDurationModalVisible] = useState(false);

  const hideModal = () => {
    setAreaModalVisible(false);
    setDurationModalVisible(false);
  };
  const [eventDescription, setEventDescription] = useState("");
  const buttonHandler = () => {
    setNewEvent({
      eventTitle,
      meetingPoint,
      area,
      date,
      time,
      runningDuration,
      eventDescription,
    });
    console.log(newEvent);
    navigation.navigate("Event Created");
  };

  return (
    <Provider>
      <AreaModal
        modalVisible={areaModalVisible}
        hideModal={hideModal}
        setArea={setArea}
      />
      <DurationModal
        modalVisible={durationModalVisible}
        setRunningDuration={setRunningDuration}
        hideModal={hideModal}
      />
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <TextInput
              mode="outlined"
              outlineColor="#fff"
              activeOutlineColor={Colors.secondaryColor}
              theme={{ roundness: 25 }}
              style={{ backgroundColor: "#fff", width: 335 }}
              placeholder="Event Title"
              value={eventTitle}
              onChangeText={(text) => setEventTitle(text)}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              mode="outlined"
              outlineColor="#fff"
              activeOutlineColor={Colors.secondaryColor}
              theme={{ roundness: 25 }}
              style={{ backgroundColor: "#fff", width: 335 }}
              placeholder="Area"
              value={area}
              onFocus={() => setAreaModalVisible(true)}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              mode="outlined"
              outlineColor="#fff"
              activeOutlineColor={Colors.secondaryColor}
              theme={{ roundness: 25 }}
              style={{ backgroundColor: "#fff", width: 335 }}
              placeholder="Meeting Point Address"
              value={meetingPoint}
              onChangeText={(text) => setmeetingPoint(text)}
            />
          </View>

          <View style={styles.pickerContainer}>
            <DatePicker setDate={setDate} date={date} />
            <TimePicker setTime={setTime} time={time} />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              mode="outlined"
              outlineColor="#fff"
              activeOutlineColor={Colors.secondaryColor}
              theme={{ roundness: 25 }}
              style={{ backgroundColor: "#fff", width: 335 }}
              placeholder="Running Duration"
              value={runningDuration}
              onFocus={() => setDurationModalVisible(true)}
            />
          </View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "flex-start",
              marginLeft: 20,
              marginTop: 10,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Event Image</Text>
            <View
              backgroundColor="#fff"
              style={{
                width: 98,
                height: 98,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  borderStyle: "dashed",
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: Colors.secondaryColor,
                  width: 80,
                  height: 80,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconButton icon="camera" color={Colors.text} size={29} />
                <Text>Add Image</Text>
              </View>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              mutiline={true}
              mode="outlined"
              outlineColor="#fff"
              activeOutlineColor={Colors.secondaryColor}
              theme={{ roundness: 10 }}
              style={{ backgroundColor: "#fff", width: 335, height: 98 }}
              placeholder="Event Description"
              value={eventDescription}
              onChangeText={(text) => setEventDescription(text)}
            />
          </View>
          <LongButton
            buttonHandler={buttonHandler}
            buttonColor={Colors.primaryColor}
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
    backgroundColor: Colors.fill,
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
});
