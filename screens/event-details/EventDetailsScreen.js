import React, { useState, useContext, useEffect } from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
} from "react-native";
import {
  Avatar,
  Card,
  Title,
  Dialog,
  Provider,
  Portal,
  Paragraph,
} from "react-native-paper";
import { format, addMinutes, addHours } from "date-fns";
import Color from "../../assets/themes/Color.js";
import LongButton from "../../components/LongButton.js";
import { AuthContext } from "../../context/authcontext/AuthContext";
import { DataContext } from "../../context/datacontext/DataContext.js";
import MapView, {
  Callout,
  Marker,
  Circle,
  PROVIDER_GOOGLE,
  PROVIDER_DEFAULT,
} from "react-native-maps";
import axiosInstance from "../../helpers/axios.js";
import StackedAvatars from "./StackedAvatars.js";

const EventDetailsScreen = ({ navigation }) => {
  useEffect(() => {
    getAllParticipants();
    // getUser(); // Leave as a reference. Case where api call is made to get creator info
  }, []);

  const { user } = useContext(AuthContext);
  const { currentEvent, setCurrentEvent, getUser } = useContext(DataContext);
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const [isAttendanceCancellation, setIsAttendanceCancellation] =
    useState(true);
  // Google Maps logic
  const [region, setRegion] = useState({
    latitude: 35.6828387,
    longitude: 139.7594549,
  });
  const [participants, setParticipants] = useState([]);
  const [hasJoined, setHasJoined] = useState(false);

  const eventData = currentEvent;
  // Leave as a reference. Case where api call is made to get creator info
  // const [creator, setCreator] = useState({});
  const [creator, setCreator] = useState(eventData.creator);
  const date = new Date(eventData.date);
  const time = new Date(eventData.time);
  const zonedDate = (date, addHours(date, 9));
  const zonedTime = (time, addHours(date, 9));

  const getAllParticipants = async () => {
    try {
      const response = await axiosInstance(`/event_users/${eventData.id}/`);
      setParticipants(response.data);
      if (response.data.find((el) => el.user === user.id)) setHasJoined(true);
    } catch (e) {
      console.log(e);
    }
  };

  // To be modified
  const openCreatorProfile = async () => {
    await getUser(eventData.creator.id);
    if (creator.id !== user.id) navigation.navigate("Creator Profile");
    if (creator.id === user.id) navigation.navigate("Profile");
  };
  const joinEvent = async () => {
    try {
      const response = await axiosInstance.post(
        `/event_users/${eventData.id}/`,
        {
          event: eventData.id,
          user: user,
        }
      );
      setCurrentEvent({ ...eventData, user: user });
      navigation.navigate("Event Joined");
    } catch (e) {
      console.log(e);
    }
  };

  const cancelAttendance = async () => {
    await axiosInstance.delete(`/event_users/${eventData.id}/`);
    setIsAttendanceCancellation(true);
    showDialog();
    setTimeout(() => {
      navigation.navigate("Home");
    }, 2000);
  };

  const cancelEvent = async (id) => {
    await axiosInstance.delete(`/events/${id}/`);

    setIsAttendanceCancellation(false);
    showDialog();
    setTimeout(() => {
      navigation.navigate("Home");
    }, 2000);
  };

  return (
    <Provider>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          {isAttendanceCancellation ? (
            <Dialog.Title>Attendance Canceled</Dialog.Title>
          ) : (
            <Dialog.Title>Event Canceled</Dialog.Title>
          )}
          <Dialog.Content>
            {isAttendanceCancellation ? (
              <Paragraph>
                "Attendance to this event has been canceled successufully."
              </Paragraph>
            ) : (
              <Paragraph>
                "This event has been canceled successufully."
              </Paragraph>
            )}
          </Dialog.Content>
        </Dialog>
      </Portal>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.container}>
            <Card style={styles.card} theme={{ roundness: 10 }}>
              {eventData.imageUrl && (
                <Card.Cover
                  source={{ uri: eventData.imageUrl }}
                  style={styles.eventImage}
                />
              )}
              {eventData.imageUrl === undefined && (
                <Card.Cover
                  source={require("../../assets/images/demo/defaultEvent.jpeg")}
                  style={styles.eventImage}
                />
              )}

              <View style={styles.label}>
                <Text style={styles.labelDate}>
                  {format(new Date(zonedDate), "d")}
                </Text>
                <Text style={styles.labelMonth}>
                  {format(new Date(zonedDate), "MMM")}
                </Text>
              </View>
              <Card.Content style={styles.creatorCard}>
                <View style={styles.avatarsContainer}>
                  <TouchableOpacity
                    onPress={openCreatorProfile}
                    style={[styles.listContainer]}
                  >
                    {!eventData.creator?.image && (
                      <Avatar.Icon
                        size={40}
                        icon="account"
                        style={styles.avatar}
                      />
                    )}
                    {eventData.creator?.image && (
                      <Avatar.Image
                        size={40}
                        source={eventData.creator.image}
                      />
                    )}
                    <Text style={styles.creatorName}>
                      {eventData.creator.username}
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.stackedAvatarContainer}>
                    <StackedAvatars
                      color={"#007AFF"}
                      eventId={eventData.id}
                      // participantsArray={participants}
                    />
                    <Text style={{ color: "#007AFF", ...styles.joinText }}>
                      Joined
                    </Text>
                  </View>
                </View>

                <Title style={styles.eventTitle}>{eventData.title}</Title>

                <View style={styles.listLine}></View>

                <View style={[styles.listContainer, styles.topListContainer]}>
                  <Avatar.Icon
                    color={Color.White}
                    size={40}
                    icon="calendar-month"
                    style={styles.listIcon}
                  />
                  <View style={styles.listContent}>
                    <Text style={styles.boldText}>
                      {format(new Date(zonedDate), "E, MMM d, yyyy")}
                    </Text>
                    <Text>
                      {format(new Date(zonedTime), "p")} to{" "}
                      {format(
                        addMinutes(
                          new Date(zonedTime),
                          Number(eventData.running_duration)
                        ),
                        "p"
                      )}
                    </Text>
                  </View>
                </View>

                <View style={styles.listContainer}>
                  <Avatar.Icon
                    color={Color.White}
                    size={40}
                    icon="map-marker"
                    style={styles.listIcon}
                  />
                  <View style={styles.listContent}>
                    <Text style={styles.boldText}>
                      {eventData.ward || "Other"}
                    </Text>
                    <Text>Exact location available upon joining</Text>
                  </View>
                </View>

                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Description:</Text>
                  <Text>{eventData.description || "Not provided"}</Text>
                </View>

                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Location:</Text>
                  <Text>{eventData.location}</Text>
                </View>
                <View style={styles.mapContainer}>
                  <MapView
                    style={styles.map}
                    initialRegion={{
                      latitude: region.latitude,
                      longitude: region.longitude,
                      latitudeDelta: 0.002,
                      longitudeDelta: 0.0121,
                    }}
                    provider={PROVIDER_DEFAULT}
                  >
                    <Marker
                      coordinate={{
                        latitude: region.latitude,
                        longitude: region.longitude,
                      }}
                    >
                      <Callout>
                        <Text>Location placeholder</Text>
                      </Callout>
                    </Marker>
                    <Circle
                      center={{
                        latitude: region.latitude,
                        longitude: region.longitude,
                      }}
                      radius={200}
                      strokeWidth={2}
                    ></Circle>
                  </MapView>
                </View>
              </Card.Content>
            </Card>

            {eventData.creator.id === user.id && (
              <>
                <LongButton
                  buttonHandler={() => {
                    alert("edit event page");
                  }}
                  buttonColor={Color.GrayDark}
                  buttonText="Edit Event"
                  buttonTextColor="#555555"
                />
                <LongButton
                  buttonHandler={() => cancelEvent(eventData.id)}
                  buttonColor={Color.PrimaryMain}
                  buttonText="Cancel Event"
                />
              </>
            )}

            {eventData.creator.id !== user.id && !hasJoined && (
              <LongButton
                buttonHandler={joinEvent}
                buttonColor={Color.PrimaryMain}
                buttonText="Join Event"
              />
            )}

            {hasJoined && (
              <>
                <Text>You've already joined the event!</Text>
                <LongButton
                  buttonHandler={cancelAttendance}
                  buttonColor={Color.PrimaryMain}
                  buttonText="Cancel Attendance"
                />
              </>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </Provider>
  );
};

