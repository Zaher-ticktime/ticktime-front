import { create } from "zustand";

export const useDiamondToken = create((set) => ({
  balance: 0,
  fetchBalance: () => {
    set({ balance: 0 });
  },
}));
