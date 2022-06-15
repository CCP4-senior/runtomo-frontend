import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Avatar } from "react-native-paper";
import Color from "../../assets/themes/Color.js";
import EventCard from "../../components/EventCard";

const EventDetailsScreen = ({ navigation, eventData }) => {
  const openCreatorProfile = () => {
    navigation.navigate("Creator Profile");
  };
  const event = {
    eventTitle: eventData.title,
    area: "Shibuya-ku",
    data: "2022-09-10T14:02:55.300Z",
    time: "2022-09-10T14:02:55.300Z",
  };
  return (
    <View style={styles.container}>
      <EventCard event={event} />
      <Text>{eventData.title}</Text>
      <TouchableOpacity onPress={openCreatorProfile}>
        <Avatar.Icon size={100} icon="account" />
      </TouchableOpacity>
      <Text>{eventData.user.username}</Text>
    </View>
  );
};

export default EventDetailsScreen;

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
});
