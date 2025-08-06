import "~/global.css";

import { DefaultTheme, Theme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Platform } from "react-native";
import { NAV_THEME } from "~/lib/constants";
import { PortalHost } from "@rn-primitives/portal";

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
  usePlatformSpecificSetup();

  return (
    <ThemeProvider value={LIGHT_THEME}>
      <StatusBar style="dark" />
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "Welcome",
            headerBackVisible: false, // Hide back button completely
          }}
        />
        <Stack.Screen
          name="register"
          options={{
            title: "Create Account",
            headerBackVisible: false, // Hide back button completely
          }}
        />
        <Stack.Screen
          name="login"
          options={{
            title: "Sign In",
            headerBackVisible: false, // Hide back button completely
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
          }}
        />
      </Stack>
      <PortalHost />
    </ThemeProvider>
  );
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
