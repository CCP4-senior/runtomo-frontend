import React from "react";
import { AuthProvider } from "./context/authcontext/AuthContext";
import { DataProvider } from "./context/datacontext/DataContext";
import AppNavContainer from "./navigations/AppNavContainer";
import useCachedResources from "./helpers/useCashedResources";
import Spinner from "./screens/splash/Spinner";

export default function App() {
  const isLoadingComplete = useCachedResources();
  if (!isLoadingComplete) {
    return <Spinner />;
  } else {
    return (
      <AuthProvider>
        <DataProvider>
          <AppNavContainer />
        </DataProvider>
      </AuthProvider>
    );
  }
}
