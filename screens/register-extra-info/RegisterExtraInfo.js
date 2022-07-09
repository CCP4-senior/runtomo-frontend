import { StyleSheet, View, SafeAreaView, ScrollView, Text } from "react-native";
import React, { useContext, useState } from "react";
import { Button, TextInput, Provider, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Color from "../../assets/themes/Color.js";
import { AuthContext } from "../../context/authcontext/AuthContext";
import DatePicker from "../event-creation/DatePicker.js";
import LongButton from "../../components/LongButton.js";
import SuccessModal from "./SuccessModal.js";
import resizeImage from "../../helpers/resizeImage.js";
import uploadImage from "../../helpers/uploadImage.js";

const RegisterExtraInfo = ({ route }) => {
  const navigation = useNavigation();
  const { setUserToBeRegistered, createUser, createUserProfile } =
    useContext(AuthContext);

  const { username, email, password, imageUri } = route.params;

  const [date, setDate] = useState("");
  const [estimated5k, setEstimated5k] = useState("");
  const [estimated10k, setEstimated10k] = useState("");

  const [submitted, setSubmitted] = useState(false);

  const [timesPerWeek, setTimesPerWeek] = useState("");
  const [description, setDescription] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handlePress = async () => {
    // age validation
    if (!date) {
      return alert("Please enter date of birth.");
    }
    const isAgeValid = validateAge(date);

    if (!isAgeValid) {
      return alert("You must be at least 18 years old to register.");
    }

    if (!timesPerWeek) {
      return alert("Please select running frequency per week.");
    }

    if (!estimated5k) {
      return alert("Please select estimated 5k time.");
    }

    if (!estimated10k) {
      return alert("Please select estimated 10k time.");
    }

    if (description === "") {
      return alert("Please write a short description about yourself.");
    }

    const formattedDate = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;

    const userProfileData = {
      date_of_birth: formattedDate,
      run_frequency: timesPerWeek,
      estimated5k: estimated5k,
      estimated10k: estimated10k,
      email: email,
      password: password,
      description: description,
    };

    await setUserToBeRegistered(userProfileData);
    await register(userProfileData);
    setModalVisible(true);
  };

  const handleTPWBtnClick = (buttonValue) => {
    setTimesPerWeek(buttonValue);
  };

  const handle5kBtnClick = (buttonValue) => {
    setEstimated5k(buttonValue);
  };

  const handle10BtnClick = (buttonValue) => {
    setEstimated10k(buttonValue);
  };

  const validateAge = (userAge) => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const userBirthYear = new Date(userAge).getFullYear();
    const userBirthMonth = new Date(userAge).getMonth() + 1;

    // Not accounting for days

    if (currentYear - userBirthYear < 18) {
      return false;
    } else if (currentYear - userBirthYear === 18) {
      if (currentMonth - userBirthMonth < 0) {
        return false;
      }
      return true;
    } else {
      return true;
    }
  };

  const register = async (userProfileData) => {
    const newUri = await resizeImage(imageUri, 300);
    const imageRef = await uploadImage("profiles", newUri);
    await createUserAndProfile(imageRef, userProfileData);
  };

  const createUserAndProfile = async (imageRef, userProfileData) => {
    try {
      await createUser({ username, password, email, image: imageRef });

      // Wait to make suer user is created in backend
      setTimeout(async () => {
        await createUserProfile(userProfileData);
      }, 1000);
    } catch (e) {
      console.log(e.config.url);
      alert("Something went wrong! Please try again");
    }
  };

  return (
    <Provider>
      <SuccessModal modalVisible={modalVisible} />
      <SafeAreaView
        style={{ height: "100%", width: "100%", backgroundColor: "#fff" }}
      >
        <View style={styles.topContainer}>
          <IconButton
            icon={"arrow-left"}
            size={25}
            style={{ position: "absolute", left: 0 }}
            onPress={() => {
              navigation.navigate("Register");
            }}
          />
        </View>
        <ScrollView style={styles.root}>
          <View style={styles.container}>
            {/*  Title */}

            <View style={styles.title}>
              <Text style={styles.titleText}>Tell us about yourself!</Text>
            </View>

            {/*Subtitle */}
            <View style={styles.subtitle}>
              <Text style={styles.subtitleText}>
                Let's start with some facts about you
              </Text>
            </View>

            {/* Input Fields */}

            <View style={styles.inputs}>
              {/* Age Date Picker */}

              <View style={styles.datePickerContainer}>
                <DatePicker
                  setDate={setDate}
                  date={date}
                  submitted={submitted}
                  category="date"
                  isInRegisterForm={true}
                  overWriteWidth={"100%"}
                />
              </View>

              {/* Times per week buttons*/}
              <View style={styles.timesPerWeekBtnHeader}>
                <Text style={styles.btnTitleText}>
                  How many times a week do you usually run?
                </Text>
              </View>
              <View style={styles.timesPerWeekBtnWrapper}>
                <Button
                  onPress={() => handleTPWBtnClick("1-2")}
                  mode={timesPerWeek === "1-2" ? "contained" : "outlined"}
                  style={[
                    styles.timesPerWeekBtns,
                    timesPerWeek === "1-2"
                      ? styles.btnSelected
                      : styles.btnNotSelected,
                  ]}
                >
                  <Text
                    style={
                      timesPerWeek === "1-2"
                        ? styles.btnTextSelected
                        : styles.btnText
                    }
                  >
                    1-2
                  </Text>
                </Button>
                <Button
                  onPress={() => handleTPWBtnClick("2-3")}
                  mode={timesPerWeek === "2-3" ? "contained" : "outlined"}
                  style={[
                    styles.timesPerWeekBtns,
                    timesPerWeek === "2-3"
                      ? styles.btnSelected
                      : styles.btnNotSelected,
                  ]}
                >
                  <Text
                    style={
                      timesPerWeek === "2-3"
                        ? styles.btnTextSelected
                        : styles.btnText
                    }
                  >
                    2-3
                  </Text>
                </Button>
                <Button
                  onPress={() => handleTPWBtnClick("3-5")}
                  mode={timesPerWeek === "3-5" ? "contained" : "outlined"}
                  style={[
                    styles.timesPerWeekBtns,
                    timesPerWeek === "3-5"
                      ? styles.btnSelected
                      : styles.btnNotSelected,
                  ]}
                >
                  <Text
                    style={
                      timesPerWeek === "3-5"
                        ? styles.btnTextSelected
                        : styles.btnText
                    }
                  >
                    3-5
                  </Text>
                </Button>
                <Button
                  onPress={() => handleTPWBtnClick("5+")}
                  mode={timesPerWeek === "5+" ? "contained" : "outlined"}
                  style={[
                    styles.timesPerWeekBtns,
                    timesPerWeek === "5+"
                      ? styles.btnSelected
                      : styles.btnNotSelected,
                  ]}
                >
                  <Text
                    style={
                      timesPerWeek === "5+"
                        ? styles.btnTextSelected
                        : styles.btnText
                    }
                  >
                    5+
                  </Text>
                </Button>
              </View>

              {/* Pace 5km */}

              <View style={styles.estimate5kHeader}>
                <Text style={styles.btnTitleText}>
                  How long does it take you to run a 5km? (estimate)
                </Text>
              </View>
              <View style={styles.estimatedKmBtnWrapper}>
                <Button
                  onPress={() => handle5kBtnClick("15-20 mins")}
                  mode={estimated5k === "15-20 mins" ? "contained" : "outlined"}
                  style={[
                    styles.estimatedKmBtns,
                    estimated5k === "15-20 mins"
                      ? styles.btnSelected
                      : styles.btnNotSelected,
                  ]}
                >
                  <Text
                    style={[
                      estimated5k === "15-20 mins"
                        ? styles.btnTextSelected
                        : styles.btnText,
                      { textTransform: "lowercase", fontSize: 12 },
                    ]}
                  >
                    15-20 mins
                  </Text>
                </Button>
                <Button
                  onPress={() => handle5kBtnClick("20-25 mins")}
                  mode={estimated5k === "20-25 mins" ? "contained" : "outlined"}
                  style={[
                    styles.estimatedKmBtns,
                    estimated5k === "20-25 mins"
                      ? styles.btnSelected
                      : styles.btnNotSelected,
                  ]}
                >
                  <Text
                    style={[
                      estimated5k === "20-25 mins"
                        ? styles.btnTextSelected
                        : styles.btnText,
                      { textTransform: "lowercase", fontSize: 12 },
                    ]}
                  >
                    20-25 mins
                  </Text>
                </Button>
                <Button
                  onPress={() => handle5kBtnClick("25-30 mins")}
                  mode={estimated5k === "25-30 mins" ? "contained" : "outlined"}
                  style={[
                    styles.estimatedKmBtns,
                    estimated5k === "25-30 mins"
                      ? styles.btnSelected
                      : styles.btnNotSelected,
                  ]}
                >
                  <Text
                    style={[
                      estimated5k === "25-30 mins"
                        ? styles.btnTextSelected
                        : styles.btnText,
                      { textTransform: "lowercase", fontSize: 12 },
                    ]}
                  >
                    25-30 mins
                  </Text>
                </Button>
                <Button
                  onPress={() => handle5kBtnClick("30-35 mins")}
                  mode={estimated5k === "30-35 mins" ? "contained" : "outlined"}
                  style={[
                    styles.estimatedKmBtns,
                    estimated5k === "30-35 mins"
                      ? styles.btnSelected
                      : styles.btnNotSelected,
                  ]}
                >
                  <Text
                    style={[
                      estimated5k === "30-35 mins"
                        ? styles.btnTextSelected
                        : styles.btnText,
                      { textTransform: "lowercase", fontSize: 12 },
                    ]}
                  >
                    30-35 mins
                  </Text>
                </Button>
                <Button
                  onPress={() => handle5kBtnClick("35-40 mins")}
                  mode={estimated5k === "35-40 mins" ? "contained" : "outlined"}
                  style={[
                    styles.estimatedKmBtns,
                    estimated5k === "35-40 mins"
                      ? styles.btnSelected
                      : styles.btnNotSelected,
                  ]}
                >
                  <Text
                    style={[
                      estimated5k === "35-40 mins"
                        ? styles.btnTextSelected
                        : styles.btnText,
                      { textTransform: "lowercase", fontSize: 12 },
                    ]}
                  >
                    35-40 mins
                  </Text>
                </Button>
                <Button
                  onPress={() => handle5kBtnClick(">40 mins")}
                  mode={estimated5k === ">40 mins" ? "contained" : "outlined"}
                  style={[
                    styles.estimatedKmBtns,
                    estimated5k === ">40 mins"
                      ? styles.btnSelected
                      : styles.btnNotSelected,
                  ]}
                >
                  <Text
                    style={[
                      estimated5k === ">40 mins"
                        ? styles.btnTextSelected
                        : styles.btnText,
                      { textTransform: "lowercase", fontSize: 12 },
                    ]}
                  >{`>40 mins`}</Text>
                </Button>
              </View>
              {/* Pace 10km */}

              <View style={styles.estimate10kHeader}>
                <Text style={styles.btnTitleText}>
                  How long does it take you to run a 10km? (estimate)
                </Text>
              </View>
              <View style={styles.estimatedKmBtnWrapper}>
                <Button
                  onPress={() => handle10BtnClick("40-45 mins")}
                  mode={
                    estimated10k === "40-45 mins" ? "contained" : "outlined"
                  }
                  style={[
                    styles.estimatedKmBtns,
                    estimated10k === "40-45 mins"
                      ? styles.btnSelected
                      : styles.btnNotSelected,
                  ]}
                >
                  <Text
                    style={[
                      estimated10k === "40-45 mins"
                        ? styles.btnTextSelected
                        : styles.btnText,
                      { textTransform: "lowercase", fontSize: 12 },
                    ]}
                  >
                    40-45 mins
                  </Text>
                </Button>
                <Button
                  onPress={() => handle10BtnClick("45-50 mins")}
                  mode={
                    estimated10k === "45-50 mins" ? "contained" : "outlined"
                  }
                  style={[
                    styles.estimatedKmBtns,
                    estimated10k === "45-50 mins"
                      ? styles.btnSelected
                      : styles.btnNotSelected,
                  ]}
                >
                  <Text
                    style={[
                      estimated10k === "45-50 mins"
                        ? styles.btnTextSelected
                        : styles.btnText,
                      { textTransform: "lowercase", fontSize: 12 },
                    ]}
                  >
                    45-50 mins
                  </Text>
                </Button>
                <Button
                  onPress={() => handle10BtnClick("50-55 mins")}
                  mode={
                    estimated10k === "50-55 mins" ? "contained" : "outlined"
                  }
                  style={[
                    styles.estimatedKmBtns,
                    estimated10k === "50-55 mins"
                      ? styles.btnSelected
                      : styles.btnNotSelected,
                  ]}
                >
                  <Text
                    style={[
                      estimated10k === "50-55 mins"
                        ? styles.btnTextSelected
                        : styles.btnText,
                      { textTransform: "lowercase", fontSize: 12 },
                    ]}
                  >
                    50-55 mins
                  </Text>
                </Button>
                <Button
                  onPress={() => handle10BtnClick("55-60 mins")}
                  mode={
                    estimated10k === "55-60 mins" ? "contained" : "outlined"
                  }
                  style={[
                    styles.estimatedKmBtns,
                    estimated10k === "55-60 mins"
                      ? styles.btnSelected
                      : styles.btnNotSelected,
                  ]}
                >
                  <Text
                    style={[
                      estimated10k === "55-60 mins"
                        ? styles.btnTextSelected
                        : styles.btnText,
                      { textTransform: "lowercase", fontSize: 12 },
                    ]}
                  >
                    55-60 mins
                  </Text>
                </Button>
                <Button
                  onPress={() => handle10BtnClick("60-65 mins")}
                  mode={
                    estimated10k === "60-65 mins" ? "contained" : "outlined"
                  }
                  style={[
                    styles.estimatedKmBtns,
                    estimated10k === "60-65 mins"
                      ? styles.btnSelected
                      : styles.btnNotSelected,
                  ]}
                >
                  <Text
                    style={[
                      estimated10k === "60-65 mins"
                        ? styles.btnTextSelected
                        : styles.btnText,
                      { textTransform: "lowercase", fontSize: 12 },
                    ]}
                  >
                    60-65 mins
                  </Text>
                </Button>
                <Button
                  onPress={() => handle10BtnClick(">65 mins")}
                  mode={estimated10k === ">65 mins" ? "contained" : "outlined"}
                  style={[
                    styles.estimatedKmBtns,
                    estimated10k === ">65 mins"
                      ? styles.btnSelected
                      : styles.btnNotSelected,
                  ]}
                >
                  <Text
                    style={[
                      estimated10k === ">65 mins"
                        ? styles.btnTextSelected
                        : styles.btnText,
                      { textTransform: "lowercase", fontSize: 12 },
                    ]}
                  >{`>65 mins`}</Text>
                </Button>
              </View>
            </View>

            {/* About me */}
            <View style={styles.inputContainer}>
              <View style={styles.profileHeader}>
                <Text style={styles.btnTitleText}>Description</Text>
              </View>
              <TextInput
                mode="outlined"
                value={description}
                onChangeText={(text) => {
                  setDescription(text);
                  if (text.length === 480) {
                    alert("Description cannot exceed 480 character length.");
                  }
                }}
                theme={{
                  ...styles.inputTheme,
                }}
                style={styles.input}
                outlineColor={Color.GrayDark}
                activeOutlineColor={Color.GrayDark}
                placeholder={"Tell us a bit about yourself!"}
                maxLength={480}
                multiline={true}
              />
            </View>

            {/* Continue Button */}

            <View style={styles.button}>
              <LongButton
                buttonColor={Color.PrimaryMain}
                buttonText="Register"
                buttonHandler={() => handlePress()}
                customStyle={{ width: "95%" }}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Provider>
  );
};

