import * as React from "react";
import { View } from "react-native";
import { Text } from "~/components/ui/text";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import DecoratedHeader from "~/components/custom/DecoratedHeader";
import Screen from "~/components/custom/Screen";
import Section from "~/components/custom/Section";

export default function CommunityScreen() {
  const communityPosts = [
    {
      id: 1,
      user: "Sarah M.",
      avatar: "https://i.pravatar.cc/100?img=1",
      time: "2h ago",
      content:
        "Just completed my first 30-day meditation challenge! The transformation in my inner peace is incredible. Thank you Antar community! 🧘✨",
      likes: 24,
      comments: 8,
    },
    {
      id: 2,
      user: "Raj K.",
      avatar: "https://i.pravatar.cc/100?img=2",
      time: "4h ago",
      content:
        "Morning yoga session by the lake. Nature + movement = perfect harmony. Who else loves outdoor practice? 🌅💪",
      likes: 31,
      comments: 12,
    },
    {
      id: 3,
      user: "Maya P.",
      avatar: "https://i.pravatar.cc/100?img=3",
      time: "6h ago",
      content:
        "Emotional wellness check-in: Learning to embrace all feelings as part of the journey. Growth isn't always comfortable, but it's always worth it. ❤️🌱",
      likes: 18,
      comments: 5,
    },
  ];

  return (
    <Screen>
      <DecoratedHeader
        title="Wellness Community"
        subtitle="Connect, share and grow together"
      />

      <Section>
        <View className="flex-row justify-around">
          <View className="items-center">
            <Text className="text-2xl font-bold text-antar-teal">2.5K</Text>
            <Text className="text-xs text-muted-foreground">Members</Text>
          </View>
          <View className="items-center">
            <Text className="text-2xl font-bold text-antar-orange">847</Text>
            <Text className="text-xs text-muted-foreground">Active Today</Text>
          </View>
          <View className="items-center">
            <Text className="text-2xl font-bold text-antar-pink">156</Text>
            <Text className="text-xs text-muted-foreground">Posts Today</Text>
          </View>
        </View>
      </Section>

      <Section
        title="Share Your Journey"
        subtitle="Inspire others with your wellness insights and experiences"
      >
        <Button className="w-full bg-antar-teal">
          <Text className="font-semibold text-white">Create Post</Text>
        </Button>
      </Section>

      <Section title="Community Feed">
        <View className="flex flex-col gap-4">
          {communityPosts.map((post) => (
            <View
              key={post.id}
              className="p-4 rounded-2xl bg-white/5 border border-border"
            >
              <View className="flex flex-col gap-3">
                <View className="flex-row items-center gap-3">
                  <Avatar className="w-10 h-10" alt={post.user}>
                    <AvatarImage source={{ uri: post.avatar }} />
                    <AvatarFallback>
                      <Text className="text-sm font-medium">
                        {post.user
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </Text>
                    </AvatarFallback>
                  </Avatar>
                  <View className="flex-1">
                    <Text className="font-medium text-antar-dark">
                      {post.user}
                    </Text>
                    <Text className="text-xs text-muted-foreground">
                      {post.time}
                    </Text>
                  </View>
                </View>

                <Text className="text-muted-foreground leading-relaxed">
                  {post.content}
                </Text>

                <View className="flex-row justify-between pt-2 border-t border-border/50">
                  <View className="flex-row items-center gap-1">
                    <Text className="text-lg">❤️</Text>
                    <Text className="text-sm text-muted-foreground">
                      {post.likes}
                    </Text>
                  </View>
                  <View className="flex-row items-center gap-1">
                    <Text className="text-lg">💬</Text>
                    <Text className="text-sm text-muted-foreground">
                      {post.comments}
                    </Text>
                  </View>
                  <Text className="text-lg">🔗</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </Section>

      <Section title="Wellness Groups">
        <View className="flex flex-col gap-3">
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="font-medium">🧘 Daily Meditation Circle</Text>
              <Text className="text-xs text-muted-foreground">234 members</Text>
            </View>
            <Button className="px-4 py-2 bg-antar-teal rounded-lg">
              <Text className="text-white text-sm">Join</Text>
            </Button>
          </View>

          <View className="flex-row justify-between items-center">
            <View>
              <Text className="font-medium">💪 Yoga Enthusiasts</Text>
              <Text className="text-xs text-muted-foreground">189 members</Text>
            </View>
            <Button className="px-4 py-2 bg-antar-orange rounded-lg">
              <Text className="text-white text-sm">Join</Text>
            </Button>
          </View>

          <View className="flex-row justify-between items-center">
            <View>
              <Text className="font-medium">❤️ Emotional Wellness Support</Text>
              <Text className="text-xs text-muted-foreground">156 members</Text>
            </View>
            <Button className="px-4 py-2 bg-antar-pink rounded-lg">
              <Text className="text-antar-dark text-sm">Join</Text>
            </Button>
          </View>
        </View>
      </Section>
    </Screen>
  );
}
