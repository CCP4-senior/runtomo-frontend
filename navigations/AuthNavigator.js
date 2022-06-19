import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "../screens/signin/SignIn";
import Register from "../screens/register/Register";
import AuthSelection from "../screens/auth-selection/AuthSelection";
import SignOutScreen from "../screens/signout/SignOutScreen";

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AuthSelection"
        component={AuthSelection}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="SignOut" component={SignOutScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
