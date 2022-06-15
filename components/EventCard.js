import React from "react";
import { StyleSheet } from "react-native";
import { Card, Paragraph, Title } from "react-native-paper";
import { format } from "date-fns";

const EventCard = ({ event }) => {
  return (
    <Card style={[styles.card]} theme={{ roundness: 10 }}>
      <Card.Cover
        source={{ uri: "https://picsum.photos/700" }}
        style={{ height: 175 }}
        theme={{ roundness: 10 }}
      />
      <Card.Content>
        <Title>{event.eventTitle}</Title>
        <Paragraph>{event.area}</Paragraph>
        <Paragraph>
          {format(new Date(event.date), "MMM d, yyyy")} at{" "}
          {format(new Date(event.time), "p")}
        </Paragraph>
      </Card.Content>
    </Card>
  );
};

export default EventCard;

const styles = StyleSheet.create({
  card: {
    width: "90%",
    marginBottom: 10,
    height: 270,
    // padding: 10,
  },
});
