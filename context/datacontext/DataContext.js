import React, { useState, useEffect, createContext } from "react";
import * as SecureStore from "expo-secure-store";
import axiosInstance from "../../axios/axios";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [allEvents, setAllEvents] = useState([]);
  const [createdEvents, setCreatedEvents] = useState([]);
  const [joinedEvents, setJoinedEvents] = useState([]);

  useEffect(() => {
    getAllEventsData();
    getCreatedEventsData();
  }, []);

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
      alert("Something went wrong. Please try again");
    }
  };
  const getCreatedEventsData = async () => {
    try {
      const response = await axiosInstance("/events/user/2/events/");
      const data = response.data;
      const paddedData = data.map(paddData); // To be removed
      setCreatedEvents(paddedData); // To be changed to just data
    } catch (e) {
      alert("Something went wrong. Please try again");
    }
  };

  const contextData = {
    allEvents,
    createdEvents,
  };

  return (
    <DataContext.Provider value={contextData}>{children}</DataContext.Provider>
  );
};

export { DataContext, DataProvider };
