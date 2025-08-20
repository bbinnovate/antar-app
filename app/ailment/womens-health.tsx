import * as React from "react";
import { View } from "react-native";
import { Text } from "~/components/ui/text";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import DecoratedHeader from "~/components/custom/DecoratedHeader";
import Screen from "~/components/custom/Screen";
import Section from "~/components/custom/Section";

export default function WomensHealthScreen() {
  return (
    <Screen>
      <DecoratedHeader
        title="Women's Health"
        subtitle="Specialized care for women's unique health needs"
      />

      <Section title="🌸 What We Manage">
        <View className="flex flex-col gap-3">
          <Card className="border-antar-pink/30">
            <CardContent className="p-4">
              <Text className="font-semibold text-antar-dark mb-2">
                Common Conditions:
              </Text>
              <Text className="text-muted-foreground">
                • PCOS/PCOD{"\n"}• Endometriosis{"\n"}• Menstrual Disorders
                {"\n"}• Prenatal/Postnatal Nutrition{"\n"}• Perimenopause & Post
                Menopause
              </Text>
            </CardContent>
          </Card>
        </View>
      </Section>

      <Section title="🌱 Our Approach">
        <Text className="text-muted-foreground mb-4 text-center">
          Detailed content about women's health management approach will be
          added here.
        </Text>
        <Card className="border-antar-pink/30 bg-antar-pink/10">
          <CardContent className="p-4">
            <Text className="text-antar-dark font-medium text-center">
              Comprehensive women's health solutions coming soon...
            </Text>
          </CardContent>
        </Card>
      </Section>

      <Section>
        <Button className="w-full bg-antar-pink border-antar-pink">
          <Text className="font-semibold text-antar-dark">
            Get Free Consultation
          </Text>
        </Button>
      </Section>
    </Screen>
  );
}
