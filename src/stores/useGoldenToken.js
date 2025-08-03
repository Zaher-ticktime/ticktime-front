import { create } from "zustand";
import { ethers } from "ethers";
import { useBlockchain } from "./useBlockchain";

const GOLDEN_TICK_ADDRESS = "0xYourGoldenTokenAddressHere";
const GOLDEN_TICK_ABI = [
  "function balanceOf(address) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)"
];

export const useGoldenToken = create((set, get) => ({
  balance: 0,

  fetchBalance: async () => {
    try {
      const { provider, address } = useBlockchain.getState();
      if (!provider || !address) return;

      const contract = new ethers.Contract(GOLDEN_TICK_ADDRESS, GOLDEN_TICK_ABI, provider);
      const balance = await contract.balanceOf(address);
      set({ balance: parseFloat(ethers.formatUnits(balance, 18)) });
    } catch (err) {
      console.error("❌ Failed to fetch Golden TICK balance:", err);
    }
  },

  transferTo: async (recipient, amount) => {
    try {
      const { signer } = useBlockchain.getState();
      const contract = new ethers.Contract(GOLDEN_TICK_ADDRESS, GOLDEN_TICK_ABI, signer);
      const tx = await contract.transfer(recipient, ethers.parseUnits(amount.toString(), 18));
      await tx.wait();
      get().fetchBalance();
    } catch (err) {
      console.error("💸 Error transferring Golden TICK:", err);
    }
  }
}));
