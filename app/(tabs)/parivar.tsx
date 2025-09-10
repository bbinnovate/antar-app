import * as React from "react";
import {
  View,
  Alert,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Line, Circle, Path } from "react-native-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import DecoratedHeader from "~/components/custom/DecoratedHeader";
import Screen from "~/components/custom/Screen";
import Section from "~/components/custom/Section";
import GradientCTA from "~/components/custom/GradientCTA";
import BestValueBadge from "~/components/custom/BestValueBadge";
const profileLogo = require("~/assets/images/profileLogo.png");

const benefitsIcons = {
  liveSessions: require("~/assets/images/icons/yoga.png"),
  whatsapp: require("~/assets/images/icons/mobile-phone.png"),
  webinar: require("~/assets/images/icons/online-education.png"),
  toolkit: require("~/assets/images/icons/tool-box.png"),
  chat: require("~/assets/images/icons/chat.png"),
  plans: require("~/assets/images/icons/task.png"),
};

const mockApiData = {
  userJourney: {
    sessionsCompleted: 12,
    attendanceRate: 85,
    currentStreak: 4,
    monthlyGoal: {
      completed: 12,
      target: 15,
      progress: 0.8,
    },
    achievements: [
      { icon: "🔥", title: "Consistent Member", description: "4 weeks active" },
      { icon: "⭐", title: "Top Performer", description: "High attendance" },
    ],
  },
  todaySession: {
    title: "🧘 Today's Session",
    sessionName: "Mobility Flow at 7:00 AM",
    instructor: "Dr. Richa",
    status: "Starting in 2 hours",
    buttonText: "Join Now",
  },
  weeklySessions: [
    {
      id: "mon-mobility",
      day: "Monday",
      sessionType: "mobility",
      sessionName: "Mobility Flow",
      time: "7:00 AM",
      status: "completed",
      date: { month: "JAN", day: "8" },
      instructor: "",
    },
    {
      id: "tue-breathwork",
      day: "Tuesday",
      sessionType: "breathwork",
      sessionName: "Breathwork",
      time: "7:00 AM",
      status: "upcoming",
      date: { month: "JAN", day: "9" },
      instructor: "",
      daysLeft: 1,
    },
    {
      id: "fri-webinar",
      day: "Friday",
      sessionType: "webinar",
      sessionName: "Expert Webinar",
      time: "5:00 PM",
      status: "upcoming",
      date: { month: "JAN", day: "12" },
      instructor: "",
      daysLeft: 4,
    },
  ],
  specialEvent: {
    title: "Monthly Expert Webinar",
    topic: "Seasonal Wellness: Winter Care",
    subtitle: '"Seasonal Wellness: Winter Care"',
    date: "Sunday, Jan 14 at 5:00 PM IST",
    buttonText: "Register Now",
  },
  comingUpSessions: [
    {
      id: "breathwork-jan9",
      title: "Breathwork Session",
      sessionType: "breathwork",
      date: { month: "JAN", day: "9" },
      dateText: "9 Jan, 7:00 AM",
      instructor: "Shreeta",
      actionType: "remind",
    },
    {
      id: "webinar-jan14",
      title: "Expert Webinar",
      sessionType: "webinar",
      date: { month: "JAN", day: "14" },
      dateText: "14 Jan, 5:00 PM",
      topic: "Seasonal Wellness",
      actionType: "register",
    },
    {
      id: "next-week-jan15",
      title: "Next Week Starts",
      sessionType: "preview",
      date: { month: "FEB", day: "25" },
      dateText: "25 Feb, 7:00 AM",
      description: "Mobility Flow returns",
      actionType: "preview",
    },
  ],
};

const renderWithLineBreaks = (text: string) => {
  return text.replace(/<br\s*\/?>/gi, "\n");
};

