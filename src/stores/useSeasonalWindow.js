import { create } from "zustand";

function isWithin24hOfQuarterStart() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const quarterStartMonth = Math.floor(month / 3) * 3;
  const quarterStart = new Date(year, quarterStartMonth, 1, 0, 0, 0);
  const diff = now - quarterStart;
  return diff >= 0 && diff <= 24 * 60 * 60 * 1000; // within 24 hours
}

export const useSeasonalWindow = create((set) => ({
  campaignActive: false,
  isConversionAllowed: isWithin24hOfQuarterStart(),

  activateCampaign: () => set({ campaignActive: true }),
  deactivateCampaign: () => set({ campaignActive: false }),

  getConversionStatus: () => {
    const { campaignActive } = useSeasonalWindow.getState();
    return campaignActive || isWithin24hOfQuarterStart();
  }
}));