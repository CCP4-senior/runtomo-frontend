import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/home/HomeScreen";
import EventDetailsNavigator from "./EventDetailsNavigator";
import UserProfileScreen from "../screens/user-profile/UserProfileScreen";
import UserProfileEditScreen from "../screens/user-profile/UserProfileEditScreen";
import SettingScreen from "../screens/setting/SettingScreen";
import HeaderStyle from "../assets/themes/HeaderStyle";
import createOptions from "./reusableOptions/appNavigatorOptions";

const Stack = createStackNavigator();

const HomeNavigator = ({
  navigation,
  setData,
  data,
  setCurrEvent,
  currEvent,
}) => {
  const openSetting = () => {
    navigation.navigate("Setting");
  };

  return (
    <Stack.Navigator>
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
            setCurrEvent={setCurrEvent}
          />
        )}
      </Stack.Screen>
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
      <Stack.Screen
        name="Setting"
        component={SettingScreen}
        options={{ ...HeaderStyle }}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
