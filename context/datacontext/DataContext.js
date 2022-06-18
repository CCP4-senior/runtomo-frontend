import React, { useState, useEffect, createContext } from "react";
import * as SecureStore from "expo-secure-store";
import axiosInstance from "../../axios/axios";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [allEvents, setAllEvents] = useState([]);
  const [createdEvents, setCreatedEvents] = useState([]);
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [eventId, setEventId] = useState("");
  const [currentEvent, setCurrentEvent] = useState("");

  useEffect(() => {
    getAllEventsData();
    getCreatedEventsData();
  }, []);
  //   useEffect(() => {
  //     if (eventId) getCurrentEventData();
  //   }, [eventId]);

  //   Following paddData function is added for data consistency. Will be deleted once backend data is set
  const paddData = (el) => {
    return {
      id: el.id,
      title: el.title,
      ward: "Shibuya",
      date: "2022-09-15T12:03:55.300Z",
      time: "2022-09-15T12:03:55.300Z",
      image: require("../../assets/images/demo/yoyogipark.jpeg"),
      user: {
        id: 2,
        username: "wade",
        age: 34,
        image: require("../../assets/images/demo/wade.png"),
      },
      participants: [],
      owner_id: 2,
      hasJoined: true,
    };
  };

  const getAllEventsData = async () => {
    try {
      const response = await axiosInstance("/events/");
      const data = response.data;
      const paddedData = data.map(paddData); // To be removed
      setAllEvents(paddedData); // To be changed to just data
    } catch (e) {
      alert(
        "From DataContext getAllEventsData, Something went wrong. Please try again"
      );
    }
  };

  const getCreatedEventsData = async () => {
    try {
      const userId = 2; // To be removed and replaced with actual user id
      const response = await axiosInstance(`/events/user/${userId}/events/`);
      const data = response.data;
      const paddedData = data.map(paddData); // To be removed
      setCreatedEvents(paddedData); // To be changed to just "data"
    } catch (e) {
      alert(
        "From DataContext getCreatedEventsData, Something went wrong. Please try again"
      );
    }
  };

  const getCurrentEventData = async () => {
    console.log("GetCurrentEventData ran!");
    console.log(eventId);
    try {
      const response = await axiosInstance(`/events/${eventId}/`);
      const data = response.data;
      console.log(data);
      const paddedData = paddData(data); // To be removed
      setCurrentEvent(paddedData); // To be changed to just "data"
    } catch (e) {
      alert(
        "From DataContext getCurrentEventData, Something went wrong. Please try again"
      );
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
    getCurrentEventData,
  };

  return (
    <DataContext.Provider value={contextData}>{children}</DataContext.Provider>
  );
};

export { DataContext, DataProvider };
