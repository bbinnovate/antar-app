import * as React from "react";
import { Pressable, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Text } from "~/components/ui/text";
import { ArrowRight } from "lucide-react-native";

type GradientCTAProps = Omit<
  React.ComponentProps<typeof Pressable>,
  "children"
> & {
  title: string;
  children?: React.ReactNode;
};

export default function GradientCTA({
  title,
  style,
  children,
  ...props
}: GradientCTAProps) {
  return (
    <Pressable accessibilityRole="button" {...props}>
      <LinearGradient
        colors={["#E87D36", "#FF772F"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          {
            height: 45,
            borderRadius: 100,
            justifyContent: "center",
            alignItems: "center",
            shadowColor: "#E87D36",
            shadowOpacity: 0.25,
            shadowRadius: 5,
            shadowOffset: { width: 0, height: 0 },
            elevation: 3,
            borderWidth: 3,
            borderColor: "rgba(240, 167, 114, 1)",
            flexDirection: "row",
            paddingHorizontal: 20,
          },
          // @ts-expect-error RN style union
          style,
        ]}
      >
        {children ?? (
          <>
            <Text className="text-white font-bold text-md tracking-wider mr-2">
              {title}
            </Text>
            {/* Right arrow icon */}
            <View className="w-6 h-6 bg-white rounded-full items-center justify-center">
              <ArrowRight size={14} color="#FF772F" strokeWidth={2.5} />
            </View>
          </>
        )}
      </LinearGradient>
    </Pressable>
  );
}
