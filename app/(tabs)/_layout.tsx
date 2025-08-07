import { Tabs } from "expo-router";
import * as React from "react";
import { Platform, View, Text } from "react-native";
import Loader from "~/components/custom/Loader";
import { useAuthRedirect } from "~/lib/hooks/useAuthRedirect";

export default function TabLayout() {
  const { checking } = useAuthRedirect();
  if (checking) {
    return <Loader />;
  } else {
    return (
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#236A61", // Antar Teal
          tabBarInactiveTintColor: "#6B7280", // Standard gray
          headerShown: false, // Remove duplicate headers
          tabBarStyle: {
            backgroundColor: "rgba(255, 255, 255, 0.95)", // Light background
            borderTopWidth: 1,
            borderTopColor: "rgba(0, 0, 0, 0.1)", // Dark border on light
            elevation: 8,
            shadowOpacity: 0.1,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: -10 },
            shadowColor: "#000",
            height: Platform.OS === "ios" ? 90 : 70,
            paddingBottom: Platform.OS === "ios" ? 25 : 10,
            paddingTop: 5,
            paddingHorizontal: 10,
          },
          tabBarItemStyle: {
            borderRadius: 20,
            marginHorizontal: 1,
            paddingVertical: 5,
          },
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: "600",
            marginTop: 4,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name="🏠" color={color} focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="wellness"
          options={{
            title: "Wellness",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name="🧘" color={color} focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="dashboard"
          options={{
            title: "Dashboard",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name="📊" color={color} focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="community"
          options={{
            title: "Community",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name="👥" color={color} focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name="👤" color={color} focused={focused} />
            ),
          }}
        />
      </Tabs>
    );
  }
}

interface TabBarIconProps {
  name: string;
  color: string;
  focused: boolean;
}

function TabBarIcon({ name, color, focused }: TabBarIconProps) {
  return (
    <View
      style={{
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: focused ? "#236A61" : "transparent",
        shadowColor: focused ? "#236A61" : "transparent",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: focused ? 0.25 : 0,
        shadowRadius: 3.84,
        elevation: focused ? 5 : 0,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          fontSize: 18,
          color: focused ? "white" : color,
        }}
      >
        {name}
      </Text>
    </View>
  );
}
