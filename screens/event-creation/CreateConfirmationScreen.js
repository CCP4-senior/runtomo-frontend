import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Paragraph, Title } from "react-native-paper";
import Color from "../../assets/themes/Color.js"
import LongButton from "../../components/LongButton.js";
import EventCard from "../../components/EventCard.js";

const CreateConfirmationScreen = ({ navigation, newEvent }) => {
  return (
    <View style={styles.container}>
      <Card style={[styles.card, styles.cardTop]} onPress={() => {}}>
        <Card.Content>
          <Title style={styles.cardTopTitle}>Congratulations</Title>
          <Paragraph style={styles.paragraph}>
            Your Event is live now!
          </Paragraph>
          <Paragraph style={styles.paragraph}>
            Don't forget to share with everyone. Thank you!
          </Paragraph>
        </Card.Content>
      </Card>

      <EventCard event={newEvent} />
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
  );
};

export default CreateConfirmationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.fill,
    paddingTop: 10,
    alignItems: "center",
  },
  card: {
    width: "90%",
    marginBottom: 10,
    height: 170,
    padding: 10,
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
