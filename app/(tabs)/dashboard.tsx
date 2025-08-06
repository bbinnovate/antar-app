import * as React from "react";
import { View, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text } from "~/components/ui/text";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Progress } from "~/components/ui/progress";

export default function DashboardScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex-1 bg-gradient-to-b from-primary/5 to-secondary/30"
      style={{ paddingTop: insets.top }}
    >
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="p-6 flex flex-col gap-6">
          {/* Header */}
          <View className="items-center mb-6">
            <Text className="text-4xl mb-2">📊</Text>
            <Text className="text-2xl font-bold text-antar-dark">
              Progress Dashboard
            </Text>
            <Text className="text-muted-foreground text-center mt-2">
              Track your transformation journey
            </Text>
          </View>

          {/* Weekly Progress */}
          <Card className="p-6 rounded-3xl shadow-lg bg-background/95 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle className="text-xl text-antar-teal">
                This Week's Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
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
                  <Text className="text-sm font-medium mb-2">
                    Yoga Practice
                  </Text>
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
            </CardContent>
          </Card>

          {/* Wellness Stats */}
          <View className="flex-row gap-4">
            <Card className="flex-1 p-4 rounded-2xl bg-background/95">
              <CardContent className="items-center">
                <Text className="text-2xl font-bold text-antar-teal">28</Text>
                <Text className="text-xs text-muted-foreground text-center">
                  Days Streak
                </Text>
              </CardContent>
            </Card>

            <Card className="flex-1 p-4 rounded-2xl bg-background/95">
              <CardContent className="items-center">
                <Text className="text-2xl font-bold text-antar-orange">
                  156
                </Text>
                <Text className="text-xs text-muted-foreground text-center">
                  Minutes Today
                </Text>
              </CardContent>
            </Card>
          </View>

          {/* Monthly Overview */}
          <Card className="p-6 rounded-3xl shadow-lg bg-background/95 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle className="text-xl text-antar-dark">
                Monthly Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
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
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="p-6 rounded-3xl shadow-lg bg-background/95 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle className="text-xl text-antar-dark">
                Recent Achievements 🏆
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
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
            </CardContent>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
}
