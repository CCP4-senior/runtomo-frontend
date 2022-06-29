import React from "react";
import { createNavigationContainerRef } from "@react-navigation/native";
import { StackActions } from "@react-navigation/native";

export const navigateReplace = (name, params) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.replace(name, params));
  }
};

export const navigationRef = createNavigationContainerRef();

export const navigate = (name, params) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
};