export default EventDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.Fill,
    padding: 10,
    alignItems: "center",
    overflow: "visible",
  },
  mapContainer: {
    backgroundColor: Color.White,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    position: "absolute",
    top: 0,
    right: 15,
    backgroundColor: Color.AccentColor,
    width: 55,
    height: 75,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  card: {
    width: "90%",
    height: "auto",
    marginBottom: 20,
    marginTop: 10,
    paddingBottom: 12,
  },
  section: {
    marginTop: 18,
  },
  boldText: {
    fontWeight: "600",
  },
  listLine: {
    position: "absolute",
    top: 152,
    left: 35,
    width: 1,
    height: 50,
    backgroundColor: Color.GrayDark,
  },
  listContainer: {
    flexDirection: "row",
    marginTop: 15,
  },
  topListContainer: {
    marginBottom: 15,
  },
  listContent: {
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: 12,
  },
  listIcon: {
    backgroundColor: Color.AccentColor,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "600",
  },
  eventImage: {
    height: 175,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  labelDate: {
    textAlign: "center",
    marginTop: 6,
    fontSize: 30,
    fontWeight: "700",
    color: Color.White,
  },
  labelMonth: {
    marginTop: 0,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
    color: Color.White,
  },
  creatorCard: { padding: 13 },
  avatar: { backgroundColor: Color.GrayDark },
  creatorName: {
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 40,
    marginLeft: 10,
  },
  eventTitle: {
    fontSize: 25,
    fontWeight: "700",
    color: Color.PrimaryMain,
    paddingTop: 15,
  },
  map: {
    height: 300,
    width: "100%",
    alignSelf: "center",
    marginTop: 12,
  },
  avatarsContainer: {
    display: "flex",
    flexDirection: "row",
    height: 50,
    justifyContent: "space-between",
  },
  stackedAvatarContainer: {
    height: 50,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 15,
  },
  joinText: {
    fontSize: 13,
  },
});
