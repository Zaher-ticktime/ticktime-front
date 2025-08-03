import { create } from "zustand";

export const useGoldenToken = create((set) => ({
  balance: 0,
  fetchBalance: () => {
    set({ balance: 0 });
  },
}));
