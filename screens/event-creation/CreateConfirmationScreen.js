import React, { useState } from "react";
import { ScrollView, View, StyleSheet, Text } from "react-native";
import {
  Card,
  Paragraph,
  Title,
  Button,
  TextInput,
  IconButton,
} from "react-native-paper";
import Colors from "../../styles/colors.js";

const CreateConfirmationScreen = ({ navigation }) => {
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

      <Card style={[styles.card, styles.cardBottom]} onPress={() => {}}>
        <Card.Cover
          source={{ uri: "https://picsum.photos/700" }}
          style={{ height: 175 }}
        />
        <Card.Content>
          <Title>Event title</Title>
          <Paragraph>area and meeting Point</Paragraph>
          <Paragraph>Date and time</Paragraph>
        </Card.Content>
      </Card>
      <Button
        mode="contained"
        uppercase={false}
        color={Colors.secondaryColor}
        style={{
          borderRadius: 25,
          width: 325,
          height: 55,
          marginTop: 20,
        }}
        labelStyle={{
          fontWeight: "bold",
          fontSize: 20,
        }}
        contentStyle={{
          padding: 7,
        }}
        onPress={() => {
          console.log("Yay!");
        }}
      >
        Edit Event
      </Button>
      <Button
        mode="contained"
        uppercase={false}
        color={Colors.primaryColor}
        style={{
          borderRadius: 25,
          width: 325,
          height: 55,
          marginTop: 20,
        }}
        labelStyle={{
          fontWeight: "bold",
          fontSize: 20,
        }}
        contentStyle={{
          padding: 7,
        }}
        onPress={() => {
          console.log("Yay!");
        }}
      >
        Done
      </Button>
    </View>
  );
};

export default CreateConfirmationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.fill,
    paddingTop: 10,
    alignItems: "center",
  },
  card: {
    width: "90%",
    marginBottom: 10,
    // padding: 10,
  },
  cardTop: {
    height: 170,
    padding: 10,
  },
  cardTopTitle: {
    textAlign: "center",
    color: Colors.primaryColor,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardBottom: {
    height: 270,
  },
  paragraph: {
    textAlign: "center",
    paddingLeft: 20,
    paddingRight: 20,
  },
});
