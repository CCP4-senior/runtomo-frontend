import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { IconButton } from "react-native-paper";
import HeaderStyle from "../../assets/themes/HeaderStyle";

const createOptions = (settingPressHandler, messagePressaHandler) => {
  const options = {
    ...HeaderStyle,
    headerRight: () => (
      <TouchableOpacity
        style={[styles.iconContainer, styles.avatar]}
        onPress={() => alert("message icon is pressed!")}
      >
        <IconButton icon="forum-outline" size={32} color="grey" />
      </TouchableOpacity>
    ),
    headerLeft: () => (
      <TouchableOpacity
        style={[styles.iconContainer, styles.menu]}
        onPress={settingPressHandler}
      >
        <View
          style={{
            width: 35,
            height: 35,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconButton icon="menu" color="grey" size={35} />
        </View>
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
    paddingHorizontal: 30,
  },
  menu: {
    paddingVertical: 11,
  },
});
