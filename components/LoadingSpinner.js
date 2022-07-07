import { StyleSheet, Text, View, SafeAreaView, Image, ActivityIndicator } from "react-native";
import React from "react";
import Color from "../assets/themes/Color";

const LoadingSpinner = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        {/* <Text style={styles.loadingText}> Loading... </Text> */}
        {/* <Image
          resizeMode="contain"
          style={styles.image}
          // source={require("../assets/images/spinner-gray.gif")}
          source={require("../assets/images/spinner-runner.gif")}
        /> */}
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
    // width: '100%',
    // height: "100%",
  },
  loadingText: {
    fontSize: 30,
  },
  imageContainer: {
    // flex: 1,
    // height: "30%",
    // backgroundColor: "purple",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {},
});
