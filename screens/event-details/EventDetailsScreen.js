import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-paper";

const EventDetailsScreen = ({ navigation, eventData }) => {
  const openCreatorProfile = () => {
    navigation.navigate("Creator Profile");
  };
  return (
    <View>
      <Text>Event Details Page!</Text>
      <Text>{eventData.title}</Text>
      <TouchableOpacity onPress={openCreatorProfile}>
        <Avatar.Icon size={100} icon="account" />
      </TouchableOpacity>
      <Text>{eventData.user.username}</Text>
    </View>
  );
};

export default EventDetailsScreen;
