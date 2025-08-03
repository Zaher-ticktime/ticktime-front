import { create } from "zustand";
import { ethers } from "ethers";
import { useBlockchain } from "./useBlockchain";

const DIAMOND_TICK_ADDRESS = "0xYourDiamondTokenAddressHere";
const DIAMOND_TICK_ABI = [
  "function balanceOf(address) view returns (uint256)",
  "function burn(uint256 amount) returns (bool)"
];

export const useDiamondToken = create((set, get) => ({
  balance: 0,

  fetchBalance: async () => {
    try {
      const { provider, address } = useBlockchain.getState();
      if (!provider || !address) return;

      const contract = new ethers.Contract(DIAMOND_TICK_ADDRESS, DIAMOND_TICK_ABI, provider);
      const balance = await contract.balanceOf(address);
      set({ balance: parseFloat(ethers.formatUnits(balance, 18)) });
    } catch (err) {
      console.error("❌ Failed to fetch Diamond TICK balance:", err);
    }
  },

  burnDiamond: async (amount) => {
    try {
      const { signer } = useBlockchain.getState();
      const contract = new ethers.Contract(DIAMOND_TICK_ADDRESS, DIAMOND_TICK_ABI, signer);
      const tx = await contract.burn(ethers.parseUnits(amount.toString(), 18));
      await tx.wait();
      get().fetchBalance();
    } catch (err) {
      console.error("🔥 Error burning Diamond TICK:", err);
    }
  }
}));
