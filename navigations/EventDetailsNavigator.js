import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EventDetailsScreen from "../screens/event-details/EventDetailsScreen";
import PublicProfileScreen from "../screens/user-profile/PublicProfileScreen";

const Stack = createStackNavigator();

const EventDetailsNavigator = ({ route }) => {
  const { eventData } = route.params;
  return (
    <Stack.Navigator>
      <Stack.Screen name="Details">
        {(props) => <EventDetailsScreen {...props} eventData={eventData} />}
      </Stack.Screen>
      <Stack.Screen name="Creator Profile" component={PublicProfileScreen} />
    </Stack.Navigator>
  );
};

export default EventDetailsNavigator;
