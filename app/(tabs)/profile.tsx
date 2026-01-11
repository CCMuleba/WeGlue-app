/*
    Icon (Lucide) User 
    Personal Settings & Admin Toggle

    ----Production Ready----
    1. Hydration: When the student re-opens WeGlue, the store "rehydrates" from the phone's disk. They don't have to log in or toggle settings again.
    2. Centralized Auth: The '_layout.tsx can now check "isLoggedIn" from the store to decide whether to  show the Login screen or the Main Tabs.
    3. Type Safety: Using a TypeScript interface for "UserProfil" prevents bugs when we eventually add more complex data from MongoDB 8.1 (e.g "joinedClubs IDS")

    ----Strategic "Management" Design-----
    i. Role-Based Visibility: The 'adminButton' only renders if "isAdminMode" is true. This keeps the UI clean for regular students while giving leaders a clear path to their tools.
    ii. White-Label Ready: The Stats (Clubs/Events) and the University name are dynamic, allowing the to easily adapt for any campus.
*/

import { useRouter } from "expo-router";
import {
    ChevronRight,
    LayoutDashboard,
    LogOut,
    ShieldCheck
} from "lucide-react-native";
import React from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// Import the store
import { useUserStore } from "../../store/useUserStore";

export default function ProfileScreen() {
  const router = useRouter();

  // Connect to the global store
  const { user, isAdminMode, toggleAdminMode, logout } = useUserStore();

  if (!user) return <Text>Loading profile...</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Image
            source={{ uri: user.avatar || "https://via.placeholder.com/100" }}
            style={styles.avatar}
          />
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>

        {/* Admin/Leader Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Management</Text>
          <View style={styles.menuItem}>
            <View style={styles.menuIconText}>
              <ShieldCheck size={22} color="#4F46E5" />
              <Text style={styles.menuText}>Club Leader Mode</Text>
            </View>
            <Switch
              value={isAdminMode}
              onValueChange={toggleAdminMode} // Updates global state + storage
              trackColor={{ false: "#CBD5E1", true: "#C7D2FE" }}
              thumbColor={isAdminMode ? "#4F46E5" : "#F4F3F4"}
            />
          </View>

          {isAdminMode && (
            <TouchableOpacity
              style={styles.adminButton}
              onPress={() => router.push("/(admin)/dashboard")}
            >
              <LayoutDashboard size={20} color="white" />
              <Text style={styles.adminButtonText}>Go to Admin Dashboard</Text>
              <ChevronRight size={20} color="white" />
            </TouchableOpacity>
          )}
        </View>

        {/* ... Settings and Logout code ... */}
        <TouchableOpacity
          style={styles.logoutItem}
          onPress={() => {
            logout();
            router.replace("/(auth)/login");
          }}
        >
          <LogOut size={22} color="#EF4444" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

// Add logout styles to your StyleSheet...
const styles = StyleSheet.create({
  // ... previous styles ...
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  header: { alignItems: "center", padding: 24, backgroundColor: "white" },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#E2E8F0",
    marginBottom: 12,
  },
  userName: { fontSize: 22, fontWeight: "bold", color: "#1E293B" },
  userEmail: { fontSize: 14, color: "#64748B", marginTop: 4 },
  section: { marginTop: 24, paddingHorizontal: 16 },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#94A3B8",
    textTransform: "uppercase",
    marginBottom: 8,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
  },
  menuIconText: { flexDirection: "row", alignItems: "center" },
  menuText: { fontSize: 16, color: "#1E293B", marginLeft: 12 },
  adminButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4F46E5",
    padding: 16,
    marginTop: 12,
    borderRadius: 12,
  },
  adminButtonText: {
    flex: 1,
    color: "white",
    fontWeight: "bold",
    marginLeft: 12,
  },
  logoutItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginTop: 20,
  },
  logoutText: {
    color: "#EF4444",
    fontWeight: "bold",
    marginLeft: 12,
    fontSize: 16,
  },
});