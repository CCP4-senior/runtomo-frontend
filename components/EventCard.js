import React, { useContext, useState } from "react";
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
      duration: 500,
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
        {event.imageUrl && (
          <Animated.View style={{ opacity }}>
            <Card.Cover
              source={{ uri: event.imageUrl }}
              onLoadEnd={fadeAnimation}
              style={{
                height: 160,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              }}
            />
          </Animated.View>
        )}
        {!event.imageUrl && (
          <Animated.View style={{ opacity }}>
            <Card.Cover
              source={require("../assets/images/demo/defaultEvent.jpeg")}
              onLoadEnd={fadeAnimation}
              style={{
                height: 160,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              }}
            />
          </Animated.View>
        )}
        <Card.Content style={styles.contentContainer}>
          <View style={styles.leftContent}>
            <Text style={styles.title}>{event.title}</Text>
            <Text style={styles.ward}>{event.ward || "Other"}</Text>
            <Text style={styles.date}>
              {format(zonedDate, "MMM d, yyyy")} at {format(zonedTime, "p")}
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
  },
  joinText: {
    fontSize: 13,
    textAlign: "center",
  },
});
