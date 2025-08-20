import * as React from "react";
import { View } from "react-native";
import { Text } from "~/components/ui/text";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import DecoratedHeader from "~/components/custom/DecoratedHeader";
import Screen from "~/components/custom/Screen";
import Section from "~/components/custom/Section";

export default function MetabolicHealthScreen() {
  return (
    <Screen>
      <DecoratedHeader
        title="Metabolic Health"
        subtitle="Managing diabetes, thyroid, and metabolic wellness"
      />

      <Section title="⚡ What We Manage">
        <View className="flex flex-col gap-3">
          <Card className="border-antar-teal/20">
            <CardContent className="p-4">
              <Text className="font-semibold text-antar-dark mb-2">
                Common Conditions:
              </Text>
              <Text className="text-muted-foreground">
                • Diabetes (Type 1 & Type 2){"\n"}• Thyroid Disorders{"\n"}•
                Metabolic Syndrome{"\n"}• Insulin Resistance{"\n"}• Weight
                Management
              </Text>
            </CardContent>
          </Card>
        </View>
      </Section>

      <Section title="🌱 Our Approach">
        <Text className="text-muted-foreground mb-4 text-center">
          Detailed content about metabolic health management approach will be
          added here.
        </Text>
        <Card className="border-antar-teal/20 bg-antar-teal/5">
          <CardContent className="p-4">
            <Text className="text-antar-teal font-medium text-center">
              Comprehensive metabolic health solutions coming soon...
            </Text>
          </CardContent>
        </Card>
      </Section>

      <Section>
        <Button className="w-full bg-antar-teal">
          <Text className="font-semibold text-white">
            Get Free Consultation
          </Text>
        </Button>
      </Section>
    </Screen>
  );
}
