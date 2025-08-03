import { create } from "zustand";

export const useSellerReputation = create((set, get) => ({
  goldenTICK: 120, // example starting value
  diamondLevel: 1, // 1 = active, 0 = revoked
  strikeCount: 0,

  reportSeller: () => {
    const { goldenTICK, strikeCount } = get();
    const newStrikes = strikeCount + 1;
    const deduction = newStrikes === 1 ? 1 : newStrikes * 2; // escalated penalty
    const updatedGold = Math.max(goldenTICK - deduction, 0);

    set({
      goldenTICK: updatedGold,
      strikeCount: newStrikes,
      diamondLevel: newStrikes >= 3 ? 0 : 1,
    });
  },

  resetReputation: () => set({ goldenTICK: 120, diamondLevel: 1, strikeCount: 0 }),
}));
