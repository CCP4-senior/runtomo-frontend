import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EventCreationScreen from "../screens/event-creation/EventCreationScreen";
import CreateConfirmationScreen from "../screens/event-creation/CreateConfirmationScreen";

const Stack = createStackNavigator();

const EventCreationNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Create Event" component={EventCreationScreen} />
      <Stack.Screen name="Event Created" component={CreateConfirmationScreen} />
    </Stack.Navigator>
  );
};

export default EventCreationNavigator;
