import React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeNavigator from "../navigations/HomeNavigator";
import EventCreationNavigator from "./EventCreationNavigator";
import PersonalEventNavigator from "./PersonalEventNavigator";
import Ionicons from "react-native-vector-icons/Ionicons";
import Color from "../assets/themes/Color.js";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        unmountOnBlur: true,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home Page") {
            // iconName = "ios-home";
          }
          if (route.name === "My Sessions Main Page") {
            // iconName = "walk";
          }
          if (route.name === "Event Creation") {
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
        options={{
          headerShown: false,
          title: "Discover",
          tabBarIcon: ({ size, focused, color }) => {
            if (focused) {
              return (
                <Image
                  style={{ width: size, height: size }}
                  source={require("../assets/images/home-variant-orange2.png")}
                />
              );
            } else
              return (
                <Image
                  style={{ width: size, height: size }}
                  source={require("../assets/images/home-variant2.png")}
                />
              );
          },
        }}
      >
        {(props) => <HomeNavigator {...props} />}
      </Tab.Screen>
      <Tab.Screen
        name="Event Creation"
        options={{
          title: "Post Event",
          headerShown: false,
        }}
      >
        {(props) => <EventCreationNavigator {...props} />}
      </Tab.Screen>
      <Tab.Screen
        name="My Sessions Main Page"
        options={{
          title: "My Sessions",
          headerShown: false,
          tabBarIcon: ({ size, focused, color }) => {
            if (focused) {
              return (
                <Image
                  style={{ width: size, height: size }}
                  source={require("../assets/images/my-session2.png")}
                  resizeMode={'cover'}
                />
              );
            } else
              return (
                <Image
                  style={{ width: size, height: size }}
                  source={require("../assets/images/my-session-gray2.png")}
                  resizeMode={'cover'}
                />
              );
          },
        }}
      >
        {(props) => <PersonalEventNavigator {...props} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
