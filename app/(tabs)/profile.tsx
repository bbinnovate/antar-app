import * as React from "react";
import { View, ScrollView, Alert } from "react-native";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text } from "~/components/ui/text";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

const AVATAR_URI =
  "https://i.pinimg.com/originals/ef/a2/8d/efa28d18a04e7fa40ed49eeb0ab660db.jpg";

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const [user] = React.useState({
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    profileComplete: true,
    joinDate: "January 2024",
    totalSessions: 89,
    currentStreak: 28,
    wellnessScore: 8.5,
  });

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
          onPress: () => router.replace("/"),
        },
      ],
      { cancelable: true }
    );
  };

  const handleEditProfile = () => {
    router.push("/complete-profile");
  };

  return (
    <View
      className="flex-1 bg-gradient-to-b from-primary/5 to-secondary/30"
      style={{ paddingTop: insets.top }}
    >
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="p-6 flex flex-col gap-6">
          {/* Profile Header */}
          <Card className="p-6 rounded-3xl shadow-lg bg-background/95 backdrop-blur-sm border-0">
            <CardContent className="items-center flex flex-col gap-4">
              <Avatar className="w-24 h-24" alt="Profile Picture">
                <AvatarImage source={{ uri: AVATAR_URI }} />
                <AvatarFallback>
                  <Text className="text-2xl font-bold">
                    {user.first_name[0]}
                    {user.last_name[0]}
                  </Text>
                </AvatarFallback>
              </Avatar>

              <View className="items-center flex flex-col gap-1">
                <Text className="text-2xl font-bold text-antar-dark">
                  {user.first_name} {user.last_name}
                </Text>
                <Text className="text-muted-foreground">{user.email}</Text>
                <Text className="text-sm text-antar-teal">
                  Antar member since {user.joinDate}
                </Text>
              </View>

              <Button
                onPress={handleEditProfile}
                className="w-full bg-antar-teal rounded-xl h-12"
              >
                <Text className="font-semibold text-white">Edit Profile</Text>
              </Button>
            </CardContent>
          </Card>

          {/* Wellness Stats */}
          <Card className="p-6 rounded-3xl shadow-lg bg-background/95 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle className="text-xl text-antar-dark">
                Your Wellness Journey
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <View className="flex-row justify-around">
                <View className="items-center">
                  <Text className="text-3xl font-bold text-antar-teal">
                    {user.totalSessions}
                  </Text>
                  <Text className="text-sm text-muted-foreground">
                    Total Sessions
                  </Text>
                </View>
                <View className="items-center">
                  <Text className="text-3xl font-bold text-antar-orange">
                    {user.currentStreak}
                  </Text>
                  <Text className="text-sm text-muted-foreground">
                    Day Streak
                  </Text>
                </View>
                <View className="items-center">
                  <Text className="text-3xl font-bold text-antar-pink">
                    {user.wellnessScore}
                  </Text>
                  <Text className="text-sm text-muted-foreground">
                    Wellness Score
                  </Text>
                </View>
              </View>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="p-6 rounded-3xl shadow-lg bg-background/95 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle className="text-xl text-antar-dark">
                Achievements 🏆
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
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
            </CardContent>
          </Card>

          {/* Settings */}
          <Card className="p-6 rounded-3xl shadow-lg bg-background/95 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle className="text-xl text-antar-dark">
                Settings & Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
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
            </CardContent>
          </Card>

          {/* Sign Out */}
          <Card className="p-6 rounded-3xl shadow-lg bg-background/95 backdrop-blur-sm border-0">
            <CardContent>
              <Button
                onPress={handleLogout}
                className="w-full bg-destructive rounded-xl h-12"
              >
                <Text className="font-semibold text-white">Sign Out</Text>
              </Button>
            </CardContent>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
}
