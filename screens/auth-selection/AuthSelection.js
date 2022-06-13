import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  useWindowDimensions,
} from "react-native";
import { Button } from "react-native-paper";
import React from "react";

const AuthSelection = ({ navigation }) => {
  const { height } = useWindowDimensions();

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <Image
          style={[styles.logo, { height: height * 0.3 }]}
          source={require("../../assets/images/logo.png")}
          resizeMode="cover"
        />
      </View>
      <View style={styles.buttonsWrapper}>
        <View style={styles.signInBtnWrapper}>
          <Button
            color="black"
            uppercase={false}
            contentStyle={{
              borderWidth: 1,
              borderRadius: 10,
              borderColor: "black",
              padding: 2,
            }}
            labelStyle={{
              fontWeight: "bold",
            }}
            onPress={() => navigation.navigate("SignIn")}
          >
            Sign In
          </Button>
        </View>
        <View style={styles.registerBtnWrapper}>
          <Button
            mode="contained"
            uppercase={false}
            color="#fa2600"
            style={{ borderRadius: 10 }}
            labelStyle={{
              fontWeight: "bold",
            }}
            contentStyle={{
              padding: 2,
            }}
            onPress={() => navigation.navigate("Register")}
          >
            Register
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AuthSelection;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 3,
    alignItems: "center",
    padding: 10,
    marginTop: 50,
  },
  logo: {
    width: "70%",
    maxWidth: 350,
    maxHeight: 250,
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
  },
});
