import React, { useState } from "react";
import { View } from "react-native";
import { TextInput } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";
import Colors from "../../assets/styles/colors.js";

const DatePicker = ({ setDate, date }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDate(date);
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
        placeholder="Date"
        onFocus={showDatePicker}
        right={<TextInput.Icon name="calendar-month" color={Colors.text} />}
        value={date ? format(new Date(date), "MMM d, yyyy") : ""}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default DatePicker;
