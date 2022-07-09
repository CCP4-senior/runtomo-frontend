import React, { useState, useContext, useEffect, useCallback } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { List } from "react-native-paper";
import Color from "../../assets/themes/Color.js";
import EventCard from "../../components/EventCard.js";
import { AuthContext } from "../../context/authcontext/AuthContext.js";
import { DataContext } from "../../context/datacontext/DataContext.js";
import FilterModal from "./FilterModal.js";
import SortByModal from "./SortByModal.js";
import LoadingSpinner from "../../components/LoadingSpinner.js";

const HomeScreen = ({ navigation, /*data,*/ setCurrEvent }) => {
  const { user } = useContext(AuthContext);

  const {
    allEvents,
    setCurrentEvent,
    setEventId,
    getAllEventsData,
    getCurrentEventData,
    filteredEvents,
    setUserData,
    setFilteredEvents,
    setIsDataFiltered,
    setSortingCondition,
    sortingCondition,
    setIsSortingResetInHomePage,
  } = useContext(DataContext);

  const data = allEvents;
  const [filterModalVisible, setfilterModalVisible] = useState(false);
  const [sortByModalVisible, setSortByModalVisible] = useState(false);
  const [resetFilterInHomeScreen, setResetFilterInHomeScreen] = useState(false);
  const [resetSortingInHomeScreen, setResetSortingInHomeScreen] =
    useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setUserData(user.id);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (user) {
        getAllEventsData().then(() => setIsLoading(false));
      }
    }, [])
  );

  /* modal */
  const hideModal = () => {
    setfilterModalVisible(false);
  };

  const hideSortByModal = () => {
    setSortByModalVisible(false);
  };

  const selectEvent = (event) => {
    setCurrentEvent(event);
    navigation.navigate("Event Details");
  };

  const handleHomeSortingReset = () => {
    setSortingCondition("standard");
    setResetSortingInHomeScreen(true);
    setIsSortingResetInHomePage(true);
  };

  const handleHomeFilterReset = () => {
    setFilteredEvents(null);
    setIsDataFiltered(false);
    setResetFilterInHomeScreen(true);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        {/* Filter  Button */}
        <View>
          <List.Item></List.Item>
        </View>
        <TouchableOpacity onPress={() => setfilterModalVisible(true)}>
          <List.Item
            style={styles.topElementFilter}
            title="Select Area From Tokyo"
            left={(props) => (
              <List.Icon
                {...props}
                icon="map-marker"
                color="#FFFFFF"
                style={styles.topIconTest}
              />
            )}
            right={(props) => (
              <List.Icon
                {...props}
                icon="chevron-down"
                color="#FFFFFF"
                style={styles.topIcon}
              />
            )}
            titleStyle={{
              fontSize: 14,
              fontWeight: "700",
              color: "#FFFFFF",
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setSortByModalVisible(true)}>
          <List.Item
            style={styles.topElementSort}
            right={(props) => (
              <List.Icon
                {...props}
                icon="tune"
                color="#484848"
                style={styles.topIcon}
              />
            )}
            titleStyle={{ fontSize: 12, fontWeight: "700" }}
          />
        </TouchableOpacity>
      </View>
      <View
        style={[
          sortingCondition !== "standard" || filteredEvents
            ? styles.resetFilterSortingContainer
            : null,
        ]}
      >
        {sortingCondition !== "standard" && (
          <View
            style={{
              backgroundColor: Color.GrayDark,
              borderRadius: 10,
              borderWidth: 2,
              borderColor: Color.GrayDark,
              width: 120,
              alignContent: "center",
              alignItems: "center",
              marginRight: 5,
            }}
          >
            <TouchableOpacity onPress={handleHomeSortingReset}>
              <Text>X Reset Sorting</Text>
            </TouchableOpacity>
          </View>
        )}

        {filteredEvents && (
          <View
            style={{
              backgroundColor: Color.GrayDark,
              borderRadius: 10,
              borderWidth: 2,
              borderColor: Color.GrayDark,
              width: 110,
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={handleHomeFilterReset}>
              <Text>X Reset Filter</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={styles.container}>
        <FilterModal
          modalVisible={filterModalVisible}
          hideModal={hideModal}
          resetFilterInHomeScreen={resetFilterInHomeScreen}
          setResetFilterInHomeScreen={setResetFilterInHomeScreen}
        />
        <SortByModal
          modalVisible={sortByModalVisible}
          hideModal={hideSortByModal}
          resetSortingInHomeScreen={resetSortingInHomeScreen}
          setResetSortingInHomeScreen={setResetSortingInHomeScreen}
        />
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <EventsDataPage selectEvent={selectEvent} navigation={navigation} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

// Component for listing Run Events

const EventsDataPage = ({ selectEvent }) => {
  const {
    allEvents,
    filteredEvents,
    isDataFiltered,
    setIsDataFiltered,
    getCurrentEventData,
    setCurrentEvent,
    sortingCondition,
  } = useContext(DataContext);
  const data = allEvents;

  const handleSortingEvents = (events, sortingCondition) => {
    if (sortingCondition === "ascending") {
      const sortedEvents = events.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
      return sortedEvents;
    } else if (sortingCondition === "descending") {
      const sortedEvents = events.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      return sortedEvents;
    } else {
      const sortedEvents = events.sort(
        (a, b) => new Date(b.id) - new Date(a.id)
      );
      return sortedEvents;
    }
  };

  if (isDataFiltered && filteredEvents.length >= 1) {
    const sortedEvents = handleSortingEvents(filteredEvents, sortingCondition);
    return (
      <View style={styles.eventCardWrapper}>
        {sortedEvents.map((session) => {
          return (
            <EventCard
              isHomePageCard={true}
              style={styles.eventCard}
              key={session.id}
              event={session}
              handlePress={() => selectEvent(session)}
              image={session.image}
            />
          );
        })}
      </View>
    );
  } else if (isDataFiltered && filteredEvents.length < 1) {
    return (
      <View style={styles.eventCardWrapper}>
        <Text>No running events available for this location</Text>
      </View>
    );
  } else {
    const sortedEvents = handleSortingEvents(data, sortingCondition);
    return (
      <View style={styles.eventCardWrapper}>
        {sortedEvents.map((session) => {
          return (
            <EventCard
              isHomePageCard={true}
              style={styles.eventCard}
              key={session.id}
              event={session}
              handlePress={() => selectEvent(session)}
              image={session.image}
            />
          );
        })}
      </View>
    );
  }
};

/* Styling */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.Fill,
    padding: 10,
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
  createButton: {
    position: "absolute",
    bottom: 30,
    right: 13,
    borderRadius: 30,
    width: 140,
    height: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4.84,

    elevation: 5,
  },
  searchContainer: {
    height: 70,
    width: "100%",
    backgroundColor: Color.White,
  },
  searchbar: {
    borderRadius: 8,
    backgroundColor: "#F4F6F6",
    height: 40,
    marginHorizontal: 15,
    marginTop: 8,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: 41,
    backgroundColor: "#FFFFFF",
    paddingTop: 10,
    paddingBottom: 55,
  },
  topElementSort: {
    paddingTop: 0,
    marginTop: 6,
    height: 35,
    backgroundColor: "transparent",
    marginRight: 30,
  },
  topElementFilter: {
    paddingTop: 0,
    marginTop: 6,
    width: 270,
    height: 40,
    backgroundColor: "#FF3E0C",
    borderRadius: 30,
    marginLeft: 30,
  },
  topIcon: {
    paddingTop: 0,
    height: 24,
    marginRight: -5,
  },
  topIconTest: {
    padding: 0,
    margin: 0,
  },
});
