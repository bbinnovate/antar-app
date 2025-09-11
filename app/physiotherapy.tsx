import * as React from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Linking,
  Pressable,
  Dimensions,
} from "react-native";
import { Text } from "~/components/ui/text";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import Section from "~/components/custom/Section";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import GradientCTA from "~/components/custom/GradientCTA";
import Svg, { Circle, Line, Path } from "react-native-svg";

const PhysioFaceIcon = ({ variant = 0 }: { variant?: number }) => {
  const common = {
    stroke: "#FF772F",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  return (
    <Svg width={28} height={28} viewBox="0 0 24 24">
      <Circle cx={12} cy={12} r={9.5} fill="none" {...common} />
      {variant === 0 && (
        <>
          <Circle cx={9} cy={10} r={1} fill="#FF772F" />
          <Circle cx={15} cy={10} r={1} fill="#FF772F" />
          <Path d="M9 15c1.5.8 4.5.8 6 0" {...common} />
        </>
      )}
      {variant === 1 && (
        <>
          <Line x1={8.5} y1={10} x2={10.5} y2={10} {...common} />
          <Line x1={13.5} y1={10} x2={15.5} y2={10} {...common} />
          <Path d="M9.5 15.5c2 0 3 0 5 0" {...common} />
        </>
      )}
      {variant === 2 && (
        <>
          <Circle cx={9} cy={10} r={1} fill="#FF772F" />
          <Circle cx={15} cy={10} r={1} fill="#FF772F" />
          <Path d="M9 15c2-1.5 4-1.5 6 0" {...common} />
        </>
      )}
      {variant === 3 && (
        <>
          <Line x1={8.5} y1={9} x2={10.5} y2={11} {...common} />
          <Line x1={10.5} y1={9} x2={8.5} y2={11} {...common} />
          <Line x1={13.5} y1={9} x2={15.5} y2={11} {...common} />
          <Line x1={15.5} y1={9} x2={13.5} y2={11} {...common} />
          <Path d="M8.5 15.5c2.5 0 4.5 0 7 0" {...common} />
        </>
      )}
    </Svg>
  );
};

const ApartIcon = () => (
  <Svg width={22} height={22} viewBox="0 0 24 24">
    <Circle
      cx={12}
      cy={12}
      r={8.5}
      stroke="#FF772F"
      strokeWidth={1.8}
      fill="none"
    />
    <Path
      d="M12 7.5v9"
      stroke="#FF772F"
      strokeWidth={1.8}
      strokeLinecap="round"
    />
    <Circle cx={12} cy={7} r={1.2} fill="#FF772F" />
  </Svg>
);

export default function PhysiotherapyScreen() {
  const [openFAQ, setOpenFAQ] = React.useState<number>(0); // First FAQ open by default
  const [activeService, setActiveService] = React.useState(0);
  const screenW = Dimensions.get("window").width;
  const cardW = Math.round(screenW * 0.82);
  const cardGap = 12;

  const faqs = [
    {
      question:
        "How does online physiotherapy ensure biomechanical assessment?",
      answer:
        "Our online sessions begin with detailed assessment including movement analysis, joint mobility, posture, and muscle activation patterns to identify root causes of dysfunction.",
    },
    {
      question:
        "Can online physiotherapy be effective without hands-on techniques?",
      answer:
        "Absolutely. Long-term recovery is best achieved through active rehabilitation. Our therapists support through real-time verbal cues, form correction, and visual feedback.",
    },
    {
      question: "Do I need any equipment for home-based rehab?",
      answer:
        "Most sessions use bodyweight exercises or household items. Any specific equipment needed will be affordable and easy-to-access options.",
    },
    {
      question: "What technology is used and is it easy to navigate?",
      answer:
        "We use secure platforms like Zoom or Google Meet. No technical expertise needed - just a device with camera, stable internet and space to move.",
    },
    {
      question: "Are online sessions suitable for elderly individuals?",
      answer:
        "Yes. We use age-appropriate, safety-focused methods with simple instructions, realistic goals and caregiver involvement when needed.",
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
            Online Physiotherapy
          </Text>
          <Text className="text-sm text-muted-foreground">
            Where expertise meets empathy
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="p-6 gap-6">
          {/* Top Banner */}
          <Section title="">
            <LinearGradient
              colors={["#6E863C", "#236A61", "#112F15"]}
              locations={[0, 0.55, 1]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ height: 160, borderRadius: 18, overflow: "hidden" }}
            >
              <View className="flex-1 items-center justify-center px-4">
                <Text className="text-white text-xl font-semibold">
                  Physiotherapy
                </Text>
              </View>
            </LinearGradient>
            <Text className="text-sm text-antar-dark mt-3">
              Our approach combines the precision of modern physiotherapy with
              holistic strategies to help you move better, feel better, and live
              better.
            </Text>
          </Section>

          <Section title="Our Services">
            {(() => {
              const services = [
                "Physiotherapy for Seniors",
                "Women's Health Care (Pregnancy & Postpartum)",
                "Workplace Injury & Posture Support",
                "Injury Recovery & Rehabilitation",
                "Chronic Pain Management",
                "Preventive Care & Wellness Programs",
                "Support Before & After Surgery",
              ];

              return (
                <View>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    decelerationRate="fast"
                    snapToInterval={cardW + cardGap}
                    snapToAlignment="start"
                    contentContainerStyle={{ paddingHorizontal: 4 }}
                    onScroll={(e) => {
                      const x = e.nativeEvent.contentOffset.x;
                      const idx = Math.round(x / (cardW + cardGap));
                      if (idx !== activeService) setActiveService(idx);
                    }}
                    scrollEventThrottle={16}
                  >
                    {services.map((title, idx) => (
                      <View
                        key={idx}
                        style={{ width: cardW, marginRight: cardGap }}
                        className="rounded-2xl border border-antar-orange bg-antar-orange/10"
                      >
                        <View className="flex-row items-center px-3 py-3">
                          <LinearGradient
                            colors={["#EED7C5", "#D8C0AE", "#CDAE94"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={{
                              width: 64,
                              height: 64,
                              borderRadius: 12,
                              marginRight: 10,
                            }}
                          />
                          <Text className="flex-1 font-semibold text-antar-dark text-base">
                            {title}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </ScrollView>

                  {/* Dots */}
                  <View className="flex-row justify-center mt-2">
                    {services.map((_, i) => (
                      <View
                        key={i}
                        className={`mx-1 rounded-full ${
                          activeService === i
                            ? "bg-antar-orange"
                            : "bg-gray-300"
                        }`}
                        style={{ width: 6, height: 6 }}
                      />
                    ))}
                  </View>
                </View>
              );
            })()}
          </Section>

          <Section title="Click. Connect. Heal">
            {/* Banner */}
            <LinearGradient
              colors={["#6E863C", "#236A61", "#112F15"]}
              locations={[0, 0.55, 1]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ height: 140, borderRadius: 16, overflow: "hidden" }}
            >
              <View className="flex-1 items-center justify-center">
                <Text className="text-white/90">Image</Text>
              </View>
            </LinearGradient>

            {/* Grid */}
            <View className="mt-3 flex-row flex-wrap justify-between gap-y-3">
              {[
                "Expert Care Fingertips",
                "Care For Every Age",
                "Heal in Your Comfort Zone",
                "Made Just For You",
                "Your Time, Your Terms",
                "Your Time, Your Terms",
              ].map((title, idx) => (
                <View key={idx} className="w-[48%]">
                  <View className="border border-antar-orange rounded-2xl px-3 py-5 items-center justify-center bg-white">
                    <View className="w-12 h-12 rounded-full items-center justify-center border-2 border-antar-orange mb-2">
                      <PhysioFaceIcon variant={idx % 4} />
                    </View>
                    <Text className="text-center text-xs text-antar-dark">
                      {title}
                    </Text>
                  </View>
                </View>
              ))}
            </View>

            {/* Bottom strip */}
            <View className="mt-4 bg-antar-orange/10 border border-antar-orange/20 rounded-xl py-2 px-3 items-center">
              <Text className="font-semibold text-antar-dark text-sm">
                Expert Physiotherapy, Anytime. Anywhere.
              </Text>
            </View>
          </Section>

          <Section title="What Sets Us Apart">
            <View className="flex flex-col gap-4">
              {[
                {
                  title: "Evidence-Based Care",
                  desc: "Guided by clinical reasoning and measurable outcomes",
                },
                {
                  title: "Holistic Approach",
                  desc: "Targeting biomechanical, neuromuscular, and psychosomatic factors",
                },
                {
                  title: "Personalized Plans",
                  desc: "Tailored to your goals, recovery pace, and body's needs",
                },
                {
                  title: "Ongoing Support",
                  desc: "Focused on prevention, awareness, and long-term self-efficacy",
                },
              ].map((item, idx) => (
                <View
                  key={idx}
                  className="rounded-2xl border border-antar-orange bg-white px-4 py-3"
                >
                  <View className="flex-row items-center mb-2">
                    <ApartIcon />
                    <Text className="ml-2 font-semibold text-antar-dark text-base">
                      {item.title}
                    </Text>
                  </View>
                  <View className="h-[1px] bg-antar-orange/30 -mx-1 mb-2" />
                  <Text className="text-antar-dark/80 text-sm">
                    {item.desc}
                  </Text>
                </View>
              ))}
            </View>
          </Section>

          <Section title="Pick Your Perfect Plan">
            {/* Offer label */}
            <View className="flex-row items-center mb-3 -mt-2">
              <Text className="text-antar-orange font-semibold text-sm animate-pulse">
                25% INAUGURAL OFFER
              </Text>
            </View>

            {(() => {
              const plans = [
                {
                  title: "1 Time Session",
                  mrp: "₹800",
                  price: "₹600",
                  bullets: [
                    "Single session trial",
                    "Assessment and guidance",
                    "Perfect to get started",
                  ],
                  url: "https://knowtheantar.com/products/antar-healing-plans?variant=50723541549188",
                },
                {
                  title: "Foundational Relief – 2 Week Plan",
                  mrp: "₹5,600",
                  price: "₹4,200",
                  bullets: [
                    "8 Sessions (4 sessions/week)",
                    "Short-term pain relief",
                    "Post-minor injury care",
                  ],
                  url: "https://knowtheantar.com/products/antar-healing-plans?variant=50521828819076",
                },
                {
                  title: "Recovery & Realignment – 4 Week Plan",
                  mrp: "₹10,400",
                  price: "₹7,800",
                  bullets: [
                    "16 Sessions (4 sessions/week)",
                    "Injury recovery",
                    "Postural corrections",
                  ],
                  url: "https://knowtheantar.com/products/antar-healing-plans?variant=50521828851844",
                },
                {
                  title: "Restoration & Strengthening – 8 Week Plan",
                  mrp: "₹19,200",
                  price: "₹14,400",
                  bullets: [
                    "32 Sessions (4 sessions/week)",
                    "Chronic pain management",
                    "Surgical rehab",
                  ],
                  url: "https://knowtheantar.com/products/antar-healing-plans?variant=50521828884612",
                },
                {
                  title: "Deep Healing & Transformation – 12 Week Plan",
                  mrp: "₹26,400",
                  price: "₹19,800",
                  bullets: [
                    "48 Sessions (4 sessions/week)",
                    "Long-standing conditions",
                    "Complete functional recovery",
                  ],
                  url: "https://knowtheantar.com/products/antar-healing-plans?variant=50521828950148",
                },
              ];

              return (
                <View className="flex flex-col gap-5">
                  {plans.map((p, idx) => (
                    <View
                      key={idx}
                      className="rounded-2xl overflow-hidden bg-white border border-black/10 shadow-sm"
                    >
                      {/* Header strip */}
                      <View className="bg-antar-orange px-4 py-3 rounded-t-2xl flex-row items-center justify-between">
                        <Text className="text-white font-semibold text-base flex-1 pr-3">
                          {p.title}
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
                            style={{
                              alignSelf: "center",
                              paddingHorizontal: 24,
                            }}
                          />
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              );
            })()}
          </Section>

          <Section title="Meet Our Expert">
            <Card className="border-antar-teal/20 bg-antar-teal/5">
              <CardContent className="p-4">
                <Text className="font-semibold text-antar-dark text-lg mb-1">
                  Dr. Richa Bhaskarwar (MPT)
                </Text>
                <Text className="text-sm text-muted-foreground mb-1">
                  Masters of Physiotherapy in Musculoskeletal Sciences
                </Text>
                <Text className="text-xs text-antar-teal mb-3">
                  10+ Years of Experience
                </Text>
                {/* <Button
                  className="w-full bg-antar-teal"
                  onPress={() =>
                    Linking.openURL(
                      "https://knowtheantar.com/pages/physiotherapy"
                    )
                  }
                >
                  <Text className="font-semibold text-white">
                    Consult Your Therapist
                  </Text>
                </Button> */}
              </CardContent>
            </Card>
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
