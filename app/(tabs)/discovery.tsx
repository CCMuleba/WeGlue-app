/*
    -- Icon (Lucide) Compass
    -- Clubs & Events Feed
    -- This is the "Explore" tab where students find new clubs and see a feed of what's happening on campus.
    -- This screen uses a "Segmented Control" at the top so users can toggle between "Clubs" and "Events".
*/

import {
    Filter,
    Search,
    Users
} from "lucide-react-native";
import React, { useState } from "react";
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MOCK_CLUBS = [
  {
    id: "1",
    name: "Chess Strategy",
    members: 120,
    category: "Academic",
    image: "https://via.placeholder.com/100",
  },
  {
    id: "2",
    name: "Varsity Football",
    members: 45,
    category: "Sports",
    image: "https://via.placeholder.com/100",
  },
  {
    id: "3",
    name: "Tech Innovators",
    members: 300,
    category: "Tech",
    image: "https://via.placeholder.com/100",
  },
];

export default function DiscoveryScreen() {
  const [viewMode, setViewMode] = useState<"clubs" | "events">("clubs");
  const [searchQuery, setSearchQuery] = useState("");

  const renderClubItem = ({ item }: { item: (typeof MOCK_CLUBS)[0] }) => (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <div style={styles.cardContent}>
        <Text style={styles.cardCategory}>{item.category}</Text>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <View style={styles.cardFooter}>
          <Users size={14} color="#64748b" />
          <Text style={styles.cardFooterText}>{item.members} Members</Text>
        </View>
      </div>
      <TouchableOpacity style={styles.joinButton}>
        <Text style={styles.joinButtonText}>Join</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Bar Area */}
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Search size={20} color="#94A3B8" />
          <TextInput
            placeholder="Search clubs or events..."
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#4F46E5" />
        </TouchableOpacity>
      </View>

      {/* Segmented Control (Toggle) */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          onPress={() => setViewMode("clubs")}
          style={[
            styles.toggleTab,
            viewMode === "clubs" && styles.activeToggleTab,
          ]}
        >
          <Text
            style={[
              styles.toggleText,
              viewMode === "clubs" && styles.activeToggleText,
            ]}
          >
            Clubs
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setViewMode("events")}
          style={[
            styles.toggleTab,
            viewMode === "events" && styles.activeToggleTab,
          ]}
        >
          <Text
            style={[
              styles.toggleText,
              viewMode === "events" && styles.activeToggleText,
            ]}
          >
            Events
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content List */}
      <FlatList
        data={MOCK_CLUBS}
        renderItem={renderClubItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <Text style={styles.sectionTitle}>Recommended for you</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  header: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#F1F5F9",
    borderRadius: 12,
    paddingHorizontal: 12,
    alignItems: "center",
    height: 45,
  },
  searchInput: { flex: 1, marginLeft: 8, fontSize: 16 },
  filterButton: { marginLeft: 12, padding: 8 },
  toggleContainer: {
    flexDirection: "row",
    margin: 16,
    backgroundColor: "#E2E8F0",
    borderRadius: 8,
    padding: 2,
  },
  toggleTab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 6,
  },
  activeToggleTab: {
    backgroundColor: "#FFFFFF",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  toggleText: { fontWeight: "600", color: "#64748B" },
  activeToggleText: { color: "#4F46E5" },
  listContent: { padding: 16 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#1E293B",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  cardImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: "#CBD5E1",
  },
  cardContent: { flex: 1, marginLeft: 12 },
  cardCategory: {
    fontSize: 12,
    color: "#4F46E5",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0F172A",
    marginVertical: 2,
  },
  cardFooter: { flexDirection: "row", alignItems: "center" },
  cardFooterText: { fontSize: 13, color: "#64748B", marginLeft: 4 },
  joinButton: {
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  joinButtonText: { color: "#4F46E5", fontWeight: "700" },
});