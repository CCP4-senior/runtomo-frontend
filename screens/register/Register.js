import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Linking,
  Alert,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { Button, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/authcontext/AuthContext";
import Color from "../../assets/themes/Color.js";

const Register = () => {
  const navigation = useNavigation();

  const { setUser, createUser } = useContext(AuthContext);
  const [emailError, setEmailError] = useState({
    isTriggered: false,
    message: "",
  });
  const [passwordError, setPasswordError] = useState("");

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    let inputError = false;
    let alertMessage = "";

    if (username.length < 5) {
      alertMessage = "The username must be greater than 5 letters";
      inputError = true;
    } else if (email === "") {
      alertMessage = "Cannot have an empty field";
      inputError = true;
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      alertMessage =
        "The email does not look right. Did you type it correctly?";
      inputError = true;
    } else if (password.length < 9) {
      alertMessage = "The password must be 9 or more characters";
      inputError = true;
    } else if (password !== secondPassword) {
      alertMessage = "Passwords do not match";
      inputError = true;
    } else if (password === "" || secondPassword === "") {
      alertMessage = "Cannot have an empty password";
      inputError = true;
    }

    if (inputError) {
      Alert.alert("Try again!", alertMessage, [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "OK" },
      ]);
    } else {
      // Mockdata logic. Leave as a reference until backend endpoints are fully ready
      // setUser({ id: 2, username: "WayneWadeRuns" });
      // navigation.navigate("SignIn", { screen: "Home" });

      navigation.navigate("RegisterExtraInfo", { username, email, password });
    }
  };

  const handleUsername = (text) => {
    setUsername(text);
  };

  const validateEmail = (text) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(text)) {
      const updatedEmailError = { isTriggered: false, message: "" };
      setEmailError(updatedEmailError);
    }
  };

  const validatePassword = (text) => {
    let result = true;
  };

  return (
    <SafeAreaView style={styles.root}>
      {/*  Title */}

      <Text style={styles.title}>Create a New Account</Text>

      {/* Email */}

      <View style={styles.emailFieldWrapper}>
        <TextInput
          label="Email"
          value={email}
          mode="outlined"
          outlineColor={Color.Black}
          activeOutlineColor={Color.Black}
          autoCapitalize="none"
          textContentType="emailAddress"
          keyboardType="email-address"
          returnKeyType="next"
          style={{ height: 50, backgroundColor: Color.GrayLight }}
          error={false}
          errorText={"TESTING"}
          onChangeText={(text) => {
            if (emailError.isTriggered === false) {
              const updatedEmailError = {
                isTriggered: true,
                message: "Please enter a valid email.",
              };
              setEmailError(updatedEmailError);
            }
            validateEmail(text);
            return setEmail(text);
          }}
        />
        <Text style={styles.emailErrorMessage}>
          {emailError.isTriggered && emailError.message}
        </Text>
      </View>

      {/* Username */}

      <View style={styles.usernameFieldWrapper}>
        <TextInput
          label="Username"
          value={username}
          mode="outlined"
          outlineColor={Color.Black}
          activeOutlineColor={Color.Black}
          autoCapitalize="none"
          keyboardType="default"
          returnKeyType="next"
          style={{ height: 50, backgroundColor: Color.GrayLight }}
          onChangeText={handleUsername}
        />
      </View>

      {/*  Password */}

      <View style={styles.passwordFieldWrapper}>
        <TextInput
          label="Password"
          value={password}
          mode="outlined"
          outlineColor={Color.Black}
          activeOutlineColor={Color.Black}
          textContentType="password"
          secureTextEntry={true}
          style={{ height: 50, backgroundColor: Color.GrayLight }}
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      {/*  Second Password */}

      <View style={styles.secondPasswordFieldWrapper}>
        <TextInput
          label="Password (retype)"
          value={secondPassword}
          mode="outlined"
          outlineColor={Color.Black}
          activeOutlineColor={Color.Black}
          textContentType="password"
          secureTextEntry={true}
          style={{ height: 50, backgroundColor: Color.GrayLight }}
          onChangeText={(text) => setSecondPassword(text)}
        />
      </View>

      {/* Register Button */}

      <View style={styles.registerBottomWrapper}>
        <Button
          mode="contained"
          uppercase={false}
          color={Color.PrimaryMain}
          style={{ borderRadius: 10 }}
          labelStyle={{
            fontWeight: "bold",
            fontSize: 18,
          }}
          contentStyle={{
            padding: 5,
          }}
          onPress={() => handleRegister()}
        >
          Register
        </Button>

        {/*  Already have an account? */}

        <Text style={styles.registerText}>
          Already have an account?{" "}
          <Text
            style={styles.registerLink}
            onPress={() => navigation.navigate("SignIn")}
          >
            Sign In
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.White,
  },
  title: {
    position: "absolute",
    width: 305,
    height: 34,
    top: 125,
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginHorizontal: 20,
    letterSpacing: 0.36,
    alignSelf: "center",
  },
  emailFieldHeader: {
    marginBottom: 10,
  },
  emailFieldWrapper: {
    position: "absolute",
    width: 315,
    height: 74,
    top: 304,
    alignSelf: "center",
  },
  emailErrorMessage: {
    marginTop: 4,
    color: Color.PrimaryMain,
  },
  usernameFieldWrapper: {
    position: "absolute",
    width: 315,
    height: 74,
    top: 200,
    alignSelf: "center",
  },
  passwordFieldWrapper: {
    position: "absolute",
    width: 315,
    height: 70,
    top: 400,
    alignSelf: "center",
  },
  secondPasswordFieldWrapper: {
    position: "absolute",
    width: 315,
    height: 70,
    top: 500,
    alignSelf: "center",
  },
  registerBottomWrapper: {
    position: "absolute",
    width: 315,
    height: 101,
    top: 600,
    borderRadius: 10,
    marginHorizontal: 20,
    justifyContent: "space-between",
    alignSelf: "center",
  },
  registerText: {
    alignSelf: "center",
    fontWeight: "500",
    color: Color.Text,
  },
  registerLink: {
    color: Color.PrimaryMain,
  },
});
