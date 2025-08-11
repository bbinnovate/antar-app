import * as React from "react";
import { Pressable, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Text } from "~/components/ui/text";

interface GradientCTAProps extends React.ComponentProps<typeof Pressable> {
  title: string;
}

export default function GradientCTA({
  title,
  style,
  children,
  ...props
}: GradientCTAProps) {
  return (
    <Pressable accessibilityRole="button" {...props}>
      <LinearGradient
        colors={["#FF8A4D", "#FF772F"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          {
            height: 56,
            borderRadius: 16,
            justifyContent: "center",
            alignItems: "center",
            shadowColor: "#FF772F",
            shadowOpacity: 0.25,
            shadowRadius: 6,
            shadowOffset: { width: 0, height: 4 },
            elevation: 3,
          },
          // @ts-expect-error RN style union
          style,
        ]}
      >
        {children ?? (
          <Text className="text-white font-semibold text-base">{title}</Text>
        )}
      </LinearGradient>
    </Pressable>
  );
}
