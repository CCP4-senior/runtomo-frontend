import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Button, TextInput, IconButton, List } from "react-native-paper";
import Color from "../../assets/themes/Color.js";
import EventCard from "../../components/EventCard.js";

const HomeScreen = ({ navigation }) => {
  const mockdata = [
    {
      id: 1,
      title: "Imperial palace run",
      ward: "Chiyoda",
      date: "2022-09-10T14:02:55.300Z",
      time: "2022-09-10T14:02:55.300Z",
      user: { id: 1, username: "Kumiko" },
    },
    {
      id: 2,
      title: "Yoyogi park run",
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
      <View style={styles.searchContainer}>
        <TextInput
          mode="outlined"
          outlineColor="#F4F6F6"
          activeOutlineColor={Color.GrayDark}
          placeholder="Search"
          style={styles.searchbar}
          left={<TextInput.Icon name="magnify" style={{ marginTop: 15 }} />}
          theme={{ roundness: 8 }}
        />
      </View>
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={() => Alert("Filters button pressed!")}>
          <List.Item
            style={styles.topElement}
            title="SORT BY"
            right={(props) => <List.Icon {...props} icon="text" />}
            titleStyle={{ fontSize: 14, fontWeight: "700" }}
            onPress={() => alert("Sort by button pressed!")}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert("Filters button pressed!")}>
          <List.Item
            style={styles.topElement}
            title="FILTERS"
            right={(props) => <List.Icon {...props} icon="tune" />}
            titleStyle={{ fontSize: 14, fontWeight: "700" }}
          />
        </TouchableOpacity>
      </View>
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
        </ScrollView>
        <Button
          style={styles.createButton}
          mode="contained"
          color={Color.PrimaryMain}
          uppercase={false}
          labelStyle={{
            lineHeight: 30,
            letterSpacing: 0.2,
            fontWeight: "700",
            fontSize: 13,
          }}
          onPress={openEventCreation}
        >
          Create Event
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.Fill,
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
  createButton: {
    position: "absolute",
    bottom: 30,
    right: 13,
    borderRadius: 30,
    width: 120,
    height: 50,
  },
  searchContainer: {
    height: 70,
    width: "100%",
    backgroundColor: Color.White,
  },
  searchbar: {
    borderRadius: 8,
    backgroundColor: "#F4F6F6",
    height: 40,
    marginHorizontal: 15,
    marginTop: 8,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  topElement: {
    paddingTop: 1,
    margin: 8,
    width: 170,
    height: 40,
    backgroundColor: Color.GrayDark,
    borderRadius: 30,
  },
});
