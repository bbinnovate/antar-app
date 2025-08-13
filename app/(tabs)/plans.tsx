import * as React from "react";
import { View, Linking, Image } from "react-native";
import Screen from "~/components/custom/Screen";
import Section from "~/components/custom/Section";
import DecoratedHeader from "~/components/custom/DecoratedHeader";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";
import RESTApiCall from "~/lib/RESTApiCall";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

type ShopifyPlan = {
  id?: string;
  name?: string;
  title?: string;
  description?: string;
  price?: number | string;
  amount?: number | string;
  currency?: string;
  interval?: string;
  features?: string[];
  url?: string;
  checkout_url?: string;
  // Additional Shopify fields
  product_id?: number | string;
  variant_id?: number | string;
  vendor?: string;
  duration?: string;
  compare_at_price?: number | string | null;
  in_stock?: boolean;
  stock_quantity?: number;
  requires_shipping?: boolean;
  sku?: string;
  image_url?: string | null;
  [key: string]: any;
};

function extractPlansFromResponse(raw: any): ShopifyPlan[] {
  if (!raw) return [];

  const candidates: any[] = [
    raw,
    raw?.data,
    raw?.plans,
    raw?.data?.plans,
    raw?.data?.data,
    raw?.products,
    raw?.data?.products,
    raw?.result,
    raw?.result?.plans,
  ];

  for (const node of candidates) {
    if (Array.isArray(node)) {
      // Handle GraphQL-style edges -> node
      if (
        node.length > 0 &&
        node.every((v) => v && typeof v === "object" && "node" in v)
      ) {
        return (node as any[]).map((e) => e.node) as ShopifyPlan[];
      }
      return node as ShopifyPlan[];
    }
  }

  // Fallback: search first array-of-objects in the object graph (one level deep)
  const containers: any[] = [raw, raw?.data];
  for (const container of containers) {
    if (container && typeof container === "object") {
      for (const value of Object.values(container)) {
        if (Array.isArray(value) && value.every((v) => typeof v === "object")) {
          // Handle nested edges arrays
          if (
            value.length > 0 &&
            value.every((v) => v && typeof v === "object" && "node" in v)
          ) {
            return (value as any[]).map((e) => e.node) as ShopifyPlan[];
          }
          return value as ShopifyPlan[];
        }
      }
    }
  }

  return [];
}

