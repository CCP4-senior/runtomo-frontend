import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Keyboard } from "react-native";
import { IconButton, List } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format, addHours } from "date-fns";
import CustomInput from "../../components/CustomInput.js";
import Color from "../../assets/themes/Color.js";

const DatePicker = ({
  setDate,
  date,
  time,
  setTime,
  submitted,
  category,
  isInRegisterForm,
  overWriteWidth,
  inputRef,
  isUTCdata,
  setIsUTCdata,
}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    category === "date"
      ? date
        ? isUTCdata
          ? addHours(new Date(date), 9)
          : new Date(date)
        : new Date()
      : time
      ? isUTCdata
        ? addHours(new Date(time), 9)
        : new Date(time)
      : new Date()
  );

  const showDatePicker = () => {
    setDatePickerVisibility(true);
    Keyboard.dismiss();
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (data) => {
    category === "date" ? setDate(data) : setTime(data);
    hideDatePicker();
    const displayedDate = isUTCdata
      ? addHours(new Date(data), 9)
      : new Date(data);
    console.log(displayedDate);
    setSelectedDate(displayedDate);
    if (setIsUTCdata) {
      setIsUTCdata(false);
    }
  };

  return (
    <>
      {isInRegisterForm === true ? (
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
            inRegisterForm={isInRegisterForm}
          />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode={category === "date" ? "date" : "time"}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            date={selectedDate}
          />
        </View>
      ) : (
        <View style={styles.datePickerContainer}>
          <TouchableOpacity onPress={showDatePicker}>
            <List.Item
              style={styles.mockInput}
              title={
                category === "date"
                  ? date === ""
                    ? "Date"
                    : isUTCdata
                    ? format(addHours(new Date(date), 9), "MMM d, yyy")
                    : format(new Date(date), "MMM d, yyy")
                  : time === ""
                  ? "Time"
                  : isUTCdata
                  ? format(addHours(new Date(time), 9), "p")
                  : format(new Date(time), "p")
              }
              titleStyle={
                category === "date"
                  ? date === ""
                    ? styles.titlePlaceholder
                    : styles.titleStyle
                  : time === ""
                  ? styles.titlePlaceholder
                  : styles.titleStyle
              }
              right={(props) => (
                <List.Icon
                  {...props}
                  icon={
                    category === "date" ? "calendar-month" : "clock-outline"
                  }
                  color={Color.Text}
                />
              )}
            />
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode={category === "date" ? "date" : "time"}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            date={selectedDate}
          />
        </View>
      )}
    </>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  datePickerContainer: {
    width: "48%",
  },
  mockInput: {
    borderRadius: 25,
    width: "100%",
    height: 53,
    marginTop: 8,
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    alignItems: "center",
    overflow: "visible",
  },
  titlePlaceholder: {
    color: Color.Text,
  },
});
