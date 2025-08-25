import * as React from "react";
import { View, Image } from "react-native";
import { router } from "expo-router";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import BrandBackground from "~/components/custom/BrandBackground";
import GradientCTA from "~/components/custom/GradientCTA";
import OnboardingCarousel from "~/components/custom/OnboardingCarousel";
const character1 = require("~/assets/images/characters/6836290.jpg");
const character2 = require("~/assets/images/characters/6836397.jpg");
const logoImage = require("~/assets/images/profileLogo.png");

export default function WelcomeScreen() {
  return (
    <BrandBackground>
      <View className="flex-1 justify-center px-6 py-8">
        {/* Header Section */}
        <View className="items-center mb-8">
          {/* Logo and Brand Name - Horizontal */}
          <View className="flex-row items-center justify-center mb-4">
            <Image
              source={logoImage}
              className="w-12 h-12 mr-3"
              resizeMode="contain"
            />
            <Text className="text-3xl font-bold text-antar-teal">ANTAR</Text>
          </View>
          <Text className="text-center text-muted-foreground text-lg leading-6 px-4">
            Your inner essence. Your wellness journey. Your transformation.
          </Text>
        </View>

        {/* Onboarding Carousel */}
        <View className="mb-8 -mx-6">
          <OnboardingCarousel
            slides={[
              { key: "s1", image: character1, title: "", subtitle: "" },
              { key: "s2", image: character2, title: "", subtitle: "" },
            ]}
            compact
          />
        </View>

        {/* Feature highlights */}
        <View className="bg-background/50 rounded-2xl p-4 mb-8">
          <View className="flex flex-col gap-1">
            <View className="flex-row items-center gap-1">
              <View className="w-10 h-10 bg-antar-teal/20 rounded-full items-center justify-center">
                <Text className="text-antar-teal text-lg">🧠</Text>
              </View>
              <Text className="text-foreground flex-1 text-base">
                Personalized holistic wellness journey
              </Text>
            </View>
            <View className="flex-row items-center gap-1">
              <View className="w-10 h-10 bg-antar-orange/20 rounded-full items-center justify-center">
                <Text className="text-antar-orange text-lg">⚡</Text>
              </View>
              <Text className="text-foreground flex-1 text-base">
                Ancient wisdom meets modern science
              </Text>
            </View>
            <View className="flex-row items-center gap-1">
              <View className="w-10 h-10 bg-antar-pink/40 rounded-full items-center justify-center">
                <Text className="text-antar-dark text-lg">🌱</Text>
              </View>
              <Text className="text-foreground flex-1 text-base">
                Transform physically, mentally & emotionally
              </Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="flex flex-col gap-2">
          <GradientCTA
            title="Continue with Email OTP"
            onPress={() => router.push("/register")}
          />

          {/* Divider */}
          <View className="flex-row items-center py-2">
            <View className="flex-1 h-px bg-border" />
            <Text className="px-6 text-xs text-muted-foreground uppercase tracking-wide">
              Or
            </Text>
            <View className="flex-1 h-px bg-border" />
          </View>

          <View className="flex-row justify-center items-center pb-2 -mt-5">
            <Text className="text-muted-foreground">
              Already have an account?{" "}
            </Text>
            <Button
              variant="link"
              onPress={() => router.push("/login")}
              className="p-0 h-auto"
            >
              <Text className="text-primary font-semibold">Sign In</Text>
            </Button>
          </View>
        </View>
      </View>
    </BrandBackground>
  );
}
