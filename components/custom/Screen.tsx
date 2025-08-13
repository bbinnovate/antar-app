import React from "react";
import { View, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { cn } from "~/lib/utils";

interface ScreenProps {
  children: React.ReactNode;
  scroll?: boolean;
  contentClassName?: string;
  backgroundClassName?: string;
}

export default function Screen(props: ScreenProps) {
  const {
    children,
    scroll = true,
    contentClassName,
    backgroundClassName,
  } = props;
  const insets = useSafeAreaInsets();

  if (scroll) {
    return (
      <View
        className={cn("flex-1", backgroundClassName || "bg-background")}
        style={{ paddingTop: insets.top }}
      >
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className={cn("p-6 gap-6", contentClassName)}>{children}</View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View
      className={cn("flex-1", backgroundClassName || "bg-background")}
      style={{ paddingTop: insets.top }}
    >
      <View className={cn("flex-1 p-6 gap-6", contentClassName)}>
        {children}
      </View>
    </View>
  );
}
