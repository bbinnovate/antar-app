import RazorpayCheckout from "react-native-razorpay";
import RESTApiCall from "../RESTApiCall";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import {
  RAZORPAY_CONFIG,
  PARIVAR_PLAN_CONFIG,
} from "../config/razorpay-config";

export interface RazorpayOrder {
  id: string;
  amount: number;
  currency: string;
  receipt?: string;
}

export interface PaymentOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description?: string;
  image?: string;
  order_id: string;
  prefill: {
    email?: string;
    contact?: string;
    name?: string;
  };
  theme: {
    color: string;
  };
  modal?: {
    ondismiss?: () => void;
  };
}

export interface PaymentResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export interface ParivarPlanDetails {
  planId: string;
  name: string;
  amount: number;
  currency: string;
  description: string;
}

export class RazorpayService {
  private static readonly PARIVAR_PLAN: ParivarPlanDetails = PARIVAR_PLAN_CONFIG;

  private static async fetchParivarPlans(): Promise<ParivarPlanDetails[]> {
    try {
      const stored = await AsyncStorage.getItem("antar-app-access-data");
      const token = stored ? JSON.parse(stored)?.token : undefined;

      if (!token) {
        throw new Error("Please sign in to continue with payment");
      }

      const api = new RESTApiCall();
      const response = await api.get("payment/subscription-plans", {
        headers: {
          token,
          Authorization: `Bearer ${token}`,
        },
      });

      if (response?.status === 200) {
        return response?.data?.plans;
      }

      throw new Error(
        response?.data?.message || "Failed to fetch subscription plans"
      );
    } catch (error: any) {
      console.error("Error fetching subscription plans:", error);
      throw new Error(error.message || "Failed to fetch subscription plans");
    }
  }

