import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/home/HomeScreen";
import EventDetailsNavigator from "./EventDetailsNavigator";
import EventDetailsScreen from "../screens/event-details/EventDetailsScreen";
import EventCreationScreen from "../screens/event-creation/EventCreationScreen";

const Stack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="Event Details"
        component={EventDetailsNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Create Event" component={EventCreationScreen} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
