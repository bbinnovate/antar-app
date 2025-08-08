import * as React from "react";
import { View } from "react-native";
import { router } from "expo-router";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";

export default function WelcomeScreen() {
  return (
    <View className="flex-1 bg-gradient-to-b from-primary/5 to-secondary/30">
      <View className="flex-1 justify-center px-6 py-8">
        {/* Header Section */}
        <View className="items-center mb-10">
          {/* Hero Logo/Icon */}
          <View className="w-24 h-24 bg-antar-teal/10 rounded-full items-center justify-center mb-6">
            <Text className="text-5xl">🧘</Text>
          </View>
          <Text className="text-4xl font-bold text-center text-antar-teal mb-4">
            Antar
          </Text>
          <Text className="text-center text-muted-foreground text-lg leading-6 px-4">
            Your inner essence. Your wellness journey. Your transformation.
          </Text>
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
          <Button
            onPress={() => router.push("/register")}
            className="w-full h-14 rounded-2xl bg-antar-teal shadow-lg"
          >
            <Text className="font-semibold text-lg text-white">
              Continue with Email OTP
            </Text>
          </Button>

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
    </View>
  );
}
