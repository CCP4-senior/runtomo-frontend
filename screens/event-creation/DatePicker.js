import React, { useState } from "react";
import { View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";
import CustomInput from "../../components/CustomInput.js";

const DatePicker = ({
  setDate,
  date,
  time,
  setTime,
  submitted,
  category,
  inRegisterForm,
  overWriteWidth,
  inputRef,
}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (data) => {
    category === "date" ? setDate(data) : setTime(data);
    hideDatePicker();
  };

  return (
    <View>
      <CustomInput
        placeholder={category === "date" ? "Date" : "Time"}
        icon={category === "date" ? "calendar-month" : "clock-outline"}
        onFocus={showDatePicker}
        value={
          date || time
            ? category === "date"
              ? format(new Date(date), "MMM d, yyyy")
              : format(new Date(time), "p")
            : ""
        }
        width={overWriteWidth ? overWriteWidth : 160}
        submitted={submitted}
        inputRef={inputRef}
        inRegisterForm={inRegisterForm}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode={category === "date" ? "date" : "time"}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default DatePicker;
