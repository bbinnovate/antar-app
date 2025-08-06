import * as React from "react";
import { View, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text } from "~/components/ui/text";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";

export default function WellnessScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex-1 bg-gradient-to-b from-primary/5 to-secondary/30"
      style={{ paddingTop: insets.top }}
    >
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="p-6 flex flex-col gap-6">
          {/* Header */}
          <View className="items-center mb-6">
            <Text className="text-4xl mb-2">🧘</Text>
            <Text className="text-2xl font-bold text-antar-dark">
              Wellness Journey
            </Text>
            <Text className="text-muted-foreground text-center mt-2">
              Discover your inner essence through mindful practices
            </Text>
          </View>

          {/* Meditation Section */}
          <Card className="p-6 rounded-3xl shadow-lg bg-background/95 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle className="text-xl text-antar-teal flex-row items-center">
                🧠 Mind Balance
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Text className="text-muted-foreground">
                Start your day with guided meditation and mindfulness exercises
              </Text>
              <Button className="w-full bg-antar-teal">
                <Text className="font-semibold text-white">
                  Begin Meditation
                </Text>
              </Button>
            </CardContent>
          </Card>

          {/* Breathing Exercises */}
          <Card className="p-6 rounded-3xl shadow-lg bg-background/95 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle className="text-xl text-antar-orange flex-row items-center">
                🌬️ Breathing Exercises
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Text className="text-muted-foreground">
                Practice ancient breathing techniques for stress relief and
                energy
              </Text>
              <Button className="w-full bg-antar-orange">
                <Text className="font-semibold text-white">
                  Start Breathing
                </Text>
              </Button>
            </CardContent>
          </Card>

          {/* Yoga & Movement */}
          <Card className="p-6 rounded-3xl shadow-lg bg-background/95 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle className="text-xl text-antar-teal flex-row items-center">
                💪 Yoga & Movement
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Text className="text-muted-foreground">
                Gentle yoga flows and movement practices for body wellness
              </Text>
              <Button className="w-full bg-antar-teal">
                <Text className="font-semibold text-white">Start Practice</Text>
              </Button>
            </CardContent>
          </Card>

          {/* Emotional Wellness */}
          <Card className="p-6 rounded-3xl shadow-lg bg-background/95 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle className="text-xl text-antar-pink flex-row items-center">
                ❤️ Emotional Wellness
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Text className="text-muted-foreground">
                Explore emotional balance through guided journaling and
                reflection
              </Text>
              <Button className="w-full bg-antar-pink border-antar-pink">
                <Text className="font-semibold text-antar-dark">
                  Begin Journey
                </Text>
              </Button>
            </CardContent>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
}
