import * as React from "react";
import { Image, ImageSourcePropType, Pressable, View } from "react-native";
import { Text } from "~/components/ui/text";

interface CharacterHeroProps {
  imageSource: ImageSourcePropType | null;
  title: string;
  subtitle?: string;
  ctaLabel: string;
  onPress: () => void;
  emoji?: string;
  compact?: boolean;
}

export default function CharacterHero({
  imageSource,
  title,
  subtitle,
  ctaLabel,
  onPress,
  emoji,
  compact = false,
}: CharacterHeroProps) {
  return (
    <View
      className="w-full rounded-3xl overflow-hidden bg-antar-teal"
      style={{ minHeight: compact ? 220 : 340 }}
    >
      {/* Decorative shapes */}
      <View className="absolute -left-6 -top-6 w-16 h-16 rounded-tr-3xl rounded-bl-3xl bg-white/90" />
      <View className="absolute left-8 top-10 w-3 h-3 rounded-full bg-antar-orange" />
      <View className="absolute -left-6 bottom-4 w-16 h-16 rounded-tl-2xl rounded-br-2xl bg-antar-orange" />
      <View className="absolute -right-10 top-16 w-52 h-52 rounded-full border border-white/15" />

      {/* Illustration */}
      <View className="items-center pt-8">
        {imageSource ? (
          <Image
            source={imageSource}
            resizeMode="contain"
            style={{ width: compact ? 180 : 250, height: compact ? 120 : 200 }}
          />
        ) : (
          <View
            className="items-center justify-center"
            style={{ width: compact ? 160 : 220, height: compact ? 110 : 180 }}
          >
            <Text className="text-7xl">{emoji ?? "🧘"}</Text>
          </View>
        )}
      </View>

      {/* Copy + CTA */}
      <View className="px-6 pb-6 mt-2 items-center">
        <Text className="text-white text-xl font-semibold text-center">
          {title}
        </Text>
        {subtitle ? (
          <Text className="text-white/80 text-center mt-2">{subtitle}</Text>
        ) : null}

        <Pressable
          onPress={onPress}
          accessibilityRole="button"
          className="mt-4 rounded-full bg-antar-dark px-6 h-12 items-center justify-center"
        >
          <Text className="text-white font-semibold">{ctaLabel}</Text>
        </Pressable>
      </View>
    </View>
  );
}
