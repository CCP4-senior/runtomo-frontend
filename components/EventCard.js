import React from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Card, Paragraph, Title } from "react-native-paper";
import { format } from "date-fns";

const EventCard = ({ event, selectEvent, isHomePageCard }) => {
  return (
    <Card
      style={[isHomePageCard ? styles.homePageCard : styles.card]}
      theme={{ roundness: 10 }}
    >
      <TouchableOpacity onPress={() => selectEvent(event)}>
        <Card.Cover
          source={{ uri: "https://picsum.photos/700" }}
          style={{
            height: 175,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
        />
        <Card.Content>
          <Title>{event.eventTitle || event.title}</Title>
          <Paragraph>{event.area || event.ward}</Paragraph>
          <Paragraph>
            {format(new Date(event.date), "MMM d, yyyy")} at{" "}
            {format(new Date(event.time), "p")}
          </Paragraph>
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
  },
  homePageCard: {
    width: "100%",
    marginBottom: 20,
    height: 270,
    marginTop: 10,
  },
});
