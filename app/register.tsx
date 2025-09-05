import * as React from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  StyleSheet,
  TextInput,
} from "react-native";
import { router } from "expo-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Text } from "~/components/ui/text";
import RESTApiCall from "~/lib/RESTApiCall";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GoogleG from "~/components/icons/GoogleG";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import GradientCTA from "~/components/custom/GradientCTA";

const signupFoodBg = require("~/assets/images/backgrounds/signup-food-bg.jpg");

type Step = "email" | "otp";

export default function RegisterScreen() {
  const [step, setStep] = React.useState<Step>("email");
  const [email, setEmail] = React.useState<string>("");
  const [otp, setOtp] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState(false);

  // 6-digit OTP via 3+3 input boxes
  const OTP_LENGTH = 6;
  const [otpArr, setOtpArr] = React.useState<string[]>(
    Array(OTP_LENGTH).fill("")
  );
  const otpRefs = React.useRef<Array<TextInput | null>>([]);

  React.useEffect(() => {
    setOtp(otpArr.join(""));
  }, [otpArr]);

  const handleOtpChange = (text: string, index: number) => {
    const digits = text.replace(/\D/g, "");
    setOtpArr((prev) => {
      const next = [...prev];
      if (digits.length > 1) {
        // Pasted multiple digits starting at current index
        for (let i = 0; i < digits.length && index + i < OTP_LENGTH; i++) {
          next[index + i] = digits[i];
        }
        const target = Math.min(index + digits.length, OTP_LENGTH - 1);
        otpRefs.current[target]?.focus();
      } else {
        next[index] = digits;
        if (digits && index < OTP_LENGTH - 1) {
          otpRefs.current[index + 1]?.focus();
        }
      }
      return next;
    });
  };

  const handleOtpKeyPress = (
    e: { nativeEvent: { key: string } },
    index: number
  ) => {
    if (e.nativeEvent.key === "Backspace") {
      setOtpArr((prev) => {
        const next = [...prev];
        if (!next[index] && index > 0) {
          otpRefs.current[index - 1]?.focus();
          next[index - 1] = "";
        } else {
          next[index] = "";
        }
        return next;
      });
    }
  };

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
        // Prefer explicit flags if provided by API
        const isNew = Boolean(res?.data?.isNew);
        const completeProfile = Boolean(res?.data?.user?.completeProfile);
        if (completeProfile && !isNew) {
          router.replace("/(tabs)/parivar");
        } else {
          router.replace("/complete-profile");
        }
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
      className="flex-1 bg-antar-orange/5"
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section with Food Image */}
        <View className="relative h-72 overflow-hidden">
          <ImageBackground
            source={signupFoodBg}
            className="flex-1"
            // resizeMode="cover"
            imageStyle={{
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
            }}
          >
            {/* Bottom fade overlay gradient */}
            <LinearGradient
              colors={["rgba(0,0,0,0.7)", "rgba(0,0,0,0.25)", "transparent"]}
              locations={[0, 0.6, 1]}
              start={{ x: 0, y: 1 }}
              end={{ x: 0, y: 0 }}
              pointerEvents="none"
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                top: "30%", // only bottom area gets darkened
                borderBottomLeftRadius: 50,
                borderBottomRightRadius: 50,
              }}
            />

            {/* Header content */}
            <View className="flex-1 justify-end items-center px-6 pb-6 pt-20">
              <Text className="text-white text-3xl font-bold text-center mb-2">
                Welcome to ANTAR
              </Text>
              <Text className="text-white text-base text-center opacity-90">
                Begin your journey with us
              </Text>
            </View>
          </ImageBackground>
        </View>

        {/* Form Section */}
        <View className="flex-1 px-6 pt-8 pb-8">
          {step === "email" && (
            <View className="flex flex-col gap-6">
              <View className="w-full">
                <Text className="text-[12px] font-semibold text-gray-700 mb-2">
                  Email Address
                </Text>
                <View className="relative">
                  <Input
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                    className="bg-white border border-antar-orange/90 rounded-full px-4 pl-14 text-[14px]"
                  />
                  {/* Left circular mail icon */}
                  <View className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border border-gray-300 items-center justify-center">
                    <Ionicons name="mail-outline" size={18} color="#111214" />
                  </View>
                </View>
              </View>

              <View className="pt-2">
                <GradientCTA
                  title="Send OTP"
                  onPress={sendOtp}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <View className="flex-row items-center gap-2">
                      <View className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <Text className="font-semibold text-base text-white">
                        Sending OTP...
                      </Text>
                    </View>
                  ) : undefined}
                </GradientCTA>
              </View>
            </View>
          )}

          {step === "otp" && (
            <View className="flex flex-col gap-6 mt-2">
              <View className="w-full">
                <Text className="text-sm font-bold text-antar-dark mb-2">
                  One-Time Password
                </Text>
                {/* 3 + 3 OTP boxes */}
                <View className="flex-row items-center justify-center">
                  {Array.from({ length: OTP_LENGTH }).map((_, i) => (
                    <TextInput
                      key={i}
                      ref={(el) => {
                        otpRefs.current[i] = el;
                      }}
                      value={otpArr[i]}
                      onChangeText={(t) => handleOtpChange(t, i)}
                      onKeyPress={(e) => handleOtpKeyPress(e as any, i)}
                      keyboardType="number-pad"
                      autoCapitalize="none"
                      maxLength={1}
                      returnKeyType="done"
                      autoCorrect={false}
                      selectionColor="#E87D36"
                      className="w-12 h-12 mx-1 rounded-xl border border-antar-orange/90 bg-white text-center text-lg font-semibold text-black"
                      style={{ marginRight: i === 2 ? 12 : 4, marginLeft: 4 }}
                    />
                  ))}
                </View>
                <Text className="text-xs text-gray-500 mt-2 text-center">
                  Enter the 6-digit code sent to {email}
                </Text>
              </View>

              <View className="pt-2">
                <GradientCTA
                  title="Verify & Continue"
                  onPress={verifyOtp}
                  disabled={isLoading || otp.length !== OTP_LENGTH}
                >
                  {isLoading ? (
                    <View className="flex-row items-center gap-2">
                      <View className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <Text className="font-semibold text-base text-white">
                        Verifying...
                      </Text>
                    </View>
                  ) : undefined}
                </GradientCTA>
              </View>
            </View>
          )}

          {/* Divider */}
          <View className="flex-row items-center py-6">
            <View className="flex-1 h-[1px] bg-gray-200" />
            <Text className="px-4 text-[11px] text-gray-400 font-medium">
              OR
            </Text>
            <View className="flex-1 h-[1px] bg-gray-200" />
          </View>

          {/* Continue with Google */}
          <Button
            onPress={googleSignin}
            className="w-full h-12 rounded-full bg-white border border-gray-300"
          >
            <View className="flex-row items-center justify-center gap-3">
              <GoogleG size={20} />
              <Text className="text-black font-medium text-base">
                Continue with Google
              </Text>
            </View>
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
