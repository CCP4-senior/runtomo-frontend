import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "../context/authcontext/AuthContext";
import { navigationRef } from "./RootNavigator";
import AuthNavigator from "./AuthNavigator";
import AppNavigator from "./AppNavigator";

const AppNavContainer = () => {
  const { user } = useContext(AuthContext);
  return (
    <NavigationContainer ref={navigationRef}>
      {user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavContainer;
