import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeNavigator from "../navigations/HomeNavigator";
import EventCreationNavigator from "./EventCreationNavigator";
import PersonalEventNavigator from "./PersonalEventNavigator";
import Ionicons from "react-native-vector-icons/Ionicons";
import Color from "../assets/themes/Color.js";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = ({ setData, data, currEvent, setCurrEvent }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        unmountOnBlur: true,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home Page") {
            iconName = "ios-home";
          }
          if (route.name === "My Sessions Main Page") {
            // iconName = "people";
            iconName = "walk";
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
          title: "Home",
        }}
      >
        {(props) => (
          <HomeNavigator
            {...props}
            setData={setData}
            data={data}
            setCurrEvent={setCurrEvent}
            currEvent={currEvent}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Event Creation"
        options={{
          headerShown: false,
        }}
      >
        {(props) => (
          <EventCreationNavigator {...props} setData={setData} data={data} />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="My Sessions Main Page"
        options={{
          title: "My Sessions",
          headerShown: false,
        }}
      >
        {(props) => (
          <PersonalEventNavigator
            {...props}
            setData={setData}
            data={data}
            setCurrEvent={setCurrEvent}
            currEvent={currEvent}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
