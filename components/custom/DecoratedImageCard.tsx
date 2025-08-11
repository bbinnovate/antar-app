import * as React from "react";
import { Image, ImageSourcePropType, View } from "react-native";

interface DecoratedImageCardProps {
  imageSource: ImageSourcePropType;
  compact?: boolean;
}

// Image-only hero card with teal background and decorative shapes
export default function DecoratedImageCard({
  imageSource,
  compact = false,
}: DecoratedImageCardProps) {
  const minHeight = compact ? 220 : 340;

  return (
    <View
      className="w-full rounded-3xl overflow-hidden bg-antar-teal"
      style={{ minHeight }}
    >
      {/* top-left white chip */}
      <View className="absolute -left-6 -top-6 w-20 h-20 bg-white rounded-tr-3xl rounded-bl-3xl" />
      {/* small orange dot */}
      <View className="absolute left-9 top-9 w-3 h-3 rounded-full bg-antar-orange" />
      {/* right-side white half circle */}
      <View className="absolute -right-4 top-20 w-12 h-12 rounded-full bg-white/90" />
      {/* subtle outline circle */}
      <View className="absolute -right-10 top-10 w-52 h-52 rounded-full border border-white/15" />
      {/* bottom-left orange quarter */}
      <View className="absolute -left-8 bottom-0 w-20 h-20 bg-antar-orange rounded-tl-3xl" />

      {/* Illustration */}
      <View className="flex-1 items-center justify-center pt-8">
        <Image
          source={imageSource}
          resizeMode="contain"
          style={{ width: compact ? 220 : 260, height: compact ? 160 : 210 }}
        />
      </View>
    </View>
  );
}
