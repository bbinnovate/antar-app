import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ArrowLeft, Send } from "lucide-react-native";
import chatbotData from "~/lib/chatbot-data.json";
import { useNavigation } from "expo-router";

const agentAvatar = require("~/assets/images/profileLogo.png"); // Add your agent avatar image
const userAvatar = require("~/assets/images/user.png"); // Add your user avatar image

// const SEARCH_KEYWORDS = [
//   "antar",
//   "wellness",
//   "mental health",
//   "community",
//   "sessions",
//   "plans",
//   "profile",
//   "insights",
// //   "offerings",
// //   "chatbot",
// ];

function getTime() {
  const d = new Date();
  return `${d.getHours()}:${d.getMinutes().toString().padStart(2, "0")}`;
}

function getAntarReply(input: string) {
  const lower = input.toLowerCase();
  // Find a matching title in the chatbotData
  const match = chatbotData.find(
    (item) => item.title && lower.includes(item.title.toLowerCase())
  );
  if (match && match.description) {
    return match.description;
  }
  // Fallback if no match
  return "Sorry, I couldn't understand your query. Please try rephrasing or ask about <b>Antar, Physiotherapy, Nutrition, L.I.V or Ailment Management.</b> <br /><br />You can find more about this topic at https://knowtheantar.com/ or explore our app sections for detailed information.";
}

function renderMessageText(text: string, color: string) {
  // Regex to find URLs
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  // Replace <br> with \n for line breaks
  let formatted = text.replace(/<br\s*\/?>/gi, "\n");

  // Split by URLs first
  const parts = formatted.split(urlRegex);

  return parts.map((part, idx) => {
    if (urlRegex.test(part)) {
      return (
        <Text
          key={`url-${idx}`}
          style={{ color: "#2563eb", textDecorationLine: "underline" }}
          onPress={() => Linking.openURL(part)}
        >
          {part}
        </Text>
      );
    }

    // Handle <b>, <i>, <u> tags
    const boldRegex = /<b>(.*?)<\/b>/gi;
    const italicRegex = /<i>(.*?)<\/i>/gi;
    const underlineRegex = /<u>(.*?)<\/u>/gi;

    // Split by line breaks
    const lines = part.split("\n");
    return lines.map((line, lineIdx) => {
      let elements: any[] = [];
      let lastIdx = 0;

      // Helper to push plain text
      const pushPlain = (str: string, key: string) => {
        if (str)
          elements.push(
            <Text key={key} style={{ color }}>
              {str}
            </Text>
          );
      };

      // Parse <b>
      line.replace(boldRegex, (match, p1, offset) => {
        pushPlain(
          line.substring(lastIdx, offset),
          `plain-b-${idx}-${lineIdx}-${lastIdx}`
        );
        elements.push(
          <Text
            key={`b-${idx}-${lineIdx}-${offset}`}
            style={{ fontWeight: "bold", color }}
          >
            {p1}
          </Text>
        );
        lastIdx = offset + match.length;
        return match;
      });

      // Parse <i>
      line.replace(italicRegex, (match, p1, offset) => {
        pushPlain(
          line.substring(lastIdx, offset),
          `plain-i-${idx}-${lineIdx}-${lastIdx}`
        );
        elements.push(
          <Text
            key={`i-${idx}-${lineIdx}-${offset}`}
            style={{ fontStyle: "italic", color }}
          >
            {p1}
          </Text>
        );
        lastIdx = offset + match.length;
        return match;
      });

      // Parse <u>
      line.replace(underlineRegex, (match, p1, offset) => {
        pushPlain(
          line.substring(lastIdx, offset),
          `plain-u-${idx}-${lineIdx}-${lastIdx}`
        );
        elements.push(
          <Text
            key={`u-${idx}-${lineIdx}-${offset}`}
            style={{ textDecorationLine: "underline", color }}
          >
            {p1}
          </Text>
        );
        lastIdx = offset + match.length;
        return match;
      });

      // If no tags, just plain text
      if (elements.length === 0) {
        return (
          <Text key={`plain-${idx}-${lineIdx}`} style={{ color }}>
            {line}
          </Text>
        );
      } else {
        // Push any remaining plain text
        pushPlain(
          line.substring(lastIdx),
          `plain-end-${idx}-${lineIdx}-${lastIdx}`
        );
        return <Text key={`line-${idx}-${lineIdx}`}>{elements}</Text>;
      }
    });
  });
}

