import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Animated,
} from "react-native";
import { Card } from "react-native-paper";
import StackedAvatars from "../screens/event-details/StackedAvatars";
import { addHours, format } from "date-fns";
import { DataContext } from "../context/datacontext/DataContext";
import runningDurationArray from "../utils/runningDuration";
import Color from "../assets/themes/Color";

const EventCard = ({
  event,
  isHomePageCard,
  handlePress,
  isConfirmationCard,
  isDateUTC,
  isTimeUTC,
}) => {
  const { currentEvent } = useContext(DataContext);

  const [opacity, setOpacity] = useState(new Animated.Value(0));

  const fadeAnimation = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

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
        {/* Event image */}

        {event.imageUrl && (
          <Animated.View style={{ opacity }}>
            <Card.Cover
              source={{ uri: event.imageUrl }}
              style={{
                height: 160,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              }}
              onLoadEnd={fadeAnimation}
            />
          </Animated.View>
        )}

        {/* Event image (default) */}

        {!event.imageUrl && (
          <Animated.View style={{ opacity }}>
            <Card.Cover
              source={require("../assets/images/demo/defaultEvent.jpeg")}
              style={{
                height: 160,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              }}
              onLoadEnd={fadeAnimation}
            />
          </Animated.View>
        )}
        <Card.Content style={styles.contentContainer}>
          <View style={styles.leftContent}>
            <Text style={styles.date}>
              {format(zonedDate, "E, MMM d, yyyy")} at {format(zonedTime, "p")}
            </Text>
            <Text style={styles.title}>
              {event.title.slice(0, 55)}
              {event.title.length > 55 && "..."}
            </Text>
            <Text style={styles.ward}>
              {event.ward || "Other"}
              {event.running_duration
                ? event.running_duration === 90
                  ? " | 1+ hr"
                  : ` | ${
                      runningDurationArray.find(
                        (el) => +el.num === event.running_duration
                      ).name
                    }`
                : ""}
            </Text>
          </View>
          {event.participants && event.participants.length !== 0 && (
            <View style={styles.rightContent}>
              <View
                style={{
                  alignSelf: "center",
                }}
              >
                <StackedAvatars
                  color={Color.PrimaryMain}
                  size={"small"}
                  participantsArray={event.participants}
                />
              </View>
              <Text style={{ color: Color.PrimaryMain, ...styles.joinText }}>
                {event.participants?.length > 1 ? `${event.participants?.length} attendees` : `${event.participants?.length} attendee` }
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
    marginTop: 10,
    minHeight: 275,
  },
  homePageCard: {
    width: "100%",
    marginBottom: 8,
    minHeight: 230,
    marginTop: 10,
  },
  title: {
    paddingTop: 3,
    paddingBottom: 3,
    fontSize: 14,
    fontWeight: "700",
    color: "#363D4E",
  },
  ward: {
    fontSize: 12,
    color: "#4E4B66",
  },
  date: {
    fontSize: 12,
    color: "#FA4048",
  },
  contentContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 8,
    paddingBottom: 8,
  },
  leftContent: {
    width: "65%",
  },
  rightContent: {
    width: "35%",
    display: "flex",
    justifyContent: "flex-end",
  },
  joinText: {
    fontSize: 13,
    textAlign: "center",
  },
});
