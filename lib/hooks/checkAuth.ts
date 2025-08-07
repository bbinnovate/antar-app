import AsyncStorage from "@react-native-async-storage/async-storage";
import RESTApiCall from "../RESTApiCall";

export const CheckAuthUser = async () => {
  try {
    const data: string | null = await AsyncStorage.getItem(
      "antar-app-access-data"
    );
    if (!data) return false;

    const apiCall = new RESTApiCall();
    const response = await apiCall.get("user/profile", {
      headers: { Authorization: `Bearer ${JSON.parse(data).token}` },
    });

    if (response?.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error checking authentication:", error);
    return false;
  }
};
