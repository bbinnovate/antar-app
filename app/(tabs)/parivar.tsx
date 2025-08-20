import * as React from "react";
import { View } from "react-native";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";
import DecoratedHeader from "~/components/custom/DecoratedHeader";
import Screen from "~/components/custom/Screen";
import Section from "~/components/custom/Section";
import GradientCTA from "~/components/custom/GradientCTA";

export default function ParivarScreen() {
  const hasParivar = false; // TODO: replace with real subscription state

  return (
    <Screen>
      <DecoratedHeader
        title="Antar Parivar"
        subtitle="Unlock guided practices, live sessions, and a nurturing community"
      />

      {/* Price + Quick CTA */}
      <Section>
        <View className="w-full p-5 rounded-3xl bg-white/60 border border-white/40">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-sm text-muted-foreground">Membership</Text>
              <Text className="text-2xl font-bold text-antar-dark">
                ₹199/month
              </Text>
            </View>
            <View className="px-3 py-1 rounded-full bg-antar-teal/10 border border-antar-teal/30">
              <Text className="text-antar-teal font-semibold">Best Value</Text>
            </View>
          </View>
          <Text className="mt-2 text-sm text-muted-foreground">
            Cancel anytime. No hidden fees.
          </Text>
          {!hasParivar ? (
            <GradientCTA
              title="Unlock for ₹199/month"
              style={{ marginTop: 14 }}
            />
          ) : (
            <Button className="mt-3 bg-antar-teal">
              <Text className="text-white font-semibold">
                Go to your sessions
              </Text>
            </Button>
          )}
        </View>
      </Section>

      {/* Benefits Grid */}
      <Section title="Why join Parivar?">
        <View className="flex-row flex-wrap justify-between gap-3">
          {[
            {
              icon: "🧘",
              title: "3x/week live",
              desc: "Yoga, Breathwork, Mobility",
            },
            {
              icon: "🎙️",
              title: "Monthly webinar",
              desc: "+ Live Q&A with experts",
            },
            {
              icon: "🧰",
              title: "Wellness toolkit",
              desc: "Fresh monthly resources",
            },
            {
              icon: "💬",
              title: "24/7 chat",
              desc: "Continuous guidance & support",
            },
            {
              icon: "📱",
              title: "WhatsApp community",
              desc: "Private, supportive group",
            },
            {
              icon: "🎯",
              title: "Personalized plans",
              desc: "Custom wellness journeys",
            },
          ].map((b, idx) => (
            <View key={idx} className="w-[48%] mb-3">
              <View className="p-4 rounded-2xl bg-white/60 border border-white/40 h-24 justify-center">
                <Text className="text-2xl mb-1">{b.icon}</Text>
                <Text className="font-semibold text-antar-dark text-sm leading-tight">
                  {b.title}
                </Text>
                <Text className="text-xs text-muted-foreground mt-1 leading-tight">
                  {b.desc}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </Section>

      {/* Weekly experience preview */}
      <Section title="Your weekly rhythm">
        <View className="rounded-2xl overflow-hidden border border-white/40">
          <View className="flex-row">
            {[
              { day: "Mon", label: "Mobility • 7am" },
              { day: "Wed", label: "Yoga • 7am" },
              { day: "Fri", label: "Breathwork • 7am" },
            ].map((s, i) => (
              <View key={i} className="flex-1 p-4 bg-white/60">
                <Text className="text-sm font-semibold text-antar-dark">
                  {s.day}
                </Text>
                <Text className="text-xs text-muted-foreground mt-1">
                  {s.label}
                </Text>
                {!hasParivar ? (
                  <Text className="mt-2 text-[11px] text-antar-teal">
                    Included in Antar Parivar
                  </Text>
                ) : null}
              </View>
            ))}
          </View>
        </View>
      </Section>

      {/* Everything included */}
      <Section title="Everything included">
        <View className="gap-3">
          {[
            "3x/week live sessions (Yoga, Breathwork, Mobility)",
            "Monthly expert webinar + Live Q&A",
            "Monthly wellness toolkit",
            "24/7 chat support",
            "Private WhatsApp community access",
            "Personalized wellness plans tailored to your goals",
          ].map((f, idx) => (
            <View key={idx} className="flex-row items-start gap-3">
              <Text className="text-xl">✅</Text>
              <Text className="text-base text-antar-dark flex-1">{f}</Text>
            </View>
          ))}
        </View>
      </Section>

      {/* Lock notice + CTA */}
      {!hasParivar ? (
        <Section>
          <View className="p-4 rounded-2xl bg-antar-teal/5 border border-antar-teal/20">
            <Text className="text-antar-teal font-medium">
              Unlock full access to join live sessions, webinars, and the
              private community.
            </Text>
          </View>
          <GradientCTA
            title="Unlock for ₹199/month"
            style={{ marginTop: 12 }}
          />
        </Section>
      ) : null}
    </Screen>
  );
}
