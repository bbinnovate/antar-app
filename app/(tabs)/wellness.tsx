import * as React from "react";
import { View, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text } from "~/components/ui/text";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import DecoratedHeader from "~/components/custom/DecoratedHeader";

export default function WellnessScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="p-6 flex flex-col gap-6">
          <DecoratedHeader
            title="Wellness Journey"
            subtitle="Discover yourself through mindfulness"
          />

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
