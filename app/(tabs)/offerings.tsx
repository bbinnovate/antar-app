import * as React from "react";
import { View, ScrollView, Pressable, Linking, Image } from "react-native";
import { Text } from "~/components/ui/text";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { LinearGradient } from "expo-linear-gradient";
import Screen from "~/components/custom/Screen";
import Section from "~/components/custom/Section";
import GradientCTA from "~/components/custom/GradientCTA";
import { router } from "expo-router";
import { ArrowRight } from "lucide-react-native";
import Svg, { Path, Circle, Line } from "react-native-svg";

type AttendedCardProps = {
  title: string;
  subtitle: string;
  image: any;
  route: string;
};

const AttendedCard = ({ title, subtitle, image, route }: AttendedCardProps) => {
  return (
    <Pressable onPress={() => router.push(route as any)} className="w-full">
      <LinearGradient
        colors={["#6E863C", "#236A61", "#112F15"]}
        locations={[0, 0.55, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ borderRadius: 18, overflow: "hidden", position: "relative" }}
      >
        <View className="flex-row items-center p-3">
          <Image
            source={image}
            style={{ width: 96, height: 96, borderRadius: 12 }}
            resizeMode="cover"
          />
          <View className="flex-1 ml-3">
            <Text className="text-white text-lg font-extrabold">{title}</Text>
            <View className="h-[1px] bg-white/40 my-2" />
            <Text className="text-white text-sm">{subtitle}</Text>
          </View>
        </View>
      </LinearGradient>
    </Pressable>
  );
};

