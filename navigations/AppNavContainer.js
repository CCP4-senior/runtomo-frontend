import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "../context/authcontext/AuthContext";
import { navigationRef } from "./RootNavigator";
import AuthNavigator from "./AuthNavigator";
import AppNavigator from "./AppNavigator";
import {
  DefaultTheme,
  DarkTheme as PaperDarkTheme,
  Provider as PaperProvider,
} from "react-native-paper";

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#CDCDCD",
    accent: "#ff3131",
    text: "#4E4B66",
    placeholder: "#4E4B66",
  },
};

const AppNavContainer = () => {
  const { user } = useContext(AuthContext);
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer ref={navigationRef}>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </PaperProvider>
  );
};

export default AppNavContainer;
