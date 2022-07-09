import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Text,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import { TextInput, Avatar, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/authcontext/AuthContext";
import Color from "../../assets/themes/Color.js";
import LongButton from "../../components/LongButton";
import selectImage from "../../helpers/selectImage";

const Register = () => {
  const navigation = useNavigation();

  const [emailError, setEmailError] = useState({
    isTriggered: false,
    message: "",
  });

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [password, setPassword] = useState("");
  const [imageUri, setImageUri] = useState("");

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
    } else if (imageUri === "") {
      alertMessage = "Signing up requires profile photo";
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
      try {
        navigation.navigate("RegisterExtraInfo", {
          username,
          email,
          password,
          imageUri,
        });
      } catch (error) {
        Alert.alert("Error", e.response.data.detail, [
          {
            text: "OK",
            onPress: () => null,
            style: "cancel",
          },
        ]);
      }
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

  const deleteImage = () => {
    setImageUri("");
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.topContainer}>
        <IconButton
          icon={"arrow-left"}
          size={25}
          style={{ position: "absolute", left: 0 }}
          onPress={() => {
            navigation.navigate("AuthSelection");
          }}
        />
      </View>
      <ScrollView>
        <View style={styles.mainContainer}>
          {/*  Title */}
          <View>
            <Text style={styles.title}>Create a New Account</Text>
          </View>

          <Text style={styles.subtitle}>
            Let's start with some facts about you
          </Text>
          {imageUri === "" && (
            <>
              <View style={styles.avatarContainer}>
                <Avatar.Icon
                  size={120}
                  icon="account"
                  backgroundColor={Color.GrayMedium}
                  color={Color.GrayDark}
                  style={styles.avatar}
                />
              </View>
              <TouchableOpacity
                onPress={async () => {
                  await selectImage(setImageUri);
                }}
              >
                <View style={styles.icon}>
                  <IconButton
                    icon="camera"
                    mode="contained"
                    color={Color.White}
                    size={33}
                  />
                </View>
              </TouchableOpacity>
            </>
          )}
          {imageUri !== "" && (
            <>
              <View style={styles.avatarContainer}>
                <Avatar.Image
                  size={120}
                  source={{ uri: imageUri }}
                  style={styles.avatar}
                />
              </View>
              <TouchableOpacity onPress={deleteImage}>
                <View style={styles.icon}>
                  <IconButton
                    icon="trash-can"
                    mode="contained"
                    color={Color.White}
                    size={33}
                  />
                </View>
              </TouchableOpacity>
            </>
          )}

          {/* Email */}
          <View style={styles.inputContainer}>
            <View style={styles.emailFieldWrapper}>
              <TextInput
                theme={{
                  roundness: 25,
                  colors: {
                    placeholder: Color.TextMute,
                  },
                }}
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
                theme={{
                  roundness: 25,
                  colors: {
                    placeholder: Color.TextMute,
                  },
                }}
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
                theme={{
                  roundness: 25,
                  colors: {
                    placeholder: Color.TextMute,
                  },
                }}
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
                theme={{
                  roundness: 25,
                  colors: {
                    placeholder: Color.TextMute,
                  },
                }}
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
              <LongButton
                buttonHandler={() => handleRegister()}
                buttonColor={Color.PrimaryMain}
                buttonText={"Next"}
                customStyle={{ width: "100%" }}
              />

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
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.White,
    padding: 10,
  },
  topContainer: {
    height: 40,
  },
  mainContainer: {},
  inputContainer: {
    top: -40,
    height: "60%",
    justifyContent: "space-around",
  },
  title: {
    width: "90%",
    fontFamily: "Mulish_900Black",
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginHorizontal: 20,
    alignSelf: "center",
  },
  subtitle: {
    width: "90%",
    textAlign: "center",
    marginHorizontal: 20,
    color: Color.Text,
    fontSize: 16,
    marginVertical: 8,
  },
  emailFieldHeader: {
    marginBottom: 10,
  },
  emailFieldWrapper: {
    width: 315,
    height: 74,
    alignSelf: "center",
  },
  emailErrorMessage: {
    marginTop: 4,
    color: Color.PrimaryMain,
  },
  usernameFieldWrapper: {
    width: 315,
    height: 74,
    alignSelf: "center",
  },
  passwordFieldWrapper: {
    width: 315,
    height: 70,
    alignSelf: "center",
  },
  secondPasswordFieldWrapper: {
    width: 315,
    height: 70,
    alignSelf: "center",
  },
  registerBottomWrapper: {
    marginTop: 12,
    width: 315,

    alignSelf: "center",
  },
  registerText: {
    marginTop: 8,
    alignSelf: "center",
    fontWeight: "500",
    color: Color.TextMute,
  },
  registerLink: {
    color: Color.PrimaryMain,
    fontWeight: "700",
  },
  avatarContainer: {
    marginTop: 10,
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    position: "relative",
  },
  icon: {
    position: "aboslute",
    top: "-90%",
    left: "55%",
    width: 50,
    height: 50,
    backgroundColor: Color.PrimaryMain,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
});
