import * as React from "react";
import { View } from "react-native";
import { Text } from "~/components/ui/text";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import DecoratedHeader from "~/components/custom/DecoratedHeader";
import Screen from "~/components/custom/Screen";
import Section from "~/components/custom/Section";

export default function CardiovascularScreen() {
  return (
    <Screen>
      <DecoratedHeader
        title="Cardiovascular Health"
        subtitle="Heart health and circulation wellness management"
      />

      <Section title="❤️ What We Manage">
        <View className="flex flex-col gap-3">
          <Card className="border-antar-orange/20">
            <CardContent className="p-4">
              <Text className="font-semibold text-antar-dark mb-2">
                Common Conditions:
              </Text>
              <Text className="text-muted-foreground">
                • Heart Disease{"\n"}• High Cholesterol{"\n"}• Coronary Artery
                Disease{"\n"}• Stroke Prevention{"\n"}• Obesity & Heart Health
              </Text>
            </CardContent>
          </Card>
        </View>
      </Section>

      <Section title="🌱 Our Approach">
        <Text className="text-muted-foreground mb-4 text-center">
          Detailed content about cardiovascular health management approach will
          be added here.
        </Text>
        <Card className="border-antar-orange/20 bg-antar-orange/5">
          <CardContent className="p-4">
            <Text className="text-antar-orange font-medium text-center">
              Comprehensive cardiovascular health solutions coming soon...
            </Text>
          </CardContent>
        </Card>
      </Section>

      <Section>
        <Button className="w-full bg-antar-orange">
          <Text className="font-semibold text-white">
            Get Free Consultation
          </Text>
        </Button>
      </Section>
    </Screen>
  );
}
