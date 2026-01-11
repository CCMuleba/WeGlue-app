/*
    -- Icon (Lucide) MessageSquare
    -- 1:1 & Group Chats
    -- In this app users expect to switch between their 1:1 and Club Group chats. We will implement a "Segmented Control" (toggle) at the top of the message tab
    -- This screen uses "FlashList" to ensure that even with 100+ active conversations, the scrolling remains "60FPS"
    -----------------------------------------------------------------------------------------------------------------

    ----------Key Messaging Features for the MVP-----------------
    i. Real-time Indicators: Use the unread bubble (seen in the code) to drive engagement.
    ii. Club vs. Direct: By separating these, we prevent the main inbox from becoming cluttered with noisy group chat notifications.
    iii. Socket.IO Readiness: The 'onPress' for each chat will eventually navigate to a '[chatId].tsx' screen where we will establish the Socket.IO connection.
    
    ---------------To add in future iterations:---------------
    1. List of Conversations: Display a list of recent conversations with user avatars, names, last message preview, and timestamps.
    2. Segmented Control: Toggle between "1:1 Chats" and "Group Chats" at the top of the screen.
    3. Search Functionality: A search bar to quickly find specific conversations by user or group name.
    4. Unread Message Indicators: Show badges or highlights for conversations with unread messages.
    5. Navigation to Chat Screen: Tapping on a conversation should navigate to the detailed chat screen (not implemented here).


    ------------Technical Strategy: Socket.IO Singleton--------------------
    For a production-ready app, we should "never" open a socket connection inside a compenent. Instead:
      1. Create a utils/socket.ts file.
      2. Export a single instance of the socket.
      3. Use a "Zustand" to manage incoming messages globally.
*/

import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import { PlusCircle } from "lucide-react-native";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

//Define te interface for TypeScript
interface ChatItem {
    id: string;
    name: string;
    lastMsg: string;
    time: string;
    unread: number;
    type: string;
    avatar: string;
}



const MOCK_CHATS = [
  {
    id: "1",
    name: "Coding Club",
    lastMsg: "Who is coming to the hackathon?",
    time: "2m",
    unread: 3,
    type: "club",
    avatar: "https://via.placeholder.com/50",
  },
  {
    id: "2",
    name: "Sarah Jenkins",
    lastMsg: "Did you see the notes for CS101?",
    time: "1h",
    unread: 0,
    type: "direct",
    avatar: "https://via.placeholder.com/50",
  },
  {
    id: "3",
    name: "Basketball Team",
    lastMsg: "Practice is moved to 5pm.",
    time: "3h",
    unread: 12,
    type: "club",
    avatar: "https://via.placeholder.com/50",
  },
];

//Define an interface for the chat items 
interface ChatItem {
    id: string;
    name: string;
    lastMsg: string;
    time: string;
    unread: number;
    type: string;
    avatar: string;
}

export default function MessagesScreen() {
    //Initialize router
    const router = useRouter();
    
  const [activeTab, setActiveTab] = useState<"direct" | "club">("direct");

  const filteredChats = MOCK_CHATS.filter((chat) => chat.type === activeTab);

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-4 py-3 flex-row justify-between items-center">
        <Text className="text-2xl font-bold text-slate-900">Messages</Text>
        <TouchableOpacity>
          <PlusCircle size={28} color="#4F46E5" />
        </TouchableOpacity>
      </View>

      {/* Custom Segmented Control */}
      <View className="mx-4 my-2 p-1 bg-slate-100 rounded-xl flex-row">
        <TouchableOpacity
          onPress={() => setActiveTab("direct")}
          className={`flex-1 py-2 rounded-lg items-center ${activeTab === "direct" ? "bg-white shadow-sm" : ""}`}
        >
          <Text
            className={`font-semibold ${activeTab === "direct" ? "text-indigo-600" : "text-slate-500"}`}
          >
            Direct
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab("club")}
          className={`flex-1 py-2 rounded-lg items-center ${activeTab === "club" ? "bg-white shadow-sm" : ""}`}
        >
          <Text
            className={`font-semibold ${activeTab === "club" ? "text-indigo-600" : "text-slate-500"}`}
          >
            Clubs
          </Text>
        </TouchableOpacity>
      </View>

      {/* Chat List */}
      <FlashList<ChatItem> //Explicitly pass the type here
        data={filteredChats}
        renderItem={({ item }) => (
          <TouchableOpacity
            className={
              "flex-row items-center px-4 py-4 border-b border-slate-50"
            }
            onPress={() =>
              router.push({
                pathname: "/messages/[id]",
                params: { id: item.id, name: item.name },
              })
            }
          >
            <Image
              source={{ uri: item.avatar }}
              className="w-14 h-14 rounded-full bg-slate-200"
            />

            <View className="flex-1 ml-4">
              <View className="flex-row justify-between items-center">
                <Text className="text-base font-bold text-slate-900">
                  {item.name}
                </Text>
                <Text className="text-xs text-slate-400">{item.time}</Text>
              </View>
              <Text className="text-slate-500 mt-1" numberOfLines={1}>
                {item.lastMsg}
              </Text>
            </View>

            {item.unread > 0 && (
              <View className="ml-2 bg-indigo-600 rounded-full w-6 h-6 items-center justify-center">
                <Text className="text-white text-[10px] font-bold">
                  {item.unread}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        )}
        estimatedItemSize={80} //This is 100% a valid prop in v1 and v2
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}