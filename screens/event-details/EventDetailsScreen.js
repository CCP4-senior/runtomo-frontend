import React, { useState, useContext, useEffect } from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import {
  Button,
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
import deleteStoredImage from "../../helpers/deleteStoredImage.js";

const EventDetailsScreen = ({ navigation }) => {
  // Google Maps logic
  const [region, setRegion] = useState({
    latitude: 35.6828387,
    longitude: 139.7594549,
  });

  const { user } = useContext(AuthContext);
  const { currentEvent, setCurrentEvent, getUser, generateImageUrl } =
    useContext(DataContext);
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const [isAttendanceCancellation, setIsAttendanceCancellation] =
    useState(true);

  const eventData = currentEvent;

  const [participants, setParticipants] = useState([]);
  const [hasJoined, setHasJoined] = useState(false);

  const [creator, setCreator] = useState(eventData.creator);
  const date = new Date(eventData.date);
  const time = new Date(eventData.time);
  const zonedDate = addHours(date, 9);
  const zonedTime = addHours(time, 9);

  useEffect(() => {
    getAllParticipants();
    setLatitudeAndLongitude();
  }, []);

  const setLatitudeAndLongitude = () => {
    if (!eventData.lat || !eventData.long) {
      const eventLocation = {
        latitude: 35.6828387,
        longitude: 139.7594549,
      };
      setRegion(eventLocation);
    } else {
      const eventLocation = {
        latitude: Number(eventData.lat),
        longitude: Number(eventData.long),
      };
      setRegion(eventLocation);
    }
  };

  const getAllParticipants = async () => {
    try {
      setParticipants(eventData.participants);
      if (
        eventData.participants.some((participant) => participant.id === user.id)
      )
        setHasJoined(true);
    } catch (e) {
      console.log(e);
    }
  };

  const deepCopy = (item) => {
    return JSON.parse(JSON.stringify(item));
  };

  // To be modified
  const openCreatorProfile = async () => {
    await getUser(eventData.creator.id);

    let userToView = null;

    if (creator.id === user.id) userToView = deepCopy(user);
    if (creator.id !== user.id) userToView = deepCopy(creator);

    navigation.navigate("Profile", { userToView });
  };
  const joinEvent = async () => {
    try {
      const joiningData = {
        title: eventData.title,
        location: eventData.location,
        ward: eventData.ward,
        participants: [
          ...eventData.participants,
          { username: user.username, email: user.email },
        ],
      };
      const response = await axiosInstance.post(
        `/events/participant/${eventData.id}/${user.id}/`,
        joiningData
      );

      setCurrentEvent({ ...eventData, user: user });
      navigation.navigate("Event Joined");
    } catch (e) {
      console.log(e);
    }
  };

  const cancelAttendance = async () => {
    try {
      const response = await axiosInstance.delete(
        `/events/participant/${eventData.id}/${user.id}/`
      );

      setIsAttendanceCancellation(true);
      showDialog();
      setTimeout(() => {
        navigation.navigate("Home");
      }, 2000);
    } catch (e) {
      console.log(e);
    }
  };

  const cancelEvent = async (event) => {
    await axiosInstance.delete(`/events/${event.id}/`);

    if (event.imageUrl) {
      deleteStoredImage(event.imageUrl);
    }

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
        <View>
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
                          source={{
                            uri: generateImageUrl(eventData.creator.image),
                          }}
                        />
                      )}
                      <Text style={styles.creatorName}>
                        {eventData.creator.username}
                      </Text>
                    </TouchableOpacity>

                    <View style={styles.stackedAvatarContainer}>
                      <View
                        style={{
                          alignSelf: "center",
                        }}
                      >
                        <StackedAvatars
                          color={"#007AFF"}
                          participantsArray={participants}
                        />
                      </View>
                      {participants.length !== 0 && (
                        <Text style={{ color: "#007AFF", ...styles.joinText }}>
                          {participants.length} Joined
                        </Text>
                      )}
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
                      <Text style={styles.thinText}>
                        {eventData.running_duration <= 60 &&
                          `${format(new Date(zonedTime), "p")} to
                        ${format(
                          addMinutes(
                            new Date(zonedTime),
                            Number(eventData.running_duration)
                          ),
                          "p"
                        )}`}
                        {eventData.running_duration > 60 &&
                          `Minimum of 1 hr from ${format(
                            new Date(zonedTime),
                            "p"
                          )}
                       `}
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
                      <Text style={styles.thinText}>
                        Exact location available upon joining
                      </Text>
                    </View>
                  </View>

                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Description:</Text>
                    <Text style={styles.thinText}>{eventData.description}</Text>
                  </View>

                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Location:</Text>
                    <Text style={styles.thinText}>{eventData.location}</Text>
                  </View>
                  <View style={styles.mapContainer}>
                    {eventData.participants.some(
                      (participant) => participant.id === user.id
                    ) || eventData.creator.id === user.id ? (
                      <MapView
                        key={`${eventData.id}${Date.now()}`}
                        style={styles.map}
                        initialRegion={{
                          latitude: region.latitude,
                          longitude: region.longitude,
                          latitudeDelta: 0.002,
                          longitudeDelta: 0.002,
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
                          radius={50}
                          strokeWidth={2}
                        ></Circle>
                      </MapView>
                    ) : null}
                  </View>
                </Card.Content>
              </Card>

              {eventData.creator.id === user.id && (
                <>
                  <LongButton
                    buttonHandler={() => {
                      setCurrentEvent(eventData);
                      navigation.navigate("Edit Event");
                    }}
                    buttonColor={Color.GrayDark}
                    buttonText="Edit Event"
                    buttonTextColor="#555555"
                  />
                  <LongButton
                    buttonHandler={() => cancelEvent(eventData)}
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

          {(hasJoined || eventData.creator.id === user.id) && (
            <Button
              style={styles.messageButton}
              mode="contained"
              color={"#007AFF"}
              uppercase={false}
              labelStyle={{
                lineHeight: 20,
                letterSpacing: 0.1,
                fontWeight: "800",
                fontSize: 14,
                color: "#fff",
                marginLeft: 10,
              }}
              icon="forum"
              onPress={() => {
                navigation.navigate("Messages");
              }}
            >
              Message
            </Button>
          )}
        </View>
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
  thinText: {
    color: Color.Text,
  },
  listLine: {
    position: "absolute",
    top: 158,
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
  creatorCard: { padding: 13, paddingTop: 6 },
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
    paddingTop: 25,
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
    // height: 50,
    // display: "flex",
    // justifyContent: "flex-start",
    // alignItems: "center",
    // paddingTop: 15,
    height: 70,
    paddingTop: 15,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    // backgroundColor: "blue",
  },
  joinText: {
    fontSize: 13,
    textAlign: "center",
  },
  messageButton: {
    position: "absolute",
    top: 2,
    left: 13,
    borderRadius: 30,
    width: 110,
    height: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4.84,

    elevation: 5,
  },
});