export default function ChatbotScreen() {
  const [messages, setMessages] = useState([
    {
      from: "agent",
      text: "Hello! How can I help you today?",
      time: getTime(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef<KeyboardAwareScrollView | null>(null);
  const navigation = useNavigation();

  const handleSend = () => {
    if (!input.trim() || loading) return;
    setMessages((prev) => [
      ...prev,
      { from: "user", text: input, time: getTime() },
      {
        from: "agent",
        text: "Agent is typing...",
        time: getTime(),
        loading: true,
      },
    ]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      setMessages((prev) => {
        // Replace last agent loading message with actual reply
        const updated = [...prev];
        const idx = updated.findIndex((m: any) => m?.loading);
        if (idx !== -1) {
          updated[idx] = {
            from: "agent",
            text: getAntarReply(input),
            time: getTime(),
          };
        }
        return updated;
      });
      setLoading(false);
    }, 1000); // 1 second
  };

  useEffect(() => {
    // Auto-scroll to bottom when messages change
    if (scrollViewRef?.current) {
      scrollViewRef?.current?.scrollToEnd(true);
    }
  }, [messages]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#F8FAFC" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0} // Set to your tab bar height
    >
      <View style={{ flex: 1 }}>
        <SafeAreaView
          edges={["top"]}
          style={{
            backgroundColor: "transparent",
            borderBottomLeftRadius: 24,
            borderBottomRightRadius: 24,
          }}
        >
          <View
            style={{
              backgroundColor: "black", // <-- Set header background here
              padding: 16,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              //   borderBottomLeftRadius: 24,
              //   borderBottomRightRadius: 24,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ marginRight: 12 }}
              >
                <ArrowLeft size={26} color="#fff" />
              </TouchableOpacity>
              <Image
                source={agentAvatar}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 14,
                  marginRight: 8,
                  backgroundColor: "#fff",
                }}
              />
              <Text style={{ fontSize: 22, fontWeight: "bold", color: "#fff" }}>
                Your AI
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: "#22C55E",
                  marginRight: 6,
                }}
              />
              <Text style={{ color: "#fff", fontSize: 12 }}>Online</Text>
            </View>
          </View>
        </SafeAreaView>

        <KeyboardAwareScrollView
          ref={scrollViewRef}
          contentContainerStyle={{
            flexGrow: 1,
            padding: 16,
            justifyContent: "flex-end",
          }}
          keyboardShouldPersistTaps="handled"
          enableOnAndroid
          extraScrollHeight={20} // push input above keyboard nicely
          showsVerticalScrollIndicator={false}
        >
          {messages.map((msg: any, idx: number) => (
            <View
              key={idx}
              style={{
                flexDirection: msg?.from === "user" ? "row-reverse" : "row",
                alignItems: "flex-end",
                marginBottom: 18,
              }}
            >
              <Image
                source={msg.from === "user" ? userAvatar : agentAvatar}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  marginHorizontal: 6,
                  borderWidth: 2,
                  borderColor: "#fff",
                  backgroundColor: "#eee",
                }}
              />
              <View
                style={{
                  backgroundColor:
                    msg.from === "user"
                      ? "#236A61"
                      : msg?.loading
                      ? "#FFE6C7"
                      : "#FFB366",
                  borderRadius: 16,
                  padding: 12,
                  maxWidth: "75%",
                  minWidth: 80,
                }}
              >
                <View style={{ flexDirection: "column" }}>
                  {renderMessageText(
                    msg.text,
                    msg.from === "user"
                      ? "#fff"
                      : msg?.loading
                      ? "#888"
                      : "#222"
                  )}
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 11,
                      color:
                        msg.from === "user"
                          ? "#fff"
                          : msg.loading
                          ? "#888"
                          : "#222",
                      opacity: 0.7,
                    }}
                  >
                    {msg.time}
                  </Text>
                  {msg.from === "user" && (
                    <Text
                      style={{ marginLeft: 4, fontSize: 13, color: "#fff" }}
                    >
                      ✓✓
                    </Text>
                  )}
                </View>
              </View>
            </View>
          ))}
        </KeyboardAwareScrollView>

        <View
          style={{
            backgroundColor: "#fff",
            padding: 12,
            borderTopWidth: 1,
            borderTopColor: "#E5E7EB",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#F8FAFC",
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "#E5E7EB",
              paddingHorizontal: 12,
              paddingVertical: 4,
            }}
          >
            <TextInput
              value={input}
              onChangeText={setInput}
              placeholder="Type your message here..."
              placeholderTextColor="#6B7280"
              style={{
                flex: 1,
                backgroundColor: "transparent",
                paddingHorizontal: 8,
                paddingVertical: 8,
                fontSize: 15,
              }}
              editable={!loading}
              returnKeyType="send"
              onSubmitEditing={handleSend}
            />
            <TouchableOpacity
              onPress={handleSend}
              disabled={loading}
              style={{
                marginLeft: 10,
                backgroundColor: loading ? "#A7B7B7" : "#236A61",
                borderRadius: 5,
                padding: 8,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Send size={22} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
