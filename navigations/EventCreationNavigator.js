import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EventCreationScreen from "../screens/event-creation/EventCreationScreen";
import ConfirmationScreen from "../screens/confirmation/ConfirmationScreen";
import HeaderStyle from "../assets/themes/HeaderStyle";
import createOptions from "./reusableOptions/appNavigatorOptions";
import SettingScreen from "../screens/setting/SettingScreen";
import EventDetailsScreen from "../screens/event-details/EventDetailsScreen";
import * as RootNavigation from "./RootNavigator";
import UserProfileEditScreen from "../screens/user-profile/UserProfileEditScreen";

const Stack = createStackNavigator();

const EventCreationNavigator = ({ navigation, setData, data }) => {
  const initialEvent = Object.freeze({
    title: "",
    meetingPoint: "",
    ward: "",
    date: "",
    time: "",
    runningDuration: "",
    eventDescription: "",
  });
  const [newEvent, setNewEvent] = useState(initialEvent);
  const openSetting = () => {
    RootNavigation.navigate("Setting");
    // navigation.navigate("Setting");
  };
  return (
    <Stack.Navigator>
      <Stack.Screen name="Create Event" options={createOptions(openSetting)}>
        {(props) => (
          <EventCreationScreen
            {...props}
            newEvent={newEvent}
            setNewEvent={setNewEvent}
            setData={setData}
            data={data}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="Event Created"
        options={{ ...HeaderStyle, headerShown: false }}
      >
        {(props) => (
          <ConfirmationScreen
            {...props}
            event={newEvent}
            setNewEvent={setNewEvent}
            actionType="create"
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Running Event" options={{ ...HeaderStyle }}>
        {(props) => (
          <EventDetailsScreen
            {...props}
            eventData={newEvent}
            data={data}
            setData={setData}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="Setting"
        component={SettingScreen}
        options={{ ...HeaderStyle }}
      />
      <Stack.Screen
        name="Edit Profile"
        component={UserProfileEditScreen}
        options={{ ...HeaderStyle }}
      />
    </Stack.Navigator>
  );
};

export default EventCreationNavigator;
