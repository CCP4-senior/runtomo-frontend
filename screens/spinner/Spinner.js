import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import Color from "../../assets/themes/Color";

const Spinner = () => (
  <View style={[styles.container, styles.horizontal]}>
    <ActivityIndicator size="large" color={Color.PrimaryMain} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  horizontal: {
    flexDirection: "row",
  },
});

export default Spinner;
