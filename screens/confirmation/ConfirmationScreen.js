import React, { useContext } from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import { Card, Paragraph, Title } from "react-native-paper";
import Color from "../../assets/themes/Color.js";
import LongButton from "../../components/LongButton.js";
import EventCard from "../../components/EventCard.js";
import { DataContext } from "../../context/datacontext/DataContext.js";

const ConfirmationScreen = ({ navigation, actionType, route }) => {
  let isConfirmationCard, isDateUTC, isTimeUTC;
  if (route.params) {
    isConfirmationCard = route.params.isConfirmationCard;
    isDateUTC = route.params.isDateUTC;
    isTimeUTC = route.params.isTimeUTC;
  }
  const { currentEvent } = useContext(DataContext);
  const event = currentEvent;
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
            <Title style={styles.cardTopTitle}>Congratulations!</Title>
          )}
          {actionType === "join" && (
            <Title style={styles.cardTopTitle}>Joined Successfully!</Title>
          )}
          {actionType === "update" && (
            <Title style={styles.cardTopTitle}>Updated Successfully!</Title>
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
                You joined {event.creator.username}'s event!
              </Paragraph>
              <Paragraph style={styles.paragraph}>
                Don't forget to share with everyone. Thank you!
              </Paragraph>
            </>
          )}
          {actionType === "update" && (
            <>
              <Paragraph style={styles.paragraph}>
                Event is successfully updated!
              </Paragraph>
              <Paragraph style={styles.paragraph}>
                Don't forget to share with everyone. Thank you!
              </Paragraph>
            </>
          )}
        </Card.Content>
      </View>

      <EventCard
        event={event}
        handlePress={() => navigation.navigate("Home")}
        isConfirmationCard={isConfirmationCard}
        isDateUTC={isDateUTC}
        isTimeUTC={isTimeUTC}
      />

      <LongButton
        buttonHandler={() => {
          navigation.navigate("Home");
        }}
        buttonColor={Color.PrimaryMain}
        buttonText="Done"
      />
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
    color: Color.Black,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: "Mulish_900Black",
    fontSize: 24,
  },
  paragraph: {
    textAlign: "center",
    paddingLeft: 20,
    paddingRight: 20,
    color: "#4E4B66",
    fontSize: 14,
  },
});
