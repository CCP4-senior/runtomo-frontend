import React from "react";
import { Button } from "react-native-paper";

const LongButton = ({
  buttonHandler,
  buttonColor,
  buttonText,
  buttonTextColor,
  mode,
  customStyle,
}) => {
  return (
    <Button
      mode={mode || "contained"}
      uppercase={false}
      color={buttonColor}
      style={{
        borderRadius: 25,
        width: "90%",
        height: 48,
        marginVertical: 5,
        alignSelf: "center",
        ...customStyle,
      }}
      labelStyle={{
        fontWeight: "600",
        fontSize: 16,
        color: buttonTextColor || "#fff",
        letterSpacing: 0.5,
      }}
      contentStyle={{
        paddingVertical: 5,
      }}
      onPress={buttonHandler}
    >
      {buttonText}
    </Button>
  );
};

export default LongButton;
