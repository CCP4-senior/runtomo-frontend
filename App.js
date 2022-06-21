import React from "react";
import { AuthProvider } from "./context/authcontext/AuthContext";
import { DataProvider } from "./context/datacontext/DataContext";
import AppNavContainer from "./navigations/AppNavContainer";

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <AppNavContainer />
      </DataProvider>
    </AuthProvider>
  );
}
