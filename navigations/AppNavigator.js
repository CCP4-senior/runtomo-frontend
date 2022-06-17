import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeNavigator from "../navigations/HomeNavigator";
import EventCreationNavigator from "./EventCreationNavigator";
import PersonalEventNavigator from "./PersonalEventNavigator";
import Ionicons from "react-native-vector-icons/Ionicons";
import Color from "../assets/themes/Color.js";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const mockdata = [
    {
      id: 1,
      title: "Imperial palace run",
      ward: "Chiyoda",
      date: "2022-09-10T14:02:55.300Z",
      time: "2022-09-10T14:02:55.300Z",
      user: { id: 1, username: "KumikoKM", age: 28 },
      participants: [2],
      owner_id: 1,
      hasJoined: true,
    },
    {
      id: 2,
      title: "Yoyogi park run",
      ward: "Shibuya",
      date: "2022-08-20T19:30:45.300Z",
      time: "2022-08-20T19:30:45.300Z",
      user: { id: 2, username: "WayneWadeRuns", age: 34 },
      participants: [],
      owner_id: 2,
      hasJoined: true,
    },
    {
      id: 3,
      title: "Kanda river run",
      ward: "Shinjuku",
      date: "2022-09-15T12:03:55.300Z",
      time: "2022-09-15T12:03:55.300Z",
      user: { id: 3, username: "Kei666", age: 29 },
      participants: [],
      owner_id: 3,
      hasJoined: false,
    },
  ];
  const [data, setData] = useState(mockdata);
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
            iconName = "people";
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
        {(props) => <HomeNavigator {...props} setData={setData} data={data} />}
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
          headerShown: false,
        }}
      >
        {(props) => (
          <PersonalEventNavigator {...props} setData={setData} data={data} />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default AppNavigator;
