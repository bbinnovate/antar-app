import * as React from "react";
import { View, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Text } from "~/components/ui/text";

interface OfferingsHeaderProps {
  title: string;
  subtitle?: string;
}

// Matches Figma style: soft green gradient card with layered circular arcs
export default function OfferingsHeader({
  title,
  subtitle,
}: OfferingsHeaderProps) {
  return (
    <View className="px-6 mt-4">
      <View
        className="rounded-2xl overflow-hidden"
        style={{
          shadowColor: "#000",
          shadowOpacity: 0.08,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 4 },
          elevation: 3,
        }}
      >
        <LinearGradient
          colors={["#4B6658", "#3F5B4F", "#2F4D43"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            paddingVertical: 28,
            paddingHorizontal: 20,
            position: "relative",
          }}
        >
          {/* Concentric translucent arcs using absolutely positioned circles */}
          <View
            pointerEvents="none"
            style={{
              position: "absolute",
              right: -40,
              top: -10,
              width: 260,
              height: 260,
              borderRadius: 130,
              backgroundColor: "rgba(255,255,255,0.05)",
            }}
          />
          <View
            pointerEvents="none"
            style={{
              position: "absolute",
              right: -10,
              top: 30,
              width: 180,
              height: 180,
              borderRadius: 90,
              backgroundColor: "rgba(255,255,255,0.06)",
            }}
          />
          <View
            pointerEvents="none"
            style={{
              position: "absolute",
              right: 50,
              top: 80,
              width: 110,
              height: 110,
              borderRadius: 55,
              backgroundColor: "rgba(255,255,255,0.07)",
            }}
          />

          <Text className="text-white text-xl font-semibold text-center">
            {title}
          </Text>
          {subtitle ? (
            <Text className="text-white/90 text-xs text-center mt-2 leading-4">
              {subtitle}
            </Text>
          ) : null}
        </LinearGradient>
      </View>
    </View>
  );
}
