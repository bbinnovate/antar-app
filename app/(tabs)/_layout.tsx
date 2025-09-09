import { Tabs } from "expo-router";
import * as React from "react";
import {
  Platform,
  View,
  Text,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {
  HandHeart,
  BookOpen,
  Users,
  Bot,
  User as UserIcon,
  Image as ImageIcon,
  Heart,
} from "lucide-react-native";
const profileLogo = require("~/assets/images/profileLogo.png");

export default function TabLayout() {
  return (
    <SafeAreaProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#E87D36",
          tabBarInactiveTintColor: "#6B7280",
        }}
        tabBar={(props) => <CustomTabBar {...props} />}
      >
        <Tabs.Screen
          name="offerings"
          options={{
            title: "Offerings",
          }}
        />
        <Tabs.Screen
          name="insights"
          options={{
            title: "Insights",
          }}
        />
        <Tabs.Screen
          name="parivar"
          options={{
            title: "Parivaar",
          }}
        />
        <Tabs.Screen
          name="chatbot"
          options={{
            title: "ChatBot",
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
          }}
        />
        {/* Keep these routes in codebase but hide from tab bar */}
        <Tabs.Screen name="home" options={{ href: null }} />
        <Tabs.Screen name="sessions" options={{ href: null }} />
        <Tabs.Screen name="plans" options={{ href: null }} />
        <Tabs.Screen name="community" options={{ href: null }} />
        <Tabs.Screen name="wellness" options={{ href: null }} />
      </Tabs>
    </SafeAreaProvider>
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

function getIcon(name: string, color: string, focused: boolean) {
  const size = 20;
  const stroke = focused ? "#FFFFFF" : color;
  switch (name) {
    case "offerings":
      return <HandHeart size={size} color={stroke} strokeWidth={2} />;
    case "insights":
      return <BookOpen size={size} color={stroke} strokeWidth={2} />;
    case "parivar":
      return (
        <View
          style={{
            width: size,
            height: size,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Users size={size} color={stroke} strokeWidth={2} />
          <Heart
            size={Math.round(size * 0.65)}
            color={stroke}
            strokeWidth={2}
            style={{ position: "absolute", top: -4 }}
          />
        </View>
      );
    case "chatbot":
      return <Bot size={size} color={stroke} strokeWidth={2} />;
    case "profile":
      return <UserIcon size={size} color={stroke} strokeWidth={2} />;
    default:
      return <ImageIcon size={size} color={stroke} strokeWidth={2} />;
  }
}

function CustomTabBar({ state, descriptors, navigation }: any) {
  const activeColor = "#E87D36"; // Antar Orange
  const inactiveColor = "#6B7280"; // Gray
  const visibleTabs = new Set([
    "offerings",
    "insights",
    "parivar",
    "chatbot",
    "profile",
  ]);
  const focusedKey = state.routes[state.index]?.key;

  return (
    <SafeAreaView edges={["bottom"]} style={{ backgroundColor: "transparent" }}>
      <View
        style={{
          marginHorizontal: 10,
          marginBottom: Platform.OS === "ios" ? 6 : 10,
          marginTop: 8,
          backgroundColor: "#ffffff",
          borderRadius: 28,
          paddingVertical: 8,
          paddingHorizontal: 8,
          shadowColor: "#000",
          shadowOpacity: 0.20,
          shadowRadius: 14,
          shadowOffset: { width: 0, height: 4 },
          elevation: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {state.routes
          .filter((r: any) => visibleTabs.has(r.name))
          .map((route: any) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const isFocused = route.key === focusedKey;
            const color = isFocused ? activeColor : inactiveColor; // label color
            const iconColor = isFocused ? "#FFFFFF" : activeColor; // icon stroke color matches Figma

            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });
              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: "tabLongPress",
                target: route.key,
              });
            };

            return (
              <TouchableOpacity
                key={route.key}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={{ flex: 1, alignItems: "center" }}
                activeOpacity={0.8}
              >
                <View
                  style={{
                    width: 42,
                    height: 36,
                    borderRadius: 20,
                    backgroundColor: isFocused ? activeColor : "transparent",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {getIcon(route.name, iconColor, isFocused)}
                </View>
                <Text
                  style={{
                    marginTop: 4,
                    fontSize: 11,
                    fontWeight: "600",
                    color,
                  }}
                  numberOfLines={1}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
      </View>
    </SafeAreaView>
  );
}
