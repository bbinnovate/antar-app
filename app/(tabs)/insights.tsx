import * as React from "react";
import { View, ScrollView } from "react-native";
import { Text } from "~/components/ui/text";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import DecoratedHeader from "~/components/custom/DecoratedHeader";
import Screen from "~/components/custom/Screen";
import Section from "~/components/custom/Section";

export default function InsightsScreen() {
  return (
    <Screen>
      <DecoratedHeader
        title="Wellness Insights"
        subtitle="Ancient wisdom meets modern science for transformative knowledge"
      />

      <Section title="🧠 Mind & Philosophy">
        <View className="flex flex-col gap-3">
          <Card className="border-antar-teal/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-antar-teal">
                <Text className="text-lg font-semibold">Vedic Wisdom</Text>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Text className="text-muted-foreground mb-3">
                Explore ancient Indian philosophy and its relevance to modern
                wellness
              </Text>
              <View className="flex-row justify-between items-center mb-3">
                <Text className="text-xs text-antar-teal font-medium">
                  12 Articles
                </Text>
                <Text className="text-xs text-muted-foreground">
                  Updated Daily
                </Text>
              </View>
              <Button className="w-full bg-antar-teal">
                <Text className="font-semibold text-white">Explore Wisdom</Text>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-antar-orange/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-antar-orange">
                <Text className="text-lg font-semibold">
                  Mindfulness Research
                </Text>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Text className="text-muted-foreground mb-3">
                Latest scientific research on meditation and mindfulness
                benefits
              </Text>
              <View className="flex-row justify-between items-center mb-3">
                <Text className="text-xs text-antar-orange font-medium">
                  8 Studies
                </Text>
                <Text className="text-xs text-muted-foreground">
                  Weekly Updates
                </Text>
              </View>
              <Button className="w-full bg-antar-orange">
                <Text className="font-semibold text-white">Read Research</Text>
              </Button>
            </CardContent>
          </Card>
        </View>
      </Section>

      <Section title="💪 Body & Health">
        <View className="flex flex-col gap-3">
          <Card className="border-antar-teal/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-antar-teal">
                <Text className="text-lg font-semibold">
                  Ayurvedic Nutrition
                </Text>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Text className="text-muted-foreground mb-3">
                Understanding your body type and personalized nutrition guidance
              </Text>
              <Button className="w-full bg-antar-teal">
                <Text className="font-semibold text-white">Learn More</Text>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-antar-orange/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-antar-orange">
                <Text className="text-lg font-semibold">Movement Science</Text>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Text className="text-muted-foreground mb-3">
                How yoga and functional movement transform your physical health
              </Text>
              <Button className="w-full bg-antar-orange">
                <Text className="font-semibold text-white">
                  Discover Science
                </Text>
              </Button>
            </CardContent>
          </Card>
        </View>
      </Section>

      <Section title="❤️ Emotional Intelligence">
        <View className="flex flex-col gap-3">
          <Card className="border-antar-pink/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-antar-dark">
                <Text className="text-lg font-semibold">
                  Understanding Emotions
                </Text>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Text className="text-muted-foreground mb-3">
                Learn to recognize, understand, and transform your emotional
                patterns
              </Text>
              <Button className="w-full bg-antar-pink border-antar-pink">
                <Text className="font-semibold text-antar-dark">
                  Explore Emotions
                </Text>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-antar-teal/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-antar-teal">
                <Text className="text-lg font-semibold">
                  Stress & Resilience
                </Text>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Text className="text-muted-foreground mb-3">
                Build mental resilience and learn healthy stress management
                techniques
              </Text>
              <Button className="w-full bg-antar-teal">
                <Text className="font-semibold text-white">
                  Build Resilience
                </Text>
              </Button>
            </CardContent>
          </Card>
        </View>
      </Section>

      <Section title="📚 Knowledge Library">
        <View className="flex flex-col gap-3">
          <Card className="border-antar-teal/20 bg-antar-teal/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-antar-teal">
                <Text className="text-lg font-semibold">
                  Dr. Mickey Mehta's Teachings
                </Text>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Text className="text-muted-foreground mb-3">
                Exclusive insights and teachings from India's pioneer of
                holistic health
              </Text>
              <View className="flex-row justify-between items-center mb-3">
                <Text className="text-xs text-antar-teal font-medium">
                  25+ Teachings
                </Text>
                <Text className="text-xs text-muted-foreground">
                  New Weekly
                </Text>
              </View>
              <Button className="w-full bg-antar-teal">
                <Text className="font-semibold text-white">Access Library</Text>
              </Button>
            </CardContent>
          </Card>

          <View className="flex-row gap-3">
            <Card className="flex-1 border-antar-orange/20">
              <CardContent className="p-4">
                <Text className="text-2xl font-bold text-antar-orange text-center">
                  150+
                </Text>
                <Text className="text-xs text-muted-foreground text-center mt-1">
                  Articles
                </Text>
              </CardContent>
            </Card>
            <Card className="flex-1 border-antar-teal/20">
              <CardContent className="p-4">
                <Text className="text-2xl font-bold text-antar-teal text-center">
                  50+
                </Text>
                <Text className="text-xs text-muted-foreground text-center mt-1">
                  Videos
                </Text>
              </CardContent>
            </Card>
            <Card className="flex-1 border-antar-pink/30">
              <CardContent className="p-4">
                <Text className="text-2xl font-bold text-antar-dark text-center">
                  25+
                </Text>
                <Text className="text-xs text-muted-foreground text-center mt-1">
                  Guides
                </Text>
              </CardContent>
            </Card>
          </View>
        </View>
      </Section>
    </Screen>
  );
}

