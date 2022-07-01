import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EventDetailsScreen from "../screens/event-details/EventDetailsScreen";
import PublicProfileScreen from "../screens/user-profile/PublicProfileScreen";
import ConfirmationScreen from "../screens/confirmation/ConfirmationScreen";
import HeaderStyle from "../assets/themes/HeaderStyle.js";
import EventEditScreen from "../screens/event-details/EventEditScreen";

const Stack = createStackNavigator();

const EventDetailsNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Running Event" options={{ ...HeaderStyle }}>
        {(props) => <EventDetailsScreen {...props} />}
      </Stack.Screen>
      <Stack.Screen name="Creator Profile" options={{ ...HeaderStyle }}>
        {(props) => <PublicProfileScreen {...props} />}
      </Stack.Screen>
      <Stack.Screen name="Event Joined" options={{ headerShown: false }}>
        {(props) => <ConfirmationScreen {...props} actionType="join" />}
      </Stack.Screen>

      <Stack.Screen name="Edit Event" options={{ ...HeaderStyle }}>
        {(props) => <EventEditScreen {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default EventDetailsNavigator;
