import React from "react";
import { Button } from "react-native-paper";

const LongButton = ({ buttonHandler, buttonColor, buttonText }) => {
  return (
    <Button
      mode="contained"
      uppercase={false}
      color={buttonColor}
      style={{
        borderRadius: 25,
        width: 325,
        height: 55,
        marginTop: 20,
      }}
      labelStyle={{
        fontWeight: "bold",
        fontSize: 20,
      }}
      contentStyle={{
        padding: 7,
      }}
      onPress={buttonHandler}
    >
      {buttonText}
    </Button>
  );
};

export default LongButton;
