import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { Card, Paragraph, Title } from "react-native-paper";
import { addHours, format } from "date-fns";

const EventCard = ({ event, isHomePageCard, handlePress }) => {
  // const zonedDate = new Date(event.date);
  // const zonedTime = new Date(event.time);
  const date = new Date(event.date);
  const time = new Date(event.time);
  const zonedDate = (date, addHours(date, 9));
  const zonedTime = (time, addHours(date, 9));
  // console.log(date, time, zonedDate, zonedTime);
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
        <Card.Content>
          <Text style={styles.title}>{event.title}</Text>
          <Text style={styles.ward}>{event.ward || "Non 23 ward"}</Text>
          <Text style={styles.date}>
            {format(zonedDate, "MMM d, yyyy")} at {format(zonedTime, "p")}
          </Text>
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
});