export default RegisterExtraInfo;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.White,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  topContainer: {
    height: 40,
  },
  title: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 8,
  },
  inputs: {
    width: "85%",
  },
  button: {
    width: "90%",
    borderRadius: 10,
    alignSelf: "center",
    marginVertical: 20,
  },
  input: {
    width: "90%",
  },
  titleText: {
    fontFamily: "Mulish_900Black",
    fontSize: 28,
    fontWeight: "700",
    letterSpacing: 0.36,
  },
  subtitleText: {
    fontSize: 16,
    color: Color.Text,
  },
  datePickerContainer: {
    marginVertical: 15,
  },
  dobHeader: {
    alignSelf: "flex-start",
  },
  timesPerWeekBtnHeader: {
    alignSelf: "flex-start",
    marginTop: 10,
  },
  estimate5kHeader: {
    alignSelf: "flex-start",
    marginVertical: 10,
    // marginBottom: 10,
  },
  estimate10kHeader: {
    alignSelf: "flex-start",
    marginVertical: 10,
    marginBottom: 10,
  },
  profileHeader: {
    alignSelf: "flex-start",
  },
  timesPerWeekBtnWrapper: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  estimatedKmBtnWrapper: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginVertical: 10,
    marginBottom: 20,
    marginTop: 0,
  },
  timesPerWeekBtns: {
    borderRadius: 20,
    width: "22%",
    marginVertical: 10,
  },
  estimatedKmBtns: {
    borderRadius: 20,
    width: "32%",
    marginBottom: 10,
  },
  btnSelected: {
    backgroundColor: Color.PrimaryMain,
    borderColor: Color.PrimaryMain,
  },
  btnNotSelected: {
    borderColor: Color.PrimaryMain,
    borderWidth: 1,
  },
  btnTitleText: {
    color: Color.TextMute,
  },
  btnText: {
    color: Color.PrimaryMain,
    letterSpacing: 0.1,
  },
  btnTextSelected: {
    color: Color.White,
    letterSpacing: 0.1,
  },
  inputContainer: {
    width: "85%",
    alignItems: "center",
  },
  inputTheme: {
    roundness: 10,
    colors: {
      placeholder: Color.TextMute,
    },
  },
  input: { backgroundColor: Color.GrayMedium, width: "100%", height: 150 },
});
