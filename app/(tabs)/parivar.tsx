import * as React from "react";
import {
  View,
  Alert,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import DecoratedHeader from "~/components/custom/DecoratedHeader";
import Screen from "~/components/custom/Screen";
import Section from "~/components/custom/Section";
import GradientCTA from "~/components/custom/GradientCTA";

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
  const [hasParivar, setHasParivar] = React.useState(true); // Set to true for testing API

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

        {/* Progress Overview */}
        {!isLoading && !error && (
          <Section title="🏆 Your Journey">
            <View className="p-5 rounded-2xl bg-antar-teal/10 border border-antar-teal/20">
              <View className="flex-row items-center justify-between mb-4">
                <View className="flex-1">
                  <Text className="text-antar-teal font-bold text-xl">
                    {sessionsData?.userJourney?.sessionsCompleted || 12}{" "}
                    Sessions Completed
                  </Text>
                  <Text className="text-sm text-muted-foreground mt-1">
                    🎯 {sessionsData?.userJourney?.attendanceRate || 85}%
                    attendance rate •{" "}
                    {sessionsData?.userJourney?.currentStreak || 4} week streak
                  </Text>
                </View>
                <View className="items-center">
                  <Text className="text-4xl">🏅</Text>
                </View>
              </View>

              {/* Progress Bar */}
              <View className="mb-4">
                <View className="flex-row justify-between mb-2">
                  <Text className="text-sm text-muted-foreground">
                    Monthly Goal Progress
                  </Text>
                  <Text className="text-sm text-antar-teal font-semibold">
                    {sessionsData?.userJourney?.monthlyGoal?.completed || 12}/
                    {sessionsData?.userJourney?.monthlyGoal?.target || 15}{" "}
                    sessions
                  </Text>
                </View>
                <View className="h-3 bg-gray-300 rounded-full">
                  <View className="h-3 bg-antar-teal rounded-full w-4/5" />
                </View>
              </View>

              {/* Achievements Row */}
              <View className="flex-row items-center justify-between pt-4 border-t border-antar-teal/20">
                {(
                  sessionsData?.userJourney?.achievements ||
                  mockApiData.userJourney.achievements
                ).map((achievement: any, index: number) => (
                  <View key={index} className="flex-row items-center">
                    <Text className="text-lg mr-2">{achievement.icon}</Text>
                    <Text className="font-semibold text-antar-teal text-sm">
                      {achievement.title}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </Section>
        )}

        {/* Today's Focus */}
        {!isLoading && !error && (
          <Section>
            <View className="p-5 rounded-3xl bg-antar-orange/10 border border-antar-orange/20">
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="font-bold text-antar-dark text-lg mb-1">
                    🧘 Today's Session
                  </Text>
                  <Text className="text-antar-orange font-semibold">
                    {sessionsData?.meetings?.find((session: any) => {
                      if (!session.dateTime) return false;
                      const sessionDate = new Date(session.dateTime);
                      const today = new Date();
                      return (
                        sessionDate.toDateString() === today.toDateString()
                      );
                    })?.title || "No session today"}
                  </Text>
                  <Text className="text-sm text-muted-foreground">
                    with Dr. Richa • Starting soon
                  </Text>
                </View>
                <Button className="bg-antar-orange px-6 py-3 rounded-2xl">
                  <Text className="text-white font-bold">Join Now</Text>
                </Button>
              </View>
            </View>
          </Section>
        )}

        {/* Weekly Schedule */}
        {!isLoading && !error && (
          <Section title="📅 This Week's Sessions">
            <View className="gap-4">
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
                .map((session: any) => {
                  const styling = getSessionStyling(
                    session.sessionType,
                    session.status
                  );
                  const sessionDate = new Date(session.dateTime);
                  const days = [
                    "Sunday",
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                  ];
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

                  return (
                    <View
                      key={session.id}
                      className={`flex-row items-center p-4 rounded-2xl ${styling.bgColor} border ${styling.borderColor}`}
                    >
                      <View className="w-12 h-14 rounded-lg overflow-hidden mr-4">
                        <View className="bg-antar-dark h-5 items-center justify-center">
                          <Text className="text-white text-xs font-bold">
                            {months[sessionDate.getMonth()]}
                          </Text>
                        </View>
                        <View className="bg-white flex-1 items-center justify-center">
                          <Text className="text-antar-dark text-lg font-bold">
                            {sessionDate.getDate()}
                          </Text>
                        </View>
                      </View>
                      <View className="flex-1">
                        <Text className={`font-semibold ${styling.textColor}`}>
                          {days[sessionDate.getDay()]} - {session.title}
                        </Text>
                        <Text className={`text-sm ${styling.subtitleColor}`}>
                          {sessionDate.toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                          })}{" "}
                          • {session.status}
                        </Text>
                      </View>
                      {session.status !== "completed" && (
                        <View
                          className={`px-3 py-1 rounded-full ${styling.buttonColor}`}
                        >
                          <Text
                            className={`text-xs font-medium ${styling.textColor}`}
                          >
                            Remind Me
                          </Text>
                        </View>
                      )}
                    </View>
                  );
                }) ||
                mockApiData.weeklySessions.map((session: any) => {
                  const styling = getSessionStyling(
                    session.sessionType,
                    session.status
                  );
                  return (
                    <View
                      key={session.id}
                      className={`flex-row items-center p-4 rounded-2xl ${styling.bgColor} border ${styling.borderColor}`}
                    >
                      <View className="w-12 h-14 rounded-lg overflow-hidden mr-4">
                        <View className="bg-antar-dark h-5 items-center justify-center">
                          <Text className="text-white text-xs font-bold">
                            {session.date.month}
                          </Text>
                        </View>
                        <View className="bg-white flex-1 items-center justify-center">
                          <Text className="text-antar-dark text-lg font-bold">
                            {session.date.day}
                          </Text>
                        </View>
                      </View>
                      <View className="flex-1">
                        <Text className={`font-semibold ${styling.textColor}`}>
                          {session.day} - {session.sessionName}
                        </Text>
                        <Text className={`text-sm ${styling.subtitleColor}`}>
                          {session.time} •{" "}
                          {session.status === "upcoming" && session.daysLeft
                            ? `${session.daysLeft} day${
                                session.daysLeft > 1 ? "s" : ""
                              } left`
                            : session.status}
                        </Text>
                      </View>
                      {session.status !== "completed" && (
                        <View
                          className={`px-3 py-1 rounded-full ${styling.buttonColor}`}
                        >
                          <Text
                            className={`text-xs font-medium ${styling.textColor}`}
                          >
                            Remind Me
                          </Text>
                        </View>
                      )}
                    </View>
                  );
                })}
            </View>
          </Section>
        )}

        {/* Upcoming Highlight */}
        {!isLoading && !error && (
          <Section title="🎙️ Special Event">
            {sessionsData?.meetings?.find(
              (session: any) => session.isSpecialEvent === true
            ) ? (
              <View className="p-4 rounded-2xl bg-antar-pink/10 border border-antar-pink/20">
                <Text className="font-bold text-antar-dark mb-2">
                  Special Wellness Event
                </Text>
                <Text className="text-antar-pink font-semibold mb-1">
                  {sessionsData.meetings.find(
                    (s: any) => s.isSpecialEvent === true
                  )?.title || "Join our exclusive wellness session"}
                </Text>
                <Text className="text-sm text-muted-foreground mb-3">
                  {(() => {
                    const specialSession = sessionsData.meetings.find(
                      (s: any) => s.isSpecialEvent === true
                    );
                    if (specialSession?.dateTime) {
                      const date = new Date(specialSession.dateTime);
                      return date.toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      });
                    }
                    return "Date TBD";
                  })()}
                </Text>
                <Button className="bg-antar-pink border-antar-pink">
                  <Text className="text-white font-semibold">Join Now</Text>
                </Button>
              </View>
            ) : (
              <View className="p-4 rounded-2xl bg-antar-pink/10 border border-antar-pink/20">
                <Text className="font-bold text-antar-dark mb-2">
                  Monthly Expert Webinar
                </Text>
                <Text className="text-antar-pink font-semibold mb-1">
                  Seasonal Wellness: Winter Care
                </Text>
                <Text className="text-sm text-muted-foreground mb-3">
                  Sunday, Jan 14 at 5:00 PM IST
                </Text>
                <Button className="bg-antar-pink border-antar-pink">
                  <Text className="text-white font-semibold">Register Now</Text>
                </Button>
              </View>
            )}
          </Section>
        )}

        {/* Community & Toolkit Actions */}
        <Section title="Your Parivar Access">
          <View className="flex-row gap-3">
            <View className="flex-1 p-4 rounded-2xl bg-antar-teal/5 border border-antar-teal/20">
              <Text className="text-center text-3xl mb-2">💬</Text>
              <Text className="text-center font-semibold text-antar-dark mb-1">
                Community
              </Text>
              <Text className="text-center text-xs text-muted-foreground">
                127 members online
              </Text>
            </View>
            <View className="flex-1 p-4 rounded-2xl bg-antar-orange/5 border border-antar-orange/20">
              <Text className="text-center text-3xl mb-2">🧰</Text>
              <Text className="text-center font-semibold text-antar-dark mb-1">
                Toolkit
              </Text>
              <Text className="text-center text-xs text-muted-foreground">
                New January pack
              </Text>
            </View>
          </View>
        </Section>

        {/* Upcoming Sessions */}
        {!isLoading && !error && (
          <Section title="🔮 Coming Up">
            <View className="gap-3">
              {sessionsData?.meetings
                ?.filter((session: any) => {
                  if (!session.dateTime) return false;
                  const sessionDate = new Date(session.dateTime);
                  const now = new Date();
                  const weekFromNow = new Date(
                    now.getTime() + 7 * 24 * 60 * 60 * 1000
                  );
                  return sessionDate > weekFromNow;
                })
                .map((session: any) => {
                  const styling = getSessionStyling(
                    session.sessionType,
                    undefined,
                    getActionType(session.sessionType)
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

                  return (
                    <View
                      key={session.id}
                      className={`p-4 rounded-2xl ${styling.bgColor} border ${styling.borderColor}`}
                    >
                      <View className="flex-row items-center justify-between">
                        <View className="flex-row items-center flex-1">
                          <View className="w-12 h-14 rounded-lg overflow-hidden mr-3">
                            <View className="bg-antar-dark h-5 items-center justify-center">
                              <Text className="text-white text-xs font-bold">
                                {months[sessionDate.getMonth()]}
                              </Text>
                            </View>
                            <View className="bg-white flex-1 items-center justify-center">
                              <Text className="text-antar-dark text-lg font-bold">
                                {sessionDate.getDate()}
                              </Text>
                            </View>
                          </View>
                          <View className="flex-1">
                            <Text className="font-bold text-antar-dark">
                              {session.title}
                            </Text>
                            <Text
                              className={`font-medium text-sm ${styling.textColor}`}
                            >
                              {sessionDate.getDate()}{" "}
                              {months[sessionDate.getMonth()]},{" "}
                              {sessionDate.toLocaleTimeString("en-US", {
                                hour: "numeric",
                                minute: "2-digit",
                                hour12: true,
                              })}
                            </Text>
                            <Text className="text-xs text-muted-foreground">
                              {session.subTitle || `"${session.sessionType}"`}
                            </Text>
                          </View>
                        </View>
                        <View
                          className={`px-3 py-1 rounded-full ${styling.buttonColor}`}
                        >
                          <Text
                            className={`text-xs font-medium ${styling.textColor}`}
                          >
                            {styling.buttonText}
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                }) ||
                mockApiData.comingUpSessions.map((session: any) => {
                  const styling = getSessionStyling(
                    session.sessionType,
                    undefined,
                    session.actionType
                  );
                  return (
                    <View
                      key={session.id}
                      className={`p-4 rounded-2xl ${styling.bgColor} border ${styling.borderColor}`}
                    >
                      <View className="flex-row items-center justify-between">
                        <View className="flex-row items-center flex-1">
                          <View className="w-12 h-14 rounded-lg overflow-hidden mr-3">
                            <View className="bg-antar-dark h-5 items-center justify-center">
                              <Text className="text-white text-xs font-bold">
                                {session.date.month}
                              </Text>
                            </View>
                            <View className="bg-white flex-1 items-center justify-center">
                              <Text className="text-antar-dark text-lg font-bold">
                                {session.date.day}
                              </Text>
                            </View>
                          </View>
                          <View className="flex-1">
                            <Text className="font-bold text-antar-dark">
                              {session.title}
                            </Text>
                            <Text
                              className={`font-medium text-sm ${styling.textColor}`}
                            >
                              {session.dateText}
                            </Text>
                            <Text className="text-xs text-muted-foreground">
                              {session.instructor
                                ? session.instructor.includes("with")
                                  ? session.instructor
                                  : `with ${session.instructor}`
                                : session.topic
                                ? `"${session.topic}"`
                                : session.description}
                            </Text>
                          </View>
                        </View>
                        <View
                          className={`px-3 py-1 rounded-full ${styling.buttonColor}`}
                        >
                          <Text
                            className={`text-xs font-medium ${styling.textColor}`}
                          >
                            {styling.buttonText}
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                })}
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
      <DecoratedHeader
        title="Antar Parivar"
        subtitle="Unlock guided practices, live sessions, and a nurturing community"
      />

      {/* Price + Quick CTA */}
      <Section>
        <View className="w-full p-5 rounded-3xl bg-white/60 border border-white/40">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-sm text-muted-foreground">Membership</Text>
              <Text className="text-2xl font-bold text-antar-dark">
                ₹199/month
              </Text>
            </View>
            <View className="px-3 py-1 rounded-full bg-antar-teal/10 border border-antar-teal/30">
              <Text className="text-antar-teal font-semibold">Best Value</Text>
            </View>
          </View>
          <Text className="mt-2 text-sm text-muted-foreground">
            Cancel anytime. No hidden fees.
          </Text>
          {!hasParivar ? (
            <Button
              className="mt-3 bg-antar-orange rounded-xl"
              onPress={showPurchaseAlert}
            >
              <Text className="text-white font-semibold">
                Unlock for ₹199/month
              </Text>
            </Button>
          ) : null}
        </View>
      </Section>

      {/* Benefits Grid */}
      <Section title="Why join Parivar?">
        <View className="flex-row flex-wrap justify-between gap-3">
          {[
            {
              icon: "🧘",
              title: "3x/week live",
              desc: "Yoga, Breathwork, Mobility",
            },
            {
              icon: "🎙️",
              title: "Monthly webinar",
              desc: "+ Live Q&A with experts",
            },
            {
              icon: "🧰",
              title: "Wellness toolkit",
              desc: "Fresh monthly resources",
            },
            {
              icon: "💬",
              title: "24/7 chat",
              desc: "Continuous guidance & support",
            },
            {
              icon: "📱",
              title: "WhatsApp community",
              desc: "Private, supportive group",
            },
            {
              icon: "🎯",
              title: "Personalized plans",
              desc: "Custom wellness journeys",
            },
          ].map((b, idx) => (
            <View key={idx} className="w-[48%] mb-3">
              <View className="p-4 rounded-2xl bg-white/60 border border-white/40 h-24 justify-center">
                <Text className="text-2xl mb-1">{b.icon}</Text>
                <Text className="font-semibold text-antar-dark text-sm leading-tight">
                  {b.title}
                </Text>
                <Text className="text-xs text-muted-foreground mt-1 leading-tight">
                  {b.desc}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </Section>

      {/* Weekly experience preview */}
      <Section title="Your weekly rhythm">
        <View className="rounded-2xl overflow-hidden border border-white/40">
          <View className="flex-row">
            {[
              { day: "Mon", label: "Mobility • 7am" },
              { day: "Wed", label: "Yoga • 7am" },
              { day: "Fri", label: "Breathwork • 7am" },
            ].map((s, i) => (
              <View key={i} className="flex-1 p-4 bg-white/60">
                <Text className="text-sm font-semibold text-antar-dark">
                  {s.day}
                </Text>
                <Text className="text-xs text-muted-foreground mt-1">
                  {s.label}
                </Text>
                {!hasParivar ? (
                  <Text className="mt-2 text-[11px] text-antar-teal">
                    Included in Antar Parivar
                  </Text>
                ) : null}
              </View>
            ))}
          </View>
        </View>
      </Section>

      {/* Everything included */}
      <Section title="Everything included">
        <View className="gap-3">
          {[
            "3x/week live sessions (Yoga, Breathwork, Mobility)",
            "Monthly expert webinar + Live Q&A",
            "Monthly wellness toolkit",
            "24/7 chat support",
            "Private WhatsApp community access",
            "Personalized wellness plans tailored to your goals",
          ].map((f, idx) => (
            <View key={idx} className="flex-row items-start gap-3">
              <Text className="text-xl">✅</Text>
              <Text className="text-base text-antar-dark flex-1">{f}</Text>
            </View>
          ))}
        </View>
      </Section>

      {/* Lock notice + CTA for non-subscribers */}
      {!hasParivar ? (
        <Section>
          <View className="p-4 rounded-2xl bg-antar-teal/5 border border-antar-teal/20">
            <Text className="text-antar-teal font-medium">
              Unlock full access to join live sessions, webinars, and the
              private community.
            </Text>
          </View>
          <Button
            className="mt-3 bg-antar-orange w-full rounded-xl"
            onPress={showPurchaseAlert}
          >
            <Text className="text-white font-semibold">
              Unlock for ₹199/month
            </Text>
          </Button>
        </Section>
      ) : null}
    </Screen>
  );
}
