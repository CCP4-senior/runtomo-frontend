import React, { useState, useContext } from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
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

const EventDetailsScreen = ({ navigation, eventData, data, setData }) => {
  const { user } = useContext(AuthContext);
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const openCreatorProfile = () => {
    if (eventData.user.id !== user.id) navigation.navigate("Creator Profile");
    // To avoid showing femal picture for Wade (current user). To be removed later
    if (eventData.user.id === user.id) navigation.navigate("Profile");
  };
  const joinEvent = () => {
    let newData = data.map((event) => {
      if (event.id === eventData.id) event.hasJoined = true;
      return event;
    });
    () => setData(newData);
    navigation.navigate("Event Joined");
  };

  const cancelAttendance = () => {
    // make API call
    let newData = data.map((event) => {
      if (event.id === eventData.id) event.hasJoined = false;
      return event;
    });
    () => setData(newData);
    showDialog();
    setTimeout(() => {
      navigation.navigate("Home");
    }, 2000);
  };

  const event = eventData;

  return (
    <Provider>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Attendance Canceled</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              "Attendance to this event has been canceled successufully."
            </Paragraph>
          </Dialog.Content>
        </Dialog>
      </Portal>
      <ScrollView>
        <View style={styles.container}>
          <Card style={styles.card} theme={{ roundness: 10 }}>
            <Card.Cover
              source={{ uri: "https://picsum.photos/700" }}
              style={{
                height: 175,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              }}
            />

            <View style={styles.label}>
              <Text
                style={{
                  textAlign: "center",
                  marginTop: 6,
                  fontSize: 30,
                  fontWeight: "700",
                  color: Color.White,
                }}
              >
                {format(new Date(event.date), "d")}
              </Text>
              <Text
                style={{
                  marginTop: 0,
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: "700",
                  color: Color.White,
                }}
              >
                {format(new Date(event.date), "MMM")}
              </Text>
            </View>
            <Card.Content style={{ padding: 13 }}>
              <TouchableOpacity
                onPress={openCreatorProfile}
                style={[styles.listContainer]}
              >
                <Avatar.Icon
                  size={40}
                  icon="account"
                  style={{ backgroundColor: Color.GrayDark }}
                />
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "700",
                    lineHeight: 40,
                    marginLeft: 10,
                  }}
                >
                  {event.user.username}
                </Text>
              </TouchableOpacity>
              <Title
                style={{
                  fontSize: 25,
                  fontWeight: "700",
                  color: Color.PrimaryMain,
                  paddingTop: 15,
                }}
              >
                {event.title}
              </Title>

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
                    {format(new Date(event.date), "E, MMM d, yyyy")}
                  </Text>
                  <Text>{format(new Date(event.time), "p")}</Text>
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
                  <Text style={styles.boldText}>{event.ward}</Text>
                  <Text>View map</Text>
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Description:</Text>
                <Text>
                  Lorem ipsum, or lipsum as it is sometimes known, is dummy text
                  used in laying out print, graphic or web designs.
                </Text>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Location:</Text>
                <Text>2-1 Yoyogikamizonocho, Shibuya, Tokyo 151-0052</Text>
                <Image
                  source={require("../../assets/images/map.png")}
                  style={{
                    height: 270,
                    width: 285,
                    alignSelf: "center",
                    marginTop: 12,
                  }}
                />
              </View>
            </Card.Content>
          </Card>
          {/* Edit Event button only visible to creator of the event */}
          {event.user.id === user.id && (
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
                buttonHandler={() => {
                  alert("cancel event page");
                }}
                buttonColor={Color.PrimaryMain}
                buttonText="Cancel Event"
              />
            </>
          )}

          {!event.hasJoined && event.user.id !== user.id && (
            <LongButton
              buttonHandler={joinEvent}
              buttonColor={Color.PrimaryMain}
              buttonText="Join Event"
            />
          )}

          {event.hasJoined && event.user.id !== user.id && (
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
});
