import AsyncStorage from "@react-native-async-storage/async-storage";
import RESTApiCall from "../RESTApiCall";

export const CheckAuthUser = async (): Promise<{
  isAuthenticated: boolean;
  completeProfile: boolean;
}> => {
  try {
    const data: string | null = await AsyncStorage.getItem(
      "antar-app-access-data"
    );
    if (!data) return { isAuthenticated: false, completeProfile: false };

    const apiCall = new RESTApiCall();
    const response = await apiCall.get("user/profile", {
      headers: { Authorization: `Bearer ${JSON.parse(data).token}` },
    });

    if (response?.status === 200) {
      const userData = response?.data?.user; // assuming API sends user info
      return {
        isAuthenticated: true,
        completeProfile: userData?.completeProfile ?? false,
      };
    } else {
      return { isAuthenticated: false, completeProfile: false };
    }
  } catch (error) {
    console.error("Error checking authentication:", error);
    return { isAuthenticated: false, completeProfile: false };
  }
};
