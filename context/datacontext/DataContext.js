import React, { useState, createContext, useContext } from "react";
import axiosInstance from "../../axios/axios";
import { AuthContext } from "../authcontext/AuthContext";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [allEvents, setAllEvents] = useState([]);
  const [createdEvents, setCreatedEvents] = useState([]);
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [eventId, setEventId] = useState("");
  const [currentEvent, setCurrentEvent] = useState("");
  const [filteredEvents, setFilteredEvents] = useState(null);
  const [isDataFiltered, setIsDataFiltered] = useState(false);

  //   Following paddData function is added for data consistency. Will be deleted once backend data is set
  const paddData = (el) => {
    const randomWard = Math.floor(Math.random() * 2);
    return {
      id: el.id,
      title: el.title,
      ward: randomWard === 0 ? "Shibuya" : "Meguro",
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
      console.log(e);
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
      alert("Something went wrong. Please try again");
      console.log(e);
    }
  };

  const getCurrentEventData = async () => {
    try {
      const response = await axiosInstance(`/events/${eventId}/`);
      const data = response.data;
      console.log(data);
      const paddedData = paddData(data); // To be removed
      setCurrentEvent(paddedData); // To be changed to just "data"
    } catch (e) {
      alert("Something went wrong. Please try again");
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
    getCreatedEventsData,
    getCurrentEventData,
    setFilteredEvents,
    filteredEvents,
    isDataFiltered,
    setIsDataFiltered,
  };

  return (
    <DataContext.Provider value={contextData}>{children}</DataContext.Provider>
  );
};

export { DataContext, DataProvider };
