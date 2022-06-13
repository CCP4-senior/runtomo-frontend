import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeNavigator from "../navigations/HomeNavigator";
// import HomeScreen from "../screens/home/HomeScreen";
import PersonalEventScreen from "../screens/personal-event/PersonalEventScreen";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ unmountOnBlur: true }}>
      <Tab.Screen
        name="Home Page"
        component={HomeNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen name="Your Session" component={PersonalEventScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
