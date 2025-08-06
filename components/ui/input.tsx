import * as React from "react";
import { TextInput, View } from "react-native";
import { cn } from "~/lib/utils";
import { Text } from "./text";

export interface InputProps
  extends Omit<React.ComponentProps<typeof TextInput>, "className"> {
  className?: string;
  label?: string;
  error?: string;
  ref?: React.RefObject<TextInput>;
}

const Input = React.forwardRef<TextInput, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <View className="w-full">
        {label && (
          <Text className="text-sm font-medium text-foreground mb-2">
            {label}
          </Text>
        )}
        <TextInput
          ref={ref}
          className={cn(
            "flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-base text-foreground web:ring-offset-background web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2 web:disabled:cursor-not-allowed web:disabled:opacity-50",
            error && "border-destructive",
            className
          )}
          placeholderTextColor="#6B7280"
          {...props}
        />
        {error && (
          <Text className="mt-1 text-sm text-destructive">{error}</Text>
        )}
      </View>
    );
  }
);

Input.displayName = "Input";

export { Input };
