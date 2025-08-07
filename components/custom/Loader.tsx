import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View, Easing, Image } from "react-native";

const Loader = () => {
  const jumpAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(jumpAnim, {
          toValue: -50, // jump height
          duration: 400,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(jumpAnim, {
          toValue: 0, // fall back to ground
          duration: 300,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.ballContainer,
          { transform: [{ translateY: jumpAnim }] },
        ]}
      >
        <Image
          source={{
            uri:
              "https://img.icons8.com/emoji/96/soccer-ball-emoji.png",
          }}
          style={styles.ball}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.8)",
    zIndex: 1000,
  },
  ballContainer: {
    width: 80,
    height: 80,
  },
  ball: {
    width: 80,
    height: 80,
  },
});

export default Loader;
