import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GlobalState {
  sidebarOpen: boolean;
  selectedPlatform: string | null;
  selectedAdAccount: string | null;
  isHydrated: boolean; // New flag to track hydration
  toggleSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;
  setPlatform: (platform: string | null) => void;
  setAdAccount: (adAccount: string | null) => void;
  setHydrated: (hydrated: boolean) => void; // Setter for hydration
}

export const useGlobalState = create<GlobalState>()(
  persist(
    (set) => ({
      sidebarOpen: false,
      selectedPlatform: null,
      selectedAdAccount: null,
      isHydrated: false, // Initialize as not hydrated
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (isOpen) => set({ sidebarOpen: isOpen }),
      setPlatform: (platform) => set({ selectedPlatform: platform }),
      setAdAccount: (adAccount) => set({ selectedAdAccount: adAccount }),
      setHydrated: (hydrated) => set({ isHydrated: hydrated }), // Update hydration status
    }),
    {
      name: 'global-state',
      partialize: (state) => ({
        selectedPlatform: state.selectedPlatform,
        selectedAdAccount: state.selectedAdAccount,
        sidebarOpen: state.sidebarOpen,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true); // Mark hydration as complete
      },
    }
  )
);