  private static async createOrder(
    planDetails: ParivarPlanDetails | undefined
  ): Promise<RazorpayOrder> {
    try {
      const stored = await AsyncStorage.getItem("antar-app-access-data");
      const token = stored ? JSON.parse(stored)?.token : undefined;

      if (!token) {
        throw new Error("Please sign in to continue with payment");
      }

      const api = new RESTApiCall();
      const response = await api.post(
        "payment/create-razorpay-order",
        {
          amount: planDetails?.amount,
          currency: planDetails?.currency,
          receipt: `${planDetails?.planId}_${Date.now()}`,
          planId: planDetails?.planId,
        },
        {
          headers: {
            token,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response?.status !== 200 || !response?.data?.order) {
        throw new Error(
          response?.data?.message || "Failed to create payment order"
        );
      }

      return response.data.order;
    } catch (error: any) {
      console.error("Error creating Razorpay order:", error);
      throw new Error(error.message || "Failed to create payment order");
    }
  }

  private static async verifyPayment(
    paymentData: PaymentResponse
  ): Promise<boolean> {
    try {
      const stored = await AsyncStorage.getItem("antar-app-access-data");
      const token = stored ? JSON.parse(stored)?.token : undefined;

      if (!token) {
        throw new Error("Authentication required");
      }

      const api = new RESTApiCall();
      const response = await api.post(
        "payment/verify-razorpay-payment",
        {
          razorpay_payment_id: paymentData.razorpay_payment_id,
          razorpay_order_id: paymentData.razorpay_order_id,
          razorpay_signature: paymentData.razorpay_signature,
        },
        {
          headers: {
            token,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response?.status === 200 && response?.data?.verified) {
        // Store subscription status locally
        await AsyncStorage.setItem(
          "antar_parivar_subscription",
          JSON.stringify({
            isActive: true,
            planId: "antar_parivar_monthly",
            paymentId: paymentData.razorpay_payment_id,
            subscriptionDate: new Date().toISOString(),
          })
        );
        return true;
      }

      return false;
    } catch (error: any) {
      console.error("Error verifying payment:", error);
      throw new Error(error.message || "Payment verification failed");
    }
  }

  /**
   * Get user profile for payment prefill
   */
  private static async getUserProfile(): Promise<{
    email?: string;
    contact?: string;
    name?: string;
  }> {
    try {
      const stored = await AsyncStorage.getItem("antar-app-access-data");
      const userData = stored ? JSON.parse(stored) : {};

      return {
        email: userData?.email || userData?.user?.email,
        contact: userData?.phone || userData?.user?.phone,
        name:
          userData?.name || userData?.user?.name || userData?.user?.full_name,
      };
    } catch {
      return {};
    }
  }

  /**
   * Main function to process Parivar subscription payment
   */
  public static async processParivarPayment(
    razorpayKeyId: string,
    planId?: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      // Step 1: Create order on backend
      Toast.show({
        type: "info",
        text1: "Preparing payment...",
        visibilityTime: 2000,
      });

      console.log("Using Razorpay Key ID:", razorpayKeyId);

      const parivarPlans = await this.fetchParivarPlans();
      const plan = parivarPlans.find((p) => p.planId === planId);

      console.log("Using Parivar Plan:", plan, planId);

      const order = await this.createOrder(plan);

      // Step 2: Get user profile for prefill
      const userProfile = await this.getUserProfile();

      // Step 3: Prepare Razorpay options
      const options: PaymentOptions = {
        key: razorpayKeyId,
        amount: order.amount,
        currency: order.currency,
        name: RAZORPAY_CONFIG.COMPANY_NAME,
        description: this.PARIVAR_PLAN.description,
        image: RAZORPAY_CONFIG.COMPANY_LOGO,
        order_id: order.id,
        prefill: userProfile,
        theme: {
          color: RAZORPAY_CONFIG.THEME_COLOR,
        },
        modal: {
          ondismiss: () => {
            Toast.show({
              type: "info",
              text1: "Payment cancelled",
              text2: "You can try again anytime",
            });
          },
        },
      };

      // Step 4: Open Razorpay checkout
      const paymentData = await RazorpayCheckout.open(options);

      // Step 5: Verify payment on backend
      Toast.show({
        type: "info",
        text1: "Verifying payment...",
        visibilityTime: 2000,
      });

      const isVerified = await this.verifyPayment(paymentData);

      if (isVerified) {
        Toast.show({
          type: "success",
          text1: "Welcome to Antar Parivar! 🎉",
          text2: "Your subscription is now active",
          visibilityTime: 4000,
        });
        return {
          success: true,
          message: "Payment successful! Welcome to Antar Parivar!",
        };
      } else {
        throw new Error("Payment verification failed");
      }
    } catch (error: any) {
      console.error("Payment error:", error);

      let errorMessage = "Payment failed. Please try again.";

      if (error?.code === "PAYMENT_CANCELLED") {
        errorMessage = "Payment was cancelled";
      } else if (error?.code === "NETWORK_ERROR") {
        errorMessage = "Network error. Please check your connection.";
      } else if (error?.message) {
        errorMessage = error?.message;
      }

      Toast.show({
        type: "error",
        text1: "Payment Error",
        text2: errorMessage,
        visibilityTime: 4000,
      });

      return { success: false, message: errorMessage };
    }
  }

  /**
   * Check if user has active Parivar subscription
   */
  public static async checkParivarSubscription(): Promise<boolean> {
    try {
      const stored = await AsyncStorage.getItem("antar_parivar_subscription");
      if (!stored) return false;

      const subscription = JSON.parse(stored);
      return subscription?.isActive === true;
    } catch {
      return false;
    }
  }

  /**
   * Cancel Parivar subscription (remove local state)
   */
  public static async cancelParivarSubscription(): Promise<void> {
    try {
      await AsyncStorage.removeItem("antar_parivar_subscription");
      Toast.show({
        type: "info",
        text1: "Subscription cancelled",
        text2: "You still have access until the end of your billing period",
      });
    } catch (error) {
      console.error("Error cancelling subscription:", error);
    }
  }
}
