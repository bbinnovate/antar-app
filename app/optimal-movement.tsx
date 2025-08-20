import * as React from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Linking,
  Pressable,
} from "react-native";
import { Text } from "~/components/ui/text";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import Section from "~/components/custom/Section";
import { router } from "expo-router";

export default function OptimalMovementScreen() {
  const [openFAQ, setOpenFAQ] = React.useState<number>(0); // First FAQ open by default

  const faqs = [
    {
      question: "Do I need prior yoga or fitness experience?",
      answer:
        "Not at all. This program is suitable for complete beginners as well as experienced practitioners. Every session is adapted to your body and comfort level.",
    },
    {
      question: "How often are sessions and how long do they last?",
      answer:
        "Sessions are typically held 2–3 times per week, each lasting 45–60 minutes. Frequency can be customized based on your schedule and progress.",
    },
    {
      question: "How is this different from a regular yoga class?",
      answer:
        "It's not a generic class. This is a therapeutic, 1-on-1 journey with breath-led movement and emotional support.",
    },
    {
      question: "What if I have an ongoing health condition or injury?",
      answer:
        "That's exactly where we begin. Your therapist will consider any health challenges during your assessment, and all practices will be designed to support your healing.",
    },
    {
      question: "Can I do this if I feel mentally or emotionally exhausted?",
      answer:
        "Absolutely. The program is built to support mental and emotional fatigue through calming breathwork and practice to regulate the nervous system.",
    },
    {
      question: "What space or equipment do I need?",
      answer:
        "Just a yoga mat, stable internet connection, and a quiet, comfortable space. Props like pillows, straps, or blocks are optional and will be guided based on your needs.",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Custom Header with Back Button */}
      <View className="flex-row items-center px-6 py-4 border-b border-border">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <Text className="text-2xl text-antar-teal">←</Text>
        </TouchableOpacity>
        <View className="flex-1">
          <Text className="text-xl font-bold text-antar-dark">
            Optimal Movement Therapy
          </Text>
          <Text className="text-sm text-muted-foreground">
            Where Movement Heals, Breath Restores and Stillness Transforms
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="p-6 gap-6">
          {/* Social Proof */}
          <Section title="">
            <Card className="border-antar-teal/20 bg-antar-teal/5">
              <CardContent className="p-4">
                <View className="flex-row items-center justify-center mb-2">
                  <Text className="text-2xl font-bold text-antar-orange mr-2">
                    100K+
                  </Text>
                  <Text className="font-semibold text-antar-dark">
                    Lives Touched
                  </Text>
                </View>
                <Text className="text-xs text-muted-foreground text-center">
                  Transforming lives through mindful movement therapy
                </Text>
              </CardContent>
            </Card>
          </Section>

          <Section title="🎯 This Program is for You If You Are">
            <View className="flex flex-col gap-3">
              {[
                "🚀 Wanting to move more but unsure where to start",
                "😴 Struggling with stress, fatigue, or burnout",
                "🩹 Recovering from illness or injury and need a gentle restart",
                "⚖️ Struggling with your weight & frustrated with no results",
                "💪 Seeking to build resilience (physically, mentally, and emotionally) without intense workouts",
              ].map((item, idx) => (
                <Card
                  key={idx}
                  className="border-antar-teal/20 bg-antar-teal/5"
                >
                  <CardContent className="p-4">
                    <Text className="text-antar-dark font-medium">{item}</Text>
                  </CardContent>
                </Card>
              ))}
            </View>
          </Section>

          <Section title="🌿 Why Choose Our Online Program?">
            <View className="flex flex-col gap-3">
              <Card className="border-antar-teal/20 bg-antar-teal/5">
                <CardContent className="p-4">
                  <Text className="font-semibold text-antar-dark mb-2">
                    🧬 Science Meets Soul
                  </Text>
                  <Text className="text-muted-foreground text-sm">
                    Rooted in anatomy, breath physiology and neuroregulation -
                    yet guided by intuition and presence.
                  </Text>
                </CardContent>
              </Card>

              <Card className="border-antar-orange/20 bg-antar-orange/5">
                <CardContent className="p-4">
                  <Text className="font-semibold text-antar-dark mb-2">
                    🌸 Gentle Yet Powerful
                  </Text>
                  <Text className="text-muted-foreground text-sm">
                    Designed to build strength, resilience and range - without
                    force or fatigue.
                  </Text>
                </CardContent>
              </Card>

              <Card className="border-antar-pink/30 bg-antar-pink/10">
                <CardContent className="p-4">
                  <Text className="font-semibold text-antar-dark mb-2">
                    🎯 Truly Personalized
                  </Text>
                  <Text className="text-muted-foreground text-sm">
                    Every session adapts to your physical capacity, energy
                    level, and emotional needs.
                  </Text>
                </CardContent>
              </Card>

              <Card className="border-antar-teal/20 bg-antar-teal/5">
                <CardContent className="p-4">
                  <Text className="font-semibold text-antar-dark mb-2">
                    🧘 More Than Movement
                  </Text>
                  <Text className="text-muted-foreground text-sm">
                    Breathwork, guided stillness and somatic awareness complete
                    each session, creating full-system balance.
                  </Text>
                </CardContent>
              </Card>

              <Card className="border-antar-orange/20 bg-antar-orange/5">
                <CardContent className="p-4">
                  <Text className="font-semibold text-antar-dark mb-2">
                    🛡️ Safe for Everyone
                  </Text>
                  <Text className="text-muted-foreground text-sm">
                    We don't rush to help you, rather help you slow down,
                    connect with your body to become a stronger version of
                    yourself.
                  </Text>
                </CardContent>
              </Card>
            </View>
          </Section>

          <Section title="🌟 What Makes This Approach Different?">
            <View className="flex flex-col gap-3">
              <Card className="border-antar-teal/20">
                <CardContent className="p-4">
                  <Text className="font-semibold text-antar-dark mb-2">
                    🌱 Embodied Awareness First
                  </Text>
                  <Text className="text-muted-foreground text-sm">
                    We begin by reconnecting you to your body - tuning asanas &
                    postures in poetry, rhythm in breath and somatic signals -
                    so that every movement feels safe and intentional.
                  </Text>
                </CardContent>
              </Card>

              <Card className="border-antar-orange/20">
                <CardContent className="p-4">
                  <Text className="font-semibold text-antar-dark mb-2">
                    💨 Integrated Breathwork
                  </Text>
                  <Text className="text-muted-foreground text-sm">
                    Breath becomes the bridge between body and mind. We use
                    pranayama, breath retraining and nervous system-aware
                    techniques to regulate, energize or calm.
                  </Text>
                </CardContent>
              </Card>

              <Card className="border-antar-pink/30">
                <CardContent className="p-4">
                  <Text className="font-semibold text-antar-dark mb-2">
                    💪 Mindful Strength & Mobility
                  </Text>
                  <Text className="text-muted-foreground text-sm">
                    Each movement practice is crafted to improve flexibility,
                    postural stability and muscular endurance - all while
                    staying connected to breath and intention.
                  </Text>
                </CardContent>
              </Card>

              <Card className="border-antar-teal/20">
                <CardContent className="p-4">
                  <Text className="font-semibold text-antar-dark mb-2">
                    🧠 Nervous System Rebalancing
                  </Text>
                  <Text className="text-muted-foreground text-sm">
                    All sessions weave in elements of regulation: slow rhythmic
                    movements, restorative holds and grounding practices that
                    support emotional well-being.
                  </Text>
                </CardContent>
              </Card>
            </View>
          </Section>

          <Section title="🗺️ Your Movement Journey with Antar">
            <View className="flex flex-col gap-4">
              <Card className="border-antar-teal/20 bg-antar-teal/5">
                <CardContent className="p-4">
                  <Text className="font-bold text-antar-teal mb-1">
                    PHASE 1: Reset & Regulate (Weeks 1–2)
                  </Text>
                  <Text className="font-semibold text-antar-dark mb-2">
                    Goal: Create safety. Ease tension. Rebuild inner connection.
                  </Text>
                  <Text className="text-muted-foreground text-sm">
                    Focus on grounding, gentle mobility, breath awareness and
                    vagal toning. Think nervous system care meets mindful
                    movement.
                  </Text>
                </CardContent>
              </Card>

              <Card className="border-antar-orange/20 bg-antar-orange/5">
                <CardContent className="p-4">
                  <Text className="font-bold text-antar-orange mb-1">
                    PHASE 2: Mobilize & Awaken (Weeks 2–4)
                  </Text>
                  <Text className="font-semibold text-antar-dark mb-2">
                    Goal: Restore fluidity. Activate connection.
                  </Text>
                  <Text className="text-muted-foreground text-sm">
                    Begin full-body joint mobilization, functional yoga postures
                    and breath-synced movement flows that awaken circulation and
                    control.
                  </Text>
                </CardContent>
              </Card>

              <Card className="border-antar-pink/30 bg-antar-pink/10">
                <CardContent className="p-4">
                  <Text className="font-bold text-antar-dark mb-1">
                    PHASE 3: Stabilize & Strengthen (Weeks 4–6)
                  </Text>
                  <Text className="font-semibold text-antar-dark mb-2">
                    Goal: Build strength with softness.
                  </Text>
                  <Text className="text-muted-foreground text-sm">
                    Layer in core activation, postural control and dynamic flows
                    that enhance muscular endurance while staying nervous-system
                    safe.
                  </Text>
                </CardContent>
              </Card>

              <Card className="border-antar-teal/20 bg-antar-teal/5">
                <CardContent className="p-4">
                  <Text className="font-bold text-antar-teal mb-1">
                    PHASE 4: Flow & Expand (Weeks 6–8)
                  </Text>
                  <Text className="font-semibold text-antar-dark mb-2">
                    Goal: Enhance coordination and capacity.
                  </Text>
                  <Text className="text-muted-foreground text-sm">
                    Explore seamless movement transitions, low-impact strength
                    training and balance-focused flows that challenge body and
                    breath.
                  </Text>
                </CardContent>
              </Card>

              <Card className="border-antar-orange/20 bg-antar-orange/5">
                <CardContent className="p-4">
                  <Text className="font-bold text-antar-orange mb-1">
                    PHASE 5: Embody & Evolve (Weeks 8–12+)
                  </Text>
                  <Text className="font-semibold text-antar-dark mb-2">
                    Goal: Thrive with grace and resilience.
                  </Text>
                  <Text className="text-muted-foreground text-sm">
                    You now move with clarity, control and calm. Sessions deepen
                    into breath mastery, meditative flow and customized strength
                    circuits aligned with your life goals.
                  </Text>
                </CardContent>
              </Card>
            </View>
          </Section>

          <Section title="💰 Pricing & Plans">
            <Card className="border-antar-orange/20 bg-antar-orange/5">
              <CardContent className="p-4">
                <View className="mb-4 p-3 rounded-2xl bg-antar-orange/10 border border-antar-orange/20">
                  <Text className="text-center font-bold text-antar-orange">
                    🎉 50% OFF INAUGURAL OFFER
                  </Text>
                </View>

                <Text className="text-center font-bold text-antar-dark text-lg mb-2">
                  1 Month Program
                </Text>

                <View className="flex-row items-center justify-center mb-3">
                  <Text className="text-3xl font-bold text-antar-dark mr-2">
                    ₹5,000
                  </Text>
                  <Text className="text-xl text-muted-foreground line-through">
                    ₹10,000
                  </Text>
                </View>

                <View className="mb-4 p-3 rounded-lg bg-white/50 border border-antar-teal/20">
                  <Text className="text-center text-sm text-antar-dark font-medium">
                    📅 Live 1-on-1 virtual sessions 3 times/week
                  </Text>
                </View>

                <Button
                  className="w-full bg-antar-teal"
                  onPress={() =>
                    Linking.openURL(
                      "https://knowtheantar.com/products/antars-optimal-movement-therapy-program?variant=50878725226628"
                    )
                  }
                >
                  <Text className="font-semibold text-white">
                    Book Your Plan Now
                  </Text>
                </Button>
              </CardContent>
            </Card>
          </Section>

          <Section title="📝 Frequently Asked Questions">
            <View className="flex flex-col gap-3">
              {faqs.map((faq, idx) => (
                <Card key={idx} className="border-antar-teal/20">
                  <CardContent className="p-0">
                    <Pressable
                      className="p-4 flex-row items-center justify-between"
                      onPress={() => setOpenFAQ(openFAQ === idx ? -1 : idx)}
                    >
                      <Text className="font-semibold text-antar-dark flex-1 pr-2 text-sm">
                        {faq.question}
                      </Text>
                      <Text className="text-antar-teal text-lg">
                        {openFAQ === idx ? "−" : "+"}
                      </Text>
                    </Pressable>
                    {openFAQ === idx && (
                      <View className="px-4 pb-4">
                        <Text className="text-muted-foreground text-sm">
                          {faq.answer}
                        </Text>
                      </View>
                    )}
                  </CardContent>
                </Card>
              ))}
            </View>
          </Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
