import * as React from "react";
import { View, Alert } from "react-native";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import DecoratedHeader from "~/components/custom/DecoratedHeader";
import Screen from "~/components/custom/Screen";
import Section from "~/components/custom/Section";
import GradientCTA from "~/components/custom/GradientCTA";

export default function ParivarScreen() {
  // TODO: Replace with real subscription state from API/AsyncStorage
  const [hasParivar, setHasParivar] = React.useState(false);

  const showPurchaseAlert = () => {
    Alert.alert(
      "Join Antar Parivar",
      "Unlock guided practices, live sessions, and a nurturing community for ₹199/month",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Buy Now",
          onPress: () => {
            setHasParivar(true);
            Alert.alert("Success!", "Welcome to Antar Parivar! 🎉");
          },
        },
      ]
    );
  };

  // Post-Purchase Dashboard Content
  if (hasParivar) {
    return (
      <Screen>
        {/* <DecoratedHeader
          title="Welcome to Antar Parivar"
          subtitle="Your wellness journey starts now! 🧘‍♂️"
        /> */}

        {/* Today's Focus */}
        <Section>
          <View className="p-5 rounded-3xl bg-antar-orange/10 border border-antar-orange/20">
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="font-bold text-antar-dark text-lg mb-1">
                  🧘 Today's Session
                </Text>
                <Text className="text-antar-orange font-semibold">
                  Mobility Flow at 7:00 AM
                </Text>
                <Text className="text-sm text-muted-foreground">
                  with Dr. Richa • Starting in 2 hours
                </Text>
              </View>
              <Button className="bg-antar-orange px-6 py-3 rounded-2xl">
                <Text className="text-white font-bold">Join Now</Text>
              </Button>
            </View>
          </View>
        </Section>

        {/* Progress Overview */}
        <Section title="🏆 Your Journey">
          {/* Main Achievement */}
          <View className="p-4 mb-3 rounded-2xl bg-antar-teal/10 border border-antar-teal/20">
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-antar-teal font-bold text-lg">
                  12 Sessions Completed
                </Text>
                <Text className="text-sm text-muted-foreground">
                  🎯 85% attendance rate • 4 week streak
                </Text>
              </View>
              <View className="items-center">
                <Text className="text-3xl">🏅</Text>
              </View>
            </View>
            {/* Progress Bar */}
            <View className="mt-3">
              <View className="flex-row justify-between mb-1">
                <Text className="text-xs text-muted-foreground">
                  Monthly Goal
                </Text>
                <Text className="text-xs text-antar-teal font-medium">
                  12/15
                </Text>
              </View>
              <View className="h-2 bg-gray-300 rounded-full">
                <View className="h-2 bg-antar-teal rounded-full w-4/5" />
              </View>
            </View>
          </View>

          {/* Achievement Badges */}
          <View className="flex-row gap-2">
            <View className="flex-1 flex-row items-center p-3 rounded-xl bg-antar-orange/10 border border-antar-orange/20">
              <Text className="text-xl mr-2">🔥</Text>
              <View className="flex-1">
                <Text className="font-semibold text-antar-orange text-sm">
                  Consistent Member
                </Text>
                <Text className="text-xs text-muted-foreground">
                  4 weeks active
                </Text>
              </View>
            </View>
            <View className="flex-1 flex-row items-center p-3 rounded-xl bg-antar-pink/10 border border-antar-pink/20">
              <Text className="text-xl mr-2">⭐</Text>
              <View className="flex-1">
                <Text className="font-semibold text-antar-pink text-sm">
                  Top Performer
                </Text>
                <Text className="text-xs text-muted-foreground">
                  High attendance
                </Text>
              </View>
            </View>
          </View>
        </Section>

        {/* Weekly Schedule */}
        <Section title="📅 This Week's Sessions">
          <View className="gap-4">
            {/* Monday - Completed */}
            <View className="flex-row items-center p-4 rounded-2xl bg-gray-50/80 border border-gray-200/60">
              <View className="w-10 h-10 rounded-full bg-green-100 items-center justify-center mr-4">
                <Text className="text-lg">✅</Text>
              </View>
              <View className="flex-1">
                <Text className="font-semibold text-gray-600">
                  Monday - Mobility Flow
                </Text>
                <Text className="text-sm text-gray-500">
                  7:00 AM • Completed
                </Text>
              </View>
            </View>

            {/* Upcoming */}
            <View className="flex-row items-center p-4 rounded-2xl bg-antar-teal/5 border border-antar-teal/20">
              <View className="w-10 h-10 rounded-full bg-antar-teal/20 items-center justify-center mr-4">
                <Text className="text-lg">🫁</Text>
              </View>
              <View className="flex-1">
                <Text className="font-semibold text-antar-dark">
                  Tuesday - Breathwork
                </Text>
                <Text className="text-sm text-muted-foreground">
                  7:00 AM • 1 day left
                </Text>
              </View>
              <View className="px-3 py-1 rounded-full bg-antar-teal/20">
                <Text className="text-antar-teal text-xs font-medium">
                  Remind Me
                </Text>
              </View>
            </View>

            <View className="flex-row items-center p-4 rounded-2xl bg-antar-teal/5 border border-antar-teal/20">
              <View className="w-10 h-10 rounded-full bg-antar-teal/20 items-center justify-center mr-4">
                <Text className="text-lg">🎙️</Text>
              </View>
              <View className="flex-1">
                <Text className="font-semibold text-antar-dark">
                  Friday - Expert Webinar
                </Text>
                <Text className="text-sm text-muted-foreground">
                  5:00 PM • 4 days left
                </Text>
              </View>
              <View className="px-3 py-1 rounded-full bg-antar-teal/20">
                <Text className="text-antar-teal text-xs font-medium">
                  Remind Me
                </Text>
              </View>
            </View>
          </View>
        </Section>

        {/* Upcoming Highlight */}
        <Section title="🎙️ Special Event">
          <View className="p-4 rounded-2xl bg-antar-pink/10 border border-antar-pink/20">
            <Text className="font-bold text-antar-dark mb-2">
              Monthly Expert Webinar
            </Text>
            <Text className="text-antar-pink font-semibold mb-1">
              "Seasonal Wellness: Winter Care"
            </Text>
            <Text className="text-sm text-muted-foreground mb-3">
              Sunday, Jan 14 at 5:00 PM IST
            </Text>
            <Button className="bg-antar-pink border-antar-pink">
              <Text className="text-white font-semibold">Register Now</Text>
            </Button>
          </View>
        </Section>

        {/* Community & Toolkit Actions */}
        <Section title="Your Parivar Access">
          <View className="flex-row gap-3">
            <View className="flex-1 p-4 rounded-2xl bg-antar-teal/5 border border-antar-teal/20">
              <Text className="text-center text-3xl mb-2">💬</Text>
              <Text className="text-center font-semibold text-antar-dark mb-1">
                Community
              </Text>
              <Text className="text-center text-xs text-muted-foreground">
                127 members online
              </Text>
            </View>
            <View className="flex-1 p-4 rounded-2xl bg-antar-orange/5 border border-antar-orange/20">
              <Text className="text-center text-3xl mb-2">🧰</Text>
              <Text className="text-center font-semibold text-antar-dark mb-1">
                Toolkit
              </Text>
              <Text className="text-center text-xs text-muted-foreground">
                New January pack
              </Text>
            </View>
          </View>
        </Section>

        {/* Upcoming Sessions */}
        <Section title="🔮 Coming Up">
          <View className="gap-3">
            {/* Next Session */}
            <View className="p-4 rounded-2xl bg-antar-teal/8 border border-antar-teal/25">
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center flex-1">
                  <View className="w-12 h-12 rounded-2xl bg-antar-teal/20 items-center justify-center mr-3">
                    <Text className="text-xl">🫁</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="font-bold text-antar-dark">
                      Breathwork Session
                    </Text>
                    <Text className="text-antar-teal font-medium text-sm">
                      9 Jan, 7:00 AM
                    </Text>
                    <Text className="text-xs text-muted-foreground">
                      with Shreeta
                    </Text>
                  </View>
                </View>
                <View className="px-3 py-1 rounded-full bg-antar-teal/20">
                  <Text className="text-antar-teal text-xs font-medium">
                    Remind Me
                  </Text>
                </View>
              </View>
            </View>

            {/* Expert Webinar */}
            <View className="p-4 rounded-2xl bg-antar-pink/8 border border-antar-pink/25">
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center flex-1">
                  <View className="w-12 h-12 rounded-2xl bg-antar-pink/20 items-center justify-center mr-3">
                    <Text className="text-xl">🎙️</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="font-bold text-antar-dark">
                      Expert Webinar
                    </Text>
                    <Text className="text-antar-pink font-medium text-sm">
                      14 Jan, 5:00 PM
                    </Text>
                    <Text className="text-xs text-muted-foreground">
                      "Seasonal Wellness"
                    </Text>
                  </View>
                </View>
                <View className="px-3 py-1 rounded-full bg-antar-pink/20">
                  <Text className="text-antar-pink text-xs font-medium">
                    Register
                  </Text>
                </View>
              </View>
            </View>

            {/* Next Week Preview */}
            <View className="p-4 rounded-2xl bg-antar-orange/8 border border-antar-orange/25">
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center flex-1">
                  <View className="w-12 h-12 rounded-2xl bg-antar-orange/20 items-center justify-center mr-3">
                    <Text className="text-xl">🏃‍♂️</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="font-bold text-antar-dark">
                      Next Week Starts
                    </Text>
                    <Text className="text-antar-orange font-medium text-sm">
                      15 Jan, 7:00 AM
                    </Text>
                    <Text className="text-xs text-muted-foreground">
                      Mobility Flow returns
                    </Text>
                  </View>
                </View>
                <View className="px-3 py-1 rounded-full bg-antar-orange/20">
                  <Text className="text-antar-orange text-xs font-medium">
                    Preview
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </Section>

        {/* Membership Status */}
        <Section>
          <View className="flex-row items-center justify-between p-4 rounded-2xl bg-white/80 border border-white/40">
            <View>
              <Text className="font-semibold text-antar-dark">
                Parivar Membership
              </Text>
              <Text className="text-sm text-muted-foreground">
                ₹199/month • Active
              </Text>
            </View>
            <Button
              className="bg-red-50 border border-red-300"
              onPress={() => setHasParivar(false)}
            >
              <Text className="text-red-600 text-sm">Cancel</Text>
            </Button>
          </View>
        </Section>
      </Screen>
    );
  }

  // Pre-Purchase Marketing Content
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
            <Button
              className="mt-3 bg-antar-orange rounded-xl"
              onPress={showPurchaseAlert}
            >
              <Text className="text-white font-semibold">
                Unlock for ₹199/month
              </Text>
            </Button>
          ) : null}
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

      {/* Lock notice + CTA for non-subscribers */}
      {!hasParivar ? (
        <Section>
          <View className="p-4 rounded-2xl bg-antar-teal/5 border border-antar-teal/20">
            <Text className="text-antar-teal font-medium">
              Unlock full access to join live sessions, webinars, and the
              private community.
            </Text>
          </View>
          <Button
            className="mt-3 bg-antar-orange w-full rounded-xl"
            onPress={showPurchaseAlert}
          >
            <Text className="text-white font-semibold">
              Unlock for ₹199/month
            </Text>
          </Button>
        </Section>
      ) : null}
    </Screen>
  );
}
