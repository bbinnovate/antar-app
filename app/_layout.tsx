import "~/global.css";

import { DefaultTheme, Theme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Platform } from "react-native";
import { NAV_THEME } from "~/lib/constants";
import { PortalHost } from "@rn-primitives/portal";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { useAuthRedirect } from "~/lib/hooks/useAuthRedirect";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Keep the native splash screen visible while we check auth
SplashScreen.preventAutoHideAsync();

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

const usePlatformSpecificSetup = Platform.select({
  web: useSetWebBackgroundClassName,
  default: noop,
});

export default function RootLayout() {
  // Prevent rendering until auth check is complete

  usePlatformSpecificSetup();

  const { checking } = useAuthRedirect();
  // const checking = false; // Temporarily set to false for testing

  React.useEffect(() => {
    if (!checking) {
      // Hide the splash screen when ready
      SplashScreen.hideAsync();
    }
  }, [checking]);

  if (checking) {
    // Render nothing while splash screen is shown
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ThemeProvider value={LIGHT_THEME}>
          <StatusBar style="light" />
          <Stack>
            <Stack.Screen
              name="index"
              options={{
                title: "Welcome",
                headerShown: false, // Full-bleed onboarding screen
                headerBackVisible: false, // Hide back button completely
                gestureEnabled: false, // Disable swipe back gesture
              }}
            />
            <Stack.Screen
              name="register"
              options={{
                title: "Create Account",
                headerShown: false, // Hide header so hero starts at top
                headerBackVisible: false, // Hide back button completely
                gestureEnabled: false, // Disable swipe back gesture
                headerLeft: () => null, // No back button
              }}
            />
            <Stack.Screen
              name="complete-profile"
              options={{
                title: "Complete Your Antar Profile",
                headerLeft: () => null, // No back button - user must complete or skip
                gestureEnabled: false, // Disable swipe back gesture
                headerBackVisible: false, // Hide back button completely
              }}
            />
            <Stack.Screen
              name="(tabs)"
              options={{
                headerShown: false, // Tab navigator will handle its own headers
                gestureEnabled: false, // Disable swipe back to auth screens
              }}
            />
            <Stack.Screen
              name="ailment/gut-health"
              options={{
                headerShown: false, // Custom header in component
              }}
            />
            <Stack.Screen
              name="ailment/bone-joint"
              options={{
                headerShown: false, // Custom header in component
              }}
            />
            <Stack.Screen
              name="ailment/metabolic"
              options={{
                headerShown: false, // Custom header in component
              }}
            />
            <Stack.Screen
              name="ailment/womens-health"
              options={{
                headerShown: false, // Custom header in component
              }}
            />
            <Stack.Screen
              name="ailment/cardiovascular"
              options={{
                headerShown: false, // Custom header in component
              }}
            />
            <Stack.Screen
              name="ailment/liver-kidney"
              options={{
                headerShown: false, // Custom header in component
              }}
            />
            <Stack.Screen
              name="ailment/neurological"
              options={{
                headerShown: false, // Custom header in component
              }}
            />
            <Stack.Screen
              name="ailment/skin-health"
              options={{
                headerShown: false, // Custom header in component
              }}
            />
            <Stack.Screen
              name="physiotherapy"
              options={{
                headerShown: false, // Custom header in component
              }}
            />
            <Stack.Screen
              name="nutrition"
              options={{
                headerShown: false, // Custom header in component
              }}
            />
            <Stack.Screen
              name="mental-wellness"
              options={{
                headerShown: false, // Custom header in component
              }}
            />
            <Stack.Screen
              name="optimal-movement"
              options={{
                headerShown: false, // Custom header in component
              }}
            />
            <Stack.Screen
              name="liv-preventive"
              options={{
                headerShown: false, // Custom header in component
              }}
            />
          </Stack>
          <PortalHost />
          <Toast
            position="top"
            topOffset={Platform.OS === "ios" ? 64 : 24}
            visibilityTime={2500}
            config={{
              success: (props) => (
                <BaseToast
                  {...props}
                  style={{
                    backgroundColor: "#262020", // Antar Dark
                    borderLeftColor: "#FF772F", // Antar Orange accent
                    borderLeftWidth: 6,
                  }}
                  text1Style={{ color: "white" }}
                  text2Style={{ color: "#FCE0E5" }}
                />
              ),
              error: (props) => (
                <ErrorToast
                  {...props}
                  style={{
                    backgroundColor: "#262020",
                    borderLeftColor: "#FF772F",
                    borderLeftWidth: 6,
                  }}
                  text1Style={{ color: "white" }}
                  text2Style={{ color: "#FCE0E5" }}
                />
              ),
              info: (props) => (
                <BaseToast
                  {...props}
                  style={{
                    backgroundColor: "#262020",
                    borderLeftColor: "#FF772F",
                    borderLeftWidth: 6,
                  }}
                  text1Style={{ color: "white" }}
                  text2Style={{ color: "#FCE0E5" }}
                />
              ),
            }}
          />
        </ThemeProvider>
      </SafeAreaProvider>
    );
  }
}

const useIsomorphicLayoutEffect =
  Platform.OS === "web" && typeof window === "undefined"
    ? React.useEffect
    : React.useLayoutEffect;

function useSetWebBackgroundClassName() {
  useIsomorphicLayoutEffect(() => {
    // Adds the background color to the html element to prevent white background on overscroll.
    document.documentElement.classList.add("bg-background");
  }, []);
}

function noop() {}
