import { router } from "expo-router";
import { Bell } from "lucide-react-native";
import * as React from "react";
import {
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  View,
} from "react-native";
import { Text } from "~/components/ui/text";

interface NotificationHeaderProps {
  title?: string;
  subtitle?: string;
  avatarSource?: ImageSourcePropType;
}

const getGreeting = () => {
  const now = new Date();
  const hour = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const ampm = hour >= 12 ? "PM" : "AM";
  const formattedHour = ((hour + 11) % 12) + 1; // convert to 12-hour format
  const timeString = `${formattedHour}:${minutes} ${ampm}`;

  if (hour < 12) {
    return `Good Morning`;
  } else if (hour < 17) {
    return `Good Afternoon`;
  } else if (hour < 20) {
    return `Good Evening`;
  } else {
    return `Good Night`;
  }
};

// Teal header with reference-style decorative shapes
export default function NotificationHeader({
  title,
  subtitle,
  avatarSource,
}: NotificationHeaderProps) {
  const handleNotification = async () => {
    await router.push("/(tabs)/notification");
  };

  return (
    <View className="rounded-full bg-[#E87D361A]/10 fix border-2 border-solid border-[#E87D361A]/50">
      {/* decorative chips */}
      <View className="px-6 py-2 flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          {avatarSource ? (
            <Image
              source={avatarSource}
              style={{ width: 30, height: 30, borderRadius: 24 }}
            />
          ) : null}
          <Text className="text-[#E87D36] text-lg font-semibold">
            {title ? title : getGreeting()}
          </Text>
        </View>
        <TouchableOpacity
          onPressIn={() => handleNotification()}
          activeOpacity={0.7}
        >
          <Bell size={24} color="#E87D36" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
