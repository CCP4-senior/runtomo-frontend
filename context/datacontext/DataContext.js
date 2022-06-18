import React, { useState, useEffect, createContext } from "react";
import * as SecureStore from "expo-secure-store";
import axiosInstance from "../../axios/axios";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [allEvents, setAllEvents] = useState([]);
  const [createdEvents, setCreatedEvents] = useState([]);
  const [joinedEvents, setJoinedEvents] = useState([]);
  const getAllEventsData = async () => {
    try {
      const response = await axiosInstance("/events/");
      const data = response.data;
      //   Following map function will be deleted once backend data is set

      const paddedData = data.map((el) => {
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
      });
      setAllEvents(paddedData); // To be changed to just data
    } catch (e) {
      alert("Something went wrong. Please try again");
    }
  };

  useEffect(() => {
    getAllEventsData();
  }, []);

  const contextData = {
    allEvents,
  };

  return (
    <DataContext.Provider value={contextData}>{children}</DataContext.Provider>
  );
};

export { DataContext, DataProvider };
