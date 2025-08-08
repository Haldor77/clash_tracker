import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Theme = 'light' | 'dark';

interface SettingsState {
  playerTags: string[];
  clanTag?: string;
  theme: Theme;
  setPlayerTags: (tags: string[]) => void;
  setClanTag: (tag?: string) => void;
  setTheme: (theme: Theme) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      playerTags: [],
      clanTag: undefined,
      theme: 'light',
      setPlayerTags: (playerTags) => set({ playerTags }),
      setClanTag: (clanTag) => set({ clanTag }),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'settings',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
