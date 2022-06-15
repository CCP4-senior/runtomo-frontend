import React from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { Avatar, Card, Title, Paragraph } from "react-native-paper";
import { format } from "date-fns";
import Color from "../../assets/themes/Color.js";
import LongButton from "../../components/LongButton.js";

const EventDetailsScreen = ({ navigation, eventData }) => {
  const openCreatorProfile = () => {
    navigation.navigate("Creator Profile");
  };
  const event = {
    id: 1,
    eventTitle: "Imperial palace run",
    ward: "Shibuya",
    date: "2022-09-10T14:02:55.300Z",
    time: "2022-09-10T14:02:55.300Z",
    user: { id: 1, username: "Kumiko" },
  };
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

          <View
            style={{
              position: "absolute",
              top: 0,
              right: 15,
              backgroundColor: "#11C9BD",
              width: 55,
              height: 75,
              borderBottomLeftRadius: 25,
              borderBottomRightRadius: 25,
            }}
          >
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
          <Card.Content style={{ padding: 12 }}>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={openCreatorProfile}>
                <Avatar.Icon size={50} icon="account" />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "700",
                  lineHeight: 50,
                  marginLeft: 10,
                }}
              >
                {eventData.user.username}
              </Text>
            </View>
            <Title
              style={{
                fontSize: 24,
                fontWeight: "600",
                color: Color.PrimaryMain,
                paddingTop: 15,
              }}
            >
              {event.eventTitle}
            </Title>

            <Paragraph>{format(new Date(event.date), "MMM d, yyyy")}</Paragraph>
            <Paragraph>{format(new Date(event.time), "p")}</Paragraph>
            <Paragraph>{event.ward}</Paragraph>

            <View>
              <Text style={styles.sectionTitle}>Description:</Text>
              <Text>
                Lorem ipsum, or lipsum as it is sometimes known, is dummy text
                used in laying out print, graphic or web designs.
              </Text>
            </View>

            <View>
              <Text style={styles.sectionTitle}>Location:</Text>
              <Text>2-1 Yoyogikamizonocho, Shibuya City, Tokyo 151-0052</Text>
              <Image
                source={require("../../assets/images/map.png")}
                style={{ height: 280, width: 280 }}
              />
            </View>
          </Card.Content>
        </Card>
        <LongButton
          buttonHandler={() => {
            Alert("Some edit page");
          }}
          buttonColor={Color.GrayDark}
          buttonText="Edit Event"
          buttonTextColor="#555555"
        />
        <LongButton
          buttonHandler={() => {
            navigation.navigate("SoleMates");
          }}
          buttonColor={Color.PrimaryMain}
          buttonText="Done"
        />
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
  card: {
    width: "90%",
    height: 800,
    marginBottom: 20,
    marginTop: 10,
  },
  inputContainer: {
    margin: 5,
  },
  description: {
    height: 98,
    borderRadius: 10,
  },
  pickerContainer: {
    width: 335,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
