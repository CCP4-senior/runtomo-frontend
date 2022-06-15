import React, { useState } from "react";
import { View } from "react-native";
import { TextInput } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";
import CustomInput from "../../components/CustomInput.js";

const DatePicker = ({ setDate, date, errors, control, submitted }) => {
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
      <CustomInput
        placeholder="Date"
        icon="calendar-month"
        onFocus={showDatePicker}
        value={date ? format(new Date(date), "MMM d, yyyy") : ""}
        width={160}
        submitted={submitted}
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
