import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeNavigator from "../navigations/HomeNavigator";
import EventCreationNavigator from "./EventCreationNavigator";
import PersonalEventNavigator from "./PersonalEventNavigator";
import Ionicons from "react-native-vector-icons/Ionicons";
import Color from "../assets/themes/Color.js";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        unmountOnBlur: true,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home Page") {
            iconName = "ios-home";
          }
          if (route.name === "My Sessions") {
            iconName = "people";
          }
          if (route.name === "Create Event") {
            iconName = "add-circle-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Color.PrimaryMain,
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Home Page"
        component={HomeNavigator}
        options={{
          headerShown: false,
          title: "Home",
        }}
      />
      <Tab.Screen
        name="Create Event"
        component={EventCreationNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="My Sessions"
        component={PersonalEventNavigator}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
