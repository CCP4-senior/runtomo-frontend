import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import SignOutScreen from "../screens/signout/SignOutScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

import BottomTabNavigator from "./BottomTabNavigator";

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Top Page" options={{ headerShown: false }}>
        {(props) => <BottomTabNavigator {...props} />}
      </Stack.Screen>
      <Stack.Screen name="SignOut" component={SignOutScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
