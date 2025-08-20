import * as React from "react";
import { View } from "react-native";
import { Text } from "~/components/ui/text";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import DecoratedHeader from "~/components/custom/DecoratedHeader";
import Screen from "~/components/custom/Screen";
import Section from "~/components/custom/Section";

export default function GutHealthScreen() {
  return (
    <Screen>
      <DecoratedHeader
        title="Gut Health Management"
        subtitle="Comprehensive solutions for digestive wellness and gut health"
      />

      <Section title="🦋 What We Manage">
        <View className="flex flex-col gap-3">
          <Card className="border-antar-teal/20">
            <CardContent className="p-4">
              <Text className="font-semibold text-antar-dark mb-2">
                Common Conditions:
              </Text>
              <Text className="text-muted-foreground">
                • GERD (Gastroesophageal Reflux Disease){"\n"}• IBS (Irritable
                Bowel Syndrome){"\n"}• Constipation & Digestive Issues{"\n"}•
                Bloating & Gas{"\n"}• Other Digestive Disorders
              </Text>
            </CardContent>
          </Card>
        </View>
      </Section>

      <Section title="🌱 Our Approach">
        <Text className="text-muted-foreground mb-4 text-center">
          Detailed content about gut health management approach will be added
          here.
        </Text>
        <Card className="border-antar-teal/20 bg-antar-teal/5">
          <CardContent className="p-4">
            <Text className="text-antar-teal font-medium text-center">
              Comprehensive gut health solutions coming soon...
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
