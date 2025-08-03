import { create } from "zustand";
import { ethers } from "ethers";
import { useBlockchain } from "./useBlockchain";

// Replace with actual values
const SILVER_TICK_ADDRESS = "0xYourSilverTokenAddressHere";
const SILVER_TICK_ABI = [
  "function balanceOf(address) view returns (uint256)",
  "function burn(uint256 amount) returns (bool)",
  "function claimReward(address user) returns (bool)"
];

export const useSilverToken = create((set, get) => ({
  balance: 0,

  fetchBalance: async () => {
    try {
      const { provider, address } = useBlockchain.getState();
      if (!provider || !address) return;

      const contract = new ethers.Contract(SILVER_TICK_ADDRESS, SILVER_TICK_ABI, provider);
      const balance = await contract.balanceOf(address);
      set({ balance: parseFloat(ethers.formatUnits(balance, 18)) });
    } catch (err) {
      console.error("❌ Failed to fetch Silver TICK balance:", err);
    }
  },

  burnTokens: async (amount) => {
    try {
      const { signer } = useBlockchain.getState();
      const contract = new ethers.Contract(SILVER_TICK_ADDRESS, SILVER_TICK_ABI, signer);
      const tx = await contract.burn(ethers.parseUnits(amount.toString(), 18));
      await tx.wait();
      get().fetchBalance();
    } catch (err) {
      console.error("🔥 Error burning Silver TICK:", err);
    }
  },

  claimReward: async () => {
    try {
      const { signer, address } = useBlockchain.getState();
      const contract = new ethers.Contract(SILVER_TICK_ADDRESS, SILVER_TICK_ABI, signer);
      const tx = await contract.claimReward(address);
      await tx.wait();
      get().fetchBalance();
    } catch (err) {
      console.error("🎁 Error claiming Silver TICK reward:", err);
    }
  }
}));