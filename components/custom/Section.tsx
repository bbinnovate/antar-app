import React from "react";
import { View } from "react-native";
import { Text } from "~/components/ui/text";
import { cn } from "~/lib/utils";

interface SectionProps {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

export default function Section(props: SectionProps) {
  const { title, subtitle, children, className, containerClassName } = props;
  return (
    <View className={cn("w-full", containerClassName)}>
      {(title || subtitle) && (
        <View className="mb-3">
          {title ? (
            <Text className="text-xl font-semibold text-antar-dark">
              {title}
            </Text>
          ) : null}
          {subtitle ? (
            <Text className="text-sm text-muted-foreground">{subtitle}</Text>
          ) : null}
        </View>
      )}
      <View className={cn("w-full", className)}>{children}</View>
    </View>
  );
}
