import React, { useState } from "react";
import { View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";
import CustomInput from "../../components/CustomInput.js";

const DatePicker = ({ setTime, time, submitted }) => {
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
      <CustomInput
        placeholder="Time"
        onFocus={showDatePicker}
        value={time ? format(new Date(time), "p") : ""}
        width={160}
        submitted={submitted}
        icon="clock-outline"
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
