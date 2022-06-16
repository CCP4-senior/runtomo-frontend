import React, { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { Avatar, Card, Title, Paragraph, IconButton } from "react-native-paper";
import { format } from "date-fns";
import Color from "../../assets/themes/Color.js";
import LongButton from "../../components/LongButton.js";

const EventDetailsScreen = ({ navigation, eventData, data, setData }) => {
  const openCreatorProfile = () => {
    navigation.navigate("Creator Profile");
  };

  const event = eventData;

  return (
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
              <Avatar.Icon size={40} icon="account" />
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
        {/* <LongButton
          buttonHandler={() => {
            Alert("Some edit page");
          }}
          buttonColor={Color.GrayDark}
          buttonText="Edit Event"
          buttonTextColor="#555555"
        /> */}
        {/* Joining Event button only visible to joiner of the event */}
        {!event.hasJoined && (
          <LongButton
            buttonHandler={() => {
              // make API call
              // (event) => joinfunc(event);
              let newData = data;
              newData[0].hasJoined = true;
              () => setData(newData);
              navigation.navigate("Event Joined");
            }}
            buttonColor={Color.PrimaryMain}
            buttonText="Join Event"
          />
        )}

        {event.hasJoined && (
          <>
            <Text>You've already joined the event</Text>
            <LongButton
              disabled={true}
              buttonColor={Color.GrayDark}
              buttonText="Join Event"
            />
          </>
        )}
      </View>
    </ScrollView>
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
  // inputContainer: {
  //   margin: 5,
  // },
  // description: {
  //   height: 98,
  //   borderRadius: 10,
  // },
});
