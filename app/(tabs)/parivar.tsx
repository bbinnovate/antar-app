import * as React from "react";
import { View, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text } from "~/components/ui/text";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import DecoratedHeader from "~/components/custom/DecoratedHeader";

export default function ParivarScreen() {
  const insets = useSafeAreaInsets();

  const features = [
    "3x/week live sessions",
    "Monthly expert webinar",
    "Monthly Wellness Toolkit",
    "24/7 Chat",
    "WhatsApp group",
    "Community Event Booking",
    "Feedback system",
  ];

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="p-6 flex flex-col gap-6">
          <DecoratedHeader
            title="Antar Parivar"
            subtitle="Your space for deep transformation"
          />

          {/* Highlight Card */}
          <Card className="p-6 rounded-3xl shadow-lg bg-background/95 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle className="text-xl text-antar-teal">
                Why join Parivar?
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Text className="text-muted-foreground">
                Access guided practices, expert wisdom, and a nurturing
                community— all designed to harmonize mind 🧠, body 💪, and heart
                ❤️.
              </Text>
            </CardContent>
          </Card>

          {/* Features */}
          <Card className="p-6 rounded-3xl shadow-lg bg-background/95 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle className="text-xl text-antar-dark">
                Membership Features
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {features.map((f, idx) => (
                <View key={idx} className="flex-row items-center gap-3">
                  <Text className="text-xl">✅</Text>
                  <Text className="text-base text-antar-dark">{f}</Text>
                </View>
              ))}
            </CardContent>
          </Card>

          {/* CTA */}
          <Card className="p-6 rounded-3xl shadow-lg bg-background/95 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle className="text-xl text-antar-teal">
                Join the Parivar
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Text className="text-muted-foreground">
                Begin your Antar journey—personalized, sustainable, and rooted
                in ancient wisdom + modern science.
              </Text>
              <Button className="w-full bg-antar-teal h-12 rounded-xl">
                <Text className="text-white font-semibold">
                  Become a Member
                </Text>
              </Button>
            </CardContent>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
}
