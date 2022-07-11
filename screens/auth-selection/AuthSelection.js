import {
  StyleSheet,
  View,
  Image,
  useWindowDimensions,
  Text,
} from "react-native";
import { Button } from "react-native-paper";
import React from "react";
import Color from "../../assets/themes/Color.js";
import { LinearGradient } from "expo-linear-gradient";
import LongButton from "../../components/LongButton.js";

const AuthSelection = ({ navigation }) => {
  const { height } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/images/splash.png")}
          style={styles.image}
        />
      </View>
      <LinearGradient
        colors={["rgba(255, 180, 67, 0.8)", "rgba(255, 62, 12, 0.8)"]}
        style={styles.overlay}
      ></LinearGradient>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../../assets/images/runtomo-logo3.png")}
          resizeMode="cover"
        />
      </View>
      <View style={styles.lowerContainer}>
        <View style={styles.copyContainer}>
          <Text style={styles.copy}>Run with new friends</Text>
          <Text style={styles.copy}>in Tokyo Area!</Text>
        </View>
        <LongButton
          buttonColor={Color.PrimaryMain}
          buttonText={"Register"}
          buttonHandler={() => navigation.navigate("Register")}
        />
        <LongButton
          buttonColor={Color.PrimaryMain}
          buttonText={"Sign In"}
          buttonTextColor={Color.PrimaryMain}
          mode={"outlined"}
          customStyle={{
            borderColor: Color.PrimaryMain,
            borderWidth: 1,
            marginTop: 10,
          }}
          buttonHandler={() => navigation.navigate("SignIn")}
        />
      </View>
    </View>
  );
};

export default AuthSelection;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.White,
  },
  container: {
    flex: 3,
    alignItems: "center",
    padding: 10,
    // marginTop: 30,
  },
  buttonsWrapper: {
    flex: 1,
    alignItems: "center",
  },
  signInBtnWrapper: {
    marginBottom: 20,
    width: "70%",
    borderRadius: 10,
  },
  registerBtnWrapper: {
    width: "70%",
    marginBottom: 20,
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    position: "absolute",
    height: "60%",
    width: "100%",
    top: 0,
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
    height: "60%",
  },
  logoContainer: {
    position: "absolute",
    height: "90%",
    width: "100%",
    top: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    position: "absolute",
    top: "29%",
    width: 157,
    height: 205,
  },
  lowerContainer: {
    position: "absolute",
    backgroundColor: Color.White,
    top: "60%",
    width: "100%",
    height: "40%",
    alignItems: "center",
  },
  copyContainer: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 30,
  },
  copy: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "900",
    color: "#484848",
    fontFamily: "Mulish_900Black",
  },
});
