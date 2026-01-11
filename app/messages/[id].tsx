/*
  --"inverted" prop: By setting 'inverted' on FlashList and reversing the data, the list naturally starts at the bottom. When the user scrolls "up", they actually scrolling through history
  --Keyboard Management: "KeyboardAvoidingView" with "behavior=padding" is the gold stadard for iOS to prevent the keyboard from hiding the text input
  --Zustand Sync: Since this screen reads from "useChatStore", it will update instantly whenever a "receive_message" event is fired in the _layout.tsx



*/

import { FlashList } from "@shopify/flash-list";
import { Stack, useLocalSearchParams } from "expo-router";
import { Send } from "lucide-react-native";
import React, { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useChatStore } from "../../store/useChatStore";
import { socket } from "../../utils/socket";



export default function ChatRoomScreen() {
  const { id, name } = useLocalSearchParams<{ id: string; name: string }>();
  const [inputText, setInputText] = useState("");

  // Connect to our global Zustand store
  const messages = useChatStore((state) => state.messages[id] || []);
  const addMessage = useChatStore((state) => state.addMessage);

  const sendMessage = () => {
    if (inputText.trim().length === 0) return;

    const newMessage = {
      id: Math.random().toString(),
      senderId: "currentUser", // Replace with actual Auth ID
      chatId: id,
      text: inputText,
      timestamp: new Date(),
    };

    // 1. Emit to Socket.IO backend
    socket.emit("send_message", newMessage);

    // 2. Update local UI immediately
    addMessage(id, newMessage);
    setInputText("");
  };

  return (
    <SafeAreaView edges={["bottom"]} style={styles.container}>
      <Stack.Screen
        options={{ title: name || "Chat", headerTitleAlign: "center" }}
      />

      {/* Message List */}
      <View style={{ flex: 1 }}>
        <FlashList
          data={[...messages].reverse()} // Reverse for chat behavior
          inverted
          estimatedItemSize={70}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const isMe = item.senderId === "currentUser";
            return (
              <View
                style={[
                  styles.bubble,
                  isMe ? styles.myBubble : styles.theirBubble,
                ]}
              >
                <Text
                  style={[styles.text, isMe ? styles.myText : styles.theirText]}
                >
                  {item.text}
                </Text>
              </View>
            );
          }}
          maintainVisibleContentPosition={{
            autoscrollToBottomThreshold: 0.1,
            minIndexForVisible: 0,
          }}
        />
      </View>

      {/* Input Area */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            value={inputText}
            onChangeText={setInputText}
            multiline
          />
          <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
            <Send size={20} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  bubble: {
    padding: 12,
    borderRadius: 20,
    marginVertical: 4,
    marginHorizontal: 12,
    maxWidth: "80%",
  },
  myBubble: {
    backgroundColor: "#4F46E5",
    alignSelf: "flex-end",
    borderBottomRightRadius: 4,
  },
  theirBubble: {
    backgroundColor: "#E2E8F0",
    alignSelf: "flex-start",
    borderBottomLeftRadius: 4,
  },
  myText: { color: "white" },
  theirText: { color: "#1E293B" },
  text: { fontSize: 15 },
  inputContainer: {
    flexDirection: "row",
    padding: 12,
    backgroundColor: "white",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
  },
  input: {
    flex: 1,
    backgroundColor: "#F1F5F9",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    maxHeight: 100,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: "#4F46E5",
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});