import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LucideArrowLeft } from "lucide-react-native";
import { router, useNavigation } from "expo-router";

// Dummy notifications with date/time
const notifications = [
  {
    id: "1",
    title: "Welcome!",
    message: "Thanks for joining our app 🎉",
    time: "Last Monday at 10:15 AM",
    read: false,
  },
  {
    id: "2",
    title: "AI Update",
    message: "Your AI has new features available.",
    time: "Last Tuesday at 6:45 PM",
    read: false,
  },
  {
    id: "3",
    title: "Reminder",
    message: "Don’t forget to complete your profile.",
    time: "Last Wednesday at 9:00 AM",
    read: false,
  },
  {
    id: "4",
    title: "Offer",
    message: "Special discount available today only.",
    time: "Last Thursday at 3:30 PM",
    read: false,
  },
  {
    id: "5",
    title: "System",
    message: "We’ve improved performance and fixed bugs.",
    time: "Last Friday at 8:20 PM",
    read: false,
  },
  {
    id: "5",
    title: "System",
    message: "We’ve improved performance and fixed bugs.",
    time: "Last Friday at 8:20 PM",
    read: false,
  },
  {
    id: "5",
    title: "System",
    message: "We’ve improved performance and fixed bugs.",
    time: "Last Friday at 8:20 PM",
    read: false,
  },
  {
    id: "5",
    title: "System",
    message: "We’ve improved performance and fixed bugs.",
    time: "Last Friday at 8:20 PM",
    read: false,
  },
  {
    id: "5",
    title: "System",
    message: "We’ve improved performance and fixed bugs.",
    time: "Last Friday at 8:20 PM",
    read: false,
  },
  {
    id: "5",
    title: "System",
    message: "We’ve improved performance and fixed bugs.",
    time: "Last Friday at 8:20 PM",
    read: false,
  },
];

export default function NotificationScreen() {
  const navigation = useNavigation();

  const renderItem = ({ item }: { item: typeof notifications[0] }) => (
    <View
      style={{
        backgroundColor: "white",
        padding: 16,
        marginVertical: 6,
        marginHorizontal: 16,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
      }}
    >
      {/* message */}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {/* Badge if unread */}
        {!item.read && (
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: "#E87D36",
              marginRight: 8,
            }}
          />
        )}
        <Text style={{ fontSize: 16, fontWeight: "bold", color: "black" }}>
          {item.message}
        </Text>
      </View>

      {/* Date/Time */}
      <Text style={{ fontSize: 12, color: "#888", marginTop: 6 }}>
        {item.time}
      </Text>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <SafeAreaView
        edges={["top"]}
        style={{
          backgroundColor: "white",
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
        }}
      >
        {/* Header */}
        <View
          style={{
            backgroundColor: "white",
            padding: 16,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Left: Back button */}
          <TouchableOpacity
            onPress={() => {
              router.back();
            }}
            style={{ width: 40, alignItems: "flex-start" }}
          >
            <LucideArrowLeft size={26} color="black" />
          </TouchableOpacity>

          {/* Center: Title */}
          <Text
            style={{
              fontSize: 22,
              fontWeight: "bold",
              textAlign: "center",
              color: "black",
              flex: 1,
            }}
          >
            Notifications
          </Text>

          {/* Right: placeholder (keeps title centered) */}
          <View style={{ width: 40 }} />
        </View>
      </SafeAreaView>

      {/* Notifications list */}
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingVertical: 12 }}
      />
    </View>
  );
}
