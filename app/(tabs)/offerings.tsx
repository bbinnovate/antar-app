import * as React from "react";
import { View, ScrollView, Pressable, Linking } from "react-native";
import { Text } from "~/components/ui/text";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import DecoratedHeader from "~/components/custom/DecoratedHeader";
import Screen from "~/components/custom/Screen";
import Section from "~/components/custom/Section";
import { router } from "expo-router";

export default function OfferingsScreen() {
  return (
    <Screen>
      <DecoratedHeader
        title="Antar Offerings"
        subtitle="Transform your wellness journey with personalized experiences"
      />

      <View className="px-6">
        <View className="flex-row items-center justify-center mb-2">
          <Text className="text-2xl font-bold text-antar-orange mr-2">
            100K+
          </Text>
          <Text className="font-semibold text-antar-dark">Trusted Users</Text>
        </View>
        <Text className="text-xs text-muted-foreground text-center">
          Join thousands who have transformed their health with Antar
        </Text>
      </View>

      <Section title="">
        <View className="flex flex-col gap-3">
          <Card className="border-antar-teal/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-antar-teal">
                <Text className="text-lg font-semibold">
                  🏥 Ailment Management
                </Text>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Text className="text-muted-foreground mb-3">
                Comprehensive solutions for 8 major health areas using holistic
                approaches to identify and address root causes
              </Text>

              <Text className="text-sm font-medium text-antar-dark mb-3">
                8 Major Health Areas We Manage:
              </Text>

              <View className="flex flex-col gap-3 mb-4">
                <View className="flex-row gap-3">
                  <Pressable
                    className="flex-1"
                    onPress={() => router.push("/ailment/gut-health")}
                  >
                    <Card className="border-antar-teal/20">
                      <CardContent className="p-3">
                        <Text className="text-lg text-center mb-1">🦋</Text>
                        <Text className="font-semibold text-antar-dark text-center text-xs">
                          Gut Health
                        </Text>
                        <Text className="text-xs text-muted-foreground text-center mt-1">
                          GERD, IBS
                        </Text>
                      </CardContent>
                    </Card>
                  </Pressable>
                  <Pressable
                    className="flex-1"
                    onPress={() => router.push("/ailment/bone-joint")}
                  >
                    <Card className="border-antar-orange/20">
                      <CardContent className="p-3">
                        <Text className="text-lg text-center mb-1">🦴</Text>
                        <Text className="font-semibold text-antar-dark text-center text-xs">
                          Bone & Joint
                        </Text>
                        <Text className="text-xs text-muted-foreground text-center mt-1">
                          Arthritis
                        </Text>
                      </CardContent>
                    </Card>
                  </Pressable>
                </View>

                <View className="flex-row gap-3">
                  <Pressable
                    className="flex-1"
                    onPress={() => router.push("/ailment/metabolic")}
                  >
                    <Card className="border-antar-teal/20">
                      <CardContent className="p-3">
                        <Text className="text-lg text-center mb-1">⚡</Text>
                        <Text className="font-semibold text-antar-dark text-center text-xs">
                          Metabolic
                        </Text>
                        <Text className="text-xs text-muted-foreground text-center mt-1">
                          Diabetes
                        </Text>
                      </CardContent>
                    </Card>
                  </Pressable>
                  <Pressable
                    className="flex-1"
                    onPress={() => router.push("/ailment/womens-health")}
                  >
                    <Card className="border-antar-pink/30">
                      <CardContent className="p-3">
                        <Text className="text-lg text-center mb-1">🌸</Text>
                        <Text className="font-semibold text-antar-dark text-center text-xs">
                          Women's Health
                        </Text>
                        <Text className="text-xs text-muted-foreground text-center mt-1">
                          PCOS
                        </Text>
                      </CardContent>
                    </Card>
                  </Pressable>
                </View>

                <View className="flex-row gap-3">
                  <Pressable
                    className="flex-1"
                    onPress={() => router.push("/ailment/cardiovascular")}
                  >
                    <Card className="border-antar-orange/20">
                      <CardContent className="p-3">
                        <Text className="text-lg text-center mb-1">❤️</Text>
                        <Text className="font-semibold text-antar-dark text-center text-xs">
                          Cardiovascular
                        </Text>
                        <Text className="text-xs text-muted-foreground text-center mt-1">
                          Heart Disease
                        </Text>
                      </CardContent>
                    </Card>
                  </Pressable>
                  <Pressable
                    className="flex-1"
                    onPress={() => router.push("/ailment/liver-kidney")}
                  >
                    <Card className="border-antar-teal/20">
                      <CardContent className="p-3">
                        <Text className="text-lg text-center mb-1">🫁</Text>
                        <Text className="font-semibold text-antar-dark text-center text-xs">
                          Liver & Kidney
                        </Text>
                        <Text className="text-xs text-muted-foreground text-center mt-1">
                          Fatty Liver
                        </Text>
                      </CardContent>
                    </Card>
                  </Pressable>
                </View>

                <View className="flex-row gap-3">
                  <Pressable
                    className="flex-1"
                    onPress={() => router.push("/ailment/neurological")}
                  >
                    <Card className="border-antar-orange/20">
                      <CardContent className="p-3">
                        <Text className="text-lg text-center mb-1">🧠</Text>
                        <Text className="font-semibold text-antar-dark text-center text-xs">
                          Neurological
                        </Text>
                        <Text className="text-xs text-muted-foreground text-center mt-1">
                          Alzheimer's
                        </Text>
                      </CardContent>
                    </Card>
                  </Pressable>
                  <Pressable
                    className="flex-1"
                    onPress={() => router.push("/ailment/skin-health")}
                  >
                    <Card className="border-antar-pink/30">
                      <CardContent className="p-3">
                        <Text className="text-lg text-center mb-1">✨</Text>
                        <Text className="font-semibold text-antar-dark text-center text-xs">
                          Skin Health
                        </Text>
                        <Text className="text-xs text-muted-foreground text-center mt-1">
                          Acne, Psoriasis
                        </Text>
                      </CardContent>
                    </Card>
                  </Pressable>
                </View>
              </View>

              <Button
                className="w-full bg-antar-teal"
                onPress={() =>
                  Linking.openURL(
                    "https://knowtheantar.com/pages/ailment-management"
                  )
                }
              >
                <Text className="font-semibold text-white">
                  Get Free Consultation
                </Text>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-antar-teal/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-antar-teal">
                <Text className="text-lg font-semibold">🏥 Physiotherapy</Text>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Text className="text-muted-foreground mb-3">
                Evidence-based physical therapy treatments for movement
                restoration and pain management
              </Text>
              <Button
                className="w-full bg-antar-teal"
                onPress={() => router.push("/physiotherapy")}
              >
                <Text className="font-semibold text-white">Learn More</Text>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-antar-orange/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-antar-orange">
                <Text className="text-lg font-semibold">
                  🥗 Curative & Creative Nutrition
                </Text>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Text className="text-muted-foreground mb-3">
                Personalized nutrition plans that heal, nourish, and support
                your body's natural processes
              </Text>
              <Button
                className="w-full bg-antar-orange"
                onPress={() => router.push("/nutrition")}
              >
                <Text className="font-semibold text-white">Learn More</Text>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-antar-pink/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-antar-dark">
                <Text className="text-lg font-semibold">
                  🧠 Mental & Emotional Wellness
                </Text>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Text className="text-muted-foreground mb-3">
                Holistic mental health support through counseling, mindfulness,
                and emotional balance techniques
              </Text>
              <Button
                className="w-full bg-antar-pink border-antar-pink"
                onPress={() => router.push("/mental-wellness")}
              >
                <Text className="font-semibold text-antar-dark">
                  Start Healing
                </Text>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-antar-teal/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-antar-teal">
                <Text className="text-lg font-semibold">
                  🏃‍♂️ Optimal Movement Therapy
                </Text>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Text className="text-muted-foreground mb-3">
                Customized movement programs combining yoga, functional fitness,
                and therapeutic exercises
              </Text>
              <Button
                className="w-full bg-antar-teal"
                onPress={() => router.push("/optimal-movement")}
              >
                <Text className="font-semibold text-white">Begin Moving</Text>
              </Button>
            </CardContent>
          </Card>
        </View>
      </Section>

      <Section title="🎯 How It Works">
        <Text className="text-muted-foreground mb-4">
          Our proven 3-step process for sustainable wellness transformation
        </Text>
        <View className="flex flex-col gap-4">
          <Card className="border-antar-teal/20 bg-antar-teal/5">
            <CardContent className="p-4">
              <View className="flex-row items-center mb-2">
                <View className="w-8 h-8 rounded-full bg-antar-teal mr-3 items-center justify-center">
                  <Text className="text-white font-bold text-sm">1</Text>
                </View>
                <Text className="font-semibold text-antar-dark">
                  We start with YOU
                </Text>
              </View>
              <Text className="text-muted-foreground text-sm">
                Detailed one-on-one assessment of your blood parameters, medical
                history, lifestyle, and goals to understand what your body truly
                needs.
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
                  We build YOUR plan
                </Text>
              </View>
              <Text className="text-muted-foreground text-sm">
                Personalized, customized and individualized holistic roadmap
                rooted in modern science and ancient wisdom, crafted to fit your
                routine and preferences.
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
                  We walk WITH you
                </Text>
              </View>
              <Text className="text-muted-foreground text-sm">
                Stay on track with regular check-ins and daily WhatsApp support
                (9am-6pm IST). We're by your side to guide, motivate and support
                at every step.
              </Text>
            </CardContent>
          </Card>
        </View>
      </Section>

      <Section title="🌱 Prevention of Ailments">
        <Text className="text-muted-foreground mb-4">
          Proactive wellness programs to prevent health issues before they start
        </Text>
        <Card className="border-antar-teal/20 bg-antar-teal/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-antar-teal">
              <Text className="text-lg font-semibold">
                L.I.V Preventive Wellness Program
              </Text>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Text className="text-muted-foreground mb-3">
              Our sustainable approach focuses on identifying and addressing
              root causes to support your body's natural ability to heal and
              maintain optimal health.
            </Text>
            <Text className="text-xs text-antar-teal mb-3 font-medium">
              ✨ Cultivate longevity, immunity, and vitality
            </Text>
            <Button
              className="w-full bg-antar-teal"
              onPress={() => router.push("/liv-preventive")}
            >
              <Text className="font-semibold text-white">
                Explore L.I.V Program
              </Text>
            </Button>
          </CardContent>
        </Card>
      </Section>
    </Screen>
  );
}
