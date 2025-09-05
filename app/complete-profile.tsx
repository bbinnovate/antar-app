import * as React from "react";
import { View, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { router } from "expo-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Text } from "~/components/ui/text";
import Toast from "react-native-toast-message";
import RESTApiCall from "~/lib/RESTApiCall";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface FormData {
  first_name: string;
  last_name: string;
  gender: string;
  age: string;
  activity_level: "sedentary" | "light" | "moderate" | "active" | "";
  health_conditions: string[];
  goals: string[];
}

interface FormErrors {
  first_name?: string;
  last_name?: string;
  gender?: string;
  age?: string;
  activity_level?: string;
  goals?: string;
}

const GENDER_OPTIONS = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
  { label: "Prefer not to say", value: "prefer_not_to_say" },
];

const ACTIVITY_LEVEL_OPTIONS = [
  { label: "Sedentary", value: "sedentary" },
  { label: "Light", value: "light" },
  { label: "Moderate", value: "moderate" },
  { label: "Active", value: "active" },
];

const HEALTH_CONDITIONS_OPTIONS = [
  { label: "None", value: "none" },
  { label: "Diabetes", value: "diabetes" },
  { label: "Hypertension", value: "hypertension" },
  { label: "Obesity", value: "obesity" },
  { label: "Joint Pain", value: "joint_pain" },
  { label: "Stress/Anxiety", value: "stress_anxiety" },
];

const GOAL_OPTIONS = [
  { label: "Weight Loss", value: "weight_loss" },
  { label: "Stress Reduction", value: "stress_reduction" },
  { label: "Strength", value: "strength" },
  { label: "Flexibility", value: "flexibility" },
  { label: "Better Sleep", value: "better_sleep" },
  { label: "Stamina", value: "stamina" },
];

type EditableField =
  | "first_name"
  | "last_name"
  | "gender"
  | "age"
  | "activity_level";

