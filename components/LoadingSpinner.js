import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ActivityIndicator,
} from "react-native";
import React from "react";
import Color from "../assets/themes/Color";

const LoadingSpinner = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <ActivityIndicator size="large" />
      </View>
    </SafeAreaView>
  );
};

export default LoadingSpinner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.Fill,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    fontSize: 30,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 50,
    height: 50,
  },
});
