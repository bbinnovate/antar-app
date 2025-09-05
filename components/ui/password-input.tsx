import * as React from "react";
import { TextInput, View, Pressable } from "react-native";
import { cn } from "~/lib/utils";
import { Text } from "./text";
import { EyeIcon, EyeOffIcon } from "lucide-react-native";

export interface PasswordInputProps
  extends Omit<
    React.ComponentProps<typeof TextInput>,
    "className" | "secureTextEntry"
  > {
  className?: string;
  label?: string;
  error?: string;
  ref?: React.RefObject<TextInput>;
}

const PasswordInput = React.forwardRef<TextInput, PasswordInputProps>(
  ({ className, label, error, ...props }, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

    const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };

    return (
      <View className="w-full">
        {label && (
          <Text className="text-sm font-medium text-foreground mb-2">
            {label}
          </Text>
        )}
        <View className="relative">
          <TextInput
            ref={ref}
            className={cn(
              "flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 pr-12 text-base text-foreground web:ring-offset-background web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2 web:disabled:cursor-not-allowed web:disabled:opacity-50",
              error && "border-destructive",
              className
            )}
            placeholderTextColor="#6B7280"
            secureTextEntry={!isPasswordVisible}
            {...props}
          />
          <Pressable
            onPress={togglePasswordVisibility}
            className="absolute right-3 top-0 h-12 w-8 items-center justify-center"
            accessibilityRole="button"
            accessibilityLabel={
              isPasswordVisible ? "Hide password" : "Show password"
            }
          >
            <Text className="text-lg text-muted-foreground">
              {!isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
            </Text>
          </Pressable>
        </View>
        {error && (
          <Text className="mt-1 text-sm text-destructive">{error}</Text>
        )}
      </View>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
