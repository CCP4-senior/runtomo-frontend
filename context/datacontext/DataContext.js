import React, { useState, createContext, useContext, useEffect } from "react";
import axiosInstance from "../../helpers/axios";
import { AuthContext } from "../authcontext/AuthContext";
import { getStorage, ref } from "firebase/storage";
import firebaseConfig from "../../firebase.js";
import firebase from "firebase/app";
import { initializeApp } from "firebase/app";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const { user, setUser } = useContext(AuthContext);
  const [allEvents, setAllEvents] = useState([]);
  const [createdEvents, setCreatedEvents] = useState([]);
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [userEvents, setUserEvents] = useState([]);
  const [eventId, setEventId] = useState("");
  const [currentEvent, setCurrentEvent] = useState("");
  const [filteredEvents, setFilteredEvents] = useState(null);
  const [isDataFiltered, setIsDataFiltered] = useState(false);
  const [tokyoWards, setTokyoWards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [sortingCondition, setSortingCondition] = useState("standard");

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

  //   Following paddData function is added for data consistency. Will be deleted once backend data is set
  const paddData = (el) => {
    const randomWard = Math.floor(Math.random() * 2);
    return {
      id: el.id,
      title: el.title,
      location: el.location || "2-1 Yoyogikamizonocho, Shibuya, Tokyo 151-0052",
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
      description:
        "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.",
    };
  };
  const setUserData = async (userId) => {
    // The mockdata is to be removed
    const mockData = {
      username: "wadeRunner",
      email: "wade@example.com",
      age: "34",
      runnerType: ["beginner", "social"],
    };
    try {
      const response = await axiosInstance(`/users/${userId}/`);
      console.log(response.data);

      setUser({
        ...response.data,
        imageUrl: response.data.profile.image
          ? generateImageUrl(response.data.profile.image)
          : null,
      });
    } catch (e) {
      alert("Something went wrong. Please try again!");
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
      alert("Something went wrong. Please try again");
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
  };

  return (
    <DataContext.Provider value={contextData}>{children}</DataContext.Provider>
  );
};

export { DataContext, DataProvider };
