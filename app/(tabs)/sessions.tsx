import * as React from "react";
import { View } from "react-native";
import Screen from "~/components/custom/Screen";
import Section from "~/components/custom/Section";
import DecoratedHeader from "~/components/custom/DecoratedHeader";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";

export default function SessionsScreen() {
  const hasParivar = false; // TODO: replace with real entitlement

  return (
    <Screen>
      <DecoratedHeader
        title="Sessions"
        subtitle="Book and join your practices"
      />

      <Section title="Calendar">
        <View className="w-full h-40 rounded-2xl bg-white/5 border border-border items-center justify-center">
          <Text className="text-muted-foreground">Calendar placeholder</Text>
        </View>
      </Section>

      <Section title="Available Sessions">
        <View className="flex flex-col gap-3">
          <View className="p-4 rounded-xl bg-white/5 border border-border">
            <Text className="font-semibold text-antar-dark">
              Morning Yoga • 7:00 AM
            </Text>
            <Text className="text-xs text-muted-foreground">
              45 min • Beginner
            </Text>
            {hasParivar ? (
              <Button className="mt-3 bg-antar-teal">
                <Text className="text-white font-semibold">Book Slot</Text>
              </Button>
            ) : (
              <View className="mt-3">
                <Text className="text-xs text-muted-foreground">
                  Included in Antar Parivar
                </Text>
              </View>
            )}
          </View>

          <View className="p-4 rounded-xl bg-white/5 border border-border">
            <Text className="font-semibold text-antar-dark">
              Breathwork Basics • 6:30 PM
            </Text>
            <Text className="text-xs text-muted-foreground">
              30 min • All levels
            </Text>
            {hasParivar ? (
              <Button className="mt-3 bg-antar-teal">
                <Text className="text-white font-semibold">Book Slot</Text>
              </Button>
            ) : (
              <View className="mt-3">
                <Text className="text-xs text-muted-foreground">
                  Included in Antar Parivar
                </Text>
              </View>
            )}
          </View>
        </View>
      </Section>
    </Screen>
  );
}
