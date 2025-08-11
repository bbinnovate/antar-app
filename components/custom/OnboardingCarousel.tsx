import * as React from "react";
import {
  View,
  FlatList,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import DecoratedImageCard from "./DecoratedImageCard";

const { width } = Dimensions.get("window");

export interface OnboardingSlide {
  key: string;
  image: any | null;
  title: string;
  subtitle?: string;
  emoji?: string; // kept for future, not used in image-only card
}

interface OnboardingCarouselProps {
  slides: OnboardingSlide[];
  compact?: boolean;
  autoScrollMs?: number;
}

export default function OnboardingCarousel({
  slides,
  compact = false,
  autoScrollMs = 3500,
}: OnboardingCarouselProps) {
  const [index, setIndex] = React.useState(0);
  const indexRef = React.useRef(0);
  const listRef = React.useRef<FlatList>(null);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = e.nativeEvent.contentOffset.x;
    const newIndex = Math.round(x / width);
    setIndex(newIndex);
    indexRef.current = newIndex;
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
    <View>
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
        renderItem={({ item }) => (
          <View style={{ width, paddingHorizontal: 24 }}>
            <DecoratedImageCard imageSource={item.image} compact={compact} />
          </View>
        )}
      />

      {/* Dots */}
      <View className="flex-row justify-center items-center mt-4">
        {slides.map((s, i) => (
          <View
            key={s.key}
            className="mx-1 rounded-full"
            style={{
              width: i === index ? 14 : 8,
              height: 8,
              backgroundColor: i === index ? "#FF772F" : "#CBD5E1",
            }}
          />
        ))}
      </View>
    </View>
  );
}
