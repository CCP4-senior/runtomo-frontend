import React, { useContext, useEffect } from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { Card } from "react-native-paper";
import StackedAvatars from "../screens/event-details/StackedAvatars";
import { addHours, format } from "date-fns";
import { DataContext } from "../context/datacontext/DataContext";
import runningDurationArray from "../utils/runningDuration";

const EventCard = ({
  event,
  isHomePageCard,
  handlePress,
  isConfirmationCard,
  isDateUTC,
  isTimeUTC,
}) => {
  const { currentEvent } = useContext(DataContext);
  if (!isHomePageCard) event = currentEvent;

  const date = new Date(event.date);
  const time = new Date(event.time);
  const zonedDate = isConfirmationCard
    ? isDateUTC
      ? addHours(date, 9)
      : date
    : addHours(date, 9);
  const zonedTime = isConfirmationCard
    ? isTimeUTC
      ? addHours(time, 9)
      : time
    : addHours(time, 9);

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
        {!event.imageUrl && (
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
            <Text style={styles.date}>
              {format(zonedDate, "E, MMM d, yyyy")} at {format(zonedTime, "p")}
            </Text>
            <Text style={styles.title}>
              {event.title.slice(0, 20)}
              {event.title.length > 20 && "..."}
            </Text>
            <Text style={styles.ward}>
              {event.ward || "Other"}
              {event.running_duration
                ? ` | ${
                    runningDurationArray.find(
                      (el) => +el.num === event.running_duration
                    ).name
                  } run`
                : ""}
            </Text>
          </View>
          {event.participants?.length !== 0 && (
            <View style={styles.rightContent}>
              <View
                style={{
                  alignSelf: "center",
                }}
              >
                <StackedAvatars
                  color={"#11C9BD"}
                  size={"small"}
                  participantsArray={event.participants}
                />
              </View>
              <Text style={{ color: "#11C9BD", ...styles.joinText }}>
                {event.participants?.length} Joined
              </Text>
            </View>
          )}
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
    paddingTop: 3,
    paddingBottom: 3,
    fontSize: 16,
    fontWeight: "700",
    color: "#363D4E",
  },
  ward: {
    // paddingLeft: 3,
    // paddingBottom: 2,
    fontSize: 12,
    color: "#4E4B66",
  },
  date: {
    // paddingLeft: 2,
    fontSize: 12,
    color: "#FA4048",
  },
  contentContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 12,
    paddingBottom: 8,
  },
  leftContent: {
    width: "60%",
  },
  rightContent: {
    // height: 60,
    // paddingTop: 8,
    // paddingBottom: 8,
    display: "flex",
    justifyContent: "flex-end",
  },
  joinText: {
    fontSize: 13,
    textAlign: "center",
  },
});
