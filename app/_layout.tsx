
import { Tabs } from "expo-router";
import { Calendar, Compass, MessageSquare, User } from "lucide-react-native";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useChatStore } from "../store/useChatStore";
import { socket } from "../utils/socket";



  const styles = StyleSheet.create({
    unreadDot: {
      position: "absolute",
      top: -4,
      right: -4,
      width: 12,
      height: 12,
      backgroundColor: "#EF4444",
      borderRadius: 6,
      borderWidth: 2,
      borderColor: "#fff",
    },
  });

export default function TabLayout() {

      /*
          -----------This is "Production-Ready"----------
          - Memory Efficienty: Storing messages in a 'Record<string,Message[]' allows the app to find chat history instantly by ID without filtering through one giant array.
          - Socket Persistence: Because socket.ts is a singleton, the user can swithc from the "My Week" to "Discovery" without the websocket dropping the connection.
          - Scalability: By keeping logic in Zustand, the app can easily add "Typing Indicators" or "Read Receipts" later without restructuring the UI components.

      */
    
  
      const addMessage = useChatStore((state) => state.addMessage);

      useEffect(() => {
        // 1. Connect the socket
        socket.connect();

        // 2. Listen for incoming messages
        socket.on("receive_message", (data) => {
          addMessage(data.chatId, {
            id: data.id,
            senderId: data.senderId,
            chatId: data.chatId,
            text: data.text,
            timestamp: new Date(),
          });
        });

        return () => {
          socket.off("receive_message");
          socket.disconnect();
        };
      }, [addMessage]);



    return (
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#4F46E5", // WeGlue Primary Indigo
          tabBarInactiveTintColor: "#94A3B8",
          tabBarStyle: {
            height: 60,
            paddingBottom: 10,
          },
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 18,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "My Week",
            tabBarLabel: "Home",
            tabBarIcon: ({ color }) => <Calendar size={24} color={color} />,
          }}
        />

        <Tabs.Screen
          name="discovery"
          options={{
            title: "Explore Campus",
            tabBarLabel: "Discovery",
            tabBarIcon: ({ color }) => <Compass size={24} color={color} />,
          }}
        />

        <Tabs.Screen
          name="messages"
          options={{
            title: "Messages",
            tabBarLabel: "Chat",
            tabBarIcon: ({ color }) => (
              <View>
                <MessageSquare size={24} color={color} />
                {/* Optional: Unread indicator dot */}
                <View style={styles.unreadDot} />
              </View>
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "My Profile",
            tabBarLabel: "Profile",
            tabBarIcon: ({ color }) => <User size={24} color={color} />,
          }}
        />
      </Tabs>
    );
  }
