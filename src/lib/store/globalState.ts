// src/lib/store/globalState.ts
import { create } from 'zustand';

interface GlobalState {
  selectedPlatform: string | null;
  selectedAdAccount: string | null;
  setPlatform: (platform: string | null) => void;
  setAdAccount: (adAccount: string | null) => void;
}

export const useGlobalState = create<GlobalState>((set) => ({
  selectedPlatform: null,
  selectedAdAccount: null,
  setPlatform: (platform) => set({ selectedPlatform: platform, selectedAdAccount: null }), // Reset ad account on platform change
  setAdAccount: (adAccount) => set({ selectedAdAccount: adAccount }),
}));
