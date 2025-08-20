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

export default function NutritionScreen() {
  const [openFAQ, setOpenFAQ] = React.useState<number>(0); // First FAQ open by default

  const faqs = [
    {
      question: "Who is this program for?",
      answer:
        "Anyone dealing with chronic conditions, hormonal imbalances, low energy, emotional eating, or simply seeking a more conscious way of eating and living.",
    },
    {
      question: "What do I need to start?",
      answer:
        "Basic health history and any recent blood test reports. We'll guide you on what else may be needed during the first consultation.",
    },
    {
      question:
        "Is this suitable for someone with medical conditions like diabetes or PCOS?",
      answer:
        "Absolutely. Our Curative Nutrition protocol is thoughtfully crafted for conditions like diabetes, PCOS, thyroid issues, and more.",
    },
    {
      question: "Will I have to stop eating my favorite foods?",
      answer:
        "No. We creatively adapt your preferences into the plan while gently introducing healing foods and seasonal variations.",
    },
    {
      question: "Do I need to count calories or follow a strict meal plan?",
      answer:
        "Not at all. We move away from calorie counting. Your plan is flexible, intuitive, and aligned with your body's rhythms.",
    },
    {
      question: "What kind of support will I get during the program?",
      answer:
        "You'll have weekly check-in calls and ongoing WhatsApp chat support with your assigned expert for queries, guidance, and emotional accountability.",
    },
    {
      question: "Can I continue if I travel or have a busy work life?",
      answer:
        "Yes! The plan adapts to your routine - including travel, work stress, or lifestyle changes.",
    },
    {
      question: "How soon can I expect to see changes?",
      answer:
        "Many clients feel shifts in energy, digestion, and mood within the first 2–3 weeks. Deeper healing continues progressively with consistency.",
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
            Curative & Creative Nutrition
          </Text>
          <Text className="text-sm text-muted-foreground">
            Where food becomes wisdom
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="p-6 gap-6">
          {/* Social Proof */}
          <Section title="">
            <Card className="border-antar-orange/20 bg-antar-orange/5">
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
                  Transforming lives through conscious nutrition
                </Text>
              </CardContent>
            </Card>
          </Section>

          <Section title="🍃 What is Curative & Creative Nutrition?">
            <Text className="text-muted-foreground mb-4">
              At ANTAR, nutrition goes beyond calories and macros - it's an
              alchemy of healing, memory, energy, and emotion. Our approach
              blends sattvic principles, root-cause healing, and cellular
              regeneration to create a deeply personalized plan that not only
              helps in managing & improving your ailments but also supports your
              physical health, mental clarity, and emotional balance.
            </Text>
            <Text className="text-muted-foreground">
              This isn't a restrictive "diet" - it's a soulful, science-backed
              journey designed to help you manage ailments, rebuild immunity,
              regulate metabolic function, and experience profound wellness from
              within.
            </Text>
          </Section>

          <Section title="🎯 This Program is for You if You Have">
            <View className="flex flex-col gap-3">
              {[
                "🩸 Fluctuating blood pressure or heart health concerns",
                "💊 High cholesterol or imbalanced lipid profile",
                "📈 Blood sugar spikes, crashes, or insulin resistance",
                "⚖️ Unwanted weight gain or sluggish metabolism",
                "😴 Low energy, poor digestion, mood swings, or reduced quality of life",
              ].map((condition, idx) => (
                <Card key={idx} className="border-antar-teal/20">
                  <CardContent className="p-4">
                    <Text className="text-antar-dark">{condition}</Text>
                  </CardContent>
                </Card>
              ))}
            </View>
          </Section>

          <Section title="🏥 Conditions We Help You Heal">
            <View className="flex flex-col gap-4">
              <Card className="border-antar-pink/30 bg-antar-pink/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-antar-dark">
                    <Text className="text-lg font-semibold">
                      💃 Hormonal Health
                    </Text>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Text className="text-muted-foreground text-sm">
                    • PCOS & Hormonal Imbalances{"\n"}• Thyroid Conditions
                    (Hypothyroid, Hashimoto's){"\n"}• Menopause & Perimenopause
                    Transitions
                  </Text>
                </CardContent>
              </Card>

              <Card className="border-antar-orange/20 bg-antar-orange/5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-antar-orange">
                    <Text className="text-lg font-semibold">
                      ❤️ Heart & Metabolic Health
                    </Text>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Text className="text-muted-foreground text-sm">
                    • Diabetes & Insulin Resistance{"\n"}• Hypertension & Heart
                    Health{"\n"}• High Cholesterol & Triglycerides{"\n"}• Weight
                    Loss & Management
                  </Text>
                </CardContent>
              </Card>

              <Card className="border-antar-teal/20 bg-antar-teal/5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-antar-teal">
                    <Text className="text-lg font-semibold">
                      🧠 Mind & Energy
                    </Text>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Text className="text-muted-foreground text-sm">
                    • Chronic Fatigue & Brain Fog{"\n"}• Emotional Eating & Mood
                    Dysregulation
                  </Text>
                </CardContent>
              </Card>

              <Card className="border-antar-orange/20 bg-antar-orange/5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-antar-orange">
                    <Text className="text-lg font-semibold">
                      🦋 Gut & Digestive Health
                    </Text>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Text className="text-muted-foreground text-sm">
                    • IBS, Acidity, Bloating, Constipation
                  </Text>
                </CardContent>
              </Card>

              <Card className="border-antar-teal/20 bg-antar-teal/5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-antar-teal">
                    <Text className="text-lg font-semibold">
                      🛡️ Immune & Autoimmune
                    </Text>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Text className="text-muted-foreground text-sm">
                    • Autoimmune Conditions
                  </Text>
                </CardContent>
              </Card>

              <Card className="border-antar-pink/30 bg-antar-pink/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-antar-dark">
                    <Text className="text-lg font-semibold">
                      ✨ Skin Health
                    </Text>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Text className="text-muted-foreground text-sm">
                    • Skin Conditions like Eczema, Acne, Psoriasis
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
                      1-on-1 Virtual Consultation
                    </Text>
                  </View>
                  <Text className="text-muted-foreground text-sm">
                    Start with a 60 minute online session to explore your health
                    history, reports, symptoms, lifestyle, food habits,
                    emotional patterns, and body constitution (prakriti).
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
                      Receive Your Personalized Plan
                    </Text>
                  </View>
                  <Text className="text-muted-foreground text-sm">
                    Within 24-48 hours, you'll receive a personalized,
                    individualized and customized nutrition plan with multiple
                    meal options.
                  </Text>
                </CardContent>
              </Card>

              <Card className="border-antar-teal/20 bg-antar-teal/5">
                <CardContent className="p-4">
                  <View className="flex-row items-center mb-2">
                    <View className="w-8 h-8 rounded-full bg-antar-teal mr-3 items-center justify-center">
                      <Text className="text-white font-bold text-sm">3</Text>
                    </View>
                    <Text className="font-semibold text-antar-dark">
                      Continuous Support & Tracking
                    </Text>
                  </View>
                  <Text className="text-muted-foreground text-sm">
                    Stay supported with weekly follow-up calls and WhatsApp chat
                    access. We monitor your progress and adjust your plan as
                    your body evolves.
                  </Text>
                </CardContent>
              </Card>

              <Card className="border-antar-orange/20 bg-antar-orange/5">
                <CardContent className="p-4">
                  <View className="flex-row items-center mb-2">
                    <View className="w-8 h-8 rounded-full bg-antar-orange mr-3 items-center justify-center">
                      <Text className="text-white font-bold text-sm">4</Text>
                    </View>
                    <Text className="font-semibold text-antar-dark">
                      Sustainable Change Begins Here
                    </Text>
                  </View>
                  <Text className="text-muted-foreground text-sm">
                    Feel the impact - better digestion, balanced energy,
                    improved metabolism, and deeper connection with your body
                    and food.
                  </Text>
                </CardContent>
              </Card>
            </View>
          </Section>

          <Section title="🌟 Why Choose Our Program">
            <View className="flex flex-col gap-3">
              <Card className="border-antar-teal/20">
                <CardContent className="p-4">
                  <Text className="font-semibold text-antar-dark mb-2">
                    🧠 From Counting to Consciousness
                  </Text>
                  <Text className="text-muted-foreground text-sm">
                    We liberate you from burden of calorie counting by turning
                    food into a source of wisdom and joy.
                  </Text>
                </CardContent>
              </Card>

              <Card className="border-antar-orange/20">
                <CardContent className="p-4">
                  <Text className="font-semibold text-antar-dark mb-2">
                    🎯 Truly Bespoke Plans
                  </Text>
                  <Text className="text-muted-foreground text-sm">
                    Personalized nutrition rooted in your prakriti, health
                    history, and lifestyle.
                  </Text>
                </CardContent>
              </Card>

              <Card className="border-antar-pink/30">
                <CardContent className="p-4">
                  <Text className="font-semibold text-antar-dark mb-2">
                    🌿 Sattvic & Seasonal Living
                  </Text>
                  <Text className="text-muted-foreground text-sm">
                    Vedic-aligned nourishment tailored to your dosha, agni, and
                    emotional balance.
                  </Text>
                </CardContent>
              </Card>

              <Card className="border-antar-teal/20">
                <CardContent className="p-4">
                  <Text className="font-semibold text-antar-dark mb-2">
                    🌱 Root-Cause Healing
                  </Text>
                  <Text className="text-muted-foreground text-sm">
                    Addressing deep-rooted imbalances, not just surface-level
                    symptoms.
                  </Text>
                </CardContent>
              </Card>

              <Card className="border-antar-orange/20">
                <CardContent className="p-4">
                  <Text className="font-semibold text-antar-dark mb-2">
                    🎨 Creative Meets Curative
                  </Text>
                  <Text className="text-muted-foreground text-sm">
                    Wholesome, joyful meals that blend tradition with
                    evidence-based nutrition for cellular vitality.
                  </Text>
                </CardContent>
              </Card>

              <Card className="border-antar-teal/20">
                <CardContent className="p-4">
                  <Text className="font-semibold text-antar-dark mb-2">
                    💚 Unyielding Positivity
                  </Text>
                  <Text className="text-muted-foreground text-sm">
                    We guide you with compassion, not fear or shame.
                  </Text>
                </CardContent>
              </Card>

              <Card className="border-antar-orange/20">
                <CardContent className="p-4">
                  <Text className="font-semibold text-antar-dark mb-2">
                    ♻️ Sustainable Results
                  </Text>
                  <Text className="text-muted-foreground text-sm">
                    Long-term well-being without crash diets or calorie
                    obsession.
                  </Text>
                </CardContent>
              </Card>
            </View>
          </Section>

          <Section title="💰 Your Healing Journey Plans">
            <View className="mb-4 p-3 rounded-2xl bg-antar-orange/10 border border-antar-orange/20">
              <Text className="text-center font-bold text-antar-orange">
                🎉 50% OFF INAUGURAL OFFER
              </Text>
            </View>

            <View className="flex flex-col gap-4">
              <Card className="border-antar-teal/20 bg-antar-teal/5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-antar-teal">
                    <Text className="text-lg font-bold">1 Consultation</Text>
                  </CardTitle>
                  <View className="flex-row items-center">
                    <Text className="text-2xl font-bold text-antar-dark mr-2">
                      ₹1,500
                    </Text>
                    <Text className="text-lg text-muted-foreground line-through">
                      ₹3,000
                    </Text>
                  </View>
                </CardHeader>
                <CardContent>
                  <Text className="text-sm text-muted-foreground mb-2">
                    • 1-on-1 virtual 60 mins consultation{"\n"}• Customized,
                    individualized, personalized nutrition plan within 24-48
                    hours
                  </Text>
                  <Button
                    className="w-full bg-antar-teal"
                    onPress={() =>
                      Linking.openURL(
                        "https://knowtheantar.com/products/antars-curative-creative-program?variant=50878709432452"
                      )
                    }
                  >
                    <Text className="font-semibold text-white">
                      Book Your Plan Now
                    </Text>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-antar-orange/20 bg-antar-orange/5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-antar-orange">
                    <Text className="text-lg font-bold">1 Month Plan</Text>
                  </CardTitle>
                  <View className="flex-row items-center">
                    <Text className="text-2xl font-bold text-antar-dark mr-2">
                      ₹4,000
                    </Text>
                    <Text className="text-lg text-muted-foreground line-through">
                      ₹8,000
                    </Text>
                  </View>
                </CardHeader>
                <CardContent>
                  <Text className="text-sm text-muted-foreground mb-2">
                    • 1-on-1 virtual 60 mins consultation{"\n"}• Personalized
                    nutrition plan within 24-48 hours{"\n"}• Weekly follow up
                    calls{"\n"}• WhatsApp chat support
                  </Text>
                  <Button
                    className="w-full bg-antar-orange"
                    onPress={() =>
                      Linking.openURL(
                        "https://knowtheantar.com/products/antars-curative-creative-program?variant=50878709465220"
                      )
                    }
                  >
                    <Text className="font-semibold text-white">
                      Book Your Plan Now
                    </Text>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-antar-teal/20 bg-antar-teal/5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-antar-teal">
                    <Text className="text-lg font-bold">3 Months Plan</Text>
                  </CardTitle>
                  <View className="flex-row items-center">
                    <Text className="text-2xl font-bold text-antar-dark mr-2">
                      ₹10,000
                    </Text>
                    <Text className="text-lg text-muted-foreground line-through">
                      ₹20,000
                    </Text>
                  </View>
                </CardHeader>
                <CardContent>
                  <Text className="text-sm text-muted-foreground mb-2">
                    • 1-on-1 virtual 60 mins consultation{"\n"}• Personalized
                    nutrition plan within 24-48 hours{"\n"}• Weekly follow up
                    calls{"\n"}• WhatsApp chat support
                  </Text>
                  <Button
                    className="w-full bg-antar-teal"
                    onPress={() =>
                      Linking.openURL(
                        "https://knowtheantar.com/products/antars-curative-creative-program?variant=50878709497988"
                      )
                    }
                  >
                    <Text className="font-semibold text-white">
                      Book Your Plan Now
                    </Text>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-antar-orange/20 bg-antar-orange/5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-antar-orange">
                    <Text className="text-lg font-bold">6 Months Plan</Text>
                  </CardTitle>
                  <View className="flex-row items-center">
                    <Text className="text-2xl font-bold text-antar-dark mr-2">
                      ₹18,000
                    </Text>
                    <Text className="text-lg text-muted-foreground line-through">
                      ₹36,000
                    </Text>
                  </View>
                </CardHeader>
                <CardContent>
                  <Text className="text-sm text-muted-foreground mb-2">
                    • 1-on-1 virtual 60 mins consultation{"\n"}• Personalized
                    nutrition plan within 24-48 hours{"\n"}• Weekly follow up
                    calls{"\n"}• WhatsApp chat support
                  </Text>
                  <Button
                    className="w-full bg-antar-orange"
                    onPress={() =>
                      Linking.openURL(
                        "https://knowtheantar.com/products/antars-curative-creative-program?variant=50878709530756"
                      )
                    }
                  >
                    <Text className="font-semibold text-white">
                      Book Your Plan Now
                    </Text>
                  </Button>
                </CardContent>
              </Card>
            </View>
          </Section>

          <Section title="💬 Client Success Stories">
            <View className="flex flex-col gap-3">
              <Card className="border-antar-teal/20 bg-antar-teal/5">
                <CardContent className="p-4">
                  <Text className="text-muted-foreground text-sm mb-3 italic">
                    "For the first time, I feel nourished and not deprived. My
                    BP, sugar, and sleep improved within weeks."
                  </Text>
                  <Text className="font-semibold text-antar-dark text-xs">
                    Sameer R, 54 years
                  </Text>
                </CardContent>
              </Card>

              <Card className="border-antar-orange/20 bg-antar-orange/5">
                <CardContent className="p-4">
                  <Text className="text-muted-foreground text-sm mb-3 italic">
                    "This isn't just food, it's healing. I feel reconnected with
                    my body and my joy. Antar changed everything."
                  </Text>
                  <Text className="font-semibold text-antar-dark text-xs">
                    Meenal S, 40 years
                  </Text>
                </CardContent>
              </Card>
            </View>
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

          {/* <Section>
            <Card className="border-antar-teal/20 bg-antar-teal/5">
              <CardContent className="p-4">
                <Text className="font-semibold text-antar-dark text-center mb-2">
                  🩺 START WITH A FREE DISCOVERY CALL
                </Text>
                <Text className="text-muted-foreground text-center mb-3 text-sm">
                  Ready to Experience Absolute Wellness?
                </Text>
                <Button
                  className="w-full bg-antar-teal"
                  onPress={() =>
                    Linking.openURL(
                      "https://knowtheantar.com/pages/curative-creative-nutrition"
                    )
                  }
                >
                  <Text className="font-semibold text-white">
                    Book Free Discovery Call
                  </Text>
                </Button>
              </CardContent>
            </Card>
          </Section> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
