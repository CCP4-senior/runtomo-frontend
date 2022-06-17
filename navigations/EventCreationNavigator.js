import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EventCreationScreen from "../screens/event-creation/EventCreationScreen";
import ConfirmationScreen from "../screens/confirmation/ConfirmationScreen";
import HeaderStyle from "../assets/themes/HeaderStyle";

const Stack = createStackNavigator();

const EventCreationNavigator = ({ setData, data }) => {
  const initialEvent = Object.freeze({
    title: "",
    meetingPoint: "",
    ward: "",
    date: "",
    time: "",
    runningDuration: "",
    eventDescription: "",
  });
  const [newEvent, setNewEvent] = useState(initialEvent);
  console.log("It's data!!!", data);
  return (
    <Stack.Navigator>
      <Stack.Screen name="Create Event" options={{ ...HeaderStyle }}>
        {(props) => (
          <EventCreationScreen
            {...props}
            newEvent={newEvent}
            setNewEvent={setNewEvent}
            setData={setData}
            data={data}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Event Created" options={{ ...HeaderStyle }}>
        {(props) => (
          <ConfirmationScreen
            {...props}
            event={newEvent}
            setNewEvent={setNewEvent}
            actionType="create"
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default EventCreationNavigator;
