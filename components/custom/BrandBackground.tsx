import * as React from "react";
import { View } from "react-native";

interface BrandBackgroundProps {
  children?: React.ReactNode;
}

export default function BrandBackground({ children }: BrandBackgroundProps) {
  return (
    <View className="flex-1 bg-[#FFF3EC]">
      {/* teal blob top-left */}
      <View className="absolute -left-10 -top-10 w-48 h-48 rounded-full bg-antar-teal/20" />
      {/* orange dot */}
      <View className="absolute left-8 top-16 w-6 h-6 rounded-full bg-antar-orange" />
      {/* pink rounded chip */}
      <View className="absolute right-0 top-28 w-28 h-28 rounded-tl-[80px] bg-antar-pink/30" />
      {/* bottom accents */}
      <View className="absolute -right-8 bottom-12 w-36 h-36 rounded-full bg-antar-teal/10" />
      <View className="absolute left-6 bottom-6 w-8 h-8 rounded-full bg-antar-orange" />
      <View className="flex-1">{children}</View>
    </View>
  );
}
