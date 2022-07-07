import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { IconButton } from "react-native-paper";
import HeaderStyle from "../../assets/themes/HeaderStyle";
import MapView, {
  Callout,
  Marker,
  Circle,
  PROVIDER_GOOGLE,
  PROVIDER_DEFAULT,
} from "react-native-maps";

const createOptions = (settingPressHandler, messagePressaHandler) => {
  const options = {
    ...HeaderStyle,
    headerRight: () => (
      <TouchableOpacity
        style={[styles.iconContainer, styles.menu]}
        onPress={messagePressaHandler}
      >
        <IconButton icon="map" size={25} color="grey" />
      </TouchableOpacity>
    ),
    headerLeft: () => (
      <TouchableOpacity
        style={[styles.iconContainer, styles.menu]}
        onPress={settingPressHandler}
      >
        <IconButton icon="menu" color="grey" size={25} />
      </TouchableOpacity>
    ),
  };
  return options;
};

export default createOptions;

const styles = StyleSheet.create({
  iconContainer: {
    flex: 1,
    backgroundColor: "#F5F8FA",
    paddingHorizontal: 20,
  },
  menu: {
    justifyContent: "center",
  },
});
