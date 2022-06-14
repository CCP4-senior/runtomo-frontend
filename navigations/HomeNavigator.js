import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Avatar } from "react-native-paper";
import HomeScreen from "../screens/home/HomeScreen";
import EventDetailsNavigator from "./EventDetailsNavigator";
// import EventCreationScreen from "../screens/event-creation/EventCreationScreen";
import EventCreationNavigator from "./EventCreationNavigator";

const Stack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SoleMates"
        component={HomeScreen}
        options={{
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => alert("This is a button!")}
              style={styles.container}
            >
              <Avatar.Icon icon="account" size={30} title="Info" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Event Details"
        component={EventDetailsNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Event Creation"
        component={EventCreationNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
});
