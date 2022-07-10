import { StyleSheet, View, SafeAreaView, Text, Image } from "react-native";
import React, { useContext, useState } from "react";
import { TextInput, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/authcontext/AuthContext";
import Color from "../../assets/themes/Color.js";
import LongButton from "../../components/LongButton";

const SignIn = () => {
  const navigation = useNavigation();
  const { signInUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState({
    isTriggered: true,
    message: "",
  });
  const [isFormValidated, setIsFormValidated] = useState(false);
  const [passwordError, setPasswordError] = useState({
    isTriggered: true,
    message: "",
  });

  const handleSignIn = async () => {
    if (emailError.isTriggered) {
      return alert("Please enter a valid email!");
    }
    if (!email) {
      return alert("Please enter an email!");
    }

    await signInUser({ email, password });
  };

  const validateEmail = (text) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(text)) {
      const updatedEmailError = { isTriggered: false, message: "" };
      setEmailError(updatedEmailError);
      if (passwordError.isTriggered === false) {
        setIsFormValidated(true);
      }
    } else if (text.length >= 1) {
      const updatedEmailError = {
        isTriggered: true,
        message: "Please enter a valid email.",
      };
      setEmailError(updatedEmailError);
      setIsFormValidated(false);
    } else {
      const updatedEmailError = {
        isTriggered: true,
        message: "",
      };
      setEmailError(updatedEmailError);
      setIsFormValidated(false);
    }
  };

  const validatePassword = (text) => {
    if (text.length >= 9) {
      const updatedPasswordError = { isTriggered: false, message: "" };
      setPasswordError(updatedPasswordError);
      if (emailError.isTriggered === false) {
        setIsFormValidated(true);
      }
    } else if (text.length >= 1) {
      const updatedPasswordError = {
        isTriggered: true,
        message: "Password must be at least 9 characters.",
      };
      setPasswordError(updatedPasswordError);
      setIsFormValidated(false);
    } else {
      const updatedPasswordError = {
        isTriggered: true,
        message: "",
      };
      setPasswordError(updatedPasswordError);
      setIsFormValidated(false);
    }
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
      <View style={styles.mainContainer}>
        <Image
          source={require("../../assets/images/runtomo-logo-orange-3.png")}
          style={styles.image}
        />
        <View>
          <Text style={styles.title}>Welcome Back!</Text>
        </View>

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
            onChangeText={(text) => {
              validateEmail(text);
              return setEmail(text);
            }}
          />
          <Text style={styles.emailErrorMessage}>
            {emailError.isTriggered && emailError.message}
          </Text>
        </View>
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
            onChangeText={(text) => {
              validatePassword(text);
              return setPassword(text);
            }}
          />
          <Text style={styles.passwordErrorMessage}>
            {passwordError.isTriggered && passwordError.message}
          </Text>
        </View>
        <Text
          style={styles.forgotPasswordLink}
          onPress={() => alert("Forgot Password!")}
        >
          Forgot password?
        </Text>
        <View style={styles.signInBottomWrapper}>
          <LongButton
            buttonColor={Color.PrimaryMain}
            buttonText="Sign In"
            customStyle={{ width: "100%" }}
            buttonHandler={() => handleSignIn()}
          />

          <Text style={styles.signUpText}>
            Don't have an account?{" "}
            <Text
              style={styles.signUpLink}
              onPress={() => navigation.navigate("Register")}
            >
              Sign up
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.White,
  },
  mainContainer: {
    height: "70%",
    position: "relative",
    marginTop: "30%",
    display: "flex",
    justifyContent: "space-between",
  },
  image: {
    alignSelf: "center",
    width: 120,
    height: 120,
  },
  title: {
    fontFamily: "Mulish_900Black",
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginHorizontal: 20,
    letterSpacing: 0.36,
    alignSelf: "center",
    marginBottom: 10,
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
  passwordErrorMessage: {
    marginTop: 4,
    color: Color.PrimaryMain,
  },
  passwordFieldWrapper: {
    width: 315,
    height: 70,
    alignSelf: "center",
  },
  forgotPasswordLink: {
    color: Color.PrimaryMain,
    fontSize: 15,
    left: 225,
    fontWeight: "500",
    marginTop: 10,
  },
  signInBottomWrapper: {
    width: 315,
    height: 101,
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 10,
    fontWeight: "500",
    justifyContent: "space-between",
    alignSelf: "center",
  },
  signUpText: {
    alignSelf: "center",
    fontWeight: "500",
    color: "rgba(60, 60, 67, 0.8)",
    fontSize: 15,
  },
  signUpLink: {
    color: Color.PrimaryMain,
    fontSize: 15,
    fontWeight: "700",
  },
});