// Utility function to get styling based on session type and status
const getSessionStyling = (
  sessionType: string,
  status?: string,
  actionType?: string
) => {
  // For completed sessions
  if (status === "completed") {
    return {
      bgColor: "bg-green-50/80",
      borderColor: "border-green-200/60",
      textColor: "text-green-700",
      subtitleColor: "text-green-600",
      buttonColor: "bg-green-100",
      buttonText: "Completed",
    };
  }

  // For upcoming sessions based on type
  switch (sessionType) {
    case "breathwork":
      return {
        bgColor: "bg-antar-teal/8",
        borderColor: "border-antar-teal/25",
        textColor: "text-antar-teal",
        subtitleColor: "text-muted-foreground",
        buttonColor: "bg-antar-teal/20",
        buttonText: actionType === "remind" ? "Remind Me" : "Join",
      };

    case "webinar":
      return {
        bgColor: "bg-antar-pink/8",
        borderColor: "border-antar-pink/25",
        textColor: "text-antar-pink",
        subtitleColor: "text-muted-foreground",
        buttonColor: "bg-antar-pink/20",
        buttonText: actionType === "register" ? "Register" : "Join",
      };

    case "mobility":
      return {
        bgColor: "bg-antar-teal/5",
        borderColor: "border-antar-teal/20",
        textColor: "text-antar-teal",
        subtitleColor: "text-muted-foreground",
        buttonColor: "bg-antar-teal/20",
        buttonText: "Join",
      };

    case "preview":
      return {
        bgColor: "bg-antar-orange/8",
        borderColor: "border-antar-orange/25",
        textColor: "text-antar-orange",
        subtitleColor: "text-muted-foreground",
        buttonColor: "bg-antar-orange/20",
        buttonText: "Get Ready",
      };

    default:
      return {
        bgColor: "bg-antar-teal/5",
        borderColor: "border-antar-teal/20",
        textColor: "text-antar-dark",
        subtitleColor: "text-muted-foreground",
        buttonColor: "bg-antar-teal/20",
        buttonText: "Remind Me",
      };
  }
};

const useRawApiData = (apiResponse: any) => {
  console.log("🔍 Raw API Response:", JSON.stringify(apiResponse, null, 2));

  // Return the raw API response structure
  return apiResponse;
};

// Helper function to calculate days left until session
const calculateDaysLeft = (dateTimeString: string) => {
  const sessionDate = new Date(dateTimeString);
  const now = new Date();
  const diffTime = sessionDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
};

// Helper function to get day name
const getDayName = (dateTimeString: string) => {
  const date = new Date(dateTimeString);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[date.getDay()];
};

