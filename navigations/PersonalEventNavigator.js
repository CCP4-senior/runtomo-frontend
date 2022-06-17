import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Avatar, IconButton } from "react-native-paper";
import PersonalEventScreen from "../screens/personal-event/PersonalEventScreen";
import EventDetailsNavigator from "./EventDetailsNavigator";
import EventCreationNavigator from "./EventCreationNavigator";
import UserProfileScreen from "../screens/user-profile/UserProfileScreen";
import SettingScreen from "../screens/setting/SettingScreen";
import HeaderStyle from "../assets/themes/HeaderStyle";
import createOptions from "./reusableOptions/appNavigatorOptions";

const Stack = createStackNavigator();

const PersonalEventNavigator = ({ navigation, data, setData }) => {
  const openSetting = () => {
    navigation.navigate("Setting");
  };

  return (
    <Stack.Navigator>
      <Stack.Screen name="My Sessions" options={createOptions(openSetting)}>
        {(props) => (
          <PersonalEventScreen {...props} setData={setData} data={data} />
        )}
      </Stack.Screen>
      <Stack.Screen name="Event Details" options={{ headerShown: false }}>
        {(props) => (
          <EventDetailsNavigator {...props} setData={setData} data={data} />
        )}
      </Stack.Screen>
      <Stack.Screen name="Profile" component={UserProfileScreen} />
      <Stack.Screen
        name="Setting"
        component={SettingScreen}
        options={{ ...HeaderStyle }}
      />
    </Stack.Navigator>
  );
};

export default PersonalEventNavigator;

const styles = StyleSheet.create({
  iconContainer: {
    flex: 1,
    backgroundColor: "#F5F8FA",
    paddingHorizontal: 30,
  },
  avatar: {
    paddingVertical: 6,
  },
  menu: {
    paddingVertical: 11,
  },
});
