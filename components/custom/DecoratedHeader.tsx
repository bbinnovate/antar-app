import * as React from "react";
import { Image, ImageSourcePropType, View } from "react-native";
import { Text } from "~/components/ui/text";

interface DecoratedHeaderProps {
  title: string;
  subtitle?: string;
  avatarSource?: ImageSourcePropType;
}

// Teal header with reference-style decorative shapes
export default function DecoratedHeader({
  title,
  subtitle,
  avatarSource,
}: DecoratedHeaderProps) {
  return (
    <View className="rounded-3xl overflow-hidden bg-antar-teal">
      {/* decorative chips */}
      <View className="absolute right-6 top-8 w-3 h-3 rounded-full bg-antar-orange" />
      <View className="absolute -right-10 top-0 w-52 h-52 rounded-full border border-white/15" />

      <View className="px-6 py-6 flex-row items-center gap-4">
        {avatarSource ? (
          <Image
            source={avatarSource}
            style={{ width: 48, height: 48, borderRadius: 24 }}
          />
        ) : null}
        <View className="flex-1">
          <Text className="text-white text-lg font-semibold">{title}</Text>
          {subtitle ? (
            <Text className="text-white/80 mt-1">{subtitle}</Text>
          ) : null}
        </View>
      </View>
    </View>
  );
}
