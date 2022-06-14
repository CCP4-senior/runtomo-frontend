import React, { useState } from "react";
import {
  Button,
  View,
  //   TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { TextInput } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Colors from "../../styles/colors.js";

const DatePicker = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    hideDatePicker();
  };

  return (
    <View>
      <TextInput
        mode="outlined"
        outlineColor="#fff"
        theme={{ roundness: 25 }}
        style={{ backgroundColor: "#fff", width: 160 }}
        placeholder="Date"
        onFocus={showDatePicker}
        right={<TextInput.Icon name="clock-outline" color={Colors.text} />}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  input: {
    width: 160,
    height: 50,
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    fontSize: 16,
    marginBottom: 25,
    // marginHorizontal: 10,
  },
});
