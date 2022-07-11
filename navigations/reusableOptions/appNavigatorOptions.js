import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { IconButton } from "react-native-paper";
import HeaderStyle from "../../assets/themes/HeaderStyle";
import Color from "../../assets/themes/Color";

const createOptions = (
  settingPressHandler,
  messagePressaHandler,
  showPointsOfInterest,
  title
) => {
  const options = {
    ...HeaderStyle,
    title: title,
    headerRight: () => {
      return showPointsOfInterest ? (
        <TouchableOpacity
          style={[styles.iconContainer, styles.menu]}
          onPress={messagePressaHandler}
        >
          <IconButton icon="map" size={25} color="#484848" />
        </TouchableOpacity>
      ) : null;
    },
    headerLeft: () => (
      <TouchableOpacity
        style={[styles.iconContainer, styles.menu]}
        onPress={settingPressHandler}
      >
        <IconButton icon="menu" color="#484848" size={25} />
      </TouchableOpacity>
    ),
  };
  return options;
};

export default createOptions;

const styles = StyleSheet.create({
  iconContainer: {
    flex: 1,
    backgroundColor: Color.White,
    paddingHorizontal: 20,
  },
  menu: {
    justifyContent: "center",
  },
});
