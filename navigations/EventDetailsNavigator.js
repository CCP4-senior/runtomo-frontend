import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EventDetailsScreen from "../screens/event-details/EventDetailsScreen";
import PublicProfileScreen from "../screens/user-profile/PublicProfileScreen";
import ConfirmationScreen from "../screens/confirmation/ConfirmationScreen";
import HeaderStyle from "../assets/themes/HeaderStyle.js";

const Stack = createStackNavigator();

const EventDetailsNavigator = ({ route }) => {
  const { eventData } = route.params;
  return (
    <Stack.Navigator>
      <Stack.Screen name="Running Event" options={{ ...HeaderStyle }}>
        {(props) => <EventDetailsScreen {...props} eventData={eventData} />}
      </Stack.Screen>
      <Stack.Screen name="Creator Profile" component={PublicProfileScreen} />
      <Stack.Screen name="Event Joined" options={{ headerShown: false }}>
        {(props) => (
          <ConfirmationScreen {...props} event={eventData} actionType="join" />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default EventDetailsNavigator;
