import React from "react";
import { TextInput } from "react-native-paper";
// import Colors from "../assets/styles/colors";
import Color from "../assets/themes/Color.js";

const CustomInput = ({
  placeholder,
  onFocus,
  width,
  icon,
  value,
  changeHandler,
  submitted,
}) => {
  return (
    <TextInput
      mode="outlined"
      outlineColor={!submitted ? "#fff" : value ? "#fff" : "red"}
      activeOutlineColor={
        !submitted
          ? Colors.secondaryColor
          : value
          ? Colors.secondaryColor
          : "red"
      }
      theme={{
        roundness: 25,
        colors: {
          placeholder: !submitted
            ? Colors.text
            : value
            ? Colors.secondaryColor
            : "red",
        },
      }}
      style={{ backgroundColor: "#fff", width: width || 335 }}
      value={value}
      onChangeText={changeHandler}
      onFocus={onFocus}
      placeholder={
        !submitted
          ? placeholder
          : value
          ? placeholder
          : `${placeholder} Required`
      }
      right={<TextInput.Icon name={icon ? icon : ""} color={Colors.text} />}
    />
  );
};

export default CustomInput;
