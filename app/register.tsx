import * as React from "react";
import { View, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { router } from "expo-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { PasswordInput } from "~/components/ui/password-input";
import { Text } from "~/components/ui/text";

// api = https://antar-admin.vercel.app/api/app/auth/registration

interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  number: string;
  password: string;
}

interface FormErrors {
  first_name?: string;
  last_name?: string;
  email?: string;
  number?: string;
  password?: string;
  general?: string;
}

export default function RegisterScreen() {
  const [formData, setFormData] = React.useState<FormData>({
    first_name: "",
    last_name: "",
    email: "",
    number: "",
    password: "",
  });

  const [errors, setErrors] = React.useState<FormErrors>({});
  const [isLoading, setIsLoading] = React.useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.first_name.trim()) {
      newErrors.first_name = "First name is required";
    }

    if (!formData.last_name.trim()) {
      newErrors.last_name = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.number.trim()) {
      newErrors.number = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.number.replace(/\D/g, ""))) {
      newErrors.number = "Please enter a valid 10-digit phone number";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        "https://antar-admin.vercel.app/api/app/auth/registration",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first_name: formData.first_name,
            last_name: formData.last_name,
            email: formData.email,
            number: formData.number,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Registration successful
        console.log("Registration successful:", data);
        // Navigate to login screen after successful registration
        router.push("/login");
      } else {
        // Handle API errors
        console.log("Registration failed:", data);

        // Check if API returned specific field errors
        if (data.errors) {
          setErrors(data.errors);
        } else if (data.message) {
          // Show general error message
          setErrors({ email: data.message });
        } else {
          setErrors({ email: "Registration failed. Please try again." });
        }
      }
    } catch (error) {
      console.error("Registration error:", error);
      setErrors({
        email: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear errors when user starts typing
    if (errors[field] || errors.general) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
        general: undefined,
      }));
    }
  };

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
              Create Account
            </Text>
            <Text className="text-center text-muted-foreground text-base">
              Begin your transformative wellness journey with Antar
            </Text>
          </View>
          {/* Form Content */}
          <View className="flex flex-col gap-6">
            {errors.general && (
              <View className="p-4 rounded-2xl bg-destructive/10 border border-destructive/20 mx-2">
                <Text className="text-sm text-destructive text-center">
                  {errors.general}
                </Text>
              </View>
            )}

            {/* Personal Information Section */}
            <View className="bg-background/50 rounded-2xl p-4">
              <Text className="text-sm font-medium text-antar-teal uppercase tracking-wide">
                Personal Information
              </Text>
              <View className="flex-row gap-2">
                <View className="flex-1">
                  <Input
                    label="First Name"
                    placeholder="First name"
                    value={formData.first_name}
                    onChangeText={(value) =>
                      updateFormData("first_name", value)
                    }
                    error={errors.first_name}
                    autoCapitalize="words"
                    autoComplete="given-name"
                  />
                </View>
                <View className="flex-1">
                  <Input
                    label="Last Name"
                    placeholder="Last name"
                    value={formData.last_name}
                    onChangeText={(value) => updateFormData("last_name", value)}
                    error={errors.last_name}
                    autoCapitalize="words"
                    autoComplete="family-name"
                  />
                </View>
              </View>
            </View>

            {/* Contact Information Section */}
            <View className="bg-background/50 rounded-2xl p-4">
              <Text className="text-sm font-medium text-antar-teal uppercase tracking-wide">
                Contact Information
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

              <Input
                label="Phone Number"
                placeholder="9876543210"
                value={formData.number}
                onChangeText={(value) => updateFormData("number", value)}
                error={errors.number}
                keyboardType="phone-pad"
                autoComplete="tel"
              />
            </View>

            {/* Security Section */}
            <View className="bg-background/50 rounded-2xl p-4">
              <Text className="text-sm font-medium text-antar-teal uppercase tracking-wide">
                Security
              </Text>
              <PasswordInput
                label="Password"
                placeholder="Create a secure password"
                value={formData.password}
                onChangeText={(value) => updateFormData("password", value)}
                error={errors.password}
                autoComplete="new-password"
              />
              <Text className="text-xs text-muted-foreground mt-[1px]">
                Password must be at least 6 characters long
              </Text>
            </View>

            {/* Action Buttons */}
            <View className="pt-6 flex flex-col gap-2">
              <Button
                onPress={handleRegister}
                disabled={isLoading}
                className="w-full h-14 rounded-2xl bg-antar-teal shadow-lg"
              >
                <View className="flex-row items-center gap-2">
                  {isLoading && (
                    <View className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  )}
                  <Text className="font-semibold text-base text-white">
                    {isLoading
                      ? "Creating Account..."
                      : "Start My Wellness Journey"}
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
                  Already have an account?{" "}
                </Text>
                <Button
                  variant="link"
                  onPress={() => router.push("/login")}
                  className="p-0 h-auto"
                >
                  <Text className="text-primary font-semibold">Sign In</Text>
                </Button>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
