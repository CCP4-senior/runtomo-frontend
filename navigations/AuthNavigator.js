import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "../screens/signin/SignIn";
import Register from "../screens/register/Register";
import AuthSelection from "../screens/auth-selection/AuthSelection";
import AppNavigator from "./AppNavigator";
import { AuthContext } from "../context/authcontext/AuthContext";
import React, { useContext } from "react";

const Stack = createStackNavigator();

const AuthNavigator = ({ navigation }) => {
  const { user } = useContext(AuthContext);

  return (
    <Stack.Navigator>
      {user ? (
        <Stack.Screen
          name="Top Page"
          component={AppNavigator}
          options={{
            headerShown: false,
          }}
        ></Stack.Screen>
      ) : (
        <>
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
        </>
      )}
    </Stack.Navigator>
  );
};

export default AuthNavigator;