export default function CompleteProfileScreen() {
  const [formData, setFormData] = React.useState<FormData>({
    first_name: "",
    last_name: "",
    gender: "",
    age: "",
    activity_level: "",
    health_conditions: [],
    goals: [],
  });

  const [errors, setErrors] = React.useState<FormErrors>({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [showGenderOptions, setShowGenderOptions] = React.useState(false);
  const totalSteps = 6; // first, last, age, gender, activity, goals

  const completionCount = React.useMemo(() => {
    let count = 0;
    if (formData.first_name.trim()) count += 1;
    if (formData.last_name.trim()) count += 1;
    if (formData.gender.trim()) count += 1;
    if (formData.age.trim()) count += 1;
    if (formData.activity_level) count += 1;
    if (formData.goals.length > 0) count += 1;
    return count;
  }, [formData]);

  const completionPercent = Math.round((completionCount / totalSteps) * 100);

  const getCohort = React.useCallback(() => {
    const ageNum = parseInt(formData.age);
    const hasChronic = formData.health_conditions.some((c) =>
      ["diabetes", "hypertension", "obesity", "joint_pain"].includes(c)
    );
    const isActive = formData.activity_level === "active";
    const isModerate = formData.activity_level === "moderate";
    const optimizationGoals = formData.goals.some((g) =>
      ["stamina", "strength", "flexibility"].includes(g)
    );

    if (hasChronic || ageNum >= 50) {
      return {
        name: "Seasoned",
        description: "Managing chronic conditions, need guided support",
      };
    }

    if (isActive && !hasChronic && optimizationGoals) {
      return {
        name: "Pro",
        description: "Active individual aiming to optimize health",
      };
    }

    if (
      (formData.activity_level === "sedentary" || !formData.activity_level) &&
      !hasChronic
    ) {
      return {
        name: "Rookie",
        description: "Beginner starting the wellness journey",
      };
    }

    return {
      name: "Amateur",
      description: "Mild lifestyle issues, looking for maintenance",
    };
  }, [formData]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.first_name.trim()) {
      newErrors.first_name = "First name is required";
    }
    if (!formData.last_name.trim()) {
      newErrors.last_name = "Last name is required";
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

    if (!formData.activity_level) {
      newErrors.activity_level = "Select your activity level";
    }

    if (formData.goals.length === 0) {
      newErrors.goals = "Choose at least one goal";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCompleteProfile = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // console.log(formData);
      const data: string | null = await AsyncStorage.getItem(
        "antar-app-access-data"
      );
      if (!data) {
        Toast.show({ type: "error", text1: "Something went wrong" });
        return null;
      }
      // await new Promise((resolve) => setTimeout(resolve, 600));

      const apiCall = new RESTApiCall();
      const response = await apiCall.put("user/profile", formData, {
        headers: { Authorization: `Bearer ${JSON.parse(data).token}` },
      });
      // console.log("response - PUT - ", response?.data);
      if (response?.data?.success) {
        Toast.show({ type: "success", text1: "Profile completed! +50 XP" });
      }
      router.push("/(tabs)/parivar");
    } catch (error) {
      console.error("Profile completion error:", error);
      Toast.show({ type: "error", text1: "Something went wrong" });
    } finally {
      setIsLoading(false);
    }
  };

  const updateFormData = (field: EditableField, value: string) => {
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

  const toggleCondition = (value: string) => {
    setFormData((prev) => {
      const exists = prev.health_conditions.includes(value);
      const next =
        value === "none"
          ? ["none"]
          : exists
          ? prev.health_conditions.filter((c) => c !== value)
          : [...prev.health_conditions.filter((c) => c !== "none"), value];
      return { ...prev, health_conditions: next };
    });
  };

  const toggleGoal = (value: string) => {
    setFormData((prev) => {
      const exists = prev.goals.includes(value);
      const next = exists
        ? prev.goals.filter((g) => g !== value)
        : [...prev.goals, value];
      return { ...prev, goals: next };
    });
  };

  const handleSkip = () => {
    // User can skip profile completion and go to home screen
    router.replace("/(tabs)/parivar");
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
        stickyHeaderIndices={[0]}
      >
        <View className="bg-background/95 border-b border-antar-teal/10 px-4 py-3">
          <View className="w-full bg-secondary/50 rounded-full h-2">
            <View
              className="bg-antar-teal h-2 rounded-full"
              style={{ width: `${Math.max(10, completionPercent)}%` }}
            />
          </View>
          <Text className="text-[11px] text-muted-foreground mt-1">
            {completionPercent}% complete • Earn {completionPercent * 1} XP
          </Text>
          <View className="mt-3 bg-antar-teal/10 border border-antar-teal/20 rounded-2xl p-4">
            <Text className="text-sm font-medium text-antar-teal uppercase tracking-wide mb-2">
              Your Cohort
            </Text>
            <View className="flex-row items-center gap-3">
              <View className="w-8 h-8 rounded-full bg-antar-teal items-center justify-center">
                <Text className="text-white text-sm">🏅</Text>
              </View>
              <View className="flex-1">
                <Text className="text-sm font-semibold text-antar-dark">
                  {getCohort().name}
                </Text>
                <Text
                  className="text-xs text-muted-foreground"
                  numberOfLines={1}
                >
                  {getCohort().description}
                </Text>
              </View>
              <View className="px-2 py-0.5 rounded-full bg-white border border-antar-teal/30">
                <Text className="text-antar-teal text-[10px] font-semibold">
                  +{completionPercent} XP
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View>
          {/* Header Section */}
          {/* <View className="items-center mb-8">
            <Text className="text-3xl font-bold text-center text-antar-teal mb-2">
              Complete Your Profile
            </Text>
            <Text className="text-center text-muted-foreground text-base">
              Personalize your holistic wellness experience
            </Text>
          </View> */}

          {/* Form Content */}
          <View className="flex flex-col gap-6 mt-6">
            {/* Personal Details Section */}
            <View className="bg-background/50 rounded-2xl p-4 flex flex-col gap-4">
              <Text className="text-sm font-medium text-antar-teal uppercase tracking-wide">
                Personal Details
              </Text>
              <View className="flex-row gap-3">
                <View className="flex-1">
                  <Input
                    label="First Name"
                    placeholder="Your first name"
                    value={formData.first_name}
                    onChangeText={(value) =>
                      updateFormData("first_name", value)
                    }
                    error={errors.first_name}
                    autoCapitalize="words"
                  />
                </View>
                <View className="flex-1">
                  <Input
                    label="Last Name"
                    placeholder="Your last name"
                    value={formData.last_name}
                    onChangeText={(value) => updateFormData("last_name", value)}
                    error={errors.last_name}
                    autoCapitalize="words"
                  />
                </View>
              </View>

              <View className="flex-row gap-3">
                <View className="flex-1">
                  <Text className="text-sm font-medium text-foreground mb-2">
                    Gender
                  </Text>
                  <Button
                    variant="outline"
                    onPressIn={() => setShowGenderOptions(!showGenderOptions)}
                    className="w-full justify-start h-12 rounded-xl items-start"
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
                          onPressIn={() => handleGenderSelect(option.value)}
                          className="w-full justify-start items-start rounded-none border-b border-input last:border-b-0"
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

            {/* Wellness Profile Section */}
            <View className="bg-background/50 rounded-2xl p-4 flex flex-col gap-4">
              <Text className="text-sm font-medium text-antar-teal uppercase tracking-wide">
                Wellness Profile
              </Text>

              {/* Activity Level */}
              <View>
                <Text className="text-sm font-medium text-foreground mb-2">
                  Activity Level
                </Text>
                <View className="flex-row flex-wrap gap-2">
                  {ACTIVITY_LEVEL_OPTIONS.map((opt) => {
                    const selected = formData.activity_level === opt.value;
                    return (
                      <Button
                        key={opt.value}
                        variant={selected ? "default" : "outline"}
                        onPressIn={() =>
                          updateFormData("activity_level", opt.value)
                        }
                        className={`h-10 rounded-full px-4 ${
                          selected ? "bg-antar-teal" : ""
                        }`}
                      >
                        <Text
                          className={
                            selected ? "text-white" : "text-foreground"
                          }
                        >
                          {opt.label}
                        </Text>
                      </Button>
                    );
                  })}
                </View>
                {errors.activity_level && (
                  <Text className="mt-1 text-sm text-destructive">
                    {errors.activity_level}
                  </Text>
                )}
              </View>

              {/* Health Conditions */}
              <View>
                <Text className="text-sm font-medium text-foreground mb-2">
                  Health Conditions
                </Text>
                <View className="flex-row flex-wrap gap-2">
                  {HEALTH_CONDITIONS_OPTIONS.map((opt) => {
                    const selected = formData.health_conditions.includes(
                      opt.value
                    );
                    return (
                      <Button
                        key={opt.value}
                        variant={selected ? "default" : "outline"}
                        onPressIn={() => toggleCondition(opt.value)}
                        className={`h-10 rounded-full px-4 ${
                          selected ? "bg-antar-teal" : ""
                        }`}
                      >
                        <Text
                          className={
                            selected ? "text-white" : "text-foreground"
                          }
                        >
                          {opt.label}
                        </Text>
                      </Button>
                    );
                  })}
                </View>
              </View>

              {/* Goals */}
              <View>
                <Text className="text-sm font-medium text-foreground mb-2">
                  Goals
                </Text>
                <View className="flex-row flex-wrap gap-2">
                  {GOAL_OPTIONS.map((opt) => {
                    const selected = formData.goals.includes(opt.value);
                    return (
                      <Button
                        key={opt.value}
                        variant={selected ? "default" : "outline"}
                        onPressIn={() => toggleGoal(opt.value)}
                        className={`h-10 rounded-full px-4 ${
                          selected ? "bg-antar-teal" : ""
                        }`}
                      >
                        <Text
                          className={
                            selected ? "text-white" : "text-foreground"
                          }
                        >
                          {opt.label}
                        </Text>
                      </Button>
                    );
                  })}
                </View>
                {errors.goals && (
                  <Text className="mt-1 text-sm text-destructive">
                    {errors.goals}
                  </Text>
                )}
              </View>
            </View>

            {/* Cohort Preview moved to sticky header */}

            {/* Action Buttons */}
            <View className="pt-6 flex flex-col gap-4">
              <Button
                onPressIn={handleCompleteProfile}
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
