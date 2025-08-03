import { create } from "zustand";

export const usePurchaseHistory = create((set) => ({
  purchases: [],
  addPurchase: (item) =>
    set((state) => ({ purchases: [...state.purchases, { ...item, date: new Date().toISOString() }] })),
  resetHistory: () => set({ purchases: [] }),
}));