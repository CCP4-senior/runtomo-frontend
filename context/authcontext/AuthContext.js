import React, { useState, createContext } from "react";
import jwt_decode from "jwt-decode";
import * as SecureStore from "expo-secure-store";
import axiosInstance from "../../helpers/axios";
import * as RootNavigation from "../../navigations/RootNavigator.js";
import { Alert } from "react-native";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [idForProfile, setIdForProfile] = useState("");

  const createUser = async ({ username, email, password }) => {
    try {
      await axiosInstance.post("/auth/signup/", {
        username: username.trim(),
        email: email.trim(),
        password: password.trim(),
      });

      const response = await axiosInstance.post("/auth/jwt/create/", {
        email: email,
        password: password,
      });
      if (response.status === 200) {
        const data = response.data;
        const userId = jwt_decode(data.access)["user_id"];
        setIdForProfile(userId);
        await SecureStore.setItemAsync(
          "access_token",
          JSON.stringify(data.access)
        );
        await SecureStore.setItemAsync(
          "refresh_token",
          JSON.stringify(data.refresh)
        );
      }
    } catch (e) {
      alert("Something went wrong. Please try again!");
    }
  };

  const createUserProfile = async ({
    date_of_birth,
    run_frequency,
    estimated5k,
    estimated10k,
    userId,
    email,
    password,
  }) => {
    try {
      const body = {
        date_of_birth,
        run_frequency,
        estimated5k,
        estimated10k,
        userId,
      };
      const userProfileResponse = await axiosInstance.post(
        "/users/profile",
        body
      );
      await signInUser({ email, password });
    } catch (e) {
      Alert.alert("Error", e.response.data, [
        {
          text: "OK",
          onPress: () => null,
          style: "cancel",
        },
      ]);
    }
  };

  const signInUser = async ({ email, password }) => {
    try {
      const response = await axiosInstance.post("/auth/jwt/create/", {
        email: email,
        password: password,
      });
      if (response.status === 200) {
        const data = response.data;
        // TODO: user information will be updated dynamically when backend is ready => Done in setUserData in DataContext
        const userId = jwt_decode(data.access)["user_id"];
        setUser({ id: userId });

        await SecureStore.setItemAsync(
          "access_token",
          JSON.stringify(data.access)
        );
        await SecureStore.setItemAsync(
          "refresh_token",
          JSON.stringify(data.refresh)
        );
      }
    } catch (e) {
      Alert.alert("Error", e.response.data.detail, [
        {
          text: "OK",
          onPress: () => null,
          style: "cancel",
        },
      ]);
    }
  };

  const signOutUser = async () => {
    try {
      setUser("");
      await SecureStore.deleteItemAsync("access_token");
      await SecureStore.deleteItemAsync("refresh_token");
      RootNavigation.navigate("AuthSelection", { tokenExpired: true });
    } catch (e) {
      alert("Something went wrong. Please try again!");
    }
  };

  const contextData = {
    createUser,
    user,
    setUser,
    signInUser,
    signOutUser,
    createUserProfile,
    idForProfile,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
