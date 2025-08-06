import * as React from "react";
import { View, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { router } from "expo-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Text } from "~/components/ui/text";

interface FormData {
  address: string;
  gender: string;
  age: string;
}

interface FormErrors {
  address?: string;
  gender?: string;
  age?: string;
}

const GENDER_OPTIONS = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
  { label: "Prefer not to say", value: "prefer_not_to_say" },
];

export default function CompleteProfileScreen() {
  const [formData, setFormData] = React.useState<FormData>({
    address: "",
    gender: "",
    age: "",
  });

  const [errors, setErrors] = React.useState<FormErrors>({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [showGenderOptions, setShowGenderOptions] = React.useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.gender.trim()) {
      newErrors.gender = "Gender is required";
    }

    if (!formData.age.trim()) {
      newErrors.age = "Age is required";
    } else {
      const ageNum = parseInt(formData.age);
      if (isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
        newErrors.age = "Please enter a valid age between 1 and 120";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCompleteProfile = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // TODO: Implement actual profile completion API call
      console.log("Profile completion data:", formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Navigate to home screen after successful profile completion
      router.replace("/(tabs)/home");
    } catch (error) {
      console.error("Profile completion error:", error);
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

  const handleGenderSelect = (value: string) => {
    const selectedOption = GENDER_OPTIONS.find(
      (option) => option.value === value
    );
    updateFormData("gender", selectedOption?.label || value);
    setShowGenderOptions(false);
  };

  const handleSkip = () => {
    // User can skip profile completion and go to home screen
    router.replace("/(tabs)/home");
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
            <View className="w-20 h-20 bg-antar-teal/10 rounded-full items-center justify-center mb-4">
              <Text className="text-5xl">🧘</Text>
            </View>
            <Text className="text-3xl font-bold text-center text-antar-teal mb-2">
              Complete Your Profile
            </Text>
            <Text className="text-center text-muted-foreground text-base">
              Personalize your holistic wellness experience
            </Text>

            {/* Progress bar */}
            <View className="w-full bg-secondary/50 rounded-full h-2 mt-4 max-w-xs">
              <View
                className="bg-antar-teal h-2 rounded-full"
                style={{ width: "75%" }}
              />
            </View>
            <Text className="text-xs text-muted-foreground mt-2">
              Step 2 of 2
            </Text>
          </View>

          {/* Form Content */}
          <View className="flex flex-col gap-6">
            {/* Personal Details Section */}
            <View className="bg-background/50 rounded-2xl p-4 flex flex-col gap-4">
              <Text className="text-sm font-medium text-antar-teal uppercase tracking-wide">
                Personal Details
              </Text>
              <Input
                label="Address"
                placeholder="Enter your full address"
                value={formData.address}
                onChangeText={(value) => updateFormData("address", value)}
                error={errors.address}
                multiline
                numberOfLines={3}
                autoCapitalize="words"
              />

              <View className="flex-row gap-3">
                <View className="flex-1">
                  <Text className="text-sm font-medium text-foreground mb-2">
                    Gender
                  </Text>
                  <Button
                    variant="outline"
                    onPress={() => setShowGenderOptions(!showGenderOptions)}
                    className="w-full justify-start h-12 rounded-xl"
                  >
                    <Text
                      className={
                        formData.gender
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }
                    >
                      {formData.gender || "Select gender"}
                    </Text>
                  </Button>
                  {errors.gender && (
                    <Text className="mt-1 text-sm text-destructive">
                      {errors.gender}
                    </Text>
                  )}

                  {showGenderOptions && (
                    <View className="mt-2 border border-input rounded-xl bg-background shadow-sm">
                      {GENDER_OPTIONS.map((option) => (
                        <Button
                          key={option.value}
                          variant="ghost"
                          onPress={() => handleGenderSelect(option.value)}
                          className="w-full justify-start rounded-none border-b border-input last:border-b-0"
                        >
                          <Text>{option.label}</Text>
                        </Button>
                      ))}
                    </View>
                  )}
                </View>

                <View className="flex-1">
                  <Input
                    label="Age"
                    placeholder="Your age"
                    value={formData.age}
                    onChangeText={(value) => updateFormData("age", value)}
                    error={errors.age}
                    keyboardType="numeric"
                  />
                </View>
              </View>
            </View>

            {/* Action Buttons */}
            <View className="pt-6 flex flex-col gap-4">
              <Button
                onPress={handleCompleteProfile}
                disabled={isLoading}
                className="w-full h-14 rounded-2xl bg-antar-teal shadow-lg"
              >
                <View className="flex-row items-center gap-2">
                  {isLoading && (
                    <View className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  )}
                  <Text className="font-semibold text-base text-white">
                    {isLoading
                      ? "Completing Profile..."
                      : "Begin Transformation"}
                  </Text>
                </View>
              </Button>

              <Button
                variant="outline"
                onPress={handleSkip}
                className="w-full h-12 rounded-xl"
              >
                <Text className="text-muted-foreground">Skip for now</Text>
              </Button>

              <Text className="text-xs text-center text-muted-foreground">
                You can always complete this later in your profile settings
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
