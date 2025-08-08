import * as React from "react";
import { View, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { router } from "expo-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Text } from "~/components/ui/text";
import RESTApiCall from "~/lib/RESTApiCall";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GoogleG from "~/components/icons/GoogleG";

type Step = "email" | "otp";

export default function RegisterScreen() {
  const [step, setStep] = React.useState<Step>("email");
  const [email, setEmail] = React.useState<string>("");
  const [otp, setOtp] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState(false);

  const validateEmail = (): boolean => {
    if (!email.trim()) {
      Toast.show({ type: "error", text1: "Email required" });
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      Toast.show({ type: "error", text1: "Enter a valid email" });
      return false;
    }
    return true;
  };

  const sendOtp = async () => {
    if (!validateEmail()) return;
    setIsLoading(true);
    try {
      const api = new RESTApiCall();
      const res = await api.post("auth/send-otp", { email });
      if (res?.status === 200 || res?.data?.success) {
        Toast.show({ type: "success", text1: "OTP sent" });
        setStep("otp");
      } else {
        Toast.show({
          type: "error",
          text1: res?.data?.error || "Failed to send OTP",
        });
      }
    } catch (e) {
      Toast.show({ type: "error", text1: "Network error" });
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (otp.trim().length < 4) {
      Toast.show({ type: "error", text1: "Enter the OTP" });
      return;
    }
    setIsLoading(true);
    try {
      const api = new RESTApiCall();
      const res = await api.post("auth/verify-otp", { email, otp });
      if (res?.status === 200) {
        const storeData = {
          token: res?.data?.token,
          ...res?.data?.user,
        };
        await AsyncStorage.setItem(
          "antar-app-access-data",
          JSON.stringify(storeData)
        );
        Toast.show({ type: "success", text1: "Welcome to Antar" });
        router.replace("/(tabs)/home");
      } else {
        Toast.show({ type: "error", text1: res?.data?.error || "Invalid OTP" });
      }
    } catch (e) {
      Toast.show({ type: "error", text1: "Network error" });
    } finally {
      setIsLoading(false);
    }
  };

  const googleSignin = async () => {
    Toast.show({ type: "info", text1: "Google sign-in coming soon" });
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
          {/* Header */}
          <View className="items-center mb-8">
            <View className="w-20 h-20 bg-antar-teal/10 rounded-full items-center justify-center mb-6">
              <Text className="text-5xl">🧘</Text>
            </View>
            <Text className="text-3xl font-bold text-center text-antar-teal mb-2">
              Join Antar
            </Text>
            <Text className="text-center text-muted-foreground text-base">
              Continue with email OTP or Google
            </Text>
          </View>

          {/* Email step */}
          {step === "email" && (
            <View className="flex flex-col gap-6">
              <View className="bg-background/50 rounded-2xl p-4">
                <Text className="text-sm font-medium text-antar-teal uppercase tracking-wide">
                  Email
                </Text>
                <Input
                  label="Email Address"
                  placeholder="you@example.com"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                />
              </View>

              <View className="pt-2">
                <Button
                  onPress={sendOtp}
                  disabled={isLoading}
                  className="w-full h-14 rounded-2xl bg-antar-teal shadow-lg"
                >
                  <View className="flex-row items-center gap-2">
                    {isLoading && (
                      <View className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    )}
                    <Text className="font-semibold text-base text-white">
                      {isLoading ? "Sending OTP..." : "Send OTP"}
                    </Text>
                  </View>
                </Button>
              </View>
            </View>
          )}

          {/* OTP step */}
          {step === "otp" && (
            <View className="flex flex-col gap-6">
              <View className="bg-background/50 rounded-2xl p-4">
                <Text className="text-sm font-medium text-antar-teal uppercase tracking-wide">
                  Enter OTP
                </Text>
                <Input
                  label="One-Time Password"
                  placeholder="Enter the 6-digit code"
                  value={otp}
                  onChangeText={setOtp}
                  keyboardType="numeric"
                  autoCapitalize="none"
                  maxLength={6}
                />
                <Text className="text-xs text-muted-foreground mt-2">
                  Sent to {email}
                </Text>
              </View>

              <View className="pt-2">
                <Button
                  onPress={verifyOtp}
                  disabled={isLoading}
                  className="w-full h-14 rounded-2xl bg-antar-teal shadow-lg"
                >
                  <View className="flex-row items-center gap-2">
                    {isLoading && (
                      <View className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    )}
                    <Text className="font-semibold text-base text-white">
                      {isLoading ? "Verifying..." : "Verify & Continue"}
                    </Text>
                  </View>
                </Button>
              </View>
            </View>
          )}

          {/* Divider */}
          <View className="flex-row items-center py-6">
            <View className="flex-1 h-px bg-border" />
            <Text className="px-6 text-xs text-muted-foreground uppercase tracking-wide">
              Or
            </Text>
            <View className="flex-1 h-px bg-border" />
          </View>

          {/* Google */}
          <Button
            onPress={googleSignin}
            className="w-full h-14 rounded-2xl bg-white border border-border"
          >
            <View className="flex-row items-center gap-2">
              <GoogleG size={20} />
              <Text className="font-semibold text-base text-antar-dark">
                Continue with Google
              </Text>
            </View>
          </Button>

          {/* Footer */}
          <View className="flex-row justify-center items-center pb-2 mt-4">
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