export default function OfferingsScreen() {
  return (
    <Screen>
      {/* Inline gradient header (no separate component) */}
      <View className="w-full mt-2">
        <LinearGradient
          colors={["#6E863C", "#236A61", "#112F15"]}
          locations={[0, 0.55, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            borderRadius: 16,
            position: "relative",
            paddingVertical: 20,
            paddingHorizontal: 20,
          }}
        >
          <Text className="text-white text-xl font-bold text-center">
            Antar Offerings
          </Text>
          <Text className="text-white/90 text-sm font-medium text-center mt-2 leading-5 px-2">
            Transform your wellness journey with personalized experiences
          </Text>
        </LinearGradient>
      </View>

      {/* Ailment Management Section */}
      <Section
        title="Ailment Management"
        subtitle="Comprehensive solutions for 8 major health areas using holistic approaches to identify and address root causes"
      >
        <View className="flex flex-col gap-3 mb-4 mt-1">
          {(() => {
            const items = [
              {
                key: "bone-joint",
                label: "Bone & Joint",
                route: "/ailment/bone-joint",
                icon: "bone",
              },
              {
                key: "gut-health",
                label: "Gut Health",
                route: "/ailment/gut-health",
                icon: "gut",
              },
              {
                key: "metabolic",
                label: "Metabolic Health",
                route: "/ailment/metabolic",
                icon: "metabolic",
              },
              {
                key: "liver-kidney",
                label: "Liver & Kidney",
                route: "/ailment/liver-kidney",
                icon: "liver",
              },
              {
                key: "cardiovascular",
                label: "Cardiovascular",
                route: "/ailment/cardiovascular",
                icon: "heart",
              },
              {
                key: "neurological",
                label: "Neurological Health",
                route: "/ailment/neurological",
                icon: "brain",
              },
              {
                key: "skin",
                label: "Skin Health",
                route: "/ailment/skin-health",
                icon: "skin",
              },
              {
                key: "women",
                label: "Women's Health",
                route: "/ailment/womens-health",
                icon: "women",
              },
            ];

            const Icon = ({ name }: { name: string }) => {
              const common = {
                stroke: "#FFFFFF",
                strokeWidth: 1.8,
                strokeLinecap: "round" as const,
                strokeLinejoin: "round" as const,
              };
              switch (name) {
                case "bone":
                  return (
                    <Svg width={26} height={26} viewBox="0 0 24 24">
                      <Path
                        d="M7 14.5 14.5 7M9.5 5.5a2.5 2.5 0 1 0-4 3 2.5 2.5 0 1 0 3 4 2.5 2.5 0 1 0 4 3 2.5 2.5 0 1 0 3-4 2.5 2.5 0 1 0-4-3"
                        fill="none"
                        {...common}
                      />
                    </Svg>
                  );
                case "gut":
                  return (
                    <Svg width={26} height={26} viewBox="0 0 24 24">
                      <Path
                        d="M8 4v11a3 3 0 0 0 6 0V7a2 2 0 0 1 4 0v6a6 6 0 0 1-12 0V6a3 3 0 0 0-3 3v3"
                        fill="none"
                        {...common}
                      />
                    </Svg>
                  );
                case "metabolic":
                  return (
                    <Svg width={26} height={26} viewBox="0 0 24 24">
                      <Circle cx={12} cy={12} r={5.5} {...common} fill="none" />
                      <Circle cx={12} cy={6} r={1.5} fill="#FFFFFF" />
                      <Circle cx={16.5} cy={12} r={1.5} fill="#FFFFFF" />
                      <Circle cx={12} cy={18} r={1.5} fill="#FFFFFF" />
                      <Circle cx={7.5} cy={12} r={1.5} fill="#FFFFFF" />
                    </Svg>
                  );
                case "liver":
                  return (
                    <Svg width={26} height={26} viewBox="0 0 24 24">
                      <Path
                        d="M3.5 13.5c1-5 4-8 9.5-8h3a4 4 0 0 1 4 5.5l-.8 2.1A6 6 0 0 1 13.5 18h-1c-2.5 0-5.5-1-8-4.5Z"
                        fill="none"
                        {...common}
                      />
                      <Path d="M14 9a2 2 0 0 0-2 2v3" {...common} />
                    </Svg>
                  );
                case "heart":
                  return (
                    <Svg width={26} height={26} viewBox="0 0 24 24">
                      <Path
                        d="M12 20s-5.5-4.5-8-7.7C1.7 10.2 2 6.5 5 5.2c2.2-.9 4.1.3 5 1.6 1-1.3 2.8-2.5 5-1.6 3 1.3 3.3 5 1 7.1-2.5 3.2-8 7.7-8 7.7Z"
                        fill="none"
                        {...common}
                      />
                    </Svg>
                  );
                case "brain":
                  return (
                    <Svg width={26} height={26} viewBox="0 0 24 24">
                      <Path
                        d="M9 5a3 3 0 0 0-3 3v1.2a3 3 0 0 0 0 5.6V16a3 3 0 0 0 3 3h1V5H9Zm5 0h1a3 3 0 0 1 3 3v1.2a3 3 0 0 1 0 5.6V16a3 3 0 0 1-3 3h-1V5Z"
                        fill="none"
                        {...common}
                      />
                    </Svg>
                  );
                case "skin":
                  return (
                    <Svg width={26} height={26} viewBox="0 0 24 24">
                      <Path
                        d="M12 4c-2.5 3-4 4-4 6a4 4 0 0 0 8 0c0-2-1.5-3-4-6Z"
                        fill="none"
                        {...common}
                      />
                      <Path d="M9 15c.4 1.2 1.6 2 3 2s2.6-.8 3-2" {...common} />
                    </Svg>
                  );
                case "women":
                  return (
                    <Svg width={26} height={26} viewBox="0 0 24 24">
                      <Circle cx={12} cy={8} r={4} fill="none" {...common} />
                      <Line x1={12} y1={12} x2={12} y2={20} {...common} />
                      <Line x1={9} y1={17} x2={15} y2={17} {...common} />
                    </Svg>
                  );
                default:
                  return null;
              }
            };

            return items.map((item) => (
              <Pressable
                key={item.key}
                onPress={() => router.push(item.route as any)}
                className="w-full"
              >
                <View
                  className="flex-row items-center justify-between border border-antar-orange bg-antar-orange/5 rounded-xl px-3 py-3"
                  style={{
                    shadowColor: "#FF772F",
                    shadowOpacity: 0.04,
                    shadowRadius: 3,
                    shadowOffset: { width: 0, height: 1 },
                    elevation: 1,
                  }}
                >
                  <View className="flex-row items-center gap-3 flex-1">
                    <View className="w-12 h-12 rounded-lg bg-antar-orange items-center justify-center">
                      <Icon name={item.icon} />
                    </View>
                    <Text
                      className="text-sm font-semibold text-antar-dark"
                      numberOfLines={1}
                    >
                      {item.label}
                    </Text>
                  </View>
                  <View className="w-8 h-8 rounded-full bg-antar-orange items-center justify-center">
                    <ArrowRight size={18} color="#FFFFFF" />
                  </View>
                </View>
              </Pressable>
            ));
          })()}
        </View>
      </Section>

      {/* Our Standalone Services - Gradient Card */}
      <Section title="Our Standalone Services">
        <LinearGradient
          colors={["#6E863C", "#236A61", "#112F15"]}
          locations={[0, 0.55, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ borderRadius: 16, position: "relative", overflow: "hidden" }}
        >
          <View className="px-5 pt-5 pb-4">
            <Text className="text-white font-semibold text-center text-xl leading-6">
              L.I.V Preventive Wellness Program
            </Text>
            <Text className="text-white text-center text-sm leading-5 mt-2">
              (Longevity, Immunity & Vitality)
            </Text>
            <Text className="text-white text-center text-sm leading-5 mt-3">
              Our sustainable approach tackles root causes to support natural
              healing & optimal health.
            </Text>

            {/* Preview image */}
            <View className="mt-4 mb-4 rounded-xl overflow-hidden">
              <Image
                source={require("~/assets/images/backgrounds/welcome-bg.jpg")}
                style={{ width: "100%", height: 200 }}
                resizeMode="cover"
              />
            </View>

            <Text className="text-white font-semibold text-center text-xl">
              Prevention of Ailments
            </Text>
            <Text className="text-white text-center text-sm leading-5 mt-1">
              Proactive wellness programs to prevent health issues before they
              start
            </Text>

            {/* CTA using shared GradientCTA */}
            <GradientCTA
              title="Begin Your Journey"
              onPress={() => router.push("/liv-preventive")}
              style={{ marginTop: 16 }}
            >
              <Text className="text-white font-semibold text-sm mr-2">
                Begin Your Journey
              </Text>
              <View className="w-6 h-6 bg-white rounded-full items-center justify-center">
                <ArrowRight size={14} color="#FF772F" strokeWidth={2.5} />
              </View>
            </GradientCTA>
          </View>
        </LinearGradient>
      </Section>

      <Section title="">
        <View className="flex flex-col gap-4">
          <AttendedCard
            title="Physiotherapy"
            subtitle="Evidence-based therapy for pain relief & mobility."
            image={require("~/assets/images/backgrounds/welcome-bg.jpg")}
            route="/physiotherapy"
          />
          <AttendedCard
            title="Curative & Creative Nutrition"
            subtitle="Personalized nutrition to heal, nourish & support your body."
            image={require("~/assets/images/backgrounds/nutrition-bg.jpg")}
            route="/nutrition"
          />
          <AttendedCard
            title="Mental & Emotional Wellness"
            subtitle="Holistic mental health support with counselling & mindfulness."
            image={require("~/assets/images/backgrounds/welcome-bg.jpg")}
            route="/mental-wellness"
          />
          <AttendedCard
            title="Optimal Movement Therapy"
            subtitle="Customized movement with yoga, fitness & therapy exercises."
            image={require("~/assets/images/backgrounds/plans-bg.jpg")}
            route="/optimal-movement"
          />
        </View>
      </Section>

      <Section
        title="How it Works?"
        subtitle="Our proven 3-step process for sustainable wellness transformation"
      >
        {(() => {
          const steps = [
            {
              title: "We Start with You",
              desc: "Detailed one-on-one assessment of your blood parameters, medical history, lifestyle and goals to understand what your body truly needs.",
              emphasize: true,
            },
            {
              title: "We Build YOUR Plan",
              desc: "Personalized holistic roadmap blending science & ancient wisdom, tailored to your routine.",
            },
            {
              title: "We Walk WITH You",
              desc: "Stay on track with daily WhatsApp support (9am-6pm IST) & regular check-ins.",
            },
          ];

          return (
            <View style={{ marginTop: 4, position: "relative" }}>
              {/* Single vertical connector line */}
              <View
                style={{
                  position: "absolute",
                  left: 15,
                  top: 4,
                  bottom: 10,
                  width: 2,
                  backgroundColor: "#FF772F",
                }}
              />

              {steps.map((s, idx) => (
                <View key={idx} className="flex-row mb-6">
                  {/* Timeline left column */}
                  <View style={{ width: 32 }}>
                    <View className="items-center">
                      {/* Dot marker */}
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
                            marginTop: 2,
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
                            marginTop: 4,
                          }}
                        />
                      )}
                    </View>
                  </View>

                  {/* Content right column */}
                  <View className="flex-1">
                    <Text
                      className={`font-semibold ${
                        s.emphasize ? "text-antar-orange" : "text-antar-dark"
                      } text-xl`}
                    >
                      {s.title}
                    </Text>
                    <Text className="text-sm mt-1">
                      {s.desc}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          );
        })()}
      </Section>

      {/** Removed legacy Prevention of Ailments section as requested **/}
    </Screen>
  );
}
