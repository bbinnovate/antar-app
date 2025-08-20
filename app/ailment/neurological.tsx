import * as React from "react";
import { View } from "react-native";
import { Text } from "~/components/ui/text";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import DecoratedHeader from "~/components/custom/DecoratedHeader";
import Screen from "~/components/custom/Screen";
import Section from "~/components/custom/Section";

export default function NeurologicalScreen() {
  return (
    <Screen>
      <DecoratedHeader
        title="Neurological Wellness"
        subtitle="Brain health and neurological condition management"
      />

      <Section title="🧠 What We Manage">
        <View className="flex flex-col gap-3">
          <Card className="border-antar-orange/20">
            <CardContent className="p-4">
              <Text className="font-semibold text-antar-dark mb-2">
                Common Conditions:
              </Text>
              <Text className="text-muted-foreground">
                • Alzheimer's Disease{"\n"}• Parkinson's Disease{"\n"}• Epilepsy
                {"\n"}• Dementia{"\n"}• ADHD & Cognitive Health
              </Text>
            </CardContent>
          </Card>
        </View>
      </Section>

      <Section title="🌱 Our Approach">
        <Text className="text-muted-foreground mb-4 text-center">
          Detailed content about neurological wellness management approach will
          be added here.
        </Text>
        <Card className="border-antar-orange/20 bg-antar-orange/5">
          <CardContent className="p-4">
            <Text className="text-antar-orange font-medium text-center">
              Comprehensive neurological wellness solutions coming soon...
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
