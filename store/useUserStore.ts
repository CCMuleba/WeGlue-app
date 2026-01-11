/*
    This store manages the authentication state, user profile, and the "isAdminMode" toggle.

*/

import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  universityId: string;
  role: "student" | "leader" | "admin";
  avatar?: string;
}

interface UserState {
  user: UserProfile | null;
  isAdminMode: boolean;
  isLoggedIn: boolean;
  // Actions
  setUser: (user: UserProfile) => void;
  toggleAdminMode: (val: boolean) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isAdminMode: false,
      isLoggedIn: false,

      setUser: (user) => set({ user, isLoggedIn: true }),

      toggleAdminMode: (val) => set({ isAdminMode: val }),

      logout: () => set({ user: null, isLoggedIn: false, isAdminMode: false }),
    }),
    {
      name: "weglue-user-storage", // Unique name for storage
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);