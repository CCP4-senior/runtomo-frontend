import React, { useState, useEffect, useContext } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";
import Color from "../../assets/themes/Color.js";
import EventCard from "../../components/EventCard.js";
import { DataContext } from "../../context/datacontext/DataContext.js";
import { AuthContext } from "../../context/authcontext/AuthContext.js";
import axiosInstance from "../../helpers/axios.js";
import LoadingSpinner from "../../components/LoadingSpinner.js";

const PersonalEventScreen = ({ navigation }) => {
  const {
    createdEvents,
    setCurrentEvent,
    allEvents,
    setCreatedEvents,
    setJoinedEvents,
    joinedEvents,
    userEvents,
    setUserEvents,
  } = useContext(DataContext);
  const { user } = useContext(AuthContext);
  const listTab = [
    {
      status: "All",
    },
    {
      status: "Created",
    },
    {
      status: "Joined",
    },
  ];

  const [mySessions, setMySessions] = useState([]);
  const [currentUser, setCurrentUser] = useState({ id: 2 });
  const [status, setStatus] = useState("All");

  const [allUserSessions, setAllUserSessions] = useState([]);
  const [allUserCreatedSessions, setAllUserCreatedSessions] = useState([]);
  const [allUserJoinedSessions, setAllUserJoinedSessions] = useState([]);

  useEffect(() => {
    if (currentUser) {
      setSessions();
      handleFilter(status);
    }
  }, []);

  const setSessions = async () => {
    const userCreatedSessions = [];
    const idsForEventUsersRequest = [];

    allEvents.forEach((event) => {
      if (event.creator.id === user.id) {
        userCreatedSessions.push(event);
      }
      idsForEventUsersRequest.push(event.id);
      // Implement logic for participating events
    });
    // handle Joined sessions
    const userJoinedSessions = await handleJoinedSessions(
      idsForEventUsersRequest
    );

    const userAllSessions = [...userCreatedSessions, ...userJoinedSessions];

    setAllUserSessions(userAllSessions);
    setAllUserCreatedSessions(userCreatedSessions);
    setAllUserJoinedSessions(userJoinedSessions);
    /*Initial load*/
    setMySessions(userAllSessions);
  };

  const handleJoinedSessions = async (idArray) => {
    const idOfEventsJoined = [];
    for (const id of idArray) {
      try {
        const response = await axiosInstance(`/event_users/${id}/`);
        const data = response.data;
        if (data.length > 0) {
          for (const eventDetail of data) {
            if (eventDetail.user === user.id) {
              idOfEventsJoined.push(id);
              break;
            }
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    }

    const result = allEvents.filter((event) => {
      return idOfEventsJoined.includes(event.id);
    });

    return result;
  };

  const handleFilter = (status) => {
    switch (status) {
      case "Created":
        setMySessions(allUserCreatedSessions);
        setStatus(status);
        break;
      case "Joined":
        setMySessions(allUserJoinedSessions);
        setStatus(status);
        break;
      default:
        setMySessions(allUserSessions);
        setStatus(status);
        break;
    }
  };

  const selectEvent = (eventData) => {
    setCurrentEvent(eventData);
    navigation.navigate("Event Details");
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.listTab}>
        {listTab.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.btnTab, tab.status === status && styles.btnActive]}
            onPress={() => handleFilter(tab.status)}
          >
            <Text style={styles.textTab}>{tab.status}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.container}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.eventCardWrapper}>
            {mySessions.map((session, id) => {
              return (
                <EventCard
                  isHomePageCard={true}
                  style={styles.eventCard}
                  handlePress={() => selectEvent(session)}
                  key={id}
                  event={session}
                  image={session.image}
                />
              );
            })}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default PersonalEventScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.White,
    padding: 10,
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  titleStyle: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
  },
  textStyle: {
    fontSize: 16,
    textAlign: "center",
    padding: 10,
  },
  touchableOpacityStyle: {
    position: "absolute",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    right: 30,
    bottom: 30,
  },
  eventCardWrapper: {
    alignItems: "center",
    paddingHorizontal: 10,
  },
  listTab: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: Color.GrayMedium,
  },
  btnTab: {
    padding: 10,
    width: 110,
  },
  btnActive: {
    backgroundColor: Color.GrayDark,
  },
  textTab: {
    textAlign: "center",
    fontWeight: "500",
  },
});
