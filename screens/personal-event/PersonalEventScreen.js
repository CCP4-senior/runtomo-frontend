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
import LoadingSpinner from "../../components/LoadingSpinner.js";
import { set } from "date-fns";

const PersonalEventScreen = ({ navigation }) => {
  const { setCurrentEvent, allEvents } = useContext(DataContext);
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      setSessions().then((value) => {
        setIsLoading(false);
      });

      handleFilter(status);
    }
  }, []);

  useEffect(() => {
    handleFilter(status);
  }, [mySessions]);

  const setSessions = async () => {
    const userCreatedSessions = [];
    const userJoinedSessions = [];

    allEvents.forEach((event) => {
      if (event.creator.id === user.id) {
        userCreatedSessions.push(event);
      }
      if (
        event.participants.some((participant) => participant.id === user.id)
      ) {
        userJoinedSessions.push(event);
      }
    });

    const userAllSessions = [...userCreatedSessions, ...userJoinedSessions];

    setAllUserSessions(userAllSessions);
    setAllUserCreatedSessions(userCreatedSessions);
    setAllUserJoinedSessions(userJoinedSessions);
    /*Initial load*/
    setMySessions(userAllSessions);
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

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.listTab}>
        {listTab.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.btnTab]}
            onPress={() => handleFilter(tab.status)}
          >
            <Text
              style={[
                styles.textTab,
                tab.status === status && styles.activeText,
              ]}
            >
              {tab.status}
            </Text>
            <View
              style={[tab.status === status && styles.textTabUnderline]}
            ></View>
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
    backgroundColor: "#E5E5E5",
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
    paddingTop: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: Color.White,
  },
  btnTab: {
    padding: 10,
    width: 110,
  },
  textTab: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 15,
  },
  textTabUnderline: {
    marginTop: 10,
    backgroundColor: Color.PrimaryMain,
    height: 2,
  },
  activeText: {
    color: Color.PrimaryMain,
  },
});
