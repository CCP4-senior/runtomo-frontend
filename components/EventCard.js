import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { Card, Paragraph, Title } from "react-native-paper";
import { format } from "date-fns";

const EventCard = ({ event, isHomePageCard, handlePress, image }) => {
  return (
    <Card
      style={[isHomePageCard ? styles.homePageCard : styles.card]}
      theme={{ roundness: 10 }}
    >
      <TouchableOpacity onPress={handlePress}>
        <Card.Cover
          source={image || require("../assets/images/demo/defaultEvent.jpeg")}
          style={{
            height: 160,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
        />
        <Card.Content>
          <Text style={styles.title}>{event.title}</Text>
          <Text style={styles.ward}>{event.ward}</Text>
          <Text style={styles.date}>
            {format(new Date(event.date), "MMM d, yyyy")} at{" "}
            {format(new Date(event.time), "p")}
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
    marginBottom: 10,
    height: 230,
    marginTop: 10,
  },
  title: {
    paddingTop: 5,
    paddingBottom: 2,
    fontSize: 18,
    fontWeight: "700",
    color: "#363D4E",
  },
  ward: {
    paddingLeft: 2,
    color: "#4E4B66",
  },
  date: {
    paddingLeft: 2,
    fontSize: 12,
    color: "red",
  },
});
