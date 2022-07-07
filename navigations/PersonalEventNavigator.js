import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PersonalEventScreen from "../screens/personal-event/PersonalEventScreen";
import EventDetailsNavigator from "./EventDetailsNavigator";
import UserProfileScreen from "../screens/user-profile/UserProfileScreen";
import SettingScreen from "../screens/setting/SettingScreen";
import HeaderStyle from "../assets/themes/HeaderStyle";
import createOptions from "./reusableOptions/appNavigatorOptions";
import UserProfileEditScreen from "../screens/user-profile/UserProfileEditScreen";
import HomeScreen from "../screens/home/HomeScreen";
import { AuthContext } from "../context/authcontext/AuthContext";
import PointsOfInterestScreen from "../screens/points-of-interst/PointsOfInterestScreen";

const Stack = createStackNavigator();

const PersonalEventNavigator = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const showPointsOfInterest = true;

  const openSetting = () => {
    navigation.navigate("Setting");
  };
  const openPointsOfInterest = () => {
    navigation.navigate("PointsOfInterest");
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="My Sessions"
        options={createOptions(
          openSetting,
          openPointsOfInterest,
          showPointsOfInterest
        )}
      >
        {(props) => <PersonalEventScreen {...props} />}
      </Stack.Screen>
      <Stack.Screen name="Event Details" options={{ headerShown: false }}>
        {(props) => <EventDetailsNavigator {...props} />}
      </Stack.Screen>
      <Stack.Screen
        name="Setting"
        component={SettingScreen}
        options={{ ...HeaderStyle }}
      />
      <Stack.Screen
        name="Edit Profile"
        component={UserProfileEditScreen}
        options={{ ...HeaderStyle }}
      />
      <Stack.Screen
        name="Profile"
        component={UserProfileScreen}
        options={{ ...HeaderStyle }}
        initialParams={{ userToView: user }}
      />

      <Stack.Screen name="Home" options={createOptions(openSetting)}>
        {(props) => <HomeScreen {...props} />}
      </Stack.Screen>
      <Stack.Screen
        name="PointsOfInterest"
        component={PointsOfInterestScreen}
        options={{ ...HeaderStyle }}
      />
    </Stack.Navigator>
  );
};

export default PersonalEventNavigator;
