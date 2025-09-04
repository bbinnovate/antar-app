import * as React from "react";
import {
  View,
  FlatList,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Image,
} from "react-native";
import { Text } from "~/components/ui/text";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

export interface OnboardingSlide {
  key: string;
  image: any | null;
  title: string;
  subtitle?: string;
  logo?: any;
  emoji?: string; // kept for future, not used in image-only card
}

interface OnboardingCarouselProps {
  slides: OnboardingSlide[];
  compact?: boolean;
  autoScrollMs?: number;
  onIndexChange?: (index: number) => void; // notify parent for external indicators
}

export default function OnboardingCarousel({
  slides,
  compact = false,
  autoScrollMs = 3500,
  onIndexChange,
}: OnboardingCarouselProps) {
  const [index, setIndex] = React.useState(0);
  const indexRef = React.useRef(0);
  const listRef = React.useRef<FlatList>(null);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = e.nativeEvent.contentOffset.x;
    const newIndex = Math.round(x / width);
    setIndex(newIndex);
    indexRef.current = newIndex;
    onIndexChange?.(newIndex);
  };

  React.useEffect(() => {
    if (slides.length <= 1) return;
    const id = setInterval(() => {
      const next = (indexRef.current + 1) % slides.length;
      try {
        listRef.current?.scrollToIndex({ index: next, animated: true });
      } catch {
        listRef.current?.scrollToOffset({
          offset: next * width,
          animated: true,
        });
      }
    }, autoScrollMs);
    return () => clearInterval(id);
  }, [slides.length, autoScrollMs]);

  return (
    <View style={{ flex: 1, position: "relative" }}>
      <FlatList
        ref={listRef}
        data={slides}
        keyExtractor={(s) => s.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        getItemLayout={(_, i) => ({
          length: width,
          offset: width * i,
          index: i,
        })}
        style={{ flex: 1 }}
        renderItem={({ item }) => (
          <View style={{ width, height: "100%" }}>
            {/* Full Screen Background Image */}
            <Image
              source={item.image}
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
              }}
              resizeMode="cover"
            />

            {/* Gradient overlay for better text readability */}
            <LinearGradient
              colors={[
                "rgba(17, 18, 20, 0)",
                "rgba(17, 18, 20, 0.26)",
                "rgba(17, 18, 20, 0.87)",
              ]}
              locations={[0, 0.26, 0.87]}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
              }}
            />

            {/* Content Container - Positioned at bottom with proper spacing */}
            <View className="absolute bottom-0 left-0 right-0 pb-10">
              {/* Logo */}
              {item.logo && (
                <View className="items-center mb-4">
                  <View className="w-16 h-16 rounded-full items-center justify-center bg-white/10">
                    <Image
                      source={item.logo}
                      className="w-full h-full"
                      resizeMode="contain"
                    />
                  </View>
                </View>
              )}

              {/* Title */}
              <Text className="text-white text-4xl font-bold text-center leading-tight mb-3 px-6">
                {item.title}
              </Text>

              {/* Subtitle */}
              {item.subtitle && (
                <Text className="text-white text-base text-center leading-relaxed opacity-90 mb-6 px-6">
                  {item.subtitle}
                </Text>
              )}

              {/* Leave bottom clear; external overlay will render progress + CTAs */}
            </View>
          </View>
        )}
      />
    </View>
  );
}
