// src/lib/store/globalState.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GlobalState {
  sidebarOpen: boolean;
  selectedPlatform: string | null;
  selectedAdAccount: string | null;
  toggleSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;
  setPlatform: (platform: string | null) => void;
  setAdAccount: (adAccount: string | null) => void;
}

export const useGlobalState = create<GlobalState>()(
  persist(
    (set) => ({
  sidebarOpen: false,
  selectedPlatform: null,
  selectedAdAccount: null,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (isOpen) => set({ sidebarOpen: isOpen }),
  setPlatform: (platform) => set({ selectedPlatform: platform }),
  setAdAccount: (adAccount) => set({ selectedAdAccount: adAccount }),
    }),
    {
      name: 'global-state', // Key to use in localStorage
      partialize: (state) => ({
        selectedPlatform: state.selectedPlatform,
        selectedAdAccount: state.selectedAdAccount,
        sidebarOpen: state.sidebarOpen,
      }),
    }
  )
);
