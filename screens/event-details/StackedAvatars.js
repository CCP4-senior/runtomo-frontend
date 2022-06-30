import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
} from "react-native";
import {
  Avatar,
  Card,
  Title,
  Dialog,
  Provider,
  Portal,
  Paragraph,
} from "react-native-paper";
import Color from "../../assets/themes/Color";

const StackedAvatars = (/*participants*/) => {
  const participants = [
    { id: 1, image: null },
    { id: 2, image: null },
    { id: 2, image: null },
    { id: 2, image: null },
    { id: 2, image: null },
  ];
  return (
    <View style={styles.avatarContainer}>
      {participants.map((person, i) => {
        return (
          <Avatar.Icon
            size={30}
            icon="account"
            style={{ postiion: "absolute", top: 0, left: -i * 15 }}
          />
        );
      })}
    </View>
  );
};

export default StackedAvatars;

const styles = StyleSheet.create({
  avatarContainer: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
  },
  avatar1: { backgroundColor: Color.GrayDark },
});
