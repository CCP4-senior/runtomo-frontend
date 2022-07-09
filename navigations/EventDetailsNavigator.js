import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EventDetailsScreen from "../screens/event-details/EventDetailsScreen";
import ConfirmationScreen from "../screens/confirmation/ConfirmationScreen";
import Messages from "../screens/event-details/Messages";
import HeaderStyle from "../assets/themes/HeaderStyle.js";
import EventEditScreen from "../screens/event-details/EventEditScreen";

const Stack = createStackNavigator();

const EventDetailsNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Running Event"
        options={{ ...HeaderStyle, title: "Running Session" }}
      >
        {(props) => <EventDetailsScreen {...props} />}
      </Stack.Screen>

      <Stack.Screen name="Event Joined" options={{ headerShown: false }}>
        {(props) => <ConfirmationScreen {...props} actionType="join" />}
      </Stack.Screen>

      <Stack.Screen
        name="Messages"
        options={{ headerShown: false }}
        component={Messages}
      />

      <Stack.Screen name="Event Updated" options={{ headerShown: false }}>
        {(props) => <ConfirmationScreen {...props} actionType="update" />}
      </Stack.Screen>

      <Stack.Screen name="Edit Event" options={{ ...HeaderStyle }}>
        {(props) => <EventEditScreen {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default EventDetailsNavigator;
