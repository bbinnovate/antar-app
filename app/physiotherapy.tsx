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

export default function PhysiotherapyScreen() {
  const [openFAQ, setOpenFAQ] = React.useState<number>(0); // First FAQ open by default

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
                  Trusted by thousands for their rehabilitation journey
                </Text>
              </CardContent>
            </Card>
          </Section>

          <Section title="🏥 Online Physiotherapy at Antar">
            <Text className="text-muted-foreground mb-4">
              We support your full rehabilitation journey through clinical
              expertise, personalized care, and integrative healing. Our
              approach combines the precision of modern physiotherapy with
              holistic strategies to help you move better, feel better, and live
              better.
            </Text>
          </Section>

          <Section title="🌟 Click. Connect. Heal">
            <Text className="text-muted-foreground mb-4">
              Healing That Comes to You: Physiotherapy Anytime, Anywhere
            </Text>
            <View className="flex flex-row flex-wrap gap-3">
              {[
                { icon: "🎯", title: "Expert Care at Fingertips" },
                { icon: "👥", title: "Care for Every Age" },
                { icon: "🏠", title: "Heal in Your Comfort Zone" },
                { icon: "⏰", title: "Your Time, Your Terms" },
                { icon: "🎨", title: "Made Just for You" },
                { icon: "🚫", title: "No Travel, No Hassle" },
              ].map((benefit, idx) => (
                <Card
                  key={idx}
                  className="border-antar-teal/20 flex-1 min-w-[45%]"
                >
                  <CardContent className="p-3">
                    <Text className="text-lg text-center mb-1">
                      {benefit.icon}
                    </Text>
                    <Text className="font-semibold text-antar-dark text-center text-xs">
                      {benefit.title}
                    </Text>
                  </CardContent>
                </Card>
              ))}
            </View>
          </Section>

          <Section title="🎯 Our Services">
            <View className="flex flex-col gap-3">
              {[
                "Physiotherapy for Seniors",
                "Women's Health Care (Pregnancy & Postpartum)",
                "Workplace Injury & Posture Support",
                "Injury Recovery & Rehabilitation",
                "Chronic Pain Management",
                "Preventive Care & Wellness Programs",
                "Support Before & After Surgery",
              ].map((service, idx) => (
                <Card key={idx} className="border-antar-teal/20">
                  <CardContent className="p-4">
                    <Text className="font-semibold text-antar-dark">
                      {service}
                    </Text>
                  </CardContent>
                </Card>
              ))}
            </View>
          </Section>

          <Section title="🌟 What Sets Us Apart">
            <View className="flex flex-col gap-3">
              <Card className="border-antar-teal/20">
                <CardContent className="p-4">
                  <Text className="font-semibold text-antar-dark mb-2">
                    🔬 Evidence-Based Care
                  </Text>
                  <Text className="text-muted-foreground text-sm">
                    Guided by clinical reasoning and measurable outcomes
                  </Text>
                </CardContent>
              </Card>

              <Card className="border-antar-orange/20">
                <CardContent className="p-4">
                  <Text className="font-semibold text-antar-dark mb-2">
                    🌱 Holistic Approach
                  </Text>
                  <Text className="text-muted-foreground text-sm">
                    Targeting biomechanical, neuromuscular, and psychosomatic
                    factors
                  </Text>
                </CardContent>
              </Card>

              <Card className="border-antar-pink/30">
                <CardContent className="p-4">
                  <Text className="font-semibold text-antar-dark mb-2">
                    🎯 Personalized Plans
                  </Text>
                  <Text className="text-muted-foreground text-sm">
                    Tailored to your goals, recovery pace, and body's needs
                  </Text>
                </CardContent>
              </Card>

              <Card className="border-antar-teal/20">
                <CardContent className="p-4">
                  <Text className="font-semibold text-antar-dark mb-2">
                    🤝 Ongoing Support
                  </Text>
                  <Text className="text-muted-foreground text-sm">
                    Focused on prevention, awareness, and long-term
                    self-efficacy
                  </Text>
                </CardContent>
              </Card>
            </View>
          </Section>

          <Section title="💰 Pick Your Perfect Plan">
            <View className="mb-4 p-3 rounded-2xl bg-antar-orange/10 border border-antar-orange/20">
              <Text className="text-center font-bold text-antar-orange">
                🎉 INAUGURAL OFFER! GET 25% OFF
              </Text>
            </View>

            <View className="flex flex-col gap-4">
              <Card className="border-antar-teal/20 bg-antar-teal/5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-antar-teal">
                    <Text className="text-lg font-bold">1 Time Session</Text>
                  </CardTitle>
                  <View className="flex-row items-center">
                    <Text className="text-2xl font-bold text-antar-dark mr-2">
                      ₹600
                    </Text>
                    <Text className="text-lg text-muted-foreground line-through">
                      ₹800
                    </Text>
                  </View>
                </CardHeader>
                <CardContent>
                  <Text className="text-sm text-muted-foreground mb-2">
                    • Single session trial{"\n"}• Assessment and guidance{"\n"}•
                    Perfect to get started
                  </Text>
                  <Button
                    className="w-full bg-antar-teal"
                    onPress={() =>
                      Linking.openURL(
                        "https://knowtheantar.com/products/antar-healing-plans?variant=50723541549188"
                      )
                    }
                  >
                    <Text className="font-semibold text-white">
                      Begin Journey
                    </Text>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-antar-orange/20 bg-antar-orange/5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-antar-orange">
                    <Text className="text-lg font-bold">
                      Foundational Relief - 2 Week Plan
                    </Text>
                  </CardTitle>
                  <View className="flex-row items-center">
                    <Text className="text-2xl font-bold text-antar-dark mr-2">
                      ₹4,200
                    </Text>
                    <Text className="text-lg text-muted-foreground line-through">
                      ₹5,600
                    </Text>
                  </View>
                </CardHeader>
                <CardContent>
                  <Text className="text-sm text-muted-foreground mb-2">
                    • 8 Sessions (4 sessions/week){"\n"}• Short-term pain relief
                    {"\n"}• Post-minor injury care
                  </Text>
                  <Button
                    className="w-full bg-antar-orange"
                    onPress={() =>
                      Linking.openURL(
                        "https://knowtheantar.com/products/antar-healing-plans?variant=50521828819076"
                      )
                    }
                  >
                    <Text className="font-semibold text-white">
                      Begin 2 Week Plan
                    </Text>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-antar-teal/20 bg-antar-teal/5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-antar-teal">
                    <Text className="text-lg font-bold">
                      Recovery & Realignment - 4 Week Plan
                    </Text>
                  </CardTitle>
                  <View className="flex-row items-center">
                    <Text className="text-2xl font-bold text-antar-dark mr-2">
                      ₹7,800
                    </Text>
                    <Text className="text-lg text-muted-foreground line-through">
                      ₹10,400
                    </Text>
                  </View>
                </CardHeader>
                <CardContent>
                  <Text className="text-sm text-muted-foreground mb-2">
                    • 16 Sessions (4 sessions/week){"\n"}• Injury recovery{"\n"}
                    • Postural corrections
                  </Text>
                  <Button
                    className="w-full bg-antar-teal"
                    onPress={() =>
                      Linking.openURL(
                        "https://knowtheantar.com/products/antar-healing-plans?variant=50521828851844"
                      )
                    }
                  >
                    <Text className="font-semibold text-white">
                      Begin 4 Week Plan
                    </Text>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-antar-orange/20 bg-antar-orange/5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-antar-orange">
                    <Text className="text-lg font-bold">
                      Restoration & Strengthening - 8 Week Plan
                    </Text>
                  </CardTitle>
                  <View className="flex-row items-center">
                    <Text className="text-2xl font-bold text-antar-dark mr-2">
                      ₹14,400
                    </Text>
                    <Text className="text-lg text-muted-foreground line-through">
                      ₹19,200
                    </Text>
                  </View>
                </CardHeader>
                <CardContent>
                  <Text className="text-sm text-muted-foreground mb-2">
                    • 32 Sessions (4 sessions/week){"\n"}• Chronic pain
                    management{"\n"}• Surgical rehab
                  </Text>
                  <Button
                    className="w-full bg-antar-orange"
                    onPress={() =>
                      Linking.openURL(
                        "https://knowtheantar.com/products/antar-healing-plans?variant=50521828884612"
                      )
                    }
                  >
                    <Text className="font-semibold text-white">
                      Begin 8 Week Plan
                    </Text>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-antar-teal/20 bg-antar-teal/5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-antar-teal">
                    <Text className="text-lg font-bold">
                      Deep Healing & Transformation - 12 Week Plan
                    </Text>
                  </CardTitle>
                  <View className="flex-row items-center">
                    <Text className="text-2xl font-bold text-antar-dark mr-2">
                      ₹19,800
                    </Text>
                    <Text className="text-lg text-muted-foreground line-through">
                      ₹26,400
                    </Text>
                  </View>
                </CardHeader>
                <CardContent>
                  <Text className="text-sm text-muted-foreground mb-2">
                    • 48 Sessions (4 sessions/week){"\n"}• Long-standing
                    conditions{"\n"}• Complete functional recovery
                  </Text>
                  <Button
                    className="w-full bg-antar-teal"
                    onPress={() =>
                      Linking.openURL(
                        "https://knowtheantar.com/products/antar-healing-plans?variant=50521828950148"
                      )
                    }
                  >
                    <Text className="font-semibold text-white">
                      Begin 12 Week Plan
                    </Text>
                  </Button>
                </CardContent>
              </Card>
            </View>
          </Section>

          <Section title="👨‍⚕️ Meet Our Expert">
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

          <Section title="💬 Our Success Stories">
            <View className="flex flex-col gap-3">
              <Card className="border-antar-teal/20 bg-antar-teal/5">
                <CardContent className="p-4">
                  <Text className="font-semibold text-antar-dark mb-1 text-sm">
                    ACL Reconstruction Rehabilitation - Sports Excellence
                  </Text>
                  <Text className="text-muted-foreground text-sm mb-3 italic">
                    "I wasn't sure if recovery after ACL surgery could really
                    happen online, but this program changed my perspective.
                    Every session was guided, encouraging and tailored to my
                    pace."
                  </Text>
                  <Text className="font-semibold text-antar-dark text-xs">
                    Rohan D, 26 years - Football Player
                  </Text>
                </CardContent>
              </Card>

              <Card className="border-antar-orange/20 bg-antar-orange/5">
                <CardContent className="p-4">
                  <Text className="font-semibold text-antar-dark mb-1 text-sm">
                    Desk Job Posture Correction – Ergonomic Rehabilitation
                  </Text>
                  <Text className="text-muted-foreground text-sm mb-3 italic">
                    "Years of desk work had left me with constant neck and upper
                    back pain. I felt disconnected from my own body. My offline
                    sessions with pain relieving modalities had become a part of
                    my monthly routine."
                  </Text>
                  <Text className="font-semibold text-antar-dark text-xs">
                    Ananya S, 34 years - UX Designer
                  </Text>
                </CardContent>
              </Card>

              <Card className="border-antar-pink/30 bg-antar-pink/10">
                <CardContent className="p-4">
                  <Text className="font-semibold text-antar-dark mb-1 text-sm">
                    Geriatric Fall Prevention – Evidence-Based Mobility Training
                  </Text>
                  <Text className="text-muted-foreground text-sm mb-3 italic">
                    "After my fall, I lost not just balance - but confidence.
                    Thankfully I didn't get injured but it was alarming that my
                    body needed expert care with aging and decreased strength."
                  </Text>
                  <Text className="font-semibold text-antar-dark text-xs">
                    Mr. Vasant N, 70 years - Retired Professor
                  </Text>
                </CardContent>
              </Card>

              <Card className="border-antar-teal/20 bg-antar-teal/5">
                <CardContent className="p-4">
                  <Text className="font-semibold text-antar-dark mb-1 text-sm">
                    Postnatal Core Recovery – Diastasis Recti Rehab
                  </Text>
                  <Text className="text-muted-foreground text-sm mb-3 italic">
                    "I felt sharp shooting pain every time I sneezed or coughed
                    after giving birth. This online program was a gentle anchor.
                    With care and understanding, I was guided to reconnect with
                    my body."
                  </Text>
                  <Text className="font-semibold text-antar-dark text-xs">
                    Shaheen A, 30 years - New Mother
                  </Text>
                </CardContent>
              </Card>

              <Card className="border-antar-orange/20 bg-antar-orange/5">
                <CardContent className="p-4">
                  <Text className="font-semibold text-antar-dark mb-1 text-sm">
                    Cervical Spondylosis – Chronic Pain Protocol
                  </Text>
                  <Text className="text-muted-foreground text-sm mb-3 italic">
                    "Chronic neck pain had become my norm - until I found this
                    program. My therapist listened deeply, explained things
                    clearly and crafted exercises that brought real relief."
                  </Text>
                  <Text className="font-semibold text-antar-dark text-xs">
                    Rajeev T, 45 years - Team Leader
                  </Text>
                </CardContent>
              </Card>

              <Card className="border-antar-pink/30 bg-antar-pink/10">
                <CardContent className="p-4">
                  <Text className="font-semibold text-antar-dark mb-1 text-sm">
                    Preventive Mobility – Functional Screening & Correction
                  </Text>
                  <Text className="text-muted-foreground text-sm mb-3 italic">
                    "I joined because I wanted to move better. After every
                    badminton session, I faced a bit of shoulder pain and
                    heaviness on the right side. The therapist noticed patterns
                    and helped me with muscular corrections."
                  </Text>
                  <Text className="font-semibold text-antar-dark text-xs">
                    Deepak S, 29 years - Recreational Athlete
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
            <Card className="border-antar-teal/20 bg-antar-teal/5">
              <CardContent className="p-4">
                <Text className="font-semibold text-antar-dark text-center mb-2">
                  🩺 FREE Consultation Available
                </Text>
                <Text className="text-muted-foreground text-center mb-3 text-sm">
                  Start your healing journey with a personalized rehabilitation
                  plan
                </Text>
                <Button
                  className="w-full bg-antar-teal"
                  onPress={() =>
                    Linking.openURL(
                      "https://knowtheantar.com/pages/physiotherapy#contact_form-box"
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
