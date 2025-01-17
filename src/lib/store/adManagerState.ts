import {create} from 'zustand';

interface AdManagerState {
  selectedCampaigns: string[];
  setSelectedCampaigns: (campaignIds: string[]) => void;
  selectedAdGroups: string[];
  setSelectedAdGroups: (adGroupIds: string[]) => void;
}

export const useAdManagerState = create<AdManagerState>((set) => ({
  selectedCampaigns: [],
  setSelectedCampaigns: (campaignIds) => set({ selectedCampaigns: campaignIds }),
  selectedAdGroups: [],
  setSelectedAdGroups: (adGroupIds) => set({ selectedAdGroups: adGroupIds }),
}));
