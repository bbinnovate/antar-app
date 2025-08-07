import React, { useEffect } from "react";
import { View, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { PasswordInput } from "~/components/ui/password-input";
import { Text } from "~/components/ui/text";
import RESTApiCall from "~/lib/RESTApiCall";
import Toast from "react-native-toast-message";
import { useIsFocused } from "@react-navigation/native";

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

export default function LoginScreen() {
  const [formData, setFormData] = React.useState<FormData>({
    email: "",
    password: "",
  });

  const isFocused = useIsFocused();

  const [errors, setErrors] = React.useState<FormErrors>({});
  const [isLoading, setIsLoading] = React.useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // TODO: Implement actual login API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const apiCall = new RESTApiCall();
      const response = await apiCall.post("auth/login", {
        email: formData.email,
        password: formData.password,
      });

      if (response?.status !== 200) {
        Toast.show({
          type: "error",
          text1: "Login failed",
          text2: response?.data?.error || "Login failed. Please try again.",
        });
      } else {
        const storeData = {
          token: response?.data?.token,
          ...response?.data?.user,
        };
        AsyncStorage.setItem("antar-app-access-data", JSON.stringify(storeData));
        Toast.show({
          type: "success",
          text1: "Login successful",
          text2: "Welcome back! Redirecting to your dashboard.",
        });
        // Navigate to home or dashboard after successful login
        router.replace("/(tabs)/home");
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  useEffect(() => {
    if (isFocused) {     
      setFormData({ email: "", password: "" });
      setErrors({});
    }
  }, [isFocused]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-gradient-to-b from-primary/5 to-secondary/30"
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          paddingHorizontal: 24,
          paddingVertical: 32,
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View>
          {/* Header Section */}
          <View className="items-center mb-8">
            <View className="w-20 h-20 bg-antar-teal/10 rounded-full items-center justify-center mb-6">
              <Text className="text-5xl">🧘</Text>
            </View>
            <Text className="text-3xl font-bold text-center text-antar-teal mb-2">
              Welcome Back
            </Text>
            <Text className="text-center text-muted-foreground text-base">
              Continue your transformative wellness journey
            </Text>
          </View>

          {/* Form Content */}
          <View className="flex flex-col gap-6">
            {/* Login Credentials Section */}
            <View className="bg-background/50 rounded-2xl p-4 flex flex-col gap-4">
              <Text className="text-sm font-medium text-antar-teal uppercase tracking-wide">
                Sign In Credentials
              </Text>
              <Input
                label="Email Address"
                placeholder="your@email.com"
                value={formData.email}
                onChangeText={(value) => updateFormData("email", value)}
                error={errors.email}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />

              <PasswordInput
                label="Password"
                placeholder="Enter your password"
                value={formData.password}
                onChangeText={(value) => updateFormData("password", value)}
                error={errors.password}
                autoComplete="current-password"
              />

              {/* Forgot Password Link */}
              <View className="flex-row justify-end">
                <Button variant="link" className="p-0 h-auto">
                  <Text className="text-sm text-primary">Forgot Password?</Text>
                </Button>
              </View>
            </View>

            {/* Action Buttons */}
            <View className="pt-6 flex flex-col gap-2">
              <Button
                onPress={handleLogin}
                disabled={isLoading}
                className="w-full h-14 rounded-2xl bg-antar-teal shadow-lg"
              >
                <View className="flex-row items-center gap-2">
                  {isLoading && (
                    <View className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  )}
                  <Text className="font-semibold text-base text-white">
                    {isLoading ? "Signing In..." : "Continue Journey"}
                  </Text>
                </View>
              </Button>

              {/* Divider */}
              <View className="flex-row items-center py-2">
                <View className="flex-1 h-px bg-border" />
                <Text className="px-6 text-xs text-muted-foreground uppercase tracking-wide">
                  Or
                </Text>
                <View className="flex-1 h-px bg-border" />
              </View>

              <View className="flex-row justify-center items-center pb-2 -mt-5">
                <Text className="text-muted-foreground">
                  Don't have an account?{" "}
                </Text>
                <Button
                  variant="link"
                  onPress={() => router.push("/register")}
                  className="p-0 h-auto"
                >
                  <Text className="text-primary font-semibold">Sign Up</Text>
                </Button>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
