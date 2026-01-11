/*
   Icon (Lucide) Calendar
   My Week Dashboard

   -- This implementaion inlude a horizontal date selector and mock event list.
   -- In a real scenario, the data would come from MongoDB 8.1 backend via TanStack Query.
*/

import { FlashList } from "@shopify/flash-list";
import { addDays, format, isSameDay } from "date-fns";
import { Clock, MapPin, Users } from "lucide-react-native";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../../global.css";

// Mock Data for UI Testing
const MOCK_EVENTS = [
  {
    id: "1",
    title: "Coding Club Workshop",
    time: "14:00",
    location: "Lab 4",
    going: 12,
    date: new Date(),
  },
  {
    id: "2",
    title: "Student Union Mixer",
    time: "18:30",
    location: "Main Hall",
    going: 45,
    date: new Date(),
  },
  {
    id: "3",
    title: "Basketball Trials",
    time: "16:00",
    location: "Gym A",
    going: 8,
    date: addDays(new Date(), 1),
  },
];

export default function MyWeekScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Generate 7 days starting from today
  const weekDays = Array.from({ length: 7 }).map((_, i) =>
    addDays(new Date(), i)
  );

  const filteredEvents = MOCK_EVENTS.filter((event) =>
    isSameDay(event.date, selectedDate)
  );

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      {/* Header Section */}
      <View className="px-4 py-4 bg-white border-b border-slate-200">
        <Text className="text-2xl font-bold text-slate-900">My Week</Text>

        {/* Horizontal Calendar Strip */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-4"
        >
          {weekDays.map((day) => {
            const isSelected = isSameDay(day, selectedDate);
            return (
              <TouchableOpacity
                key={day.toString()}
                onPress={() => setSelectedDate(day)}
                className={`items-center justify-center w-14 h-20 mr-3 rounded-2xl ${
                  isSelected ? "bg-indigo-600" : "bg-slate-100"
                }`}
              >
                <Text
                  className={`text-xs font-medium ${
                    isSelected ? "text-indigo-100" : "text-slate-500"
                  }`}
                >
                  {format(day, "EEE")}
                </Text>
                <Text
                  className={`text-lg font-bold ${
                    isSelected ? "text-white" : "text-slate-900"
                  }`}
                >
                  {format(day, "d")}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Agenda Section */}
      <View className="flex-1 px-4 mt-4">
        <Text className="mb-4 text-sm font-semibold text-slate-500 uppercase tracking-wider">
          Agenda for {format(selectedDate, "MMMM do")}
        </Text>

        <FlashList
          data={filteredEvents}
          estimatedItemSize={120}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={() => (
            <View className="items-center justify-center py-20">
              <Text className="text-slate-400 italic">
                No events joined for this day.
              </Text>
            </View>
          )}
          renderItem={({ item }) => (
            <View className="p-4 mb-4 bg-white border border-slate-200 rounded-2xl shadow-sm">
              <Text className="text-lg font-bold text-slate-900">
                {item.title}
              </Text>

              <View className="flex-row items-center mt-3">
                <View className="flex-row items-center mr-4">
                  <Clock size={16} color="#64748b" />
                  <Text className="ml-1 text-slate-500">{item.time}</Text>
                </View>
                <View className="flex-row items-center mr-4">
                  <MapPin size={16} color="#64748b" />
                  <Text className="ml-1 text-slate-500">{item.location}</Text>
                </View>
                <View className="flex-row items-center">
                  <Users size={16} color="#64748b" />
                  <Text className="ml-1 text-slate-500">
                    {item.going} going
                  </Text>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