export default function PlansScreen() {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);
  const [plans, setPlans] = React.useState<ShopifyPlan[]>([]);

  React.useEffect(() => {
    const fetchPlans = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const stored = await AsyncStorage.getItem("antar-app-access-data");
        const token = stored ? JSON.parse(stored)?.token : undefined;
        if (!token) {
          setError("Please sign in to view plans.");
          setPlans([]);
          setIsLoading(false);
          return;
        }

        const api = new RESTApiCall();
        const response = await api.post(
          "user/shopify-plans",
          {},
          {
            headers: {
              token,
              Authorization: `Bearer ${token}`,
              authorization: `Bearer ${token}`,
            },
          }
        );

        if (response?.status !== 200) {
          const message =
            response?.data?.error ||
            response?.data?.message ||
            "Failed to load plans.";
          setError(message);
          setPlans([]);
        } else {
          const raw = response?.data;
          const normalized = extractPlansFromResponse(raw);
          setPlans(normalized);
        }
      } catch (e: any) {
        setError("Unable to load plans. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const openCheckout = (plan: ShopifyPlan) => {
    const url = plan.checkout_url || plan.url;
    if (url) {
      Linking.openURL(url).catch(() => {
        Toast.show({
          type: "error",
          text1: "Unable to open link",
        });
      });
    } else {
      Toast.show({
        type: "info",
        text1: "Checkout coming soon",
      });
    }
  };

  const renderPlanPrice = (plan: ShopifyPlan) => {
    const price = plan.price ?? plan.amount;
    if (price == null) return null;
    const base = `₹${price}`;
    return plan.interval ? `${base}/${plan.interval}` : base;
  };

  const parseNumber = (value: unknown): number | null => {
    if (value == null) return null;
    const num = typeof value === "number" ? value : parseFloat(String(value));
    return Number.isFinite(num) ? num : null;
  };

  const formatINR = (value: number): string => {
    try {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(value);
    } catch {
      return `₹${value}`;
    }
  };

  return (
    <Screen>
      <DecoratedHeader
        title="Plans"
        subtitle="Choose a plan that fits your journey"
      />

      <Section title="Available Plans">
        {isLoading ? (
          <View className="w-full items-center py-10">
            <View className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <Text className="mt-3 text-muted-foreground">Loading plans…</Text>
          </View>
        ) : error ? (
          <View className="w-full items-center py-6">
            <Text className="text-red-500">{error}</Text>
          </View>
        ) : plans.length === 0 ? (
          <View className="w-full items-center py-6">
            <Text className="text-muted-foreground">No plans available.</Text>
          </View>
        ) : (
          <View className="flex flex-col gap-4">
            {plans.map((plan, index) => {
              const key =
                plan.id || `${plan.name || plan.title || "plan"}-${index}`;
              const priceVal =
                typeof plan.price === "number"
                  ? plan.price
                  : parseFloat(String(plan.price ?? plan.amount ?? 0));
              const compareVal =
                plan.compare_at_price != null
                  ? typeof plan.compare_at_price === "number"
                    ? plan.compare_at_price
                    : parseFloat(String(plan.compare_at_price))
                  : null;
              const hasDiscount = compareVal != null && compareVal > priceVal;
              const discountPct = hasDiscount
                ? Math.round(
                    (((compareVal as number) - priceVal) /
                      (compareVal as number)) *
                      100
                  )
                : null;
              const weeksMatch = plan.duration
                ? String(plan.duration).match(/(\d+)/)
                : null;
              const weeks = weeksMatch ? parseInt(weeksMatch[1], 10) : null;
              const inStock =
                plan.in_stock !== false &&
                (plan.stock_quantity == null ||
                  Number(plan.stock_quantity) > 0);
              const planType =
                weeks === 8
                  ? "Restoration & Strengthening"
                  : weeks === 12
                  ? "Deep Healing & Transformation"
                  : plan.title || plan.name || "Wellness Plan";

              return (
                <View
                  key={key}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 mx-4"
                >
                  {/* Discount Banner */}
                  {hasDiscount ? (
                    <View className="bg-green-600 px-4 py-2">
                      <Text className="text-white text-xs font-semibold text-center">
                        OFFER! GET {discountPct}% OFF 🎉
                      </Text>
                    </View>
                  ) : null}

                  <View className="p-6">
                    <View className="flex-row justify-between items-start mb-4">
                      {/* Left Side - Plan Info */}
                      <View className="flex-1">
                        <Text className="text-gray-600 text-sm mb-1">
                          {planType}
                        </Text>
                        <Text className="text-3xl font-bold text-gray-900 mb-2">
                          {weeks ? `${weeks} Week Plan` : "Wellness Plan"}
                        </Text>

                        {weeks ? (
                          <View className="flex-row items-center mb-3">
                            <View className="w-5 h-5 rounded-full border border-gray-400 items-center justify-center mr-2">
                              <Text className="text-xs text-gray-600">
                                {weeks}
                              </Text>
                            </View>
                            <Text className="text-gray-600 text-sm">
                              Sessions: {weeks * 4} | 4 sessions in a week
                            </Text>
                          </View>
                        ) : null}

                        {/* Price Section */}
                        <View className="mb-4">
                          {compareVal != null ? (
                            <Text className="text-gray-400 text-base line-through">
                              ₹{compareVal.toLocaleString()}
                            </Text>
                          ) : null}
                          <Text className="text-xl font-bold text-gray-900">
                            Total Price ₹{priceVal.toLocaleString()}
                          </Text>
                        </View>

                        {/* Features */}
                        <View className="mb-4">
                          <Text className="text-sm font-semibold text-gray-900 mb-2">
                            This plan is best for:
                          </Text>
                          {Array.isArray(plan.features) &&
                          plan.features.length > 0 ? (
                            <View>
                              {plan.features.slice(0, 3).map((feat, i) => (
                                <View
                                  key={i}
                                  className="flex-row items-center mb-1"
                                >
                                  <Text className="text-antar-teal mr-2">
                                    ✓
                                  </Text>
                                  <Text className="text-gray-700 text-sm">
                                    {feat}
                                  </Text>
                                </View>
                              ))}
                            </View>
                          ) : (
                            <View>
                              <View className="flex-row items-center mb-1">
                                <Text className="text-antar-teal mr-2">✓</Text>
                                <Text className="text-gray-700 text-sm">
                                  Chronic pain
                                </Text>
                              </View>
                              <View className="flex-row items-center mb-1">
                                <Text className="text-antar-teal mr-2">✓</Text>
                                <Text className="text-gray-700 text-sm">
                                  Long-term muscle imbalances
                                </Text>
                              </View>
                              <View className="flex-row items-center mb-1">
                                <Text className="text-antar-teal mr-2">✓</Text>
                                <Text className="text-gray-700 text-sm">
                                  Surgical rehab
                                </Text>
                              </View>
                            </View>
                          )}
                        </View>

                        {/* Benefits Pills */}
                        <View className="flex-row flex-wrap mb-4">
                          <View className="bg-orange-50 px-3 py-1 rounded-full mr-2 mb-2">
                            <Text className="text-antar-orange text-xs">
                              🏠 No Travel
                            </Text>
                          </View>
                          <View className="bg-orange-50 px-3 py-1 rounded-full mr-2 mb-2">
                            <Text className="text-antar-orange text-xs">
                              ⏰ Anytime Access
                            </Text>
                          </View>
                          <View className="bg-orange-50 px-3 py-1 rounded-full mb-2">
                            <Text className="text-antar-orange text-xs">
                              🌐 Anytime Access
                            </Text>
                          </View>
                        </View>

                        {/* CTA Button */}
                        <Button
                          className="bg-antar-orange py-3 px-6 rounded-xl"
                          disabled={!inStock}
                          onPress={() => openCheckout(plan)}
                        >
                          <Text className="text-white font-semibold text-base">
                            {weeks ? `Begin ${weeks} Week Plan` : "Begin Plan"}
                          </Text>
                        </Button>
                      </View>

                      {/* Right Side - Image */}
                      <View className="ml-4">
                        {plan.image_url ? (
                          <Image
                            source={{ uri: String(plan.image_url) }}
                            style={{
                              width: 120,
                              height: 160,
                              borderRadius: 16,
                            }}
                            resizeMode="cover"
                          />
                        ) : (
                          <View className="w-28 h-40 bg-gradient-to-br from-antar-teal/20 to-antar-orange/20 rounded-2xl items-center justify-center">
                            <Text className="text-4xl">🧘</Text>
                            <Text className="text-xs text-gray-600 mt-1">
                              Wellness
                            </Text>
                          </View>
                        )}
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        )}
      </Section>
    </Screen>
  );
}
