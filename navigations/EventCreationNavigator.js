import React, { useState, useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EventCreationScreen from "../screens/event-creation/EventCreationScreen";
import ConfirmationScreen from "../screens/confirmation/ConfirmationScreen";
import HeaderStyle from "../assets/themes/HeaderStyle";
import createOptions from "./reusableOptions/appNavigatorOptions";
import SettingScreen from "../screens/setting/SettingScreen";
import UserProfileEditScreen from "../screens/user-profile/UserProfileEditScreen";
import UserProfileScreen from "../screens/user-profile/UserProfileScreen";
import EventDetailsNavigator from "./EventDetailsNavigator";
import HomeScreen from "../screens/home/HomeScreen";
import { DataContext } from "../context/datacontext/DataContext";

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
    navigation.navigate("Setting");
  };
  return (
    <Stack.Navigator>
      <Stack.Screen name="Create Event" options={createOptions(openSetting)}>
        {(props) => (
          <EventCreationScreen
            {...props}
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
      <Stack.Screen name="Event Details" options={{ headerShown: false }}>
        {(props) => <EventDetailsNavigator {...props} />}
      </Stack.Screen>

      <Stack.Screen
        name="Setting"
        component={SettingScreen}
        options={{ ...HeaderStyle }}
      />
      <Stack.Screen
        name="Profile"
        component={UserProfileScreen}
        options={{ ...HeaderStyle }}
      />
      <Stack.Screen
        name="Edit Profile"
        component={UserProfileEditScreen}
        options={{ ...HeaderStyle }}
      />

      <Stack.Screen name="Home" options={createOptions(openSetting)}>
        {(props) => <HomeScreen {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default EventCreationNavigator;
