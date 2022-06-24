import React from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import PersonalEventScreen from "../screens/personal-event/PersonalEventScreen";
import EventDetailsNavigator from "./EventDetailsNavigator";
import UserProfileScreen from "../screens/user-profile/UserProfileScreen";
import SettingScreen from "../screens/setting/SettingScreen";
import HeaderStyle from "../assets/themes/HeaderStyle";
import createOptions from "./reusableOptions/appNavigatorOptions";
import UserProfileEditScreen from "../screens/user-profile/UserProfileEditScreen";

const Stack = createStackNavigator();

const PersonalEventNavigator = ({
  navigation,
  data,
  setData,
  setCurrEvent,
  currEvent,
}) => {
  const openSetting = () => {
    navigation.navigate("Setting");
  };

  return (
    <Stack.Navigator>
      <Stack.Screen name="My Sessions" options={createOptions(openSetting)}>
        {(props) => (
          <PersonalEventScreen
            {...props}
            setData={setData}
            data={data}
            setCurrEvent={setCurrEvent}
            currEvent={currEvent}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Event Details" options={{ headerShown: false }}>
        {(props) => (
          <EventDetailsNavigator
            {...props}
            setData={setData}
            data={data}
            currEvent={currEvent}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Profile" component={UserProfileScreen} />
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

      <Stack.Screen name="Home" options={createOptions(openSetting)}>
        {(props) => (
          <HomeScreen
            {...props}
            setData={setData}
            data={data}
            currEvent={currEvent}
            setCurrEvent={setCurrEvent}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default PersonalEventNavigator;
