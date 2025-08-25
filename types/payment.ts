export interface RazorpayConfig {
  keyId: string;
  keySecret: string;
}

export interface PaymentOrder {
  id: string;
  amount: number;
  currency: string;
  receipt?: string;
  status: "created" | "attempted" | "paid";
}

export interface PaymentResult {
  success: boolean;
  message: string;
  paymentId?: string;
  orderId?: string;
}

export interface SubscriptionStatus {
  isActive: boolean;
  planId: string;
  paymentId?: string;
  subscriptionDate: string;
  expiryDate?: string;
}
