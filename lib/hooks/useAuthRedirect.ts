import { useEffect, useRef, useState } from "react";
import { useRouter, useSegments } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CheckAuthUser } from "./checkAuth";

export function useAuthRedirect() {
  const [checking, setChecking] = useState(true);
  const segments = useSegments() as string[]; // e.g., [], ["(tabs)", "home"]
  const router = useRouter();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    async function checkAuth() {
      const isOnRoot = segments.length === 0 || segments[0] === ""; // "/"

      try {
        const token = await AsyncStorage.getItem("antar-app-access-data");

        if (!token) {
          // If already on "/" and not logged in, stop. No redirect.
          if (isOnRoot) {
            setChecking(false);
            return;
          }

          router.replace("/");
          return;
        }

        const {isAuthenticated, completeProfile} = await CheckAuthUser();

        if (isAuthenticated) {
          // Allow staying on complete-profile if user just signed up
          const isOnCompleteProfile = segments[0] === "complete-profile";
          if (!isOnCompleteProfile && segments[0] !== "(tabs)") {
            router.replace("/(tabs)/parivar");
          }
        } else {
          await AsyncStorage.removeItem("antar-app-access-data");

          // If already on "/" and not logged in, stop. No redirect.
          if (isOnRoot) {
            setChecking(false);
            return;
          }

          router.replace("/");
        }
      } catch (error) {
        await AsyncStorage.removeItem("antar-app-access-data");
        router.replace("/");
      } finally {
        setChecking(false);
      }
    }

    checkAuth();
  }, []);

  return { checking };
}
