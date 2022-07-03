import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EventDetailsScreen from "../screens/event-details/EventDetailsScreen";
import PublicProfileScreen from "../screens/user-profile/PublicProfileScreen";
import ConfirmationScreen from "../screens/confirmation/ConfirmationScreen";
import Messages from "../screens/event-details/Messages";
import HeaderStyle from "../assets/themes/HeaderStyle.js";

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
      <Stack.Screen
        name="Messages"
        options={{ headerShown: false }}
        component={Messages}
      />
    </Stack.Navigator>
  );
};

export default EventDetailsNavigator;
