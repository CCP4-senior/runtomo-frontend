import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Avatar, IconButton } from "react-native-paper";
import HomeScreen from "../screens/home/HomeScreen";
import EventDetailsNavigator from "./EventDetailsNavigator";
import EventCreationScreen from "../screens/event-creation/EventCreationScreen";
import UserProfileScreen from "../screens/user-profile/UserProfileScreen";
import SettingScreen from "../screens/setting/SettingScreen";
import Color from "../assets/themes/Color.js";

const Stack = createStackNavigator();

const HomeNavigator = ({ navigation }) => {
  const openProfileScreen = (eventData) => {
    navigation.navigate("Profile", {
      eventData: eventData,
    });
  };
  const openSetting = () => {
    navigation.navigate("Setting");
  };
  const headerStyle = {
    headerStyle: {
      backgroundColor: Color.Fill,
      height: 110,
    },
    headerTintColor: Color.HeaderTitle,
    headerTitleStyle: {
      fontWeight: "bold",
    },
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SoleMates"
        component={HomeScreen}
        options={{
          title: "Home",
          ...headerStyle,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => openProfileScreen()}
              style={[styles.iconContainer, styles.avatar]}
            >
              <Avatar.Icon icon="account" size={39} title="Info" />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity
              style={[styles.iconContainer, styles.menu]}
              onPress={openSetting}
            >
              <View
                style={{
                  width: 35,
                  height: 35,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconButton icon="menu" color="grey" size={35} />
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Event Details"
        component={EventDetailsNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Create Event" component={EventCreationScreen} />
      <Stack.Screen name="Profile" component={UserProfileScreen} />
      <Stack.Screen
        name="Setting"
        component={SettingScreen}
        options={{ ...headerStyle }}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;

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
