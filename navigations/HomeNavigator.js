import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Avatar, IconButton } from "react-native-paper";
import HomeScreen from "../screens/home/HomeScreen";
import EventDetailsNavigator from "./EventDetailsNavigator";
import EventCreationNavigator from "./EventCreationNavigator";
import UserProfileScreen from "../screens/user-profile/UserProfileScreen";
import SettingScreen from "../screens/setting/SettingScreen";
import HeaderStyle from "../assets/themes/HeaderStyle";
import Color from "../assets/themes/Color.js";

const Stack = createStackNavigator();

const HomeNavigator = ({ navigation, setData, data }) => {
  const openSetting = () => {
    navigation.navigate("Setting");
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        options={{
          title: "Home",
          ...HeaderStyle,
          headerRight: () => (
            <TouchableOpacity
              style={[styles.iconContainer, styles.avatar]}
              onPress={() => alert("message icon is pressed!")}
            >
              <IconButton icon="forum-outline" size={32} color="grey" />
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
      >
        {(props) => <HomeScreen {...props} setData={setData} data={data} />}
      </Stack.Screen>

      <Stack.Screen name="Event Details" options={{ headerShown: false }}>
        {(props) => (
          <EventDetailsNavigator {...props} setData={setData} data={data} />
        )}
      </Stack.Screen>
      <Stack.Screen name="Event Creation" options={{ headerShown: false }}>
        {(props) => (
          <EventCreationNavigator {...props} setData={setData} data={data} />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="Profile"
        component={UserProfileScreen}
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

const styles = StyleSheet.create({
  iconContainer: {
    flex: 1,
    backgroundColor: "#F5F8FA",
    paddingHorizontal: 30,
  },
  avatar: {
    // paddingVertical: 1,
  },
  menu: {
    paddingVertical: 11,
  },
});
