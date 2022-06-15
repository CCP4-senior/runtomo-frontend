import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Avatar } from "react-native-paper";
import HomeScreen from "../screens/home/HomeScreen";
import EventDetailsNavigator from "./EventDetailsNavigator";
import EventCreationNavigator from "./EventCreationNavigator";
import UserProfileScreen from "../screens/user-profile/UserProfileScreen";

const Stack = createStackNavigator();

const HomeNavigator = ({ navigation }) => {
  const openProfileScreen = (eventData) => {
    navigation.navigate("Profile", {
      eventData: eventData,
    });
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SoleMates"
        component={HomeScreen}
        options={{
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => openProfileScreen()}
              style={styles.container}
            >
              <Avatar.Icon icon="account" size={30} title="Info" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Event Details"
        component={EventDetailsNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Event Creation"
        component={EventCreationNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Profile" component={UserProfileScreen} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
});
