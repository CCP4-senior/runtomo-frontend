import React, { useState, useEffect } from "react";
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

const PersonalEventScreen = ({ navigation, data }) => {
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

  useEffect(() => {
    if (currentUser) {
      handleFilter(status);
    }
  }, []);

  const handleFilter = (status) => {
    setStatus(status);

    const userSessions = data.filter((session) => {
      switch (status) {
        case "Created":
          if (session.owner_id === 2) {
            return session;
          }
          break;
        case "Joined":
          if (session.participants.includes(2)) {
            return session;
          }
          break;
        default:
          if (session.owner_id === 2 || session.participants.includes(2)) {
            return session;
          }
          break;
      }
    });
    setMySessions(userSessions);
  };

  const selectEvent = (eventData) => {
    navigation.navigate("Event Details", {
      eventData: eventData,
    });
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
