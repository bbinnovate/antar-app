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
import GradientCTA from "~/components/custom/GradientCTA";
import Section from "~/components/custom/Section";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Circle, Path, Line } from "react-native-svg";

type FaceVariant = "bloat" | "irritated" | "tired" | "cycle" | "haywire";

const FaceIcon = ({ variant = "bloat" }: { variant?: FaceVariant }) => {
  const common = {
    stroke: "#FF772F",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  return (
    <Svg width={28} height={28} viewBox="0 0 24 24">
      <Circle cx={12} cy={12} r={9.5} fill="none" {...common} />
      {variant === "bloat" && (
        <>
          <Circle cx={9} cy={10} r={1} fill="#FF772F" />
          <Circle cx={15} cy={10} r={1} fill="#FF772F" />
          <Path d="M7.5 15c1 .8 2 .8 3 0s2-.8 3 0 2 .8 3 0" {...common} />
        </>
      )}
      {variant === "irritated" && (
        <>
          <Line x1={8.5} y1={9} x2={10.5} y2={11} {...common} />
          <Line x1={10.5} y1={9} x2={8.5} y2={11} {...common} />
          <Line x1={13.5} y1={9} x2={15.5} y2={11} {...common} />
          <Line x1={15.5} y1={9} x2={13.5} y2={11} {...common} />
          <Path d="M8.5 15.5c2 0 5 0 7 0" {...common} />
        </>
      )}
      {variant === "tired" && (
        <>
          <Line x1={8.5} y1={10} x2={10.5} y2={10} {...common} />
          <Line x1={13.5} y1={10} x2={15.5} y2={10} {...common} />
          <Path d="M9 15c1.5.8 4.5.8 6 0" {...common} />
        </>
      )}
      {variant === "cycle" && (
        <>
          <Circle cx={9} cy={10} r={1} fill="#FF772F" />
          <Circle cx={15} cy={10} r={1} fill="#FF772F" />
          <Path d="M9 16c1.5-1.5 4.5-1.5 6 0" {...common} />
        </>
      )}
      {variant === "haywire" && (
        <>
          <Circle cx={9} cy={10} r={1} fill="#FF772F" />
          <Circle cx={15} cy={10} r={1} fill="#FF772F" />
          <Path d="M9 15.5c2 0 4 0 6 0" {...common} />
        </>
      )}
    </Svg>
  );
};

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
          {/* Top Banner */}
          <View>
            <LinearGradient
              colors={["#6E863C", "#236A61", "#112F15"]}
              locations={[0, 0.55, 1]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                height: 160,
                borderRadius: 18,
                overflow: "hidden",
                position: "relative",
              }}
            >
              <View className="flex-1 items-center justify-center px-4">
                <Text className="text-white text-xl font-semibold">
                  Gut Health
                </Text>
              </View>
            </LinearGradient>
            <Text className="text-sm text-antar-dark mt-3">
              Your gut is your second brain seat of emotions, vitality and
              immunity. We address GERD/IBS, bloating and poor absorption by
              healing and rebuilding the gut and rekindling agni so body, mind
              and energy flow in harmony.
            </Text>
          </View>

          <Section title="This Program is Right for you">
            {(() => {
              const items: Array<{ text: string; variant: FaceVariant }> = [
                { text: "Bloated or gassy after meals", variant: "bloat" },
                {
                  text: "Sluggish, foggy or irritable for no reason",
                  variant: "irritated",
                },
                {
                  text: "Tired, even after a full night's sleep",
                  variant: "tired",
                },
                {
                  text: "Trapped in a cycle of reflux, constipation or IBS",
                  variant: "cycle",
                },
                {
                  text: "Feeling haywire with skin breakouts, mood swings",
                  variant: "haywire",
                },
              ];
              return (
                <View className="flex-row flex-wrap justify-between gap-y-4">
                  {items.map((it, idx) => (
                    <View key={idx} className={"w-[48%]"}>
                      <View className="border border-antar-orange rounded-2xl px-3 py-4 items-center justify-center bg-white">
                        <View className="w-12 h-12 rounded-full items-center justify-center border-2 border-antar-orange mb-2">
                          <FaceIcon variant={it.variant} />
                        </View>
                        <Text className="text-center text-sm text-antar-dark">
                          {it.text}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              );
            })()}
          </Section>

          <Section title="Our 5-Step Journey">
            {(() => {
              const steps = [
                {
                  title: "Call with Our Senior Nutritionist",
                  bullets: [
                    "Explore medical history, treatments & digestion patterns",
                    "Identify gut concerns & emotional triggers",
                  ],
                  emphasize: true,
                },
                {
                  title: "Recommended Medical Tests, If Needed",
                  bullets: [
                    "Blood panels for inflammation, nutrient deficiencies, hormonal health",
                    "If needed, tests for stool or microbiome to be done",
                  ],
                },
                {
                  title: "Your Personalized Gut Healing Plan",
                  bullets: [
                    "Cleanse, heal, and fortify with fruits, nuts & seeds, herbs & spices",
                    "3 live group sessions/week of yoga & nervous system reset practices",
                  ],
                },
                {
                  title: "Compassionate Weekly Support",
                  bullets: [
                    "Weekly follow calls with your assigned Nutritionist",
                    "WhatsApp support from Monday to Saturday",
                  ],
                },
                {
                  title: "Review & Celebration of Progress",
                  bullets: [
                    "Compare symptoms from day one to now",
                    "Reflect on changes in energy, mood, digestion, skin & sleep",
                  ],
                },
              ];

              const Check = () => (
                <Svg
                  width={16}
                  height={16}
                  viewBox="0 0 16 16"
                  style={{ marginTop: 2 }}
                >
                  <Circle cx={8} cy={8} r={8} fill="#2DBA65" />
                  <Path
                    d="M4 8.2 7 11l5-6"
                    stroke="#FFFFFF"
                    strokeWidth={1.8}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </Svg>
              );

              return (
                <View style={{ marginTop: 4, position: "relative" }}>
                  {/* Vertical connector line */}
                  <View
                    style={{
                      position: "absolute",
                      left: 15,
                      top: 6,
                      bottom: 0,
                      width: 2,
                      backgroundColor: "#FF772F",
                    }}
                  />

                  {steps.map((s, idx) => (
                    <View key={idx} className="mb-6">
                      {/* Title row with aligned dot */}
                      <View className="flex-row items-center">
                        <View style={{ width: 32, alignItems: "center" }}>
                          {idx === 0 ? (
                            <View
                              style={{
                                width: 24,
                                height: 24,
                                borderRadius: 12,
                                backgroundColor: "transparent",
                                borderWidth: 3,
                                borderColor: "#FF772F",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <View
                                style={{
                                  width: 14,
                                  height: 14,
                                  borderRadius: 7,
                                  backgroundColor: "#FF772F",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <View
                                  style={{
                                    width: 6,
                                    height: 6,
                                    borderRadius: 3,
                                    backgroundColor: "#FFFFFF",
                                  }}
                                />
                              </View>
                            </View>
                          ) : (
                            <View
                              style={{
                                width: 12,
                                height: 12,
                                borderRadius: 6,
                                backgroundColor: "#FF772F",
                              }}
                            />
                          )}
                        </View>
                        <Text
                          className={`font-semibold ${
                            s.emphasize
                              ? "text-antar-orange"
                              : "text-antar-dark"
                          } text-xl`}
                        >
                          {s.title}
                        </Text>
                      </View>

                      {/* Bullets indented under title */}
                      <View className="mt-2" style={{ marginLeft: 32 }}>
                        {s.bullets.map((b, bIdx) => (
                          <View
                            key={bIdx}
                            className="flex-row items-start mb-1.5"
                          >
                            <Check />
                            <Text className="text-sm text-antar-dark ml-2 flex-1">
                              {b}
                            </Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  ))}
                </View>
              );
            })()}
          </Section>

          <Section title="Plans That Fit Your Needs">
            {/* Offer label */}
            <View className="flex-row items-center mb-3 -mt-2">
              <Text className="text-antar-orange font-semibold text-sm animate-pulse">
                50% INAUGURAL OFFER
              </Text>
            </View>

            <View className="flex flex-col gap-5">
              {[
                {
                  months: "1 Month",
                  mrp: "₹14,000",
                  price: "₹7,000",
                  bullets: [
                    "4 Nutrition Consultations",
                    "12 Movement Therapy Sessions",
                    "2 Mental Wellness Sessions",
                  ],
                  url: "https://knowtheantar.com/products/antar-gut-health-program?variant=50851499245700",
                },
                {
                  months: "3 Month",
                  mrp: "₹38,000",
                  price: "₹19,000",
                  bullets: [
                    "12 Nutrition Consultations",
                    "36 Movement Therapy Sessions",
                    "6 Mental Wellness Sessions",
                  ],
                  url: "https://knowtheantar.com/products/antar-gut-health-program?variant=50851499278468",
                },
                {
                  months: "6 Month",
                  mrp: "₹72,000",
                  price: "₹36,000",
                  bullets: [
                    "24 Nutrition Consultations",
                    "72 Movement Therapy Sessions",
                    "12 Mental Wellness Sessions",
                  ],
                  url: "https://knowtheantar.com/products/antar-gut-health-program?variant=50851499311236",
                },
                {
                  months: "12 Month",
                  mrp: "₹134,000",
                  price: "₹67,000",
                  bullets: [
                    "48 Nutrition Consultations",
                    "144 Movement Therapy Sessions",
                    "24 Mental Wellness Sessions",
                  ],
                  url: "https://knowtheantar.com/products/antar-gut-health-program?variant=50851499344004",
                },
              ].map((p, idx) => (
                <View
                  key={idx}
                  className="rounded-2xl overflow-hidden bg-white border border-black/10 shadow-sm"
                >
                  {/* Header strip */}
                  <View className="bg-antar-orange px-4 py-3 rounded-t-2xl flex-row items-center justify-between">
                    <Text className="text-white font-semibold text-base">
                      {p.months}{" "}
                      <Text className="text-white/90 font-normal">
                        - All Inclusive
                      </Text>
                    </Text>
                    <View className="items-end">
                      <Text className="text-white/80 text-[11px] line-through">
                        {p.mrp}
                      </Text>
                      <Text className="text-white text-lg font-bold">
                        {p.price}
                      </Text>
                    </View>
                  </View>
                  {/* Body */}
                  <View className="px-4 py-4 bg-[#F8E6DA]">
                    <View className="gap-3">
                      {p.bullets.map((t, i) => (
                        <View key={i} className="flex-row">
                          <Text className="text-base mr-2 leading-5 text-antar-dark/80">
                            •
                          </Text>
                          <Text className="flex-1 text-sm text-antar-dark">
                            {t}
                          </Text>
                        </View>
                      ))}
                    </View>
                    <View className="items-center mt-4">
                      <GradientCTA
                        title="Book Now"
                        onPress={() => Linking.openURL(p.url)}
                        style={{ alignSelf: "center", paddingHorizontal: 24 }}
                      />
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </Section>

          <Section title="Expert Team">
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
            <LinearGradient
              colors={["#6E863C", "#236A61", "#112F15"]}
              locations={[0, 0.55, 1]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ borderRadius: 16, overflow: "hidden" }}
            >
              <View className="px-5 py-5 items-center">
                <Text className="text-white text-lg font-semibold text-center mb-1">
                  Free Consultation Available
                </Text>
                <Text className="text-white/90 text-center text-sm mb-3">
                  Start your healing journey with a personalized transformation
                  plan
                </Text>
                <GradientCTA
                  title="Book Free 1- on - 1 Consultation"
                  onPress={() =>
                    Linking.openURL(
                      "https://knowtheantar.com/pages/ailment-gut-health#contact_form-box"
                    )
                  }
                  style={{ alignSelf: "center", paddingHorizontal: 20 }}
                />
              </View>
            </LinearGradient>
          </Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
