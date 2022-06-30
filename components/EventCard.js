import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { Card } from "react-native-paper";
import { format } from "date-fns";
import StackedAvatars from "../screens/event-details/StackedAvatars";

const EventCard = ({ event, isHomePageCard, handlePress }) => {
  return (
    <Card
      style={[isHomePageCard ? styles.homePageCard : styles.card]}
      theme={{ roundness: 10 }}
    >
      <TouchableOpacity onPress={handlePress}>
        {event.imageUrl && (
          <Card.Cover
            source={{ uri: event.imageUrl }}
            style={{
              height: 160,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
          />
        )}
        {event.imageUrl === undefined && (
          <Card.Cover
            source={require("../assets/images/demo/defaultEvent.jpeg")}
            style={{
              height: 160,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
          />
        )}
        <Card.Content style={styles.contentContainer}>
          <View style={styles.leftContent}>
            <Text style={styles.title}>{event.title}</Text>
            <Text style={styles.ward}>{event.ward}</Text>
            <Text style={styles.date}>
              {format(new Date(event.date), "MMM d, yyyy")} at{" "}
              {format(new Date(event.time), "p")}
            </Text>
          </View>
          <View style={styles.rightContent}>
            <StackedAvatars color={"#11C9BD"} size={"small"} />
            <Text style={{ color: "#11C9BD", ...styles.joinText }}>Joined</Text>
          </View>
        </Card.Content>
      </TouchableOpacity>
    </Card>
  );
};

export default EventCard;

const styles = StyleSheet.create({
  card: {
    width: "90%",
    marginBottom: 10,
    height: 270,
    marginTop: 10,
  },
  homePageCard: {
    width: "100%",
    marginBottom: 8,
    height: 240,
    marginTop: 10,
  },
  title: {
    paddingTop: 8,
    paddingBottom: 3,
    fontSize: 16,
    fontWeight: "700",
    color: "#363D4E",
  },
  ward: {
    paddingLeft: 3,
    paddingBottom: 2,
    fontSize: 12,
    color: "#4E4B66",
  },
  date: {
    paddingLeft: 2,
    fontSize: 12,
    color: "#FA4048",
  },
  contentContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftContent: {
    width: "60%",
  },
  rightContent: {
    height: 60,
    display: "flex",
    justifyContent: "flex-end",
    // backgroundColor: "red",
  },
  joinText: {
    fontSize: 13,
    textAlign: "center",
  },
});
