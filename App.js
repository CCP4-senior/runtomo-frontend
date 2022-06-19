import React from "react";
import { AuthProvider } from "./context/authcontext/AuthContext";
import { DataProvider } from "./context/datacontext/DataContext";
import AppNavContainer from "./navigations/AppNavContainer";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#CDCDCD",
    accent: "#ff3131",
    text: "#4E4B66",
    placeholder: "#4E4B66",
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <DataProvider>
          <AppNavContainer />
        </DataProvider>
      </AuthProvider>
    </PaperProvider>
  );
}
