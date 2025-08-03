import { useBlockchain } from "@/stores/UseBlockchain";



export const useBlockchain = create((set) => ({
  address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", // آدرس پیش‌فرض شبکه لوکال
  connected: true,
  connect: () => set({ connected: true }),
}));
