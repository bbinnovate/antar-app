import AsyncStorage from "@react-native-async-storage/async-storage";
import RESTApiCall from "../RESTApiCall";

export const GetProfileData = async () => {
  try {
    const data: string | null = await AsyncStorage.getItem(
      "antar-app-access-data"
    );
    if (!data) return null;

    const apiCall = new RESTApiCall();
    const response = await apiCall.get("user/profile", {
      headers: { Authorization: `Bearer ${JSON.parse(data).token}` },
    });

    if (response?.status === 200) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error checking authentication:", error);
    return null;
  }
};
