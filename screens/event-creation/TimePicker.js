import React, { useState } from "react";
import { View } from "react-native";
import { TextInput } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Colors from "../../assets/styles/colors.js";
import { format } from "date-fns";

const DatePicker = ({ setTime, time }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setTime(date);
    hideDatePicker();
  };

  return (
    <View>
      <TextInput
        mode="outlined"
        outlineColor="#fff"
        activeOutlineColor={Colors.secondaryColor}
        theme={{ roundness: 25 }}
        style={{ backgroundColor: "#fff", width: 160 }}
        placeholder="Time"
        onFocus={showDatePicker}
        right={<TextInput.Icon name="clock-outline" color={Colors.text} />}
        value={time ? format(new Date(time), "p") : ""}
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
