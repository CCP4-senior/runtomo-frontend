import React, { useEffect, useContext } from "react";
import { ActivityIndicator } from "react-native";
import { AuthContext } from "../../context/authcontext/AuthContext";

const SignOutScreen = () => {
  const { signOutUser } = useContext(AuthContext);

  useEffect(() => {
    signOutUser();
  }, []);

  return <ActivityIndicator />;
};

export default SignOutScreen;
