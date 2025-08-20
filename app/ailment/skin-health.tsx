import * as React from "react";
import { View } from "react-native";
import { Text } from "~/components/ui/text";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import DecoratedHeader from "~/components/custom/DecoratedHeader";
import Screen from "~/components/custom/Screen";
import Section from "~/components/custom/Section";

export default function SkinHealthScreen() {
  return (
    <Screen>
      <DecoratedHeader
        title="Skin Health"
        subtitle="Comprehensive skin wellness and dermatological care"
      />

      <Section title="✨ What We Manage">
        <View className="flex flex-col gap-3">
          <Card className="border-antar-pink/30">
            <CardContent className="p-4">
              <Text className="font-semibold text-antar-dark mb-2">
                Common Conditions:
              </Text>
              <Text className="text-muted-foreground">
                • Acne & Skin Breakouts{"\n"}• Vitiligo{"\n"}• Psoriasis{"\n"}•
                Eczema{"\n"}• Auto-immune Related Skin Concerns
              </Text>
            </CardContent>
          </Card>
        </View>
      </Section>

      <Section title="🌱 Our Approach">
        <Text className="text-muted-foreground mb-4 text-center">
          Detailed content about skin health management approach will be added
          here.
        </Text>
        <Card className="border-antar-pink/30 bg-antar-pink/10">
          <CardContent className="p-4">
            <Text className="text-antar-dark font-medium text-center">
              Comprehensive skin health solutions coming soon...
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
