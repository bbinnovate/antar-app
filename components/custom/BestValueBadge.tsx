import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function TopRightBadge() {
  return (
    <View style={styles.container}>
      {/* Badge wrapper */}
      <View style={styles.badgeWrapper}>
        {/* Gradient badge */}
        <LinearGradient
          colors={["#1A200E", "#6E863C"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.badge}
        >
          <Text style={styles.text}>Best Value</Text>
        </LinearGradient>

        {/* Folded triangle */}
        <View style={styles.triangle} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-end",
    padding: 20,
  },
  badgeWrapper: {
    position: "relative",
  },
  badge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    overflow: "hidden",
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
  },
  triangle: {
    position: "absolute",
    top: -5,
    right: -5,
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 10,
    borderStyle: "solid",
    backgroundColor: "transparent",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#6E863C",
    transform: [{ rotate: "45deg" }],
  },
});
