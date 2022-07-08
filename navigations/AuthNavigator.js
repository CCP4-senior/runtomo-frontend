import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "../screens/signin/SignIn";
import Register from "../screens/register/Register";
import RegisterExtraInfo from "../screens/register-extra-info/RegisterExtraInfo";
import AuthSelection from "../screens/auth-selection/AuthSelection";
import SignOutScreen from "../screens/signout/SignOutScreen";
import ProfilePhoto from "../screens/register-extra-info/ProfilePhoto";
import SplashScreen from "../screens/splash/SplashScreen";

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

      {/* SignIn */}

      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          headerShown: false,
        }}
      />

      {/* Registration */}

      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: false,
        }}
      />

      {/* Extra Info */}

      <Stack.Screen
        name="RegisterExtraInfo"
        component={RegisterExtraInfo}
        options={{
          title: "",
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="ProfilePhoto"
        component={ProfilePhoto}
        options={{
          title: "",
          // headerShown: false,
        }}
      />

      <Stack.Screen name="SignOut" component={SignOutScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