// Helper function to format time
const formatTime = (dateTimeString: string) => {
  const date = new Date(dateTimeString);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

// Helper function to get month name
const getMonthName = (dateTimeString: string) => {
  const date = new Date(dateTimeString);
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  return months[date.getMonth()];
};

// Helper function to get day number
const getDayNumber = (dateTimeString: string) => {
  const date = new Date(dateTimeString);
  return date.getDate().toString();
};

// Helper function to get action type based on session type
const getActionType = (sessionType: string) => {
  switch (sessionType) {
    case "breathwork":
      return "remind";
    case "webinar":
      return "register";
    case "preview":
      return "preview";
    default:
      return "remind";
  }
};

// API call function
const fetchScheduledSessions = async (token: string) => {
  try {
    const response = await fetch(
      "https://antar-admin.vercel.app/api/app/user/schedule-session",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching scheduled sessions:", error);
    throw error;
  }
};

export default function ParivarScreen() {
  // TODO: Replace with real subscription state from API/AsyncStorage
  const [hasParivar, setHasParivar] = React.useState(false); // Set to true for testing API

  // API state management
  const [sessionsData, setSessionsData] = React.useState<any>(mockApiData);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [refreshing, setRefreshing] = React.useState(false);

  // Load sessions on component mount
  React.useEffect(() => {
    console.log("🎯 useEffect triggered, hasParivar:", hasParivar);

    const loadSessions = async () => {
      if (!hasParivar) {
        console.log("❌ Skipping API call - hasParivar is false");
        return; // Only fetch if user has Parivar subscription
      }

      console.log("✅ hasParivar is true, proceeding with API call");

      setIsLoading(true);
      setError(null);

      try {
        console.log("🔄 Starting API call...");

        // Get auth token from AsyncStorage - from antar-app-access-data
        let authToken = null;

        try {
          const accessDataString = await AsyncStorage.getItem(
            "antar-app-access-data"
          );
          console.log("📦 AsyncStorage data:", accessDataString);

          if (accessDataString) {
            const accessData = JSON.parse(accessDataString);
            authToken = accessData.token;
            console.log(
              "🔑 Token found:",
              authToken ? `${authToken.substring(0, 20)}...` : "null"
            );
          } else {
            console.log("❌ No antar-app-access-data found in AsyncStorage");
          }
        } catch (parseError) {
          console.error("❌ Error parsing antar-app-access-data:", parseError);
        }

        if (!authToken) {
          throw new Error("No authentication token found. Please login again.");
        }

        console.log("🌐 Making API call to schedule-session...");
        const apiData = await fetchScheduledSessions(authToken);
        console.log("✅ API Response received:", apiData);

        // Use raw API data directly
        console.log("🔄 Using raw API data...");
        const rawData = useRawApiData(apiData);
        console.log("✅ Raw data:", rawData);

        setSessionsData(rawData);
        console.log("✅ Session data updated in state");
      } catch (err) {
        console.error("❌ API call failed:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load sessions"
        );
        console.error("Failed to load sessions:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadSessions();
  }, [hasParivar]);

  // Refresh function for pull-to-refresh
  const onRefresh = React.useCallback(async () => {
    if (!hasParivar) return;

    setRefreshing(true);
    setError(null);

    try {
      let authToken = null;
      try {
        const accessDataString = await AsyncStorage.getItem(
          "antar-app-access-data"
        );
        if (accessDataString) {
          const accessData = JSON.parse(accessDataString);
          authToken = accessData.token;
        }
      } catch (parseError) {
        console.error(
          "Error parsing antar-app-access-data in refresh:",
          parseError
        );
      }

      if (!authToken) {
        throw new Error("No authentication token found. Please login again.");
      }

      const apiData = await fetchScheduledSessions(authToken);
      const rawData = useRawApiData(apiData);
      setSessionsData(rawData);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to refresh sessions"
      );
    } finally {
      setRefreshing(false);
    }
  }, [hasParivar]);

  // Auto-refresh every 5 minutes when app is active
  React.useEffect(() => {
    if (!hasParivar) return;

    const interval = setInterval(() => {
      console.log("🔄 Auto-refreshing data...");
      onRefresh();
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, [hasParivar, onRefresh]);

  const showPurchaseAlert = () => {
    Alert.alert(
      "Join Antar Parivar",
      "Unlock guided practices, live sessions, and a nurturing community for ₹199/month",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Buy Now",
          onPress: () => {
            setHasParivar(true);
            Alert.alert("Success!", "Welcome to Antar Parivar! 🎉");
          },
        },
      ]
    );
  };

  // Post-Purchase Dashboard Content
  if (hasParivar) {
    return (
      <Screen>
        {/* <DecoratedHeader
          title="Welcome to Antar Parivar"
          subtitle="Your wellness journey starts now! 🧘‍♂️"
        /> */}

        {/* Loading State */}
        {isLoading && (
          <Section>
            <View className="flex-row items-center justify-center py-8">
              <ActivityIndicator size="large" color="#236A61" />
              <Text className="ml-3 text-muted-foreground">
                Loading your sessions...
              </Text>
            </View>
          </Section>
        )}

        {/* Error State */}
        {error && (
          <Section>
            <View className="p-4 rounded-2xl bg-red-50 border border-red-200">
              <Text className="text-red-700 font-medium mb-2">
                Unable to load sessions
              </Text>
              <Text className="text-red-600 text-sm mb-3">{error}</Text>
              <Button
                className="bg-red-600"
                onPress={() => {
                  setError(null);
                  // Retry loading
                  const loadSessions = async () => {
                    setIsLoading(true);
                    try {
                      // Get token from antar-app-access-data
                      let authToken = null;

                      try {
                        const accessDataString = await AsyncStorage.getItem(
                          "antar-app-access-data"
                        );
                        if (accessDataString) {
                          const accessData = JSON.parse(accessDataString);
                          authToken = accessData.token;
                        }
                      } catch (parseError) {
                        console.error(
                          "Error parsing antar-app-access-data in retry:",
                          parseError
                        );
                      }

                      if (!authToken) {
                        throw new Error(
                          "No authentication token found. Please login again."
                        );
                      }

                      const apiData = await fetchScheduledSessions(authToken);
                      const rawData = useRawApiData(apiData);
                      setSessionsData(rawData);
                    } catch (err) {
                      setError(
                        err instanceof Error
                          ? err.message
                          : "Failed to load sessions"
                      );
                    } finally {
                      setIsLoading(false);
                    }
                  };
                  loadSessions();
                }}
              >
                <Text className="text-white font-medium">Retry</Text>
              </Button>
            </View>
          </Section>
        )}

        {/* Refresh Button */}
        {/* {!isLoading && !error && (
          <Section>
            <Button
              className="bg-antar-teal mb-4"
              onPress={onRefresh}
              disabled={refreshing}
            >
              <Text className="text-white font-medium">
                {refreshing ? "Refreshing..." : "🔄 Refresh Data"}
              </Text>
            </Button>
          </Section>
        )} */}

        {/* Progress Overview - Your Journey (Post-purchase) */}
        {!isLoading && !error && (
          <Section>
            <LinearGradient
              colors={["#6E863C", "#236A61", "#112F15"]}
              locations={[0, 0.55, 1]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ borderRadius: 16 }}
              className="w-full rounded-2xl relative overflow-hidden"
            >
              <View className="p-5">
                <View className="flex-row items-center justify-between mb-3">
                  <View className="flex-1 pr-3">
                    <Text className="text-white text-[22px] font-semibold">
                      Your Journey
                    </Text>
                    <Text className="text-white text-sm font-medium mt-1">
                      {sessionsData?.userJourney?.sessionsCompleted || 12}{" "}
                      Sessions Completed
                    </Text>
                  </View>
                  {/* Monochrome medal icon (black & white) */}
                  <Svg width={28} height={28} viewBox="0 0 24 24">
                    {/* Ribbons */}
                    <Path
                      d="M7 2h3l1 6H8z"
                      stroke="#FFFFFF"
                      strokeWidth={1.5}
                      fill="none"
                      strokeLinejoin="round"
                    />
                    <Path
                      d="M14 2h3l-1 6h-3z"
                      stroke="#FFFFFF"
                      strokeWidth={1.5}
                      fill="none"
                      strokeLinejoin="round"
                    />
                    {/* Medal circle */}
                    <Circle
                      cx={12}
                      cy={16}
                      r={5}
                      stroke="#FFFFFF"
                      strokeWidth={1.5}
                      fill="none"
                    />
                    <Circle
                      cx={12}
                      cy={16}
                      r={2}
                      stroke="#FFFFFF"
                      strokeWidth={1.2}
                      fill="none"
                    />
                  </Svg>
                </View>

                {/* Thin white progress */}
                <View className="mt-2">
                  <View className="flex-row justify-between mb-1">
                    <Text className="text-white/90 text-[12px] font-medium">
                      Monthly Progress
                    </Text>
                    <Text className="text-white text-[12px] font-semibold">
                      {sessionsData?.userJourney?.monthlyGoal?.completed || 12}/
                      {sessionsData?.userJourney?.monthlyGoal?.target || 15}{" "}
                      sessions
                    </Text>
                  </View>
                  <View className="h-[5px] bg-white/25 rounded-full overflow-hidden">
                    <View
                      className="h-[5px] bg-white rounded-full"
                      style={{
                        width: `${Math.round(
                          (sessionsData?.userJourney?.monthlyGoal?.progress ??
                            0.8) * 100
                        )}%`,
                      }}
                    />
                  </View>
                </View>
              </View>
            </LinearGradient>
          </Section>
        )}

        {/* Today Session */}
        {!isLoading && !error && (
          <Section title="Today's Session">
            <View
              className="p-4 rounded-2xl border border-antar-orange"
              style={{
                shadowColor: "#F18E3A",
                shadowOpacity: 0.15,
                shadowOffset: { width: 0, height: 4 },
                shadowRadius: 10,
                elevation: 2,
              }}
            >
              {(() => {
                const upcoming = (sessionsData?.meetings || [])
                  .filter(
                    (s: any) =>
                      s?.dateTime && new Date(s.dateTime) >= new Date()
                  )
                  .sort(
                    (a: any, b: any) =>
                      new Date(a.dateTime).getTime() -
                      new Date(b.dateTime).getTime()
                  )[0];
                const title = upcoming?.title || "Optimal Movement Therapy";
                const d = upcoming?.dateTime
                  ? new Date(upcoming.dateTime)
                  : null;
                const dateText = d
                  ? `${d.toLocaleString("en-US", {
                      month: "short",
                    })} ${d.getDate()} ${d
                      .toLocaleString("en-US", { weekday: "short" })
                      .toLowerCase()}`
                  : "Oct 15 wed";
                const instructor = upcoming?.instructor || "Dr. Richa";

                return (
                  <>
                    <View className="mb-3">
                      <Text className="font-bold text-antar-dark text-lg text-center">
                        {title}
                      </Text>
                      <Text className="text-antar-orange font-medium mt-1">
                        Next Session is on {dateText} | With {instructor}
                      </Text>
                    </View>

                    <GradientCTA title="Join Now" onPress={() => {}} />
                  </>
                );
              })()}
            </View>
          </Section>
        )}

        {/* Weekly Schedule - Upcoming Events style */}
        {!isLoading && !error && (
          <Section title="This Week's Events">
            <View className="-my-3">
              {sessionsData?.meetings
                ?.filter((session: any) => {
                  if (!session.dateTime) return false;
                  const sessionDate = new Date(session.dateTime);
                  const now = new Date();
                  const weekFromNow = new Date(
                    now.getTime() + 7 * 24 * 60 * 60 * 1000
                  );
                  return sessionDate >= now && sessionDate <= weekFromNow;
                })
                .map((session: any, index: number, arr: any[]) => {
                  const styling = getSessionStyling(
                    session.sessionType,
                    session.status
                  );
                  const sessionDate = new Date(session.dateTime);
                  const months = [
                    "JAN",
                    "FEB",
                    "MAR",
                    "APR",
                    "MAY",
                    "JUN",
                    "JUL",
                    "AUG",
                    "SEP",
                    "OCT",
                    "NOV",
                    "DEC",
                  ];
                  const weekdays = [
                    "SUN",
                    "MON",
                    "TUE",
                    "WED",
                    "THU",
                    "FRI",
                    "SAT",
                  ];

                  return (
                    <View key={session.id} className="">
                      <View className="flex-row items-center py-3">
                        {/* Date badge */}
                        <View className="w-16 h-fit rounded-xl border border-antar-orange/50 mr-4 overflow-hidden">
                          <View className="bg-antar-dark h-6 items-center justify-center">
                            <Text className="text-white text-[10px] font-bold tracking-wider">
                              {months[sessionDate.getMonth()]}
                            </Text>
                          </View>
                          <View className="flex-1 bg-white/70 items-center justify-center mt-1">
                            <Text className="text-antar-dark text-2xl font-bold leading-none">
                              {sessionDate.getDate()}
                            </Text>
                            <Text className="text-antar-orange text-[10px] font-semibold">
                              {weekdays[sessionDate.getDay()]}
                            </Text>
                          </View>
                        </View>

                        {/* Text block */}
                        <View className="flex-1 pr-3">
                          <Text className="text-antar-dark font-semibold">
                            {session.title}
                          </Text>
                          <Text className="text-antar-orange font-medium">
                            {session.subTitle || ""}
                          </Text>
                          <Text className="text-muted-foreground text-sm">
                            Time:{" "}
                            {sessionDate.toLocaleTimeString("en-US", {
                              hour: "numeric",
                              minute: "2-digit",
                              hour12: true,
                            })}
                          </Text>
                        </View>

                        {/* Right arrow */}
                        <View className="w-10 h-10 rounded-full bg-antar-orange items-center justify-center">
                          <Text className="text-white text-lg">→</Text>
                        </View>
                      </View>
                      {/* Divider (not after last card) */}
                      {index < arr.length - 1 && (
                        <View className="h-[1px] bg-antar-orange/30" />
                      )}
                    </View>
                  );
                }) ||
                mockApiData.weeklySessions.map(
                  (session: any, index: number, arr: any[]) => {
                    const styling = getSessionStyling(
                      session.sessionType,
                      session.status
                    );
                    return (
                      <View key={session.id} className="">
                        <View className="flex-row items-center py-3">
                          {/* Date badge */}
                          <View className="w-14 h-16 rounded-xl border border-antar-orange/50 mr-4 overflow-hidden">
                            <View className="bg-antar-dark h-6 items-center justify-center">
                              <Text className="text-white text-[10px] font-bold tracking-wider">
                                {session.date.month}
                              </Text>
                            </View>
                            <View className="flex-1 bg-white items-center justify-center">
                              <Text className="text-antar-dark text-2xl font-bold leading-none">
                                {session.date.day}
                              </Text>
                              <Text className="text-antar-orange text-[10px] font-semibold">
                                {session.day.toUpperCase()}
                              </Text>
                            </View>
                          </View>

                          {/* Text block */}
                          <View className="flex-1 pr-3">
                            <Text className="text-antar-dark font-semibold">
                              {session.sessionName}
                            </Text>
                            <Text className="text-antar-orange font-medium">
                              {session.description || ""}
                            </Text>
                            <Text className="text-muted-foreground text-sm">
                              Time: {session.time}
                            </Text>
                          </View>

                          {/* Right arrow */}
                          <View className="w-10 h-10 rounded-full bg-antar-orange items-center justify-center">
                            <Text className="text-white text-lg">→</Text>
                          </View>
                        </View>
                        {/* Divider */}
                        {index < arr.length - 1 && (
                          <View className="h-[1px] bg-antar-orange/30" />
                        )}
                      </View>
                    );
                  }
                )}
            </View>
          </Section>
        )}

        {/* Special Event (Webinar) */}
        {!isLoading && !error && (
          <Section title="Special Event">
            {(() => {
              const special = sessionsData?.meetings?.find(
                (s: any) => s.isSpecialEvent
              );
              const dateStr = (() => {
                if (special?.dateTime) {
                  const d = new Date(special.dateTime);
                  return d.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                    timeZoneName: "short",
                  });
                }
                return "Sunday, Jan 14 at 5:00 PM IST"; // fallback
              })();

              return (
                <View
                  className="p-3 rounded-2xl border border-antar-orange/60 bg-antar-orange/5"
                  style={{
                    shadowColor: "#E87D36",
                    shadowOpacity: 0.12,
                    shadowOffset: { width: 0, height: 3 },
                    shadowRadius: 6,
                    elevation: 2,
                  }}
                >
                  <View className="flex-row mb-3">
                    <Image
                      source={require("~/assets/images/backgrounds/plans-bg.jpg")}
                      style={{ width: 92, height: 92, borderRadius: 12 }}
                      resizeMode="cover"
                    />
                    <View className="flex-1 ml-4 justify-center">
                      <Text className="font-semibold text-antar-dark text-base">
                        {special?.title || "Monthly Expert Webinar"}
                      </Text>
                      <Text className="text-antar-orange font-medium mt-[2px]">
                        Seasonal Wellness : Winter Care
                      </Text>
                      <Text className="text-antar-dark mt-2 text-sm">
                        {dateStr}
                      </Text>
                    </View>
                  </View>
                  <GradientCTA
                    title={special ? "Join Now" : "Register Now"}
                    onPress={() => {}}
                    style={{ width: "100%" }}
                  />
                </View>
              );
            })()}
          </Section>
        )}

        {/* Events in the Coming Week */}
        {!isLoading && !error && (
          <Section title="Upcoming Events">
            <View>
              {(() => {
                const items = (sessionsData?.meetings || [])
                  .filter((s: any) => s?.dateTime)
                  .filter((s: any) => {
                    const d = new Date(s.dateTime);
                    const now = new Date();
                    const week = new Date(
                      now.getTime() + 7 * 24 * 60 * 60 * 1000
                    );
                    return d >= now && d <= week;
                  })
                  .sort(
                    (a: any, b: any) =>
                      new Date(a.dateTime).getTime() -
                      new Date(b.dateTime).getTime()
                  )
                  .slice(0, 6); // limit length

                if (!items.length)
                  return (
                    <Text className="text-sm text-muted-foreground">
                      No events scheduled in the coming week.
                    </Text>
                  );

                const months = [
                  "JAN",
                  "FEB",
                  "MAR",
                  "APR",
                  "MAY",
                  "JUN",
                  "JUL",
                  "AUG",
                  "SEP",
                  "OCT",
                  "NOV",
                  "DEC",
                ];
                const weekdays = [
                  "SUN",
                  "MON",
                  "TUES",
                  "WED",
                  "THURS",
                  "FRI",
                  "SAT",
                ];

                return items.map((item: any, index: number, arr: any[]) => {
                  const d = new Date(item.dateTime);
                  return (
                    <View key={item.id} className="">
                      <View className="flex-row items-center py-3">
                        {/* Date badge */}
                        <View className="w-16 rounded-xl border border-antar-orange/60 mr-4 overflow-hidden">
                          <View className="bg-antar-dark h-6 items-center justify-center">
                            <Text className="text-white text-[10px] font-bold tracking-wider">
                              {months[d.getMonth()]}
                            </Text>
                          </View>
                          <View className="bg-white items-center justify-center py-1">
                            <Text className="text-antar-dark text-2xl font-bold leading-none">
                              {d.getDate()}
                            </Text>
                            <Text className="text-antar-orange text-[10px] font-semibold -mt-1">
                              {weekdays[d.getDay()]}
                            </Text>
                          </View>
                        </View>

                        {/* Text block */}
                        <View className="flex-1 pr-3">
                          <Text className="text-antar-dark font-semibold">
                            {item.title || item.sessionName || "Session"}
                          </Text>
                          <Text className="text-antar-orange font-medium">
                            Seasonal Wellness : Winter Care
                          </Text>
                          <Text className="text-muted-foreground text-sm">
                            Time:{" "}
                            {d.toLocaleTimeString("en-US", {
                              hour: "numeric",
                              minute: "2-digit",
                              hour12: true,
                            })}
                          </Text>
                        </View>

                        {/* Arrow */}
                        <View className="w-10 h-10 rounded-full bg-antar-orange items-center justify-center">
                          <Text className="text-white text-lg">→</Text>
                        </View>
                      </View>
                      {index < arr.length - 1 && (
                        <View className="h-[1px] bg-antar-orange/30" />
                      )}
                    </View>
                  );
                });
              })()}
            </View>
          </Section>
        )}

        {/* Your Parivar Access */}
        {!isLoading && !error && (
          <Section title="Your Parivar Access">
            <View className="flex-row flex-wrap -mx-1">
              {[
                {
                  key: "community",
                  title: "Community Support",
                  subtitle: "127 Members Online",
                  icon: require("~/assets/images/icons/chat.png"),
                },
                {
                  key: "toolkit",
                  title: "Wellness Toolkit",
                  subtitle: "New January Pack",
                  icon: require("~/assets/images/icons/tool-box.png"),
                },
              ].map((card) => (
                <View key={card.key} className="w-1/2 px-1 mb-3">
                  <View
                    className="rounded-2xl bg-antar-orange/5 border border-antar-orange/40 p-4 items-center"
                    style={{
                      shadowColor: "#E87D36",
                      shadowOpacity: 0.08,
                      shadowOffset: { width: 0, height: 2 },
                      shadowRadius: 4,
                      elevation: 1,
                    }}
                  >
                    <Image
                      source={card.icon}
                      style={{
                        width: 44,
                        height: 44,
                        tintColor: "#E87D36",
                        marginBottom: 10,
                      }}
                      resizeMode="contain"
                    />
                    <Text className="text-antar-dark font-semibold text-center">
                      {card.title}
                    </Text>
                    <Text className="text-muted-foreground text-xs mt-1 text-center">
                      {card.subtitle}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </Section>
        )}

        {/* Membership Status */}
        <Section>
          <View className="flex-row items-center justify-between p-4 rounded-2xl bg-white/80 border border-white/40">
            <View>
              <Text className="font-semibold text-antar-dark">
                Parivar Membership
              </Text>
              <Text className="text-sm text-muted-foreground">
                ₹199/month • Active
              </Text>
            </View>
            <Button
              className="bg-red-50 border border-red-300"
              onPress={() => setHasParivar(false)}
            >
              <Text className="text-red-600 text-sm">Cancel</Text>
            </Button>
          </View>
        </Section>
      </Screen>
    );
  }

  // Pre-Purchase Marketing Content
  return (
    <Screen>
      {/* Combined Header + Price Card */}
      <Section>
        <LinearGradient
          colors={["#6E863C", "#236A61", "#112F15"]}
          locations={[0, 0.55, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ borderRadius: 14 }}
          className="w-full rounded-3xl relative overflow-hidden"
        >
          {/* Header Content */}

          <View className="mb-3 p-3">
            <View className="flex-row items-center mb-1">
              {/* <Image
                source={profileLogo}
                style={{ width: 35, height: 35, marginRight: 8 }}
              /> */}
              <Text className="text-2xl font-bold text-white">
                Antar Parivaar
              </Text>
            </View>
            <Text className="text-base font-medium text-white/90">
              Join our parivaar where we make your journey memorable and
              healthier!
            </Text>
            <Svg
              height={1}
              width="100%"
              viewBox="0 0 100 1"
              preserveAspectRatio="none"
              style={{ marginVertical: 12 }}
              pointerEvents="none"
            >
              <Line
                x1="0"
                y1="0.5"
                x2="100"
                y2="0.5"
                stroke="rgba(255,255,255,0.6)"
                strokeWidth={1}
                strokeDasharray="3,3"
              />
            </Svg>
            <View className="">
              {[
                "Unlock guided practices",
                "Live sessions",
                "Nurturing Community",
              ].map((line, idx) => (
                <View key={idx} className="flex-row items-center mb-2">
                  <View className="w-4 h-4 rounded-full bg-white/30 items-center justify-center mr-2">
                    <Text className="text-white text-[10px]">✓</Text>
                  </View>
                  <Text className="text-sm text-white font-medium">{line}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* CTA Content */}
          <View className="mx-3">
            {!hasParivar ? (
              <GradientCTA
                title="Unlock for ₹199/month"
                onPress={showPurchaseAlert}
              />
            ) : null}
            <Text className="mt-3 mb-3 text-xs text-white/70 text-center">
              Cancel anytime. No hidden fees
            </Text>
          </View>
        </LinearGradient>
      </Section>

      {/* Benefits Grid (styled per Figma with icons) */}
      <Section title="Why Join Antar Parivaar?">
        <View className="flex-row flex-wrap justify-between gap-3">
          {[
            {
              title: "3x/weekly live sessions",
              desc: "Yoga, Breathwork, Mobility",
              icon: benefitsIcons.liveSessions,
            },
            {
              title: "WhatsApp Community",
              desc: "Private, supportive group",
              icon: benefitsIcons.whatsapp,
            },
            {
              title: "Monthly Webinar",
              desc: "+Live Q&A with experts",
              icon: benefitsIcons.webinar,
            },
            {
              title: "Wellness Toolkit",
              desc: "Fresh monthly resources",
              icon: benefitsIcons.toolkit,
            },
            {
              title: "Personalized Plans",
              desc: "Custom wellness journeys",
              icon: benefitsIcons.plans,
            },
            {
              title: "24/7 Chat Support",
              desc: "Continuous support",
              icon: benefitsIcons.chat,
            },
          ].map((b, idx) => (
            <View key={idx} className="w-[48%] mb-3">
              <View className="p-3 rounded-2xl h-36 border border-[#E87D36] justify-center items-center">
                <Image
                  source={b.icon}
                  style={{ width: 32, height: 32, marginBottom: 6 }}
                />
                <Text className="font-semibold text-antar-dark text-md text-center leading-tight">
                  {b.title}
                </Text>
                <Text className="text-xs text-muted-foreground text-center mt-1 leading-tight">
                  {b.desc}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </Section>

      {/* Weekly rhythm (list style per mock) */}
      <Section title="Your Weekly Rhythm" subtitle="Included in Antar Parivaar">
        <View className="-my-2">
          {[
            { label: "Mobility", time: "5:00 PM" },
            { label: "Yoga", time: "5:00 PM" },
            { label: "Breathwork", time: "5:00 PM" },
          ].map((item, idx) => {
            const months = [
              "JAN",
              "FEB",
              "MAR",
              "APR",
              "MAY",
              "JUN",
              "JUL",
              "AUG",
              "SEP",
              "OCT",
              "NOV",
              "DEC",
            ];
            const month = months[new Date().getMonth()];
            const fixedDows = ["MON", "WED", "FRI"];
            const day = fixedDows[idx] || "";
            return (
              <View key={idx}>
                <View className="flex-row items-center py-3">
                  {/* Date badge */}
                  <View className="mr-3">
                    <View className="w-16 rounded-lg overflow-hidden border border-black">
                      <View className="bg-black h-5 w-full items-center justify-center">
                        <Text className="text-white text-[10px] font-bold">
                          {month}
                        </Text>
                      </View>
                      <View className="bg-white/70 w-full items-center justify-center py-3">
                        <Text className="text-[10px] text-antar-orange font-semibold">
                          {day}
                        </Text>
                      </View>
                    </View>
                  </View>

                  {/* Content */}
                  <View className="flex-1">
                    <Text className="text-antar-orange font-semibold">
                      {item.label}
                    </Text>
                    <Text className="text-sm text-muted-foreground">
                      Time: {item.time}
                    </Text>
                  </View>

                  {/* Arrow */}
                  <View className="w-7 h-7 rounded-full bg-antar-orange items-center justify-center">
                    <Text className="text-white text-base">→</Text>
                  </View>
                </View>
                {/* Divider */}
                {idx < 2 && <View className="h-px bg-[#E87D36]/30" />}
              </View>
            );
          })}
        </View>
      </Section>

      {/* Everything Included */}
      <Section title="Everything Included">
        <View className="gap-3">
          {[
            "3x/ week live sessions (Yoga, breathwork, mobility)",
            "Monthly expert webinar + Live Q&A",
            "Monthly wellness toolkit",
            "24/7 chat support",
            "Private WhatsApp community access",
            "Personalized wellness plans tailored to your goals",
          ].map((f, idx) => (
            <View key={idx} className="flex-row items-center gap-3">
              <View className="w-3.5 h-3.5 rounded-full bg-[#6E863C] items-center justify-center">
                <Text className="text-white text-[10px]">✓</Text>
              </View>
              <Text className="text-base text-antar-dark flex-1">{f}</Text>
            </View>
          ))}
        </View>
      </Section>

      {/* CTA */}
      {!hasParivar ? (
        <Section>
          <LinearGradient
            colors={["#6E863C", "#236A61", "#112F15"]}
            locations={[0, 0.55, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ borderRadius: 14 }}
            className="w-full rounded-3xl relative overflow-hidden"
          >
            <View className="p-4 rounded-2xl">
              <Text className="text-gray-50 font-medium text-center">
                Unlock full access to join live sessions, webinars and the
                private community
              </Text>
            </View>
          </LinearGradient>
          <GradientCTA
            title="Unlock for ₹199/month"
            style={{ marginTop: 12 }}
            onPress={showPurchaseAlert}
          />
        </Section>
      ) : null}
    </Screen>
  );
}
