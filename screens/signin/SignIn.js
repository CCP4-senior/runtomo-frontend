import { StyleSheet, View, SafeAreaView, Text, Linking } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import { Button, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/authcontext/AuthContext';
import Color from '../../assets/themes/Color.js';

const SignIn = () => {
  const navigation = useNavigation();
  const { setUser, signInUser } = useContext(AuthContext);
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

  const handleSignIn = () => {
    if (emailError.isTriggered) {
      return alert("Please enter a valid email!");
    }
    if (!email) {
      return alert("Please enter an email!");
    }

    signInUser({ email, password });
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
      <Text style={styles.title}>Welcome Back!</Text>
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
          style={{ height: 50, backgroundColor: Color.White }}
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
          label="Password"
          value={password}
          mode="outlined"
          outlineColor={Color.Black}
          activeOutlineColor={Color.Black}
          textContentType="password"
          secureTextEntry={true}
          style={{ height: 50, backgroundColor: Color.White }}
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
          disabled={!isFormValidated}
          onPress={() => handleSignIn()}
        >
          Sign In
        </Button>
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
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  title: {
    position: "absolute",
    width: 305,
    height: 34,
    top: 213,
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
    color: "#c7254e",
  },
  passwordErrorMessage: {
    marginTop: 4,
    color: "#c7254e",
  },
  passwordFieldWrapper: {
    position: "absolute",
    width: 315,
    height: 70,
    top: 398,
    alignSelf: "center",
  },
  forgotPasswordLink: {
    position: "absolute",
    color: Color.PrimaryMain,
    top: 485,
    fontSize: 15,
    left: 230,
  },
  signInBottomWrapper: {
    position: "absolute",
    width: 315,
    height: 101,
    top: 525,
    borderRadius: 10,
    marginHorizontal: 20,
    fontWeight: "500",
    justifyContent: "space-between",
    alignSelf: "center",
  },
  signUpText: {
    alignSelf: "center",
    fontWeight: "500",
    color: "rgba(60, 60, 67, 0.7)",
    fontSize: 15,
  },
  signUpLink: {
    color: Color.PrimaryMain,
    fontSize: 15,
  },
});
