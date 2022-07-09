import React, { useState, createContext, useContext, useEffect } from "react";
import axiosInstance from "../../helpers/axios";
import { AuthContext } from "../authcontext/AuthContext";
import { getStorage, ref } from "firebase/storage";
import firebaseConfig from "../../firebase.js";
import { initializeApp } from "firebase/app";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const { user, setUser } = useContext(AuthContext);
  const [allEvents, setAllEvents] = useState([]);
  const [createdEvents, setCreatedEvents] = useState([]);
  const [eventId, setEventId] = useState("");
  const [currentEvent, setCurrentEvent] = useState("");
  const [filteredEvents, setFilteredEvents] = useState(null);
  const [isDataFiltered, setIsDataFiltered] = useState(false);
  const [tokyoWards, setTokyoWards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [sortingCondition, setSortingCondition] = useState("standard");
  const [isSortingResetInHomePage, setIsSortingResetInHomePage] =
    useState(false);

  const generateImageUrl = (ref) => {
    return `https://firebasestorage.googleapis.com/v0/b/senior-project-8ca2b.appspot.com/o/${encodeURIComponent(
      ref
    )}?alt=media`;
  };

  useEffect(() => {
    initializeApp(firebaseConfig);
    getWards();
  }, []);

  const getWards = async () => {
    const response = await axiosInstance("/wards");
    const tokyo23wardsData = response.data;
    setTokyoWards(tokyo23wardsData);
  };

  const getUser = async (id) => {
    try {
      const response = await axiosInstance(`/users/${id}/`);
      setCurrentUser(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const setUserData = async (userId) => {
    try {
      const response = await axiosInstance(`/users/${userId}/`);
      setUser({
        ...response.data,
        imageUrl: response.data.image
          ? generateImageUrl(response.data.image)
          : null,
      });
    } catch (e) {
      alert("Something went wrong with setUserData. Please try again!");
      console.log(e);
    }
  };

  const downloadImage = async (imageRef) => {
    const storage = getStorage();
    const pathReference = ref(storage, imageRef);
    const url = await getDownloadURL(pathReference);
    return url;
  };

  const getAllEventsData = async () => {
    try {
      const response = await axiosInstance("/events/");
      const data = response.data;
      const dataWithImage = [];
      for (let i = 0; i < data.length; i++) {
        let imageUrl;
        if (data[i].image) {
          imageUrl = generateImageUrl(data[i].image);
        }
        const event = { ...data[i], imageUrl };
        dataWithImage.push(event);
      }
      setAllEvents(dataWithImage);
    } catch (e) {
      alert("Something went wrong with getAllEventsData. Please try again");
      console.log(e);
    }
  };

  const getCurrentEventData = async (eventId) => {
    try {
      const response = await axiosInstance(`/events/${eventId}/`);
      const data = response.data;
      let imageUrl;
      if (data.image) {
        imageUrl = await downloadImage(data.image);
      }
      const currentEvent = { ...data, imageUrl };
      setCurrentEvent(currentEvent);
    } catch (e) {
      alert("Something went wrong with getCurrentEventData. Please try again");
      console.log(e);
    }
  };

  const contextData = {
    allEvents,
    createdEvents,
    currentEvent,
    setCurrentEvent,
    eventId,
    setEventId,
    getAllEventsData,
    getCurrentEventData,
    setFilteredEvents,
    filteredEvents,
    isDataFiltered,
    setIsDataFiltered,
    setUserData,
    tokyoWards,
    getUser,
    currentUser,
    generateImageUrl,
    sortingCondition,
    setSortingCondition,
    isSortingResetInHomePage,
    setIsSortingResetInHomePage,
  };

  return (
    <DataContext.Provider value={contextData}>{children}</DataContext.Provider>
  );
};

export { DataContext, DataProvider };
