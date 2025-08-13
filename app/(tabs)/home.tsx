import React, { useCallback, useState } from "react";
import { View } from "react-native";
import { Text } from "~/components/ui/text";
import { Progress } from "~/components/ui/progress";
import DecoratedHeader from "~/components/custom/DecoratedHeader";
import Screen from "~/components/custom/Screen";
import Section from "~/components/custom/Section";
import { useFocusEffect } from "@react-navigation/native";
import RESTApiCall from "~/lib/RESTApiCall";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen() {
  const [user, setUser] = useState({
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    profileComplete: true,
  });

  const apiCall = new RESTApiCall();

  useFocusEffect(
    useCallback(() => {
      const controller = new AbortController();
      const { signal } = controller;

      const fetchData = async () => {
        try {
          const data: string | null = await AsyncStorage.getItem(
            "antar-app-access-data"
          );
          if (!data) return null;
          const response = await apiCall.get("user/profile", {
            signal,
            headers: { Authorization: `Bearer ${JSON.parse(data).token}` },
          });

          if (response?.data?.success) {
            setUser((prev) => ({ ...prev, ...response?.data?.user }));
          }
        } catch (error) {
          console.error("Fetch error:", error);
        }
      };

      fetchData();

      // Cleanup on screen blur or component unmount
      return () => {
        controller.abort(); // Cancels the fetch
      };
    }, [])
  );

  return (
    <Screen>
      <DecoratedHeader
        title={`Hello ${user?.first_name}, what can I do for you today?`}
        subtitle="Start a quick practice or view your profile"
      />

      <Section title="This Week's Progress">
        <View className="flex flex-col gap-3">
          <View>
            <Text className="text-sm font-medium mb-2">
              Meditation Sessions
            </Text>
            <Progress value={75} className="h-3 bg-antar-teal/20">
              <View
                className="h-full bg-antar-teal rounded-full"
                style={{ width: "75%" }}
              />
            </Progress>
            <Text className="text-xs text-muted-foreground mt-1">
              5 of 7 days
            </Text>
          </View>

          <View>
            <Text className="text-sm font-medium mb-2">Yoga Practice</Text>
            <Progress value={60} className="h-3 bg-antar-orange/20">
              <View
                className="h-full bg-antar-orange rounded-full"
                style={{ width: "60%" }}
              />
            </Progress>
            <Text className="text-xs text-muted-foreground mt-1">
              3 of 5 sessions
            </Text>
          </View>

          <View>
            <Text className="text-sm font-medium mb-2">
              Emotional Check-ins
            </Text>
            <Progress value={85} className="h-3 bg-antar-pink/30">
              <View
                className="h-full bg-antar-pink rounded-full"
                style={{ width: "85%" }}
              />
            </Progress>
            <Text className="text-xs text-muted-foreground mt-1">
              6 of 7 days
            </Text>
          </View>
        </View>
      </Section>

      <Section>
        <View className="flex-row gap-4">
          <View className="flex-1 bg-white/5 border border-border rounded-2xl p-4 items-center">
            <Text className="text-2xl font-bold text-antar-teal">28</Text>
            <Text className="text-xs text-muted-foreground text-center">
              Days Streak
            </Text>
          </View>
          <View className="flex-1 bg-white/5 border border-border rounded-2xl p-4 items-center">
            <Text className="text-2xl font-bold text-antar-orange">156</Text>
            <Text className="text-xs text-muted-foreground text-center">
              Minutes Today
            </Text>
          </View>
        </View>
      </Section>

      <Section title="Monthly Insights">
        <View className="flex-col gap-3">
          <View className="flex-row justify-between items-center">
            <Text className="text-muted-foreground">Total Sessions</Text>
            <Text className="font-semibold text-antar-teal">89</Text>
          </View>
          <View className="flex-row justify-between items-center">
            <Text className="text-muted-foreground">Mindful Minutes</Text>
            <Text className="font-semibold text-antar-orange">1,247</Text>
          </View>
          <View className="flex-row justify-between items-center">
            <Text className="text-muted-foreground">Wellness Score</Text>
            <Text className="font-semibold text-antar-teal">8.5/10</Text>
          </View>
        </View>
      </Section>

      <Section title="Recent Achievements 🏆">
        <View className="flex flex-col gap-3">
          <View className="flex-row items-center gap-3">
            <Text className="text-2xl">🧘</Text>
            <View className="flex-1">
              <Text className="font-medium">Meditation Master</Text>
              <Text className="text-xs text-muted-foreground">
                Completed 30 meditation sessions
              </Text>
            </View>
          </View>
          <View className="flex-row items-center gap-3">
            <Text className="text-2xl">🌱</Text>
            <View className="flex-1">
              <Text className="font-medium">Growth Mindset</Text>
              <Text className="text-xs text-muted-foreground">
                7-day wellness streak achieved
              </Text>
            </View>
          </View>
        </View>
      </Section>

      <Section title="Profile Status">
        <View className="flex flex-col gap-3">
          <View className="flex-row items-center justify-between">
            <Text className="text-muted-foreground">Profile Completion</Text>
            <View className="flex-row items-center">
              <View className="w-3 h-3 rounded-full bg-green-500 mr-2" />
              <Text className="font-semibold text-green-600">Complete</Text>
            </View>
          </View>

          <View className="w-full bg-secondary/50 rounded-full h-2">
            <View
              className="bg-antar-teal h-2 rounded-full"
              style={{ width: "100%" }}
            />
          </View>

          <Text className="text-xs text-muted-foreground text-center">
            Great! Your profile is fully set up
          </Text>
        </View>
      </Section>
    </Screen>
  );
}
