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

export default function MentalWellnessScreen() {
  const [openFAQ, setOpenFAQ] = React.useState<number>(0); // First FAQ open by default

  const faqs = [
    {
      question:
        "Is this program suitable for people diagnosed with mental health conditions?",
      answer:
        "Yes! During the initial consultation, we assess your condition and recommend a plan suited to your needs. Our team includes experienced psychologists and therapists trained to work with various conditions like anxiety, depression, and trauma.",
    },
    {
      question: "Do I need a clinical diagnosis to join the program?",
      answer:
        "No. You do not need a diagnosis to benefit from our program. Whether you're feeling low, overwhelmed, or simply seeking personal growth, we're here for you.",
    },
    {
      question: "What if I've never tried therapy before?",
      answer:
        "That's perfectly okay. Many of our clients are first-timers. Our team will guide you through the process, help set expectations, and ensure you feel supported throughout your journey.",
    },
    {
      question:
        "What happens after I sign up for the Mental and Emotional Wellness program?",
      answer:
        "Once you sign up, you will have a one-on-one virtual consultation (40 minutes) with a licensed mental health professional to assess your concerns and goals. Based on this, a personalized support plan will be crafted for you.",
    },
    {
      question:
        "How do I receive support and track progress during the program?",
      answer:
        "You'll get WhatsApp support (Mon–Sat, 10 AM – 6 PM IST) for ongoing check-ins. In addition, you can book weekly virtual sessions to discuss your progress and make adjustments to your wellness plan.",
    },
    {
      question: "How often do I need to attend therapy sessions?",
      answer:
        "We recommend weekly sessions for consistency and progress, but the frequency can be tailored to your needs. Some clients prefer bi-weekly or monthly check-ins.",
    },
    {
      question: "Is the program confidential?",
      answer:
        "Yes. All sessions and information shared are 100% confidential and handled with the utmost care in compliance with privacy standards.",
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
            Mental & Emotional Wellness
          </Text>
          <Text className="text-sm text-muted-foreground">
            It's okay to not be okay
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="p-6 gap-6">
          {/* Social Proof */}
          <Section title="">
            <Card className="border-antar-pink/30 bg-antar-pink/10">
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
                  Supporting mental health journeys with compassionate care
                </Text>
              </CardContent>
            </Card>
          </Section>

          <Section title="💙 Mental Health Reality in India">
            <View className="flex flex-row flex-wrap gap-3">
              {[
                {
                  stat: "56M",
                  desc: "Indians suffer from depression",
                  source: "WHO",
                },
                {
                  stat: "14 yrs",
                  desc: "Age when half of mental illness begins",
                  source: "WHO",
                },
                {
                  stat: "70%",
                  desc: "People who don't receive treatment",
                  source: "WHO",
                },
                {
                  stat: "139/149",
                  desc: "India's happiness ranking",
                  source: "UN 2022",
                },
                {
                  stat: "64%",
                  desc: "Surge in antidepressant sales",
                  source: "TOI",
                },
                {
                  stat: "1 in 7",
                  desc: "Indians live with mental health conditions",
                  source: "Lancet",
                },
              ].map((item, idx) => (
                <Card
                  key={idx}
                  className="border-antar-orange/20 bg-antar-orange/5 flex-1 min-w-[45%]"
                >
                  <CardContent className="p-3">
                    <Text className="font-bold text-antar-orange text-lg text-center">
                      {item.stat}
                    </Text>
                    <Text className="text-xs text-antar-dark text-center font-medium">
                      {item.desc}
                    </Text>
                    <Text className="text-xs text-muted-foreground text-center mt-1">
                      - {item.source}
                    </Text>
                  </CardContent>
                </Card>
              ))}
            </View>
          </Section>

          <Section title="🧠 Mental & Emotional Wellness at Antar">
            <Text className="text-muted-foreground mb-4">
              Our integrative approach to Mental and Emotional Wellness gently
              helps you understand and navigate emotional patterns, stressors,
              and inner blocks, blending time-honored holistic practices with
              modern psychological insights.
            </Text>
            <Text className="text-muted-foreground mb-4">
              With evidence-based tools and heart-centered guidance, we support
              the development of self-awareness, emotional regulation, and
              psychological resilience - enabling your whole being to live with
              clarity, purpose, connection, and the quiet strength of inner
              peace.
            </Text>
            <Card className="border-antar-teal/20 bg-antar-teal/5">
              <CardContent className="p-4">
                <Text className="font-semibold text-antar-dark text-center mb-2">
                  🌱 At Antar, Your healing starts when you STOP running from
                  your emotions
                </Text>
                <Text className="text-muted-foreground text-center text-sm">
                  Emotions aren't problems, they're signals waiting to be
                  UNDERSTOOD
                </Text>
              </CardContent>
            </Card>
          </Section>

          <Section title="🎯 We Support & Improve">
            <View className="flex flex-col gap-3">
              {[
                {
                  num: "1",
                  title: "Stress & Lifestyle Management",
                  desc: "Chronic stress, burnout, and work-life balance, restore your vitality",
                },
                {
                  num: "2",
                  title: "Mood Disorders",
                  desc: "Care for anxiety, depression, panic, bipolar shifts, and seasonal lows",
                },
                {
                  num: "3",
                  title: "Cognitive & Behavioral Health",
                  desc: "Support for ADHD, OCD, perfectionism, and negative thought loops",
                },
                {
                  num: "4",
                  title: "Life & Relationship Support",
                  desc: "Guidance through conflicts, transitions, and emotional isolation",
                },
                {
                  num: "5",
                  title: "Self & Emotional Growth",
                  desc: "Build self-awareness, clarity, and emotional resilience",
                },
                {
                  num: "6",
                  title: "Mind-Body Healing",
                  desc: "Use breathwork, yoga, and meditation for nervous system balance",
                },
                {
                  num: "7",
                  title: "Child & Adolescent Care",
                  desc: "Help for academic stress, social anxiety, and exam pressure",
                },
              ].map((item, idx) => (
                <Card key={idx} className="border-antar-teal/20">
                  <CardContent className="p-4">
                    <View className="flex-row items-start mb-2">
                      <View className="w-6 h-6 rounded-full bg-antar-teal mr-3 items-center justify-center">
                        <Text className="text-white font-bold text-xs">
                          {item.num}
                        </Text>
                      </View>
                      <View className="flex-1">
                        <Text className="font-semibold text-antar-dark mb-1">
                          {item.title}
                        </Text>
                        <Text className="text-muted-foreground text-sm">
                          {item.desc}
                        </Text>
                      </View>
                    </View>
                  </CardContent>
                </Card>
              ))}
            </View>
          </Section>

          <Section title="🌟 What Sets Us Apart">
            <View className="flex flex-col gap-3">
              <Card className="border-antar-teal/20 bg-antar-teal/5">
                <CardContent className="p-4">
                  <Text className="font-semibold text-antar-dark mb-2">
                    🌱 Root-Cause, Not Symptom-Based
                  </Text>
                  <Text className="text-muted-foreground text-sm">
                    We address deep emotional patterns with integrative tools,
                    beyond surface stress.
                  </Text>
                </CardContent>
              </Card>

              <Card className="border-antar-orange/20 bg-antar-orange/5">
                <CardContent className="p-4">
                  <Text className="font-semibold text-antar-dark mb-2">
                    🗺️ Precision Through Emotion Mapping
                  </Text>
                  <Text className="text-muted-foreground text-sm">
                    Identify triggers, thought loops, and patterns to guide
                    focused healing.
                  </Text>
                </CardContent>
              </Card>

              <Card className="border-antar-pink/30 bg-antar-pink/10">
                <CardContent className="p-4">
                  <Text className="font-semibold text-antar-dark mb-2">
                    🔄 Proven Inner Reprogramming
                  </Text>
                  <Text className="text-muted-foreground text-sm">
                    Eastern wisdom meets CBT to shift beliefs and build
                    resilience.
                  </Text>
                </CardContent>
              </Card>

              <Card className="border-antar-teal/20 bg-antar-teal/5">
                <CardContent className="p-4">
                  <Text className="font-semibold text-antar-dark mb-2">
                    💚 Mentor-Led, Heart-Centered Support
                  </Text>
                  <Text className="text-muted-foreground text-sm">
                    Empathetic mentors offer structure, reflection, and
                    compassionate care.
                  </Text>
                </CardContent>
              </Card>
            </View>
          </Section>

          <Section title="🛤️ How It Works">
            <Text className="text-muted-foreground mb-4">
              Begin with Awareness, Not Assumptions
            </Text>
            <View className="flex flex-col gap-4">
              <Card className="border-antar-teal/20 bg-antar-teal/5">
                <CardContent className="p-4">
                  <View className="flex-row items-center mb-2">
                    <View className="w-8 h-8 rounded-full bg-antar-teal mr-3 items-center justify-center">
                      <Text className="text-white font-bold text-sm">1</Text>
                    </View>
                    <Text className="font-semibold text-antar-dark">
                      1-on-1 Emotional Wellness Assessment
                    </Text>
                  </View>
                  <Text className="text-muted-foreground text-sm">
                    40 mins with a licensed therapist to explore your emotions,
                    stress, and mental health needs.
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
                      Personalized Emotional Wellness Plan
                    </Text>
                  </View>
                  <Text className="text-muted-foreground text-sm">
                    Personalized guidance in 48 hours with journaling,
                    breathwork, and mindset tools.
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
                      Alignment Therapy & Follow-up Session
                    </Text>
                  </View>
                  <Text className="text-muted-foreground text-sm">
                    Virtual sessions using CBT, mindfulness, or talk therapy
                    with flexible IST slots.
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
                      Ongoing Support
                    </Text>
                  </View>
                  <Text className="text-muted-foreground text-sm">
                    Weekly check-ins + dedicated WhatsApp/email support
                    (Mon–Sat, 10 AM – 6 PM IST).
                  </Text>
                </CardContent>
              </Card>
            </View>
          </Section>

          <Section title="👩‍⚕️ Meet Our Expert">
            <Card className="border-antar-pink/30 bg-antar-pink/10">
              <CardContent className="p-4">
                <Text className="font-semibold text-antar-dark text-lg mb-1">
                  Shreeta Jain
                </Text>
                <Text className="text-sm text-muted-foreground mb-1">
                  Psychologist (Clinical)
                </Text>
                <Text className="text-xs text-antar-teal mb-3">
                  M.SC in Clinical Psychology • 10+ Years of Experience
                </Text>

                <View className="mb-4 p-3 rounded-2xl bg-antar-orange/10 border border-antar-orange/20">
                  <Text className="text-center font-bold text-antar-orange">
                    🎉 INAUGURAL OFFER! GET 25% OFF
                  </Text>
                </View>

                <View className="flex-row mb-3">
                  <Text className="text-2xl font-bold text-antar-dark mr-2">
                    ₹1,500
                  </Text>
                  <Text className="text-lg text-muted-foreground line-through">
                    ₹2,000
                  </Text>
                  <Text className="text-sm text-muted-foreground ml-2">
                    per session
                  </Text>
                </View>

                <View className="flex-row gap-4 mb-4">
                  <Text className="text-xs text-antar-teal">
                    ✓ Fully Confidential
                  </Text>
                  <Text className="text-xs text-antar-teal">
                    ✓ Non Judgmental
                  </Text>
                </View>

                <Text className="text-sm text-muted-foreground mb-3">
                  Your Journey Starts with Understanding, Not Labels
                </Text>

                <Button
                  className="w-full bg-antar-teal"
                  onPress={() =>
                    Linking.openURL(
                      "https://knowtheantar.com/products/mental-emotional-wellness-plan"
                    )
                  }
                >
                  <Text className="font-semibold text-white">
                    Start Your Journey Now!
                  </Text>
                </Button>
              </CardContent>
            </Card>
          </Section>

          <Section title="💬 Our Success Stories">
            <View className="flex flex-col gap-3">
              <Card className="border-antar-teal/20 bg-antar-teal/5">
                <CardContent className="p-4">
                  <Text className="text-muted-foreground text-sm mb-3 italic">
                    "I reached out to Shreeta during my pregnancy, at the height
                    of the second COVID wave, when I was struggling with anxiety
                    and depression. Her calm, patient approach made me feel seen
                    and supported."
                  </Text>
                  <Text className="font-semibold text-antar-dark text-xs">
                    Anonymous
                  </Text>
                </CardContent>
              </Card>

              <Card className="border-antar-orange/20 bg-antar-orange/5">
                <CardContent className="p-4">
                  <Text className="text-muted-foreground text-sm mb-3 italic">
                    "When I first met Shreeta, I was struggling with self-doubt
                    and felt completely disconnected from myself. Through her
                    gentle support, I slowly began to love and accept myself and
                    others too."
                  </Text>
                  <Text className="font-semibold text-antar-dark text-xs">
                    Anonymous
                  </Text>
                </CardContent>
              </Card>

              <Card className="border-antar-pink/30 bg-antar-pink/10">
                <CardContent className="p-4">
                  <Text className="text-muted-foreground text-sm mb-3 italic">
                    "Public speaking used to fill me with overwhelming fear,
                    affecting both my work and self-confidence. Shreeta helped
                    me understand the root of my fear and guided me through it
                    with so much patience."
                  </Text>
                  <Text className="font-semibold text-antar-dark text-xs">
                    Anonymous
                  </Text>
                </CardContent>
              </Card>

              <Card className="border-antar-teal/20 bg-antar-teal/5">
                <CardContent className="p-4">
                  <Text className="text-muted-foreground text-sm mb-3 italic">
                    "My screen time started affecting my sleep, focus and
                    relationships. I'm so glad I found Shreeta. Her calm and
                    non-judgmental presence made it easy to open up."
                  </Text>
                  <Text className="font-semibold text-antar-dark text-xs">
                    Anonymous
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

          <Section>
            <Card className="border-antar-pink/30 bg-antar-pink/10">
              <CardContent className="p-4">
                <Text className="font-semibold text-antar-dark text-center mb-2">
                  💙 BEGIN YOUR INNER JOURNEY
                </Text>
                <Text className="text-muted-foreground text-center mb-3 text-sm">
                  Let's start with understanding you
                </Text>
                <Button
                  className="w-full bg-antar-teal"
                  onPress={() =>
                    Linking.openURL(
                      "https://knowtheantar.com/pages/mental-emotional-wellness"
                    )
                  }
                >
                  <Text className="font-semibold text-white">
                    Schedule Online Session
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
