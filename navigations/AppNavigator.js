import React, { useState, useContext, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import SignOutScreen from "../screens/signout/SignOutScreen";
import { AuthContext } from "../context/authcontext/AuthContext";
import { DataContext } from "../context/datacontext/DataContext";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

import BottomTabNavigator from "./BottomTabNavigator";

const AppNavigator = () => {
  const { user } = useContext(AuthContext);
  const { getAllEventsData } = useContext(DataContext);
  const mockdata = [
    {
      id: 1,
      title: "Imperial palace run",
      ward: "Chiyoda",
      date: "2022-09-10T14:02:55.300Z",
      time: "2022-09-10T14:02:55.300Z",
      image: require("../assets/images/demo/imperialpalace.jpeg"),
      user: {
        id: 1,
        username: "KumikoKM",
        age: 28,
        image: require("../assets/images/demo/kumiko.png"),
      },
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
      image: require("../assets/images/demo/yoyogipark.jpeg"),
      user: {
        id: 2,
        username: "WayneWadeRuns",
        age: 34,
        image: require("../assets/images/demo/wade.png"),
      },
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
      image: require("../assets/images/demo/kandariver.jpeg"),
      user: {
        id: 3,
        username: "Kei666",
        age: 29,
        image: require("../assets/images/demo/kei.png"),
      },
      participants: [],
      owner_id: 3,
      hasJoined: false,
    },
  ];

  const [data, setData] = useState(mockdata);
  const [currEvent, setCurrEvent] = useState("");
  useEffect(() => {
    if (user) {
      getAllEventsData();
    }
  }, []);

  return (
    <Stack.Navigator>
      <Stack.Screen name="Top Page" options={{ headerShown: false }}>
        {(props) => (
          <BottomTabNavigator
            {...props}
            setData={setData}
            data={data}
            setCurrEvent={setCurrEvent}
            currEvent={currEvent}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="SignOut" component={SignOutScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
