import { create } from "zustand";
import { ethers } from "ethers";

export const useBlockchain = create((set) => ({
  provider: null,
  signer: null,
  address: null,
  connected: false,

  connect: async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();

        set({ provider, signer, address, connected: true });
      } catch (error) {
        console.error("❌ Error connecting to wallet:", error);
      }
    } else {
      alert("🦊 Please install Metamask to continue.");
    }
  },

  disconnect: () => {
    set({ provider: null, signer: null, address: null, connected: false });
  }
}));