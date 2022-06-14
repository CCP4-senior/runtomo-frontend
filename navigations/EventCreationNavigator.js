import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EventCreationScreen from "../screens/event-creation/EventCreationScreen";
import CreateConfirmationScreen from "../screens/event-creation/CreateConfirmationScreen";

const Stack = createStackNavigator();

const EventCreationNavigator = () => {
  const initialEvent = Object.freeze({
    eventTitle: "",
    meetingPoint: "",
    area: "",
    date: "",
    time: "",
    runningDuration: "",
    eventDescription: "",
  });
  const [newEvent, setNewEvent] = useState(initialEvent);
  return (
    <Stack.Navigator>
      <Stack.Screen name="Create Event">
        {(props) => (
          <EventCreationScreen
            {...props}
            newEvent={newEvent}
            setNewEvent={setNewEvent}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Event Created">
        {(props) => (
          <CreateConfirmationScreen
            {...props}
            newEvent={newEvent}
            setNewEvent={setNewEvent}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default EventCreationNavigator;
