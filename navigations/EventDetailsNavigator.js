import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EventDetailsScreen from "../screens/event-details/EventDetailsScreen";
import PublicProfileScreen from "../screens/user-profile/PublicProfileScreen";
import ConfirmationScreen from "../screens/confirmation/ConfirmationScreen";
import HeaderStyle from "../assets/themes/HeaderStyle.js";

const Stack = createStackNavigator();

const EventDetailsNavigator = ({ route, setData, data }) => {
  console.log(data);
  const { eventData } = route.params;
  const user = eventData.user;
  return (
    <Stack.Navigator>
      <Stack.Screen name="Running Event" options={{ ...HeaderStyle }}>
        {(props) => (
          <EventDetailsScreen
            {...props}
            eventData={eventData}
            data={data}
            setData={setData}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Creator Profile" options={{ ...HeaderStyle }}>
        {(props) => <PublicProfileScreen {...props} user={user} />}
      </Stack.Screen>
      <Stack.Screen name="Event Joined" options={{ headerShown: false }}>
        {(props) => (
          <ConfirmationScreen {...props} event={eventData} actionType="join" />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default EventDetailsNavigator;
