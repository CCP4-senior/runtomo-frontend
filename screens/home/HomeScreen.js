import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { Card, Title, Paragraph, IconButton } from "react-native-paper";
import Colors from "../../styles/colors.js";
const HomeScreen = ({ navigation }) => {
  const mockdata = [
    {
      id: 1,
      title: "Imperial palace run",
      user: { id: 1, username: "Kumiko" },
    },
    { id: 2, title: "Tama river run", user: { id: 2, username: "Wade" } },
    { id: 3, title: "Kanda river run", user: { id: 3, username: "Kei" } },
  ];
  const selectEvent = (eventData) => {
    navigation.navigate("Event Details", {
      eventData: eventData,
    });
  };
  const openEventCreation = () => {
    navigation.navigate("Event Creation");
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.titleStyle}>
          This is the home page of SoleMates
        </Text>
        {mockdata.map((data) => {
          return (
            <Card
              key={data.id}
              onPress={() => {
                selectEvent(data);
              }}
            >
              <Card.Content>
                <Title>{data.title}</Title>
                <Paragraph>Owner {data.id}</Paragraph>
              </Card.Content>
            </Card>
          );
        })}

        <TouchableOpacity
          onPress={openEventCreation}
          activeOpacity={0.7}
          style={styles.touchableOpacityStyle}
        >
          <IconButton
            icon="plus-circle"
            size={70}
            color={Colors.primaryColor}
          ></IconButton>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
  titleStyle: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
  },
  textStyle: {
    fontSize: 16,
    textAlign: "center",
    padding: 10,
  },
  touchableOpacityStyle: {
    position: "absolute",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    right: 30,
    bottom: 30,
  },
  floatingButtonStyle: {
    resizeMode: "contain",
    width: 50,
    height: 50,
  },
});
