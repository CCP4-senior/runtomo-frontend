import React from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import { Card, Paragraph, Title, TouchableOpacity } from "react-native-paper";
import Color from "../../assets/themes/Color.js";
import LongButton from "../../components/LongButton.js";
import EventCard from "../../components/EventCard.js";

const ConfirmationScreen = ({ navigation, event, actionType }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={[
          styles.card,
          actionType === "join" && styles.joinCard,
          styles.cardTop,
        ]}
        theme={{ roundness: 10 }}
        accessible={true}
      >
        <Card.Content>
          {actionType === "create" && (
            <Title style={styles.cardTopTitle}>Congratulations</Title>
          )}
          {actionType === "join" && (
            <Title style={styles.cardTopTitle}>Joined Successfully!</Title>
          )}
          {actionType === "create" && (
            <>
              <Paragraph style={styles.paragraph}>
                Your Event is live now!
              </Paragraph>
              <Paragraph style={styles.paragraph}>
                Don't forget to share with everyone. Thank you!
              </Paragraph>
            </>
          )}
          {actionType === "join" && (
            <>
              <Paragraph style={styles.paragraph}>
                You joined {event.user.username}'s event!
              </Paragraph>
              <Paragraph style={styles.paragraph}>
                Don't forget to share with everyone. Thank you!
              </Paragraph>
            </>
          )}
        </Card.Content>
      </View>

      {actionType === "create" && (
        <EventCard
          event={event}
          handlePress={() => navigation.navigate("Running Event")}
        />
      )}
      {actionType === "join" && (
        <EventCard
          event={event}
          handlePress={() => navigation.navigate("Home")}
        />
      )}
      {actionType === "create" && (
        <LongButton
          buttonHandler={() => {
            alert("Some edit page");
          }}
          buttonColor={Color.GrayDark}
          buttonText="Edit Event"
          buttonTextColor="#555555"
        />
      )}
      {actionType === "create" && (
        <LongButton
          buttonHandler={() => {
            navigation.navigate("Home Page");
          }}
          buttonColor={Color.PrimaryMain}
          buttonText="Done"
        />
      )}
      {actionType === "join" && (
        <LongButton
          buttonHandler={() => {
            navigation.navigate("Home");
          }}
          buttonColor={Color.PrimaryMain}
          buttonText="Done"
        />
      )}
    </SafeAreaView>
  );
};

export default ConfirmationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.Fill,
    paddingTop: 10,
    alignItems: "center",
  },
  card: {
    width: "90%",
    marginBottom: 10,
    height: 170,
    padding: 20,
    marginTop: 20,
    backgroundColor: Color.White,
    borderRadius: 10,
  },
  joinCard: {
    marginTop: 50,
  },
  cardTopTitle: {
    textAlign: "center",
    color: Color.PrimaryMain,
    fontWeight: "bold",
    marginBottom: 10,
  },
  paragraph: {
    textAlign: "center",
    paddingLeft: 20,
    paddingRight: 20,
  },
});
