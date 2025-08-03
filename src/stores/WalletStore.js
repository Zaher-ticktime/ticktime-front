
import { create } from "zustand";

export const useWalletStore = create((set) => ({
  walletAddress: null,
  setWalletAddress: (address) => set({ walletAddress: address }),

  balance: 0,
  setBalance: (value) => set({ balance: value }),

  transactions: [],
  setTransactions: (txs) => set({ transactions: txs }),

  // ✅ افزودن Silver به موجودی کیف‌پول
  addSilver: (amount = 1) =>
    set((state) => ({ balance: state.balance + amount })),
}));
