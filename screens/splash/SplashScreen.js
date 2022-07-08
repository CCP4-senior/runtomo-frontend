import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet, Text, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Spinner from "./Spinner.js";

const SplashScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/splash.png")}
        style={styles.image}
      />
      <LinearGradient
        colors={["rgba(255, 180, 67, 0.9)", "rgba(255, 62, 12, 0.9)"]}
        style={styles.overlay}
      ></LinearGradient>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../../assets/images/runtomo-logo.png")}
          resizeMode="cover"
        />
      </View>
      <View style={styles.spinnerContainer}>
        <Spinner />
      </View>
    </View>
  );
  //

  //   navigation.navigate("AuthSelection");
  //   return null;
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  logoContainer: {
    position: "absolute",
    height: "80%",
    width: "100%",
    top: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    position: "absolute",
    width: 184,
    height: 222,
  },
  spinnerContainer: {
    position: "absolute",
    width: "100%",
    top: "70%",
    justifyContent: "center",
    alignItems: "center",
  },
});
