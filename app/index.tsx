import * as React from "react";
import { View, Image } from "react-native";
import { router } from "expo-router";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import GradientCTA from "~/components/custom/GradientCTA";
import OnboardingCarousel from "~/components/custom/OnboardingCarousel";

// Background images
const welcomeBg = require("~/assets/images/backgrounds/welcome-bg.jpg");
const plansBg = require("~/assets/images/backgrounds/plans-bg.jpg");
const nutritionBg = require("~/assets/images/backgrounds/nutrition-bg.jpg");
const chatBg = require("~/assets/images/backgrounds/chat-bg.jpg");
const logoImage = require("~/assets/images/profileLogo.png");

export default function WelcomeScreen() {
  const [index, setIndex] = React.useState(0);
  return (
    <View className="flex-1 bg-[#111214]">
      <View className="flex-1">
        {/* Onboarding Carousel */}
        <OnboardingCarousel
          slides={[
            {
              key: "welcome",
              image: welcomeBg,
              title: "Welcome To\nAntar Health App!",
              subtitle: "A path to feeling healthier,\nwhole, and healed.",
              logo: logoImage,
            },
            {
              key: "plans",
              image: plansBg,
              title: "Personalized\nHealth Plans",
              subtitle: "We curate plans that align\nwith your lifestyle.",
              logo: logoImage,
            },
            {
              key: "nutrition",
              image: nutritionBg,
              title: "Nutrition & Diet Guidance",
              subtitle: "We curate the right diet for you.",
              logo: logoImage,
            },
            {
              key: "chat",
              image: chatBg,
              title: "Chat Support\nwith Antar AI",
              subtitle: "Get support from our AI ChatBot.",
              logo: logoImage,
            },
          ]}
          compact
          onIndexChange={setIndex}
        />
      </View>
      {/* Persistent bottom overlay: progress + actions */}
      <View className="px-6 pb-8">
        <GradientCTA
          title="Get Started"
          onPress={() => router.push("/register")}
        />
        <View className="flex-row justify-center items-center mb-3 mt-1">
          <Text className="text-white">Already have account?</Text>
          <Button
            variant="link"
            onPress={() => router.push("/register")}
            size={"sm"}
          >
            <Text className="text-antar-orange font-medium">Sign In</Text>
          </Button>
        </View>

        <View className="flex-row justify-center items-center mb-4">
          {[0, 1, 2, 3].map((i) => (
            <View
              key={i}
              className="mx-1"
              style={{
                width: i === index ? 40 : 20,
                height: 5,
                backgroundColor:
                  i === index ? "#ffffff" : "rgba(255, 255, 255, 0.2)",
                borderRadius: 3,
              }}
            />
          ))}
        </View>
      </View>
    </View>
  );
}
