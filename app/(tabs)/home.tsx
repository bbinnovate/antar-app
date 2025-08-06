import * as React from "react";
import { View, ScrollView, Alert } from "react-native";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Text } from "~/components/ui/text";

const AVATAR_URI =
  "https://i.pinimg.com/originals/ef/a2/8d/efa28d18a04e7fa40ed49eeb0ab660db.jpg";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [user] = React.useState({
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    profileComplete: true,
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
          onPress: () => {
            // TODO: Implement actual logout logic
            console.log("Logging out...");
            router.replace("/");
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleEditProfile = () => {
    // Navigate to edit profile (could reuse complete-profile screen)
    router.push("/complete-profile");
  };

  return (
    <View
      className="flex-1 bg-gradient-to-b from-primary/5 to-secondary/30"
      style={{ paddingTop: insets.top }}
    >
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="p-6 flex flex-col gap-6">
          {/* Welcome Section */}
          <Card className="p-6 rounded-3xl shadow-lg bg-background/95 backdrop-blur-sm border-0">
            <CardHeader className="items-center pb-4">
              <View className="relative">
                <Avatar
                  alt={`${user.first_name} ${user.last_name}'s Avatar`}
                  className="w-24 h-24 border-2 border-primary/20"
                >
                  <AvatarImage source={{ uri: AVATAR_URI }} />
                  <AvatarFallback>
                    <Text className="text-xl font-bold">
                      {user.first_name[0]}
                      {user.last_name[0]}
                    </Text>
                  </AvatarFallback>
                </Avatar>
                <View className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full items-center justify-center border-2 border-background">
                  <Text className="text-white text-xs">✓</Text>
                </View>
              </View>
              <CardTitle className="text-2xl font-bold text-center mt-4 text-antar-teal">
                Welcome back, {user.first_name}!
              </CardTitle>
              <CardDescription className="text-center text-base">
                Ready to continue your wellness transformation?
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Wellness Dashboard */}
          <Card className="p-6 rounded-3xl shadow-lg bg-background/95 backdrop-blur-sm border-0">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex-row items-center">
                <Text className="mr-2">🧘</Text>
                <Text>Wellness Dashboard</Text>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <View className="flex-row gap-3">
                <View className="flex-1">
                  <Button
                    variant="outline"
                    className="w-full justify-center h-16 rounded-2xl border-2 border-antar-teal/30 bg-antar-teal/10"
                  >
                    <Text className="text-2xl mb-1">🧠</Text>
                    <Text className="text-xs font-medium text-antar-teal">
                      Mind Balance
                    </Text>
                  </Button>
                </View>
                <View className="flex-1">
                  <Button
                    variant="outline"
                    className="w-full justify-center h-16 rounded-2xl border-2 border-antar-orange/30 bg-antar-orange/10"
                  >
                    <Text className="text-2xl mb-1">💪</Text>
                    <Text className="text-xs font-medium text-antar-orange">
                      Body Fitness
                    </Text>
                  </Button>
                </View>
              </View>

              <View className="flex-row gap-3">
                <View className="flex-1">
                  <Button
                    variant="outline"
                    className="w-full justify-center h-16 rounded-2xl border-2 border-antar-pink bg-antar-pink/10"
                  >
                    <Text className="text-2xl mb-1">❤️</Text>
                    <Text className="text-xs font-medium text-antar-pink">
                      Emotional Wellness
                    </Text>
                  </Button>
                </View>
                <View className="flex-1">
                  <Button
                    variant="outline"
                    className="w-full justify-center h-16 rounded-2xl border-2 border-antar-teal/30 bg-antar-teal/10"
                  >
                    <Text className="text-2xl mb-1">🌱</Text>
                    <Text className="text-xs font-medium text-antar-teal">
                      Growth Tracking
                    </Text>
                  </Button>
                </View>
              </View>
            </CardContent>
          </Card>

          {/* Profile Status */}
          <Card className="p-6 rounded-3xl shadow-lg bg-background/95 backdrop-blur-sm border-0">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Profile Status</CardTitle>
            </CardHeader>
            <CardContent>
              <View className="flex flex-col gap-3">
                <View className="flex-row items-center justify-between">
                  <Text className="text-muted-foreground">
                    Profile Completion
                  </Text>
                  <View className="flex-row items-center">
                    <View className="w-3 h-3 rounded-full bg-green-500 mr-2" />
                    <Text className="font-semibold text-green-600">
                      Complete
                    </Text>
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
            </CardContent>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
}
