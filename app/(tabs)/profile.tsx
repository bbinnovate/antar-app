import React, { useCallback } from "react";
import { View, Alert } from "react-native";
import { router } from "expo-router";
import { Text } from "~/components/ui/text";
import Screen from "~/components/custom/Screen";
import Section from "~/components/custom/Section";
import { Button } from "~/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import RESTApiCall from "~/lib/RESTApiCall";

const AVATAR_URI =
  "https://i.pinimg.com/originals/ef/a2/8d/efa28d18a04e7fa40ed49eeb0ab660db.jpg";

export default function ProfileScreen() {
  const [user, setUser] = React.useState({
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    profileComplete: true,
    joinDate: "January 2024",
    totalSessions: 89,
    currentStreak: 28,
    wellnessScore: 8.5,
  } as any);

  const handleLogout = () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out of your Antar wellness journey?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Sign Out",
          style: "destructive",
          onPress: () => {
            AsyncStorage.removeItem("antar-app-access-data");
            router.replace("/");
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleEditProfile = () => {
    router.push("/complete-profile");
  };

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
            setUser((prev: any) => ({ ...prev, ...response?.data?.user }));
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
    <Screen backgroundClassName="">
      <Section>
        <View className="items-center flex flex-col gap-4">
          <Avatar className="w-24 h-24" alt="Profile Picture">
            <AvatarImage source={{ uri: AVATAR_URI }} />
            <AvatarFallback>
              <Text className="text-2xl font-bold">
                {user?.first_name}
                {user?.last_name}
              </Text>
            </AvatarFallback>
          </Avatar>

          <View className="items-center flex flex-col gap-1">
            <Text className="text-2xl font-bold text-antar-dark">
              {user?.first_name} {user?.last_name}
            </Text>
            <Text className="text-muted-foreground">{user?.email}</Text>
            <Text className="text-sm text-antar-teal">
              Antar member since {user?.createdAtFormatted}
            </Text>
          </View>

          <Button
            onPress={handleEditProfile}
            className="w-full bg-antar-teal rounded-xl h-12"
          >
            <Text className="font-semibold text-white">Edit Profile</Text>
          </Button>
        </View>
      </Section>

      <Section title="Your Wellness Journey">
        <View className="flex-row justify-around">
          <View className="items-center">
            <Text className="text-3xl font-bold text-antar-teal">
              {user?.totalSessions}
            </Text>
            <Text className="text-sm text-muted-foreground">
              Total Sessions
            </Text>
          </View>
          <View className="items-center">
            <Text className="text-3xl font-bold text-antar-orange">
              {user?.currentStreak}
            </Text>
            <Text className="text-sm text-muted-foreground">Day Streak</Text>
          </View>
          <View className="items-center">
            <Text className="text-3xl font-bold text-antar-pink">
              {user?.wellnessScore}
            </Text>
            <Text className="text-sm text-muted-foreground">
              Wellness Score
            </Text>
          </View>
        </View>
      </Section>

      <Section title="Achievements 🏆">
        <View className="flex flex-col gap-4">
          <View className="flex-row items-center gap-4">
            <View className="w-12 h-12 bg-antar-teal/20 rounded-full items-center justify-center">
              <Text className="text-xl">🧘</Text>
            </View>
            <View className="flex-1">
              <Text className="font-semibold text-antar-dark">
                Meditation Master
              </Text>
              <Text className="text-sm text-muted-foreground">
                Completed 50+ meditation sessions
              </Text>
            </View>
          </View>

          <View className="flex-row items-center gap-4">
            <View className="w-12 h-12 bg-antar-orange/20 rounded-full items-center justify-center">
              <Text className="text-xl">🔥</Text>
            </View>
            <View className="flex-1">
              <Text className="font-semibold text-antar-dark">
                Consistency Champion
              </Text>
              <Text className="text-sm text-muted-foreground">
                30-day wellness streak achieved
              </Text>
            </View>
          </View>

          <View className="flex-row items-center gap-4">
            <View className="w-12 h-12 bg-antar-pink/30 rounded-full items-center justify-center">
              <Text className="text-xl">❤️</Text>
            </View>
            <View className="flex-1">
              <Text className="font-semibold text-antar-dark">
                Emotional Balance
              </Text>
              <Text className="text-sm text-muted-foreground">
                Completed emotional wellness program
              </Text>
            </View>
          </View>

          <View className="flex-row items-center gap-4">
            <View className="w-12 h-12 bg-antar-teal/20 rounded-full items-center justify-center">
              <Text className="text-xl">🌱</Text>
            </View>
            <View className="flex-1">
              <Text className="font-semibold text-antar-dark">
                Growth Mindset
              </Text>
              <Text className="text-sm text-muted-foreground">
                Embracing continuous transformation
              </Text>
            </View>
          </View>
        </View>
      </Section>

      <Section title="Settings & Preferences">
        <View className="flex flex-col gap-3">
          <Button className="w-full bg-transparent border border-antar-teal rounded-xl h-12">
            <Text className="font-semibold text-antar-teal">
              Notification Settings
            </Text>
          </Button>

          <Button className="w-full bg-transparent border border-antar-orange rounded-xl h-12">
            <Text className="font-semibold text-antar-orange">
              Privacy Settings
            </Text>
          </Button>

          <Button className="w-full bg-antar-pink/10 border border-antar-pink rounded-xl h-12">
            <Text className="font-semibold text-antar-pink">
              Wellness Preferences
            </Text>
          </Button>

          <Button className="w-full bg-transparent border border-muted rounded-xl h-12">
            <Text className="font-semibold text-muted-foreground">
              Help & Support
            </Text>
          </Button>
        </View>
      </Section>

      <Section>
        <Button
          onPress={handleLogout}
          className="w-full bg-destructive rounded-xl h-12"
        >
          <Text className="font-semibold text-white">Sign Out</Text>
        </Button>
      </Section>
    </Screen>
  );
}
