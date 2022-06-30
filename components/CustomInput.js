import React from "react";
import { TextInput } from "react-native-paper";
import Color from "../assets/themes/Color";

const CustomInput = ({
  placeholder,
  onFocus,
  width,
  icon,
  value,
  changeHandler,
  submitted,
  inputRef,
  inRegisterForm,
}) => {
  return (
    <TextInput
      mode="outlined"
      outlineColor={!submitted ? "#fff" : value ? "#fff" : Color.PrimaryMain}
      activeOutlineColor={
        !submitted
          ? Color.GrayDark
          : value
          ? Color.GrayLight
          : Color.PrimaryMain
      }
      theme={{
        roundness: 25,
        colors: {
          placeholder: !submitted
            ? Color.Text
            : value
            ? Color.Text
            : Color.PrimaryMain,
        },
      }}
      style={{
        backgroundColor: inRegisterForm ? Color.GrayMedium : "#fff",
        width: width || 335,
      }}
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
      right={<TextInput.Icon name={icon ? icon : ""} color={Color.text} />}
      ref={inputRef}
    />
  );
};

export default CustomInput;
