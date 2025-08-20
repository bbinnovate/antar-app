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

export default function LIVPreventiveScreen() {
  const [openFAQ, setOpenFAQ] = React.useState<number>(0); // First FAQ open by default

  const faqs = [
    {
      question:
        "Do I need prior experience with yoga, meditation, or wellness programs?",
      answer:
        "The L.I.V program is designed for everyone - whether you've never tried a wellness routine before or you've been practicing for years. Every session includes clear explanations, guided practices, and simple handouts you can follow at your own pace.",
    },
    {
      question: "What are the program dates?",
      answer:
        "Choose the upcoming batch that works best for your schedule. Batch 1: 1st September – 30th September, Batch 2: 15th September – 15th October",
    },
    {
      question: "When are the sessions held & what if I miss a session?",
      answer:
        "Our live sessions are held every Sunday, 10:00 AM – 11:30 AM (IST). If you happen to miss a session, don't worry, you'll receive the handout to catch up at your own pace. Additionally, our WhatsApp community and regular check-ins will keep you supported and on track.",
    },
    {
      question: "I'm very busy - will I be able to keep up?",
      answer:
        "Yes. The live sessions are just once a week, and the daily tools take only 10–15 minutes. The idea is to blend wellness into your life without overwhelming your schedule.",
    },
    {
      question: "What kind of results can I expect in 4 weeks?",
      answer:
        "Noticeable improvement in energy, digestion, mood stability, and sleep quality. You'll also gain practical skills to manage stress, eat more intuitively, and maintain a personal wellness rhythm long after the program ends.",
    },
    {
      question:
        "How is L.I.V different from other wellness challenges or detox plans?",
      answer:
        "L.I.V is not about drastic restrictions or short-term fixes. It's an education-based journey that builds lasting habits through gentle, consistent changes - combining nutrition, breath, movement, and emotional balance into one integrated approach.",
    },
    {
      question: "How do I enroll?",
      answer:
        "Simply register for our online program from any corner of the world, choose your batch, and you'll receive joining details and resources before the program begins.",
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
            L.I.V Preventive Wellness
          </Text>
          <Text className="text-sm text-muted-foreground">
            Thrive, Not Just Survive
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
                  Step into a rhythmic, conscious way of living
                </Text>
              </CardContent>
            </Card>
          </Section>

          <Section title="🌱 What is L.I.V?">
            <Text className="font-semibold text-antar-dark mb-3">
              L.I.V (Longevity, Immunity, Vitality) Program
            </Text>
            <Text className="text-muted-foreground mb-3">
              The L.I.V (Longevity, Immunity, Vitality) Program is a one-month
              guided online wellness journey that helps you enhance your health
              span and not just your lifespan.
            </Text>
            <Text className="text-muted-foreground">
              Whether you're navigating chronic fatigue, low moods, gut issues,
              or simply seeking a more grounded, intuitive life, this program
              offers both education and practical tools to reset from within and
              build sustainable well-being.
            </Text>
          </Section>

          <Section title="🎯 Why L.I.V?">
            <Text className="text-muted-foreground mb-4">
              L.I.V bridges that gap by fusing ancient wisdom with modern
              science, and guiding you to:
            </Text>
            <View className="flex flex-col gap-3">
              {[
                "🌅 Align your body's natural rhythm",
                "🧠 Rewire your stress response patterns",
                "🍽️ Eat with intelligence and awareness",
                "🧘 Move with breath and intention",
                "💚 Heal your gut, hormones and emotions",
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

          <Section title="👥 Who Is It For?">
            <View className="flex flex-col gap-3">
              {[
                "🏢 Urban professionals navigating chronic stress or burnout",
                "😴 Individuals experiencing fatigue, poor sleep, low moods, or digestive imbalances",
                "🧘 Wellness-aware individuals seeking holistic rhythm, not restriction",
                "🌱 First-timers to preventive wellness who are looking for guided, science-backed actionable tools",
              ].map((item, idx) => (
                <Card
                  key={idx}
                  className="border-antar-orange/20 bg-antar-orange/5"
                >
                  <CardContent className="p-4">
                    <Text className="text-antar-dark font-medium">{item}</Text>
                  </CardContent>
                </Card>
              ))}
            </View>
          </Section>

          <Section title="📅 The 4-Week L.I.V Journey">
            <View className="flex flex-col gap-4">
              <Card className="border-antar-teal/20 bg-antar-teal/5">
                <CardContent className="p-4">
                  <Text className="font-bold text-antar-teal mb-1">
                    WEEK 1 - LONGEVITY
                  </Text>
                  <Text className="font-semibold text-antar-dark text-sm">
                    Theme: Cellular Healing & Recalibration
                  </Text>
                </CardContent>
              </Card>

              <Card className="border-antar-orange/20 bg-antar-orange/5">
                <CardContent className="p-4">
                  <Text className="font-bold text-antar-orange mb-1">
                    WEEK 2 - IMMUNITY
                  </Text>
                  <Text className="font-semibold text-antar-dark text-sm">
                    Theme: Gut-Brain Axis & Emotional Defense
                  </Text>
                </CardContent>
              </Card>

              <Card className="border-antar-pink/30 bg-antar-pink/10">
                <CardContent className="p-4">
                  <Text className="font-bold text-antar-dark mb-1">
                    WEEK 3 - VITALITY
                  </Text>
                  <Text className="font-semibold text-antar-dark text-sm">
                    Theme: Reignite Energy, Hormonal Balance & Mental Clarity
                  </Text>
                </CardContent>
              </Card>

              <Card className="border-antar-teal/20 bg-antar-teal/5">
                <CardContent className="p-4">
                  <Text className="font-bold text-antar-teal mb-1">
                    WEEK 4 - RHYTHM
                  </Text>
                  <Text className="font-semibold text-antar-dark text-sm">
                    Theme: Rhythmic Integration & Sustainable Wellness
                  </Text>
                </CardContent>
              </Card>
            </View>
          </Section>

          <Section title="🛤️ How It Works">
            <View className="flex flex-col gap-4">
              <Card className="border-antar-teal/20 bg-antar-teal/5">
                <CardContent className="p-4">
                  <View className="flex-row items-center mb-2">
                    <View className="w-8 h-8 rounded-full bg-antar-teal mr-3 items-center justify-center">
                      <Text className="text-white font-bold text-sm">1</Text>
                    </View>
                    <Text className="font-semibold text-antar-dark">
                      Join the Monthly Guided Cohort
                    </Text>
                  </View>
                  <Text className="text-muted-foreground text-sm">
                    Attend 2 live Zoom sessions per week over 4 weeks. Each
                    60-minute session blends science-backed insights (gut
                    health, hormones, rhythms) with experiential tools like
                    breathwork, movement, and reflection.
                  </Text>
                </CardContent>
              </Card>

              <Card className="border-antar-orange/20 bg-antar-orange/5">
                <CardContent className="p-4">
                  <View className="flex-row items-center mb-2">
                    <View className="w-8 h-8 rounded-full bg-antar-orange mr-3 items-center justify-center">
                      <Text className="text-white font-bold text-sm">2</Text>
                    </View>
                    <Text className="font-semibold text-antar-dark">
                      Receive Post-Session Handouts
                    </Text>
                  </View>
                  <Text className="text-muted-foreground text-sm">
                    Get a concise takeaway after every session to deepen
                    understanding and guide your daily wellness rituals.
                  </Text>
                </CardContent>
              </Card>

              <Card className="border-antar-pink/30 bg-antar-pink/10">
                <CardContent className="p-4">
                  <View className="flex-row items-center mb-2">
                    <View className="w-8 h-8 rounded-full bg-antar-dark mr-3 items-center justify-center">
                      <Text className="text-white font-bold text-sm">3</Text>
                    </View>
                    <Text className="font-semibold text-antar-dark">
                      Weekly Wellness Toolkits
                    </Text>
                  </View>
                  <Text className="text-muted-foreground text-sm">
                    Access to curated audio guides, food-breath-movement
                    rituals, and reflection prompts to support consistent
                    practice and conscious integration.
                  </Text>
                </CardContent>
              </Card>

              <Card className="border-antar-teal/20 bg-antar-teal/5">
                <CardContent className="p-4">
                  <View className="flex-row items-center mb-2">
                    <View className="w-8 h-8 rounded-full bg-antar-teal mr-3 items-center justify-center">
                      <Text className="text-white font-bold text-sm">4</Text>
                    </View>
                    <Text className="font-semibold text-antar-dark">
                      Practice & Reflect Daily
                    </Text>
                  </View>
                  <Text className="text-muted-foreground text-sm">
                    Engage in simple, self-paced tools (just 10–15 mins a day)
                    to gradually shift your rhythm and embed wellness into daily
                    life.
                  </Text>
                </CardContent>
              </Card>

              <Card className="border-antar-orange/20 bg-antar-orange/5">
                <CardContent className="p-4">
                  <View className="flex-row items-center mb-2">
                    <View className="w-8 h-8 rounded-full bg-antar-orange mr-3 items-center justify-center">
                      <Text className="text-white font-bold text-sm">5</Text>
                    </View>
                    <Text className="font-semibold text-antar-dark">
                      Stay Supported in a WhatsApp Community
                    </Text>
                  </View>
                  <Text className="text-muted-foreground text-sm">
                    Get regular check-ins, habit nudges, and reflection prompts
                    to track progress and stay connected.
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
                  L.I.V Program
                </Text>

                <View className="flex-row items-center justify-center mb-3">
                  <Text className="text-3xl font-bold text-antar-dark mr-2">
                    ₹499
                  </Text>
                  <Text className="text-xl text-muted-foreground line-through">
                    ₹999
                  </Text>
                  <Text className="text-sm text-muted-foreground ml-2">
                    /month
                  </Text>
                </View>

                <View className="mb-4 p-3 rounded-lg bg-white/50 border border-antar-teal/20">
                  <Text className="text-center text-sm text-antar-dark font-medium">
                    🚀 This is not a crash course, it's a rhythm reset!
                  </Text>
                </View>

                <Button
                  className="w-full bg-antar-teal"
                  onPress={() =>
                    Linking.openURL(
                      "https://knowtheantar.com/products/antars-l-i-v-preventive-wellness-plan"
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
