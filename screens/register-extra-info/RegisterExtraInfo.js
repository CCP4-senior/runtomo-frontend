import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Linking,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState, useEffect, useRef } from "react";
import { Button, TextInput, Chip } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Color from "../../assets/themes/Color.js";
import { AuthContext } from "../../context/authcontext/AuthContext";
import DatePicker from "../event-creation/DatePicker.js";

const RegisterExtraInfo = ({ route }) => {
  const navigation = useNavigation();
  const { user, createUserProfile, idForProfile } = useContext(AuthContext);

  const { username, email, password } = route.params;

  const [date, setDate] = useState("");
  const [estimated5k, setEstimated5k] = useState("");
  const [estimated10k, setEstimated10k] = useState("");

  const [submitted, setSubmitted] = useState(false);

  const [timesPerWeek, setTimesPerWeek] = useState("");

  const handlePress = () => {
    navigation.navigate("ProfilePhoto");
  };

  // const handlePress = () => {
  //   // age validation
  //   if (!date) {
  //     return alert("Please enter date of birth");
  //   }
  //   const isAgeValid = validateAge(date);

  //   if (!isAgeValid) {
  //     return alert("You must be at least 18 years old to register.");
  //   }

  //   if (!timesPerWeek) {
  //     return alert("Please select running frequency per week");
  //   }

  //   if (!estimated5k) {
  //     return alert("Please select estimated 5k time");
  //   }

  //   if (!estimated10k) {
  //     return alert("Please select estimated 10k time");
  //   }
  //   const formattedDate = `${date.getFullYear()}-${
  //     date.getMonth() + 1
  //   }-${date.getDate()}`;
  //   const userProfileData = {
  //     date_of_birth: formattedDate,
  //     run_frequency: timesPerWeek,
  //     estimated5k: estimated5k,
  //     estimated10k: estimated10k,
  //     userId: idForProfile,
  //     email: email,
  //     password: password,
  //   };

  //   // createUserProfile(userProfileData);
  //   navigation.navigate("ProfilePhoto");
  // };

  // const handleTPWBtnClick = (buttonValue) => {
  //   setTimesPerWeek(buttonValue);
  // };

  // const handle5kBtnClick = (buttonValue) => {
  //   setEstimated5k(buttonValue);
  // };

  // const handle10BtnClick = (buttonValue) => {
  //   setEstimated10k(buttonValue);
  // };

  // const validateAge = (userAge) => {
  //   const currentYear = new Date().getFullYear();
  //   const currentMonth = new Date().getMonth() + 1;
  //   const userBirthYear = new Date(userAge).getFullYear();
  //   const userBirthMonth = new Date(userAge).getMonth() + 1;

  //   // Not accounting for days

  //   if (currentYear - userBirthYear < 18) {
  //     return false;
  //   } else if (currentYear - userBirthYear === 18) {
  //     if (currentMonth - userBirthMonth < 0) {
  //       return false;
  //     }
  //     return true;
  //   } else {
  //     return true;
  //   }
  // };

  return (
    <SafeAreaView style={styles.root}>
      {/*  Title */}

      <View style={styles.title}>
        <Text style={styles.titleText}>Tell us about yourself!</Text>
      </View>

      {/* Input Fields */}

      <View style={styles.inputs}>
        {/* Age Date Picker */}

        <View style={styles.dobHeader}>
          <Text>Date of birth</Text>
        </View>
        <View style={styles.datePickerContainer}>
          <DatePicker
            setDate={setDate}
            date={date}
            submitted={submitted}
            category="date"
            isInRegisterForm={true}
            overWriteWidth={350}
          />
        </View>

        {/* Times per week buttons*/}
        <View style={styles.timesPerWeekBtnHeader}>
          <Text>How many times a week do you usually run?</Text>
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
            <Text>1-2</Text>
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
            <Text>2-3</Text>
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
            <Text>3-5</Text>
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
            <Text>5+</Text>
          </Button>
        </View>

        {/* Pace 5km */}

        <View style={styles.estimate5kHeader}>
          <Text>How long does it take you to run a 5km? (estimate)</Text>
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
            <Text style={{ textTransform: "lowercase", fontSize: 12 }}>
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
            <Text style={{ textTransform: "lowercase", fontSize: 12 }}>
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
            <Text style={{ textTransform: "lowercase", fontSize: 12 }}>
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
            <Text style={{ textTransform: "lowercase", fontSize: 12 }}>
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
            <Text style={{ textTransform: "lowercase", fontSize: 12 }}>
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
              style={{ textTransform: "lowercase", fontSize: 12 }}
            >{`>40 mins`}</Text>
          </Button>
        </View>
        {/* Pace 10km */}

        <View style={styles.estimate10kHeader}>
          <Text>How long does it take you to run a 10km? (estimate)</Text>
        </View>
        <View style={styles.estimatedKmBtnWrapper}>
          <Button
            onPress={() => handle10BtnClick("40-45 mins")}
            mode={estimated10k === "40-45 mins" ? "contained" : "outlined"}
            style={[
              styles.estimatedKmBtns,
              estimated10k === "40-45 mins"
                ? styles.btnSelected
                : styles.btnNotSelected,
            ]}
          >
            <Text style={{ textTransform: "lowercase", fontSize: 12 }}>
              40-45 mins
            </Text>
          </Button>
          <Button
            onPress={() => handle10BtnClick("45-50 mins")}
            mode={estimated10k === "45-50 mins" ? "contained" : "outlined"}
            style={[
              styles.estimatedKmBtns,
              estimated10k === "45-50 mins"
                ? styles.btnSelected
                : styles.btnNotSelected,
            ]}
          >
            <Text style={{ textTransform: "lowercase", fontSize: 12 }}>
              45-50 mins
            </Text>
          </Button>
          <Button
            onPress={() => handle10BtnClick("50-55 mins")}
            mode={estimated10k === "50-55 mins" ? "contained" : "outlined"}
            style={[
              styles.estimatedKmBtns,
              estimated10k === "50-55 mins"
                ? styles.btnSelected
                : styles.btnNotSelected,
            ]}
          >
            <Text style={{ textTransform: "lowercase", fontSize: 12 }}>
              50-55 mins
            </Text>
          </Button>
          <Button
            onPress={() => handle10BtnClick("55-60 mins")}
            mode={estimated10k === "55-60 mins" ? "contained" : "outlined"}
            style={[
              styles.estimatedKmBtns,
              estimated10k === "55-60 mins"
                ? styles.btnSelected
                : styles.btnNotSelected,
            ]}
          >
            <Text style={{ textTransform: "lowercase", fontSize: 12 }}>
              55-60 mins
            </Text>
          </Button>
          <Button
            onPress={() => handle10BtnClick("60-65 mins")}
            mode={estimated10k === "60-65 mins" ? "contained" : "outlined"}
            style={[
              styles.estimatedKmBtns,
              estimated10k === "60-65 mins"
                ? styles.btnSelected
                : styles.btnNotSelected,
            ]}
          >
            <Text style={{ textTransform: "lowercase", fontSize: 12 }}>
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
              style={{ textTransform: "lowercase", fontSize: 12 }}
            >{`>65 mins`}</Text>
          </Button>
        </View>
      </View>

      {/* Continue Button */}

      <View style={styles.button}>
        {/* Original implementation for reference */}
        {/* <Button
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
          onPress={() => handlePress()}
        >
          Add Info
        </Button> */}

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
          onPress={() => handlePress()}
        >
          Next
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default RegisterExtraInfo;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Color.White,
  },
  title: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  inputs: {
    alignItems: "center",
  },
  button: {
    width: "75%",
    borderRadius: 10,
    alignSelf: "center",
    marginVertical: 20,
  },
  input: {
    width: "90%",
    marginVertical: 20,
  },
  titleText: {
    fontSize: 28,
    fontWeight: "700",
    letterSpacing: 0.36,
  },
  datePickerContainer: {
    marginBottom: 20,
  },
  dobHeader: { marginBottom: 10, alignSelf: "flex-start", marginLeft: 20 },
  timesPerWeekBtnHeader: {
    marginBottom: 20,
    alignSelf: "flex-start",
    marginLeft: 20,
  },
  estimate5kHeader: {
    marginBottom: 20,
    alignSelf: "flex-start",
    marginLeft: 20,
  },
  estimate10kHeader: {
    marginBottom: 20,
    alignSelf: "flex-start",
    marginLeft: 20,
  },
  timesPerWeekBtnWrapper: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "center",
    marginLeft: 10,
  },
  estimatedKmBtnWrapper: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "center",
    marginLeft: 10,
  },
  timesPerWeekBtns: {
    borderRadius: 20,
    width: 80,
    marginRight: 10,
    marginBottom: 10,
  },
  estimatedKmBtns: {
    borderRadius: 20,
    width: 112,
    marginRight: 10,
    marginBottom: 10,
  },
  btnSelected: {
    backgroundColor: Color.PrimaryMedium,
  },
  btnNotSelected: {
    backgroundColor: "transparent",
  },
});
