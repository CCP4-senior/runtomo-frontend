import React, { useState } from "react";
import { ScrollView, View, StyleSheet, Text } from "react-native";
import { Button, TextInput, IconButton } from "react-native-paper";
import Colors from "../../styles/colors.js";
import DatePicker from "./DatePicker.js";
import TimePicker from "./TimePicker.js";

const EventCreationScreen = ({ navigation }) => {
  const [eventTitle, setEventTitle] = useState("");
  const [venueAddress, setVenueAddress] = useState("");
  const [area, setArea] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [runningDuration, setRunningDuration] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const initialEvent = Object.freeze({
    eventTitle: "",
    venueAddress: "",
    area: "",
    date: "",
    time: "",
    runningDuration: "",
    eventDescription: "",
  });
  const [eventData, setEventData] = useState(initialEvent);
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            mode="outlined"
            outlineColor="#fff"
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
            theme={{ roundness: 25 }}
            style={{ backgroundColor: "#fff", width: 335 }}
            placeholder="Venue Address"
            value={venueAddress}
            onChangeText={(text) => setVenueAddress(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            mode="outlined"
            outlineColor="#fff"
            theme={{ roundness: 25 }}
            style={{ backgroundColor: "#fff", width: 335 }}
            placeholder="Area"
            value={area}
          />
        </View>
        <View style={styles.pickerContainer}>
          <DatePicker />
          <TimePicker />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            mode="outlined"
            outlineColor="#fff"
            theme={{ roundness: 25 }}
            style={{ backgroundColor: "#fff", width: 335 }}
            placeholder="Running Duration"
            value={runningDuration}
            onChangeText={(text) => setRunningDuration(text)}
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
            // style={[styles.input, styles.description]}
            mode="outlined"
            outlineColor="#fff"
            theme={{ roundness: 10 }}
            style={{ backgroundColor: "#fff", width: 335, height: 98 }}
            placeholder="Event Description"
            value={eventDescription}
            onChangeText={(text) => setEventDescription(text)}
          />
        </View>
        <Button
          mode="contained"
          uppercase={false}
          color={Colors.primaryColor}
          style={{ borderRadius: 25, width: 325, height: 60, marginTop: 20 }}
          labelStyle={{
            fontWeight: "bold",
            fontSize: 20,
          }}
          contentStyle={{
            padding: 7,
          }}
          onPress={() => navigation.navigate("Event Created")}
        >
          Create Event
        </Button>
      </View>
    </ScrollView>
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
