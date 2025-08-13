import * as React from "react";
import { View } from "react-native";
import { Text } from "~/components/ui/text";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import DecoratedHeader from "~/components/custom/DecoratedHeader";
import Screen from "~/components/custom/Screen";
import Section from "~/components/custom/Section";

export default function WellnessScreen() {
  return (
    <Screen>
      <DecoratedHeader
        title="Wellness Journey"
        subtitle="Discover yourself through mindfulness"
      />

      <Section title="🧠 Mind Balance">
        <Text className="text-muted-foreground mb-3">
          Start your day with guided meditation and mindfulness exercises
        </Text>
        <Button className="w-full bg-antar-teal">
          <Text className="font-semibold text-white">Begin Meditation</Text>
        </Button>
      </Section>

      <Section title="🌬️ Breathing Exercises">
        <Text className="text-muted-foreground mb-3">
          Practice ancient breathing techniques for stress relief and energy
        </Text>
        <Button className="w-full bg-antar-orange">
          <Text className="font-semibold text-white">Start Breathing</Text>
        </Button>
      </Section>

      <Section title="💪 Yoga & Movement">
        <Text className="text-muted-foreground mb-3">
          Gentle yoga flows and movement practices for body wellness
        </Text>
        <Button className="w-full bg-antar-teal">
          <Text className="font-semibold text-white">Start Practice</Text>
        </Button>
      </Section>

      <Section title="❤️ Emotional Wellness">
        <Text className="text-muted-foreground mb-3">
          Explore emotional balance through guided journaling and reflection
        </Text>
        <Button className="w-full bg-antar-pink border-antar-pink">
          <Text className="font-semibold text-antar-dark">Begin Journey</Text>
        </Button>
      </Section>
    </Screen>
  );
}
