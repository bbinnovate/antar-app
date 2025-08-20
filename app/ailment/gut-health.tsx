import * as React from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Text } from "~/components/ui/text";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import Section from "~/components/custom/Section";
import { router } from "expo-router";

export default function GutHealthScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Custom Header with Back Button */}
      <View className="flex-row items-center px-6 py-4 border-b border-border">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <Text className="text-2xl text-antar-teal">←</Text>
        </TouchableOpacity>
        <View className="flex-1">
          <Text className="text-xl font-bold text-antar-dark">
            Gut Health Program
          </Text>
          <Text className="text-sm text-muted-foreground">
            Comprehensive digestive wellness
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="p-6 gap-6">
          <Section title="🦋 What is the Gut Health Program?">
            <Text className="text-muted-foreground mb-4">
              At ANTAR, we view gut health as not just a digestive hub - it is
              your second brain, the seat of emotions, vitality and your
              immunity engine. Whether you're managing GERD, IBS, constipation,
              bloating, or poor nutrient absorption, our approach doesn't just
              suppress symptoms - we go beyond symptom control to heal & rebuild
              your gut and rekindle your agni (digestive fire) so that your
              body, mind and energy flow in harmony.
            </Text>
          </Section>

          <Section title="🎯 This Program is Right for You if You Feel">
            <View className="flex flex-col gap-3">
              {[
                "🤢 Bloated or gassy after meals",
                "😵‍💫 Sluggish, foggy or irritable for no reason",
                "😴 Tired, even after a full night's sleep",
                "🔄 Trapped in a cycle of reflux, constipation or IBS",
                "🌡️ Skin breakouts, mood swings or feeling haywire",
              ].map((symptom, idx) => (
                <Card key={idx} className="border-antar-teal/20">
                  <CardContent className="p-4">
                    <Text className="text-antar-dark">{symptom}</Text>
                  </CardContent>
                </Card>
              ))}
            </View>
          </Section>

          <Section title="🛤️ Our 5-Step Journey">
            <View className="flex flex-col gap-4">
              <Card className="border-antar-teal/20 bg-antar-teal/5">
                <CardContent className="p-4">
                  <View className="flex-row items-center mb-2">
                    <View className="w-8 h-8 rounded-full bg-antar-teal mr-3 items-center justify-center">
                      <Text className="text-white font-bold text-sm">1</Text>
                    </View>
                    <Text className="font-semibold text-antar-dark">
                      Call With Our Senior Nutritionist
                    </Text>
                  </View>
                  <Text className="text-muted-foreground text-sm mb-2">
                    Understand Your Body | Define Goals | Begin With Insight
                  </Text>
                  <Text className="text-xs text-antar-teal">
                    ✓ Explore medical history & digestion patterns {"\n"}✓
                    Identify gut concerns & emotional triggers {"\n"}✓ Set
                    clear, personalised healing goals
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
                      Recommended Medical Tests (If Needed)
                    </Text>
                  </View>
                  <Text className="text-muted-foreground text-sm mb-2">
                    Root Cause Diagnosis | Biomarker Insights | Precision Care
                  </Text>
                  <Text className="text-xs text-antar-orange">
                    ✓ Blood panels for inflammation & nutrient deficiencies{" "}
                    {"\n"}✓ Stool or microbiome tests if needed {"\n"}✓
                    Expert-reviewed reports for precise planning
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
                      Your Personalized Gut Healing Plan
                    </Text>
                  </View>
                  <Text className="text-muted-foreground text-sm mb-2">
                    Tailored to You | Rooted in Wisdom | Backed by Science
                  </Text>
                  <Text className="text-xs text-antar-teal">
                    ✓ Cleanse, heal & fortify with natural foods {"\n"}✓ 3 live
                    group sessions/week of yoga practices {"\n"}✓ Counselling &
                    daily practices to calm gut-brain axis
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
                      Compassionate Weekly Support
                    </Text>
                  </View>
                  <Text className="text-muted-foreground text-sm mb-2">
                    Real-Time Guidance | Hand-holding | Expert Care
                  </Text>
                  <Text className="text-xs text-antar-orange">
                    ✓ Weekly follow-up calls with nutritionist {"\n"}✓ WhatsApp
                    support Monday to Saturday {"\n"}✓ Adjustments as your body
                    evolves and heals
                  </Text>
                </CardContent>
              </Card>

              <Card className="border-antar-pink/30 bg-antar-pink/10">
                <CardContent className="p-4">
                  <View className="flex-row items-center mb-2">
                    <View className="w-8 h-8 rounded-full bg-antar-dark mr-3 items-center justify-center">
                      <Text className="text-white font-bold text-sm">5</Text>
                    </View>
                    <Text className="font-semibold text-antar-dark">
                      Review & Celebration of Progress
                    </Text>
                  </View>
                  <Text className="text-muted-foreground text-sm mb-2">
                    Reflect | Integrate | Sustain
                  </Text>
                  <Text className="text-xs text-antar-dark">
                    ✓ Compare symptoms from day one to now {"\n"}✓ Reflect on
                    changes in energy, mood, digestion {"\n"}✓ Track
                    improvements in skin & sleep quality
                  </Text>
                </CardContent>
              </Card>
            </View>
          </Section>

          <Section title="🌱 Antar's Gut Healing Method">
            <Text className="text-muted-foreground mb-4">
              We don't offer generic diets or pills. We offer deep, lasting
              healing through:
            </Text>
            <View className="flex flex-col gap-3">
              <Card className="border-antar-teal/20">
                <CardContent className="p-4">
                  <Text className="font-semibold text-antar-dark mb-2">
                    🥗 Curative & Creative Nutrition
                  </Text>
                  <Text className="text-muted-foreground text-sm">
                    • Gut-healing foods based on regional preference{"\n"}• Pre
                    and probiotic food to rebuild gut microbiome{"\n"}•
                    Hydration boosting techniques
                  </Text>
                </CardContent>
              </Card>

              <Card className="border-antar-orange/20">
                <CardContent className="p-4">
                  <Text className="font-semibold text-antar-dark mb-2">
                    🏃‍♂️ Optimal Movement Therapy
                  </Text>
                  <Text className="text-muted-foreground text-sm">
                    • Therapeutic asanas that aid digestion{"\n"}• Stimulate
                    vagus nerve and gut-brain axis{"\n"}• Safe and adaptable for
                    all fitness levels
                  </Text>
                </CardContent>
              </Card>

              <Card className="border-antar-pink/30">
                <CardContent className="p-4">
                  <Text className="font-semibold text-antar-dark mb-2">
                    🧠 Mental & Emotional Wellness
                  </Text>
                  <Text className="text-muted-foreground text-sm">
                    • Release trapped emotions that disrupt gut function{"\n"}•
                    Breathwork, yoga nidra and stillness practices{"\n"}•
                    Cortisol and nervous system regulation
                  </Text>
                </CardContent>
              </Card>

              <Card className="border-antar-teal/20">
                <CardContent className="p-4">
                  <Text className="font-semibold text-antar-dark mb-2">
                    🔄 Lifestyle & Rituals
                  </Text>
                  <Text className="text-muted-foreground text-sm">
                    • Sleep and stress management{"\n"}• Align circadian rhythm
                    and digestive cycles{"\n"}• Turn everyday habits into
                    healing rituals
                  </Text>
                </CardContent>
              </Card>
            </View>
          </Section>

          <Section title="💰 Plans That Fit Your Needs">
            <View className="mb-4 p-3 rounded-2xl bg-antar-orange/10 border border-antar-orange/20">
              <Text className="text-center font-bold text-antar-orange">
                🎉 50% OFF INAUGURAL OFFER
              </Text>
            </View>

            <View className="flex flex-col gap-4">
              <Card className="border-antar-teal/20 bg-antar-teal/5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-antar-teal">
                    <Text className="text-lg font-bold">
                      1 Month - All Inclusive
                    </Text>
                  </CardTitle>
                  <View className="flex-row items-center">
                    <Text className="text-2xl font-bold text-antar-dark mr-2">
                      ₹7,000
                    </Text>
                    <Text className="text-lg text-muted-foreground line-through">
                      ₹14,000
                    </Text>
                  </View>
                </CardHeader>
                <CardContent>
                  <Text className="text-sm text-muted-foreground mb-2">
                    • 4 Nutrition Consultations{"\n"}• 12 Movement Therapy
                    Sessions
                    {"\n"}• 2 Mental Wellness Sessions
                  </Text>
                  <Button
                    className="w-full bg-antar-teal"
                    onPress={() =>
                      Linking.openURL(
                        "https://knowtheantar.com/products/antar-gut-health-program?variant=50851499245700"
                      )
                    }
                  >
                    <Text className="font-semibold text-white">Book Now</Text>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-antar-orange/20 bg-antar-orange/5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-antar-orange">
                    <Text className="text-lg font-bold">
                      3 Months - All Inclusive
                    </Text>
                  </CardTitle>
                  <View className="flex-row items-center">
                    <Text className="text-2xl font-bold text-antar-dark mr-2">
                      ₹19,000
                    </Text>
                    <Text className="text-lg text-muted-foreground line-through">
                      ₹38,000
                    </Text>
                  </View>
                </CardHeader>
                <CardContent>
                  <Text className="text-sm text-muted-foreground mb-2">
                    • 12 Nutrition Consultations{"\n"}• 36 Movement Therapy
                    Sessions
                    {"\n"}• 6 Mental Wellness Sessions
                  </Text>
                  <Button
                    className="w-full bg-antar-orange"
                    onPress={() =>
                      Linking.openURL(
                        "https://knowtheantar.com/products/antar-gut-health-program?variant=50851499278468"
                      )
                    }
                  >
                    <Text className="font-semibold text-white">Book Now</Text>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-antar-teal/20 bg-antar-teal/5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-antar-teal">
                    <Text className="text-lg font-bold">
                      6 Months - All Inclusive
                    </Text>
                  </CardTitle>
                  <View className="flex-row items-center">
                    <Text className="text-2xl font-bold text-antar-dark mr-2">
                      ₹36,000
                    </Text>
                    <Text className="text-lg text-muted-foreground line-through">
                      ₹72,000
                    </Text>
                  </View>
                </CardHeader>
                <CardContent>
                  <Text className="text-sm text-muted-foreground mb-2">
                    • 24 Nutrition Consultations{"\n"}• 72 Movement Therapy
                    Sessions
                    {"\n"}• 12 Mental Wellness Sessions
                  </Text>
                  <Button
                    className="w-full bg-antar-teal"
                    onPress={() =>
                      Linking.openURL(
                        "https://knowtheantar.com/products/antar-gut-health-program?variant=50851499311236"
                      )
                    }
                  >
                    <Text className="font-semibold text-white">Book Now</Text>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-antar-orange/20 bg-antar-orange/5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-antar-orange">
                    <Text className="text-lg font-bold">
                      12 Months - All Inclusive
                    </Text>
                  </CardTitle>
                  <View className="flex-row items-center">
                    <Text className="text-2xl font-bold text-antar-dark mr-2">
                      ₹67,000
                    </Text>
                    <Text className="text-lg text-muted-foreground line-through">
                      ₹134,000
                    </Text>
                  </View>
                </CardHeader>
                <CardContent>
                  <Text className="text-sm text-muted-foreground mb-2">
                    • 48 Nutrition Consultations{"\n"}• 144 Movement Therapy
                    Sessions
                    {"\n"}• 24 Mental Wellness Sessions
                  </Text>
                  <Button
                    className="w-full bg-antar-orange"
                    onPress={() =>
                      Linking.openURL(
                        "https://knowtheantar.com/products/antar-gut-health-program?variant=50851499344004"
                      )
                    }
                  >
                    <Text className="font-semibold text-white">Book Now</Text>
                  </Button>
                </CardContent>
              </Card>
            </View>
          </Section>

          <Section title="👨‍⚕️ Expert Team">
            <View className="flex flex-row flex-wrap gap-3">
              {[
                {
                  name: "Dr. Richa Bhaskarwar",
                  role: "Physiotherapist (MPT)",
                  exp: "10+ Years",
                },
                {
                  name: "Shreeta Jain",
                  role: "Psychologist (Clinical)",
                  exp: "10+ Years",
                },
                {
                  name: "Nisha Amin",
                  role: "Senior Clinical Nutritionist",
                  exp: "20+ Years",
                },
                {
                  name: "Gorsi Zaveri Shah",
                  role: "Senior Clinical Nutritionist",
                  exp: "12+ Years",
                },
                {
                  name: "Deepal Modi",
                  role: "Senior Yoga Therapist",
                  exp: "15+ Years",
                },
                {
                  name: "Keerthi Badri",
                  role: "Senior Nutritionist",
                  exp: "12+ Years",
                },
              ].map((expert, idx) => (
                <Card
                  key={idx}
                  className="border-antar-teal/20 flex-1 min-w-[45%]"
                >
                  <CardContent className="p-3">
                    <Text className="font-semibold text-antar-dark text-sm">
                      {expert.name}
                    </Text>
                    <Text className="text-xs text-muted-foreground">
                      {expert.role}
                    </Text>
                    <Text className="text-xs text-antar-teal">
                      {expert.exp} of Experience
                    </Text>
                  </CardContent>
                </Card>
              ))}
            </View>
          </Section>

          <Section>
            <Card className="border-antar-teal/20 bg-antar-teal/5">
              <CardContent className="p-4">
                <Text className="font-semibold text-antar-dark text-center mb-2">
                  🩺 FREE Consultation Available
                </Text>
                <Text className="text-muted-foreground text-center mb-3 text-sm">
                  Start your healing journey with a personalized transformation
                  plan
                </Text>
                <Button
                  className="w-full bg-antar-teal"
                  onPress={() =>
                    Linking.openURL(
                      "https://knowtheantar.com/pages/ailment-gut-health#contact_form-box"
                    )
                  }
                >
                  <Text className="font-semibold text-white">
                    Book Free 1-on-1 Consultation
                  </Text>
                </Button>
              </CardContent>
            </Card>
          </Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
