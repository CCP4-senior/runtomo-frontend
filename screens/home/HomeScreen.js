import React, { useState, useContext, useEffect } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { Button, TextInput, List } from "react-native-paper";
import Color from "../../assets/themes/Color.js";
import EventCard from "../../components/EventCard.js";
import { AuthContext } from "../../context/authcontext/AuthContext.js";
import { DataContext } from "../../context/datacontext/DataContext.js";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const HomeScreen = ({ navigation, setData, /*data,*/ setCurrEvent }) => {
  const { user } = useContext(AuthContext);
  const {
    allEvents,
    setCurrentEvent,
    setEventId,
    getAllEventsData,
    getCurrentEventData,
    storage,
  } = useContext(DataContext);
  useEffect(() => {
    if (user) {
      getAllEventsData();
      // downloadImage();
    }
  }, [url]);
  const data = allEvents; // Remove this line when testing with mock data
  const [url, setUrl] = useState("");
  const selectEvent = async (event) => {
    // setCurrEvent(event);
    setCurrentEvent(event);
    navigation.navigate("Event Details");

    // Following code will be used when backend endpoint is ready
    // try {
    //   setEventId(event.id);
    //   await getCurrentEventData();
    //   navigation.navigate("Event Details");
    // } catch (e) {
    //   alert("Something went wrong. Please try again!");
    // }
  };

  const downloadImage = async (ref) => {
    console.log("downloadImage ran");
    const pathReference = ref(storage, ref);
    // `url` is the download URL for 'images/stars.jpg'

    const url = await getDownloadURL(pathReference);
    setUrl(url);
    console.log(url);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          mode="outlined"
          outlineColor="#F4F6F6"
          activeOutlineColor={Color.GrayDark}
          placeholder="Search"
          style={styles.searchbar}
          left={<TextInput.Icon name="magnify" style={{ marginTop: 15 }} />}
          theme={{ roundness: 8 }}
        />
      </View>
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={() => alert("Filters button pressed!")}>
          <List.Item
            style={styles.topElement}
            title="SORT BY"
            right={(props) => <List.Icon {...props} icon="text" />}
            titleStyle={{ fontSize: 14, fontWeight: "700" }}
            onPress={() => alert("Sort by button pressed!")}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert("Filters button pressed!")}>
          <List.Item
            style={styles.topElement}
            title="FILTERS"
            right={(props) => <List.Icon {...props} icon="tune" />}
            titleStyle={{ fontSize: 14, fontWeight: "700" }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          {/* {url !== "" && (
            <Image source={{ uri: url }} style={{ height: 175, width: 200 }} />
          )} */}
          <View style={styles.eventCardWrapper}>
            {data.map((session) => {
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
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

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
  floatingButtonStyle: {
    resizeMode: "contain",
    width: 50,
    height: 50,
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
    justifyContent: "center",
  },
  topElement: {
    paddingTop: 1,
    margin: 8,
    width: 170,
    height: 40,
    backgroundColor: Color.GrayDark,
    borderRadius: 30,
  },
});
