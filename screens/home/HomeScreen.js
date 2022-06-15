import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Card, Title, Paragraph, IconButton } from "react-native-paper";
import Color from "../../assets/themes/Color.js";
import EventCard from "../../components/EventCard.js";

const HomeScreen = ({ navigation }) => {
  const mockdata = [
    {
      id: 1,
      title: "Imperial palace run",
      ward: "Shibuya",
      date: "2022-09-10T14:02:55.300Z",
      time: "2022-09-10T14:02:55.300Z",
      user: { id: 1, username: "Kumiko" },
    },
    {
      id: 2,
      title: "Tama river run",
      ward: "Shibuya",
      date: "2022-08-20T19:30:45.300Z",
      time: "2022-08-20T19:30:45.300Z",
      user: { id: 2, username: "Wade" },
    },
    {
      id: 3,
      title: "Kanda river run",
      ward: "Shinjuku",
      date: "2022-09-15T12:03:55.300Z",
      time: "2022-09-15T12:03:55.300Z",
      user: { id: 3, username: "Kei" },
    },
  ];
  const selectEvent = (eventData) => {
    navigation.navigate("Event Details", {
      eventData: eventData,
    });
  };
  const openEventCreation = () => {
    navigation.navigate("Event Creation");
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.eventCardWrapper}>
            {mockdata.map((session, id) => {
              return (
                <EventCard
                  isHomePageCard={true}
                  style={styles.eventCard}
                  selectEvent={selectEvent}
                  key={id}
                  event={session}
                />
              );
            })}
          </View>
          <TouchableOpacity
            onPress={openEventCreation}
            activeOpacity={0.7}
            style={styles.touchableOpacityStyle}
          >
            <IconButton
              icon="plus-circle"
              size={70}
              color={Color.PrimaryMain}
            ></IconButton>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
  titleStyle: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
  },
  textStyle: {
    fontSize: 16,
    textAlign: "center",
    padding: 10,
  },
  touchableOpacityStyle: {
    position: "absolute",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    right: 30,
    bottom: 30,
  },
  floatingButtonStyle: {
    resizeMode: "contain",
    width: 50,
    height: 50,
  },
  eventCardWrapper: {
    alignItems: "center",
    paddingHorizontal: 10,
  },
});
