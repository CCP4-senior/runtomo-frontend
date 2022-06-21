import React, { useEffect } from "react";
import { AuthProvider } from "./context/authcontext/AuthContext";
import { DataProvider } from "./context/datacontext/DataContext";
import AppNavContainer from "./navigations/AppNavContainer";
// import { getStorage, ref, uploadString } from "firebase/storage";
// import firebaseConfig from "./firebase";
// import { initializeApp } from "firebase/app";

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <AppNavContainer />
      </DataProvider>
    </AuthProvider>
  );
}
