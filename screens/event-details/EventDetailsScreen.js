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
import { format } from "date-fns";
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

const EventDetailsScreen = ({
  navigation,
  // eventData,
  data,
  setData,
  setCurrEvent,
}) => {
  useEffect(() => {
    // getUser(); // Leave as a reference. Case where api call is made to get creator info
  }, []);

  const { user } = useContext(AuthContext);
  const { currentEvent } = useContext(DataContext);
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
  const eventData = currentEvent;
  // Leave as a reference. Case where api call is made to get creator info
  // const [creator, setCreator] = useState({});
  const [creator, setCreator] = useState(eventData.creator);

  const getUser = async () => {
    try {
      const response = await axiosInstance(`/users/${eventData.creator}/`);
      setCreator(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const openCreatorProfile = () => {
    if (creator.id !== user.id) navigation.navigate("Creator Profile");
    // To avoid showing femal picture for Wade (current user). To be removed later
    if (creator.id === user.id) navigation.navigate("Profile");
  };
  const joinEvent = () => {
    const newData = data.map((event) => {
      if (event.id === eventData.id) {
        event.hasJoined = true;
        event.participants.push(2); // For demo, use wade's id

        () => setCurrEvent(event);
      }
      return event;
    });

    () => setData(newData);
    navigation.navigate("Event Joined");
  };

  const cancelAttendance = () => {
    // make API call
    const newData = data.map((event) => {
      if (event.id === eventData.id) event.hasJoined = false;
      event.participants.filter((id) => id !== 2); // For demo, use wade's id
      () => setCurrEvent(event);
      return event;
    });
    () => setData(newData);
    setIsAttendanceCancellation(true);
    showDialog();
    setTimeout(() => {
      navigation.navigate("Home");
    }, 2000);
  };

  // Temporary implemenet for demo (need to be cancelled from the last)
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
              {/* <Card.Cover
                source={
                  eventData.image ||
                  require("../../assets/images/demo/defaultEvent.jpeg")
                }
                style={styles.eventImage}
              /> */}

              <View style={styles.label}>
                <Text style={styles.labelDate}>
                  {format(new Date(eventData.date), "d")}
                </Text>
                <Text style={styles.labelMonth}>
                  {format(new Date(eventData.date), "MMM")}
                </Text>
              </View>
              <Card.Content style={styles.creatorCard}>
                <TouchableOpacity
                  onPress={openCreatorProfile}
                  style={[styles.listContainer]}
                >
                  {!creator?.image && (
                    <Avatar.Icon
                      size={40}
                      icon="account"
                      style={styles.avatar}
                    />
                  )}
                  {creator?.image && (
                    <Avatar.Image size={40} source={creator.image} />
                  )}
                  <Text style={styles.creatorName}>{creator.username}</Text>
                </TouchableOpacity>
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
                      {format(new Date(eventData.date), "E, MMM d, yyyy")}
                    </Text>
                    <Text>{format(new Date(eventData.time), "p")}</Text>
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
                      {eventData.ward || "Non 23 ward"}
                    </Text>
                    <Text>View map</Text>
                  </View>
                </View>

                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Description:</Text>
                  <Text>{eventData.description}</Text>
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

            {creator.id === user.id && (
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

            {!eventData.hasJoined && creator.id !== user.id && (
              <LongButton
                buttonHandler={joinEvent}
                buttonColor={Color.PrimaryMain}
                buttonText="Join Event"
              />
            )}

            {eventData.hasJoined && creator.id !== user.id && (
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
});
