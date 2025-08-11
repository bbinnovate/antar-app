import { Tabs } from "expo-router";
import * as React from "react";
import { Platform, View, Text, Image, ImageSourcePropType } from "react-native";
const profileLogo = require("~/assets/images/profileLogo.png");

export default function TabLayout() {
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
        name="parivar"
        options={{
          title: "Parivar",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              imageSource={profileLogo}
              color={color}
              focused={focused}
              emphasized
              suppressFocusStyle
            />
          ),
          tabBarLabel: () => (
            <Text
              style={{
                fontSize: 10,
                fontWeight: "700",
                marginTop: 4,
                color: "#1F2937",
              }}
            >
              Parivar
            </Text>
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

interface TabBarIconProps {
  name?: string;
  imageSource?: ImageSourcePropType;
  color: string;
  focused: boolean;
  emphasized?: boolean;
  suppressFocusStyle?: boolean;
}

function TabBarIcon({
  name,
  imageSource,
  color,
  focused,
  emphasized = false,
  suppressFocusStyle = false,
}: TabBarIconProps) {
  return (
    <View
      style={{
        width: emphasized ? 56 : 36,
        height: emphasized ? 56 : 36,
        borderRadius: emphasized ? 28 : 18,
        backgroundColor: emphasized ? "rgba(35,106,97,0.08)" : "transparent",
        borderWidth: focused && !suppressFocusStyle ? 2 : 0,
        borderColor: focused && !suppressFocusStyle ? "#236A61" : "transparent",
        shadowColor: emphasized ? "#236A61" : "transparent",
        shadowOffset: { width: 0, height: emphasized ? 6 : 2 },
        shadowOpacity: emphasized ? 0.2 : 0,
        shadowRadius: emphasized ? 6 : 3.84,
        elevation: emphasized ? 4 : 0,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {imageSource ? (
        <Image
          source={imageSource}
          style={{
            width: emphasized ? 28 : 20,
            height: emphasized ? 28 : 20,
          }}
          resizeMode="contain"
        />
      ) : (
        <Text
          style={{
            fontSize: emphasized ? 22 : 18,
            color: focused && !suppressFocusStyle ? "white" : color,
          }}
        >
          {name}
        </Text>
      )}
    </View>
  );
}
