import React, { useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Avatar } from "react-native-paper";
import Color from "../../assets/themes/Color";
import { DataContext } from "../../context/datacontext/DataContext";

const StackedAvatars = ({ participantsArray, color, size }) => {
  let participants = participantsArray;
  if (!participantsArray) {
    participants = [];
  }
  const { generateImageUrl } = useContext(DataContext);
  const displayedParticipants = participants.slice(0, 5);
  const displayedCirlceCount = displayedParticipants.length;
  const remainingCount = participants.length - 4;
  const generateContainerWidth = (circleCount) => {
    if (size === "small") {
      if (circleCount === 1) return 33;
      if (circleCount === 2) return 55;
      if (circleCount > 2) return (circleCount - 1) * 16 + 33;
    } else {
      if (circleCount === 1) return 40;
      if (circleCount === 2) return 65;
      if (circleCount > 2) return (circleCount - 1) * 22 + 45;
    }
  };
  const width = generateContainerWidth(displayedParticipants.length);

  return (
    <View
      style={{
        width: width,
        // width:
        //   size === "small"
        //     ? 22 * displayedCirlceCount
        //     : 27 * displayedCirlceCount,
        ...styles.avatarContainer,
      }}
    >
      {displayedParticipants.map((person, i) => {
        if (i > 3 && i === displayedParticipants.length - 1) {
          return (
            <View
              style={
                size === "small"
                  ? { top: 0, left: -i * 17, ...styles.smallOuterCircle }
                  : { top: 0, left: -i * 16, ...styles.outerCircle }
              }
              key={i}
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
                <Text style={styles.lastCircleText}>+{remainingCount}</Text>
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
              key={i}
            >
              <Avatar.Image
                size={size === "small" ? 28 : 33}
                source={{ uri: generateImageUrl(person.image) }}
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
              key={i}
            >
              <Avatar.Icon
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
  },
  outerCircle: {
    borderRadius: 50,
    backgroundColor: Color.White,
    height: 40,
    width: 40,
  },
  smallOuterCircle: {
    borderRadius: 50,
    backgroundColor: Color.White,
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
