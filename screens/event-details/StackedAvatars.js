import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Avatar } from "react-native-paper";
import Color from "../../assets/themes/Color";

const StackedAvatars = ({ participantsArray, color, size, eventId }) => {
  let participants = participantsArray;
  if (!participantsArray) {
    participants = [
      { id: 1, image: require("../../assets/images/demo/wade.png") },
      { id: 2, image: null },
      { id: 3, image: require("../../assets/images/demo/kumiko.png") },
      { id: 4, image: null },
      { id: 6, image: null },
      { id: 8, image: null },
    ];
  }
  const displayedCount = participants.slice(0, 5).length;
  const remainingCount = participants.length - 4;

  return (
    <View
      style={{
        width: size === "small" ? 22 * displayedCount : 27 * displayedCount,
        ...styles.avatarContainer,
      }}
    >
      {participants.slice(0, 5).map((person, i) => {
        if (i === 4) {
          return (
            <View
              style={
                size === "small"
                  ? { top: 0, left: -i * 17, ...styles.smallOuterCircle }
                  : { top: 0, left: -i * 16, ...styles.outerCircle }
              }
              key={`${person.id}:${eventId}`}
            >
              <View
                style={
                  size === "small"
                    ? {
                        backgroundColor: color,
                        ...styles.smallLastCircle,
                      }
                    : {
                        backgroundColor: color,
                        ...styles.lastCircle,
                      }
                }
              >
                <Text style={styles.lastCircleText}>{remainingCount}+</Text>
              </View>
            </View>
          );
        } else
          return person.image ? (
            <View
              style={
                size === "small"
                  ? { top: 0, left: -i * 17, ...styles.smallOuterCircle }
                  : { top: 0, left: -i * 16, ...styles.outerCircle }
              }
              key={`${person.id}:${eventId}`}
            >
              <Avatar.Image
                size={size === "small" ? 28 : 33}
                source={person.image}
                style={size === "small" ? styles.smallAvatar : styles.avatar}
              />
            </View>
          ) : (
            <View
              style={
                size === "small"
                  ? { top: 0, left: -i * 17, ...styles.smallOuterCircle }
                  : { top: 0, left: -i * 16, ...styles.outerCircle }
              }
              key={`${person.id}:${eventId}`}
            >
              <Avatar.Icon
                key={person.id}
                size={size === "small" ? 28 : 33}
                icon="account"
                style={size === "small" ? styles.smallAvatar : styles.avatar}
              />
            </View>
          );
      })}
    </View>
  );
};

export default StackedAvatars;

const styles = StyleSheet.create({
  avatarContainer: {
    display: "flex",
    flexDirection: "row",
    // width: "100%",
    // backgroundColor: "red",
  },
  outerCircle: {
    borderRadius: 50,
    backgroundColor: Color.White,
    // backgroundColor: "red",
    height: 40,
    width: 40,
  },
  smallOuterCircle: {
    borderRadius: 50,
    backgroundColor: Color.White,
    // backgroundColor: "red",
    height: 36,
    width: 36,
  },
  lastCircle: {
    borderRadius: 50,
    height: 35,
    width: 35,
    top: 3,
    left: 3,
  },
  smallLastCircle: {
    borderRadius: 50,
    // height: 30,
    // width: 30,
    height: 32,
    width: 32,
    top: 2,
    left: 3.5,
  },
  lastCircleText: {
    color: "white",
    fontWeight: "700",
    lineHeight: 32,
    textAlign: "center",
  },
  avatar: {
    backgroundColor: Color.GrayDark,
    top: 3,
    left: 4,
  },
  smallAvatar: {
    top: 3.3,
    left: 3.5,
  },
});
