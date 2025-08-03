import { create } from "zustand";

export const useSilverToken = create((set) => ({
  balance: 0,
  fetchBalance: () => {
    // اینجا می‌تونی بعداً اتصال واقعی به بلاک‌چین رو بذاری
    set({ balance: 0 });
  },
}));
