import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  Image,
  useWindowDimensions,
  Button,
  TextInput,
} from "react-native";
import { AuthContext } from "../../context/authcontext/AuthContext.js";
import Validation from "../../utils/Validation";

import Color from "../../assets/themes/Color";
import CustomInput from "../../components/CustomInput";
import LongButton from "../../components/LongButton";

const UserProfileEditScreen = ({ navigation }) => {
  const { user, setUser } = useContext(AuthContext);
  const { height } = useWindowDimensions();

  // Todo - Ravi: replace mockData with db data when Users is available
  const mockData = {
    username: user.username,
    email: user.email,
    age: user.age || 35, // Added to avoid error
    runnerType: user.runnerType || ["Avid"], // Added to avoid error
  };

  const userData = {
    username: user.username,
    age: user.email,
  };


  const [username, setUsername] = useState(mockData.username);
  const [email, setEmail] = useState(mockData.email);
  const [age, setAge] = useState(mockData.age);
  const [runnerType, setRunnerType] = useState(mockData.runnerType);

  const doneButtonHandler = () => {
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
    } else if (isNaN(age)) {
      alertMessage = "Did you input age correctly?";
      inputError = true;
    } else if (age < 18 || age > 130) {
      alertMessage = "Your age must be between 18 and 130!";
      inputError = true;
    }

    if (inputError) {
      alert(alertMessage);
    } else {
      setUser({
        ...mockData,
        ...{
          username: username,
          email: email,
          age: age,
          // runnerType: runnerType,
        },
      });
      navigation.navigate("Profile");
    }
  };

  const cancelButtonHandler = () => {
    navigation.navigate("Profile");
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        {/* Username */}

        <View style={styles.field}>
          <Text style={styles.text}>Username</Text>

          <CustomInput
            placeholder="please input a username"
            value={username}
            changeHandler={(value) => setUsername(value)}
            width={"100%"}
            editable={false}
          />
        </View>

        {/* Email */}

        <View style={styles.field}>
          <Text style={styles.text}>Email</Text>

          <CustomInput
            placeholder="please input a username"
            value={email}
            changeHandler={(value) => setEmail(value)}
            width={"100%"}
          />
        </View>

        {/* Buttons */}
        <View style={styles.buttonsContainer}>
          <LongButton
            buttonHandler={doneButtonHandler}
            buttonColor={Color.PrimaryMain}
            buttonText="Done"
          />
          <LongButton
            buttonHandler={cancelButtonHandler}
            buttonColor={Color.White}
            buttonTextColor={Color.PrimaryMain}
            buttonText="Cancel"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UserProfileEditScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: Color.Fill,
    padding: 30,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    overflow: "visible",
    width: "100%",
  },
  title: {
    fontSize: 30,
    alignSelf: "center",
  },
  text: {
    fontSize: 20,
    marginVertical: 5,
  },
  field: {
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%",
    marginVertical: 5,
  },
  customInput: {},
  inputContainer: {
    flex: 1,
    marginVertical: 5,
  },
  buttonsContainer: {
    alignSelf: "center",
  },
});
