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
  FlatList,
  ScrollView,
} from "react-native";
import { AuthContext } from "../../context/authcontext/AuthContext.js";
import Validation from "../../utils/Validation";

import Color from "../../assets/themes/Color";
import CustomInput from "../../components/CustomInput";
import LongButton from "../../components/LongButton";

const UserProfileEditScreen = ({ navigation, route }) => {
  const { user, setUser, updateDBUserInfo, updateDBUserProfile } =
    useContext(AuthContext);
  const { height } = useWindowDimensions();

  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [dateOfBirth, setDateOfBirth] = useState(
    user.profile?.["date_of_birth"]
  );
  const [runFrequency, setRunFrequency] = useState(
    user.profile?.["run_frequency"]
  );
  const [estimated5k, setEstimated5k] = useState(user.profile?.["estimated5k"]);
  const [estimated10k, setEstimated10k] = useState(
    user.profile?.["estimated10k"]
  );

  const [description, setDescription] = useState(
    user.profile?.description || " "
  );

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
    }
    if (isNaN(Date.parse(dateOfBirth))) {
      alertMessage = "The date must be in the YYYY-MM-DD format!";
      inputError = true;
    }

    if (inputError) {
      alert(alertMessage);
    } else {
      const userUpdates = {
        username: username,
        email: email,
        profile: {
          ...user.profile,
          ...{
            date_of_birth: dateOfBirth,
            run_frequency: runFrequency,
            estimated5k: estimated5k,
            estimated10k: estimated10k,
            description: description,
          },
        },
      };

      setUser({
        ...user,
        ...userUpdates,
      });

      updateDBUserInfo(userUpdates);
      updateDBUserProfile(userUpdates);

      navigation.navigate("Profile");
    }
  };

  const cancelButtonHandler = () => {
    navigation.navigate("Profile");
  };

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.container}>
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

        <View style={styles.field}>
          <Text style={styles.text}>Email</Text>

          <CustomInput
            placeholder="ex: cheetah@example.com"
            value={email}
            changeHandler={(value) => setEmail(value)}
            width={"100%"}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.text}>Date of Birth</Text>
          <CustomInput
            placeholder="ex: 1990-09-25"
            value={dateOfBirth}
            changeHandler={(value) => setDateOfBirth(value)}
            width={"100%"}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.text}>Run Frequency / week</Text>
          <CustomInput
            placeholder="ex: 2-3"
            value={runFrequency}
            changeHandler={(value) => setRunFrequency(value)}
            width={"100%"}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.text}>Estimated 5k</Text>
          <CustomInput
            placeholder="ex: 25-30 mins"
            value={estimated5k}
            changeHandler={(value) => setEstimated5k(value)}
            width={"100%"}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.text}>Estimated 10k</Text>
          <CustomInput
            placeholder="ex: 55-60 mins"
            value={estimated10k}
            changeHandler={(value) => setEstimated10k(value)}
            width={"100%"}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.text}>Estimated 10k</Text>
          <View style={styles.descriptionContainer}>
            <TextInput
              mode="outlined"
              value={description}
              onChangeText={(text) => {
                setDescription(text);
                if (text.length === 480) {
                  alert("Description cannot exceed 480 character length.");
                }
              }}
              style={styles.descriptionText}
              outlineColor={Color.GrayDark}
              activeOutlineColor={Color.GrayDark}
              placeholder={"Tell us a bit about yourself!"}
              maxLength={480}
              multiline={true}
            />
          </View>
        </View>

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
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserProfileEditScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
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
    width: "100%",
  },
  descriptionContainer: {
    marginVertical: 5,
    padding: 15,
    paddingVertical: 20,
    backgroundColor: Color.White,
    borderRadius: 40,
    width: "100%",
    minHeight: 100,
  },
  descriptionText: {
    color: Color.Text,
    fontSize: 16,
  },
});
